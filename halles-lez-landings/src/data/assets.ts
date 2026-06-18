/** Visuels par commerce — logos officiels Halles du Lez + photos plats. */
export interface GalleryImage {
  src: string;
  alt: string;
}

export interface BrandAssets {
  logo: string;
  logoFallback: string;
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

function officialLogo(slug: string): string {
  return `/logos-official/${slug}.png`;
}

function brandLogo(slug: string): string {
  return `/logos/${slug}.svg`;
}

/** Contenu visuel enrichi (photos plats démo) pour les stands phares. */
const richAssets: Record<string, BrandAssets> = {
  'rouge-beef': {
    logo: brandLogo('rouge-beef'),
    logoFallback: officialLogo('rouge-beef'),
    heroImage: hero('rouge-beef'),
    gallery: [
      { src: gallery('rouge-beef', 1), alt: 'Identité Rouge Beef — Studio Therese' },
      { src: gallery('rouge-beef', 2), alt: 'Charte graphique Rouge Beef' },
      { src: gallery('rouge-beef', 3), alt: 'Burger Classic Rouge' },
    ],
    menuImages: [menu('rouge-beef', 1), menu('rouge-beef', 2), menu('rouge-beef', 3)],
    imageCredit: `Logo Halles du Lez · Studio Therese + démo IA · ${DEMO}`,
  },
  manita: {
    logo: brandLogo('manita'),
    logoFallback: officialLogo('manita'),
    heroImage: hero('manita'),
    gallery: [
      { src: gallery('manita', 1), alt: 'Ceviche MANITA' },
      { src: gallery('manita', 2), alt: 'Brochettes BBQ MANITA' },
      { src: gallery('manita', 3), alt: 'Ambiance MANITA' },
    ],
    menuImages: [menu('manita', 1), menu('manita', 2), menu('manita', 3)],
    imageCredit: `Logo Halles du Lez · Photos @manita_montpellier · ${DEMO}`,
  },
  naked: {
    logo: brandLogo('naked'),
    logoFallback: officialLogo('naked'),
    heroImage: hero('naked'),
    gallery: [
      { src: gallery('naked', 1), alt: 'Cocktail signature NAKED' },
      { src: gallery('naked', 2), alt: 'Œuf mollet avocat NAKED' },
      { src: gallery('naked', 3), alt: 'Brunch NAKED' },
    ],
    menuImages: [menu('naked', 1), menu('naked', 2), menu('naked', 3)],
    imageCredit: `Logo Halles du Lez · Inspiré @nakedmtp · ${DEMO}`,
  },
  'blue-india': {
    logo: brandLogo('blue-india'),
    logoFallback: officialLogo('blue-india'),
    heroImage: hero('blue-india'),
    gallery: [
      { src: gallery('blue-india', 1), alt: 'Cheese Naan Blue India' },
      { src: gallery('blue-india', 2), alt: 'Thali Blue India' },
      { src: gallery('blue-india', 3), alt: 'Cocktail Blue India' },
    ],
    menuImages: [menu('blue-india', 1), menu('blue-india', 2), menu('blue-india', 3)],
    imageCredit: `Logo Halles du Lez · Claap.fr + @blueindia_mtp · ${DEMO}`,
  },
  banger: {
    logo: brandLogo('banger'),
    logoFallback: officialLogo('banger'),
    heroImage: hero('banger'),
    gallery: [
      { src: gallery('banger', 1), alt: 'Smash Classic BANGER' },
      { src: gallery('banger', 2), alt: 'Smash XL BANGER' },
      { src: gallery('banger', 3), alt: 'Pancakes maison BANGER' },
    ],
    menuImages: [menu('banger', 1), menu('banger', 2), menu('banger', 3)],
    imageCredit: `Logo Halles du Lez · @smashbanger_co · ${DEMO}`,
  },
  soleira: {
    logo: brandLogo('soleira'),
    logoFallback: officialLogo('soleira'),
    heroImage: hero('soleira'),
    gallery: [
      { src: gallery('soleira', 1), alt: 'Cuisine SOLEIRA' },
      { src: gallery('soleira', 2), alt: 'Hot-Dog Toulousain SOLEIRA' },
      { src: gallery('soleira', 3), alt: 'Cassoulet SOLEIRA' },
    ],
    menuImages: [menu('soleira', 1), menu('soleira', 2), menu('soleira', 3)],
    imageCredit: `Logo Halles du Lez · MarcheDuLez.com · ${DEMO}`,
  },
  'casa-asado': {
    logo: brandLogo('casa-asado'),
    logoFallback: officialLogo('casa-asado'),
    heroImage: hero('casa-asado'),
    gallery: [
      { src: gallery('casa-asado', 1), alt: 'Picanha Casa Asado' },
      { src: gallery('casa-asado', 2), alt: 'Tartare Casa Asado' },
      { src: gallery('casa-asado', 3), alt: 'Grill Casa Asado' },
    ],
    menuImages: [menu('casa-asado', 1), menu('casa-asado', 2), menu('casa-asado', 3)],
    imageCredit: `Logo Halles du Lez · @casa.asado · ${DEMO}`,
  },
  'maria-bonita': {
    logo: brandLogo('maria-bonita'),
    logoFallback: officialLogo('maria-bonita'),
    heroImage: hero('maria-bonita'),
    gallery: [
      { src: gallery('maria-bonita', 1), alt: 'Empanada carne picante' },
      { src: gallery('maria-bonita', 2), alt: 'Empanada végétarienne' },
      { src: gallery('maria-bonita', 3), alt: 'Planche Maria Bonita' },
    ],
    menuImages: [menu('maria-bonita', 1), menu('maria-bonita', 2), menu('maria-bonita', 3)],
    imageCredit: `Logo Halles du Lez · @mariabonitamontpellier · ${DEMO}`,
  },
  bambino: {
    logo: brandLogo('bambino'),
    logoFallback: officialLogo('bambino'),
    heroImage: hero('bambino'),
    gallery: [
      { src: gallery('bambino-tonton', 1), alt: 'Pizza Truffa Lova Bambino' },
      { src: gallery('bambino-tonton', 3), alt: 'Pizza à la part Bambino' },
      { src: hero('bambino'), alt: 'Bambino Pizza Club' },
    ],
    menuImages: [menu('bambino-tonton', 1), menu('bambino-tonton', 3), menu('bambino-tonton', 1)],
    imageCredit: `Logo Halles du Lez · @bambinopizzaclub · ${DEMO}`,
  },
  'tonton-haricot': {
    logo: brandLogo('tonton-haricot'),
    logoFallback: officialLogo('tonton-haricot'),
    heroImage: hero('tonton-haricot'),
    gallery: [
      { src: gallery('bambino-tonton', 2), alt: 'Salade Tonton Haricot' },
      { src: hero('tonton-haricot'), alt: 'Tonton Haricot' },
      { src: gallery('bambino-tonton', 2), alt: 'Produits locaux' },
    ],
    menuImages: [menu('bambino-tonton', 2), menu('bambino-tonton', 2), menu('bambino-tonton', 2)],
    imageCredit: `Logo Halles du Lez · Tonton Haricot · ${DEMO}`,
  },
  'la-bodeguita': {
    logo: brandLogo('la-bodeguita'),
    logoFallback: officialLogo('la-bodeguita'),
    heroImage: hero('la-bodeguita'),
    gallery: [
      { src: gallery('la-bodeguita', 1), alt: 'Paëlla royale La Bodeguita' },
      { src: gallery('la-bodeguita', 2), alt: 'Paëlla végétale' },
      { src: gallery('la-bodeguita', 3), alt: 'Tapas assortis' },
    ],
    menuImages: [menu('la-bodeguita', 1), menu('la-bodeguita', 2), menu('la-bodeguita', 3)],
    imageCredit: `Logo Halles du Lez · @labodeguita_hallesdulez · ${DEMO}`,
  },
};

export function getBrandAssets(slug: string): BrandAssets {
  const rich = richAssets[slug];
  if (rich) return rich;

  const h = hero(slug);
  const logo = brandLogo(slug);
  return {
    logo,
    logoFallback: officialLogo(slug),
    heroImage: h,
    gallery: [{ src: h, alt: `Stand ${slug}` }],
    menuImages: [h, h, h],
    imageCredit: `Logo officiel Halles du Lez · ${DEMO}`,
  };
}
