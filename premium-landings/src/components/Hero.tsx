import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Brand } from '../theme/brands'
import { RevealHeadline } from './Reveal'
import Magnetic from './Magnetic'
import './Hero.css'

interface HeroProps {
  brand: Brand
  /** 3D scene canvas (already wrapped in SceneCanvas) */
  scene: ReactNode
  /** primary CTA label */
  ctaLabel: string
  /** href for primary CTA (e.g. #booking) */
  ctaHref: string
  /** secondary CTA label */
  secondaryLabel?: string
  secondaryHref?: string
}

export default function Hero({
  brand,
  scene,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="hero__scene">{scene}</div>
      <div className="hero__veil" />

      <div className="wrap hero__inner">
        <motion.div
          className="hero__eyebrow eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          {brand.category} · {brand.location}
        </motion.div>

        <RevealHeadline text={brand.headline} className="display hero__title glow-text" />

        <motion.p
          className="lead hero__lead"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          {brand.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9 }}
        >
          <Magnetic strength={0.4}>
            <a className="btn btn--solid" href={ctaHref} data-cursor="hover" data-cursor-label="Go">
              <span className="btn__dot" />
              {ctaLabel}
            </a>
          </Magnetic>
          {secondaryLabel && (
            <Magnetic strength={0.3}>
              <a className="btn btn--ghost" href={secondaryHref} data-cursor="hover">
                {secondaryLabel}
              </a>
            </Magnetic>
          )}
        </motion.div>
      </div>

      <div className="wrap hero__foot">
        <Link to="/" className="hero__back" data-cursor="hover">
          ← Tous les univers
        </Link>
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <span>Défiler</span>
          <span className="hero__scroll-line" />
        </motion.div>
      </div>
    </section>
  )
}
