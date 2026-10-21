import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import RichText from './RichText'

export default function About() {
  const { profile } = usePortfolio()

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="section__label">About</p>
          <h2 className="section__title">
            {profile.about_heading || 'Production systems, clean APIs'}
          </h2>
        </motion.div>

        <motion.div
          className="about"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <RichText content={profile.about} className="about__text" as="div" />
          <ul className="about__meta">
            <li>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </li>
            <li>
              <span>Based in</span>
              <span>{profile.location}</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
