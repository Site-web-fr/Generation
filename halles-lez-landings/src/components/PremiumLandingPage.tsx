import { useMemo, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { PremiumLanding, PremiumOption } from '../data/premium-landings';
import { useSeo } from '../hooks/useSeo';
import { pageUrl } from '../utils/url';
import './PremiumLandingPage.css';

interface Props {
  landing: PremiumLanding;
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function PremiumSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-90px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`premium-section ${className}`}
      initial={{ opacity: 0, y: 42 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function PremiumObject({ landing }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="premium-object"
      aria-label={`${landing.visual.object} animé`}
      animate={reduceMotion ? undefined : { y: [0, -14, 0], rotateZ: [-1, 1, -1] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
    >
      <div className="premium-object-core">
        <span>{landing.visual.object}</span>
        <small>{landing.visual.material}</small>
      </div>
      {landing.visual.layers.map((layer, index) => (
        <motion.div
          key={layer}
          className={`premium-object-layer premium-object-layer-${index + 1}`}
          animate={reduceMotion ? undefined : { rotateY: [0, 360] }}
          transition={{ repeat: Infinity, duration: 14 + index * 4, ease: 'linear' }}
        >
          {layer}
        </motion.div>
      ))}
      <div className="premium-object-shadow" />
    </motion.div>
  );
}

function PremiumConfigurator({ landing }: Props) {
  const { estimator } = landing;
  const [selected, setSelected] = useState<PremiumOption>(estimator.options[0]);
  const [primaryValue, setPrimaryValue] = useState(estimator.primarySlider.defaultValue);
  const [secondaryValue, setSecondaryValue] = useState(estimator.secondarySlider.defaultValue);

  const estimate = useMemo(() => {
    const total =
      estimator.base +
      selected.setup +
      primaryValue * estimator.primarySlider.pricePerUnit +
      secondaryValue * estimator.secondarySlider.pricePerUnit;

    return Math.round(total / 10) * 10;
  }, [estimator, primaryValue, secondaryValue, selected]);

  return (
    <div className="premium-configurator" id="configurer">
      <div className="premium-configurator-copy">
        <span className="premium-kicker">Assistant interactif</span>
        <h2>{estimator.title}</h2>
        <p>{estimator.intro}</p>
      </div>

      <div className="premium-configurator-panel">
        <div className="premium-choice-group">
          <span>{estimator.optionLabel}</span>
          <div className="premium-choice-grid">
            {estimator.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`premium-choice ${option.value === selected.value ? 'is-selected' : ''}`}
                onClick={() => setSelected(option)}
              >
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </button>
            ))}
          </div>
        </div>

        <label className="premium-slider">
          <span>
            {estimator.primarySlider.label}
            <strong>
              {primaryValue} {estimator.primarySlider.unit}
            </strong>
          </span>
          <input
            type="range"
            min={estimator.primarySlider.min}
            max={estimator.primarySlider.max}
            value={primaryValue}
            onChange={(event) => setPrimaryValue(Number(event.target.value))}
          />
        </label>

        <label className="premium-slider">
          <span>
            {estimator.secondarySlider.label}
            <strong>
              {secondaryValue} {estimator.secondarySlider.unit}
            </strong>
          </span>
          <input
            type="range"
            min={estimator.secondarySlider.min}
            max={estimator.secondarySlider.max}
            value={secondaryValue}
            onChange={(event) => setSecondaryValue(Number(event.target.value))}
          />
        </label>

        <div className="premium-estimate-card">
          <span>{estimator.resultLabel}</span>
          <strong>{formatMoney(estimate, estimator.currency)}</strong>
          <p>
            Simulation instantanée pour cadrer la demande. Le montant final reste validé par le conseiller selon les
            disponibilités et contraintes métier.
          </p>
        </div>

        <div className="premium-included-grid">
          {estimator.included.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <a href={`mailto:contact@example.com?subject=${encodeURIComponent(landing.name)}`} className="premium-btn premium-btn-primary">
          {estimator.cta}
        </a>
      </div>
    </div>
  );
}

export default function PremiumLandingPage({ landing }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const seo = useMemo(
    () => ({
      title: `${landing.name} — ${landing.category} | Landing page premium`,
      description: landing.subheadline.slice(0, 158),
      canonical: pageUrl(`premium/${landing.slug}`),
      type: 'website' as const,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: landing.name,
        description: landing.description,
        areaServed: landing.city,
        url: pageUrl(`premium/${landing.slug}`),
      },
    }),
    [landing],
  );

  useSeo(seo);

  const style = {
    '--premium-accent': landing.accent,
    '--premium-secondary': landing.secondary,
    '--premium-surface': landing.surface,
    '--premium-glow': landing.glow,
    '--premium-tilt-x': `${tilt.x}deg`,
    '--premium-tilt-y': `${tilt.y}deg`,
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10;
    const y = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    setTilt({ x, y });
  };

  return (
    <div className="premium-page" style={style}>
      <div className="premium-page-noise" aria-hidden="true" />
      <header className="premium-nav">
        <Link to="/premium" className="premium-nav-link">
          ← Les 10 concepts
        </Link>
        <Link to="/" className="premium-nav-link premium-nav-home">
          Halles du Lez
        </Link>
      </header>

      <main>
        <section className="premium-hero">
          <div className="premium-hero-copy">
            <motion.span
              className="premium-badge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {landing.eyebrow} · {landing.city}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              {landing.headline}
            </motion.h1>
            <motion.p
              className="premium-hero-lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              {landing.subheadline}
            </motion.p>
            <motion.div
              className="premium-hero-actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              <a href="#configurer" className="premium-btn premium-btn-primary">
                Tester l’expérience
              </a>
              <a href="#strategie" className="premium-btn premium-btn-ghost">
                Voir le concept UX
              </a>
            </motion.div>
          </div>

          <motion.div
            className="premium-hero-stage"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="premium-stage-orbit" />
            <PremiumObject landing={landing} />
            <div className="premium-stage-console">
              <span>{landing.category}</span>
              <strong>{landing.name}</strong>
              <small>{landing.proof}</small>
            </div>
          </motion.div>
        </section>

        <section className="premium-stats-strip">
          {landing.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <PremiumSection className="premium-positioning" id="strategie">
          <span className="premium-kicker">Stratégie de conversion</span>
          <h2>{landing.name}</h2>
          <p>{landing.description}</p>
        </PremiumSection>

        <PremiumSection>
          <PremiumConfigurator landing={landing} />
        </PremiumSection>

        <PremiumSection className="premium-services-section">
          <div className="premium-section-header">
            <span className="premium-kicker">Expérience pensée par une agence de 200 personnes</span>
            <h2>Chaque bloc aide le client sans l’obliger à appeler.</h2>
          </div>
          <div className="premium-services-grid">
            {landing.services.map((service, index) => (
              <motion.article
                key={service.title}
                className="premium-service-card"
                whileHover={{ y: -8, rotateX: 3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </motion.article>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection className="premium-journey-section">
          <div className="premium-section-header">
            <span className="premium-kicker">Tunnel utilisateur</span>
            <h2>Un parcours autonome, clair et premium.</h2>
          </div>
          <div className="premium-journey">
            {landing.journey.map((step, index) => (
              <div key={step} className="premium-journey-step">
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection className="premium-testimonial-section">
          <figure className="premium-testimonial">
            <blockquote>“{landing.testimonial.text}”</blockquote>
            <figcaption>{landing.testimonial.author}</figcaption>
          </figure>
          <div className="premium-final-card">
            <span className="premium-kicker">Prototype premium</span>
            <h2>Prêt à transformer ce concept en maquette complète.</h2>
            <p>
              Hero cinématique, estimateur, tunnel de qualification, animations 3D CSS, contenus sectoriels et CTA
              orientés réservation.
            </p>
            <a href="#configurer" className="premium-btn premium-btn-primary">
              Rejouer la configuration
            </a>
          </div>
        </PremiumSection>
      </main>
    </div>
  );
}
