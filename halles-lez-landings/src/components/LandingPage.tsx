import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import type { Brand } from '../data/brands';
import { useSeo } from '../hooks/useSeo';
import ShareBar, { BrandLogo } from './ShareBar';
import { brands } from '../data/brands';
import { getBrandVideo } from '../data/videos';
import { assetUrl } from '../utils/url';
import { brandSeo } from '../utils/seo';
import HeroDishVideo from './HeroDishVideo';
import HallesFloorPlan from './HallesFloorPlan';
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
  const [locationView, setLocationView] = useState<'plan' | 'maps'>('plan');
  const heroRef = useRef(null);
  const featured = brand.menu[0];
  const secondary = brand.menu[1];
  const heroVideo = useMemo(() => getBrandVideo(brand.slug), [brand.slug]);
  const seo = useMemo(() => brandSeo(brand), [brand]);
  useSeo(seo);

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
          ← Propositions
        </Link>
        <BrandLogo
          slug={brand.slug}
          alt={brand.name}
          className="nav-logo"
          logo={brand.logo}
          logoFallback={brand.logoFallback}
        />
        <div className="landing-nav-actions">
          {brand.uberEats ? (
            <a href={brand.uberEats} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-uber">
              Uber Eats
            </a>
          ) : (
            <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
              Itinéraire
            </a>
          )}
        </div>
      </header>

      <ShareBar slug={brand.slug} brandName={brand.name} />

      <main>
      <motion.section ref={heroRef} className="hero" aria-label={`${brand.name} — accueil`}>
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>

        <div className="hero-layout">
          <motion.div
            className="hero-showcase"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-visual">
              {heroVideo ? (
                <HeroDishVideo
                  src={heroVideo.src}
                  poster={featured?.image ?? brand.heroImage ?? ''}
                  alt={`${featured?.name ?? brand.name} — ${brand.name}`}
                  objectPosition={heroVideo.objectPosition}
                />
              ) : featured?.image ? (
                <img
                  src={assetUrl(featured.image)}
                  alt={`${featured.name} — ${brand.name}`}
                  className="hero-dish"
                  fetchPriority="high"
                />
              ) : (
                <div className="hero-dish hero-dish-fallback">{featured?.emoji ?? '🍽️'}</div>
              )}
              <div className="hero-visual-shine" aria-hidden="true" />
              {featured?.badge && <span className="hero-offer-badge">{featured.badge}</span>}
              {featured?.price && <span className="hero-price-tag">{featured.price}</span>}
            </div>
            {secondary?.image && (
              <motion.div
                className="hero-visual-secondary"
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <img src={assetUrl(secondary.image)} alt={secondary.name} loading="lazy" />
                <span>{secondary.name}</span>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <span className="hero-badge">{brand.stand} · Halles du Lez · Montpellier</span>
            <BrandLogo
              slug={brand.slug}
              alt={brand.name}
              className="hero-logo"
              logo={brand.logo}
              logoFallback={brand.logoFallback}
            />
            <h1>{brand.name}</h1>
            <p className="hero-subtitle">{brand.tagline}</p>

            {featured && (
              <div className="hero-offer-card">
                <p className="hero-offer-label">L&apos;incontournable</p>
                <p className="hero-offer-title">
                  {featured.name} <strong>{featured.price}</strong>
                </p>
                <p className="hero-offer-desc">{featured.description}</p>
              </div>
            )}

            <p className="hero-desc">{brand.description}</p>

            <div className="hero-ctas">
            {brand.uberEats ? (
              <a href={brand.uberEats} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <span className="uber-icon">UE</span>
                {brand.ctaPrimary}
              </a>
            ) : (
              <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {brand.ctaPrimary}
              </a>
            )}
            <a href="#menu" className="btn btn-ghost btn-lg">
              {brand.ctaSecondary}
            </a>
            </div>

            <div className="hero-stats">
              {brand.stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </motion.section>

      <div className="urgency-bar">
        <span>🔥 Ouvert aujourd&apos;hui</span>
        <span className="sep">·</span>
        <span>{brand.hours}</span>
        <span className="sep">·</span>
        <span>Tram L3 Pablo Picasso</span>
      </div>

      <Section className="perks-section">
        <div className="perks-grid">
          {brand.perks.map((perk, i) => (
            <motion.div
              key={perk}
              className="perk-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <span className="perk-check">✓</span>
              {perk}
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="menu-section" id="menu">
        <div className="section-header">
          <span className="section-label">{brand.cuisine}</span>
          <h2>Nos incontournables</h2>
        </div>
        <div className="menu-grid">
          {brand.menu.map((item, i) => (
            <motion.article
              key={item.name}
              className="menu-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              {item.image ? (
                <div className="menu-photo-wrap">
                  <img src={assetUrl(item.image)} alt={item.name} className="menu-photo" loading="lazy" />
                </div>
              ) : (
                <div className="menu-emoji">{item.emoji}</div>
              )}
              {item.badge && <span className="menu-badge">{item.badge}</span>}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="menu-footer">
                <span className="menu-price">{item.price}</span>
                {brand.uberEats ? (
                  <a href={brand.uberEats} target="_blank" rel="noopener noreferrer" className="menu-order">
                    Commander →
                  </a>
                ) : (
                  <a href={brand.googleMaps} className="menu-order">
                    Venir →
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {brand.gallery && brand.gallery.length > 0 && (
        <Section className="gallery-section" id="galerie">
          <div className="section-header">
            <span className="section-label">En images</span>
            <h2>L&apos;ambiance {brand.name}</h2>
          </div>
          <div className="gallery-grid">
            {brand.gallery.map((img, i) => (
              <motion.figure
                key={img.src}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <img src={assetUrl(img.src)} alt={img.alt} loading="lazy" />
              </motion.figure>
            ))}
          </div>
          {brand.instagram && (
            <p className="gallery-instagram">
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
                Voir plus sur Instagram →
              </a>
            </p>
          )}
        </Section>
      )}

      <Section className="social-section">
        <div className="testimonial-card">
          <div className="quote-mark">"</div>
          <p>{brand.testimonials[0].text}</p>
          <cite>— {brand.testimonials[0].author}</cite>
        </div>
      </Section>

      <Section className="location-section" id="venir">
        <div className="location-grid">
          <div className="location-info">
            <h2>Venez nous trouver</h2>
            <p className="location-address">{brand.address}</p>
            <ul className="location-details">
              <li><strong>Horaires</strong> {brand.hours}</li>
              <li><strong>Stand</strong> {brand.stand}</li>
              {brand.phone && <li><strong>Tél</strong> {brand.phone}</li>}
            </ul>
            <div className="location-actions">
              <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                📍 Itinéraire Google Maps
              </a>
              {brand.instagram && (
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  Instagram
                </a>
              )}
            </div>
          </div>
          <div className="location-visual">
            <div className="location-view-tabs" role="tablist" aria-label="Mode de localisation">
              <button
                type="button"
                role="tab"
                aria-selected={locationView === 'plan'}
                className={`location-view-tab ${locationView === 'plan' ? 'is-active' : ''}`}
                onClick={() => setLocationView('plan')}
              >
                Plan des Halles
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={locationView === 'maps'}
                className={`location-view-tab ${locationView === 'maps' ? 'is-active' : ''}`}
                onClick={() => setLocationView('maps')}
              >
                Google Maps
              </button>
            </div>
            {locationView === 'plan' ? (
              <HallesFloorPlan
                slug={brand.slug}
                brandName={brand.name}
                standLabel={brand.stand}
                primaryColor={brand.colors.primary}
              />
            ) : (
              <div className="location-map">
                <iframe
                  title={`Carte ${brand.name}`}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.5!2d3.9059!3d43.5927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af5b9210be4f%3A0x37115173b8fa1d62!2sHalles%20du%20Lez!5e0!3m2!1sfr!2sfr!4v1"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="final-cta">
        <h2>Prêt à vous régaler ?</h2>
        <p>Rejoignez des milliers de gourmands aux Halles du Lez.</p>
        <div className="final-cta-buttons">
          {brand.uberEats ? (
            <a href={brand.uberEats} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl">
              {brand.ctaPrimary}
            </a>
          ) : (
            <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl">
              {brand.ctaPrimary}
            </a>
          )}
          {brand.instagram && (
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-xl">
              Suivre sur Instagram
            </a>
          )}
        </div>
      </Section>

      </main>

      <footer className="landing-footer">
        <p>
          Proposition commerciale · Landing page démo · {brand.name} · Halles du Lez Montpellier
        </p>
        {brand.imageCredit && <p className="image-credit">{brand.imageCredit}</p>}
        {heroVideo && <p className="image-credit">{heroVideo.credit}</p>}
        <Link to="/">← Retour aux {brands.length} propositions</Link>
      </footer>

      <div className={`sticky-cta no-print ${scrolled ? 'visible' : ''}`}>
        {brand.uberEats ? (
          <a href={brand.uberEats} target="_blank" rel="noopener noreferrer" className="sticky-btn sticky-uber">
            <span>Commander</span>
            <small>Uber Eats</small>
          </a>
        ) : (
          <a href={brand.googleMaps} target="_blank" rel="noopener noreferrer" className="sticky-btn">
            <span>Y aller</span>
            <small>Maps</small>
          </a>
        )}
        <a href="#menu" className="sticky-btn sticky-menu">
          <span>Menu</span>
        </a>
      </div>
    </div>
  );
}
