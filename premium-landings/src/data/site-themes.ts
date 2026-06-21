import type { Site, SiteColors } from './sites';

export type SiteTheme = 'light' | 'dark' | 'vivid';

interface ThemeConfig {
  theme: SiteTheme;
  colors: SiteColors;
  heroOverlay: 'soft' | 'medium' | 'dramatic';
}

export const siteThemes: Record<string, ThemeConfig> = {
  'eclat-aesthetic': {
    theme: 'light',
    heroOverlay: 'soft',
    colors: {
      bg: '#faf7f4',
      bgAlt: '#f2ece6',
      primary: '#1f1a17',
      secondary: '#9a7b5a',
      accent: '#b8956c',
      text: '#1f1a17',
      muted: '#6e6560',
      cta: '#1f1a17',
      ctaText: '#faf7f4',
      glow: 'rgba(184, 149, 108, 0.2)',
    },
  },
  'maison-lumiere': {
    theme: 'light',
    heroOverlay: 'soft',
    colors: {
      bg: '#f7f5f0',
      bgAlt: '#ece8e0',
      primary: '#141414',
      secondary: '#6b7d8f',
      accent: '#9a7b4f',
      text: '#141414',
      muted: '#5c5c5c',
      cta: '#141414',
      ctaText: '#f7f5f0',
      glow: 'rgba(154, 123, 79, 0.18)',
    },
  },
  'azure-thrill': {
    theme: 'vivid',
    heroOverlay: 'medium',
    colors: {
      bg: '#f0f9ff',
      bgAlt: '#dbeafe',
      primary: '#0c1929',
      secondary: '#0284c7',
      accent: '#ea580c',
      text: '#0c1929',
      muted: '#475569',
      cta: '#0284c7',
      ctaText: '#ffffff',
      glow: 'rgba(2, 132, 199, 0.2)',
    },
  },
  'pristine-yachts': {
    theme: 'dark',
    heroOverlay: 'dramatic',
    colors: {
      bg: '#0c1420',
      bgAlt: '#121c2c',
      primary: '#eef4fb',
      secondary: '#5b9fd4',
      accent: '#7ec8e3',
      text: '#eef4fb',
      muted: '#8fa3b8',
      cta: '#5b9fd4',
      ctaText: '#0c1420',
      glow: 'rgba(91, 159, 212, 0.3)',
    },
  },
  'velours-auto': {
    theme: 'dark',
    heroOverlay: 'dramatic',
    colors: {
      bg: '#0a0a0a',
      bgAlt: '#141414',
      primary: '#ffffff',
      secondary: '#dc2626',
      accent: '#dc2626',
      text: '#f5f5f5',
      muted: '#9ca3af',
      cta: '#dc2626',
      ctaText: '#ffffff',
      glow: 'rgba(220, 38, 38, 0.35)',
    },
  },
  'horizon-charter': {
    theme: 'light',
    heroOverlay: 'soft',
    colors: {
      bg: '#f4f8fa',
      bgAlt: '#e8f0f4',
      primary: '#0f2940',
      secondary: '#2e6b9e',
      accent: '#c9a227',
      text: '#0f2940',
      muted: '#5a7088',
      cta: '#2e6b9e',
      ctaText: '#ffffff',
      glow: 'rgba(46, 107, 158, 0.15)',
    },
  },
  'sanctum-spa': {
    theme: 'light',
    heroOverlay: 'soft',
    colors: {
      bg: '#f3f5f0',
      bgAlt: '#e8ebe4',
      primary: '#1a241c',
      secondary: '#5a7d5c',
      accent: '#5a7d5c',
      text: '#1a241c',
      muted: '#5c6658',
      cta: '#3d5c40',
      ctaText: '#f3f5f0',
      glow: 'rgba(90, 125, 92, 0.18)',
    },
  },
  'aether-aviation': {
    theme: 'dark',
    heroOverlay: 'dramatic',
    colors: {
      bg: '#0b0e14',
      bgAlt: '#12161f',
      primary: '#eef1f6',
      secondary: '#6b8fd4',
      accent: '#d4a843',
      text: '#eef1f6',
      muted: '#7a8494',
      cta: '#6b8fd4',
      ctaText: '#0b0e14',
      glow: 'rgba(107, 143, 212, 0.3)',
    },
  },
  'atelier-nocturne': {
    theme: 'dark',
    heroOverlay: 'dramatic',
    colors: {
      bg: '#0d0b0a',
      bgAlt: '#161210',
      primary: '#f5efe8',
      secondary: '#a67c00',
      accent: '#d4af37',
      text: '#f5efe8',
      muted: '#9a9088',
      cta: '#d4af37',
      ctaText: '#0d0b0a',
      glow: 'rgba(212, 175, 55, 0.25)',
    },
  },
  'grand-palais-events': {
    theme: 'light',
    heroOverlay: 'medium',
    colors: {
      bg: '#faf6f0',
      bgAlt: '#f0e8dc',
      primary: '#1a1410',
      secondary: '#8b6914',
      accent: '#a08050',
      text: '#1a1410',
      muted: '#6b6058',
      cta: '#8b6914',
      ctaText: '#faf6f0',
      glow: 'rgba(160, 128, 80, 0.2)',
    },
  },
};

export interface ThemedSite extends Site {
  theme: SiteTheme;
  heroOverlay: 'soft' | 'medium' | 'dramatic';
}

export function applySiteTheme(site: Site): ThemedSite {
  const cfg = siteThemes[site.slug] ?? {
    theme: 'dark' as SiteTheme,
    heroOverlay: 'dramatic' as const,
    colors: site.colors,
  };
  return {
    ...site,
    theme: cfg.theme,
    heroOverlay: cfg.heroOverlay,
    colors: cfg.colors,
  };
}
