/** Visuels par commerce — logos officiels Halles du Lez + photos plats. */
import { resolveLogo, type LogoKind } from './logo-sources';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface BrandAssets {
  logo: string;
  logoFallback: string;
  logoChain: string[];
  logoKind: LogoKind;
  heroImage: string;
  gallery: GalleryImage[];
  menuImages: [string, string, string];
  imageCredit: string;
}

const DEMO = 'Proposition commerciale — démo site web';

function menu(slug: string, n: 1 | 2 | 3): string {
  return `/photos/menu/${slug}-${n}.jpg`;
}

function hero(slug: string): string {
  return `/photos/hero/${slug}.jpg`;
}

function gallery(slug: string, n: number): string {
  return `/photos/gallery/${slug}-${n}.jpg`;
}

function logos(slug: string) {
  const r = resolveLogo(slug);
  return {
    logo: r.logo,
    logoFallback: r.logoFallback,
    logoChain: r.logoChain,
    logoKind: r.kind,
  };
}

/** Contenu visuel enrichi (photos plats démo) pour les stands phares. */
const richAssets: Record<string, Omit<BrandAssets, keyof ReturnType<typeof logos>>> = {
  'rouge-beef': {
    heroImage: hero('rouge-beef'),
    gallery: [
      { src: gallery('rouge-beef', 1), alt: 'Identité Rouge Beef — Studio Therese' },
      { src: gallery('rouge-beef', 2), alt: 'Charte graphique Rouge Beef' },
      { src: gallery('rouge-beef', 3), alt: 'Burger Classic Rouge' },
    ],
    menuImages: [menu('rouge-beef', 1), menu('rouge-beef', 2), menu('rouge-beef', 3)],
    imageCredit: `Logo charte Studio Therese · Picto Halles du Lez · ${DEMO}`,
  },
  manita: {
    heroImage: hero('manita'),
    gallery: [
      { src: gallery('manita', 1), alt: 'Ceviche MANITA' },
      { src: gallery('manita', 2), alt: 'Brochettes BBQ MANITA' },
      { src: gallery('manita', 3), alt: 'Ambiance MANITA' },
    ],
    menuImages: [menu('manita', 1), menu('manita', 2), menu('manita', 3)],
    imageCredit: `Logo charte MANITA · Picto Halles du Lez · ${DEMO}`,
  },
  naked: {
    heroImage: hero('naked'),
    gallery: [
      { src: gallery('naked', 1), alt: 'Cocktail signature NAKED' },
      { src: gallery('naked', 2), alt: 'Œuf mollet avocat NAKED' },
      { src: gallery('naked', 3), alt: 'Brunch NAKED' },
    ],
    menuImages: [menu('naked', 1), menu('naked', 2), menu('naked', 3)],
    imageCredit: `Logo charte NAKED · Picto Halles du Lez · ${DEMO}`,
  },
  'blue-india': {
    heroImage: hero('blue-india'),
    gallery: [
      { src: gallery('blue-india', 1), alt: 'Cheese Naan Blue India' },
      { src: gallery('blue-india', 2), alt: 'Thali Blue India' },
      { src: gallery('blue-india', 3), alt: 'Cocktail Blue India' },
    ],
    menuImages: [menu('blue-india', 1), menu('blue-india', 2), menu('blue-india', 3)],
    imageCredit: `Logo charte Blue India · Picto Halles du Lez · ${DEMO}`,
  },
  banger: {
    heroImage: hero('banger'),
    gallery: [
      { src: gallery('banger', 1), alt: 'Smash Classic BANGER' },
      { src: gallery('banger', 2), alt: 'Smash XL BANGER' },
      { src: gallery('banger', 3), alt: 'Pancakes maison BANGER' },
    ],
    menuImages: [menu('banger', 1), menu('banger', 2), menu('banger', 3)],
    imageCredit: `Logo charte BANGER · Picto Halles du Lez · ${DEMO}`,
  },
  soleira: {
    heroImage: hero('soleira'),
    gallery: [
      { src: gallery('soleira', 1), alt: 'Cuisine SOLEIRA' },
      { src: gallery('soleira', 2), alt: 'Hot-Dog Toulousain SOLEIRA' },
      { src: gallery('soleira', 3), alt: 'Cassoulet SOLEIRA' },
    ],
    menuImages: [menu('soleira', 1), menu('soleira', 2), menu('soleira', 3)],
    imageCredit: `Logo charte SOLEIRA · Picto Halles du Lez · ${DEMO}`,
  },
  'casa-asado': {
    heroImage: hero('casa-asado'),
    gallery: [
      { src: gallery('casa-asado', 1), alt: 'Picanha Casa Asado' },
      { src: gallery('casa-asado', 2), alt: 'Tartare Casa Asado' },
      { src: gallery('casa-asado', 3), alt: 'Grill Casa Asado' },
    ],
    menuImages: [menu('casa-asado', 1), menu('casa-asado', 2), menu('casa-asado', 3)],
    imageCredit: `Logo charte Casa Asado · Picto Halles du Lez · ${DEMO}`,
  },
  'maria-bonita': {
    heroImage: hero('maria-bonita'),
    gallery: [
      { src: gallery('maria-bonita', 1), alt: 'Empanada carne picante' },
      { src: gallery('maria-bonita', 2), alt: 'Empanada végétarienne' },
      { src: gallery('maria-bonita', 3), alt: 'Planche Maria Bonita' },
    ],
    menuImages: [menu('maria-bonita', 1), menu('maria-bonita', 2), menu('maria-bonita', 3)],
    imageCredit: `Logo charte Maria Bonita · Picto Halles du Lez · ${DEMO}`,
  },
  bambino: {
    heroImage: hero('bambino'),
    gallery: [
      { src: gallery('bambino-tonton', 1), alt: 'Pizza Truffa Lova Bambino' },
      { src: gallery('bambino-tonton', 3), alt: 'Pizza à la part Bambino' },
      { src: hero('bambino'), alt: 'Bambino Pizza Club' },
    ],
    menuImages: [menu('bambino-tonton', 1), menu('bambino-tonton', 3), menu('bambino-tonton', 1)],
    imageCredit: `Logo charte Bambino · Picto Halles du Lez · ${DEMO}`,
  },
  'tonton-haricot': {
    heroImage: hero('tonton-haricot'),
    gallery: [
      { src: gallery('bambino-tonton', 2), alt: 'Salade Tonton Haricot' },
      { src: hero('tonton-haricot'), alt: 'Tonton Haricot' },
      { src: gallery('bambino-tonton', 2), alt: 'Produits locaux' },
    ],
    menuImages: [menu('bambino-tonton', 2), menu('bambino-tonton', 2), menu('bambino-tonton', 2)],
    imageCredit: `Logo charte Tonton Haricot · Picto Halles du Lez · ${DEMO}`,
  },
  'la-bodeguita': {
    heroImage: hero('la-bodeguita'),
    gallery: [
      { src: gallery('la-bodeguita', 1), alt: 'Paëlla royale La Bodeguita' },
      { src: gallery('la-bodeguita', 2), alt: 'Paëlla végétale' },
      { src: gallery('la-bodeguita', 3), alt: 'Tapas assortis' },
    ],
    menuImages: [menu('la-bodeguita', 1), menu('la-bodeguita', 2), menu('la-bodeguita', 3)],
    imageCredit: `Logo charte La Bodeguita · Picto Halles du Lez · ${DEMO}`,
  },
  sorveteria: {
    heroImage: '/illustrations/sorveteria-hero.svg',
    gallery: [
      { src: '/illustrations/sorveteria-hero.svg', alt: 'Univers rose Sorveteria avec cornets glacés' },
      { src: '/illustrations/sorveteria-pote.svg', alt: 'Pot de glace artisanale Sorveteria' },
      { src: '/illustrations/sorveteria-copo.svg', alt: 'Coupe glacée tropicale Sorveteria' },
    ],
    menuImages: [
      '/illustrations/sorveteria-hero.svg',
      '/illustrations/sorveteria-pote.svg',
      '/illustrations/sorveteria-copo.svg',
    ],
    imageCredit: `Illustrations vectorielles Sorveteria · ${DEMO}`,
  },
};

export function getBrandAssets(slug: string): BrandAssets {
  const rich = richAssets[slug];
  const h = hero(slug);
  const base = rich ?? {
    heroImage: h,
    gallery: [{ src: h, alt: `Stand ${slug}` }],
    menuImages: [h, h, h] as [string, string, string],
    imageCredit: `Picto officiel Halles du Lez · ${DEMO}`,
  };
  return { ...base, ...logos(slug) };
}
