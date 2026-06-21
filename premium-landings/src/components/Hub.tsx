import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { copyToClipboard, pageUrl } from '../utils/url';
import './Hub.css';

export default function Hub() {
  return (
    <div className="hub">
      <div className="hub-noise" aria-hidden />
      <main>
        <header className="hub-header">
          <motion.span
            className="hub-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Proposition commerciale · Budget ~10 000 € / site
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Premium Landings
          </motion.h1>
          <motion.p
            className="hub-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {projects.length} expériences interactives haut de gamme · React · Three.js · Configurateurs sur-mesure
          </motion.p>
          <motion.p
            className="hub-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Chaque landing page intègre un parcours utilisateur autonome — devis, réservation, configuration sans appel téléphonique.
          </motion.p>
        </header>

        <div className="hub-grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.6 }}
            >
              <Link
                to={`/${project.slug}`}
                className="hub-card"
                style={
                  {
                    '--card-bg': project.colors.bg,
                    '--card-accent': project.colors.accent,
                    '--card-primary': project.colors.primary,
                    '--card-gradient': project.heroGradient,
                  } as React.CSSProperties
                }
              >
                <div className="hub-card-glow" />
                <div className="hub-card-top">
                  <span className="hub-card-sector">{project.sector}</span>
                  <span className="hub-card-budget">{project.budget}</span>
                </div>
                <h2>{project.name}</h2>
                <p className="hub-card-tagline">{project.tagline}</p>
                <p className="hub-card-desc">{project.description}</p>
                <ul className="hub-card-features">
                  {project.features.slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="hub-card-footer">
                  <span className="hub-card-cta">Voir la démo →</span>
                  <button
                    type="button"
                    className="hub-copy-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard(pageUrl(project.slug));
                    }}
                  >
                    Copier le lien
                  </button>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>

      <footer className="hub-footer">
        <p>
          Démonstrations créées pour prospection client premium ·{' '}
          <strong>React.js</strong> · <strong>Three.js</strong> · <strong>Framer Motion</strong>
        </p>
      </footer>
    </div>
  );
}
