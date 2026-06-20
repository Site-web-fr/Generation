/** Typographie par stand — alignée sur l'ADN visuel du logo / charte de chaque marque. */
export interface BrandFonts {
  heading: string;
  body: string;
  /** Espacement titres (condensé = logos display / street food) */
  headingSpacing?: string;
  /** Casse titres quand la charte l'exige */
  headingTransform?: 'uppercase' | 'none';
}

const F = {
  archivo: { heading: '"Archivo Black", sans-serif', body: '"Nunito", sans-serif' },
  bebas: { heading: '"Bebas Neue", sans-serif', body: '"DM Sans", sans-serif', headingSpacing: '0.04em', headingTransform: 'uppercase' as const },
  blackOps: { heading: '"Black Ops One", cursive', body: '"Rubik", sans-serif', headingSpacing: '0.02em' },
  cinzel: { heading: '"Cinzel", serif', body: '"Lato", sans-serif', headingSpacing: '0.06em' },
  baskerville: { heading: '"Libre Baskerville", serif', body: '"Source Sans 3", sans-serif' },
  oswald: { heading: '"Oswald", sans-serif', body: '"Work Sans", sans-serif', headingSpacing: '0.03em', headingTransform: 'uppercase' as const },
  playfair: { heading: '"Playfair Display", serif', body: '"Outfit", sans-serif' },
  righteous: { heading: '"Righteous", cursive', body: '"Poppins", sans-serif' },
  space: { heading: '"Space Grotesk", sans-serif', body: '"IBM Plex Sans", sans-serif' },
  syne: { heading: '"Syne", sans-serif', body: '"Inter", sans-serif', headingSpacing: '-0.02em' },
};

/** Une paire de polices par slug — les 37 résidents Halles du Lez. */
const SLUG_FONTS: Record<string, BrandFonts> = {
  'rouge-beef': F.bebas,
  manita: F.archivo,
  naked: F.syne,
  'blue-india': F.playfair,
  banger: F.blackOps,
  soleira: F.baskerville,
  'casa-asado': F.oswald,
  'maria-bonita': F.righteous,
  bambino: F.space,
  'tonton-haricot': F.space,
  'la-bodeguita': F.cinzel,
  kochi: F.space,
  'tok-tok-wok': F.space,
  'bar-des-halles': F.syne,
  'bar-a-lez': F.playfair,
  'comptoir-alaryk': F.syne,
  'la-vita-al-dente': F.oswald,
  cherry: F.righteous,
  hyoga: F.righteous,
  'clara-jung': F.playfair,
  mamaona: F.space,
  bonobo: F.space,
  opa: F.cinzel,
  ummi: F.playfair,
  'aux-copains-dabord': { heading: '"Archivo Black", sans-serif', body: '"Nunito", sans-serif', headingSpacing: '-0.01em' },
  'chicken-shake': F.blackOps,
  'dom-pata-negra': F.cinzel,
  'comptoir-des-iles': F.archivo,
  'ma-cocotte': F.baskerville,
  'oh-my-goz': F.oswald,
  latelier: F.bebas,
  sax: F.baskerville,
  sorveteria: F.righteous,
  'jean-le-croquant': F.bebas,
  'bouchon-petit-jardin': F.baskerville,
  'pitas-de-sacha': F.archivo,
  'rotisserie-du-lez': F.oswald,
  lepicurieuse: F.playfair,
};

const CATEGORY_FALLBACK: Record<string, BrandFonts> = {
  boire: F.syne,
  manger: { heading: '"Archivo Black", sans-serif', body: '"DM Sans", sans-serif' },
  epicerie: F.playfair,
};

export function fontsForSlug(slug: string, category = 'manger'): BrandFonts {
  return SLUG_FONTS[slug] ?? CATEGORY_FALLBACK[category] ?? CATEGORY_FALLBACK.manger;
}
