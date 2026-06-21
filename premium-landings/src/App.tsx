import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';

import AestheticSurgery from './sites/AestheticSurgery';
import RealEstate from './sites/RealEstate';
import JetSkiDubai from './sites/JetSkiDubai';
import YachtCleaning from './sites/YachtCleaning';
import VehicleRental from './sites/VehicleRental';
import PrivateAviation from './sites/PrivateAviation';
import LuxurySpa from './sites/LuxurySpa';
import InteriorDesign from './sites/InteriorDesign';
import FineDining from './sites/FineDining';
import ConciergeService from './sites/ConciergeService';

const SITES = [
  { slug: 'aesthetic', title: 'LUMIÈRE CLINIC', category: 'Chirurgie Esthétique', desc: '3D diamond • Traitement estimator • Consultation booking', color: '#c9a96e', bg: '#050508' },
  { slug: 'real-estate', title: 'PRESTIGE IMMOBILIER', category: 'Agence Immobilière Premium', desc: '3D building • Price filter • Virtual tours', color: '#c9a96e', bg: '#07080d' },
  { slug: 'jetski', title: 'AQUA RUSH DUBAI', category: 'Jet Ski Location · Dubai', desc: '3D water simulation • Route selector • Price calculator', color: '#f97316', bg: '#030b18' },
  { slug: 'yacht', title: 'NAUTIL PRESTIGE', category: 'Nettoyage Yachts & Superyachts', desc: '3D yacht model • Size selector • Service estimator', color: '#c9a96e', bg: '#04090f' },
  { slug: 'vehicles', title: 'APEX DRIVE', category: 'Location Véhicules de Luxe', desc: '3D car models • Fleet browser • Km/days calculator', color: '#e8d5a3', bg: '#0a0a0a' },
  { slug: 'aviation', title: 'SKY ÉLITE', category: 'Aviation Privée · Charter', desc: '3D aircraft • Route planner • Charter estimator', color: '#c9a96e', bg: '#04060e' },
  { slug: 'spa', title: 'ESSENCE RETREAT', category: 'Spa & Bien-être Prestige', desc: 'Interactive body map • Packages • Booking flow', color: '#a8d8c8', bg: '#0c0f0e' },
  { slug: 'interior', title: 'FORM & MATTER', category: 'Architecture d\'Intérieur', desc: '3D room configurator • Style selector • Budget estimator', color: '#c9a96e', bg: '#080808' },
  { slug: 'dining', title: 'LE CÉNACLE', category: 'Restaurant Gastronomique ★★★', desc: '3D restaurant scene • Floor plan • Menu + reservation', color: '#c9a96e', bg: '#05030a' },
  { slug: 'concierge', title: 'AURUM CONCIERGE', category: 'Conciergerie d\'Exception', desc: '3D globe • Service catalog • Private request form', color: '#c9a96e', bg: '#050508' },
];

function Hub() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f5f0e8', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '80px 60px 40px', textAlign: 'center', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>
            Propositions Commerciales Exclusives · 2026
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '20px' }}>
            10 Landing Pages<br /><span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Premium</span>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Sites ultra-premium avec animations 3D Three.js, interactions avancées, estimateurs de prix, et UX pensées pour convertir. Budget 10 000€/site.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
            {[['React + Three.js', '3D Animations'], ['Framer Motion', 'Transitions fluides'], ['Interactive Tools', 'Estimateurs live']].map(([title, sub]) => (
              <div key={title} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#c9a96e', letterSpacing: '0.08em' }}>{title}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div style={{ padding: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', maxWidth: '1300px', margin: '0 auto' }}>
        {SITES.map((site, i) => (
          <motion.div
            key={site.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          >
            <Link to={`/${site.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                className="hub-card"
                style={{
                  padding: '36px 32px',
                  background: site.bg,
                  border: '1px solid rgba(201,169,110,0.1)',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)' }}>
                    Site #{String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ width: 28, height: 28, border: `1px solid ${site.color}40`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: site.color }} />
                  </div>
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.08em', color: site.color, marginBottom: '6px' }}>
                  {site.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.55)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                  {site.category}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.35)', lineHeight: 1.5 }}>
                  {site.desc}
                </p>
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: site.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  <span>Voir le site</span>
                  <span style={{ fontSize: '0.8rem' }}>→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e' }}>Premium Landings 2026</span>
        <span>10 sites · React + Three.js + Framer Motion · Budget 10 000€/site</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/aesthetic" element={<AestheticSurgery />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/jetski" element={<JetSkiDubai />} />
          <Route path="/yacht" element={<YachtCleaning />} />
          <Route path="/vehicles" element={<VehicleRental />} />
          <Route path="/aviation" element={<PrivateAviation />} />
          <Route path="/spa" element={<LuxurySpa />} />
          <Route path="/interior" element={<InteriorDesign />} />
          <Route path="/dining" element={<FineDining />} />
          <Route path="/concierge" element={<ConciergeService />} />
        </Routes>
      </HashRouter>
    </>
  );
}
