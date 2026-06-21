import { motion } from 'framer-motion';
import type { SiteEnrichment } from '../../data/site-enrichment';
import type { SiteTheme } from '../../data/site-themes';

interface Props {
  enrichment: SiteEnrichment;
  theme: SiteTheme;
  overlay: 'soft' | 'medium' | 'dramatic';
}

export default function HeroVisual({ enrichment, theme, overlay }: Props) {
  const isDark = theme === 'dark';

  return (
    <div className={`pl-hero-visual pl-hero-visual--${theme}`}>
      <motion.div
        className={`pl-hero-photo pl-hero-photo--immersive pl-hero-photo--overlay-${overlay}`}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={enrichment.heroImage}
          alt={enrichment.heroImageAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {!isDark && <div className="pl-hero-photo-veil" />}
      </motion.div>
    </div>
  );
}
