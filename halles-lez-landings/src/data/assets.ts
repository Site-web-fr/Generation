/** Visuels par commerce — logos, photos plats et crédits sources. */
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

export const brandAssets: Record<string, BrandAssets> = {
  'rouge-beef': {
    logo: '/logos-official/rouge-beef.png',
    logoFallback: '/logos/rouge-beef.svg',
    heroImage: hero('rouge-beef'),
    gallery: [
      { src: gallery('rouge-beef', 1), alt: 'Identité Rouge Beef — Studio Therese' },
      { src: gallery('rouge-beef', 2), alt: 'Charte graphique Rouge Beef' },
      { src: gallery('rouge-beef', 3), alt: 'Burger Classic Rouge' },
    ],
    menuImages: [menu('rouge-beef', 1), menu('rouge-beef', 2), menu('rouge-beef', 3)],
    imageCredit: `Studio Therese + démo IA · ${DEMO}`,
  },
  manita: {
    logo: '/logos-official/manita.png',
    logoFallback: '/logos/manita.svg',
    heroImage: hero('manita'),
    gallery: [
      { src: gallery('manita', 1), alt: 'Ceviche MANITA' },
      { src: gallery('manita', 2), alt: 'Brochettes BBQ MANITA' },
      { src: gallery('manita', 3), alt: 'Ambiance MANITA' },
    ],
    menuImages: [menu('manita', 1), menu('manita', 2), menu('manita', 3)],
    imageCredit: `Photos clients @manita_montpellier via Sluurpy · ${DEMO}`,
  },
  naked: {
    logo: '/logos-official/naked.png',
    logoFallback: '/logos/naked.svg',
    heroImage: hero('naked'),
    gallery: [
      { src: gallery('naked', 1), alt: 'Cocktail signature NAKED' },
      { src: gallery('naked', 2), alt: 'Œuf mollet avocat NAKED' },
      { src: gallery('naked', 3), alt: 'Brunch NAKED' },
    ],
    menuImages: [menu('naked', 1), menu('naked', 2), menu('naked', 3)],
    imageCredit: `Inspiré @nakedmtp · démo IA · ${DEMO}`,
  },
  'blue-india': {
    logo: '/logos-official/blue-india.png',
    logoFallback: '/logos/blue-india.svg',
    heroImage: hero('blue-india'),
    gallery: [
      { src: gallery('blue-india', 1), alt: 'Cheese Naan Blue India' },
      { src: gallery('blue-india', 2), alt: 'Thali Blue India' },
      { src: gallery('blue-india', 3), alt: 'Cocktail Blue India' },
    ],
    menuImages: [menu('blue-india', 1), menu('blue-india', 2), menu('blue-india', 3)],
    imageCredit: `Claap.fr + @blueindia_mtp · ${DEMO}`,
  },
  banger: {
    logo: '/logos-official/banger.png',
    logoFallback: '/logos/banger.svg',
    heroImage: hero('banger'),
    gallery: [
      { src: gallery('banger', 1), alt: 'Smash Classic BANGER' },
      { src: gallery('banger', 2), alt: 'Smash XL BANGER' },
      { src: gallery('banger', 3), alt: 'Pancakes maison BANGER' },
    ],
    menuImages: [menu('banger', 1), menu('banger', 2), menu('banger', 3)],
    imageCredit: `Inspiré @smashbanger_co · démo IA · ${DEMO}`,
  },
  soleira: {
    logo: '/logos-official/soleira.png',
    logoFallback: '/logos/soleira.svg',
    heroImage: hero('soleira'),
    gallery: [
      { src: gallery('soleira', 1), alt: 'Cuisine SOLEIRA' },
      { src: gallery('soleira', 2), alt: 'Hot-Dog Toulousain SOLEIRA' },
      { src: gallery('soleira', 3), alt: 'Cassoulet SOLEIRA' },
    ],
    menuImages: [menu('soleira', 1), menu('soleira', 2), menu('soleira', 3)],
    imageCredit: `MarcheDuLez.com + démo IA · ${DEMO}`,
  },
  'casa-asado': {
    logo: '/logos-official/casa-asado.png',
    logoFallback: '/logos/casa-asado.svg',
    heroImage: hero('casa-asado'),
    gallery: [
      { src: gallery('casa-asado', 1), alt: 'Picanha Casa Asado' },
      { src: gallery('casa-asado', 2), alt: 'Tartare Casa Asado' },
      { src: gallery('casa-asado', 3), alt: 'Grill Casa Asado' },
    ],
    menuImages: [menu('casa-asado', 1), menu('casa-asado', 2), menu('casa-asado', 3)],
    imageCredit: `Inspiré @casa.asado · démo IA · ${DEMO}`,
  },
  'maria-bonita': {
    logo: '/logos-official/maria-bonita.png',
    logoFallback: '/logos/maria-bonita.svg',
    heroImage: hero('maria-bonita'),
    gallery: [
      { src: gallery('maria-bonita', 1), alt: 'Empanada carne picante' },
      { src: gallery('maria-bonita', 2), alt: 'Empanada végétarienne' },
      { src: gallery('maria-bonita', 3), alt: 'Planche Maria Bonita' },
    ],
    menuImages: [menu('maria-bonita', 1), menu('maria-bonita', 2), menu('maria-bonita', 3)],
    imageCredit: `Inspiré @mariabonitamontpellier · démo IA · ${DEMO}`,
  },
  'bambino-tonton': {
    logo: '/logos-official/bambino-tonton.png',
    logoFallback: '/logos/bambino-tonton.svg',
    heroImage: hero('bambino-tonton'),
    gallery: [
      { src: gallery('bambino-tonton', 1), alt: 'Pizza Truffa Lova Bambino' },
      { src: gallery('bambino-tonton', 2), alt: 'Salade Tonton Haricot' },
      { src: gallery('bambino-tonton', 3), alt: 'Pizza à la part Bambino' },
    ],
    menuImages: [menu('bambino-tonton', 1), menu('bambino-tonton', 2), menu('bambino-tonton', 3)],
    imageCredit: `Inspiré @bambinopizzaclub · démo IA · ${DEMO}`,
  },
  'la-bodeguita': {
    logo: '/logos-official/la-bodeguita.png',
    logoFallback: '/logos/la-bodeguita.svg',
    heroImage: hero('la-bodeguita'),
    gallery: [
      { src: gallery('la-bodeguita', 1), alt: 'Paëlla royale La Bodeguita' },
      { src: gallery('la-bodeguita', 2), alt: 'Paëlla végétale' },
      { src: gallery('la-bodeguita', 3), alt: 'Tapas assortis' },
    ],
    menuImages: [menu('la-bodeguita', 1), menu('la-bodeguita', 2), menu('la-bodeguita', 3)],
    imageCredit: `Inspiré @labodeguita_hallesdulez · démo IA · ${DEMO}`,
  },
};

export function getBrandAssets(slug: string): BrandAssets {
  const assets = brandAssets[slug];
  if (assets) return assets;
  return {
    logo: `/logos/${slug}.svg`,
    logoFallback: `/logos/${slug}.svg`,
    heroImage: '',
    gallery: [],
    menuImages: ['', '', ''],
    imageCredit: DEMO,
  };
}
