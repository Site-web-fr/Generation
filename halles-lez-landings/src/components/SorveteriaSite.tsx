import { useMemo, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import { assetUrl } from '../utils/url';
import './SorveteriaSite.css';

const signatureProducts = [
  {
    name: 'Casquinha Signature',
    note: 'Cornet gaufre, duo creme fraise et vanille, coulis maison.',
    price: '5,90 EUR',
    image: '/illustrations/sorveteria-hero.svg',
    tone: 'berry',
  },
  {
    name: 'Pote de Sorvete',
    note: 'Pot genereux a composer avec toppings minute et sauces brillantes.',
    price: '8,50 EUR',
    image: '/illustrations/sorveteria-pote.svg',
    tone: 'cream',
  },
  {
    name: 'Copo Tropical',
    note: 'Mangue, chantilly legere, caramel blond et coco grillee.',
    price: '7,90 EUR',
    image: '/illustrations/sorveteria-copo.svg',
    tone: 'sun',
  },
];

const flavors = [
  'Fraise cremeuse',
  'Chocolat intense',
  'Vanille bourbon',
  'Mangue passion',
  'Pistache douce',
  'Citron basilic',
  'Coco grillee',
  'Framboise rose',
];

const brandPillars = [
  ['Recettes lisibles', 'Des parfums courts, premium, faciles a comprendre et a recommander.'],
  ['Rituel photo', 'Chaque commande est pensee comme un moment partageable, sans perdre en rapidite.'],
  ['Service agile', 'Cornet, pot ou coupe: trois formats clairs pour vendre toute la journee.'],
];

const campaignFrames = [
  { title: 'Sextou com sorvete', tag: 'week-end', copy: 'Une accroche courte pour declencher l\'envie.' },
  { title: 'Ja pediu hoje?', tag: 'daily', copy: 'Un rendez-vous quotidien, simple et memorisable.' },
  { title: 'Pote pra dividir', tag: 'famille', copy: 'Un format panier moyen fort, parfait a partager.' },
  { title: 'Copo tropical', tag: 'signature', copy: 'La coupe iconique pour reels, stories et vitrines.' },
];

function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  const origin = typeof window === 'undefined' ? 'https://sorveteria.example' : window.location.origin;
  return `${origin}${base}${path.replace(/^\//, '')}`;
}

export default function SorveteriaSite() {
  const reduceMotion = useReducedMotion();
  const seo = useMemo(
    () => ({
      title: 'Sorveteria - Glaces artisanales, pots gourmands et coupes signature',
      description:
        'Site vitrine premium pour Sorveteria, nouvelle marque de glaces artisanales: cornets, pots, coupes tropicales, toppings minute et univers social media.',
      canonical: typeof window === 'undefined' ? 'https://sorveteria.example/sorveteria' : `${window.location.origin}/sorveteria`,
      siteName: 'Sorveteria',
      image: publicUrl('/illustrations/sorveteria-hero.svg'),
      type: 'website' as const,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'IceCreamShop',
        name: 'Sorveteria',
        description:
          'Nouvelle marque de glaces artisanales, cornets, pots gourmands, coupes signature et toppings minute.',
        servesCuisine: ['Glaces artisanales', 'Sorbets', 'Desserts glaces'],
        image: publicUrl('/illustrations/sorveteria-hero.svg'),
      },
    }),
    [],
  );
  useSeo(seo);

  return (
    <div className="sorveteria-site">
      <header className="sorveteria-nav" aria-label="Navigation Sorveteria">
        <a className="sorveteria-nav-logo" href="#top" aria-label="Sorveteria accueil">
          <img src={assetUrl('/logos/sorveteria.svg')} alt="Sorveteria" />
        </a>
        <nav>
          <a href="#parfums">Parfums</a>
          <a href="#signatures">Signatures</a>
          <a href="#campagnes">Campagnes</a>
        </nav>
        <a className="sorveteria-nav-cta" href="mailto:bonjour@sorveteria.fr?subject=Demande%20Sorveteria">
          Lancer la marque
        </a>
      </header>

      <main id="top">
        <section className="sorveteria-hero" aria-labelledby="sorveteria-title">
          <div className="sorveteria-hero-bg" aria-hidden="true">
            <motion.span
              className="scoop-orbit scoop-orbit-one"
              animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="scoop-orbit scoop-orbit-two"
              animate={reduceMotion ? undefined : { y: [0, 16, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
          </div>

          <motion.div
            className="sorveteria-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Nouvelle marque glacee</span>
            <h1 id="sorveteria-title">Le glacier pop, premium et impossible a oublier.</h1>
            <p>
              Sorveteria transforme la glace en rituel: recettes artisanales, formats clairs,
              packaging photogenique et campagnes sociales pretes a faire venir les gourmands.
            </p>
            <div className="sorveteria-hero-actions">
              <a className="sorveteria-button primary" href="#signatures">
                Voir les signatures
              </a>
              <a className="sorveteria-button ghost" href="#campagnes">
                Explorer l'univers
              </a>
            </div>
            <dl className="sorveteria-proof">
              <div>
                <dt>3</dt>
                <dd>formats de vente</dd>
              </div>
              <div>
                <dt>8</dt>
                <dd>parfums de lancement</dd>
              </div>
              <div>
                <dt>100%</dt>
                <dd>pense social first</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            className="sorveteria-hero-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-card-label">
              <span>Signature</span>
              <strong>Casquinha Perfeita</strong>
            </div>
            <img src={assetUrl('/illustrations/sorveteria-hero.svg')} alt="Cornet signature Sorveteria" />
          </motion.div>
        </section>

        <section className="sorveteria-strip" aria-label="Promesse de marque">
          {brandPillars.map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="sorveteria-section flavor-section" id="parfums">
          <div className="section-copy">
            <span className="eyebrow">Palette de lancement</span>
            <h2>Des parfums simples, desirables, faciles a vendre.</h2>
            <p>
              La carte evite la surcharge: des classiques rassurants, deux touches tropicales
              et une signature florale pour installer une personnalite forte.
            </p>
          </div>
          <div className="flavor-cloud" aria-label="Liste des parfums">
            {flavors.map((flavor, index) => (
              <motion.span
                key={flavor}
                style={{ '--i': index } as CSSProperties}
                whileHover={reduceMotion ? undefined : { y: -7, scale: 1.04 }}
              >
                {flavor}
              </motion.span>
            ))}
          </div>
        </section>

        <section className="sorveteria-section product-section" id="signatures">
          <div className="section-copy centered">
            <span className="eyebrow">Produits heros</span>
            <h2>Une carte courte, belle, rentable.</h2>
          </div>
          <div className="product-grid">
            {signatureProducts.map((product, index) => (
              <motion.article
                key={product.name}
                className={`product-card product-card-${product.tone}`}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.1, duration: 0.55 }}
              >
                <img src={assetUrl(product.image)} alt={product.name} />
                <div>
                  <span>{product.price}</span>
                  <h3>{product.name}</h3>
                  <p>{product.note}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="sorveteria-section campaign-section" id="campagnes">
          <div className="section-copy">
            <span className="eyebrow">Direction creative</span>
            <h2>Un systeme de campagnes pret pour Instagram, vitrine et print.</h2>
            <p>
              On garde l'energie rose de l'inspiration, mais on la rend plus propre:
              typographies fortes, cartes modulaires, micro-mouvements et hierarchy claire.
            </p>
          </div>
          <div className="campaign-board">
            {campaignFrames.map((frame, index) => (
              <motion.article
                key={frame.title}
                className="campaign-frame"
                initial={reduceMotion ? false : { opacity: 0, rotate: index % 2 ? 4 : -4, y: 24 }}
                whileInView={{ opacity: 1, rotate: index % 2 ? 1 : -1, y: 0 }}
                whileHover={reduceMotion ? undefined : { rotate: 0, y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <span>{frame.tag}</span>
                <h3>{frame.title}</h3>
                <p>{frame.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="sorveteria-launch">
          <div>
            <span className="eyebrow">Ouverture prochaine</span>
            <h2>Une marque prete a lancer: claire, gourmande, memorable.</h2>
            <p>
              Ce site peut servir de vitrine officielle, page de campagne, support franchise
              ou pre-lancement avec collecte de demandes.
            </p>
          </div>
          <a className="sorveteria-button primary" href="mailto:bonjour@sorveteria.fr?subject=Je%20veux%20lancer%20Sorveteria">
            Demander une degustation
          </a>
        </section>
      </main>
    </div>
  );
}
