import { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Water & Jet Ski ───────────────────────────────────────────────────────

function WaterSurface() {
  const mesh = useRef();
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 80, 80);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.5 + t) * 0.15 + Math.sin(y * 0.3 + t * 0.8) * 0.1);
    }
    pos.needsUpdate = true;
    mesh.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} geometry={geometry}>
      <meshStandardMaterial
        color="#004e7c"
        metalness={0.5}
        roughness={0.2}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function JetSkiModel() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.y = -0.6 + Math.sin(t * 1.2) * 0.08;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    group.current.rotation.x = Math.sin(t * 1.0) * 0.03;
  });

  return (
    <group ref={group} position={[0, -0.6, 0]} rotation={[0, Math.PI / 6, 0]}>
      {/* Hull */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 1.8, 12]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Deck */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.45, 0.1, 1.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Handlebars */}
      <mesh position={[0, 0.5, 0.3]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.42, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.46, 0.12, 0.2]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.25, 0.4, 12]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function SprayParticles() {
  const ref = useRef();
  const count = 500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 1] = Math.random() * 0.5 - 1.5;
      arr[i * 3 + 2] = -0.8 + Math.random() * 0.4;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#7fdfff" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Packages Data ────────────────────────────────────────────────────────────

const packages = [
  { id: 'discovery', name: 'Discovery', duration: '30 min', price: 89, desc: 'Perfect introduction for first-timers. Guided route along Jumeirah Beach.', included: ['Safety briefing', 'Equipment', 'Guide escort', 'Photos'] },
  { id: 'explorer', name: 'Explorer', duration: '1 hour', price: 149, desc: 'Explore the Dubai Marina and Palm Jumeirah at your own pace.', included: ['Full safety kit', 'GPS tracker', 'Waterproof pouch', 'Professional photos', 'Video souvenir'] },
  { id: 'exclusive', name: 'Exclusive', duration: '2 hours', price: 249, desc: 'The complete Dubai experience — Burj Al Arab, Palm, and open sea.', included: ['Premium equipment', 'Private guide', 'Champagne on board', '4K video drone', 'Transfer included'] },
  { id: 'sunset', name: 'Sunset VIP', duration: '3 hours', price: 399, desc: 'Sunset experience finishing with dinner at a Michelin-starred partner restaurant.', included: ['Full VIP package', 'Private chef snack', 'Sunset photography', 'Restaurant reservation', 'Luxury transfer'] },
];

const routes = [
  { name: 'Marina Circuit', km: 8, highlights: 'Dubai Marina · JBR Beach', difficulty: 'Easy' },
  { name: 'Palm Explorer', km: 15, highlights: 'Palm Jumeirah · Atlantis Hotel', difficulty: 'Moderate' },
  { name: 'Burj Coastal', km: 22, highlights: 'Burj Al Arab · Wild Wadi · Jumeirah', difficulty: 'Moderate' },
  { name: 'Grand Dubai', km: 38, highlights: 'Full coastline · Offshore · Open Sea', difficulty: 'Advanced' },
];

export default function DubaiWave() {
  const [selectedPackage, setSelectedPackage] = useState('explorer');
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [riders, setRiders] = useState(1);
  const [bookDate, setBookDate] = useState('');
  const pkg = packages.find(p => p.id === selectedPackage);
  const total = pkg ? pkg.price * riders : 0;

  return (
    <PageWrapper bgColor="#000e1a">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(0,14,26,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-[#00d4ff] transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.4em]" style={{ color: '#00d4ff' }}>DUBAI WAVE</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Jet Ski Rentals</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 8, 5]} color="#00d4ff" intensity={4} />
            <pointLight position={[-5, 4, 3]} color="#ff6b35" intensity={2} />
            <pointLight position={[0, 10, -2]} color="#ffffff" intensity={1} />
            <Stars radius={100} depth={50} count={2000} factor={3} fade speed={0.5} />
            <Suspense fallback={null}>
              <WaterSurface />
              <JetSkiModel />
              <SprayParticles />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-6" style={{ color: '#00d4ff' }}>Dubai Jet Ski Experience</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Ride the<br />
              <span style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="italic">Dubai</span><br />
              Waves
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-white/40 text-lg font-light leading-relaxed max-w-lg">
              Conquer the Arabian Gulf aboard premium jet skis. Iconic routes past the Burj Al Arab, Palm Jumeirah, and beyond.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#000', fontWeight: 600 }}
                className="px-8 py-4 tracking-widest uppercase text-sm"
                onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </button>
              <button className="btn-outline border-[#00d4ff]/30 text-[#00d4ff]/80" onClick={() => document.getElementById('routes').scrollIntoView({ behavior: 'smooth' })}>
                Explore Routes
              </button>
            </div>
          </FadeInUp>
        </div>

        {/* Live stats */}
        <div className="absolute bottom-20 right-8 md:right-16 text-right hidden md:block">
          <FadeInUp delay={1.4}>
            <div className="text-xs tracking-widest text-white/30 uppercase mb-1">TODAY</div>
            <div className="text-2xl font-light" style={{ color: '#00d4ff' }}>32°C · Sunny</div>
            <div className="text-xs text-white/30 mt-1">Wind: 8 knots · Sea: Calm</div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Routes ── */}
      <section id="routes" className="py-24 px-8 md:px-16">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#00d4ff' }}>Itineraries</p>
          <h2 className="font-display text-5xl md:text-7xl font-light text-white mb-12">
            Iconic<br /><span className="italic" style={{ color: '#00d4ff' }}>Routes</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                onClick={() => setSelectedRoute(i)}
                className="p-6 cursor-pointer border transition-all duration-300"
                style={{
                  background: selectedRoute === i ? 'rgba(0,212,255,0.08)' : 'rgba(0,212,255,0.02)',
                  borderColor: selectedRoute === i ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.05)',
                }}
                whileHover={{ borderColor: 'rgba(0,212,255,0.25)' }}
              >
                <div className="text-xs text-white/30 tracking-widest uppercase mb-2">{r.difficulty}</div>
                <div className="font-display text-xl font-light text-white mb-1">{r.name}</div>
                <div className="text-sm text-white/40 mb-3">{r.highlights}</div>
                <div className="text-2xl font-light" style={{ color: '#00d4ff' }}>{r.km} km</div>
                {selectedRoute === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pt-3 border-t border-white/10">
                    <div className="text-xs text-white/40">Route selected for booking ✓</div>
                  </motion.div>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Booking Tool ── */}
      <section id="booking" className="py-24 px-8 md:px-16" style={{ background: 'rgba(0,212,255,0.03)' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#ff6b35' }}>Instant Booking</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            Reserve<br /><span className="italic" style={{ color: '#ff6b35' }}>Your Session</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Package selector */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Select Package</p>
            {packages.map(p => (
              <motion.div
                key={p.id}
                onClick={() => setSelectedPackage(p.id)}
                className="p-5 cursor-pointer border transition-all duration-300"
                style={{
                  background: selectedPackage === p.id ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.02)',
                  borderColor: selectedPackage === p.id ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.06)',
                }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-display text-lg text-white font-light">{p.name}</div>
                    <div className="text-xs text-white/40 mt-1">{p.duration}</div>
                  </div>
                  <div className="text-2xl font-light" style={{ color: '#00d4ff' }}>€{p.price}</div>
                </div>
                <AnimatePresence>
                  {selectedPackage === p.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-white/40 text-sm mt-3">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.included.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1" style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}>✓ {item}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Calculator */}
          <div className="glass p-8 border border-white/5 space-y-6">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Booking Details</p>
            <div>
              <label className="text-xs text-white/40 tracking-wider uppercase block mb-2">Number of Riders</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setRiders(Math.max(1, riders - 1))} className="w-10 h-10 border border-white/20 text-white hover:border-[#00d4ff] transition-colors">−</button>
                <span className="text-3xl font-light text-white w-12 text-center">{riders}</span>
                <button onClick={() => setRiders(Math.min(6, riders + 1))} className="w-10 h-10 border border-white/20 text-white hover:border-[#00d4ff] transition-colors">+</button>
                <span className="text-white/40 text-sm">jet skis</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 tracking-wider uppercase block mb-2">Date *</label>
              <input type="date" className="w-full px-4 py-3 border border-white/10 text-white focus:outline-none focus:border-[#00d4ff]" style={{ background: 'rgba(255,255,255,0.03)' }} value={bookDate} onChange={e => setBookDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-white/40 tracking-wider uppercase block mb-2">Selected Route</label>
              <div className="px-4 py-3 border border-white/10 text-white/60 text-sm">{routes[selectedRoute].name} · {routes[selectedRoute].km} km</div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-white/40">Package ({pkg?.name})</span>
                <span className="text-white">€{pkg?.price} × {riders}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-light mt-3">
                <span className="text-white/60">Total</span>
                <span style={{ color: '#00d4ff' }} className="text-3xl">€{total}</span>
              </div>
            </div>
            <button
              style={{ background: 'linear-gradient(135deg, #00d4ff, #0099cc)', color: '#000', fontWeight: 700 }}
              className="w-full py-4 tracking-widest uppercase text-sm"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16" style={{ background: '#00080f' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#00d4ff' }}>DUBAI WAVE</div>
          <div className="text-xs text-white/20 tracking-wider">Dubai Marina · UAE · +971 4 XXX XXXX</div>
          <div className="text-xs text-white/20">© 2026 Dubai Wave. All rights reserved.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
