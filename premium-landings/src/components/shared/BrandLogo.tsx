import type { ReactNode } from 'react';

interface Props {
  slug: string;
  className?: string;
}

export default function BrandLogo({ slug, className = '' }: Props) {
  return (
    <span className={`brand-logo brand-logo--${slug} ${className}`} aria-hidden>
      {logos[slug] ?? logos['velours-auto']}
    </span>
  );
}

const logos: Record<string, ReactNode> = {
  'eclat-aesthetic': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C14 4 8 14 8 24s6 20 16 20 16-10 16-20S34 4 24 4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 28c4-8 12-8 16 0M20 18h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <text x="24" y="27" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="serif" fontStyle="italic">É</text>
    </svg>
  ),
  'maison-lumiere': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="2" />
      <path d="M6 24h36M24 6v36" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <text x="24" y="30" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700" fontFamily="sans-serif">ML</text>
    </svg>
  ),
  'azure-thrill': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 36L20 12l8 10 16-22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="10" r="4" fill="currentColor" />
    </svg>
  ),
  'pristine-yachts': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32c8-4 16-4 32 0M12 28l12-16 12 16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 12v4M20 8h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2" fill="currentColor" />
    </svg>
  ),
  'velours-auto': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28h32M12 28l6-14h12l6 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 32h40" stroke="currentColor" strokeWidth="3" />
      <circle cx="14" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="34" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'horizon-charter': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 30c8-6 16-8 20-8s12 2 20 8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 34l8-20 8 12 8-16 8 24" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      <circle cx="38" cy="10" r="5" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  'sanctum-spa': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="28" height="28" stroke="currentColor" strokeWidth="1" />
      <path d="M10 24h28M24 10v28" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'aether-aviation': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 8l-4 12h8L24 8zM8 28l16 4 16-4-8 8H16l-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 36h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'atelier-nocturne': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9l3-9z" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="24" cy="26" r="4" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  'grand-palais-events': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 36V20l16-12 16 12v16H8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 36V26h12v10M8 20l16 8 16-8" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
};
