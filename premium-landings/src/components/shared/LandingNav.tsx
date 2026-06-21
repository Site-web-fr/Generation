import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';
import './LandingNav.css';

interface Props {
  project: Project;
}

export default function LandingNav({ project }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`landing-nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={
        {
          '--nav-accent': project.colors.accent,
          '--nav-bg': project.colors.bg,
        } as React.CSSProperties
      }
    >
      <Link to="/" className="landing-nav-back">
        ← Showcase
      </Link>
      <span className="landing-nav-brand">{project.name}</span>
      <a href="#configurator" className="landing-nav-cta">
        {project.interactiveLabel}
      </a>
    </motion.header>
  );
}
