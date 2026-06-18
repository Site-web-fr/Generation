/** Wordmarks charte rédigés à la main — pas les génériques auto-générés. */
export const WORDMARK_SLUGS = new Set([
  'rouge-beef',
  'manita',
  'naked',
  'blue-india',
  'banger',
  'soleira',
  'casa-asado',
  'maria-bonita',
  'la-bodeguita',
  'bambino',
  'tonton-haricot',
]);

export type LogoKind = 'wordmark' | 'picto';

export interface ResolvedLogo {
  /** Première URL tentée (HD utilisateur ou wordmark ou picto). */
  logo: string;
  logoFallback: string;
  /** Chaîne de secours complète. */
  logoChain: string[];
  kind: LogoKind;
}

function official(slug: string) {
  return `/logos-official/${slug}.png`;
}

function wordmark(slug: string) {
  return `/logos/${slug}.svg`;
}

function brandHd(slug: string) {
  return `/logos-brand/${slug}.png`;
}

export function resolveLogo(slug: string): ResolvedLogo {
  const picto = official(slug);
  const hd = brandHd(slug);

  if (WORDMARK_SLUGS.has(slug)) {
    const wm = wordmark(slug);
    return {
      logo: hd,
      logoFallback: wm,
      logoChain: [hd, wm, picto],
      kind: 'wordmark',
    };
  }

  return {
    logo: hd,
    logoFallback: picto,
    logoChain: [hd, picto],
    kind: 'picto',
  };
}
