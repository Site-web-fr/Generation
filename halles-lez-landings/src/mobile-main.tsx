import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { sites, getSiteBySlug } from '@premium/data/sites';
import { lazyWithRetry } from '@premium/utils/lazyWithRetry';
import RouteLoader from '@premium/components/shared/RouteLoader';
import './mobile.css';

const PremiumHubMobile = lazyWithRetry(() => import('@premium/components/hub/HubMobile'));
const PremiumLandingMobile = lazyWithRetry(() => import('@premium/components/shared/PremiumLandingMobile'));

function PremiumSiteRoute({ slug }: { slug: string }) {
  const site = getSiteBySlug(slug);
  if (!site) return <Navigate to="/premium" replace />;
  return (
    <Suspense fallback={<RouteLoader />}>
      <PremiumLandingMobile site={site} />
    </Suspense>
  );
}

function MobileApp() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/premium" replace />} />
        <Route
          path="/premium"
          element={
            <Suspense fallback={<RouteLoader />}>
              <PremiumHubMobile />
            </Suspense>
          }
        />
        {sites.map((site) => (
          <Route key={site.slug} path={`/${site.slug}`} element={<PremiumSiteRoute slug={site.slug} />} />
        ))}
        <Route path="*" element={<Navigate to="/premium" replace />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MobileApp />
  </StrictMode>,
);
