import { lazy, Suspense } from 'react';
import RouteLoader from '../components/RouteLoader';

const PremiumHub = lazy(() => import('@premium/components/hub/Hub'));

export default function PremiumHubPage() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <PremiumHub />
    </Suspense>
  );
}
