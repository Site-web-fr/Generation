import { getSiteBySlug } from '@premium/data/sites';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import RouteLoader from '../components/RouteLoader';

const PremiumLanding = lazy(() => import('@premium/components/shared/PremiumLanding'));

export default function PremiumSitePage({ slug }: { slug: string }) {
  const site = getSiteBySlug(slug);
  if (!site) return <Navigate to="/premium" replace />;
  return (
    <Suspense fallback={<RouteLoader />}>
      <PremiumLanding site={site} />
    </Suspense>
  );
}
