import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { premiumLandings } from '../data/premium-landings';
import { useSeo } from '../hooks/useSeo';
import { copyToClipboard, pageUrl } from '../utils/url';
import './PremiumHub.css';

export default function PremiumHub() {
  const seo = useMemo(
    () => ({
      title: '10 concepts de landing pages premium | Portfolio interactif',
      description:
        'Dix landing pages premium pour chirurgie esthétique, immobilier, jet ski Dubai, yacht cleaning, location de supercars et services luxe.',
      canonical: pageUrl('premium'),
      type: 'website' as const,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: '10 concepts de landing pages premium',
        numberOfItems: premiumLandings.length,
        itemListElement: premiumLandings.map((landing, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: landing.name,
          url: pageUrl(`premium/${landing.slug}`),
        })),
      },
    }),
    [],
  );

  useSeo(seo);

  const handleCopy = (slug: string) => {
    copyToClipboard(pageUrl(`premium/${slug}`));
  };

  return (
    <div className="premium-hub">
      <div className="premium-hub-bg" aria-hidden="true" />
      <header className="premium-hub-header">
        <Link to="/" className="premium-hub-back">
          ← Retour aux propositions Halles
        </Link>
        <motion.span
          className="premium-hub-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Portfolio client · budgets 10 000€ / page
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          10 landing pages premium
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          Une collection de concepts luxe avec parcours autonomes, estimateurs, micro-interactions, 3D CSS et tunnels de
          conversion adaptés à chaque métier.
        </motion.p>
      </header>

      <main className="premium-hub-grid">
        {premiumLandings.map((landing, index) => (
          <motion.article
            key={landing.slug}
            className="premium-hub-card"
            style={
              {
                '--concept-accent': landing.accent,
                '--concept-secondary': landing.secondary,
                '--concept-surface': landing.surface,
                '--concept-glow': landing.glow,
              } as CSSProperties
            }
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.045 * index, duration: 0.58 }}
          >
            <Link to={`/premium/${landing.slug}`} className="premium-hub-card-link">
              <div className="premium-hub-card-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="premium-hub-orb">
                <span>{landing.visual.object}</span>
              </div>
              <span className="premium-hub-category">{landing.category}</span>
              <h2>{landing.name}</h2>
              <p>{landing.headline}</p>
              <div className="premium-hub-meta">
                <span>{landing.city}</span>
                <span>{landing.estimator.options.length} parcours</span>
              </div>
            </Link>
            <div className="premium-hub-actions">
              <Link to={`/premium/${landing.slug}`}>Ouvrir la démo →</Link>
              <button type="button" onClick={() => handleCopy(landing.slug)}>
                Copier le lien
              </button>
            </div>
          </motion.article>
        ))}
      </main>
    </div>
  );
}
