import { useState } from 'react';
import { assetUrl, copyToClipboard, exportPdf, pageUrl } from '../utils/url';
import './ShareBar.css';

interface Props {
  slug: string;
  brandName: string;
}

export default function ShareBar({ slug, brandName }: Props) {
  const [copied, setCopied] = useState(false);
  const url = pageUrl(slug);

  const handleCopy = async () => {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${brandName} — Halles du Lez`,
          text: `Découvrez la proposition site web pour ${brandName}`,
          url,
        });
        return;
      } catch {
        /* user cancelled */
      }
    }
    handleCopy();
  };

  return (
    <div className="share-bar no-print">
      <div className="share-bar-inner">
        <div className="share-bar-url">
          <span className="share-label">Lien démo mobile</span>
          <code>{url}</code>
        </div>
        <div className="share-bar-actions">
          <button type="button" className="share-btn" onClick={handleShare}>
            {copied ? '✓ Copié !' : '📱 Partager'}
          </button>
          <button type="button" className="share-btn share-btn-outline" onClick={handleCopy}>
            Copier le lien
          </button>
          <button type="button" className="share-btn share-btn-outline" onClick={exportPdf}>
            📄 Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrandLogo({
  slug,
  alt,
  className = '',
  logo,
  logoFallback,
}: {
  slug: string;
  alt: string;
  className?: string;
  logo?: string;
  logoFallback?: string;
}) {
  const primary = assetUrl(logo ?? `/logos-official/${slug}.png`);
  const fallback = assetUrl(logoFallback ?? `/logos/${slug}.svg`);

  return (
    <img
      src={primary}
      alt={alt}
      className={`brand-logo ${className}`}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== fallback) img.src = fallback;
      }}
    />
  );
}
