export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}

export function pageUrl(slug?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const onMobileEntry =
    typeof window !== 'undefined' && window.location.pathname.includes('mobile.html');
  const entry = onMobileEntry ? '/mobile.html' : '/';
  if (!slug) {
    return onMobileEntry ? `${origin}${base}/mobile.html#/premium` : `${origin}${base}/`;
  }
  return `${origin}${base}${entry}#/${slug}`;
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
