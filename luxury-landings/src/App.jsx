import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'

const Home = lazy(() => import('./pages/Home'))
const AestheticSurgery = lazy(() => import('./pages/AestheticSurgery'))
const RealEstate = lazy(() => import('./pages/RealEstate'))
const JetSkiDubai = lazy(() => import('./pages/JetSkiDubai'))
const YachtCleaning = lazy(() => import('./pages/YachtCleaning'))
const VehicleRental = lazy(() => import('./pages/VehicleRental'))
const PrivateJet = lazy(() => import('./pages/PrivateJet'))
const LuxuryConcierge = lazy(() => import('./pages/LuxuryConcierge'))
const InteriorDesign = lazy(() => import('./pages/InteriorDesign'))
const WineSpirits = lazy(() => import('./pages/WineSpirits'))
const EventPlanning = lazy(() => import('./pages/EventPlanning'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/30 text-xs font-dm tracking-widest uppercase">Loading Experience</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aesthetic-surgery" element={<AestheticSurgery />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/jetski-dubai" element={<JetSkiDubai />} />
          <Route path="/yacht-cleaning" element={<YachtCleaning />} />
          <Route path="/vehicle-rental" element={<VehicleRental />} />
          <Route path="/private-jet" element={<PrivateJet />} />
          <Route path="/luxury-concierge" element={<LuxuryConcierge />} />
          <Route path="/interior-design" element={<InteriorDesign />} />
          <Route path="/wine-spirits" element={<WineSpirits />} />
          <Route path="/event-planning" element={<EventPlanning />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
