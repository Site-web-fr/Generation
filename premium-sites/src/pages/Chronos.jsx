import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Torus } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Watch ─────────────────────────────────────────────────────────────────

function WatchFace({ secondAngle, minuteAngle, hourAngle }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.4;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Main case */}
      <mesh>
        <cylinderGeometry args={[1.1, 1.1, 0.28, 64]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[1.08, 0.05, 16, 64]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0} />
      </mesh>
      {/* Sapphire crystal */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.02, 64]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.15} roughness={0} metalness={0.3} />
      </mesh>
      {/* Dial */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 0.01, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
      </mesh>
      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 0.8;
        const x = r * Math.sin(angle);
        const z = r * Math.cos(angle);
        return (
          <mesh key={i} position={[x, 0.14, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[i % 3 === 0 ? 0.07 : 0.035, 0.01, i % 3 === 0 ? 0.18 : 0.1]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#d4af37' : '#c0c0c0'} metalness={1} roughness={0} />
          </mesh>
        );
      })}
      {/* Hour hand */}
      <mesh position={[0.18 * Math.sin(hourAngle), 0.18, 0.18 * Math.cos(hourAngle)]} rotation={[0, hourAngle, 0]}>
        <boxGeometry args={[0.06, 0.01, 0.45]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.05} />
      </mesh>
      {/* Minute hand */}
      <mesh position={[0.28 * Math.sin(minuteAngle), 0.19, 0.28 * Math.cos(minuteAngle)]} rotation={[0, minuteAngle, 0]}>
        <boxGeometry args={[0.04, 0.01, 0.65]} />
        <meshStandardMaterial color="#e0e0e0" metalness={1} roughness={0.05} />
      </mesh>
      {/* Second hand */}
      <mesh position={[0.32 * Math.sin(secondAngle), 0.2, 0.32 * Math.cos(secondAngle)]} rotation={[0, secondAngle, 0]}>
        <boxGeometry args={[0.02, 0.01, 0.75]} />
        <meshStandardMaterial color="#e63946" metalness={0.8} roughness={0.2} emissive="#e63946" emissiveIntensity={0.3} />
      </mesh>
      {/* Center cap */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} />
      </mesh>
      {/* Crown */}
      <mesh position={[1.15, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.05} />
      </mesh>
      {/* Strap top */}
      <mesh position={[0, -0.1, 0.95]}>
        <boxGeometry args={[0.55, 0.2, 0.75]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Strap bottom */}
      <mesh position={[0, -0.1, -0.95]}>
        <boxGeometry args={[0.5, 0.2, 0.75]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function AnimatedWatch() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({ h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const s = (time.s / 60) * Math.PI * 2;
  const m = ((time.m + time.s / 60) / 60) * Math.PI * 2;
  const h = ((time.h % 12 + time.m / 60) / 12) * Math.PI * 2;

  return <WatchFace secondAngle={s} minuteAngle={m} hourAngle={h} />;
}

// ─── Watches Data ─────────────────────────────────────────────────────────────

const watches = [
  { id: 1, name: 'CHRONOS ONE', ref: 'CHR-001', material: 'Grade 5 Titanium', movement: 'In-house Calibre 1', power: '80h', water: '300m', limited: 50, price: '€48,000', color: '#c0c0c0' },
  { id: 2, name: 'NOIR ABSOLU', ref: 'NR-002', material: 'Black DLC Steel', movement: 'In-house Calibre 2', power: '72h', water: '100m', limited: 30, price: '€62,000', color: '#1a1a1a' },
  { id: 3, name: 'TOURBILLON GOLD', ref: 'TBL-003', material: '18k Rose Gold', movement: 'Hand-wound Tourbillon', power: '60h', water: '50m', limited: 12, price: '€185,000', color: '#d4af37' },
  { id: 4, name: 'GRAND COMPLICATION', ref: 'GC-004', material: 'Platinum 950', movement: 'Grand Complication', power: '100h', water: '50m', limited: 8, price: '€320,000', color: '#e8e8e8' },
];

const heritage = [
  { year: '1887', event: 'Foundation of the CHRONOS atelier in Geneva' },
  { year: '1923', event: 'First CHRONOS tourbillon — a breakthrough in horology' },
  { year: '1964', event: 'Awarded Poinçon de Genève — the pinnacle of watchmaking' },
  { year: '1998', event: 'Development of the proprietary Calibre 1 movement' },
  { year: '2024', event: 'Launch of the Tourbillon Gold — 139 years of mastery' },
];

export default function Chronos() {
  const [activeWatch, setActiveWatch] = useState(0);
  const [reserveForm, setReserveForm] = useState({ name: '', email: '', watch: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const watch = watches[activeWatch];

  return (
    <PageWrapper bgColor="#040404">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(4,4,4,0.97), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/30 uppercase font-light hover:text-gold-400 transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.6em] text-gradient-gold">CHRONOS</div>
        <div className="text-xs tracking-[0.2em] text-white/20 uppercase font-light hidden md:block">Geneva · Est. 1887</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
            <ambientLight intensity={0.02} />
            <pointLight position={[3, 5, 3]} color="#d4af37" intensity={5} />
            <pointLight position={[-3, 3, 2]} color="#c0c0c0" intensity={3} />
            <pointLight position={[0, 8, -2]} color="#ffffff" intensity={1} />
            <spotLight position={[0, 8, 4]} color="#d4af37" intensity={8} angle={0.3} penumbra={0.5} />
            <Suspense fallback={null}>
              <Float speed={0.8} floatIntensity={0.2}>
                <AnimatedWatch />
              </Float>
              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="section-subtitle mb-6">Swiss Haute Horlogerie · Geneva</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Time as<br />
              <span className="text-gradient-gold italic">Art</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.7}>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold-500 to-transparent mt-8 mb-4" />
          </FadeInUp>
          <FadeInUp delay={0.8}>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-lg">
              139 years of uncompromised watchmaking. Each CHRONOS is hand-assembled by a single master watchmaker over 400 hours.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="btn-gold" onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}>
                Discover Collection
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('reserve').scrollIntoView({ behavior: 'smooth' })}>
                Reserve a Piece
              </button>
            </div>
          </FadeInUp>
        </div>

        {/* Live time */}
        <div className="absolute bottom-10 right-8 md:right-16 text-right hidden md:block">
          <FadeInUp delay={1.5}>
            <div className="text-xs tracking-[0.3em] text-white/20 uppercase mb-1">Geneva Time</div>
            <LiveClock />
          </FadeInUp>
        </div>
      </section>

      {/* ── Collection ── */}
      <section id="collection" className="py-24 px-8 md:px-16 border-t border-white/5">
        <ScrollReveal>
          <p className="section-subtitle mb-4">Collection 2026</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            The<br /><span className="text-gradient-gold italic">Timepieces</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {watches.map((w, i) => (
            <ScrollReveal key={w.id} delay={i * 0.1}>
              <motion.div
                onClick={() => setActiveWatch(i)}
                className="p-6 border cursor-pointer transition-all duration-300"
                style={{
                  background: activeWatch === i ? 'rgba(212,175,55,0.04)' : 'rgba(255,255,255,0.02)',
                  borderColor: activeWatch === i ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.06)',
                }}
                whileHover={{ borderColor: 'rgba(212,175,55,0.25)' }}
              >
                {/* Color swatch */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 rounded-full border border-white/10" style={{ background: w.color }} />
                  <div className="text-xs font-mono text-white/20 tracking-widest">{w.ref}</div>
                </div>
                <div className="font-display text-2xl font-light text-white mb-4">{w.name}</div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { k: 'Material', v: w.material },
                    { k: 'Movement', v: w.movement },
                    { k: 'Power Reserve', v: w.power },
                    { k: 'Water Resist.', v: w.water },
                  ].map(({ k, v }) => (
                    <div key={k}>
                      <div className="text-xs text-white/30 uppercase tracking-wider">{k}</div>
                      <div className="text-white/70 text-sm mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <div>
                    <div className="text-xs text-white/30 uppercase tracking-wider">Limited Edition</div>
                    <div className="text-white/60 text-sm">{w.limited} pieces worldwide</div>
                  </div>
                  <div className="text-gradient-gold text-2xl font-display font-light">{w.price}</div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Heritage Timeline ── */}
      <section className="py-24 px-8 md:px-16" style={{ background: 'linear-gradient(to bottom, transparent, #0a0800)' }}>
        <ScrollReveal>
          <p className="section-subtitle mb-4">Heritage</p>
          <h2 className="font-display text-5xl font-light text-white mb-16">
            139 Years of<br /><span className="text-gradient-gold italic">Mastery</span>
          </h2>
        </ScrollReveal>
        <div className="max-w-2xl mx-auto">
          {heritage.map((h, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
                  {i < heritage.length - 1 && <div className="w-px flex-1 mt-2 bg-white/10" />}
                </div>
                <div className="pb-8">
                  <div className="text-gradient-gold font-mono text-lg">{h.year}</div>
                  <p className="text-white/60 mt-1 leading-relaxed">{h.event}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Reservation ── */}
      <section id="reserve" className="py-24 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="section-subtitle mb-4 text-center">Acquisition</p>
            <h2 className="font-display text-4xl font-light text-white text-center mb-12">
              Reserve a<br /><span className="text-gradient-gold italic">Timepiece</span>
            </h2>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" className="glass-gold p-8 md:p-10 space-y-5"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Name *</label>
                    <input className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500" required value={reserveForm.name} onChange={e => setReserveForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Email *</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500" required value={reserveForm.email} onChange={e => setReserveForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Timepiece of Interest</label>
                  <select className="w-full bg-[#040404] border border-white/10 text-white/80 px-4 py-3 focus:outline-none focus:border-gold-500" value={reserveForm.watch} onChange={e => setReserveForm(f => ({ ...f, watch: e.target.value }))}>
                    <option value="">Select a reference</option>
                    {watches.map(w => <option key={w.id} value={w.ref}>{w.name} ({w.ref}) — {w.price}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Message</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 resize-none" value={reserveForm.message} onChange={e => setReserveForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn-gold w-full">Request Private Viewing</button>
                <p className="text-xs text-center text-white/20">By appointment only · Geneva atelier or home delivery</p>
              </motion.form>
            ) : (
              <motion.div key="success" className="glass-gold p-12 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-gradient-gold text-5xl mb-4 font-display">◈</div>
                <h3 className="font-display text-3xl text-white mb-3">Request Received</h3>
                <p className="text-white/50">A CHRONOS ambassador will contact you within 24 hours to arrange your private viewing.</p>
                <button className="btn-gold mt-8" onClick={() => setSubmitted(false)}>New Request</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.6em] text-gradient-gold">CHRONOS</div>
          <div className="text-xs text-white/20 tracking-wider">Rue du Rhône 80, Geneva 1204 · +41 22 XXX XXXX</div>
          <div className="text-xs text-white/20">© 2026 Chronos Geneva.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <div className="text-3xl font-light text-gradient-gold font-mono">{time}</div>;
}
