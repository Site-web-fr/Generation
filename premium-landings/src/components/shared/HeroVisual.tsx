import { motion } from 'framer-motion';
import type { SiteEnrichment } from '../../data/site-enrichment';

interface Props {
  enrichment: SiteEnrichment;
}

export default function HeroVisual({ enrichment }: Props) {
  const thumbs = enrichment.gallery.slice(0, 2);

  return (
    <div className="pl-hero-visual">
      <motion.div
        className="pl-hero-photo pl-hero-photo--main"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={enrichment.heroImage}
          alt={enrichment.heroImageAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="pl-hero-photo-shine" />
      </motion.div>
      {thumbs.length >= 2 && (
        <div className="pl-hero-photo-stack">
          {thumbs.map((img, i) => (
            <motion.div
              key={img.src}
              className="pl-hero-photo pl-hero-photo--thumb"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
            >
              <img src={img.src} alt={img.alt} loading="eager" decoding="async" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
