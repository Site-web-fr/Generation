export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}

export function pageUrl(slug?: string): string {
  const base = import.meta.env.BASE_URL;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const basePath = base.endsWith('/') ? base : `${base}/`;

  if (base !== '/') {
    const hash = slug ? `#/${slug}` : '#/';
    return `${origin}${basePath}${hash}`;
  }

  const path = slug ? `${base}${slug}`.replace(/\/{2,}/g, '/') : base;
  return new URL(path, origin).href;
}

export function pilotPageUrl(): string {
  const base = import.meta.env.BASE_URL;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return new URL(`${base}pilot.html`, origin).href;
}

export function copyToClipboard(text: string): void {
  void navigator.clipboard?.writeText(text);
}

export function formatCurrency(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value);
}

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}
