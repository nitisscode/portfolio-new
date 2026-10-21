import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import RichText from './RichText'

export default function Experience() {
  const { experience, profile } = usePortfolio()

  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="section__label">Experience</p>
          <h2 className="section__title">
            {profile.experience_heading || 'Where I build'}
          </h2>
        </motion.div>

        <div className="timeline">
          {experience.map((job, i) => (
            <motion.article
              key={`${job.company}-${job.role}`}
              className="timeline__item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="timeline__meta">
                <h3>{job.role}</h3>
                <p className="timeline__company">{job.company}</p>
                <p className="timeline__period">
                  {job.period} · {job.location}
                </p>
              </div>

              <div className="timeline__projects">
                {job.projects.map((project) => (
                  <div key={project.name} className="project-block">
                    <h4>
                      {project.name}
                      {project.summary ? <span>{project.summary}</span> : null}
                    </h4>
                    {project.description ? (
                      <RichText content={project.description} />
                    ) : (
                      <ul>
                        {project.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
