import { useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sites } from '../../data/sites';
import { useSeo, hubSeo } from '../../utils/seo';
import { copyToClipboard, pageUrl } from '../../utils/url';
import { isTouchDevice } from '../../utils/device';
import GrainOverlay from '../effects/GrainOverlay';
import CustomCursor from '../effects/CustomCursor';
import ScrollProgress from '../effects/ScrollProgress';
import TextReveal from '../effects/TextReveal';
import '../effects/effects.css';
import './Hub.css';

function HubCard({ site, index }: { site: (typeof sites)[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    el.style.setProperty('--shine-x', `${x * 100}%`);
    el.style.setProperty('--shine-y', `${y * 100}%`);
  };

  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <Link
        ref={cardRef}
        to={`/${site.slug}`}
        className="hub-card hub-card-tilt"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
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
        <div className="hub-card-shine" />
        <div className="hub-card-glow" />
        <div className="hub-card-preview" style={{ background: `linear-gradient(135deg, ${site.colors.bgAlt}, ${site.colors.bg})` }}>
          <div className="hub-card-preview-orb" style={{ background: site.colors.glow }} />
        </div>
        <div className="hub-card-body">
          <div className="hub-card-top">
            <span className="hub-card-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="hub-card-award">SOTD Ready</span>
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
            <span className="hub-card-cta">Entrer dans l'expérience →</span>
            <button
              type="button"
              className="hub-copy-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyToClipboard(pageUrl(site.slug));
              }}
            >
              Lien
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Hub() {
  useSeo(hubSeo(sites.length));

  return (
    <div className="hub">
      {!isTouchDevice() && (
        <>
          <GrainOverlay />
          <CustomCursor color="#d4af7a" />
          <ScrollProgress color="#d4af7a" />
        </>
      )}

      <div className="hub-aurora" />
      <div className="hub-grid-bg" />
      <div className="hub-vignette" />

      <main className="hub-main">
        <header className="hub-header">
          <motion.span
            className="hub-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Awwwards · Site of the Day · 2026
          </motion.span>
          <TextReveal
            text="10 Expériences d'Exception"
            className="hub-title"
            delay={0.1}
          />
          <motion.div
            className="hub-pilot-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a href="/pilot" className="hub-pilot-link">
              📱 Pilot Mobile — tous les liens
            </a>
            <a
              href="https://site-web-fr.github.io/Generation/pilot.html"
              className="hub-pilot-link hub-pilot-link--outline"
            >
              Page pilot (favori téléphone)
            </a>
          </motion.div>
          <motion.p
            className="hub-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            UX cinématique · Three.js · Estimateurs temps réel · Qualité award-winning
          </motion.p>
          <motion.div
            className="hub-stats-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span><strong>10</strong> secteurs premium</span>
            <span><strong>Photo</strong> & UX</span>
            <span><strong>100%</strong> autonome</span>
            <span><strong>24/7</strong> conciergerie</span>
          </motion.div>
        </header>

        <div className="hub-cards">
          {sites.map((site, i) => (
            <HubCard key={site.slug} site={site} index={i} />
          ))}
        </div>
      </main>

      <footer className="hub-footer">
        <p>
          Crafted for excellence · React · Three.js · Framer Motion · Post-processing Bloom
        </p>
      </footer>
    </div>
  );
}
