import { useMemo, useState } from 'react';
import type { LogoKind } from '../data/logo-sources';
import { assetUrl } from '../utils/url';

interface Props {
  slug: string;
  name: string;
  logo: string;
  logoFallback?: string;
  logoChain?: string[];
  kind?: LogoKind;
  className?: string;
  variant?: 'hero' | 'nav' | 'intro';
}

export default function BrandHeroLogo({
  slug,
  name,
  logo,
  logoFallback,
  logoChain,
  className = '',
  variant = 'hero',
}: Props) {
  const chain = useMemo(
    () => logoChain ?? [logo, logoFallback].filter(Boolean) as string[],
    [logo, logoFallback, logoChain],
  );

  const [index, setIndex] = useState(0);
  const src = assetUrl(chain[index] ?? logo);
  const resolvedKind: LogoKind = (chain[index] ?? '').endsWith('.svg') ? 'wordmark' : 'picto';

  const handleError = () => {
    if (index < chain.length - 1) setIndex((i) => i + 1);
  };

  if (resolvedKind === 'picto') {
    return (
      <div
        className={`brand-logo-badge brand-logo-badge--${variant} ${className}`.trim()}
        data-slug={slug}
      >
        <img
          src={src}
          alt={name}
          className="brand-logo-picto"
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className={`brand-logo brand-logo--wordmark brand-logo--${variant} ${className}`.trim()}
      onError={handleError}
    />
  );
}
