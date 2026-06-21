import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Sphere, Float, Stars, MeshDistortMaterial, Cylinder } from '@react-three/drei'
import { Link } from 'react-router-dom'

function ArchScene() {
  const groupRef = useRef()
  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.4
  })
  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={2000} factor={3} fade speed={0.3} />
      {/* Room structure */}
      <Box args={[4, 3, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a0a08" side={1} roughness={0.9} />
      </Box>
      {/* Floor */}
      <Box args={[3.9, 0.05, 3.9]} position={[0, -1.47, 0]}>
        <meshStandardMaterial color="#8B7355" metalness={0.3} roughness={0.4} />
      </Box>
      {/* Sofa-like form */}
      <Box args={[1.8, 0.3, 0.7]} position={[0, -1.1, -1.2]}>
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </Box>
      <Box args={[1.8, 0.4, 0.15]} position={[0, -0.85, -1.5]}>
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </Box>
      {/* Coffee table */}
      <Box args={[0.8, 0.05, 0.5]} position={[0, -1.25, -0.4]}>
        <meshStandardMaterial color="#C9A84C" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Lamp */}
      <Cylinder args={[0.02, 0.02, 1.2, 8]} position={[1.2, -0.85, -0.8]}>
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Sphere args={[0.15, 16, 16]} position={[1.2, -0.25, -0.8]}>
        <meshStandardMaterial color="#FFF9E6" emissive="#FFF9E6" emissiveIntensity={2} />
      </Sphere>
      {/* Art piece on wall */}
      <Box args={[0.8, 0.6, 0.02]} position={[-0.5, 0.2, -1.94]}>
        <meshStandardMaterial color="#C9A84C" metalness={0.5} roughness={0.3} />
      </Box>
    </group>
  )
}

const styles = [
  { name: 'Contemporary Luxe', desc: 'Clean lines, premium materials, understated opulence', color: '#C9A84C', palette: ['#0a0a08', '#1a1a18', '#C9A84C', '#E8E8E0'] },
  { name: 'Art Deco Revival', desc: 'Geometric patterns, rich textures, dramatic contrasts', color: '#8B6914', palette: ['#1a0800', '#2a1500', '#C9A84C', '#8B6914'] },
  { name: 'Japandi Zen', desc: 'Wabi-sabi philosophy, natural materials, quiet luxury', color: '#8B7355', palette: ['#f5f5f0', '#e8e0d0', '#8B7355', '#3a3a30'] },
  { name: 'Neo-Classic', desc: 'Classical proportions, modern interpretation, timeless elegance', color: '#B8860B', palette: ['#f8f5f0', '#e0d8cc', '#B8860B', '#2a2018'] },
  { name: 'Dark Glamour', desc: 'Moody, dramatic, unapologetically bold statement spaces', color: '#4A235A', palette: ['#06030a', '#12081a', '#4A235A', '#C9A84C'] },
]

const rooms = [
  { name: 'Master Bedroom', icon: '🛏', price: '€45,000+' },
  { name: 'Living Room', icon: '🛋', price: '€60,000+' },
  { name: 'Kitchen & Dining', icon: '🍽', price: '€80,000+' },
  { name: 'Home Office', icon: '💼', price: '€25,000+' },
  { name: 'Bathroom Suite', icon: '🛁', price: '€35,000+' },
  { name: 'Wine Cellar', icon: '🍷', price: '€50,000+' },
]

const projects = [
  { name: 'Penthouse Monaco', type: 'Full Renovation', size: '480 m²', value: '€380,000', style: 'Contemporary Luxe' },
  { name: 'Villa Cap Ferrat', type: 'Interior Architecture', size: '850 m²', value: '€620,000', style: 'Neo-Classic' },
  { name: 'Private Yacht Interior', type: 'Marine Interior', size: '42m Yacht', value: '€290,000', style: 'Dark Glamour' },
  { name: 'Paris Haussmann Apt.', type: 'Full Renovation', size: '280 m²', value: '€195,000', style: 'Art Deco Revival' },
]

const team = [
  { name: 'Isabelle Fontaine', role: 'Principal Designer', experience: '20 years', projects: 180 },
  { name: 'Marc Delacour', role: 'Architectural Director', experience: '17 years', projects: 140 },
  { name: 'Yuki Tanaka', role: 'Senior Design Consultant', experience: '12 years', projects: 95 },
]

export default function InteriorDesign() {
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState(0)
  const [budget, setBudget] = useState(100)

  useEffect(() => {
    document.title = 'VistaAtelier — Luxury Interior Architecture'
  }, [])

  return (
    <div className="bg-[#06060a] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span className="font-cormorant text-xl font-bold tracking-wide gold-text">VistaAtelier</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Portfolio', 'Services', 'Process', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#contact" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Start a Project
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[2, 2, 3]} intensity={2} color="#FFF9E6" />
            <pointLight position={[-3, 2, 2]} intensity={1} color="#C9A84C" />
            <pointLight position={[0, -2, 3]} intensity={0.5} color="#fff" />
            <ArchScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060a] via-[#06060a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] to-transparent opacity-80" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Interior Architecture · Paris · Monaco · London</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Spaces</span><br />
            <span className="italic gold-text">That Breathe</span><br />
            <span className="text-white/30">Perfection</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Interior architecture for those who refuse to compromise. 
            From concept to completion — every detail curated with obsessive precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Start Your Project
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#portfolio" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              View Portfolio
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['180+', 'Projects'], ['20', 'Years'], ['8', 'Awards']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Selector */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Design Philosophy</div>
            <h2 className="font-playfair text-5xl font-bold">Find Your<br /><span className="italic gold-text">Style Language</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {styles.map((s, i) => (
              <button key={s.name} onClick={() => setSelectedStyle(i)}
                className={`group glass rounded-2xl p-4 text-left cursor-pointer transition-all duration-300 hoverable ${
                  selectedStyle === i ? 'border-[#C9A84C]/50' : 'hover:border-white/20'
                }`}>
                <div className="flex gap-2 mb-3">
                  {s.palette.map((c, j) => (
                    <div key={j} className="h-4 flex-1 rounded-sm" style={{ background: c }} />
                  ))}
                </div>
                <div className="font-playfair text-base font-bold mb-1 group-hover:text-[#C9A84C] transition-colors">{s.name}</div>
                <div className="text-white/40 text-xs font-dm">{s.desc}</div>
              </button>
            ))}
          </div>
          {/* Selected style preview */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-xs tracking-widest text-[#C9A84C] uppercase font-dm mb-3">{styles[selectedStyle].name}</div>
                <h3 className="font-playfair text-4xl font-bold mb-4">{styles[selectedStyle].desc}</h3>
                <div className="flex gap-2 mb-6">
                  {styles[selectedStyle].palette.map((c, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl border border-white/10" style={{ background: c }} />
                  ))}
                </div>
                <p className="text-white/40 font-dm text-sm leading-relaxed">
                  Our team specializes in crafting this aesthetic with museum-quality precision, 
                  sourcing rare materials from master craftsmen across Europe and Asia.
                </p>
              </div>
              <div className="h-48 rounded-2xl flex items-center justify-center overflow-hidden relative"
                style={{ background: `linear-gradient(135deg, ${styles[selectedStyle].palette[0]}, ${styles[selectedStyle].palette[1]})` }}>
                <div className="absolute inset-4 rounded-xl border flex items-center justify-center"
                  style={{ borderColor: styles[selectedStyle].color + '40' }}>
                  <div className="text-center">
                    <div className="font-cormorant text-4xl font-bold" style={{ color: styles[selectedStyle].color }}>
                      {styles[selectedStyle].name.split(' ')[0]}
                    </div>
                    <div className="text-xs font-dm tracking-widest" style={{ color: styles[selectedStyle].color + '80' }}>
                      {styles[selectedStyle].name.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Configurator */}
      <section className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#06060a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Project Builder</div>
            <h2 className="font-playfair text-5xl font-bold">Configure Your<br /><span className="italic gold-text">Dream Space</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {rooms.map((r, i) => (
              <button key={r.name} onClick={() => setSelectedRoom(i)}
                className={`group glass rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 hoverable ${
                  selectedRoom === i ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : 'hover:border-white/20'
                }`}>
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-dm text-xs text-white/60 group-hover:text-white transition-colors">{r.name}</div>
                <div className="font-playfair text-sm font-bold gold-text mt-1">{r.price}</div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="font-playfair text-2xl font-bold mb-2">{rooms[selectedRoom].name}</h3>
              <div className="gold-text font-dm mb-6">Starting from {rooms[selectedRoom].price}</div>
              <div className="mb-6">
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">
                  Budget: €{budget.toLocaleString()}k
                </label>
                <input type="range" min={20} max={500} step={10} value={budget}
                  onChange={e => setBudget(+e.target.value)}
                  className="w-full accent-[#C9A84C]" />
                <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                  <span>€20k</span><span>€500k+</span>
                </div>
              </div>
              <div className="space-y-3">
                {['Premium materials selection', 'Full 3D visualization', 'Project management', 'Master craftsmen network'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm font-dm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-xs font-dm text-white/30 tracking-widest uppercase mb-2">Your Project Estimate</div>
              <div className="font-playfair text-5xl font-bold gold-text mb-2">€{budget}k</div>
              <div className="text-white/40 font-dm text-sm mb-6">
                {rooms[selectedRoom].name} · {styles[selectedStyle].name}
              </div>
              <div className="space-y-3 mb-6">
                {[['Design & Architecture', `€${Math.round(budget * 0.25)}k`],
                  ['Materials & Furnishings', `€${Math.round(budget * 0.55)}k`],
                  ['Installation & Finishing', `€${Math.round(budget * 0.2)}k`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm font-dm">
                    <span className="text-white/40">{k}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#C9A84C] text-black py-4 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Recent Work</div>
            <h2 className="font-playfair text-5xl font-bold">Selected Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(p => (
              <div key={p.name} className="group glass rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all duration-500">
                <div className="h-32 rounded-xl mb-4 bg-gradient-to-br from-[#1a1400] to-[#0a0800] flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-cormorant text-3xl font-bold gold-text">{p.name.charAt(0)}</div>
                    <div className="text-white/20 text-xs font-dm">{p.style}</div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-playfair text-xl font-bold group-hover:text-[#C9A84C] transition-colors">{p.name}</h3>
                    <p className="text-white/40 text-sm font-dm">{p.type} · {p.size}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-playfair text-lg font-bold gold-text">{p.value}</div>
                    <div className="text-white/30 text-xs font-dm">{p.style}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Start Your Project</div>
            <h2 className="font-playfair text-5xl font-bold">Let's Create<br /><span className="italic gold-text">Something Extraordinary</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[['Full Name', 'Alexandre Fontaine'], ['Email', 'alexandre@email.com'],
              ['Phone', '+33 6 XX XX XX XX'], ['Project Location', 'Paris, Monaco, London...'],
              ['Property Size', '200 m², 500 m²...'], ['Budget Range', '€50k, €200k+...']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Request a Consultation
          </button>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">VistaAtelier</span>
          <p className="text-white/20 text-xs font-dm">© 2024 VistaAtelier · Luxury Interior Architecture · Paris</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
