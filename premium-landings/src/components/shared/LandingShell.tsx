import type { Project } from '../../data/projects';
import LandingNav from './LandingNav';
import ScrollProgress from './ScrollProgress';
import ThreeBackground from './ThreeBackground';
import Section from './Section';
import './LandingShell.css';
import './ThreeBackground.css';

interface Props {
  project: Project;
  configurator: React.ReactNode;
  heroVisual?: React.ReactNode;
  stats?: { value: string; label: string }[];
}

export default function LandingShell({ project, configurator, heroVisual, stats }: Props) {
  const style = {
    '--bg': project.colors.bg,
    '--bg-alt': project.colors.bgAlt,
    '--primary': project.colors.primary,
    '--accent': project.colors.accent,
    '--text': project.colors.text,
    '--muted': project.colors.muted,
    '--hero-gradient': project.heroGradient,
  } as React.CSSProperties;

  return (
    <div className="landing" style={style}>
      <ScrollProgress />
      <LandingNav project={project} />

      <section className="landing-hero">
        <div className="landing-hero-glow" />
        <ThreeBackground color={project.colors.accent} variant="both" />
        <div className="landing-hero-content">
          <span className="landing-hero-badge">{project.sector}</span>
          <h1>{project.name}</h1>
          <p className="landing-hero-tagline">{project.tagline}</p>
          <div className="landing-hero-actions">
            <a href="#configurator" className="landing-btn-primary">
              {project.interactiveLabel} →
            </a>
            <a href="#features" className="landing-btn-ghost">
              Découvrir
            </a>
          </div>
          {stats && (
            <div className="landing-stats">
              {stats.map((s) => (
                <div key={s.label} className="landing-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {heroVisual}
      </section>

      <Section className="landing-section" id="configurator">
        <h2 className="landing-section-title">{project.interactiveLabel}</h2>
        <p className="landing-section-sub">
          Configurez, estimez et réservez en autonomie — sans appel, sans attente.
        </p>
        <div className="configurator">{configurator}</div>
      </Section>

      <Section className="landing-section" id="features">
        <h2 className="landing-section-title">Expérience premium</h2>
        <p className="landing-section-sub">{project.description}</p>
        <div className="features-grid">
          {project.features.map((f) => (
            <div key={f} className="feature-card">
              <h3>{f}</h3>
              <p>Interface pensée pour convertir — parcours fluide, micro-interactions, résultat immédiat.</p>
            </div>
          ))}
        </div>
      </Section>

      <footer className="landing-footer">
        <p>
          <strong>{project.name}</strong> · Démonstration commerciale · Budget indicatif {project.budget}
        </p>
      </footer>
    </div>
  );
}
