import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Hub from './components/hub/Hub';
import PremiumLanding from './components/shared/PremiumLanding';
import { sites, getSiteBySlug } from './data/sites';

const isGitHubPages = import.meta.env.BASE_URL !== '/';
const Router = isGitHubPages ? HashRouter : BrowserRouter;

function SiteRoute({ slug }: { slug: string }) {
  const site = getSiteBySlug(slug);
  if (!site) return <Navigate to="/" replace />;
  return <PremiumLanding site={site} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        {sites.map((s) => (
          <Route key={s.slug} path={`/${s.slug}`} element={<SiteRoute slug={s.slug} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
