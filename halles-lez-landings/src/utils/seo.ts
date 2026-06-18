import type { Brand } from '../data/brands';
import { pageUrl } from './url';

const SITE_NAME = 'Halles du Lez — Montpellier';
const HUB_URL = 'https://site-web-fr.github.io/Generation/';
const ADDRESS = {
  streetAddress: '1348 Avenue Raymond Dugrand',
  addressLocality: 'Montpellier',
  postalCode: '34000',
  addressCountry: 'FR',
};

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export function brandSeo(brand: Brand): SeoConfig {
  const title = `${brand.name} — ${brand.type} | Halles du Lez Montpellier`;
  const description = `${brand.name}, ${brand.type} au stand ${brand.stand} (${brand.entrance}) des Halles du Lez à Montpellier. ${brand.description}`;
  const canonical = pageUrl(brand.slug);

  const sameAs = [brand.instagram, brand.facebook, brand.website].filter(Boolean) as string[];

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: brand.name,
      description: brand.description,
      servesCuisine: brand.type,
      url: canonical,
      telephone: brand.phone,
      address: {
        '@type': 'PostalAddress',
        ...ADDRESS,
      },
      containedInPlace: {
        '@type': 'FoodEstablishment',
        name: 'Halles du Lez',
        url: 'https://hallesdulez.com',
      },
      openingHours: brand.hours,
      sameAs: sameAs.length ? sameAs : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Halles du Lez', item: HUB_URL },
        { '@type': 'ListItem', position: 2, name: brand.name, item: canonical },
      ],
    },
  ];

  return {
    title,
    description: description.slice(0, 160),
    canonical,
    type: 'website',
    jsonLd,
  };
}

export function hubSeoWithBrands(brands: Brand[]): SeoConfig {
  return {
    title: `${SITE_NAME} — ${brands.length} commerces du food court`,
    description:
      'Le food court des Halles du Lez à Montpellier : restaurants, bars et épiceries. Stand par stand, adresse, horaires et contacts. 1348 Avenue Raymond Dugrand, 34000.',
    canonical: HUB_URL,
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Commerces des Halles du Lez',
      numberOfItems: brands.length,
      itemListElement: brands.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        url: pageUrl(b.slug),
      })),
    },
  };
}

function upsertMeta(key: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

const JSON_LD_ID = 'page-json-ld';

export function applySeo(config: SeoConfig) {
  document.title = config.title;
  document.documentElement.lang = 'fr';

  upsertMeta('description', config.description);
  upsertMeta('robots', config.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  upsertMeta('og:title', config.title, 'property');
  upsertMeta('og:description', config.description, 'property');
  upsertMeta('og:type', config.type ?? 'website', 'property');
  upsertMeta('og:locale', 'fr_FR', 'property');
  upsertMeta('og:site_name', SITE_NAME, 'property');
  upsertMeta('twitter:card', config.image ? 'summary_large_image' : 'summary');
  upsertMeta('twitter:title', config.title);
  upsertMeta('twitter:description', config.description);

  if (config.image) {
    upsertMeta('og:image', config.image, 'property');
    upsertMeta('twitter:image', config.image);
  }

  upsertLink('canonical', config.canonical);

  const existing = document.getElementById(JSON_LD_ID);
  existing?.remove();

  if (config.jsonLd) {
    const script = document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(config.jsonLd);
    document.head.appendChild(script);
  }
}

export function useSeoCleanup() {
  return () => {
    document.getElementById(JSON_LD_ID)?.remove();
  };
}
