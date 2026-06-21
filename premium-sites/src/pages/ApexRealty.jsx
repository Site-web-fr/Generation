import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Box, Cylinder } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D City Skyline ─────────────────────────────────────────────────────────

function CityBuilding({ x, z, height, width = 0.3, color = '#c9a028' }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.material.emissiveIntensity = 0.05 + Math.abs(Math.sin(clock.elapsedTime * 0.5 + x)) * 0.05;
  });
  return (
    <mesh ref={mesh} position={[x, height / 2 - 0.5, z]}>
      <boxGeometry args={[width, height, width]} />
      <meshStandardMaterial color="#0d1b2a" emissive={color} emissiveIntensity={0.05} metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

function GoldWireBuilding({ x, z, height }) {
  return (
    <mesh position={[x, height / 2 - 0.5, z]}>
      <boxGeometry args={[0.25, height, 0.25]} />
      <meshStandardMaterial color="#d4af37" transparent opacity={0.15} wireframe metalness={1} roughness={0} />
    </mesh>
  );
}

function CitySkyline() {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.15;
  });

  const buildings = [
    [-4, -2, 3], [-3.2, -1.8, 2.5], [-2.4, -2, 4], [-1.6, -1.9, 2], [-0.8, -2, 3.5],
    [0, -2, 6], [0.8, -1.9, 3], [1.6, -2, 2.8], [2.4, -1.8, 4.5], [3.2, -2, 2],
    [4, -1.9, 3.2], [-3.6, -2.5, 1.8], [3.6, -2.5, 2.2], [0, -3, 1.5],
  ];

  return (
    <group ref={group}>
      <Float speed={0.5} floatIntensity={0.1}>
        {buildings.map(([x, z, h], i) => (
          <CityBuilding key={i} x={x} z={z} height={h} />
        ))}
        {[-2, 0, 2].map((x, i) => (
          <GoldWireBuilding key={i} x={x} z={-1.5} height={[2.5, 5, 3][i]} />
        ))}
        <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#050a10" metalness={0.5} roughness={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

// ─── Properties Data ──────────────────────────────────────────────────────────

const properties = [
  { id: 1, name: 'Villa Lumière', location: 'Saint-Tropez', type: 'Villa', price: '€12,500,000', size: '680 m²', rooms: 7, tag: 'Exclusive', gradient: 'from-[#0d1b2a] to-[#1a2f45]' },
  { id: 2, name: 'Penthouse Élysées', location: 'Paris 8ème', type: 'Penthouse', price: '€8,200,000', size: '320 m²', rooms: 5, tag: 'New', gradient: 'from-[#0d1b2a] to-[#162435]' },
  { id: 3, name: 'Château des Alpes', location: 'Courchevel 1850', type: 'Chalet', price: '€18,000,000', size: '1,200 m²', rooms: 12, tag: 'Rare', gradient: 'from-[#1a1000] to-[#0d1b2a]' },
  { id: 4, name: 'Villa Méditerranée', location: 'Monaco', type: 'Villa', price: '€24,000,000', size: '850 m²', rooms: 8, tag: 'Exclusive', gradient: 'from-[#060d1a] to-[#0d1b2a]' },
  { id: 5, name: 'Tour Horizon', location: 'Paris La Défense', type: 'Duplex', price: '€3,800,000', size: '280 m²', rooms: 4, tag: 'New', gradient: 'from-[#0d1b2a] to-[#162435]' },
  { id: 6, name: 'Domaine Riviera', location: 'Cannes', type: 'Estate', price: '€32,000,000', size: '2,400 m²', rooms: 15, tag: 'Ultra', gradient: 'from-[#0d1000] to-[#0d1b2a]' },
];

const features = [
  { icon: '◈', title: 'Off-Market Portfolio', desc: 'Access to exclusive properties never listed publicly' },
  { icon: '◉', title: 'Private Viewings', desc: 'Discreet, appointment-only property tours worldwide' },
  { icon: '◎', title: 'Investment Advisory', desc: 'Yield analysis and portfolio diversification strategies' },
  { icon: '◌', title: 'Global Network', desc: '340 partner agencies across 48 countries' },
];

export default function ApexRealty() {
  const [budget, setBudget] = useState([500000, 25000000]);
  const [propertyType, setPropertyType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProperty, setActiveProperty] = useState(null);

  const types = ['All', 'Villa', 'Penthouse', 'Chalet', 'Duplex', 'Estate'];
  const filtered = properties.filter(p =>
    (propertyType === 'All' || p.type === propertyType) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatPrice = (v) => '€' + (v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'K');

  return (
    <PageWrapper bgColor="#060d1a">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(6,13,26,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-gold-400 transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.4em] text-gradient-gold">APEX</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Luxury Real Estate</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 2, 8], fov: 55 }}>
            <ambientLight intensity={0.05} />
            <pointLight position={[0, 8, 4]} color="#c9a028" intensity={3} />
            <pointLight position={[-4, 2, 2]} color="#1a4a7a" intensity={2} />
            <pointLight position={[4, 2, 2]} color="#c9a028" intensity={1} />
            <Stars radius={100} depth={50} count={4000} factor={4} fade speed={0.3} />
            <Suspense fallback={null}>
              <CitySkyline />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-5xl">
          <FadeInUp delay={0.2}>
            <p className="section-subtitle mb-6" style={{ color: '#c9a028' }}>Luxury Real Estate · Since 2006</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-[7rem] font-light text-white leading-[0.9]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Premium<br />
              <span style={{ background: 'linear-gradient(135deg, #c9a028, #f5e07a, #c9a028)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="italic">Real Estate</span><br />
              Redefined
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-white/40 text-lg font-light leading-relaxed max-w-lg">
              Curating the world's most exceptional properties for discerning clients. Off-market opportunities, global portfolio.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="btn-gold" style={{ background: 'linear-gradient(135deg, #c9a028, #e8c84a)' }} onClick={() => document.getElementById('search').scrollIntoView({ behavior: 'smooth' })}>
                Search Properties
              </button>
              <button className="btn-outline" onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}>
                View Portfolio
              </button>
            </div>
          </FadeInUp>
        </div>

        {/* Side indicators */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 text-right hidden md:flex">
          {[{ v: '€8.4B', l: 'Assets Under Management' }, { v: '1,240', l: 'Transactions Closed' }, { v: '48', l: 'Countries' }].map((s, i) => (
            <FadeInUp key={i} delay={1.2 + i * 0.15}>
              <div>
                <div className="text-2xl font-light" style={{ color: '#c9a028' }}>{s.v}</div>
                <div className="text-xs text-white/30 tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* ── Property Search Tool ── */}
      <section id="search" className="py-20 px-8 md:px-16" style={{ background: 'linear-gradient(to bottom, #060d1a, #0a1628)' }}>
        <ScrollReveal>
          <p className="section-subtitle mb-4" style={{ color: '#c9a028' }}>Property Finder</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-12">
            Find Your<br /><span className="italic" style={{ color: '#c9a028' }}>Dream Property</span>
          </h2>
        </ScrollReveal>

        <div className="glass-gold p-8 md:p-10 space-y-8">
          {/* Search & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Location or Name</label>
              <input
                className="w-full px-4 py-3 border border-white/10 text-white focus:outline-none focus:border-gold-500 transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                placeholder="Paris, Monaco, Saint-Tropez..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setPropertyType(t)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${propertyType === t ? 'border-gold-500 text-gold-400' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs tracking-[0.2em] text-white/40 uppercase">Budget Range</label>
              <span style={{ color: '#c9a028' }} className="text-sm font-light">{formatPrice(budget[0])} — {formatPrice(budget[1])}</span>
            </div>
            <div className="relative h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="absolute h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #c9a028, #f5e07a)',
                  left: `${(budget[0] / 40000000) * 100}%`,
                  right: `${100 - (budget[1] / 40000000) * 100}%`,
                }}
              />
              <input
                type="range" min={100000} max={40000000} step={100000}
                value={budget[0]}
                onChange={e => setBudget([Math.min(Number(e.target.value), budget[1] - 500000), budget[1]])}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="text-sm text-white/40">{filtered.length} properties found</div>
        </div>
      </section>

      {/* ── Properties Grid ── */}
      <section id="properties" className="py-10 px-8 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prop, i) => (
            <ScrollReveal key={prop.id} delay={i * 0.1}>
              <motion.div
                className={`relative overflow-hidden cursor-pointer group`}
                style={{ background: `linear-gradient(135deg, ${prop.gradient.replace('from-', '').replace('to-', '').split(' ').join(', ')})` }}
                onClick={() => setActiveProperty(activeProperty?.id === prop.id ? null : prop)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pb-4" style={{ aspectRatio: '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex justify-between items-start mb-auto">
                      <span className="text-xs px-2 py-1 border border-gold-500/40 text-gold-400 tracking-widest uppercase">{prop.tag}</span>
                      <span className="text-xs text-white/30 tracking-wider">{prop.type}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-gradient-gold font-display mb-1">{prop.price}</div>
                    <div className="font-display text-xl font-light text-white">{prop.name}</div>
                    <div className="text-white/40 text-sm mt-1">📍 {prop.location}</div>
                    <div className="flex gap-6 mt-4 text-xs text-white/40">
                      <span>↔ {prop.size}</span>
                      <span>⌂ {prop.rooms} rooms</span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeProperty?.id === prop.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-gold-500/20"
                    >
                      <div className="p-6 space-y-3">
                        <p className="text-white/50 text-sm leading-relaxed">An exceptional property offering unparalleled views, top-tier amenities, and the finest materials. Available for immediate viewing upon request.</p>
                        <button className="w-full btn-gold text-xs py-3">Request Private Viewing</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 border border-white/0 group-hover:border-gold-500/30 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-8 md:px-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollRevealX direction="left">
            <p className="section-subtitle mb-4" style={{ color: '#c9a028' }}>Why Apex</p>
            <h2 className="font-display text-5xl font-light text-white mb-6">
              The Standard<br /><span className="italic" style={{ color: '#c9a028' }}>of Excellence</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-8">Since 2006, APEX has represented the pinnacle of real estate advisory, serving ultra-high-net-worth individuals with absolute discretion.</p>
            <button className="btn-gold" style={{ background: 'linear-gradient(135deg, #c9a028, #e8c84a)' }}>Schedule a Meeting</button>
          </ScrollRevealX>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="card-premium hover:border-gold-500/30">
                  <div className="text-3xl mb-3" style={{ color: '#c9a028' }}>{f.icon}</div>
                  <h3 className="font-display text-lg font-light text-white mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16" style={{ background: '#040a14' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#c9a028' }}>APEX REALTY</div>
          <div className="text-xs text-white/20 tracking-wider">24 Avenue George V, Paris 75008 · contact@apexrealty.com</div>
          <div className="text-xs text-white/20">© 2026 Apex Realty. All rights reserved.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
