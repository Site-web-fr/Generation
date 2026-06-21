import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Cylinder, Torus } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Car Model ─────────────────────────────────────────────────────────────

function CarModel({ color = '#e63946' }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.3;
  });

  const mat = { metalness: 0.9, roughness: 0.1, color };
  const glassM = { metalness: 0.5, roughness: 0.05, color: '#87ceeb', transparent: true, opacity: 0.7 };
  const darkM = { metalness: 0.9, roughness: 0.2, color: '#0a0a0a' };
  const rimM = { metalness: 1, roughness: 0, color: '#c0c0c0' };
  const tireM = { metalness: 0.1, roughness: 0.9, color: '#111111' };

  return (
    <group ref={group} scale={[1.5, 1.5, 1.5]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.35, 0.85]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Roof */}
      <mesh position={[0.05, 0.3, 0]}>
        <boxGeometry args={[0.9, 0.28, 0.75]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Hood slope */}
      <mesh position={[0.68, 0.15, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.45, 0.05, 0.8]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Trunk */}
      <mesh position={[-0.63, 0.18, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.3, 0.05, 0.78]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0.44, 0.27, 0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.35, 0.03, 0.68]} />
        <meshStandardMaterial {...glassM} />
      </mesh>
      {/* Rear window */}
      <mesh position={[-0.35, 0.27, 0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.3, 0.03, 0.65]} />
        <meshStandardMaterial {...glassM} />
      </mesh>
      {/* Side windows */}
      {[-0.1, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0.385]}>
          <boxGeometry args={[0.35, 0.18, 0.01]} />
          <meshStandardMaterial {...glassM} />
        </mesh>
      ))}
      {/* Headlights */}
      {[-0.1, 0.1].map((z, i) => (
        <mesh key={i} position={[0.91, 0.05, z * 3]}>
          <boxGeometry args={[0.04, 0.08, 0.18]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Taillights */}
      {[-0.1, 0.1].map((z, i) => (
        <mesh key={i} position={[-0.91, 0.05, z * 3]}>
          <boxGeometry args={[0.04, 0.08, 0.14]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {/* Grille */}
      <mesh position={[0.9, -0.04, 0]}>
        <boxGeometry args={[0.04, 0.2, 0.6]} />
        <meshStandardMaterial {...darkM} />
      </mesh>
      {/* Spoiler */}
      <mesh position={[-0.9, 0.18, 0]}>
        <boxGeometry args={[0.04, 0.08, 0.9]} />
        <meshStandardMaterial {...darkM} />
      </mesh>
      {/* Wheels */}
      {[[0.55, -0.18, 0.45], [0.55, -0.18, -0.45], [-0.55, -0.18, 0.45], [-0.55, -0.18, -0.45]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 20]} />
            <meshStandardMaterial {...tireM} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.025, 8, 30]} />
            <meshStandardMaterial {...rimM} />
          </mesh>
          {[0, 72, 144, 216, 288].map((deg, j) => (
            <mesh key={j} rotation={[Math.PI / 2, (deg * Math.PI) / 180, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.27, 6]} />
              <meshStandardMaterial {...rimM} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Spotlight3D({ position, color }) {
  return (
    <spotLight
      position={position}
      color={color}
      intensity={5}
      angle={0.4}
      penumbra={0.5}
      castShadow
    />
  );
}

// ─── Cars Data ────────────────────────────────────────────────────────────────

const cars = [
  {
    id: 'lambo', name: 'Lamborghini Huracán', category: 'Super Sport',
    color: '#e8c84a', pricePerDay: 1200, pricePerKm: 2.5,
    specs: { hp: '640 HP', speed: '325 km/h', engine: 'V10 5.2L', drive: 'AWD' },
    features: ['Carbon ceramic brakes', 'Sport exhaust', 'Lifting system', 'Launch control'],
    available: true,
  },
  {
    id: 'ferrari', name: 'Ferrari F8 Tributo', category: 'Grand Tourer',
    color: '#cc0000', pricePerDay: 1400, pricePerKm: 3.0,
    specs: { hp: '720 HP', speed: '340 km/h', engine: 'V8 3.9L Turbo', drive: 'RWD' },
    features: ['Race mode', 'Side slip control', 'Ferrari DNA plaque', 'Matte finish'],
    available: true,
  },
  {
    id: 'bentley', name: 'Bentley Continental GT', category: 'Ultra Luxury',
    color: '#2d5a8e', pricePerDay: 900, pricePerKm: 1.8,
    specs: { hp: '626 HP', speed: '318 km/h', engine: 'W12 6.0L', drive: 'AWD' },
    features: ['Diamond quilt leather', 'Naim audio', 'Rotating display', 'Rear massage'],
    available: true,
  },
  {
    id: 'mclaren', name: 'McLaren 720S', category: 'Track Focused',
    color: '#f97316', pricePerDay: 1300, pricePerKm: 2.8,
    specs: { hp: '720 HP', speed: '341 km/h', engine: 'V8 4.0L Turbo', drive: 'RWD' },
    features: ['Active aerodynamics', 'Carbon MonoCell', 'Track telemetry', 'Proactive chassis'],
    available: false,
  },
  {
    id: 'rolls', name: 'Rolls-Royce Phantom', category: 'Ultimate Luxury',
    color: '#1a1a1a', pricePerDay: 1800, pricePerKm: 3.5,
    specs: { hp: '563 HP', speed: '250 km/h', engine: 'V12 6.75L', drive: 'RWD' },
    features: ['Starlight headliner', 'Bespoke audio', 'Champagne fridge', 'Umbrellas included'],
    available: true,
  },
];

export default function PrestigeDrive() {
  const [selectedCar, setSelectedCar] = useState(0);
  const [days, setDays] = useState(3);
  const [km, setKm] = useState(200);
  const [withDriver, setWithDriver] = useState(false);
  const [startDate, setStartDate] = useState('');
  const car = cars[selectedCar];

  const baseCost = car.pricePerDay * days + car.pricePerKm * km;
  const driverCost = withDriver ? days * 350 : 0;
  const insurance = baseCost * 0.12;
  const total = baseCost + driverCost + insurance;

  return (
    <PageWrapper bgColor="#050505">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-red-500 transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.4em]" style={{ color: '#e63946' }}>PRESTIGE DRIVE</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Premium Rentals</div>
      </nav>

      {/* ── Hero with 3D Car ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} shadows>
            <ambientLight intensity={0.03} />
            <Spotlight3D position={[4, 8, 4]} color="#ff2200" />
            <Spotlight3D position={[-4, 6, 4]} color="#d4af37" />
            <pointLight position={[0, 10, -4]} color="#ffffff" intensity={2} />
            <Stars radius={80} depth={40} count={3000} factor={4} fade />
            <Suspense fallback={null}>
              <Float speed={0.5} floatIntensity={0.2}>
                <CarModel color={car.color} />
              </Float>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.3} />
              </mesh>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.98, 0]}>
                <planeGeometry args={[3, 1]} />
                <meshStandardMaterial color={car.color} transparent opacity={0.06} metalness={1} roughness={0} />
              </mesh>
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-3xl">
          <FadeInUp delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-6" style={{ color: '#e63946' }}>World's Finest Fleet</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light text-white leading-none"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Drive the<br />
              <span style={{ background: 'linear-gradient(135deg, #e63946, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="italic">Extraordinary</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-white/40 text-lg font-light leading-relaxed max-w-md">
              Experience the pinnacle of automotive engineering. Our curated fleet of hypercars and ultra-luxury vehicles, delivered to your door.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <button
              style={{ background: 'linear-gradient(135deg, #e63946, #ff4d5a)', color: '#fff', fontWeight: 700 }}
              className="mt-10 px-10 py-4 tracking-widest uppercase text-sm"
              onClick={() => document.getElementById('configurator').scrollIntoView({ behavior: 'smooth' })}
            >
              Configure Your Rental
            </button>
          </FadeInUp>
        </div>
      </section>

      {/* ── Car Carousel ── */}
      <section className="py-16 px-8 md:px-16 border-t border-white/5">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#e63946' }}>The Fleet</p>
          <h2 className="font-display text-5xl font-light text-white mb-10">
            Select Your<br /><span className="italic" style={{ color: '#e63946' }}>Machine</span>
          </h2>
        </ScrollReveal>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          {cars.map((c, i) => (
            <motion.div
              key={c.id}
              onClick={() => setSelectedCar(i)}
              className="flex-shrink-0 snap-center p-5 border cursor-pointer transition-all duration-300"
              style={{
                width: '220px',
                background: selectedCar === i ? `rgba(${parseInt(c.color.slice(1, 3), 16)}, ${parseInt(c.color.slice(3, 5), 16)}, ${parseInt(c.color.slice(5, 7), 16)}, 0.08)` : 'rgba(255,255,255,0.02)',
                borderColor: selectedCar === i ? c.color + '60' : 'rgba(255,255,255,0.06)',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-full h-2 rounded mb-3" style={{ background: c.color, opacity: 0.7 }} />
              <div className="text-xs text-white/30 tracking-widest uppercase">{c.category}</div>
              <div className="font-display text-base font-light text-white mt-1">{c.name}</div>
              <div className="text-2xl font-light mt-3" style={{ color: c.color }}>€{c.pricePerDay}<span className="text-sm text-white/30">/day</span></div>
              {!c.available && <div className="text-xs text-red-400 mt-2">Unavailable</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Rental Configurator ── */}
      <section id="configurator" className="py-16 px-8 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Details */}
          <ScrollRevealX direction="left">
            <div className="glass p-8 border border-white/5">
              <div className="w-full h-1 mb-6" style={{ background: `linear-gradient(90deg, ${car.color}, transparent)` }} />
              <div className="text-xs text-white/30 tracking-widest uppercase mb-1">{car.category}</div>
              <div className="font-display text-3xl font-light text-white mb-4">{car.name}</div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(car.specs).map(([k, v]) => (
                  <div key={k} className="p-3 border border-white/5 bg-white/2">
                    <div className="text-xs text-white/30 uppercase tracking-wider">{k}</div>
                    <div className="text-white font-light mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs text-white/30 tracking-widest uppercase mb-3">Features</div>
                <div className="space-y-2">
                  {car.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span style={{ color: car.color }}>✓</span>
                      <span className="text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollRevealX>

          {/* Calculator */}
          <ScrollReveal>
            <div className="glass p-8 border border-white/5 space-y-6">
              <div className="text-xs tracking-[0.3em] text-white/40 uppercase">Rental Calculator</div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Rental Duration</label>
                  <span className="text-white font-light">{days} day{days > 1 ? 's' : ''}</span>
                </div>
                <input type="range" min={1} max={30} value={days} onChange={e => setDays(Number(e.target.value))}
                  className="w-full accent-red-500 h-1 cursor-pointer" />
                <div className="flex justify-between text-xs text-white/20 mt-1"><span>1 day</span><span>30 days</span></div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Kilometres Included</label>
                  <span className="text-white font-light">{km} km</span>
                </div>
                <input type="range" min={50} max={2000} step={50} value={km} onChange={e => setKm(Number(e.target.value))}
                  className="w-full accent-red-500 h-1 cursor-pointer" />
                <div className="flex justify-between text-xs text-white/20 mt-1"><span>50 km</span><span>2,000 km</span></div>
              </div>

              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Pick-up Date</label>
                <input type="date" className="w-full px-4 py-3 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  style={{ background: 'rgba(255,255,255,0.02)' }} value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWithDriver(!withDriver)}
                  className="w-5 h-5 border flex items-center justify-center transition-all duration-200"
                  style={{ borderColor: withDriver ? '#e63946' : 'rgba(255,255,255,0.2)', background: withDriver ? '#e63946' : 'transparent' }}
                >
                  {withDriver && <span className="text-white text-xs">✓</span>}
                </button>
                <span className="text-white/60 text-sm">Add professional chauffeur (+€350/day)</span>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Vehicle ({days}d + {km}km)</span>
                  <span className="text-white">€{baseCost.toLocaleString()}</span>
                </div>
                {withDriver && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Chauffeur</span>
                    <span className="text-white">€{driverCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Premium Insurance</span>
                  <span className="text-white">€{insurance.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-xl font-light pt-2 border-t border-white/10 mt-2">
                  <span className="text-white/60">Total</span>
                  <motion.span key={total} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ color: '#e63946' }} className="text-3xl">
                    €{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </motion.span>
                </div>
              </div>

              <button
                style={{ background: 'linear-gradient(135deg, #e63946, #ff4d5a)', color: '#fff', fontWeight: 700 }}
                className="w-full py-4 tracking-widest uppercase text-sm"
                disabled={!car.available}
              >
                {car.available ? 'Reserve Now' : 'Currently Unavailable'}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#e63946' }}>PRESTIGE DRIVE</div>
          <div className="text-xs text-white/20 tracking-wider">Paris · Monaco · Cannes · Nice · Lyon</div>
          <div className="text-xs text-white/20">© 2026 Prestige Drive.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
