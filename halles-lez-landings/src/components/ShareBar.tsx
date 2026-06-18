import { useState } from 'react';
import { copyToClipboard, exportPdf, pageUrl } from '../utils/url';
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
          text: `Découvrez ${brandName} aux Halles du Lez à Montpellier`,
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
          <span className="share-label">Partager cette page</span>
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
