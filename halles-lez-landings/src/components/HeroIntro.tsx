import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { assetUrl } from '../utils/url';
import './HeroIntro.css';

interface Props {
  brandName: string;
  logo: string;
  logoFallback?: string;
  primaryColor: string;
  bgColor: string;
}

const INTRO_MS = 1650;

export default function HeroIntro({
  brandName,
  logo,
  logoFallback,
  primaryColor,
  bgColor,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setTimeout(() => setVisible(false), INTRO_MS);
    return () => window.clearTimeout(t);
  }, [reduceMotion, brandName]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hero-intro"
          style={{ '--intro-bg': bgColor, '--intro-accent': primaryColor } as React.CSSProperties}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <motion.div
            className="hero-intro-panel hero-intro-panel--left"
            initial={{ x: 0 }}
            animate={{ x: '-102%' }}
            transition={{ delay: 0.85, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="hero-intro-panel hero-intro-panel--right"
            initial={{ x: 0 }}
            animate={{ x: '102%' }}
            transition={{ delay: 0.85, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="hero-intro-content">
            <motion.p
              className="hero-intro-venue"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Halles du Lez · Montpellier
            </motion.p>
            <motion.img
              src={assetUrl(logo)}
              alt=""
              className="hero-intro-logo"
              initial={{ opacity: 0, scale: 0.72, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              onError={(e) => {
                const img = e.currentTarget;
                const fb = assetUrl(logoFallback ?? logo);
                if (img.src !== fb) img.src = fb;
              }}
            />
            <motion.div
              className="hero-intro-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
