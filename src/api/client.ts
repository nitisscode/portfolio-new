import type {
  CertificateItem,
  ExperienceItem,
  PortfolioPayload,
  Profile,
  ProjectItem,
} from '../types/portfolio'
import {
  certificates as staticCertificates,
  education as staticEducation,
  experience as staticExperience,
  profile as staticProfile,
  skills as staticSkills,
} from '../data/resume'
import { projects as staticProjects } from '../data/projects'

const PROFILE_DEFAULTS = {
  hero_eyebrow: 'Backend',
  about_heading: 'Production systems, clean APIs',
  skills_heading: 'Stack & strengths',
  experience_heading: 'Where I build',
  projects_heading: 'Selected work',
  education_heading: 'Learning path',
  certificates_heading: 'Credentials',
  contact_heading: "Let's build something solid",
  contact_intro:
    "Send a message and I'll get back to you. Prefer email or socials? Use the links below.",
  footer_tagline: 'Backend · APIs · Cloud',
}

function mapProfile(): Profile {
  return {
    ...staticProfile,
    linkedin: staticProfile.linkedin,
    github: staticProfile.github,
    profile_image_url: '/profile.png',
    resume_url: staticProfile.resumeUrl,
    resume_download_name: 'Nitish-Kumar-Resume.pdf',
    ...PROFILE_DEFAULTS,
  }
}

function mapCertificates(): CertificateItem[] {
  return staticCertificates.map((c) => ({
    title: c.title,
    issuer: c.issuer,
    date: c.date,
    summary: c.summary,
    covered: c.covered,
    imageUrl: c.imageUrl,
    fileUrl: c.fileUrl,
    downloadName: c.downloadName,
  }))
}

function mapExperience(): ExperienceItem[] {
  return staticExperience.map((job) => ({
    ...job,
    projects: job.projects.map((p) => ({
      ...p,
      description:
        p.points?.length > 0
          ? `<ul>${p.points.map((x) => `<li>${x}</li>`).join('')}</ul>`
          : '',
    })),
  }))
}

function mapProjects(): ProjectItem[] {
  return staticProjects.map((p) => ({
    ...p,
    description: p.blurb,
  }))
}

/** All portfolio content from local data files — no backend required. */
export function getStaticPortfolio(): PortfolioPayload {
  return {
    profile: mapProfile(),
    skills: staticSkills,
    experience: mapExperience(),
    projects: mapProjects(),
    education: staticEducation,
    certificates: mapCertificates(),
  }
}

/** @deprecated use getStaticPortfolio */
export function getFallbackPortfolio(): PortfolioPayload {
  return getStaticPortfolio()
}

/** Contact without a backend: opens the visitor's mail client. */
export async function sendContactMessage(payload: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ success: boolean; message?: string }> {
  const subject = payload.subject || `Portfolio message from ${payload.name}`
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    '',
    payload.message,
  ].join('\n')

  window.location.href = `mailto:${staticProfile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return { success: true, message: 'Opening your email app…' }
}
