const base = import.meta.env.BASE_URL;

export function assetUrl(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}

export function pageUrl(slug?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const path = slug ? `${base}#/${slug}` : `${base}#/`;
  return `${origin}${path}`;
}

export function copyToClipboard(text: string): void {
  void navigator.clipboard?.writeText(text);
}
