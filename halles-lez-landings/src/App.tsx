import { Component, lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Hub from './components/Hub';
import LandingPage from './components/LandingPage';
import RouteLoader from './components/RouteLoader';
import { PitchModeProvider } from './hooks/usePitchMode';
import { brands, getBrandBySlug } from './data/brands';
import { PREMIUM_SLUGS } from './premium-slugs';

const PremiumHubPage = lazy(() => import('./pages/PremiumHubPage'));
const PremiumSitePage = lazy(() => import('./pages/PremiumSitePage'));
const PilotLinks = lazy(() => import('@premium/components/hub/PilotLinks'));

const isGitHubPages = import.meta.env.BASE_URL !== '/';
const Router = isGitHubPages ? HashRouter : BrowserRouter;

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null };

  static getDerivedStateFromError(err: Error) {
    return { error: err.message || 'Erreur de chargement' };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', background: '#050508', color: '#f5f0eb',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1rem',
        }}>
          <h1 style={{ fontSize: '1.25rem' }}>Chargement interrompu</h1>
          <p style={{ color: '#9a9088', maxWidth: 320 }}>{this.state.error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              background: '#d4af7a', color: '#050508', border: 'none',
              padding: '0.85rem 1.5rem', borderRadius: 100, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Réessayer
          </button>
          <a href={`${import.meta.env.BASE_URL}pilot.html`} style={{ color: '#d4af7a' }}>
            Retour au pilot
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

function BrandRoute({ slug }: { slug: string }) {
  const brand = getBrandBySlug(slug);
  if (!brand) return <Navigate to="/" replace />;
  return <LandingPage brand={brand} />;
}

export default function App() {
  return (
    <AppErrorBoundary>
      <PitchModeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route
              path="/premium"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <PremiumHubPage />
                </Suspense>
              }
            />
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
            {PREMIUM_SLUGS.map((slug) => (
              <Route
                key={slug}
                path={`/${slug}`}
                element={
                  <Suspense fallback={<RouteLoader />}>
                    <PremiumSitePage slug={slug} />
                  </Suspense>
                }
              />
            ))}
            <Route path="/bambino-tonton" element={<Navigate to="/bambino" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PitchModeProvider>
    </AppErrorBoundary>
  );
}
