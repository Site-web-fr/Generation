const STORAGE_KEY = 'halles-pitch-mode';

/** Mode présentation client : masque les mentions « démo / proposition commerciale ». */
export function detectPitchMode(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'pitch') {
    sessionStorage.setItem(STORAGE_KEY, '1');
    return true;
  }
  if (params.get('mode') === 'demo') {
    sessionStorage.removeItem(STORAGE_KEY);
    return false;
  }
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}

export function pitchPageUrl(slug?: string): string {
  const base = import.meta.env.BASE_URL;
  const origin = window.location.origin;
  const basePath = base.endsWith('/') ? base : `${base}/`;
  const query = '?mode=pitch';

  if (base !== '/') {
    const hash = slug ? `#/${slug}` : '#/';
    return `${origin}${basePath}${query}${hash}`;
  }

  const path = slug ? `${base}${slug}`.replace(/\/{2,}/g, '/') : base;
  return `${new URL(path, origin).href}${query}`;
}
