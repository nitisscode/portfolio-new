import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import RichText from './RichText'

export default function Projects() {
  const { projects, profile } = usePortfolio()

  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="section__label">Projects</p>
          <h2 className="section__title">
            {profile.projects_heading || 'Selected work'}
          </h2>
        </motion.div>

        <div className="projects">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              className="projects__item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <p className="projects__tag">{project.tag}</p>
              <h3>{project.name}</h3>
              <RichText
                content={project.description || project.blurb}
                className="projects__description"
              />
              <ul className="projects__stack">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {project.link?.trim() ? (
                <a
                  className="projects__link"
                  href={project.link.trim()}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project
                </a>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
