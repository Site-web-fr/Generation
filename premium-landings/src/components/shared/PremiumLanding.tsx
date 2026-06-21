import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Site } from '../../data/sites';
import { useSeo, siteSeo } from '../../utils/seo';
import { phoneHref } from '../../utils/url';
import Scene3D from '../scenes/Scene3D';
import Section from './Section';
import SiteNav from './SiteNav';
import SiteTool from './SiteTool';
import GrainOverlay from '../effects/GrainOverlay';
import CustomCursor from '../effects/CustomCursor';
import ScrollProgress from '../effects/ScrollProgress';
import PageLoader from '../effects/PageLoader';
import TextReveal from '../effects/TextReveal';
import MagneticButton from '../effects/MagneticButton';
import Marquee from '../effects/Marquee';
import './PremiumLanding.css';

interface Props {
  site: Site;
}

export default function PremiumLanding({ site }: Props) {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
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

  const marqueeItems = [...site.perks, site.tagline, site.subtitle, ...site.perks];

  return (
    <div className="premium-landing" style={style}>
      <PageLoader
        label={site.name}
        accent={site.colors.accent}
        font={site.fonts.heading}
        onComplete={() => setLoaded(true)}
      />
      {loaded && (
        <>
          <GrainOverlay />
          <CustomCursor color={site.colors.accent} />
          <ScrollProgress color={site.colors.accent} glow={site.colors.glow} />
        </>
      )}

      <SiteNav site={site} />

      <motion.header ref={heroRef} className="pl-hero" style={{ opacity: heroOpacity, y: heroY }}>
        <div className="pl-hero-bg">
          <div className="pl-hero-gradient" />
          <div className="pl-hero-grid" />
          <div className="pl-hero-glow" />
          <div className="pl-hero-noise" />
          <div className="pl-vignette" />
          <div className="fx-orb" style={{ width: 400, height: 400, background: site.colors.glow, top: '5%', right: '5%' }} />
          <div className="fx-orb" style={{ width: 300, height: 300, background: site.colors.accent, opacity: 0.15, bottom: '10%', left: '5%', animationDelay: '-4s' }} />
        </div>
        <div className="pl-hero-content">
          <motion.div
            className="pl-hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="pl-hero-badges">
              <span className="fx-award-badge">Site of the Day · Ready</span>
              <span className="pl-badge">{site.subtitle}</span>
            </div>
            <TextReveal text={site.name} className="pl-hero-title" delay={0.3} />
            <motion.p
              className="pl-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {site.tagline}
            </motion.p>
            <motion.p
              className="pl-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {site.description}
            </motion.p>
            <motion.div
              className="pl-hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <MagneticButton href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</MagneticButton>
              <MagneticButton href={phoneHref(site.phone)} className="pl-btn pl-btn--ghost">{site.ctaSecondary}</MagneticButton>
            </motion.div>
            <motion.div
              className="pl-hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ delay: 1.3 }}
            >
              <span>{site.location}</span>
              <span className="pl-divider">·</span>
              <span>Conciergerie 24/7</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="pl-hero-scene"
            initial={{ opacity: 0, scale: 0.85, rotateY: -8 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.85, rotateY: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {loaded && <Scene3D type={site.sceneType} color={site.colors.primary} accent={site.colors.accent} />}
          </motion.div>
        </div>
        <motion.div
          className="pl-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="pl-scroll-line" />
          Scroll
        </motion.div>
      </motion.header>

      <Marquee items={marqueeItems} />

      <Section id="configurator" className="pl-configurator">
        <div className="pl-section-header">
          <span className="pl-section-label">01 — Expérience interactive</span>
          <TextReveal text="Configurez. Estimez. Réservez." as="h2" />
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <motion.span
                className="pl-stat-value"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
              >
                {s.value}
              </motion.span>
              <span className="pl-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pl-horizontal-scroll">
        <div className="pl-section-header">
          <span className="pl-section-label">02 — Signature</span>
          <h2>L'expérience {site.name}</h2>
        </div>
        <div className="pl-horizontal-track">
          {site.services.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="pl-horizontal-card"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="pl-service-icon">{svc.icon}</span>
              <h4>{svc.title}</h4>
              <p>{svc.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pl-services">
        <div className="pl-section-header">
          <span className="pl-section-label">03 — Services</span>
          <TextReveal text="Excellence à chaque détail" as="h2" />
        </div>
        <div className="pl-services-grid">
          {site.services.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="pl-service-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
            >
              <span className="pl-service-icon">{svc.icon}</span>
              <h3>{svc.title}</h3>
              <p>{svc.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pl-testimonials">
        <div className="pl-section-header">
          <span className="pl-section-label">04 — Témoignages</span>
          <h2>Ce qu'en disent nos clients</h2>
        </div>
        <div className="pl-testimonials-grid">
          {site.testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              className="pl-testimonial"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>{t.text}</p>
              <footer>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Section>

      <Section className="pl-cta">
        <motion.div
          className="pl-cta-inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TextReveal text={`Prêt pour l'expérience ${site.name} ?`} as="h2" />
          <p>Configurez en ligne ou contactez notre conciergerie — disponible 24/7.</p>
          <div className="pl-hero-actions">
            <MagneticButton href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</MagneticButton>
            <MagneticButton href={`mailto:${site.email}`} className="pl-btn pl-btn--ghost">{site.email}</MagneticButton>
          </div>
        </motion.div>
      </Section>

      <footer className="pl-footer">
        <Link to="/">← Retour au portfolio</Link>
        <span>{site.name} · Crafted with precision</span>
      </footer>
    </div>
  );
}
