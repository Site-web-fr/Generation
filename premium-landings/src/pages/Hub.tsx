import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import { RevealHeadline } from '../components/Reveal'
import Reveal from '../components/Reveal'
import { Stats } from '../components/sections'
import { BRANDS } from '../theme/brands'
import FieldScene from '../three/FieldScene'
import SceneCanvas from '../three/SceneCanvas'
import './Hub.css'

export default function Hub() {
  const [hovered, setHovered] = useState<number | null>(null)
  // Fall back to the suite's default gold accent (avoids a self-referential var).
  const activeAccent = hovered != null ? BRANDS[hovered].accent : '#c8a26a'

  return (
    <div className="hub" style={{ ['--accent' as string]: activeAccent }}>
      {/* Hero */}
      <section className="hub-hero">
        <div className="hub-hero__scene">
          <SceneCanvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <FieldScene color={hovered != null ? BRANDS[hovered].accent : '#c8a26a'} />
          </SceneCanvas>
        </div>
        <div className="hub-hero__veil" />
        <div className="wrap hub-hero__inner">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Studio d’expériences premium · 200 talents
          </motion.div>
          <RevealHeadline
            text="Cinq marques. <em>Cinq</em> expériences sans équivalent."
            className="display hub-hero__title glow-text"
          />
          <motion.p
            className="lead hub-hero__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
          >
            Une suite de landing pages pensées comme des œuvres : 3D temps réel,
            interactions cinématiques et parcours pensés pour convertir. Chaque
            univers raconte une histoire — et la vend.
          </motion.p>
          <motion.div
            className="hub-hero__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            <span>Choisissez un univers</span>
            <span className="hub-hero__scroll-line" />
          </motion.div>
        </div>
      </section>

      <Marquee
        items={[
          'Direction artistique',
          'Ingénierie 3D',
          'Motion design',
          'Expérience utilisateur',
          'Stratégie de marque',
          'Développement sur-mesure',
        ]}
      />

      {/* Brand index */}
      <section className="section wrap">
        <Reveal>
          <span className="eyebrow">Les univers</span>
        </Reveal>
        <ul className="hub-index" onMouseLeave={() => setHovered(null)}>
          {BRANDS.map((b, i) => (
            <li
              key={b.id}
              className="hub-index__row"
              style={{ ['--accent' as string]: b.accent }}
              onMouseEnter={() => setHovered(i)}
            >
              <Link
                to={b.path}
                className="hub-index__link"
                data-cursor="hover"
                data-cursor-label="Entrer"
              >
                <span className="hub-index__num">0{i + 1}</span>
                <span className="hub-index__name">{b.name}</span>
                <span className="hub-index__cat">{b.category}</span>
                <span className="hub-index__arrow">→</span>
              </Link>
              <p className="hub-index__blurb muted">{b.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="section wrap">
        <Stats
          items={[
            { value: 200, label: 'Talents mobilisés' },
            { value: 5, label: 'Univers de marque' },
            { value: 60, suffix: ' fps', label: 'Rendu 3D temps réel' },
            { value: 100, suffix: '%', label: 'Sur-mesure' },
          ]}
        />
      </section>

      {/* Manifesto */}
      <section className="section wrap hub-manifesto">
        <Reveal>
          <p className="display hub-manifesto__text">
            Nous ne livrons pas des pages.
            <br />
            Nous livrons des <em>premières impressions</em> dont on ne se remet pas.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Magnetic strength={0.4}>
            <a
              className="btn btn--solid"
              href="#contact"
              data-cursor="hover"
              data-cursor-label="Parler"
            >
              <span className="btn__dot" />
              Démarrer un projet
            </a>
          </Magnetic>
        </Reveal>
      </section>

      <div id="contact" />
      <Footer ctaTitle={<>Prêt à <em>marquer les esprits</em> ?</>} />
    </div>
  )
}
