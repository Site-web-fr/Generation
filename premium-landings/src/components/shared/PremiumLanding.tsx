import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Site } from '../../data/sites';
import { useSeo, siteSeo } from '../../utils/seo';
import { phoneHref } from '../../utils/url';
import Scene3D from '../scenes/Scene3D';
import Section from './Section';
import SiteNav from './SiteNav';
import SiteTool from './SiteTool';
import './PremiumLanding.css';

interface Props {
  site: Site;
}

export default function PremiumLanding({ site }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const seo = useMemo(() => siteSeo(site), [site]);
  useSeo(seo);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-bg', site.colors.bg);
    document.documentElement.style.setProperty('--brand-glow', site.colors.glow);
  }, [site]);

  const style = {
    '--brand-bg': site.colors.bg,
    '--brand-bg-alt': site.colors.bgAlt,
    '--brand-primary': site.colors.primary,
    '--brand-secondary': site.colors.secondary,
    '--brand-accent': site.colors.accent,
    '--brand-text': site.colors.text,
    '--brand-muted': site.colors.muted,
    '--brand-cta': site.colors.cta,
    '--brand-cta-text': site.colors.ctaText,
    '--brand-glow': site.colors.glow,
    '--font-heading': site.fonts.heading,
    '--font-body': site.fonts.body,
  } as React.CSSProperties;

  return (
    <div className="premium-landing" style={style}>
      <SiteNav site={site} />

      <motion.header ref={heroRef} className="pl-hero" style={{ opacity: heroOpacity, scale: heroScale }}>
        <div className="pl-hero-bg">
          <div className="pl-hero-gradient" />
          <div className="pl-hero-grid" />
          <div className="pl-hero-glow" />
        </div>
        <div className="pl-hero-content">
          <motion.div
            className="pl-hero-text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pl-badge">{site.subtitle}</span>
            <h1>{site.name}</h1>
            <p className="pl-tagline">{site.tagline}</p>
            <p className="pl-desc">{site.description}</p>
            <div className="pl-hero-actions">
              <a href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</a>
              <a href={phoneHref(site.phone)} className="pl-btn pl-btn--ghost">{site.ctaSecondary}</a>
            </div>
            <div className="pl-hero-meta">
              <span>{site.location}</span>
              <span className="pl-divider">·</span>
              <span>Budget démo {site.budget}</span>
            </div>
          </motion.div>
          <motion.div
            className="pl-hero-scene"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Scene3D type={site.sceneType} color={site.colors.primary} accent={site.colors.accent} />
          </motion.div>
        </div>
        <motion.div
          className="pl-scroll-hint"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ↓ Découvrir
        </motion.div>
      </motion.header>

      <Section id="configurator" className="pl-configurator">
        <div className="pl-section-header">
          <span className="pl-section-label">Expérience interactive</span>
          <h2>Configurez. Estimez. Réservez.</h2>
          <p>Tout se fait en autonomie — sans appeler. Un clic pour confirmer.</p>
        </div>
        <SiteTool site={site} />
      </Section>

      <Section className="pl-stats">
        <div className="pl-stats-grid">
          {site.stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="pl-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="pl-stat-value">{s.value}</span>
              <span className="pl-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pl-services">
        <div className="pl-section-header">
          <span className="pl-section-label">Services</span>
          <h2>Excellence à chaque détail</h2>
        </div>
        <div className="pl-services-grid">
          {site.services.map((svc) => (
            <div key={svc.title} className="pl-service-card">
              <span className="pl-service-icon">{svc.icon}</span>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pl-perks">
        <div className="pl-perks-list">
          {site.perks.map((perk) => (
            <span key={perk} className="pl-perk">{perk}</span>
          ))}
        </div>
      </Section>

      <Section className="pl-testimonials">
        <div className="pl-section-header">
          <span className="pl-section-label">Témoignages</span>
          <h2>Ce qu'en disent nos clients</h2>
        </div>
        <div className="pl-testimonials-grid">
          {site.testimonials.map((t) => (
            <blockquote key={t.author} className="pl-testimonial">
              <p>"{t.text}"</p>
              <footer>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <Section className="pl-cta">
        <div className="pl-cta-inner">
          <h2>Prêt à vivre l'expérience {site.name} ?</h2>
          <p>Configurez en ligne ou contactez notre conciergerie — disponible 24/7.</p>
          <div className="pl-hero-actions">
            <a href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</a>
            <a href={`mailto:${site.email}`} className="pl-btn pl-btn--ghost">{site.email}</a>
          </div>
        </div>
      </Section>

      <footer className="pl-footer">
        <Link to="/">← Retour au portfolio</Link>
        <span>{site.name} · Démonstration premium · {site.budget}</span>
      </footer>
    </div>
  );
}
