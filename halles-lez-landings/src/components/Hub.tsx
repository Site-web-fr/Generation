import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { brands } from '../data/brands';
import { usePitchMode } from '../hooks/usePitchMode';
import { useSeo } from '../hooks/useSeo';
import { hubSeoWithBrands } from '../utils/seo';
import { copyToClipboard, pageUrl } from '../utils/url';
import './Hub.css';

export default function Hub() {
  const pitchMode = usePitchMode();
  const seo = useMemo(() => hubSeoWithBrands(brands), []);
  useSeo(seo);

  const handleCopy = (slug: string) => {
    copyToClipboard(pageUrl(slug));
  };

  return (
    <div className="hub">
      <div className="hub-bg" />
      <main>
        <header className="hub-header">
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
            {brands.length} commerces du food court · 1348 Avenue Raymond Dugrand, Montpellier
          </motion.p>
        </header>

        <div className="hub-grid">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(0.03 * i, 0.5) }}
            >
              <Link
                to={`/${brand.slug}`}
                className="hub-card"
                style={
                  {
                    '--card-primary': brand.colors.primary,
                    '--card-bg': brand.colors.bgAlt,
                    '--card-accent': brand.colors.accent,
                    '--font-heading': brand.fonts.heading,
                    '--font-heading-spacing': brand.fonts.headingSpacing ?? 'normal',
                    '--font-heading-transform': brand.fonts.headingTransform ?? 'none',
                  } as React.CSSProperties
                }
              >
                <div className="hub-card-glow" />
                <div className="hub-card-top">
                  <span className="hub-card-stand">{brand.stand} · {brand.entrance}</span>
                  {brand.uberEats && <span className="hub-uber-tag">Uber Eats</span>}
                </div>
                <h2>{brand.name}</h2>
                <p>{brand.type}</p>
                <div className="hub-card-links">
                  <span className="hub-card-cta">{pitchMode ? 'Découvrir →' : 'Voir la page →'}</span>
                  <button
                    type="button"
                    className="hub-copy-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(brand.slug);
                    }}
                  >
                    📋 Copier le lien
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="hub-footer">
        <p>
          Halles du Lez · 1348 Avenue Raymond Dugrand, Montpellier ·{' '}
          <a href="https://hallesdulez.com" target="_blank" rel="noopener noreferrer">
            hallesdulez.com
          </a>
        </p>
        <p>
          Maquettes proposées par Site Web Montpellier ·{' '}
          <a href="https://www.sitewebmontpellier.fr" target="_blank" rel="noopener noreferrer">
            sitewebmontpellier.fr
          </a>
        </p>
      </footer>
    </div>
  );
}
