import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import { BRAND_MAP } from './theme/brands'

// Route-level code splitting keeps Three.js out of the initial bundle.
const Hub = lazy(() => import('./pages/Hub'))
const Aesthetic = lazy(() => import('./pages/Aesthetic'))
const RealEstate = lazy(() => import('./pages/RealEstate'))
const JetSki = lazy(() => import('./pages/JetSki'))
const YachtCare = lazy(() => import('./pages/YachtCare'))
const VehicleRental = lazy(() => import('./pages/VehicleRental'))

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink-faint)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        fontSize: '0.7rem',
      }}
    >
      Chargement de l’expérience…
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

/** Sets the document accent palette + title based on the active route. */
function RouteTheme() {
  const { pathname } = useLocation()
  useEffect(() => {
    const brand = Object.values(BRAND_MAP).find((b) => b.path === pathname)
    const root = document.documentElement
    if (brand) {
      root.style.setProperty('--accent', brand.accent)
      root.style.setProperty('--accent-2', brand.accent2)
      root.style.setProperty('--accent-glow', brand.glow)
      document.title = `${brand.name} — ${brand.category}`
    } else {
      root.style.setProperty('--accent', '#c8a26a')
      root.style.setProperty('--accent-2', '#e9d6b0')
      root.style.setProperty('--accent-glow', 'rgba(200, 162, 106, 0.45)')
      document.title = 'ATELIER — Suite de Landing Pages Premium'
    }
  }, [pathname])
  return null
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="noise">
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <ScrollProgress />
      <ScrollToTop />
      <RouteTheme />
      <Nav />
      <main aria-hidden={!loaded}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/clinique" element={<Aesthetic />} />
            <Route path="/prestige" element={<RealEstate />} />
            <Route path="/jetski" element={<JetSki />} />
            <Route path="/yacht" element={<YachtCare />} />
            <Route path="/automobile" element={<VehicleRental />} />
            <Route path="*" element={<Hub />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
