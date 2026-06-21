import { Link } from 'react-router-dom';
import { sites } from '../../data/sites';
import { useSeo, hubSeo } from '../../utils/seo';
import { copyToClipboard, pageUrl } from '../../utils/url';
import './Hub.css';

export default function HubMobile() {
  useSeo(hubSeo(sites.length));

  return (
    <div className="hub hub--mobile">
      <main className="hub-main">
        <header className="hub-header">
          <span className="hub-badge">Premium Landings</span>
          <h1 className="hub-title">10 Expériences d'Exception</h1>
          <p className="hub-subtitle">Sélectionnez une démo client</p>
          <a href="https://site-web-fr.github.io/Generation/pilot.html" className="hub-pilot-link">
            📱 Tous les liens
          </a>
        </header>

        <ul className="hub-mobile-list">
          {sites.map((site, i) => (
            <li key={site.slug}>
              <Link to={`/${site.slug}`} className="hub-mobile-item">
                <span className="hub-mobile-num">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{site.name}</strong>
                  <small>{site.subtitle}</small>
                </span>
              </Link>
              <button
                type="button"
                className="hub-mobile-copy"
                onClick={() => copyToClipboard(pageUrl(site.slug))}
              >
                Copier
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
