import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'

export default function Education() {
  const { education, profile } = usePortfolio()

  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="section__label">Education</p>
          <h2 className="section__title">
            {profile.education_heading || 'Learning path'}
          </h2>
        </motion.div>

        <div className="education">
          {education.map((item, i) => (
            <motion.div
              key={item.degree + item.school}
              className="education__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <h3>{item.degree}</h3>
              <p className="education__school">{item.school}</p>
              <p className="education__meta">
                {item.period} · {item.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
