import { getSiteBySlug } from '@premium/data/sites';
import PremiumLanding from '@premium/components/shared/PremiumLanding';
import { Navigate } from 'react-router-dom';

export default function PremiumSitePage({ slug }: { slug: string }) {
  const site = getSiteBySlug(slug);
  if (!site) return <Navigate to="/premium" replace />;
  return <PremiumLanding site={site} />;
}
