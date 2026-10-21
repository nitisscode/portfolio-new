import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { sendContactMessage } from '../api/client'
import { usePortfolio } from '../context/PortfolioContext'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { profile } = usePortfolio()
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()

    try {
      await sendContactMessage({ name, email, subject, message })
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <section className="section section--contact" id="contact">
      <div className="container">
        <motion.div
          className="contact"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
        >
          <div className="contact__intro">
            <p className="section__label">Contact</p>
            <h2 className="contact__title">
              {profile.contact_heading || "Let's build something solid"}
            </h2>
            <p className="contact__text">
              {profile.contact_intro ||
                "Send a message and I'll get back to you. Prefer email or socials? Use the links below."}
            </p>

            <div className="contact__social">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>Call</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <label className="field">
                <span>Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="field">
              <span>Subject</span>
              <input
                name="subject"
                type="text"
                placeholder="Project inquiry, role, etc."
              />
            </label>

            <label className="field">
              <span>Message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me a bit about what you need…"
              />
            </label>

            <div className="contact-form__footer">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Opening…' : 'Send message'}
              </button>

              {status === 'success' && (
                <p className="contact-form__status contact-form__status--ok" role="status">
                  Your email app should open with the message ready to send.
                </p>
              )}
              {status === 'error' && (
                <p className="contact-form__status contact-form__status--err" role="alert">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
