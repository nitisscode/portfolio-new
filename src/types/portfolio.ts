export type Profile = {
  name: string
  title: string
  tagline: string
  about: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  linkedin_url?: string
  github_url?: string
  profile_image_url?: string | null
  resume_url: string
  resume_download_name?: string
  hero_eyebrow?: string
  about_heading?: string
  skills_heading?: string
  experience_heading?: string
  projects_heading?: string
  education_heading?: string
  certificates_heading?: string
  contact_heading?: string
  contact_intro?: string
  footer_tagline?: string
}

export type SkillsMap = Record<string, string[]>

export type ExperienceProject = {
  name: string
  summary: string
  description?: string
  points: string[]
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  projects: ExperienceProject[]
}

export type ProjectItem = {
  name: string
  tag: string
  blurb: string
  description?: string
  link?: string
  stack: string[]
}

export type EducationItem = {
  degree: string
  school: string
  period: string
  location: string
}

export type CertificateItem = {
  title: string
  issuer: string
  date: string
  summary: string
  covered: string[]
  imageUrl: string
  fileUrl: string
  downloadName: string
}

export type PortfolioPayload = {
  profile: Profile
  skills: SkillsMap
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  certificates: CertificateItem[]
}
