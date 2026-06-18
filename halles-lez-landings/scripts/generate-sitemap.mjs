#!/usr/bin/env node
/** Génère sitemap.xml avec routes hash GitHub Pages. */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const BASE = 'https://site-web-fr.github.io/Generation/';
const SLUGS = [
  '',
  'rouge-beef',
  'manita',
  'naked',
  'blue-india',
  'banger',
  'soleira',
  'casa-asado',
  'maria-bonita',
  'bambino-tonton',
  'la-bodeguita',
];

const today = new Date().toISOString().slice(0, 10);

const urls = SLUGS.map((slug) => {
  const loc = slug ? `${BASE}#/${slug}` : BASE;
  const priority = slug ? '0.8' : '1.0';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');
writeFileSync(out, xml);
console.log('Wrote', out);
