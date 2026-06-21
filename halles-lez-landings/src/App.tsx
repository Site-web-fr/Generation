import { Suspense } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Hub from './components/Hub';
import LandingPage from './components/LandingPage';
import { PitchModeProvider } from './hooks/usePitchMode';
import { brands, getBrandBySlug } from './data/brands';
import { sites as premiumSites, getSiteBySlug as getPremiumSite } from '@premium/data/sites';
import { lazyWithRetry } from '@premium/utils/lazyWithRetry';
import RouteLoader from '@premium/components/shared/RouteLoader';

const PremiumHub = lazyWithRetry(() => import('@premium/components/hub/Hub'));
const PilotLinks = lazyWithRetry(() => import('@premium/components/hub/PilotLinks'));
const PremiumLanding = lazyWithRetry(() => import('@premium/components/shared/PremiumLanding'));

const isGitHubPages = import.meta.env.BASE_URL !== '/';
const Router = isGitHubPages ? HashRouter : BrowserRouter;

function BrandRoute({ slug }: { slug: string }) {
  const brand = getBrandBySlug(slug);
  if (!brand) return <Navigate to="/" replace />;
  return <LandingPage brand={brand} />;
}

function PremiumHubRoute() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <PremiumHub />
    </Suspense>
  );
}

function PremiumSiteRoute({ slug }: { slug: string }) {
  const site = getPremiumSite(slug);
  if (!site) return <Navigate to="/premium" replace />;
  return (
    <Suspense fallback={<RouteLoader />}>
      <PremiumLanding site={site} />
    </Suspense>
  );
}

export default function App() {
  return (
    <PitchModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/premium" element={<PremiumHubRoute />} />
          <Route
            path="/pilot"
            element={
              <Suspense fallback={<RouteLoader />}>
                <PilotLinks />
              </Suspense>
            }
          />
          {brands.map((b) => (
            <Route key={b.slug} path={`/${b.slug}`} element={<BrandRoute slug={b.slug} />} />
          ))}
          {premiumSites.map((s) => (
            <Route key={s.slug} path={`/${s.slug}`} element={<PremiumSiteRoute slug={s.slug} />} />
          ))}
          <Route path="/bambino-tonton" element={<Navigate to="/bambino" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PitchModeProvider>
  );
}
