import { BrowserRouter, HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Hub from './components/Hub';
import LandingPage from './components/LandingPage';
import PremiumHub from './components/PremiumHub';
import PremiumLandingPage from './components/PremiumLandingPage';
import { PitchModeProvider } from './hooks/usePitchMode';
import { brands, getBrandBySlug } from './data/brands';
import { getPremiumLandingBySlug } from './data/premium-landings';

const isGitHubPages = import.meta.env.BASE_URL !== '/';
const Router = isGitHubPages ? HashRouter : BrowserRouter;

function BrandRoute({ slug }: { slug: string }) {
  const brand = getBrandBySlug(slug);
  if (!brand) return <Navigate to="/" replace />;
  return <LandingPage brand={brand} />;
}

function PremiumRoute() {
  const { slug = '' } = useParams();
  const landing = getPremiumLandingBySlug(slug);
  if (!landing) return <Navigate to="/premium" replace />;
  return <PremiumLandingPage landing={landing} />;
}

export default function App() {
  return (
    <PitchModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/premium" element={<PremiumHub />} />
          <Route path="/premium/:slug" element={<PremiumRoute />} />
          {brands.map((b) => (
            <Route key={b.slug} path={`/${b.slug}`} element={<BrandRoute slug={b.slug} />} />
          ))}
          <Route path="/bambino-tonton" element={<Navigate to="/bambino" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PitchModeProvider>
  );
}
