import { getBrandAssets } from './assets';
import type { LogoKind } from './logo-sources';
import type { GoogleReviews } from './stand-contacts';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  badge?: string;
  emoji: string;
  image?: string;
}

export interface Brand {
  slug: string;
  logo: string;
  logoFallback?: string;
  logoChain?: string[];
  logoKind?: LogoKind;
  heroImage?: string;
  gallery?: { src: string; alt: string }[];
  imageCredit?: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  stand: string;
  cuisine: string;
  instagram?: string;
  uberEats?: string;
  phone?: string;
  address: string;
  hours: string;
  googleMaps: string;
  fonts: {
    heading: string;
    body: string;
    headingSpacing?: string;
    headingTransform?: 'uppercase' | 'none';
  };
  colors: {
    bg: string;
    bgAlt: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
    cta: string;
    ctaText: string;
  };
  heroPattern: string;
  heroGlow: string;
  menu: MenuItem[];
  perks: string[];
  stats: { value: string; label: string }[];
  testimonials: { text: string; author: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  googleReviews?: GoogleReviews;
}

const ADDRESS = '1348 Avenue Raymond Dugrand, Halles du Lez — 34000 Montpellier';
const MAPS =
  'https://www.google.com/maps/search/?api=1&query=1348+Avenue+Raymond+Dugrand+Montpellier';

const rawBrands: Brand[] = [
  {
    slug: 'rouge-beef',
    logo: '/logos/rouge-beef.svg',
    name: 'Rouge Beef',
    subtitle: 'Burgers & viandes maturées',
    tagline: 'Le burger haut de gamme du Massif Central',
    description:
      'Viandes d\'exception, bœuf maturé et burgers généreux dans un cadre industriel chaleureux. Une identité forte signée Studio Therese, pensée pour les Halles du Lez.',
    stand: 'Stand 15A',
    cuisine: 'Burgers · Viandes maturées',
    instagram: 'https://instagram.com/rouge_beef',
    uberEats:
      'https://www.ubereats.com/fr-en/store/rouge-beef-halles-du-lez/6fq7pl3QVw-2hHdMN4ST_g',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–15h & 19h–23h',
    googleMaps: MAPS,
    fonts: { heading: '"Bebas Neue", sans-serif', body: '"DM Sans", sans-serif' },
    colors: {
      bg: '#0f0a0a',
      bgAlt: '#1a1212',
      primary: '#c41e3a',
      secondary: '#8b1a2b',
      accent: '#f5e6c8',
      text: '#faf7f4',
      muted: '#a89a94',
      cta: '#c41e3a',
      ctaText: '#ffffff',
    },
    heroPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(196,30,58,0.04) 12px, rgba(196,30,58,0.04) 24px)',
    heroGlow: 'radial-gradient(ellipse at 70% 20%, rgba(196,30,58,0.35) 0%, transparent 55%)',
    menu: [
      { name: 'Classic Rouge', description: 'Bœuf maturé, cheddar, pickles maison', price: '14,90 €', badge: 'Best-seller', emoji: '🍔' },
      { name: 'Tarte du jour', description: 'Légumes de saison, pâte feuilletée', price: '12,50 €', emoji: '🥧' },
      { name: 'Planche maturée', description: 'Sélection bœuf, sauces du chef', price: '24,00 €', badge: 'À partager', emoji: '🥩' },
    ],
    perks: ['Viandes Massif Central', 'Charte graphique pro', 'Sur place & terrasse'],
    stats: [
      { value: '4.7★', label: 'Avis clients' },
      { value: '100%', label: 'Fait maison' },
      { value: 'Stand 15A', label: 'Halles du Lez' },
    ],
    testimonials: [
      { text: 'Les burgers les plus généreux des Halles. La viande maturée fait toute la différence.', author: 'Client Google' },
    ],
    ctaPrimary: 'Commander sur Uber Eats',
    ctaSecondary: 'Venir au stand',
  },
  {
    slug: 'manita',
    logo: '/logos/manita.svg',
    name: 'MANITA',
    subtitle: 'Saveurs entre Suds',
    tagline: 'La caravane gourmande des frères Pourcel',
    description:
      'Un voyage culinaire du sud de la Camargue à l\'Amérique latine. Ceviches, BBQ et brochettes dans une ambiance festive et solaire.',
    stand: 'Stand 1',
    cuisine: 'Sud global · Street food chef',
    instagram: 'https://instagram.com/manita_montpellier',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–15h & 19h–23h',
    googleMaps: MAPS,
    fonts: { heading: '"Archivo Black", sans-serif', body: '"Nunito", sans-serif' },
    colors: {
      bg: '#1a0f08',
      bgAlt: '#2a1810',
      primary: '#e85d04',
      secondary: '#f48c06',
      accent: '#ffd166',
      text: '#fff8f0',
      muted: '#c4a882',
      cta: '#e85d04',
      ctaText: '#1a0f08',
    },
    heroPattern:
      'radial-gradient(circle at 20% 80%, rgba(232,93,4,0.15) 0%, transparent 50%)',
    heroGlow: 'radial-gradient(ellipse at 80% 10%, rgba(255,209,102,0.2) 0%, transparent 50%)',
    menu: [
      { name: 'Ceviche du jour', description: 'Poisson frais, agrumes, coriandre', price: '16,90 €', badge: 'Signature', emoji: '🐟' },
      { name: 'Brochettes BBQ', description: 'Marinade maison, légumes grillés', price: '15,50 €', emoji: '🔥' },
      { name: 'Tacos gambas', description: 'Saint-Jacques, chorizo, avocat', price: '18,00 €', emoji: '🌮' },
    ],
    perks: ['Signature Pourcel', 'Produits frais', 'Ambiance fiesta'],
    stats: [
      { value: 'Chef', label: 'Pourcel' },
      { value: 'Sud', label: 'Camargue → Latam' },
      { value: 'Stand 1', label: 'Entrée Sud' },
    ],
    testimonials: [
      { text: 'Une adresse audacieuse et joyeuse. Le ceviche est une révélation.', author: 'Montpellier Tourisme' },
    ],
    ctaPrimary: 'Réserver une table',
    ctaSecondary: 'Voir la carte',
  },
  {
    slug: 'naked',
    logo: '/logos/naked.svg',
    name: 'NAKED',
    subtitle: 'Bar à cocktails & œufs',
    tagline: 'L\'essentiel, dans sa plus simple apparence',
    description:
      'Cocktails minimalistes et cuisine autour de l\'œuf. Circuit court, zéro déchet, une parenthèse hors du temps au cœur du food court.',
    stand: 'Stand G',
    cuisine: 'Cocktails · Bar à œufs',
    instagram: 'https://instagram.com/nakedmtp',
    address: ADDRESS,
    hours: 'Mar–Dim · 10h–23h · Brunch dim.',
    googleMaps: MAPS,
    fonts: { heading: '"Syne", sans-serif', body: '"Inter", sans-serif' },
    colors: {
      bg: '#0a0a0c',
      bgAlt: '#141418',
      primary: '#e8e4df',
      secondary: '#9a9590',
      accent: '#c9a962',
      text: '#f5f3f0',
      muted: '#7a7672',
      cta: '#e8e4df',
      ctaText: '#0a0a0c',
    },
    heroPattern: 'linear-gradient(180deg, transparent 0%, rgba(201,169,98,0.05) 100%)',
    heroGlow: 'radial-gradient(ellipse at 50% 0%, rgba(232,228,223,0.08) 0%, transparent 60%)',
    menu: [
      { name: 'Punch & Nuts', description: 'Cocktail signature maison', price: '11,00 €', badge: 'Signature', emoji: '🍸' },
      { name: 'Œuf mollet avocat', description: 'Gingembre, graines, toast', price: '13,50 €', emoji: '🥚' },
      { name: 'Brunch du dimanche', description: 'Formule œufs & boissons', price: '22,00 €', emoji: '☀️' },
    ],
    perks: ['Top 500 bars', 'Zéro déchet', 'Spiritueux premium'],
    stats: [
      { value: '50 Best', label: 'Inspiré' },
      { value: '0', label: 'Déchet plastique' },
      { value: 'Stand G', label: 'Entrée Est' },
    ],
    testimonials: [
      { text: 'Des cocktails sublimes et une carte autour de l\'œuf surprenante.', author: 'Claap Montpellier' },
    ],
    ctaPrimary: 'Découvrir la carte',
    ctaSecondary: 'Venir au bar',
  },
  {
    slug: 'blue-india',
    logo: '/logos/blue-india.svg',
    name: 'Blue India',
    subtitle: 'Cuisine indienne moderne',
    tagline: 'L\'Inde revisitée, healthy et savoureuse',
    description:
      'Thalis, naans garnis et cocktails bleus Butterfly Pea. Une cuisine indienne élégante inspirée de Londres, au stand 16B des Halles.',
    stand: 'Stand 16B',
    cuisine: 'Indien · Healthy · Ayurvédique',
    instagram: 'https://instagram.com/blueindia_mtp',
    uberEats: 'https://www.ubereats.com/fr/store/le-blue-india/FudxJtohRgO69y8nZTDuXA',
    address: ADDRESS,
    hours: 'Mar–Sam · 12h–14h30 & 19h–23h30',
    googleMaps: MAPS,
    fonts: { heading: '"Playfair Display", serif', body: '"Outfit", sans-serif' },
    colors: {
      bg: '#050818',
      bgAlt: '#0c1230',
      primary: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#fbbf24',
      text: '#eff6ff',
      muted: '#93a8d4',
      cta: '#2563eb',
      ctaText: '#ffffff',
    },
    heroPattern:
      'radial-gradient(circle at 30% 40%, rgba(37,99,235,0.12) 0%, transparent 45%)',
    heroGlow: 'radial-gradient(ellipse at 70% 30%, rgba(251,191,36,0.15) 0%, transparent 50%)',
    menu: [
      { name: 'Cheese Naan', description: 'Fromage fondant, épices douces', price: '12,90 €', badge: 'Populaire', emoji: '🫓' },
      { name: 'Thali dégustation', description: '5 saveurs du nord au sud', price: '19,90 €', emoji: '🍛' },
      { name: 'Blue India cocktail', description: 'Butterfly pea, sans colorant', price: '10,00 €', badge: 'Instagram', emoji: '💙' },
    ],
    perks: ['Épices maison', 'Menus ayurvédiques', 'Cocktails bleus'],
    stats: [
      { value: '100%', label: 'Fait maison' },
      { value: 'Healthy', label: 'Options' },
      { value: '16B', label: 'Stand' },
    ],
    testimonials: [
      { text: 'Le cheese naan et le thali sont une petite révolution pour les papilles.', author: 'Claap' },
    ],
    ctaPrimary: 'Commander sur Uber Eats',
    ctaSecondary: 'Venir déguster',
  },
  {
    slug: 'banger',
    logo: '/logos/banger.svg',
    name: 'BANGER',
    subtitle: 'Smash burgers · Pancakes · Cookies',
    tagline: 'Attention, ça déchire !',
    description:
      'Le smash burger dans toute sa splendeur : bun brioché, cheddar américain, pickles. Pancakes et cookies maison pour finir en beauté.',
    stand: 'Stand 14A',
    cuisine: 'Smash burger · Sucré',
    instagram: 'https://instagram.com/smashbanger_co',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–23h',
    googleMaps: MAPS,
    fonts: { heading: '"Black Ops One", cursive', body: '"Rubik", sans-serif' },
    colors: {
      bg: '#111108',
      bgAlt: '#1c1c10',
      primary: '#facc15',
      secondary: '#eab308',
      accent: '#ef4444',
      text: '#fefce8',
      muted: '#a8a882',
      cta: '#facc15',
      ctaText: '#111108',
    },
    heroPattern:
      'repeating-linear-gradient(-12deg, transparent, transparent 8px, rgba(250,204,21,0.03) 8px, rgba(250,204,21,0.03) 16px)',
    heroGlow: 'radial-gradient(ellipse at 60% 40%, rgba(239,68,68,0.2) 0%, transparent 50%)',
    menu: [
      { name: 'Smash Classic', description: '1 steak, cheddar, sauce cocktail', price: '11,90 €', badge: 'Best-seller', emoji: '🍔' },
      { name: 'Smash XL', description: '3 steaks, double cheddar', price: '15,90 €', emoji: '🔥' },
      { name: 'Pancakes maison', description: 'Salés ou sucrés, sirop érable', price: '9,50 €', emoji: '🥞' },
    ],
    perks: ['100% fait maison', 'Œufs fermiers', 'Formules L & XL'],
    stats: [
      { value: 'Smash', label: 'Spécialité' },
      { value: 'Cookies', label: 'Maison' },
      { value: '14A', label: 'Stand' },
    ],
    testimonials: [
      { text: 'Le smash burger qu\'on attendait aux Halles. Les cookies sont addictifs.', author: 'Foodie local' },
    ],
    ctaPrimary: 'Voir le menu',
    ctaSecondary: 'Venir au stand',
  },
  {
    slug: 'soleira',
    logo: '/logos/soleira.svg',
    name: 'SOLEIRA',
    subtitle: 'Cuisine du Sud-Ouest',
    tagline: 'Le Sud-Ouest en mode street food',
    description:
      'Cassoulet, magret, hot-dogs toulousains et vins du domaine. Bérengère et Guillaume ensoleillent vos papilles aux Halles du Lez.',
    stand: 'Stand 9',
    cuisine: 'Gascon · Sud-Ouest',
    instagram: 'https://instagram.com/soleira.montpellier',
    uberEats: 'https://www.ubereats.com/fr/store/soleira/4EnRWm7WQAWCqO7ifmWqjg',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–14h & 19h–22h',
    googleMaps: MAPS,
    fonts: { heading: '"Libre Baskerville", serif', body: '"Source Sans 3", sans-serif' },
    colors: {
      bg: '#1a1408',
      bgAlt: '#2a2210',
      primary: '#d97706',
      secondary: '#b45309',
      accent: '#fef3c7',
      text: '#fffbeb',
      muted: '#c4a574',
      cta: '#d97706',
      ctaText: '#1a1408',
    },
    heroPattern: 'radial-gradient(circle at 80% 70%, rgba(217,119,6,0.12) 0%, transparent 45%)',
    heroGlow: 'radial-gradient(ellipse at 20% 20%, rgba(254,243,199,0.1) 0%, transparent 50%)',
    menu: [
      { name: 'Hot-Dog Toulousain', description: 'Saucisse, tomme brebis, confit oignons', price: '12,50 €', badge: 'Populaire', emoji: '🌭' },
      { name: 'Cassoulet', description: 'Recette généreuse, haricots confits', price: '16,00 €', emoji: '🍲' },
      { name: 'Magret de canard', description: 'Sauce du chef, frites maison', price: '18,50 €', emoji: '🦆' },
    ],
    perks: ['Vins du domaine', 'Produits du terroir', 'Accueil chaleureux'],
    stats: [
      { value: '4.8★', label: 'Uber Eats' },
      { value: 'Gascon', label: 'Authenticité' },
      { value: 'Stand 9', label: 'Entrée Nord' },
    ],
    testimonials: [
      { text: 'Stand très sympathique, produits de qualité. Le hot-dog toulousain est incroyable.', author: 'Avis Uber Eats' },
    ],
    ctaPrimary: 'Commander sur Uber Eats',
    ctaSecondary: 'Venir au stand',
  },
  {
    slug: 'casa-asado',
    logo: '/logos/casa-asado.svg',
    name: 'Casa Asado',
    subtitle: 'Bar à viandes',
    tagline: 'L\'asado argentin au cœur des Halles',
    description:
      'Black Angus, picanha, tartare au couteau et côtes de taureau. Des viandes sélectionnées, grillées avec passion par Yves et son équipe.',
    stand: 'Stand E',
    cuisine: 'Grill · Argentin',
    instagram: 'https://instagram.com/casa.asado',
    address: ADDRESS,
    hours: 'Mar–Sam · 12h–14h30 & 19h–22h30 · Dim midi',
    googleMaps: MAPS,
    fonts: { heading: '"Oswald", sans-serif', body: '"Work Sans", sans-serif' },
    colors: {
      bg: '#140a06',
      bgAlt: '#221410',
      primary: '#dc2626',
      secondary: '#991b1b',
      accent: '#fbbf24',
      text: '#fef2f2',
      muted: '#b89a8a',
      cta: '#dc2626',
      ctaText: '#ffffff',
    },
    heroPattern:
      'linear-gradient(135deg, rgba(220,38,38,0.06) 0%, transparent 50%)',
    heroGlow: 'radial-gradient(ellipse at 50% 80%, rgba(251,191,36,0.12) 0%, transparent 50%)',
    menu: [
      { name: 'Picanha', description: 'Bœuf Black Angus, frites maison', price: '22,00 €', badge: 'Signature', emoji: '🥩' },
      { name: 'Tartare Charolais', description: 'Coupé au couteau, condiments', price: '16,50 €', emoji: '🔪' },
      { name: 'Côte de bœuf', description: 'Pour les plus affamés', price: 'Sur place', emoji: '🍖' },
    ],
    perks: ['Viandes premium', 'Frites maison', 'Ambiance conviviale'],
    stats: [
      { value: '50', label: 'Couverts' },
      { value: 'Grill', label: 'À la plancha' },
      { value: 'Stand E', label: 'Entrée Nord' },
    ],
    testimonials: [
      { text: 'Viandes tendres et savoureuses. L\'accueil est top.', author: 'Montpellier Tourisme' },
    ],
    ctaPrimary: 'Réserver',
    ctaSecondary: 'Itinéraire',
  },
  {
    slug: 'maria-bonita',
    logo: '/logos/maria-bonita.svg',
    name: 'Maria Bonita',
    subtitle: 'Empanadas argentines',
    tagline: '100% latino, directement en Amérique du Sud',
    description:
      'Empanadas carne picante, chimichurri, mate et bières argentines. La 3e adresse du Maria Social Club aux Halles du Lez.',
    stand: 'Stand 11B',
    cuisine: 'Argentin · Empanadas',
    instagram: 'https://instagram.com/mariabonitamontpellier',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–23h',
    googleMaps: MAPS,
    fonts: { heading: '"Righteous", cursive', body: '"Poppins", sans-serif' },
    colors: {
      bg: '#1a0a14',
      bgAlt: '#2a1020',
      primary: '#ec4899',
      secondary: '#db2777',
      accent: '#fbbf24',
      text: '#fdf2f8',
      muted: '#c49aaa',
      cta: '#ec4899',
      ctaText: '#ffffff',
    },
    heroPattern:
      'radial-gradient(circle at 70% 30%, rgba(236,72,153,0.1) 0%, transparent 50%)',
    heroGlow: 'radial-gradient(ellipse at 30% 70%, rgba(251,191,36,0.1) 0%, transparent 50%)',
    menu: [
      { name: 'Empanada carne picante', description: 'Bœuf épicé, pâte dorée', price: '4,50 €', badge: 'Classique', emoji: '🥟' },
      { name: 'Empanada végétarienne', description: 'Légumes, fromage, épices', price: '4,00 €', emoji: '🌿' },
      { name: 'Planche + chimichurri', description: 'À partager entre amis', price: '14,00 €', emoji: '🍺' },
    ],
    perks: ['Fait main', 'Culture argentine', 'Équipe 100% latino'],
    stats: [
      { value: '3e', label: 'Adresse MSC' },
      { value: 'Mate', label: 'Authentique' },
      { value: '11B', label: 'Stand' },
    ],
    testimonials: [
      { text: 'Les empanadas artisanaux sont la solution idéale pour grignoter en déambulant.', author: 'Guide Halles' },
    ],
    ctaPrimary: 'Commander à emporter',
    ctaSecondary: 'Suivre sur Instagram',
  },
  {
    slug: 'bambino-tonton',
    logo: '/logos/bambino-tonton.svg',
    name: 'Bambino & Tonton Haricot',
    subtitle: 'Pizza Club · Bar à salades',
    tagline: 'Deux stands, une même exigence',
    description:
      'Bambino : pizzas napolitaines devant vous par un pizzaiolo de 25 ans d\'expérience. Tonton Haricot : salades composées, circuits courts et emballages recyclables.',
    stand: 'Stands 3A & 3B',
    cuisine: 'Pizza NY · Salades fraîches',
    instagram: 'https://instagram.com/bambinopizzaclub',
    uberEats: 'https://www.ubereats.com/fr/store/bambino-pizza-club/TGX7c4zJUlqjSitY2F5nDQ',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–23h',
    googleMaps: MAPS,
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"IBM Plex Sans", sans-serif' },
    colors: {
      bg: '#0f1218',
      bgAlt: '#181c28',
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#f97316',
      text: '#f0fdf4',
      muted: '#86a88a',
      cta: '#22c55e',
      ctaText: '#0f1218',
    },
    heroPattern:
      'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(34,197,94,0.03) 40px, rgba(34,197,94,0.03) 41px)',
    heroGlow: 'radial-gradient(ellipse at 40% 50%, rgba(249,115,22,0.15) 0%, transparent 50%)',
    menu: [
      { name: 'Truffa Lova', description: 'Signature Bambino, truffe & mozzarella', price: '16,90 €', badge: 'Bambino', emoji: '🍕' },
      { name: 'Salade 7 ingrédients', description: 'Composez la vôtre, produits locaux', price: '12,90 €', badge: 'Tonton', emoji: '🥗' },
      { name: 'Pizza à la part', description: 'D.O.P italien, pâte napolitaine', price: '4,50 €', emoji: '🍕' },
    ],
    perks: ['Charte NK Design', 'Produits D.O.P', 'Emballages recyclables'],
    stats: [
      { value: '25 ans', label: 'Pizzaiolo' },
      { value: 'Local', label: 'Circuits courts' },
      { value: '3A-3B', label: 'Stands' },
    ],
    testimonials: [
      { text: 'La Truffa Lova et les salades fraîches : le combo parfait aux Halles.', author: 'Visiteur' },
    ],
    ctaPrimary: 'Commander Bambino sur Uber Eats',
    ctaSecondary: 'Composer ma salade',
  },
  {
    slug: 'la-bodeguita',
    logo: '/logos/la-bodeguita.svg',
    name: 'La Bodeguita',
    subtitle: 'Paëllas & tapas espagnoles',
    tagline: 'La vraie paëlla en 15 minutes',
    description:
      'Cuisine espagnole en mode street food : paëlla royale, végétale ou fruits de mer, tapas authentiques et sangria maison.',
    stand: 'Stand D',
    cuisine: 'Espagnol · Tapas · Paëlla',
    instagram: 'https://instagram.com/labodeguita_hallesdulez',
    address: ADDRESS,
    hours: 'Mar–Dim · 12h–23h',
    googleMaps: MAPS,
    fonts: { heading: '"Cinzel", serif', body: '"Lato", sans-serif' },
    colors: {
      bg: '#1a1008',
      bgAlt: '#2a1a10',
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#facc15',
      text: '#fff7ed',
      muted: '#c4a080',
      cta: '#ea580c',
      ctaText: '#ffffff',
    },
    heroPattern:
      'radial-gradient(circle at 50% 100%, rgba(234,88,12,0.1) 0%, transparent 50%)',
    heroGlow: 'radial-gradient(ellipse at 80% 20%, rgba(250,204,21,0.12) 0%, transparent 50%)',
    menu: [
      { name: 'Paëlla royale', description: 'Poêlon individuel, 15 min', price: '18,90 €', badge: 'Signature', emoji: '🥘' },
      { name: 'Paëlla végétale', description: 'Légumes de saison, safran', price: '15,90 €', emoji: '🌶️' },
      { name: 'Tapas assortis', description: 'Jambon, manchego, olives', price: '12,00 €', emoji: '🫒' },
    ],
    perks: ['Sangria maison', 'Vins espagnols', 'Service rapide'],
    stats: [
      { value: '15 min', label: 'Paëlla prête' },
      { value: 'Espagne', label: 'Authentique' },
      { value: 'Stand D', label: 'Entrée Nord' },
    ],
    testimonials: [
      { text: 'Voyager en Espagne sans quitter Montpellier. La paëlla est excellente.', author: 'Client Halles' },
    ],
    ctaPrimary: 'Réserver une table',
    ctaSecondary: 'Voir les tapas',
  },
];

import residents from './residents-manifest.json';
import { brandFromResident, type ResidentManifest } from './brand-factory';
import { fontsForSlug } from './typography';
import { getStandContact } from './stand-contacts';

function buildDetailedOverrides(): Record<string, Brand> {
  const map: Record<string, Brand> = {};
  for (const b of rawBrands) {
    if (b.slug === 'bambino-tonton') {
      map.bambino = {
        ...b,
        slug: 'bambino',
        name: 'Bambino',
        subtitle: 'Pizza Club',
        tagline: 'Deux stands, une même exigence — pizzas napolitaines',
        stand: 'Stand 3B',
        menu: [b.menu[0], b.menu[2], b.menu[0]],
        ctaPrimary: 'Commander Bambino sur Uber Eats',
        ctaSecondary: 'Voir les pizzas',
      };
      map['tonton-haricot'] = {
        ...b,
        slug: 'tonton-haricot',
        name: 'Tonton Haricot',
        subtitle: 'Bar à salades',
        tagline: 'Composez votre salade aux Halles du Lez',
        stand: 'Stand 3A',
        menu: [b.menu[1], b.menu[1], b.menu[1]],
        ctaPrimary: 'Composer ma salade',
        ctaSecondary: 'Voir la carte',
      };
    } else {
      map[b.slug] = b;
    }
  }
  return map;
}

const detailedBySlug = buildDetailedOverrides();

function withAssets(brand: Brand): Brand {
  const assets = getBrandAssets(brand.slug);
  return {
    ...brand,
    logo: assets.logo,
    logoFallback: assets.logoFallback,
    logoChain: assets.logoChain,
    logoKind: assets.logoKind,
    heroImage: assets.heroImage,
    gallery: assets.gallery,
    imageCredit: assets.imageCredit,
    menu: brand.menu.map((item, i) => ({
      ...item,
      image: assets.menuImages[i] || item.image,
    })),
  };
}

function enrichFonts(
  slug: string,
  category: string,
  fonts: Brand['fonts'],
): Brand['fonts'] {
  const defaults = fontsForSlug(slug, category);
  return {
    heading: fonts.heading,
    body: fonts.body,
    headingSpacing: fonts.headingSpacing ?? defaults.headingSpacing,
    headingTransform: fonts.headingTransform ?? defaults.headingTransform,
  };
}

export const brands: Brand[] = (residents as ResidentManifest[]).map((r) => {
  const detailed = detailedBySlug[r.slug];
  const contact = getStandContact(r.slug);
  const brand = withAssets(detailed ?? brandFromResident(r));
  return {
    ...brand,
    phone: brand.phone ?? contact.phone,
    googleReviews: brand.googleReviews ?? contact.googleReviews,
    fonts: enrichFonts(r.slug, r.category, brand.fonts),
  };
});

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
