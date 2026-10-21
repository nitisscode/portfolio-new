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

      <div className="hero__content">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__eyebrow">
            {profile.location}
            {profile.hero_eyebrow ? ` · ${profile.hero_eyebrow}` : ''}
          </p>
          <h1 className="hero__name">{profile.name}</h1>
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="profile-photo" aria-label="Profile photo">
            <img
              src={photoSrc}
              alt=""
              className="profile-photo__img"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="profile-photo__fallback">
              <span>NK</span>
              {/* <p>Add profile photo in Admin</p> */}
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
