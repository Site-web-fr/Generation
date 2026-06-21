import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Villa Scene ───────────────────────────────────────────────────────────

function VillaScene() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.2;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={[0.8, 0.8, 0.8]}>
      {/* Main building */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3, 1.5, 2]} />
        <meshStandardMaterial color="#f5f0e8" metalness={0.1} roughness={0.7} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.45, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.15, 2.2]} />
        <meshStandardMaterial color="#c8a882" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Second floor */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[2.6, 1.0, 1.8]} />
        <meshStandardMaterial color="#ede8dc" metalness={0.1} roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <boxGeometry args={[2.8, 0.12, 2.0]} />
        <meshStandardMaterial color="#c8a882" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Columns */}
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 1.02]}>
          <cylinderGeometry args={[0.06, 0.07, 1.5, 10]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} />
        </mesh>
      ))}
      {/* Pool */}
      <mesh position={[0, -0.05, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.2]} />
        <meshStandardMaterial color="#4a90d9" metalness={0.5} roughness={0.1} transparent opacity={0.85} />
      </mesh>
      {/* Pool border */}
      <mesh position={[0, 0.0, -2.5]}>
        <boxGeometry args={[2.6, 0.08, 1.3]} />
        <meshStandardMaterial color="#f5f0e8" metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Trees */}
      {[[-2.2, 0, -1.5], [2.2, 0, -1.5], [-2.4, 0, 0.5], [2.4, 0, 0.5]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.7, 8]} />
            <meshStandardMaterial color="#7a5c3a" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color="#2d5a2d" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#c8b882" roughness={1} />
      </mesh>
    </group>
  );
}

// ─── Villas Data ──────────────────────────────────────────────────────────────

const villas = [
  { id: 1, name: 'Villa Belvedere', location: 'Côte d\'Azur, France', bedrooms: 6, pool: true, beach: '100m', price: 8500, tag: 'Sea View', desc: 'Perched on the hillside above Monaco with sweeping views of the Mediterranean.' },
  { id: 2, name: 'Château Provençal', location: 'Luberon, France', bedrooms: 8, pool: true, beach: '40 min', price: 6200, tag: 'Historic', desc: '16th-century château surrounded by lavender fields and Provençal landscapes.' },
  { id: 3, name: 'Villa Santorini Blue', location: 'Oia, Greece', bedrooms: 4, pool: true, beach: '5 min', price: 4800, tag: 'Iconic', desc: 'Exclusive caldera-view villa in the most photographed spot in the world.' },
  { id: 4, name: 'Palazzo Veneziano', location: 'Grand Canal, Italy', bedrooms: 5, pool: false, beach: '20 min', price: 7200, tag: 'Unique', desc: '18th-century palazzo with private gondola dock on the Grand Canal.' },
  { id: 5, name: 'Villa Marrakech Rose', location: 'Palmeraie, Morocco', bedrooms: 7, pool: true, beach: '2h', price: 3500, tag: 'Exotic', desc: 'A riad palace in the heart of the palmery with spa, hammam, and private chefs.' },
  { id: 6, name: 'The Alpine Retreat', location: 'Verbier, Switzerland', bedrooms: 9, pool: false, beach: '5h', price: 12000, tag: 'Alpine Luxury', desc: 'Ski-in/ski-out chalet with piste access, indoor pool, and panoramic mountain views.' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const availability = Array.from({ length: 12 }, (_, m) => Array.from({ length: 31 }, (_, d) => Math.random() > 0.4));

export default function VillaLumiere() {
  const [selectedVilla, setSelectedVilla] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(4);
  const [withChef, setWithChef] = useState(false);
  const [withChauffeur, setWithChauffeur] = useState(false);

  const villa = villas[selectedVilla];
  const nights = checkIn && checkOut ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) : 7;
  const extras = (withChef ? 350 : 0) + (withChauffeur ? 250 : 0);
  const total = villa.price * nights + extras * nights;

  const primary = '#b8860b';

  return (
    <PageWrapper bgColor="#faf7f2">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(250,247,242,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-[#2c1810]/40 uppercase font-light hover:text-[#b8860b] transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.4em]" style={{ color: '#2c1810' }}>VILLA LUMIÈRE</div>
        <div className="text-xs tracking-[0.2em] text-[#2c1810]/30 uppercase font-light hidden md:block">Luxury Villas</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf7f2, #ede4d3)' }}>
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 2, 8], fov: 55 }}>
            <ambientLight intensity={0.5} color="#fff5e4" />
            <pointLight position={[5, 8, 5]} color="#f5c842" intensity={3} />
            <pointLight position={[-5, 4, 3]} color="#ff9933" intensity={1.5} />
            <directionalLight position={[2, 10, 5]} color="#ffffff" intensity={2} />
            <Suspense fallback={null}>
              <VillaScene />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-6" style={{ color: '#b8860b' }}>Luxury Villa Collection · Europe & Beyond</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: '#2c1810' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Live the<br />
              <span style={{ background: 'linear-gradient(135deg, #b8860b, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="italic">Dream</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-[#2c1810]/50 text-lg font-light leading-relaxed max-w-lg">
              Handpicked villas of extraordinary character. Historic châteaux, Mediterranean palazzos, and alpine retreats — all with discreet concierge service.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                style={{ background: 'linear-gradient(135deg, #b8860b, #d4af37)', color: '#fff', fontWeight: 700 }}
                className="px-8 py-4 tracking-widest uppercase text-sm"
                onClick={() => document.getElementById('villas').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Villas
              </button>
              <button
                className="px-8 py-4 tracking-widest uppercase text-sm border transition-all duration-300"
                style={{ borderColor: '#2c1810', color: '#2c1810' }}
                onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
              >
                Check Availability
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Villa Grid ── */}
      <section id="villas" className="py-24 px-8 md:px-16" style={{ background: '#faf7f2' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#b8860b' }}>The Collection</p>
          <h2 className="font-display text-5xl font-light mb-12" style={{ color: '#2c1810' }}>
            Exceptional<br /><span className="italic" style={{ color: '#b8860b' }}>Properties</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {villas.map((v, i) => (
            <ScrollReveal key={v.id} delay={i * 0.08}>
              <motion.div
                onClick={() => setSelectedVilla(i)}
                className="cursor-pointer overflow-hidden border transition-all duration-300"
                style={{
                  borderColor: selectedVilla === i ? '#b8860b' : 'rgba(44,24,16,0.1)',
                  background: '#fff',
                }}
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(184,134,11,0.15)' }}
              >
                {/* Image placeholder */}
                <div className="relative h-48 flex items-end p-4" style={{ background: `linear-gradient(135deg, ${['#8b5e3c', '#4a7c59', '#3a5a8c', '#8c5a3a', '#7c3a5a', '#3a5a7c'][i]}, #1a1a1a)` }}>
                  <span className="px-2 py-1 text-xs tracking-widest uppercase" style={{ background: 'rgba(184,134,11,0.9)', color: '#fff' }}>{v.tag}</span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#2c1810]/40 tracking-widest uppercase mb-1">{v.location}</div>
                  <div className="font-display text-xl font-light mb-2" style={{ color: '#2c1810' }}>{v.name}</div>
                  <p className="text-[#2c1810]/50 text-sm leading-relaxed mb-4">{v.desc}</p>
                  <div className="flex justify-between items-end">
                    <div className="flex gap-4 text-xs text-[#2c1810]/40">
                      <span>🛏 {v.bedrooms} beds</span>
                      {v.pool && <span>∼ Pool</span>}
                      <span>🌊 {v.beach}</span>
                    </div>
                    <div>
                      <div className="text-xl font-light" style={{ color: '#b8860b' }}>€{v.price.toLocaleString()}</div>
                      <div className="text-xs text-[#2c1810]/30 text-right">per night</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Booking ── */}
      <section id="booking" className="py-24 px-8 md:px-16" style={{ background: '#ede4d3' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#b8860b' }}>Availability</p>
          <h2 className="font-display text-5xl font-light mb-12" style={{ color: '#2c1810' }}>
            Book<br /><span className="italic" style={{ color: '#b8860b' }}>{villas[selectedVilla].name}</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-8 border" style={{ background: '#fff', borderColor: 'rgba(44,24,16,0.1)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-[0.3em] text-[#2c1810]/40 uppercase block mb-2">Check-in</label>
                <input type="date" className="w-full px-4 py-3 border text-[#2c1810] focus:outline-none"
                  style={{ borderColor: 'rgba(44,24,16,0.15)', background: '#faf7f2' }} value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </div>
              <div>
                <label className="text-xs tracking-[0.3em] text-[#2c1810]/40 uppercase block mb-2">Check-out</label>
                <input type="date" className="w-full px-4 py-3 border text-[#2c1810] focus:outline-none"
                  style={{ borderColor: 'rgba(44,24,16,0.15)', background: '#faf7f2' }} value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <label className="text-xs tracking-[0.3em] text-[#2c1810]/40 uppercase">Guests</label>
                <span style={{ color: '#2c1810' }}>{guests}</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 border flex items-center justify-center" style={{ borderColor: 'rgba(44,24,16,0.2)', color: '#2c1810' }}>−</button>
                <input type="range" min={1} max={villa.bedrooms * 2} value={guests} onChange={e => setGuests(Number(e.target.value))}
                  className="flex-1 h-1 cursor-pointer" style={{ accentColor: '#b8860b' }} />
                <button onClick={() => setGuests(Math.min(villa.bedrooms * 2, guests + 1))} className="w-10 h-10 border flex items-center justify-center" style={{ borderColor: 'rgba(44,24,16,0.2)', color: '#2c1810' }}>+</button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs tracking-[0.3em] text-[#2c1810]/40 uppercase">Optional Services</p>
              {[
                { state: withChef, set: setWithChef, label: 'Private Chef', price: '€350/night' },
                { state: withChauffeur, set: setWithChauffeur, label: 'Personal Chauffeur', price: '€250/night' },
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => opt.set(!opt.state)} className="w-5 h-5 border flex items-center justify-center"
                      style={{ borderColor: opt.state ? '#b8860b' : 'rgba(44,24,16,0.2)', background: opt.state ? '#b8860b' : 'transparent' }}>
                      {opt.state && <span className="text-white text-xs">✓</span>}
                    </button>
                    <span style={{ color: '#2c1810' }} className="text-sm">{opt.label}</span>
                  </div>
                  <span className="text-sm" style={{ color: '#b8860b' }}>{opt.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border space-y-3" style={{ background: '#fff', borderColor: '#b8860b', borderWidth: 1 }}>
            <div className="flex justify-between text-sm" style={{ color: '#2c1810' }}>
              <span className="opacity-60">Villa ({nights} nights)</span>
              <span>€{(villa.price * nights).toLocaleString()}</span>
            </div>
            {(withChef || withChauffeur) && (
              <div className="flex justify-between text-sm" style={{ color: '#2c1810' }}>
                <span className="opacity-60">Services</span>
                <span>€{(extras * nights).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-light pt-3 border-t" style={{ color: '#2c1810', borderColor: 'rgba(44,24,16,0.1)' }}>
              <span>Total</span>
              <span style={{ color: '#b8860b' }} className="text-3xl font-display">€{total.toLocaleString()}</span>
            </div>
            <button style={{ background: 'linear-gradient(135deg, #b8860b, #d4af37)', color: '#fff', fontWeight: 700 }}
              className="w-full py-4 tracking-widest uppercase text-sm mt-4">
              Request Booking
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12 px-8 md:px-16" style={{ background: '#2c1810', borderColor: '#2c1810' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#d4af37' }}>VILLA LUMIÈRE</div>
          <div className="text-xs text-white/30 tracking-wider">France · Italy · Greece · Switzerland · Morocco</div>
          <div className="text-xs text-white/20">© 2026 Villa Lumière.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
