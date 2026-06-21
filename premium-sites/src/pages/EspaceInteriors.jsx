import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Room Scene ────────────────────────────────────────────────────────────

function RoomScene({ wallColor = '#ede8d8', floorColor = '#8b6914' }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={[0.85, 0.85, 0.85]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color={floorColor} roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 1.5, -2]}>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-2.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>
      {/* Sofa */}
      <group position={[0, 0.2, -0.8]}>
        <mesh>
          <boxGeometry args={[2.2, 0.25, 0.9]} />
          <meshStandardMaterial color="#c8b89a" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, 0.4, -0.4]}>
          <boxGeometry args={[2.2, 0.55, 0.12]} />
          <meshStandardMaterial color="#c8b89a" roughness={0.9} />
        </mesh>
        {[-0.9, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0]}>
            <boxGeometry args={[0.15, 0.45, 0.9]} />
            <meshStandardMaterial color="#b8a88a" roughness={0.9} />
          </mesh>
        ))}
        {[-0.6, 0, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.38, -0.05]}>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshStandardMaterial color={['#d4af37', '#8b4513', '#2d5a8e'][i]} roughness={0.7} metalness={0.2} />
          </mesh>
        ))}
      </group>
      {/* Coffee table */}
      <group position={[0, 0.16, 0.5]}>
        <mesh>
          <boxGeometry args={[1.2, 0.06, 0.6]} />
          <meshStandardMaterial color="#1a0f00" roughness={0.2} metalness={0.5} />
        </mesh>
        {[[-0.5, -0.25], [0.5, -0.25], [-0.5, 0.25], [0.5, 0.25]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.12, z]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#c9a028" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
      {/* Lamp */}
      <group position={[-1.5, 0, -1.5]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshStandardMaterial color="#c9a028" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.22, 0.3, 16, 1, true]} />
          <meshStandardMaterial color="#f5e8c8" transparent opacity={0.9} roughness={0.8} side={2} />
        </mesh>
        <pointLight position={[0, 0.6, 0]} color="#f5c842" intensity={1} distance={3} />
      </group>
      {/* Painting on back wall */}
      <mesh position={[0.5, 1.8, -1.97]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color="#8b5e3c" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 1.8, -1.96]}>
        <planeGeometry args={[0.7, 0.5]} />
        <meshStandardMaterial color="#c9a028" metalness={0.2} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const styles = [
  { id: 'contemporary', name: 'Contemporary', wall: '#ede8d8', floor: '#8b6914', accent: '#8b7355' },
  { id: 'minimalist', name: 'Minimalist', wall: '#f5f5f5', floor: '#c8c8c8', accent: '#333' },
  { id: 'art-deco', name: 'Art Déco', wall: '#1a0f05', floor: '#8b6914', accent: '#c9a028' },
  { id: 'scandinavian', name: 'Scandinavian', wall: '#faf8f5', floor: '#d4c4a8', accent: '#4a5568' },
];

const services = [
  { name: 'Full Interior Design', price: '€15,000+', desc: 'Complete redesign of your space from concept to completion.', icon: '◈' },
  { name: 'Interior Consulting', price: '€300/h', desc: 'Expert advice for your current or future project.', icon: '◉' },
  { name: 'Furniture Curation', price: '€5,000+', desc: 'Bespoke furniture selection from global ateliers.', icon: '◎' },
  { name: '3D Visualization', price: '€2,500+', desc: 'Photorealistic renders before construction begins.', icon: '◌' },
  { name: 'Renovation Management', price: '€8,000+', desc: 'End-to-end project management with elite contractors.', icon: '◇' },
  { name: 'Art Advisory', price: '€2,000+', desc: 'Curating original artworks aligned with your aesthetic.', icon: '◆' },
];

const rooms = ['Living Room', 'Master Suite', 'Kitchen', 'Dining Room', 'Home Office', 'Bathroom'];

export default function EspaceInteriors() {
  const [activeStyle, setActiveStyle] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [area, setArea] = useState(150);
  const [selectedRooms, setSelectedRooms] = useState(['Living Room']);
  const [budget, setBudget] = useState(30000);
  const currentStyle = styles[activeStyle];

  const toggleRoom = (room) => {
    setSelectedRooms(prev => prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]);
  };

  const estimate = budget;

  return (
    <PageWrapper bgColor="#faf8f5">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(250,248,245,0.97), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-[#2c2c2c]/40 uppercase font-light hover:text-[#8b7355] transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.4em]" style={{ color: '#2c2c2c' }}>ESPACE</div>
        <div className="text-xs tracking-[0.2em] text-[#2c2c2c]/30 uppercase font-light hidden md:block">Interior Design</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf8f5, #ede8dc)' }}>
        <div className="canvas-container">
          <Canvas camera={{ position: [2, 2, 6], fov: 55 }}>
            <ambientLight intensity={0.6} color="#fff5e4" />
            <pointLight position={[3, 5, 3]} color="#f5c842" intensity={3} />
            <pointLight position={[-3, 4, 2]} color="#ff9933" intensity={1} />
            <directionalLight position={[0, 8, 4]} intensity={1.5} />
            <Suspense fallback={null}>
              <RoomScene wallColor={currentStyle.wall} floorColor={currentStyle.floor} />
              <Environment preset="apartment" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-6" style={{ color: '#8b7355' }}>Interior Architecture & Design</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: '#2c2c2c' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Spaces<br />
              That <span style={{ background: 'linear-gradient(135deg, #8b7355, #c9a028)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className="italic">Inspire</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-[#2c2c2c]/50 text-lg font-light leading-relaxed max-w-lg">
              Transforming residential and commercial spaces into extraordinary environments. Where architecture meets art.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                style={{ background: 'linear-gradient(135deg, #8b7355, #c9a028)', color: '#fff', fontWeight: 700 }}
                className="px-8 py-4 tracking-widest uppercase text-sm"
                onClick={() => document.getElementById('configurator').scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Project
              </button>
              <button
                className="px-8 py-4 tracking-widest uppercase text-sm border transition-all duration-300"
                style={{ borderColor: '#2c2c2c30', color: '#2c2c2c' }}
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              >
                View Portfolio
              </button>
            </div>
          </FadeInUp>
        </div>

        {/* Style switcher */}
        <div className="absolute bottom-16 left-8 md:left-16 flex gap-2">
          {styles.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStyle(i)}
              className="px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 border"
              style={{
                background: activeStyle === i ? '#8b7355' : 'rgba(255,255,255,0.5)',
                borderColor: activeStyle === i ? '#8b7355' : 'rgba(44,44,44,0.15)',
                color: activeStyle === i ? '#fff' : '#2c2c2c',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 px-8 md:px-16" style={{ background: '#faf8f5' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#8b7355' }}>Services</p>
          <h2 className="font-display text-5xl font-light mb-12" style={{ color: '#2c2c2c' }}>
            What We<br /><span className="italic" style={{ color: '#8b7355' }}>Offer</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <motion.div className="p-6 border transition-all duration-300 group" style={{ background: '#fff', borderColor: 'rgba(44,44,44,0.08)' }}
                whileHover={{ borderColor: '#8b7355', y: -4, boxShadow: '0 20px 60px rgba(139,115,85,0.12)' }}>
                <div className="text-2xl mb-3" style={{ color: '#c9a028' }}>{s.icon}</div>
                <div className="font-display text-xl font-light mb-2" style={{ color: '#2c2c2c' }}>{s.name}</div>
                <p className="text-[#2c2c2c]/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="font-light text-lg" style={{ color: '#8b7355' }}>{s.price}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-24 px-8 md:px-16" style={{ background: '#ede8dc' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#8b7355' }}>Portfolio</p>
          <h2 className="font-display text-5xl font-light mb-12" style={{ color: '#2c2c2c' }}>Recent<br /><span className="italic" style={{ color: '#8b7355' }}>Projects</span></h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Paris Penthouse', type: 'Residential', area: '280m²', palette: '#8b5e3c' },
            { title: 'Monaco Villa', type: 'Residential', area: '450m²', palette: '#2d5a8e' },
            { title: 'Four Seasons Suite', type: 'Hospitality', area: '80m²', palette: '#4a7c59' },
            { title: 'Versailles Office', type: 'Commercial', area: '600m²', palette: '#8b4513' },
          ].map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div className="relative overflow-hidden" style={{ aspectRatio: i % 2 === 0 ? '4/3' : '3/4' }}
                whileHover={{ scale: 1.02 }}>
                <div className="absolute inset-0 flex items-end p-6" style={{ background: `linear-gradient(135deg, ${p.palette}, #1a1a1a)` }}>
                  <div>
                    <div className="text-xs tracking-widest text-white/40 uppercase mb-1">{p.type} · {p.area}</div>
                    <div className="font-display text-2xl font-light text-white">{p.title}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Project Configurator ── */}
      <section id="configurator" className="py-24 px-8 md:px-16" style={{ background: '#faf8f5' }}>
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase font-light mb-4" style={{ color: '#8b7355' }}>Estimator</p>
          <h2 className="font-display text-5xl font-light mb-12" style={{ color: '#2c2c2c' }}>
            Estimate<br /><span className="italic" style={{ color: '#8b7355' }}>Your Project</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-8 border space-y-6" style={{ background: '#fff', borderColor: 'rgba(44,44,44,0.1)' }}>
            <div>
              <label className="text-xs tracking-[0.3em] text-[#2c2c2c]/40 uppercase block mb-3">Project Type</label>
              <div className="flex flex-wrap gap-2">
                {['Apartment', 'House', 'Office', 'Hotel Suite', 'Retail'].map(t => (
                  <button key={t} onClick={() => setProjectType(t)}
                    className="px-4 py-2 text-sm border transition-all duration-300"
                    style={{
                      background: projectType === t ? '#8b7355' : 'transparent',
                      borderColor: projectType === t ? '#8b7355' : 'rgba(44,44,44,0.15)',
                      color: projectType === t ? '#fff' : '#2c2c2c',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs tracking-[0.3em] text-[#2c2c2c]/40 uppercase">Total Area</label>
                <span style={{ color: '#8b7355' }}>{area} m²</span>
              </div>
              <input type="range" min={30} max={1000} value={area} onChange={e => setArea(Number(e.target.value))}
                className="w-full h-1 cursor-pointer" style={{ accentColor: '#8b7355' }} />
            </div>

            <div>
              <label className="text-xs tracking-[0.3em] text-[#2c2c2c]/40 uppercase block mb-3">Rooms to Design</label>
              <div className="flex flex-wrap gap-2">
                {rooms.map(r => (
                  <button key={r} onClick={() => toggleRoom(r)}
                    className="px-3 py-2 text-sm border transition-all duration-300"
                    style={{
                      background: selectedRooms.includes(r) ? '#8b7355' : 'transparent',
                      borderColor: selectedRooms.includes(r) ? '#8b7355' : 'rgba(44,44,44,0.15)',
                      color: selectedRooms.includes(r) ? '#fff' : '#2c2c2c',
                    }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs tracking-[0.3em] text-[#2c2c2c]/40 uppercase">Your Budget</label>
                <span style={{ color: '#8b7355' }}>€{budget.toLocaleString()}</span>
              </div>
              <input type="range" min={5000} max={500000} step={5000} value={budget} onChange={e => setBudget(Number(e.target.value))}
                className="w-full h-1 cursor-pointer" style={{ accentColor: '#8b7355' }} />
            </div>
          </div>

          <div className="p-8 border" style={{ background: '#fff', borderColor: '#8b7355' }}>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-[#2c2c2c]/40 tracking-widest uppercase">Project Estimate</p>
                <p className="text-xs text-[#2c2c2c]/30 mt-1">
                  {projectType && `${projectType} · `}{area} m² · {selectedRooms.length} room{selectedRooms.length !== 1 ? 's' : ''}
                </p>
              </div>
              <motion.div key={estimate} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl font-light" style={{ color: '#8b7355' }}>
                €{estimate.toLocaleString()}
              </motion.div>
            </div>
            <button style={{ background: 'linear-gradient(135deg, #8b7355, #c9a028)', color: '#fff', fontWeight: 700 }}
              className="w-full py-4 tracking-widest uppercase text-sm mt-6">
              Request a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-12 px-8 md:px-16" style={{ background: '#2c2c2c', borderColor: '#2c2c2c' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#c9a028' }}>ESPACE</div>
          <div className="text-xs text-white/30 tracking-wider">Paris · London · Monaco · Dubai</div>
          <div className="text-xs text-white/20">© 2026 Espace Interiors.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
