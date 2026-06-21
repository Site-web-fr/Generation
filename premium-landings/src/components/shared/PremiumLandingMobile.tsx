import { Suspense, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Site, ToolType } from '../../data/sites';
import { getSiteEnrichment, mapsUrl } from '../../data/site-enrichment';
import { useSeo, siteSeo } from '../../utils/seo';
import { lazyWithRetry } from '../../utils/lazyWithRetry';
import { phoneHref } from '../../utils/url';
import SiteNav from './SiteNav';
import './PremiumLanding.css';

const toolLoaders = {
  'surgery-consultation': lazyWithRetry(() => import('../tools/SurgeryConsultation')),
  'property-finder': lazyWithRetry(() => import('../tools/PropertyFinder')),
  'jetski-booking': lazyWithRetry(() => import('../tools/JetSkiBooking')),
  'yacht-cleaning': lazyWithRetry(() => import('../tools/YachtCleaningBuilder')),
  'vehicle-rental': lazyWithRetry(() => import('../tools/VehicleRental')),
  'yacht-charter': lazyWithRetry(() => import('../tools/YachtCharterConfigurator')),
  'spa-treatments': lazyWithRetry(() => import('../tools/SpaTreatmentBuilder')),
  'aviation-config': lazyWithRetry(() => import('../tools/AviationConfigurator')),
  'jewelry-config': lazyWithRetry(() => import('../tools/JewelryConfigurator')),
  'event-package': lazyWithRetry(() => import('../tools/EventPackageBuilder')),
} satisfies Record<ToolType, ReturnType<typeof lazyWithRetry>>;

function MobileTool({ site }: { site: Site }) {
  const Tool = toolLoaders[site.toolType];
  const props = { colors: site.colors, phone: site.phone };
  return (
    <Suspense fallback={<div className="tool-loading">Chargement de l'outil…</div>}>
      <Tool {...props} />
    </Suspense>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="pl-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'pl-star pl-star--on' : 'pl-star'}>★</span>
      ))}
    </span>
  );
}

interface Props {
  site: Site;
}

export default function PremiumLandingMobile({ site }: Props) {
  const enrichment = useMemo(() => getSiteEnrichment(site.slug), [site.slug]);
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
    <div className="premium-landing premium-landing--mobile" style={style}>
      <SiteNav site={site} />

      <header className="pl-hero pl-hero--mobile">
        <div className="pl-hero-bg">
          <img className="pl-hero-bg-photo" src={enrichment.heroImage} alt="" aria-hidden />
          <div className="pl-hero-gradient" />
          <div className="pl-hero-overlay" />
        </div>
        <div className="pl-hero-visual pl-hero-visual--mobile">
          <img src={enrichment.heroImage} alt={enrichment.heroImageAlt} loading="eager" />
        </div>
        <div className="pl-hero-content pl-hero-content--mobile">
          <div className="pl-hero-text">
            <span className="pl-badge">{site.subtitle}</span>
            <h1 className="pl-hero-title">{site.name}</h1>
            <p className="pl-tagline">{site.tagline}</p>
            <p className="pl-desc">{site.description}</p>
            <div className="pl-hero-actions">
              <a href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</a>
              <a href={phoneHref(site.phone)} className="pl-btn pl-btn--ghost">{site.ctaSecondary}</a>
            </div>
            <p className="pl-hero-meta">
              {site.location} · {enrichment.reviewSummary.score}★ ({enrichment.reviewSummary.count} avis)
            </p>
          </div>
        </div>
      </header>

      <section className="pl-reassurance pl-reassurance--mobile">
        <h2>Votre sérénité</h2>
        <div className="pl-reassurance-grid">
          {enrichment.reassurance.map((item) => (
            <div key={item.title} className="pl-reassurance-card">
              <span className="pl-reassurance-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="configurator" className="pl-configurator">
        <div className="pl-section-header">
          <span className="pl-section-label">Expérience interactive</span>
          <h2>Configurez. Estimez. Réservez.</h2>
          <p>Tout se fait en autonomie — sans appeler.</p>
        </div>
        <MobileTool site={site} />
      </section>

      <section className="pl-stats">
        <div className="pl-stats-grid">
          {site.stats.map((s) => (
            <div key={s.label} className="pl-stat">
              <span className="pl-stat-value">{s.value}</span>
              <span className="pl-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pl-gallery pl-gallery--mobile">
        <div className="pl-section-header">
          <h2>Galerie</h2>
        </div>
        <div className="pl-gallery-grid">
          {enrichment.gallery.map((img) => (
            <figure key={img.src} className="pl-gallery-item">
              <img src={img.src} alt={img.alt} loading="lazy" />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <section className="pl-services">
        <div className="pl-section-header">
          <h2>Services</h2>
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
      </section>

      <section id="location" className="pl-location pl-location--mobile">
        <div className="pl-section-header">
          <h2>Localisation</h2>
        </div>
        <p className="pl-location-district">{enrichment.location.district}</p>
        <dl className="pl-location-details">
          <div><dt>Adresse</dt><dd>{enrichment.location.address}</dd></div>
          <div><dt>Horaires</dt><dd>{enrichment.location.hours}</dd></div>
          <div><dt>Accès</dt><dd>{enrichment.location.access}</dd></div>
        </dl>
        <a href={mapsUrl(enrichment.location.mapQuery)} className="pl-btn pl-btn--primary">
          Ouvrir dans Maps
        </a>
      </section>

      <section id="avis" className="pl-reviews pl-reviews--mobile">
        <div className="pl-section-header">
          <h2>Avis clients</h2>
          <div className="pl-review-summary">
            <span className="pl-review-score">{enrichment.reviewSummary.score}</span>
            <Stars rating={Math.round(enrichment.reviewSummary.score)} />
          </div>
        </div>
        <div className="pl-reviews-grid">
          {enrichment.reviews.map((review, i) => (
            <article key={`${review.author}-${i}`} className="pl-review-card">
              <Stars rating={review.rating} />
              <p>&ldquo;{review.text}&rdquo;</p>
              <footer>
                <strong>{review.author}</strong>
                <span>{review.role}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="pl-cta">
        <div className="pl-cta-inner">
          <h2>Prêt pour {site.name} ?</h2>
          <div className="pl-hero-actions">
            <a href="#configurator" className="pl-btn pl-btn--primary">{site.ctaPrimary}</a>
            <a href={`mailto:${site.email}`} className="pl-btn pl-btn--ghost">{site.email}</a>
          </div>
        </div>
      </section>

      <footer className="pl-footer">
        <Link to="/premium">← Portfolio premium</Link>
      </footer>
    </div>
  );
}
