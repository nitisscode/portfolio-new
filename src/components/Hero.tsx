import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { usePortfolio } from '../context/PortfolioContext'
import ResumeActions from './ResumeActions'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const { profile } = usePortfolio()
  const photoSrc = profile.profile_image_url || '/profile.png'

  return (
    <section className="hero" id="top">
      <div className="hero__scene" aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__eyebrow">
            <span className="hero__status" aria-hidden="true" />
            {profile.location}
            {profile.hero_eyebrow ? ` · ${profile.hero_eyebrow}` : ''}
          </p>
          <h1 className="hero__name">
            <span>{profile.name.split(' ')[0]}</span>
            <span className="hero__name-accent">
              {' '}
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="hero__title">{profile.title}</p>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn--ghost" href="#experience">
              View work
            </a>
          </div>

          <ResumeActions className="hero__resume" />
        </motion.div>

        <motion.div
          className="hero__photo-wrap"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portrait">
            <div className="portrait__orbit" aria-hidden="true" />
            <div className="portrait__orbit portrait__orbit--slow" aria-hidden="true" />
            <div className="portrait__glow" aria-hidden="true" />

            <div className="portrait__frame">
              <span className="portrait__bracket portrait__bracket--tl" aria-hidden="true" />
              <span className="portrait__bracket portrait__bracket--tr" aria-hidden="true" />
              <span className="portrait__bracket portrait__bracket--bl" aria-hidden="true" />
              <span className="portrait__bracket portrait__bracket--br" aria-hidden="true" />

              <div className="portrait__media">
                <img
                  src={`${photoSrc}?v=2`}
                  alt={`${profile.name} portrait`}
                  className="portrait__img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fallback = e.currentTarget.nextElementSibling
                    if (fallback instanceof HTMLElement) {
                      fallback.style.opacity = '1'
                    }
                  }}
                />
                <div className="portrait__fallback" aria-hidden="true">
                  <span>NK</span>
                </div>
                <div className="portrait__shine" aria-hidden="true" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span />
      </a>
    </section>
  )
}
