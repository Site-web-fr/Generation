import { useEffect } from 'react';
import type { Site } from '../data/sites';

export interface SeoMeta {
  title: string;
  description: string;
}

export function siteSeo(site: Site): SeoMeta {
  return {
    title: `${site.name} — ${site.subtitle}`,
    description: site.description.slice(0, 160),
  };
}

export function hubSeo(count: number): SeoMeta {
  return {
    title: 'Premium Landings — 10 Propositions Client 2026',
    description: `${count} landing pages premium avec UX interactive, 3D et estimateurs — chirurgie esthétique, immobilier, jet ski Dubai, yacht, véhicules de luxe.`,
  };
}

export function useSeo(meta: SeoMeta): void {
  useEffect(() => {
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', meta.description);
  }, [meta.title, meta.description]);
}
