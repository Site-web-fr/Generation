import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { FadeInUp, ScrollReveal } from '../components/ui/AnimatedText';
import CustomCursor from '../components/ui/CustomCursor';

// ─── 3D Background ────────────────────────────────────────────────────────────

function GoldNebula() {
  const ref = useRef();
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
    positions[i * 3 + 2] = r * Math.cos(phi);
    const brightness = 0.5 + Math.random() * 0.5;
    const isGold = Math.random() > 0.4;
    colors[i * 3] = brightness * (isGold ? 0.83 : 1);
    colors[i * 3 + 1] = brightness * (isGold ? 0.68 : 1);
    colors[i * 3 + 2] = brightness * (isGold ? 0.22 : 1);
  }

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Sites Data ───────────────────────────────────────────────────────────────

const sites = [
  {
    id: 1, path: '/lumiere', name: 'LUMIÈRE', category: 'Aesthetic Surgery',
    desc: 'Premier aesthetic surgery centre with 12 board-certified surgeons. 3D particle hero, multi-step consultation booking, procedure selector.',
    accent: '#d4af37', bg: 'from-[#0a0000] to-[#050505]',
    tags: ['3D Particles', 'Multi-step Form', 'Procedure Explorer'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 2, path: '/apex-realty', name: 'APEX REALTY', category: 'Luxury Real Estate',
    desc: '3D city skyline, interactive property search, budget slider, virtual viewing requests. Deep navy & gold.',
    accent: '#c9a028', bg: 'from-[#020810] to-[#060d1a]',
    tags: ['3D City', 'Property Search', 'Price Filter'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 3, path: '/dubai-wave', name: 'DUBAI WAVE', category: 'Jet Ski Rentals · Dubai',
    desc: 'Animated ocean surface, 3D jet ski model, route selector, live weather data, instant booking calculator.',
    accent: '#00d4ff', bg: 'from-[#00060e] to-[#000e1a]',
    tags: ['Water Shader', 'Route Map', 'Instant Booking'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 4, path: '/nauti-prestige', name: 'NAUTI PRESTIGE', category: 'Yacht Cleaning',
    desc: '3D yacht model, multi-service selector with real-time price calculator, testimonials, Riviera ports.',
    accent: '#c0c0c0', bg: 'from-[#000509] to-[#020b14]',
    tags: ['3D Yacht', 'Price Calculator', 'Service Builder'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 5, path: '/prestige-drive', name: 'PRESTIGE DRIVE', category: 'Luxury Vehicle Rental',
    desc: 'Full 3D car model with rotating turntable, fleet carousel, rental calculator (days + km), live pricing.',
    accent: '#e63946', bg: 'from-[#020000] to-[#050505]',
    tags: ['3D Car', 'Fleet Carousel', 'Rental Calculator'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 6, path: '/aero-prive', name: 'AERO PRIVÉ', category: 'Private Jet Charter',
    desc: '3D rotating globe, orbiting private jet, airport selector, fleet configurator, instant price estimate.',
    accent: '#d4af37', bg: 'from-[#020408] to-[#040810]',
    tags: ['3D Globe', 'Jet Orbital', 'Charter Estimator'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 7, path: '/villa-lumiere', name: 'VILLA LUMIÈRE', category: 'Luxury Villa Rentals',
    desc: '3D Mediterranean villa scene, property collection, date picker, optional services (chef, chauffeur), live pricing.',
    accent: '#b8860b', bg: 'from-[#1a0f05] to-[#faf7f2]',
    tags: ['3D Villa', 'Booking Calendar', 'Services Add-ons'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 8, path: '/le-conciergerie', name: 'LE CONCIERGERIE', category: 'Lifestyle Management',
    desc: '3D golden crown, service explorer, membership tiers (Prestige, Elite, Royale), private application form.',
    accent: '#2d6a4f', bg: 'from-[#020604] to-[#080f0a]',
    tags: ['3D Crown', 'Membership Tiers', 'Private Application'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 9, path: '/espace-interiors', name: 'ESPACE', category: 'Interior Design',
    desc: '3D room with style switcher (4 palettes), portfolio showcase, project estimator with room selector.',
    accent: '#8b7355', bg: 'from-[#faf8f5] to-[#ede8dc]',
    tags: ['3D Room', 'Style Switcher', 'Project Estimator'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
  {
    id: 10, path: '/chronos', name: 'CHRONOS', category: 'Swiss Haute Horlogerie',
    desc: 'Real-time 3D watch ticking with live clock, limited edition collection, heritage timeline, reservation system.',
    accent: '#d4af37', bg: 'from-[#010101] to-[#040404]',
    tags: ['3D Live Watch', 'Edition Selector', 'Heritage Timeline'],
    stats: { budget: '€10K', complexity: 'Extreme', animations: '3D+' },
  },
];

export default function Showcase() {
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Medical', 'Real Estate', 'Maritime', 'Automotive', 'Aviation', 'Hospitality'];

  return (
    <div className="min-h-screen" style={{ background: '#040404' }}>
      <CustomCursor />

      {/* ── Hero Canvas ── */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Stars radius={100} depth={50} count={5000} factor={5} fade speed={0.3} />
          <GoldNebula />
        </Canvas>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="px-8 md:px-16 py-10 border-b border-white/5" style={{ background: 'rgba(4,4,4,0.7)', backdropFilter: 'blur(20px)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <FadeInUp>
                <p className="text-xs tracking-[0.4em] text-white/30 uppercase mb-2">Premium Landing Pages · Portfolio</p>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h1 className="font-display text-4xl md:text-6xl font-light text-white">
                  10 <span className="text-gradient-gold italic">Premium</span> Sites
                </h1>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="text-white/40 text-sm mt-2">React.js · Three.js · Framer Motion · GSAP · Tailwind CSS</p>
              </FadeInUp>
            </div>
            <FadeInUp delay={0.3}>
              <div className="flex gap-6 text-center">
                {[{ v: '10', l: 'Sites' }, { v: '3D', l: 'Animations' }, { v: '€10K', l: 'Budget Each' }].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-light text-gradient-gold">{s.v}</div>
                    <div className="text-xs text-white/30 tracking-wider">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </header>

        {/* ── Tech Stack Banner ── */}
        <div className="border-b border-white/5 py-3 px-8 md:px-16 overflow-x-auto" style={{ background: 'rgba(4,4,4,0.5)' }}>
          <div className="flex gap-8 text-xs text-white/20 tracking-widest uppercase whitespace-nowrap">
            {['React 18', 'Three.js', 'React Three Fiber', 'React Three Drei', 'Framer Motion', 'GSAP', 'Tailwind CSS v3', 'React Router v6', 'Vite 5', 'Google Fonts'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Main Grid ── */}
        <main className="max-w-7xl mx-auto px-8 md:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sites.map((site, i) => (
              <ScrollReveal key={site.id} delay={i * 0.06}>
                <Link to={site.path}>
                  <motion.div
                    className="group relative overflow-hidden border transition-all duration-500 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${site.bg.replace('from-', '').replace(' to-', ', ').replace(/\[|\]/g, '')})`,
                      borderColor: 'rgba(255,255,255,0.06)',
                      minHeight: '340px',
                    }}
                    onHoverStart={() => setHovered(site.id)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={{ borderColor: site.accent + '40', scale: 1.01 }}
                  >
                    {/* Glow overlay */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${site.accent}12, transparent 70%)` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hovered === site.id ? 1 : 0 }}
                    />

                    <div className="relative p-7 h-full flex flex-col">
                      {/* Number */}
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-mono text-white/15 tracking-widest">0{site.id}</span>
                        <div className="flex gap-2">
                          {site.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 border" style={{ borderColor: site.accent + '30', color: site.accent + 'aa' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="flex-1">
                        <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: site.accent + '80' }}>{site.category}</p>
                        <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-4 group-hover:text-white transition-colors">
                          {site.name}
                        </h2>
                        <p className="text-white/40 text-sm leading-relaxed">{site.desc}</p>
                      </div>

                      {/* Footer */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                        <div className="flex gap-4 text-xs text-white/20">
                          {Object.entries(site.stats).map(([k, v]) => (
                            <span key={k}><span className="text-white/40">{v}</span></span>
                          ))}
                        </div>
                        <motion.div
                          className="flex items-center gap-2 text-xs uppercase tracking-widest"
                          style={{ color: site.accent }}
                          initial={{ x: 0 }}
                          animate={{ x: hovered === site.id ? 4 : 0 }}
                        >
                          Visit →
                        </motion.div>
                      </div>
                    </div>

                    {/* Accent bottom border */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, transparent, ${site.accent}, transparent)` }}
                      initial={{ width: '0%', left: '50%', translateX: '-50%' }}
                      animate={{ width: hovered === site.id ? '100%' : '0%', left: hovered === site.id ? '0%' : '50%', translateX: hovered === site.id ? '0%' : '-50%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </main>

        {/* ── Tech Detail Section ── */}
        <section className="border-t border-white/5 py-24 px-8 md:px-16" style={{ background: 'rgba(4,4,4,0.8)' }}>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p className="section-subtitle mb-4">Architecture</p>
              <h2 className="font-display text-5xl font-light text-white mb-16">
                Built for<br /><span className="text-gradient-gold italic">Performance</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: '3D Rendering', icon: '◈',
                  items: ['React Three Fiber (R3F)', 'Three.js primitives', 'Custom GLSL shaders', 'PBR materials', 'Dynamic lighting', 'Post-processing effects'],
                },
                {
                  title: 'Animation Engine', icon: '◉',
                  items: ['Framer Motion (page & UI)', 'GSAP scroll triggers', 'CSS keyframe animations', 'Spring physics', 'AnimatePresence', 'useFrame loops'],
                },
                {
                  title: 'Interactive Tools', icon: '◎',
                  items: ['Real-time price calculators', 'Multi-step forms', 'Property filters', 'Booking systems', 'Service builders', 'Live configurators'],
                },
              ].map((col, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="card-premium hover:border-gold-500/20">
                    <div className="text-3xl text-gradient-gold mb-4">{col.icon}</div>
                    <h3 className="font-display text-2xl font-light text-white mb-4">{col.title}</h3>
                    <ul className="space-y-2">
                      {col.items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/50">
                          <span className="text-gold-500/60">◇</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 py-12 px-8 md:px-16" style={{ background: 'rgba(4,4,4,0.9)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-display text-xl font-light text-gradient-gold tracking-widest">PREMIUM PORTFOLIO</div>
              <div className="text-xs text-white/20 mt-1">10 Landing Pages · React + Three.js · 2026</div>
            </div>
            <div className="text-xs text-white/20 tracking-wider text-center md:text-right">
              Built with ❤ for the highest standards in web design
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
