import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { brands } from '../data/brands';
import './Hub.css';

export default function Hub() {
  return (
    <div className="hub">
      <div className="hub-bg" />
      <header className="hub-header">
        <motion.span
          className="hub-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Proposition commerciale 2026
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Halles du Lez
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          10 landing pages sur-mesure · Charte graphique · CRO · Animations · Uber Eats intégré
        </motion.p>
      </header>

      <div className="hub-grid">
        {brands.map((brand, i) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Link
              to={`/${brand.slug}`}
              className="hub-card"
              style={
                {
                  '--card-primary': brand.colors.primary,
                  '--card-bg': brand.colors.bg,
                  '--card-accent': brand.colors.accent,
                } as React.CSSProperties
              }
            >
              <div className="hub-card-glow" />
              <div className="hub-card-top">
                <span className="hub-card-emoji">{brand.menu[0].emoji}</span>
                {brand.uberEats && <span className="hub-uber-tag">Uber Eats</span>}
              </div>
              <h2>{brand.name}</h2>
              <p>{brand.subtitle}</p>
              <span className="hub-card-cta">
                Voir la démo →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <footer className="hub-footer">
        <p>
          Démonstrations créées pour prospection · Données publiques Halles du Lez ·{' '}
          <a href="https://hallesdulez.com" target="_blank" rel="noopener noreferrer">
            hallesdulez.com
          </a>
        </p>
      </footer>
    </div>
  );
}
