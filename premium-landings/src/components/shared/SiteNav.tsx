import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Site } from '../../data/sites';

interface Props {
  site: Site;
}

export default function SiteNav({ site }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) ref.current.classList.toggle('site-nav--scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={ref} className="site-nav">
      <Link to="/" className="site-nav-back">← Portfolio</Link>
      <span className="site-nav-brand">{site.name}</span>
      <a href="#configurator" className="site-nav-cta">{site.ctaPrimary}</a>
    </nav>
  );
}
