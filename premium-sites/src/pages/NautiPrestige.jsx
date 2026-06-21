import { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Yacht Model ───────────────────────────────────────────────────────────

function YachtModel() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.6) * 0.08;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.01;
    group.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Main hull */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 2.5, 12, 1, false, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#f0f8ff" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Upper deck */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.7, 0.15, 2.0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Bridge / Cabin */}
      <mesh position={[0, 0.7, 0.3]}>
        <boxGeometry args={[0.55, 0.55, 0.9]} />
        <meshStandardMaterial color="#e8f4f8" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Bridge windows */}
      {[-0.28, 0.28].map((x, i) => (
        <mesh key={i} position={[x, 0.7, 0.76]}>
          <boxGeometry args={[0.02, 0.3, 0.6]} />
          <meshStandardMaterial color="#87ceeb" metalness={0.9} roughness={0.05} transparent opacity={0.7} />
        </mesh>
      ))}
      {/* Mast */}
      <mesh position={[0, 1.5, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.8, 8]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bow */}
      <mesh position={[0, -0.1, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.4, 0.5, 12]} />
        <meshStandardMaterial color="#f0f8ff" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Rails */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.45, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 2.0, 6]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Silver accent line */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.82, 0.04, 2.5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

function OceanParticles() {
  const ref = useRef();
  const count = 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      arr[i * 3] = r * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 2] = r * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#7fdfff" transparent opacity={0.35} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Services Data ────────────────────────────────────────────────────────────

const services = [
  { id: 'exterior', name: 'Exterior Detailing', icon: '◈', desc: 'Hull polishing, antifouling, osmosis treatment, teak cleaning & oiling.', basePrice: 800 },
  { id: 'interior', name: 'Interior Detailing', icon: '◉', desc: 'Deep cleaning of cabins, upholstery restoration, wood conditioning.', basePrice: 600 },
  { id: 'full', name: 'Full Yacht Spa', icon: '◎', desc: 'Complete exterior + interior — our signature 360° detailing service.', basePrice: 1200 },
  { id: 'engine', name: 'Engine Bay Clean', icon: '◌', desc: 'Professional degreasing, anti-corrosion treatment, bilge cleaning.', basePrice: 450 },
  { id: 'teak', name: 'Teak Restoration', icon: '◇', desc: 'Sanding, bleaching, oiling and sealing of all teak surfaces.', basePrice: 700 },
  { id: 'protection', name: 'Ceramic Protection', icon: '◆', desc: '5-year ceramic coating providing ultimate protection against UV and salt.', basePrice: 2200 },
];

const yachtSizes = [
  { label: '< 12m', multiplier: 1 },
  { label: '12–18m', multiplier: 1.6 },
  { label: '18–25m', multiplier: 2.4 },
  { label: '25–35m', multiplier: 3.5 },
  { label: '35m+', multiplier: 5 },
];

const testimonials = [
  { name: 'H.R.H. Prince A.', vessel: 'Riva 56', quote: 'My Riva has never looked so pristine. The attention to detail is unparalleled in the industry.' },
  { name: 'Mme. Beaumont', vessel: 'Ferretti 720', quote: 'NAUTI PRESTIGE transformed my yacht for the Cannes festival. Exceptional, discreet, and remarkably thorough.' },
  { name: 'Mr. Castellan', vessel: 'Sunseeker 95', quote: 'After years of trying various services, I have finally found the team worthy of my vessel.' },
];

export default function NautiPrestige() {
  const [selectedServices, setSelectedServices] = useState(['full']);
  const [yachtSize, setYachtSize] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const totalPrice = services
    .filter(s => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + s.basePrice, 0) * yachtSizes[yachtSize].multiplier;

  return (
    <PageWrapper bgColor="#020b14">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(2,11,20,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-[#c0c0c0] transition-colors">← Portfolio</Link>
        <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#c0c0c0' }}>NAUTI PRESTIGE</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Yacht Care</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 1.5, 7], fov: 55 }}>
            <ambientLight intensity={0.05} />
            <pointLight position={[4, 6, 4]} color="#7fdfff" intensity={3} />
            <pointLight position={[-4, 4, 2]} color="#c0c0c0" intensity={2} />
            <pointLight position={[0, 8, -2]} color="#ffffff" intensity={1} />
            <Stars radius={120} depth={60} count={3500} factor={3} fade speed={0.2} />
            <Suspense fallback={null}>
              <YachtModel />
              <OceanParticles />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-6" style={{ color: '#c0c0c0' }}>Premium Yacht Care · Côte d'Azur</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Immaculate<br />
              <span style={{ background: 'linear-gradient(135deg, #c0c0c0, #ffffff, #a8a8a8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="italic">Vessels</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.7}>
            <div className="w-24 h-px mt-6 mb-6" style={{ background: 'linear-gradient(90deg, transparent, #c0c0c0, transparent)' }} />
          </FadeInUp>
          <FadeInUp delay={0.8}>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-lg">
              The finest yacht care service on the French Riviera. From superyachts to classic vessels, we restore and protect your investment.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                style={{ background: 'linear-gradient(135deg, #c0c0c0, #e8e8e8)', color: '#050505', fontWeight: 700 }}
                className="px-8 py-4 tracking-widest uppercase text-sm"
                onClick={() => document.getElementById('estimator').scrollIntoView({ behavior: 'smooth' })}
              >
                Get an Estimate
              </button>
              <button className="btn-outline border-white/20" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
                Our Services
              </button>
            </div>
          </FadeInUp>
        </div>

        <div className="absolute right-8 md:right-16 bottom-20 hidden md:block text-right">
          <FadeInUp delay={1.4}>
            {['Monaco', 'Cannes', 'Saint-Tropez', 'Antibes'].map((port, i) => (
              <div key={i} className="text-xs text-white/30 tracking-widest mb-2">{port}</div>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollRevealX direction="left">
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#c0c0c0' }}>Our Expertise</p>
            <h2 className="font-display text-5xl font-light text-white mb-6">
              Complete<br /><span className="italic" style={{ color: '#c0c0c0' }}>Yacht Care</span>
            </h2>
            <p className="text-white/40 leading-relaxed">Every vessel deserves meticulous care. Our certified technicians use only the finest products from Meguiar's, Farecla, and our exclusive formulations.</p>
          </ScrollRevealX>
          <div className="grid grid-cols-1 gap-4">
            {services.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.08}>
                <motion.div
                  onClick={() => toggleService(s.id)}
                  className="p-5 border cursor-pointer transition-all duration-300 flex items-center gap-5"
                  style={{
                    background: selectedServices.includes(s.id) ? 'rgba(192,192,192,0.06)' : 'rgba(255,255,255,0.02)',
                    borderColor: selectedServices.includes(s.id) ? 'rgba(192,192,192,0.4)' : 'rgba(255,255,255,0.06)',
                  }}
                  whileHover={{ borderColor: 'rgba(192,192,192,0.25)' }}
                >
                  <span className="text-2xl flex-shrink-0" style={{ color: '#c0c0c0' }}>{s.icon}</span>
                  <div className="flex-1">
                    <div className="font-display text-lg text-white font-light">{s.name}</div>
                    <div className="text-white/40 text-sm mt-0.5">{s.desc}</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm font-light" style={{ color: '#c0c0c0' }}>From €{s.basePrice}</div>
                    <div className={`text-xs mt-1 ${selectedServices.includes(s.id) ? 'text-green-400' : 'text-white/20'}`}>
                      {selectedServices.includes(s.id) ? '✓ Selected' : 'Click to add'}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price Estimator ── */}
      <section id="estimator" className="py-24 px-8 md:px-16" style={{ background: 'rgba(192,192,192,0.03)' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#c0c0c0' }}>Transparency</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            Instant<br /><span className="italic" style={{ color: '#c0c0c0' }}>Price Estimator</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto glass p-8 md:p-12 border border-white/5">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Vessel Length</p>
            <div className="grid grid-cols-5 gap-2">
              {yachtSizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setYachtSize(i)}
                  className="py-3 text-sm border transition-all duration-300"
                  style={{
                    background: yachtSize === i ? 'rgba(192,192,192,0.12)' : 'transparent',
                    borderColor: yachtSize === i ? 'rgba(192,192,192,0.5)' : 'rgba(255,255,255,0.1)',
                    color: yachtSize === i ? '#c0c0c0' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-4">Selected Services</p>
            {selectedServices.length === 0 ? (
              <p className="text-white/20 italic">No services selected</p>
            ) : (
              <div className="space-y-2">
                {services.filter(s => selectedServices.includes(s.id)).map(s => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-white/60">{s.name}</span>
                    <span style={{ color: '#c0c0c0' }}>€{(s.basePrice * yachtSizes[yachtSize].multiplier).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-white/30 tracking-widest uppercase">Estimated Total</p>
                <p className="text-xs text-white/20 mt-1">Vessel: {yachtSizes[yachtSize].label}</p>
              </div>
              <div className="text-right">
                <motion.div
                  key={totalPrice}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-light font-display"
                  style={{ color: '#c0c0c0' }}
                >
                  €{totalPrice.toLocaleString()}
                </motion.div>
                <p className="text-xs text-white/20 mt-1">+ VAT · Quote valid 30 days</p>
              </div>
            </div>
          </div>

          <button
            style={{ background: 'linear-gradient(135deg, #c0c0c0, #e8e8e8)', color: '#050505', fontWeight: 700 }}
            className="w-full py-4 tracking-widest uppercase text-sm mt-8"
          >
            Request Detailed Quote
          </button>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-8 md:px-16">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#c0c0c0' }}>Testimonials</p>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="text-4xl mb-8" style={{ color: 'rgba(192,192,192,0.3)' }}>"</div>
              <p className="font-display text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-8 italic">
                {testimonials[activeTestimonial].quote}
              </p>
              <div className="text-white/40 text-sm tracking-wider">{testimonials[activeTestimonial].name}</div>
              <div className="text-xs mt-1" style={{ color: '#c0c0c0' }}>{testimonials[activeTestimonial].vessel}</div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === activeTestimonial ? '#c0c0c0' : 'rgba(192,192,192,0.2)' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#c0c0c0' }}>NAUTI PRESTIGE</div>
          <div className="text-xs text-white/20 tracking-wider">Port de Monaco · Port Vieux de Cannes · Port de Saint-Tropez</div>
          <div className="text-xs text-white/20">© 2026 Nauti Prestige.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
