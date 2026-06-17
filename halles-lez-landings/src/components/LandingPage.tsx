import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Brand } from '../data/brands';
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    '--hero-pattern': brand.heroPattern,
    '--hero-glow': brand.heroGlow,
  } as React.CSSProperties;

  return (
    <div className="landing" style={style}>
      <header className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="landing-nav-back">
          ← Propositions
        </Link>
        <span className="landing-nav-logo">{brand.name}</span>
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

      <motion.section ref={heroRef} className="hero">
        <div className="hero-bg" />
        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {brand.stand} · Halles du Lez
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {brand.name}
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {brand.tagline}
          </motion.p>
          <motion.p className="hero-desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {brand.description}
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
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
          </motion.div>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {brand.stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-scroll"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
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
              <div className="menu-emoji">{item.emoji}</div>
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
          <div className="location-map">
            <iframe
              title={`Carte ${brand.name}`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.5!2d3.9059!3d43.5927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6a8c8e8e8e8e8%3A0x0!2sHalles%20du%20Lez!5e0!3m2!1sfr!2sfr!4v1"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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

      <footer className="landing-footer">
        <p>
          Proposition commerciale · Landing page démo · {brand.name} · Halles du Lez Montpellier
        </p>
        <Link to="/">← Retour aux 10 propositions</Link>
      </footer>

      <div className={`sticky-cta ${scrolled ? 'visible' : ''}`}>
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
