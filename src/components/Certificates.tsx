import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'

export default function Certificates() {
  const { certificates, profile } = usePortfolio()

  return (
    <section className="section section--alt" id="certificates">
      <div className="container">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <p className="section__label">Certificates</p>
          <h2 className="section__title">
            {profile.certificates_heading || 'Credentials'}
          </h2>
        </motion.div>

        <div className="certificates">
          {certificates.map((cert, i) => (
            <motion.article
              key={cert.title}
              className="certificates__item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <a
                className="certificates__preview"
                href={cert.fileUrl || cert.imageUrl || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${cert.title}`}
              >
                {cert.imageUrl ? (
                  <img src={cert.imageUrl} alt={`${cert.title} certificate`} />
                ) : (
                  <div className="certificates__placeholder">
                    <span>PDF</span>
                    <p>Add file in Admin</p>
                  </div>
                )}
              </a>

              <div className="certificates__body">
                <p className="certificates__issuer">{cert.issuer}</p>
                <h3>{cert.title}</h3>
                {cert.date && <p className="certificates__date">{cert.date}</p>}
                <p className="certificates__summary">{cert.summary}</p>
                {cert.covered.length > 0 && (
                  <ul className="certificates__tags">
                    {cert.covered.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <div className="certificates__actions">
                  <a
                    className="btn btn--ghost btn--sm"
                    href={cert.fileUrl || cert.imageUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                  <a
                    className="btn btn--primary btn--sm"
                    href={cert.fileUrl || cert.imageUrl || '#'}
                    download={cert.downloadName}
                  >
                    Download
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
