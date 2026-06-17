import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Hub from './components/Hub';
import LandingPage from './components/LandingPage';
import { brands, getBrandBySlug } from './data/brands';

const rawBase = import.meta.env.BASE_URL;
const basename = rawBase === '/' ? undefined : rawBase.replace(/\/$/, '');

function BrandRoute({ slug }: { slug: string }) {
  const brand = getBrandBySlug(slug);
  if (!brand) return <Navigate to="/" replace />;
  return <LandingPage brand={brand} />;
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Hub />} />
        {brands.map((b) => (
          <Route key={b.slug} path={`/${b.slug}`} element={<BrandRoute slug={b.slug} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
