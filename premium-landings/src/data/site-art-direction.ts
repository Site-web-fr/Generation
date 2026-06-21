import type { Site, SiteColors, SiteFonts } from './sites';

export type SiteTheme = 'light' | 'dark' | 'vivid';

export type ArtLayout =
  | 'editorial-rose'
  | 'brutalist-luxe'
  | 'kinetic-neon'
  | 'nautical-brass'
  | 'motorsport'
  | 'mediterranean'
  | 'mineral-wellness'
  | 'cockpit-tech'
  | 'art-deco'
  | 'gala-opera';

export type HeroLayout = 'immersive' | 'split-block' | 'framed-arch' | 'diagonal-cut';

export interface ArtDirection {
  director: string;
  mood: string;
  layout: ArtLayout;
  heroLayout: HeroLayout;
  theme: SiteTheme;
  heroOverlay: 'soft' | 'medium' | 'dramatic';
  colors: SiteColors;
  fonts: SiteFonts & { display?: string };
  radius: 'soft' | 'sharp' | 'pill';
  decor: 'rose-grid' | 'thin-rules' | 'neon-slash' | 'rope-lines' | 'racing-stripe' | 'wave' | 'stone-blocks' | 'hud' | 'deco-corners' | 'spotlight';
  btnStyle: 'pill' | 'sharp' | 'underline';
}

export const artDirections: Record<string, ArtDirection> = {
  'eclat-aesthetic': {
    director: 'Camille Roche',
    mood: 'Rose cuivré · Clinique couture',
    layout: 'editorial-rose',
    heroLayout: 'framed-arch',
    theme: 'light',
    heroOverlay: 'soft',
    radius: 'soft',
    decor: 'rose-grid',
    btnStyle: 'pill',
    fonts: {
      heading: '"Cormorant Garamond", Georgia, serif',
      body: '"DM Sans", sans-serif',
      display: '"Cormorant Garamond", serif',
    },
    colors: {
      bg: '#f9f0ec',
      bgAlt: '#f0e0d8',
      primary: '#4a2c3d',
      secondary: '#b87333',
      accent: '#c97b63',
      text: '#3d2c35',
      muted: '#8a6f72',
      cta: '#4a2c3d',
      ctaText: '#f9f0ec',
      glow: 'rgba(201, 123, 99, 0.25)',
    },
  },
  'maison-lumiere': {
    director: 'Stefan Weiss',
    mood: 'Éditorial suisse · Or sur mesure',
    layout: 'brutalist-luxe',
    heroLayout: 'split-block',
    theme: 'light',
    heroOverlay: 'soft',
    radius: 'sharp',
    decor: 'thin-rules',
    btnStyle: 'sharp',
    fonts: {
      heading: '"Syne", sans-serif',
      body: '"Inter", sans-serif',
      display: '"Syne", sans-serif',
    },
    colors: {
      bg: '#ffffff',
      bgAlt: '#f4f4f4',
      primary: '#000000',
      secondary: '#666666',
      accent: '#c9a227',
      text: '#000000',
      muted: '#555555',
      cta: '#000000',
      ctaText: '#ffffff',
      glow: 'rgba(201, 162, 39, 0.15)',
    },
  },
  'azure-thrill': {
    director: 'Nadia Al-Rashid',
    mood: 'Néon Golfe · Vitesse & sel',
    layout: 'kinetic-neon',
    heroLayout: 'diagonal-cut',
    theme: 'vivid',
    heroOverlay: 'medium',
    radius: 'sharp',
    decor: 'neon-slash',
    btnStyle: 'sharp',
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Outfit", sans-serif',
      display: '"Space Grotesk", sans-serif',
    },
    colors: {
      bg: '#e8f9ff',
      bgAlt: '#c5eeff',
      primary: '#001a33',
      secondary: '#00d4ff',
      accent: '#ff4d29',
      text: '#001a33',
      muted: '#1e4a6e',
      cta: '#ff4d29',
      ctaText: '#ffffff',
      glow: 'rgba(0, 212, 255, 0.35)',
    },
  },
  'pristine-yachts': {
    director: 'Marco Bellini',
    mood: 'Riviera · Laiton & brume marine',
    layout: 'nautical-brass',
    heroLayout: 'immersive',
    theme: 'dark',
    heroOverlay: 'dramatic',
    radius: 'soft',
    decor: 'rope-lines',
    btnStyle: 'pill',
    fonts: {
      heading: '"Cinzel", serif',
      body: '"Inter", sans-serif',
      display: '"Cinzel", serif',
    },
    colors: {
      bg: '#071422',
      bgAlt: '#0c1e32',
      primary: '#eef6fc',
      secondary: '#5b9fd4',
      accent: '#c9a55c',
      text: '#eef6fc',
      muted: '#7a9bb8',
      cta: '#c9a55c',
      ctaText: '#071422',
      glow: 'rgba(201, 165, 92, 0.3)',
    },
  },
  'velours-auto': {
    director: 'Alex Kane',
    mood: 'Motorsport · Chrome & sang de bœuf',
    layout: 'motorsport',
    heroLayout: 'split-block',
    theme: 'dark',
    heroOverlay: 'dramatic',
    radius: 'sharp',
    decor: 'racing-stripe',
    btnStyle: 'sharp',
    fonts: {
      heading: '"Bebas Neue", sans-serif',
      body: '"DM Sans", sans-serif',
      display: '"Bebas Neue", sans-serif',
    },
    colors: {
      bg: '#050505',
      bgAlt: '#111111',
      primary: '#ffffff',
      secondary: '#e10600',
      accent: '#e10600',
      text: '#f0f0f0',
      muted: '#888888',
      cta: '#e10600',
      ctaText: '#ffffff',
      glow: 'rgba(225, 6, 0, 0.45)',
    },
  },
  'horizon-charter': {
    director: 'Elena Costa',
    mood: 'Méditerranée · Soleil & sel fin',
    layout: 'mediterranean',
    heroLayout: 'immersive',
    theme: 'light',
    heroOverlay: 'soft',
    radius: 'soft',
    decor: 'wave',
    btnStyle: 'pill',
    fonts: {
      heading: '"Playfair Display", serif',
      body: '"Outfit", sans-serif',
      display: '"Playfair Display", serif',
    },
    colors: {
      bg: '#faf6ef',
      bgAlt: '#e8f0f4',
      primary: '#0c3d5c',
      secondary: '#1a6b8a',
      accent: '#e8b84a',
      text: '#0c3d5c',
      muted: '#5a7d8f',
      cta: '#1a6b8a',
      ctaText: '#ffffff',
      glow: 'rgba(232, 184, 74, 0.25)',
    },
  },
  'sanctum-spa': {
    director: 'Yuki Tanaka',
    mood: 'Minéral · Silence brut',
    layout: 'mineral-wellness',
    heroLayout: 'framed-arch',
    theme: 'light',
    heroOverlay: 'soft',
    radius: 'sharp',
    decor: 'stone-blocks',
    btnStyle: 'underline',
    fonts: {
      heading: '"Libre Baskerville", serif',
      body: '"Inter", sans-serif',
      display: '"Inter", sans-serif',
    },
    colors: {
      bg: '#e8e6e1',
      bgAlt: '#d4d2cb',
      primary: '#1a2e24',
      secondary: '#4a6b55',
      accent: '#2d4a3e',
      text: '#1a2e24',
      muted: '#5c6b62',
      cta: '#2d4a3e',
      ctaText: '#e8e6e1',
      glow: 'rgba(45, 74, 62, 0.15)',
    },
  },
  'aether-aviation': {
    director: 'James Whitfield',
    mood: 'Cockpit · Ambre instrument',
    layout: 'cockpit-tech',
    heroLayout: 'diagonal-cut',
    theme: 'dark',
    heroOverlay: 'dramatic',
    radius: 'sharp',
    decor: 'hud',
    btnStyle: 'sharp',
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"IBM Plex Sans", sans-serif',
      display: '"Space Grotesk", sans-serif',
    },
    colors: {
      bg: '#06080d',
      bgAlt: '#0d1119',
      primary: '#e8ecf4',
      secondary: '#4a90d9',
      accent: '#f5a623',
      text: '#e8ecf4',
      muted: '#6b7a8f',
      cta: '#4a90d9',
      ctaText: '#06080d',
      glow: 'rgba(245, 166, 35, 0.25)',
    },
  },
  'atelier-nocturne': {
    director: 'Isabelle Marchand',
    mood: 'Place Vendôme · Or liquide',
    layout: 'art-deco',
    heroLayout: 'framed-arch',
    theme: 'dark',
    heroOverlay: 'dramatic',
    radius: 'soft',
    decor: 'deco-corners',
    btnStyle: 'pill',
    fonts: {
      heading: '"Cinzel", serif',
      body: '"Cormorant Garamond", serif',
      display: '"Cinzel", serif',
    },
    colors: {
      bg: '#0a0608',
      bgAlt: '#140e10',
      primary: '#f8f0e4',
      secondary: '#8b6914',
      accent: '#d4af37',
      text: '#f8f0e4',
      muted: '#a09080',
      cta: '#d4af37',
      ctaText: '#0a0608',
      glow: 'rgba(212, 175, 55, 0.3)',
    },
  },
  'grand-palais-events': {
    director: 'Victoria Hale',
    mood: 'Gala opéra · Velours bordeaux',
    layout: 'gala-opera',
    heroLayout: 'immersive',
    theme: 'light',
    heroOverlay: 'medium',
    radius: 'soft',
    decor: 'spotlight',
    btnStyle: 'pill',
    fonts: {
      heading: '"Libre Baskerville", serif',
      body: '"DM Sans", sans-serif',
      display: '"Archivo Black", sans-serif',
    },
    colors: {
      bg: '#f5ebe0',
      bgAlt: '#e8d5c4',
      primary: '#4a0e0e',
      secondary: '#7a2020',
      accent: '#8b6914',
      text: '#2a1010',
      muted: '#6b4848',
      cta: '#4a0e0e',
      ctaText: '#f5ebe0',
      glow: 'rgba(74, 14, 14, 0.2)',
    },
  },
};

export interface DirectedSite extends Site {
  theme: SiteTheme;
  heroOverlay: 'soft' | 'medium' | 'dramatic';
  art: ArtDirection;
}

export function getArtDirection(slug: string): ArtDirection {
  return artDirections[slug] ?? artDirections['velours-auto'];
}

export function applyArtDirection(site: Site): DirectedSite {
  const art = getArtDirection(site.slug);
  return {
    ...site,
    theme: art.theme,
    heroOverlay: art.heroOverlay,
    colors: art.colors,
    fonts: { heading: art.fonts.heading, body: art.fonts.body },
    art,
  };
}
