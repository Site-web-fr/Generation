import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { brands } from '../data/brands';
import { usePitchMode } from '../hooks/usePitchMode';
import { useSeo } from '../hooks/useSeo';
import { hubSeoWithBrands } from '../utils/seo';
import { assetUrl, copyToClipboard, pageUrl } from '../utils/url';
import './Hub.css';

export default function Hub() {
  const pitchMode = usePitchMode();
  const seo = useMemo(() => hubSeoWithBrands(brands), []);
  useSeo(seo);

  const standPath = (slug: string) => `/${slug}`;

  const handleCopy = (slug: string) => {
    copyToClipboard(pageUrl(slug));
  };

  return (
    <div className="hub">
      <div className="hub-bg" />
      <main>
      <header className="hub-header">
        {!pitchMode && (
          <motion.span
            className="hub-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Proposition commerciale 2026
          </motion.span>
        )}
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
          {pitchMode
            ? `${brands.length} adresses gourmandes · Food court Montpellier`
            : `${brands.length} landing pages sur-mesure · Logos officiels Halles du Lez · Charte graphique · CRO`}
        </motion.p>
        {!pitchMode && (
          <motion.p className="hub-deploy-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            📱 Accessible depuis votre téléphone une fois déployé sur GitHub Pages
          </motion.p>
        )}
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
              to={standPath(brand.slug)}
              className="hub-card"
              style={
                {
                  '--card-primary': brand.colors.primary,
                  '--card-bg': brand.colors.bg,
                  '--card-accent': brand.colors.accent,
                  '--card-photo': brand.heroImage ? `url(${assetUrl(brand.heroImage)})` : 'none',
                  '--font-heading': brand.fonts.heading,
                  '--font-body': brand.fonts.body,
                  '--font-heading-spacing': brand.fonts.headingSpacing ?? 'normal',
                  '--font-heading-transform': brand.fonts.headingTransform ?? 'none',
                } as React.CSSProperties
              }
            >
              {brand.heroImage && <div className="hub-card-photo" aria-hidden />}
              <div className="hub-card-glow" />
              <div className="hub-card-top">
                <img
                  src={assetUrl(brand.logo)}
                  alt=""
                  className="hub-card-logo"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fb = assetUrl(brand.logoFallback ?? `/logos/${brand.slug}.svg`);
                    if (img.src !== fb) img.src = fb;
                  }}
                />
                {brand.uberEats && <span className="hub-uber-tag">Uber Eats</span>}
              </div>
              <h2>{brand.name}</h2>
              <p className="hub-card-stand">{brand.stand}</p>
              <p>{brand.subtitle}</p>
              <div className="hub-card-links">
                <span className="hub-card-cta">{pitchMode ? 'Découvrir →' : 'Voir la démo →'}</span>
                <button
                  type="button"
                  className="hub-copy-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopy(brand.slug);
                  }}
                >
                  📋 Lien mobile
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      </main>

      <footer className="hub-footer">
        <p>
          {pitchMode ? (
            <>
              Halles du Lez · 1348 Avenue Raymond Dugrand, Montpellier ·{' '}
              <a href="https://hallesdulez.com" target="_blank" rel="noopener noreferrer">
                hallesdulez.com
              </a>
            </>
          ) : (
            <>
              Démonstrations créées pour prospection · Données publiques Halles du Lez ·{' '}
              <a href="https://hallesdulez.com" target="_blank" rel="noopener noreferrer">
                hallesdulez.com
              </a>
            </>
          )}
        </p>
      </footer>
    </div>
  );
}
