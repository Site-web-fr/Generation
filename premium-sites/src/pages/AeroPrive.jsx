import { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Globe & Jet ───────────────────────────────────────────────────────────

function Globe() {
  const globeRef = useRef();
  const lineRef = useRef();

  useFrame(({ clock }) => {
    if (globeRef.current) globeRef.current.rotation.y = clock.elapsedTime * 0.1;
  });

  return (
    <group>
      {/* Globe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#0a1628"
          wireframe={false}
          metalness={0.8}
          roughness={0.4}
          emissive="#0d2040"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Grid lines */}
      {[0, 30, 60, 90, 120, 150].map((deg, i) => (
        <mesh key={i} rotation={[0, (deg * Math.PI) / 180, 0]}>
          <torusGeometry args={[2, 0.003, 8, 80]} />
          <meshStandardMaterial color="#c9a028" transparent opacity={0.15} />
        </mesh>
      ))}
      {[-60, -30, 0, 30, 60].map((deg, i) => (
        <mesh key={i} rotation={[(deg * Math.PI) / 180, 0, 0]}>
          <torusGeometry args={[2, 0.003, 8, 80]} />
          <meshStandardMaterial color="#c9a028" transparent opacity={0.1} />
        </mesh>
      ))}
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshStandardMaterial color="#1a4a8a" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function PrivateJet() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.x = Math.sin(t * 0.4) * 3;
    group.current.position.y = 2 + Math.cos(t * 0.3) * 0.5;
    group.current.position.z = Math.cos(t * 0.4) * 3;
    group.current.rotation.y = Math.atan2(Math.cos(t * 0.4), -Math.sin(t * 0.4));
    group.current.rotation.z = Math.sin(t * 0.3) * 0.05;
  });

  return (
    <group ref={group} scale={[0.45, 0.45, 0.45]}>
      {/* Fuselage */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 2.2, 12]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.18, 0.5, 12]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Main wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.0, 0.04, 0.5]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Tail wings */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[0.9, 0.03, 0.25]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.85, -0.2]} rotation={[Math.PI / 2.5, 0, 0]}>
        <boxGeometry args={[0.04, 0.35, 0.03]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Engines */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0.25]}>
          <cylinderGeometry args={[0.08, 0.06, 0.4, 10]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}
      {/* Gold accent stripe */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.185, 0.185, 0.04, 12]} />
        <meshStandardMaterial color="#c9a028" metalness={1} roughness={0} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.185, 0.185, 0.04, 12]} />
        <meshStandardMaterial color="#c9a028" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

// ─── Routes & Fleets ──────────────────────────────────────────────────────────

const airports = [
  { code: 'LFPB', city: 'Paris Le Bourget', country: 'France' },
  { code: 'EGKB', city: 'London Biggin Hill', country: 'United Kingdom' },
  { code: 'LSGG', city: 'Geneva', country: 'Switzerland' },
  { code: 'LMML', city: 'Malta', country: 'Malta' },
  { code: 'OMDB', city: 'Dubai', country: 'UAE' },
  { code: 'VHHH', city: 'Hong Kong', country: 'China' },
  { code: 'KJFK', city: 'New York Teterboro', country: 'USA' },
  { code: 'KLAX', city: 'Los Angeles', country: 'USA' },
  { code: 'WSSS', city: 'Singapore', country: 'Singapore' },
  { code: 'LEMD', city: 'Madrid Torrejón', country: 'Spain' },
];

const fleets = [
  { name: 'Citation XLS+', category: 'Light Jet', range: '3,600 km', pax: 9, speed: '858 km/h', price: 3500, img: '✈' },
  { name: 'Challenger 350', category: 'Super Mid', range: '5,900 km', pax: 10, speed: '870 km/h', price: 6500, img: '✈' },
  { name: 'Gulfstream G650ER', category: 'Ultra Long Range', range: '13,890 km', pax: 19, speed: '956 km/h', price: 14000, img: '✈' },
  { name: 'Global 7500', category: 'Global Range', range: '14,260 km', pax: 19, speed: '956 km/h', price: 16000, img: '✈' },
];

export default function AeroPrive() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [pax, setPax] = useState(4);
  const [selectedFleet, setSelectedFleet] = useState(0);
  const [travelDate, setTravelDate] = useState('');

  const estimatedHours = 3;
  const fleet = fleets[selectedFleet];
  const estimate = fleet.price * estimatedHours;

  return (
    <PageWrapper bgColor="#040810">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(4,8,16,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-gold-400 transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.4em] text-gradient-gold">AERO PRIVÉ</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Private Aviation</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 1.5, 8], fov: 55 }}>
            <ambientLight intensity={0.05} />
            <pointLight position={[0, 8, 4]} color="#c9a028" intensity={3} />
            <pointLight position={[-5, 3, 3]} color="#1a4a8a" intensity={2} />
            <pointLight position={[5, 5, 3]} color="#ffffff" intensity={1} />
            <Stars radius={150} depth={80} count={5000} factor={5} fade speed={0.2} />
            <Suspense fallback={null}>
              <Globe />
              <PrivateJet />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="section-subtitle mb-6">Private Aviation · Worldwide</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              The World<br />
              Is <span className="text-gradient-gold italic">Yours</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-white/40 text-lg font-light leading-relaxed max-w-lg">
              On-demand private jet charter to any destination on earth. Wheels up in 4 hours. 320+ aircraft. Zero compromise.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="btn-gold" onClick={() => document.getElementById('charter').scrollIntoView({ behavior: 'smooth' })}>
                Request a Flight
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}>
                Our Fleet
              </button>
            </div>
          </FadeInUp>
        </div>

        {/* Live stats */}
        <div className="absolute bottom-10 right-8 md:right-16 hidden md:block text-right">
          <FadeInUp delay={1.5}>
            {[{ v: '4h', l: 'Ready time from booking' }, { v: '320+', l: 'Aircraft available' }, { v: '190+', l: 'Countries served' }].map((s, i) => (
              <div key={i} className="mb-4">
                <div className="text-2xl font-light text-gradient-gold">{s.v}</div>
                <div className="text-xs text-white/30 tracking-wider">{s.l}</div>
              </div>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── Fleet ── */}
      <section id="fleet" className="py-24 px-8 md:px-16">
        <ScrollReveal>
          <p className="section-subtitle mb-4">Aircraft</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            Our<br /><span className="text-gradient-gold italic">Fleet</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fleets.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                onClick={() => setSelectedFleet(i)}
                className="p-6 border cursor-pointer transition-all duration-300"
                style={{
                  background: selectedFleet === i ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.02)',
                  borderColor: selectedFleet === i ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.06)',
                }}
                whileHover={{ borderColor: 'rgba(212,175,55,0.25)' }}
              >
                <div className="text-4xl mb-4 text-gradient-gold">{f.img}</div>
                <div className="text-xs text-white/30 tracking-widest uppercase mb-1">{f.category}</div>
                <div className="font-display text-xl font-light text-white mb-4">{f.name}</div>
                <div className="space-y-2 text-sm text-white/50">
                  <div className="flex justify-between"><span>Range</span><span className="text-white/80">{f.range}</span></div>
                  <div className="flex justify-between"><span>Passengers</span><span className="text-white/80">Up to {f.pax}</span></div>
                  <div className="flex justify-between"><span>Speed</span><span className="text-white/80">{f.speed}</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-gradient-gold text-xl font-light">€{f.price.toLocaleString()}<span className="text-white/30 text-sm">/hour</span></div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Charter Request ── */}
      <section id="charter" className="py-24 px-8 md:px-16 border-t border-white/5">
        <ScrollReveal>
          <p className="section-subtitle mb-4">Instant Quote</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            Plan Your<br /><span className="text-gradient-gold italic">Journey</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto glass-gold p-8 md:p-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Departure</label>
              <select className="w-full px-4 py-3 border border-white/10 text-white focus:outline-none focus:border-gold-500"
                style={{ background: 'rgba(255,255,255,0.03)' }} value={from} onChange={e => setFrom(e.target.value)}>
                <option value="">Select airport</option>
                {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Destination</label>
              <select className="w-full px-4 py-3 border border-white/10 text-white focus:outline-none focus:border-gold-500"
                style={{ background: 'rgba(255,255,255,0.03)' }} value={to} onChange={e => setTo(e.target.value)}>
                <option value="">Select airport</option>
                {airports.map(a => <option key={a.code} value={a.code}>{a.city} ({a.code})</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Departure Date</label>
              <input type="date" className="w-full px-4 py-3 border border-white/10 text-white focus:outline-none focus:border-gold-500"
                style={{ background: 'rgba(255,255,255,0.03)' }} value={travelDate} onChange={e => setTravelDate(e.target.value)} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs tracking-[0.3em] text-white/40 uppercase">Passengers</label>
                <span className="text-white font-light">{pax}</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-10 h-10 border border-white/20 text-white hover:border-gold-500">−</button>
                <div className="flex-1 flex gap-1">
                  {Array.from({ length: Math.min(pax, 10) }).map((_, i) => (
                    <div key={i} className="flex-1 h-2 rounded-full bg-gold-500/60" />
                  ))}
                  {Array.from({ length: Math.max(0, 10 - pax) }).map((_, i) => (
                    <div key={i} className="flex-1 h-2 rounded-full bg-white/10" />
                  ))}
                </div>
                <button onClick={() => setPax(Math.min(fleet.pax, pax + 1))} className="w-10 h-10 border border-white/20 text-white hover:border-gold-500">+</button>
              </div>
            </div>
          </div>

          <div className="glass p-6 space-y-3">
            <div className="text-xs tracking-widest text-white/30 uppercase mb-4">Selected Aircraft</div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-display text-xl text-white font-light">{fleet.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{fleet.category} · Up to {fleet.pax} passengers</div>
              </div>
              <div className="text-gradient-gold text-xl font-light">€{fleet.price.toLocaleString()}/hr</div>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between">
              <span className="text-white/40 text-sm">Estimated flight time (3h)</span>
              <span className="text-gradient-gold text-xl font-light">€{estimate.toLocaleString()}</span>
            </div>
          </div>

          <button className="btn-gold w-full text-center">Request Instant Quote</button>
          <p className="text-xs text-center text-white/20">Response guaranteed within 15 minutes · 24/7 availability</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em] text-gradient-gold">AERO PRIVÉ</div>
          <div className="text-xs text-white/20 tracking-wider">Paris · London · Geneva · Dubai · New York</div>
          <div className="text-xs text-white/20">© 2026 Aero Privé.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
