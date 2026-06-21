import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { DirectedSite } from '../../data/site-art-direction';
import type { SiteTheme } from '../../data/site-art-direction';
import BrandLogo from './BrandLogo';

interface Props {
  site: DirectedSite;
  theme?: SiteTheme;
}

export default function SiteNav({ site, theme = site.theme }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) ref.current.classList.toggle('site-nav--scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={ref} className={`site-nav site-nav--${theme} site-nav--${site.slug}`}>
      <Link to="/premium" className="site-nav-back">← Portfolio</Link>
      <div className="site-nav-brand-wrap">
        <BrandLogo slug={site.slug} />
        <span className="site-nav-brand">{site.name}</span>
      </div>
      <a href="#configurator" className="site-nav-cta">{site.ctaPrimary}</a>
    </nav>
  );
}
