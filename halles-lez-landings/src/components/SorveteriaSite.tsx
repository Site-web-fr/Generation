import { useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import { assetUrl } from '../utils/url';
import './SorveteriaSite.css';

const PHOTO = {
  cone: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1400&q=85',
  trio: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?auto=format&fit=crop&w=1400&q=85',
  gelato: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=1400&q=85',
};

const HERO_VIDEO = 'https://www.pexels.com/video/6183107/download/';

const journeySteps = [
  {
    step: '01',
    title: 'Arrive',
    copy: 'A pastel facade, cold vapor in the window, and one product hero visible from the street.',
  },
  {
    step: '02',
    title: 'Compose',
    copy: 'The menu behaves like a flavor lab: short choices, instant pairing, zero decision fatigue.',
  },
  {
    step: '03',
    title: 'Capture',
    copy: 'Every cup, cone and spoon has a camera angle. The product is designed to be photographed.',
  },
  {
    step: '04',
    title: 'Return',
    copy: 'Limited drops, rotating toppings and collectible campaign visuals create repeat visits.',
  },
];

const flavorLab = [
  {
    name: 'Fraise Velours',
    mood: 'Romantic, creamy, viral',
    pairing: 'Vanille bourbon + coulis fraise + heart candy',
    color: '#ef3f8f',
    glow: '#ffd7e8',
    image: '/illustrations/sorveteria-hero.svg',
  },
  {
    name: 'Mango Neon',
    mood: 'Sunny, sharp, refreshing',
    pairing: 'Mangue passion + citron basilic + coconut snow',
    color: '#ffb703',
    glow: '#fff2a8',
    image: '/illustrations/sorveteria-copo.svg',
  },
  {
    name: 'Cocoa Crush',
    mood: 'Bold, premium, late-night',
    pairing: 'Chocolat noir + caramel blond + waffle crunch',
    color: '#6f3f2b',
    glow: '#e9c2a5',
    image: '/illustrations/sorveteria-pote.svg',
  },
];

const signatures = [
  {
    name: 'The Pink Cone',
    price: '5.90',
    image: PHOTO.cone,
    stat: '32 sec',
    label: 'Fastest order',
    copy: 'A clean hero product for first-time customers and street visibility.',
  },
  {
    name: 'The Social Pot',
    price: '8.50',
    image: '/illustrations/sorveteria-pote.svg',
    stat: '+38%',
    label: 'Basket lift',
    copy: 'Built for toppings, sharing and higher average order value.',
  },
  {
    name: 'The Tropical Cup',
    price: '7.90',
    image: PHOTO.gelato,
    stat: '9:16',
    label: 'Story ready',
    copy: 'Layered colors and height make it the reel-friendly signature.',
  },
];

const mediaMoments = [
  { title: 'Window tease', tag: 'Before order', image: PHOTO.trio },
  { title: 'Scoop drop', tag: 'At counter', image: '/illustrations/sorveteria-hero.svg' },
  { title: 'Hand-off shot', tag: 'After payment', image: PHOTO.cone },
  { title: 'Table ritual', tag: 'Share moment', image: '/illustrations/sorveteria-copo.svg' },
];

const campaigns = ['Sextou com sorvete', 'Ja pediu hoje?', 'Pote pra dividir', 'Copo tropical', 'Volta amanha'];

function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  const origin = typeof window === 'undefined' ? 'https://sorveteria.example' : window.location.origin;
  return `${origin}${base}${path.replace(/^\//, '')}`;
}

function imageSrc(path: string) {
  return path.startsWith('http') ? path : assetUrl(path);
}

export default function SorveteriaSite() {
  const reduceMotion = useReducedMotion();
  const [activeFlavor, setActiveFlavor] = useState(0);
  const selectedFlavor = flavorLab[activeFlavor];

  const seo = useMemo(
    () => ({
      title: 'Sorveteria - Cinematic ice cream brand experience',
      description:
        'A modern, dynamic Sorveteria website with an immersive customer journey, interactive flavor lab, social media campaign system and premium ice cream visuals.',
      canonical:
        typeof window === 'undefined' ? 'https://sorveteria.example/sorveteria' : `${window.location.origin}/sorveteria`,
      siteName: 'Sorveteria',
      image: publicUrl('/illustrations/sorveteria-hero.svg'),
      type: 'website' as const,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'IceCreamShop',
        name: 'Sorveteria',
        description: 'Cinematic ice cream brand with cones, cups, topping rituals and social-first campaigns.',
        servesCuisine: ['Ice cream', 'Sorbet', 'Gelato', 'Frozen desserts'],
        image: publicUrl('/illustrations/sorveteria-hero.svg'),
      },
    }),
    [],
  );
  useSeo(seo);

  return (
    <div
      className="sorveteria-site"
      style={
        {
          '--flavor-color': selectedFlavor.color,
          '--flavor-glow': selectedFlavor.glow,
        } as CSSProperties
      }
    >
      <div className="site-noise" aria-hidden="true" />

      <header className="sorveteria-nav" aria-label="Sorveteria navigation">
        <a className="sorveteria-nav-logo" href="#top" aria-label="Sorveteria home">
          <img src={assetUrl('/logos/sorveteria.svg')} alt="Sorveteria" />
        </a>
        <nav>
          <a href="#journey">Journey</a>
          <a href="#lab">Flavor lab</a>
          <a href="#media">Media</a>
          <a href="#drop">Launch</a>
        </nav>
        <a className="sorveteria-nav-cta" href="mailto:bonjour@sorveteria.fr?subject=Sorveteria%20launch">
          Start the drop
        </a>
      </header>

      <main id="top">
        <section className="sorveteria-hero" aria-labelledby="sorveteria-title">
          <div className="hero-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <motion.div
            className="sorveteria-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Cinematic scoop house</span>
            <h1 id="sorveteria-title">
              Ice cream that feels like a <em>drop</em>, not a dessert.
            </h1>
            <p>
              A sensory website for a new Sorveteria brand: motion-led, social-first, premium enough
              to trust, playful enough to share.
            </p>
            <div className="sorveteria-hero-actions">
              <a className="sorveteria-button primary" href="#lab">
                Build my scoop
              </a>
              <a className="sorveteria-button ghost" href="#journey">
                See the journey
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-cinema"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
            transition={{ delay: 0.14, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={PHOTO.cone}
              aria-label="Joyful ice cream lifestyle video"
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
            <div className="video-fallback" aria-hidden="true">
              <img src={assetUrl('/illustrations/sorveteria-hero.svg')} alt="" />
            </div>
            <div className="hero-cinema-caption">
              <span>01</span>
              <strong>The first bite moment</strong>
              <small>Video-led entry scene</small>
            </div>
          </motion.div>

          <div className="hero-marquee" aria-hidden="true">
            <span>Scoop / Shoot / Share / Return /</span>
            <span>Scoop / Shoot / Share / Return /</span>
          </div>
        </section>

        <section className="journey-section" id="journey" aria-labelledby="journey-title">
          <div className="section-kicker">Customer journey</div>
          <div className="journey-heading">
            <h2 id="journey-title">Every section should make the customer want the next one.</h2>
            <p>
              The experience is designed like a queue in a beautiful shop: attraction, choice,
              anticipation, hand-off, sharing, and return.
            </p>
          </div>
          <div className="journey-grid">
            {journeySteps.map((item, index) => (
              <motion.article
                key={item.step}
                className="journey-card"
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
              >
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="flavor-lab-section" id="lab" aria-labelledby="lab-title">
          <div className="lab-panel">
            <div>
              <span className="section-kicker">Interactive flavor lab</span>
              <h2 id="lab-title">Tap a mood. Watch the product world change.</h2>
              <p>
                A customer should not read a menu; they should play with it. This section turns
                flavor selection into a micro-experience.
              </p>
            </div>
            <div className="flavor-tabs" role="tablist" aria-label="Choose a flavor mood">
              {flavorLab.map((flavor, index) => (
                <button
                  key={flavor.name}
                  type="button"
                  className={index === activeFlavor ? 'is-active' : ''}
                  onClick={() => setActiveFlavor(index)}
                  role="tab"
                  aria-selected={index === activeFlavor}
                >
                  {flavor.name}
                </button>
              ))}
            </div>
          </div>

          <div className="lab-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavor.name}
                className="lab-product"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9, rotate: 8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={assetUrl(selectedFlavor.image)} alt={selectedFlavor.name} />
              </motion.div>
            </AnimatePresence>
            <div className="lab-recipe">
              <span>{selectedFlavor.mood}</span>
              <h3>{selectedFlavor.name}</h3>
              <p>{selectedFlavor.pairing}</p>
            </div>
          </div>
        </section>

        <section className="signature-section" aria-labelledby="signature-title">
          <div className="signature-heading">
            <span className="section-kicker">Signature products</span>
            <h2 id="signature-title">Three products, three reasons to buy.</h2>
          </div>
          <div className="signature-track">
            {signatures.map((product, index) => (
              <motion.article
                key={product.name}
                className="signature-card"
                initial={reduceMotion ? false : { opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.12, duration: 0.65 }}
              >
                <img src={imageSrc(product.image)} alt={product.name} />
                <div className="signature-card-copy">
                  <span>EUR {product.price}</span>
                  <h3>{product.name}</h3>
                  <p>{product.copy}</p>
                </div>
                <div className="signature-metric">
                  <strong>{product.stat}</strong>
                  <small>{product.label}</small>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="media-section" id="media" aria-labelledby="media-title">
          <div className="media-copy">
            <span className="section-kicker">Photo and video journey</span>
            <h2 id="media-title">The brand gives people shots to take before they even order.</h2>
            <p>
              A modern dessert brand wins when the shop, product and campaign system all create
              content moments. This wall mixes product photography, illustrations and motion.
            </p>
          </div>
          <div className="media-wall">
            {mediaMoments.map((item, index) => (
              <motion.figure
                key={item.title}
                className={`media-tile media-tile-${index + 1}`}
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -10, rotate: index % 2 ? 1.5 : -1.5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <img src={imageSrc(item.image)} alt={item.title} />
                <figcaption>
                  <span>{item.tag}</span>
                  <strong>{item.title}</strong>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="campaign-reel" aria-label="Sorveteria campaign reel">
          <div className="reel-phone">
            <div className="reel-screen">
              <span>LIVE DROP</span>
              <h2>Sextou com sorvete</h2>
              <p>Swipe, crave, visit.</p>
            </div>
          </div>
          <div className="campaign-marquee">
            <div>
              {campaigns.concat(campaigns).map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="drop-section" id="drop">
          <div>
            <span className="section-kicker">Final conversion</span>
            <h2>Make the first visit feel like a limited release.</h2>
            <p>
              The site ends with a launch mechanic: collect interest, invite tastings, announce the
              first flavor drop, and make customers feel early.
            </p>
          </div>
          <form
            className="drop-form"
            action="mailto:bonjour@sorveteria.fr"
            method="post"
            encType="text/plain"
          >
            <label>
              Get invited to the first drop
              <span>
                <input type="email" name="email" placeholder="your@email.com" />
                <button type="submit">Join</button>
              </span>
            </label>
          </form>
        </section>
      </main>
    </div>
  );
}
