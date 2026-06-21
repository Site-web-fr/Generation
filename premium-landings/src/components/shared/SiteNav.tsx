import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Site } from '../../data/sites';

interface Props {
  site: Site;
}

export default function SiteNav({ site }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <Link to="/" className="site-nav-back">← Portfolio</Link>
      <span className="site-nav-brand">{site.name}</span>
      <a href="#configurator" className="site-nav-cta">{site.ctaPrimary}</a>
    </nav>
  );
}
