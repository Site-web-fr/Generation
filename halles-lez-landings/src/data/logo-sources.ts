/**
 * Logos réels uniquement.
 *
 * Par défaut, chaque stand affiche un « nameplate » typographique (son vrai nom
 * dans sa police de charte) — pas de faux logo, pas de picto générique présenté
 * comme logo.
 *
 * Quand un VRAI fichier logo est fourni par le commerçant, le déposer dans
 * `public/logos-brand/{slug}.png` (fond transparent, largeur ≥ 400px) PUIS
 * ajouter son slug ci-dessous. La page l'utilisera automatiquement.
 */
export const REAL_LOGOS = new Set<string>([
  // ex. 'rouge-beef',  ← décommenter quand public/logos-brand/rouge-beef.png existe
]);

export function brandLogoSrc(slug: string): string {
  return `/logos-brand/${slug}.png`;
}

export function hasRealLogo(slug: string): boolean {
  return REAL_LOGOS.has(slug);
}
