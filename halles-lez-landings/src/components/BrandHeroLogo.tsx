import { useState } from 'react';
import { brandLogoSrc, hasRealLogo } from '../data/logo-sources';
import { assetUrl } from '../utils/url';

interface Props {
  slug: string;
  name: string;
  className?: string;
  variant?: 'hero' | 'nav';
}

/**
 * Affiche le nom de marque.
 * - Si un vrai fichier logo existe (public/logos-brand/{slug}.png + slug listé
 *   dans REAL_LOGOS), on l'affiche.
 * - Sinon : « nameplate » typographique (le vrai nom, dans la police de charte).
 *   Jamais de faux logo ni de picto générique.
 */
export default function BrandHeroLogo({ slug, name, className = '', variant = 'hero' }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = hasRealLogo(slug) && !imgFailed;

  if (showImage) {
    return (
      <img
        src={assetUrl(brandLogoSrc(slug))}
        alt={name}
        className={`brand-logo brand-logo--${variant} ${className}`.trim()}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <span
      className={`brand-nameplate brand-nameplate--${variant} ${className}`.trim()}
      data-slug={slug}
    >
      {name}
    </span>
  );
}
