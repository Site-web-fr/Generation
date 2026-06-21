import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Site } from '../../data/sites';
import { getSiteEnrichment, mapsUrl } from '../../data/site-enrichment';
import { useSeo, siteSeo } from '../../utils/seo';
import { phoneHref } from '../../utils/url';
import Section from './Section';
import SiteNav from './SiteNav';
import SiteTool from './SiteTool';
import { isTouchDevice } from '../../utils/device';
import GrainOverlay from '../effects/GrainOverlay';
import CustomCursor from '../effects/CustomCursor';
import ScrollProgress from '../effects/ScrollProgress';
import PageLoader from '../effects/PageLoader';
import TextReveal from '../effects/TextReveal';
import MagneticButton from '../effects/MagneticButton';
import Marquee from '../effects/Marquee';
import HeroVisual from './HeroVisual';
import './PremiumLanding.css';

interface Props {
  site: Site;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="pl-stars" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'pl-star pl-star--on' : 'pl-star'}>★</span>
      ))}
    </span>
  );
}

export default function PremiumLanding({ site }: Props) {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const enrichment = useMemo(() => getSiteEnrichment(site.slug), [site.slug]);
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
        preloadImage={enrichment.heroImage}
        onComplete={() => setLoaded(true)}
      />
      {loaded && (
        <>
          <GrainOverlay />
          <ScrollProgress color={site.colors.accent} glow={site.colors.glow} />
        </>
      )}
      {loaded && !isTouchDevice() && <CustomCursor color={site.colors.accent} />}

      <SiteNav site={site} />

      <motion.header ref={heroRef} className="pl-hero" style={{ opacity: heroOpacity, y: heroY }}>
        <div className="pl-hero-bg">
          <img
            className="pl-hero-bg-photo"
            src={enrichment.heroImage}
            alt=""
            aria-hidden
            loading="eager"
          />
          <div className="pl-hero-gradient" />
          <div className="pl-hero-overlay" />
          <div className="pl-hero-noise" />
          <div className="pl-vignette" />
        </div>
        <div className="pl-hero-content">
          <motion.div
            className="pl-hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {site.tagline}
            </motion.p>
            <motion.p
              className="pl-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {site.description}
            </motion.p>
            <motion.div
              className="pl-hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <MagneticButton href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</MagneticButton>
              <MagneticButton href={phoneHref(site.phone)} className="pl-btn pl-btn--ghost">{site.ctaSecondary}</MagneticButton>
            </motion.div>
            <motion.div
              className="pl-hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <span>{site.location}</span>
              <span className="pl-divider">·</span>
              <span>{enrichment.reviewSummary.score}★ · {enrichment.reviewSummary.count} avis</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="pl-hero-scene"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual enrichment={enrichment} />
          </motion.div>
        </div>
        <motion.div
          className="pl-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="pl-scroll-line" />
          Scroll
        </motion.div>
      </motion.header>

      <Marquee items={marqueeItems} />

      <Section className="pl-reassurance">
        <div className="pl-section-header">
          <span className="pl-section-label">Réassurance</span>
          <TextReveal text="Votre sérénité, notre priorité" as="h2" />
        </div>
        <div className="pl-reassurance-grid">
          {enrichment.reassurance.map((item, i) => (
            <motion.div
              key={item.title}
              className="pl-reassurance-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <span className="pl-reassurance-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="pl-about">
        <div className="pl-about-inner">
          <motion.div
            className="pl-about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="pl-section-label">Notre vision</span>
            <h2>{enrichment.aboutTitle}</h2>
            <p>{enrichment.aboutText}</p>
            <ul className="pl-perks-list">
              {site.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="pl-about-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={enrichment.gallery[0]?.src ?? enrichment.heroImage} alt={enrichment.gallery[0]?.alt ?? site.name} loading="lazy" />
          </motion.div>
        </div>
      </Section>

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

      <Section className="pl-gallery">
        <div className="pl-section-header">
          <span className="pl-section-label">02 — Galerie</span>
          <h2>L'univers {site.name}</h2>
        </div>
        <div className="pl-gallery-grid">
          {enrichment.gallery.map((img, i) => (
            <motion.figure
              key={img.src}
              className={`pl-gallery-item pl-gallery-item--${(i % 3) + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              viewport={{ once: true, margin: '-60px' }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </motion.figure>
          ))}
        </div>
      </Section>

      <Section className="pl-horizontal-scroll">
        <div className="pl-section-header">
          <span className="pl-section-label">03 — Signature</span>
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
          <span className="pl-section-label">04 — Services</span>
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

      <Section id="location" className="pl-location">
        <div className="pl-location-inner">
          <motion.div
            className="pl-location-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="pl-section-label">05 — Localisation</span>
            <h2>Nous trouver</h2>
            <p className="pl-location-district">{enrichment.location.district}</p>
            <dl className="pl-location-details">
              <div>
                <dt>Adresse</dt>
                <dd>{enrichment.location.address}</dd>
              </div>
              <div>
                <dt>Horaires</dt>
                <dd>{enrichment.location.hours}</dd>
              </div>
              <div>
                <dt>Accès</dt>
                <dd>{enrichment.location.access}</dd>
              </div>
              <div>
                <dt>Parking</dt>
                <dd>{enrichment.location.parking}</dd>
              </div>
            </dl>
            <div className="pl-hero-actions">
              <MagneticButton href={mapsUrl(enrichment.location.mapQuery)} className="pl-btn pl-btn--primary">
                Ouvrir dans Maps
              </MagneticButton>
              <MagneticButton href={phoneHref(site.phone)} className="pl-btn pl-btn--ghost">
                {site.phone}
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div
            className="pl-location-map"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={enrichment.gallery[1]?.src ?? enrichment.heroImage}
              alt={`Localisation — ${site.name}`}
              loading="lazy"
            />
            <a
              className="pl-location-pin"
              href={mapsUrl(enrichment.location.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📍</span>
              <strong>{enrichment.location.address}</strong>
            </a>
          </motion.div>
        </div>
      </Section>

      <Section id="avis" className="pl-reviews">
        <div className="pl-section-header">
          <span className="pl-section-label">06 — Avis clients</span>
          <h2>Ce qu'en disent nos clients</h2>
          <div className="pl-review-summary">
            <span className="pl-review-score">{enrichment.reviewSummary.score}</span>
            <Stars rating={Math.round(enrichment.reviewSummary.score)} />
            <span className="pl-review-count">
              {enrichment.reviewSummary.count} avis · {enrichment.reviewSummary.source}
            </span>
          </div>
        </div>
        <div className="pl-reviews-grid">
          {enrichment.reviews.map((review, i) => (
            <motion.article
              key={`${review.author}-${i}`}
              className="pl-review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Stars rating={review.rating} />
              <p>&ldquo;{review.text}&rdquo;</p>
              <footer>
                <strong>{review.author}</strong>
                <span>{review.role}</span>
                <span className="pl-review-source">{review.source}</span>
              </footer>
            </motion.article>
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
        <Link to="/premium">← Retour au portfolio premium</Link>
        <span>{site.name} · Crafted with precision</span>
      </footer>
    </div>
  );
}
