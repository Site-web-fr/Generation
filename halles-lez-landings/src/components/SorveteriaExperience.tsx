import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './SorveteriaExperience.css';

const campaignCards = [
  {
    kicker: 'Sextou',
    title: 'com sorvete',
    copy: 'Des creas roses et gourmandes pour lancer chaque week-end.',
    accent: 'Vanille fraise',
  },
  {
    kicker: 'Pote',
    title: 'familia',
    copy: 'Un format genereux pour commander, partager et poster.',
    accent: '5 toppings',
  },
  {
    kicker: 'Copo',
    title: 'tropical',
    copy: 'Une coupe signature pensee pour les stories.',
    accent: 'Photo ready',
  },
];

const flavors = ['Fraise cremeuse', 'Chocolat noir', 'Pistache', 'Mangue', 'Vanille bourbon', 'Framboise'];

export default function SorveteriaExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="sorveteria-experience" aria-labelledby="sorveteria-experience-title">
      <div className="sorveteria-experience-bg" aria-hidden="true">
        <span className="sorveteria-blob sorveteria-blob--one" />
        <span className="sorveteria-blob sorveteria-blob--two" />
      </div>

      <div className="sorveteria-experience-copy">
        <span className="sorveteria-kicker">Univers de marque</span>
        <h2 id="sorveteria-experience-title">Une experience glacee faite pour convertir et se partager</h2>
        <p>
          Sorveteria reprend les codes des affiches roses de la marque: gros visuels appetissants,
          messages courts, coeur iconique et mouvement doux pour guider l'oeil jusqu'a l'action.
        </p>
        <div className="sorveteria-flavor-grid" aria-label="Parfums disponibles">
          {flavors.map((flavor, index) => (
            <motion.span
              key={flavor}
              className="sorveteria-flavor"
              whileHover={reduceMotion ? undefined : { y: -5, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              style={{ '--flavor-index': index } as CSSProperties}
            >
              {flavor}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="sorveteria-social-stage" aria-label="Apercu de campagnes Sorveteria">
        <motion.div
          className="sorveteria-scoop-orbit"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <span />
          <span />
          <span />
        </motion.div>
        {campaignCards.map((card, index) => (
          <motion.article
            key={card.title}
            className="sorveteria-poster-card"
            initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: index % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: index === 1 ? 2 : index === 2 ? -2 : 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.12, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -8, rotate: 0, scale: 1.025 }}
          >
            <span className="sorveteria-heart" aria-hidden="true" />
            <p>{card.kicker}</p>
            <h3>{card.title}</h3>
            <small>{card.copy}</small>
            <strong>{card.accent}</strong>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
