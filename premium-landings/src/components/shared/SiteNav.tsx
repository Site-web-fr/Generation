import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Site } from '../../data/sites';
import type { SiteTheme } from '../../data/site-themes';

interface Props {
  site: Site;
  theme?: SiteTheme;
}

export default function SiteNav({ site, theme = 'dark' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) ref.current.classList.toggle('site-nav--scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={ref} className={`site-nav site-nav--${theme}`}>
      <Link to="/premium" className="site-nav-back">← Portfolio</Link>
      <span className="site-nav-brand">{site.name}</span>
      <a href="#configurator" className="site-nav-cta">{site.ctaPrimary}</a>
    </nav>
  );
}
