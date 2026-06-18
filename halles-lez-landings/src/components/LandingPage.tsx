import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import type { Brand } from '../data/brands';
import { menuLink } from '../data/brands';
import { useSeo } from '../hooks/useSeo';
import { usePitchMode } from '../hooks/usePitchMode';
import { brandSeo } from '../utils/seo';
import { formatPhoneDisplay, phoneHref } from '../data/stand-contacts';
import ShareBar from './ShareBar';
import BrandHeroLogo from './BrandHeroLogo';
import './LandingPage.css';

interface Props {
  brand: Brand;
}

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage({ brand }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pitchMode = usePitchMode();
  const seo = useMemo(() => brandSeo(brand), [brand]);
  useSeo(seo);

  const carte = menuLink(brand);
  const orderHref = carte?.href ?? brand.googleMaps;
  const orderLabel = brand.uberEats ? 'Commander sur Uber Eats' : carte ? carte.label : 'Itinéraire';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const style = {
    '--brand-bg': brand.colors.bg,
    '--brand-bg-alt': brand.colors.bgAlt,
    '--brand-primary': brand.colors.primary,
    '--brand-secondary': brand.colors.secondary,
    '--brand-accent': brand.colors.accent,
    '--brand-text': brand.colors.text,
    '--brand-muted': brand.colors.muted,
    '--brand-cta': brand.colors.cta,
    '--brand-cta-text': brand.colors.ctaText,
    '--font-heading': brand.fonts.heading,
    '--font-body': brand.fonts.body,
    '--font-heading-spacing': brand.fonts.headingSpacing ?? 'normal',
    '--font-heading-transform': brand.fonts.headingTransform ?? 'none',
    '--hero-pattern': brand.heroPattern,
    '--hero-glow': brand.heroGlow,
  } as React.CSSProperties;

  return (
    <div className="landing" style={style}>
      <header className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="landing-nav-back">
          {pitchMode ? '← Halles du Lez' : '← Tous les commerces'}
        </Link>
        <BrandHeroLogo slug={brand.slug} name={brand.name} variant="nav" className="nav-logo" />
        <div className="landing-nav-actions">
          {brand.phone && (
            <a href={phoneHref(brand.phone)} className="btn btn-sm btn-call">
              Appeler
            </a>
          )}
          <a
            href={orderHref}
            target={carte ? '_blank' : undefined}
            rel={carte ? 'noopener noreferrer' : undefined}
            className={`btn btn-sm ${brand.uberEats ? 'btn-uber' : 'btn-outline'}`}
          >
            {brand.uberEats ? 'Uber Eats' : 'Itinéraire'}
          </a>
        </div>
      </header>

      <ShareBar slug={brand.slug} brandName={brand.name} pitchMode={pitchMode} />

      <main>
        <section className="hero" aria-label={`${brand.name} — accueil`}>
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
          </div>

          <motion.div
            className="hero-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-badge">
              {brand.stand} · {brand.entrance} · Halles du Lez
            </span>

            <div className="hero-nameplate-wrap">
              <BrandHeroLogo slug={brand.slug} name={brand.name} variant="hero" className="hero-logo" />
            </div>

            <p className="hero-type">{brand.type}</p>
            <p className="hero-desc">{brand.description}</p>

            <div className="hero-ctas">
              <a
                href={orderHref}
                target={carte ? '_blank' : undefined}
                rel={carte ? 'noopener noreferrer' : undefined}
                className="btn btn-primary btn-lg"
              >
                {brand.uberEats && <span className="uber-icon">UE</span>}
                {orderLabel}
              </a>
              {brand.phone && (
                <a href={phoneHref(brand.phone)} className="btn btn-outline btn-lg btn-call">
                  📞 {formatPhoneDisplay(brand.phone)}
                </a>
              )}
              <a href="#carte" className="btn btn-ghost btn-lg">
                Les spécialités
              </a>
            </div>

            <div className="hero-facts">
              <div className="hero-fact">
                <strong>{brand.stand}</strong>
                <span>Stand</span>
              </div>
              <div className="hero-fact">
                <strong>{brand.entrance.replace('Entrée ', '')}</strong>
                <span>Entrée</span>
              </div>
              <div className="hero-fact">
                <strong>Tram L3</strong>
                <span>Pablo Picasso</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-scroll"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            aria-hidden="true"
          >
            ↓
          </motion.div>
        </section>

        <div className="info-bar">
          <span>📍 {brand.stand} · {brand.entrance}</span>
          <span className="sep">·</span>
          <span>{brand.hours ?? 'Aux horaires des Halles du Lez'}</span>
          <span className="sep">·</span>
          <span>Tram L3 Pablo Picasso</span>
        </div>

        <Section className="specialties-section" id="carte">
          <div className="section-header">
            <span className="section-label">{brand.type}</span>
            <h2>Les spécialités</h2>
            <p className="section-lead">
              Une sélection de ce que prépare {brand.name}. La carte complète et les tarifs sont à
              retrouver {carte ? 'en ligne' : 'directement au stand'}.
            </p>
          </div>

          <ul className="specialties-grid">
            {brand.specialties.map((item, i) => (
              <motion.li
                key={item}
                className="specialty-chip"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="specialty-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="specialty-name">{item}</span>
              </motion.li>
            ))}
          </ul>

          {carte && (
            <div className="menu-cta-row">
              <a href={carte.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {carte.label} →
              </a>
              <p className="menu-note">Carte et prix officiels mis à jour par {brand.name}.</p>
            </div>
          )}
        </Section>

        <Section className="location-section" id="venir">
          <div className="location-grid">
            <div className="location-info">
              <h2>Venez nous trouver</h2>
              <p className="location-address">{brand.address}</p>
              <ul className="location-details">
                <li><strong>Stand</strong> {brand.stand} · {brand.entrance}</li>
                {brand.hours && <li><strong>Horaires</strong> {brand.hours}</li>}
                {brand.phone && <li><strong>Téléphone</strong> {formatPhoneDisplay(brand.phone)}</li>}
                <li><strong>Accès</strong> Tram L3 — arrêt Pablo Picasso · Parking sur place</li>
              </ul>
              <div className="location-actions">
                {brand.phone && (
                  <a href={phoneHref(brand.phone)} className="btn btn-primary btn-call">
                    📞 Appeler {formatPhoneDisplay(brand.phone)}
                  </a>
                )}
                <a
                  href={brand.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${brand.phone ? 'btn-outline' : 'btn-primary'}`}
                >
                  📍 Itinéraire Google Maps
                </a>
                {brand.instagram && (
                  <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    Instagram
                  </a>
                )}
                {!brand.instagram && brand.facebook && (
                  <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    Facebook
                  </a>
                )}
              </div>
            </div>
            <div className="location-map">
              <iframe
                title={`Carte ${brand.name}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.5!2d3.9059!3d43.5927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af5b9210be4f%3A0x37115173b8fa1d62!2sHalles%20du%20Lez!5e0!3m2!1sfr!2sfr!4v1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Section>

        <Section className="reviews-section">
          <div className="reviews-card">
            <h2>Vous connaissez {brand.name} ?</h2>
            <p>Consultez les avis des clients sur Google, ou suivez l’actu du stand sur ses réseaux.</p>
            <div className="reviews-actions">
              <a href={brand.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                ★ Voir les avis Google
              </a>
              {brand.instagram && (
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Suivre sur Instagram
                </a>
              )}
              {brand.facebook && (
                <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Suivre sur Facebook
                </a>
              )}
            </div>
          </div>
        </Section>

        <Section className="final-cta">
          <h2>Rendez-vous aux Halles du Lez</h2>
          <p>
            {brand.name} · {brand.stand} · {brand.entrance} · Montpellier
          </p>
          <div className="final-cta-buttons">
            <a
              href={orderHref}
              target={carte ? '_blank' : undefined}
              rel={carte ? 'noopener noreferrer' : undefined}
              className="btn btn-primary btn-xl"
            >
              {orderLabel}
            </a>
            <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xl">
              📍 Itinéraire
            </a>
          </div>
        </Section>
      </main>

      <footer className="landing-footer">
        <p>{brand.name} · {brand.stand} · Halles du Lez · 1348 Avenue Raymond Dugrand, Montpellier</p>
        <p className="swm-credit">
          Maquette proposée par <strong>Site Web Montpellier</strong> ·{' '}
          <a href="https://www.sitewebmontpellier.fr" target="_blank" rel="noopener noreferrer">
            sitewebmontpellier.fr
          </a>
        </p>
        <Link to="/">{pitchMode ? '← Retour aux Halles du Lez' : '← Tous les commerces'}</Link>
      </footer>

      <div className={`sticky-cta no-print ${scrolled ? 'visible' : ''}`}>
        {brand.phone && (
          <a href={phoneHref(brand.phone)} className="sticky-btn sticky-call">
            <span>Appeler</span>
            <small>{formatPhoneDisplay(brand.phone)}</small>
          </a>
        )}
        <a
          href={orderHref}
          target={carte ? '_blank' : undefined}
          rel={carte ? 'noopener noreferrer' : undefined}
          className={`sticky-btn ${brand.uberEats ? 'sticky-uber' : ''}`}
        >
          <span>{brand.uberEats ? 'Commander' : 'Itinéraire'}</span>
          <small>{brand.uberEats ? 'Uber Eats' : 'Google Maps'}</small>
        </a>
        <a href="#carte" className="sticky-btn sticky-menu">
          <span>Spécialités</span>
        </a>
      </div>
    </div>
  );
}
