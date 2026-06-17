/** Build asset URL respecting Vite base (GitHub Pages subdirectory). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '');
  return `${base}${clean}`;
}

/** Full public URL for a landing page — shareable from mobile. */
export function pageUrl(slug?: string): string {
  const base = import.meta.env.BASE_URL;
  const path = slug ? `${base}${slug}`.replace(/\/{2,}/g, '/') : base;
  return new URL(path, window.location.origin).href;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

export function exportPdf(): void {
  window.print();
}
