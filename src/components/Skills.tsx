import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'

export default function Skills() {
  const { skills, profile } = usePortfolio()

  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="section__label">Skills</p>
          <h2 className="section__title">
            {profile.skills_heading || 'Stack & strengths'}
          </h2>
        </motion.div>

        <div className="skills">
          {Object.entries(skills).map(([group, items], i) => (
            <motion.div
              key={group}
              className="skills__group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <h3>{group}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
