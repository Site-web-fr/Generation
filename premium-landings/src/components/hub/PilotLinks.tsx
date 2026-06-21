import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sites } from '../../data/sites';
import { copyToClipboard, pageUrl } from '../../utils/url';
import './PilotLinks.css';

const DEPLOY_BASE = 'https://site-web-fr.github.io/Generation/premium';
const HALLES_BASE = 'https://site-web-fr.github.io/Generation';
const PILOT_STATIC = 'https://site-web-fr.github.io/Generation/pilot.html';

function absPremiumUrl(slug: string) {
  return `${DEPLOY_BASE}/#/${slug}`;
}

export default function PilotLinks() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    copyToClipboard(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="pilot">
      <header className="pilot-header">
        <Link to="/" className="pilot-back">← Hub</Link>
        <span className="pilot-badge">📱 Pilot Mobile</span>
        <h1>Liens directs</h1>
        <p>Tous les projets — copiez et ouvrez sur votre téléphone</p>
        <a href={PILOT_STATIC} className="pilot-static-link">
          Page pilot autonome (favori Safari)
        </a>
      </header>

      <section className="pilot-section">
        <h2>Portfolios</h2>
        <div className="pilot-hubs">
          <a href={DEPLOY_BASE + '/'} className="pilot-hub-card">
            <strong>✦ Premium Landings</strong>
            <span>Hub des 10 démos</span>
            <button type="button" onClick={(e) => { e.preventDefault(); handleCopy(DEPLOY_BASE + '/', 'hub-premium'); }}>
              {copied === 'hub-premium' ? '✓ Copié' : 'Copier'}
            </button>
          </a>
          <a href={HALLES_BASE} className="pilot-hub-card pilot-hub-card--halles">
            <strong>🍽 Halles du Lez</strong>
            <span>Food court Montpellier</span>
            <button type="button" onClick={(e) => { e.preventDefault(); handleCopy(HALLES_BASE, 'hub-halles'); }}>
              {copied === 'hub-halles' ? '✓ Copié' : 'Copier'}
            </button>
          </a>
        </div>
      </section>

      <section className="pilot-section">
        <h2>Premium — 10 sites client</h2>
        <ul className="pilot-list">
          {sites.map((site) => {
            const url = absPremiumUrl(site.slug);
            return (
              <li key={site.slug} className="pilot-row">
                <a href={url}>
                  <strong>{site.name}</strong>
                  <span>{site.subtitle}</span>
                </a>
                <button type="button" onClick={() => handleCopy(url, site.slug)}>
                  {copied === site.slug ? '✓' : 'Copier'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="pilot-section">
        <h2>Ce hub (développement local)</h2>
        <ul className="pilot-list">
          <li className="pilot-row">
            <a href="/">
              <strong>Hub Premium (local)</strong>
              <span>{pageUrl()}</span>
            </a>
            <button type="button" onClick={() => handleCopy(pageUrl(), 'local-hub')}>
              {copied === 'local-hub' ? '✓' : 'Copier'}
            </button>
          </li>
        </ul>
      </section>

      <footer className="pilot-footer">
        <p>Déployé sur GitHub Pages · {DEPLOY_BASE}</p>
      </footer>
    </div>
  );
}
