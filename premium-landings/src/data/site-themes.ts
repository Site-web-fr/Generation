import type { Site } from './sites';
import { applyArtDirection, getArtDirection, type DirectedSite, type SiteTheme } from './site-art-direction';

export type { SiteTheme, DirectedSite };
export { getArtDirection, applyArtDirection };

export type ThemedSite = DirectedSite;

export function applySiteTheme(site: Site): DirectedSite {
  return applyArtDirection(site);
}
