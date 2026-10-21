import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { Resend } from 'resend'

const app = express()
const port = Number(process.env.PORT || 3001)

const resendApiKey = process.env.RESEND_API_KEY
const contactTo = process.env.CONTACT_TO_EMAIL || 'nitishkumar50805@gmail.com'
const fromEmail =
  process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'

if (!resendApiKey) {
  console.warn('[contact-api] RESEND_API_KEY is missing. Set it in .env')
}

const resend = resendApiKey ? new Resend(resendApiKey) : null

app.use(cors({ origin: true }))
app.use(express.json({ limit: '32kb' }))

/** Simple in-memory rate limit: 5 requests / 10 minutes per IP */
const hits = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.ip
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 })
    return next()
  }

  entry.count += 1
  if (entry.count > MAX_HITS) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages. Please try again later.',
    })
  }

  return next()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'portfolio-contact-api',
    emailConfigured: Boolean(resend),
  })
})

app.post('/api/contact', rateLimit, async (req, res) => {
  try {
    if (!resend) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured.',
      })
    }

    const name = String(req.body?.name || '').trim()
    const email = String(req.body?.email || '').trim()
    const subject = String(req.body?.subject || '').trim()
    const message = String(req.body?.message || '').trim()

    if (!name || name.length > 120) {
      return res.status(400).json({ success: false, message: 'Valid name is required.' })
    }
    if (!email || !isValidEmail(email) || email.length > 200) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' })
    }
    if (!message || message.length < 5 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 5 and 5000 characters.',
      })
    }
    if (subject.length > 200) {
      return res.status(400).json({ success: false, message: 'Subject is too long.' })
    }

    const emailSubject = subject || `Portfolio message from ${name}`
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(emailSubject)}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [contactTo],
      replyTo: email,
      subject: emailSubject,
      html,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\n${message}`,
    })

    if (error) {
      console.error('[contact-api] Resend error:', error)
      return res.status(502).json({
        success: false,
        message: error.message || 'Failed to send email via Resend.',
      })
    }

    return res.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('[contact-api] Unexpected error:', err)
    return res.status(500).json({
      success: false,
      message: 'Unexpected server error.',
    })
  }
})

app.listen(port, () => {
  console.log(`[contact-api] listening on http://localhost:${port}`)
})
