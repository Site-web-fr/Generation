import type { Brand, MenuItem } from './brands';
import { paletteForSlug } from './palettes';

export interface ResidentManifest {
  slug: string;
  name: string;
  subtitle: string;
  stand: string;
  picto: string;
  hero?: string;
  instagram?: string;
  category: 'boire' | 'manger' | 'epicerie';
}

const ADDRESS = '1348 Avenue Raymond Dugrand, Halles du Lez — 34000 Montpellier';
const MAPS =
  'https://www.google.com/maps/search/?api=1&query=1348+Avenue+Raymond+Dugrand+Montpellier';
const HOURS = 'Mar–Dim · 12h–15h & 19h–23h';

const EMOJI: Record<string, string> = {
  boire: '🍸',
  manger: '🍽️',
  epicerie: '🧺',
};

function defaultMenu(name: string, subtitle: string): MenuItem[] {
  return [
    {
      name: `Signature ${name}`,
      description: `L'incontournable du stand — ${subtitle.toLowerCase()}.`,
      price: 'Sur place',
      badge: 'Signature',
      emoji: '🌟',
    },
    {
      name: 'Formule du jour',
      description: 'Produits frais, fait maison aux Halles du Lez.',
      price: '12,90 €',
      emoji: '🍴',
    },
    {
      name: 'À partager',
      description: 'Idéal entre amis sur la terrasse du food court.',
      price: '18,00 €',
      emoji: '🥂',
    },
  ];
}

export function brandFromResident(r: ResidentManifest): Brand {
  const p = paletteForSlug(r.slug, r.category);
  const insta = r.instagram
    ? `https://instagram.com/${r.instagram.replace('@', '')}`
    : undefined;

  return {
    slug: r.slug,
    logo: `/logos/${r.slug}.svg`,
    logoFallback: `/logos-official/${r.slug}.png`,
    name: r.name,
    subtitle: r.subtitle,
    tagline: `${r.subtitle} aux Halles du Lez`,
    description: `Découvrez ${r.name}, ${r.subtitle.toLowerCase()} au stand ${r.stand} des Halles du Lez à Montpellier. Une adresse gourmande du food court montpelliérain.`,
    stand: `Stand ${r.stand}`,
    cuisine: r.subtitle,
    instagram: insta,
    address: ADDRESS,
    hours: HOURS,
    googleMaps: MAPS,
    fonts: p.fonts,
    colors: {
      bg: p.bg,
      bgAlt: p.bgAlt,
      primary: p.primary,
      secondary: p.secondary,
      accent: p.accent,
      text: p.text,
      muted: p.muted,
      cta: p.cta,
      ctaText: p.ctaText,
    },
    heroPattern: p.heroPattern,
    heroGlow: p.heroGlow,
    menu: defaultMenu(r.name, r.subtitle),
    perks: ['Fait maison', 'Halles du Lez', `Stand ${r.stand}`],
    stats: [
      { value: r.category === 'boire' ? 'Bar' : 'Food', label: 'Stand' },
      { value: 'Lez', label: 'Montpellier' },
      { value: r.stand, label: 'N° stand' },
    ],
    testimonials: [
      {
        text: `Une belle adresse à découvrir au Marché du Lez — ${r.name} ne déçoit pas.`,
        author: 'Visiteur Halles du Lez',
      },
    ],
    ctaPrimary: r.category === 'boire' ? 'Venir au bar' : 'Venir au stand',
    ctaSecondary: 'Voir la carte',
    imageCredit: `Logo officiel Halles du Lez · ${EMOJI[r.category]} Proposition commerciale — démo site web`,
  };
}
