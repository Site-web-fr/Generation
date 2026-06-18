/** Visuels par commerce — logos officiels Halles du Lez + photos stand. */
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

const CREDIT = 'Visuels © Halles du Lez — hallesdulez.com · Proposition commerciale';

function ext(slug: string): 'jpg' | 'png' {
  return slug === 'rouge-beef' || slug === 'banger' || slug === 'soleira' || slug === 'casa-asado'
    ? 'png'
    : 'jpg';
}

function hero(slug: string): string {
  return `/photos/hero/${slug}.${ext(slug)}`;
}

function menu(slug: string, n: 1 | 2 | 3): string {
  return `/photos/menu/${slug}-${n}.${ext(slug)}`;
}

export const brandAssets: Record<string, BrandAssets> = {
  'rouge-beef': {
    logo: '/logos-official/rouge-beef.png',
    logoFallback: '/logos/rouge-beef.svg',
    heroImage: hero('rouge-beef'),
    gallery: [
      { src: hero('rouge-beef'), alt: 'Stand Rouge Beef aux Halles du Lez' },
      { src: '/logos-official/rouge-beef.png', alt: 'Logo Rouge Beef' },
    ],
    menuImages: [menu('rouge-beef', 1), menu('rouge-beef', 2), menu('rouge-beef', 3)],
    imageCredit: CREDIT,
  },
  manita: {
    logo: '/logos-official/manita.png',
    logoFallback: '/logos/manita.svg',
    heroImage: hero('manita'),
    gallery: [
      { src: hero('manita'), alt: 'Stand MANITA aux Halles du Lez' },
      { src: '/logos-official/manita.png', alt: 'Logo MANITA Saveurs entre Suds' },
    ],
    menuImages: [menu('manita', 1), menu('manita', 2), menu('manita', 3)],
    imageCredit: CREDIT,
  },
  naked: {
    logo: '/logos-official/naked.png',
    logoFallback: '/logos/naked.svg',
    heroImage: hero('naked'),
    gallery: [
      { src: hero('naked'), alt: 'Stand NAKED aux Halles du Lez' },
      { src: '/logos-official/naked.png', alt: 'Logo NAKED' },
    ],
    menuImages: [menu('naked', 1), menu('naked', 2), menu('naked', 3)],
    imageCredit: CREDIT,
  },
  'blue-india': {
    logo: '/logos-official/blue-india.png',
    logoFallback: '/logos/blue-india.svg',
    heroImage: hero('blue-india'),
    gallery: [
      { src: hero('blue-india'), alt: 'Stand Blue India aux Halles du Lez' },
      { src: '/logos-official/blue-india.png', alt: 'Logo Blue India' },
    ],
    menuImages: [menu('blue-india', 1), menu('blue-india', 2), menu('blue-india', 3)],
    imageCredit: CREDIT,
  },
  banger: {
    logo: '/logos-official/banger.png',
    logoFallback: '/logos/banger.svg',
    heroImage: hero('banger'),
    gallery: [
      { src: hero('banger'), alt: 'Stand BANGER aux Halles du Lez' },
      { src: '/logos-official/banger.png', alt: 'Logo BANGER' },
    ],
    menuImages: [menu('banger', 1), menu('banger', 2), menu('banger', 3)],
    imageCredit: CREDIT,
  },
  soleira: {
    logo: '/logos-official/soleira.png',
    logoFallback: '/logos/soleira.svg',
    heroImage: hero('soleira'),
    gallery: [
      { src: hero('soleira'), alt: 'Stand SOLEIRA aux Halles du Lez' },
      { src: '/logos-official/soleira.png', alt: 'Logo SOLEIRA' },
    ],
    menuImages: [menu('soleira', 1), menu('soleira', 2), menu('soleira', 3)],
    imageCredit: CREDIT,
  },
  'casa-asado': {
    logo: '/logos-official/casa-asado.png',
    logoFallback: '/logos/casa-asado.svg',
    heroImage: hero('casa-asado'),
    gallery: [
      { src: hero('casa-asado'), alt: 'Stand Casa Asado aux Halles du Lez' },
      { src: '/logos-official/casa-asado.png', alt: 'Logo Casa Asado' },
    ],
    menuImages: [menu('casa-asado', 1), menu('casa-asado', 2), menu('casa-asado', 3)],
    imageCredit: CREDIT,
  },
  'maria-bonita': {
    logo: '/logos-official/maria-bonita.png',
    logoFallback: '/logos/maria-bonita.svg',
    heroImage: hero('maria-bonita'),
    gallery: [
      { src: hero('maria-bonita'), alt: 'Stand Maria Bonita aux Halles du Lez' },
      { src: '/logos-official/maria-bonita.png', alt: 'Logo Maria Bonita' },
    ],
    menuImages: [menu('maria-bonita', 1), menu('maria-bonita', 2), menu('maria-bonita', 3)],
    imageCredit: CREDIT,
  },
  'bambino-tonton': {
    logo: '/logos-official/bambino-tonton.png',
    logoFallback: '/logos/bambino-tonton.svg',
    heroImage: hero('bambino-tonton'),
    gallery: [
      { src: hero('bambino-tonton'), alt: 'Bambino Pizza Club aux Halles du Lez' },
      { src: '/photos/gallery/bambino-tonton-2.jpg', alt: 'Tonton Haricot — bar à salades' },
      { src: '/logos-official/bambino-tonton.png', alt: 'Logo Bambino' },
    ],
    menuImages: [menu('bambino-tonton', 1), menu('bambino-tonton', 2), menu('bambino-tonton', 3)],
    imageCredit: CREDIT,
  },
  'la-bodeguita': {
    logo: '/logos-official/la-bodeguita.png',
    logoFallback: '/logos/la-bodeguita.svg',
    heroImage: hero('la-bodeguita'),
    gallery: [
      { src: hero('la-bodeguita'), alt: 'Stand La Bodeguita aux Halles du Lez' },
      { src: '/logos-official/la-bodeguita.png', alt: 'Logo La Bodeguita' },
    ],
    menuImages: [menu('la-bodeguita', 1), menu('la-bodeguita', 2), menu('la-bodeguita', 3)],
    imageCredit: CREDIT,
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
    imageCredit: CREDIT,
  };
}
