import { useState } from 'react';
import { assetUrl, copyToClipboard, exportPdf, pageUrl } from '../utils/url';
import { pitchPageUrl } from '../utils/pitch-mode';
import './ShareBar.css';

interface Props {
  slug: string;
  brandName: string;
  pitchMode?: boolean;
}

export default function ShareBar({ slug, brandName, pitchMode = false }: Props) {
  const [copied, setCopied] = useState(false);
  const url = pitchMode ? pitchPageUrl(slug) : pageUrl(slug);

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
          text: pitchMode
            ? `Découvrez ${brandName} aux Halles du Lez`
            : `Découvrez la proposition site web pour ${brandName}`,
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
          <span className="share-label">{pitchMode ? 'Partager cette page' : 'Lien démo mobile'}</span>
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
  const primary = assetUrl(logo ?? `/logos/${slug}.svg`);
  const fallback = assetUrl(logoFallback ?? `/logos-official/${slug}.png`);
  const [src, setSrc] = useState(primary);
  const isPicto = src.includes('logos-official');

  return (
    <img
      src={src}
      alt={alt}
      className={`brand-logo ${className}${isPicto ? ' hero-logo--picto' : ''}`}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
