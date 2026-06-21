import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sites } from '../../data/sites';
import { useSeo, hubSeo } from '../../utils/seo';
import { copyToClipboard, pageUrl } from '../../utils/url';
import './Hub.css';

export default function Hub() {
  useSeo(hubSeo(sites.length));

  return (
    <div className="hub">
      <div className="hub-aurora" />
      <div className="hub-grid-bg" />

      <main className="hub-main">
        <header className="hub-header">
          <motion.span
            className="hub-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Proposition Client Premium · 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            10 Landing Pages
            <span className="hub-title-accent"> d'Exception</span>
          </motion.h1>
          <motion.p
            className="hub-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            UX interactive · Animations 3D · Estimateurs en temps réel · Budget ~10 000 € par site
          </motion.p>
          <motion.p
            className="hub-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Chaque démo est autonome — le client configure, estime et réserve sans appeler.
          </motion.p>
        </header>

        <div className="hub-cards">
          {sites.map((site, i) => (
            <motion.div
              key={site.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.6 }}
            >
              <Link
                to={`/${site.slug}`}
                className="hub-card"
                style={
                  {
                    '--card-primary': site.colors.primary,
                    '--card-accent': site.colors.accent,
                    '--card-glow': site.colors.glow,
                    '--card-bg': site.colors.bg,
                    '--font-heading': site.fonts.heading,
                  } as React.CSSProperties
                }
              >
                <div className="hub-card-glow" />
                <div className="hub-card-top">
                  <span className="hub-card-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="hub-card-budget">{site.budget}</span>
                </div>
                <h2 style={{ fontFamily: site.fonts.heading }}>{site.name}</h2>
                <p className="hub-card-sub">{site.subtitle}</p>
                <p className="hub-card-tagline">{site.tagline}</p>
                <div className="hub-card-features">
                  {site.perks.slice(0, 3).map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <div className="hub-card-footer">
                  <span className="hub-card-cta">Voir la démo →</span>
                  <button
                    type="button"
                    className="hub-copy-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard(pageUrl(site.slug));
                    }}
                  >
                    Copier le lien
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="hub-footer">
        <p>
          Démonstrations premium · React · Three.js · Framer Motion ·
          Chaque projet inclut configurateur interactif, scène 3D et estimateur temps réel.
        </p>
      </footer>
    </div>
  );
}
