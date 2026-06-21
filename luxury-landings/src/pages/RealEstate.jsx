import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Cylinder, Float, Stars, Environment, Plane } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

function ArchitecturalScene() {
  const groupRef = useRef()
  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.3 + 0.2
  })
  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Main tower */}
      <Box args={[1.2, 4, 1.2]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
      </Box>
      {/* Tower windows */}
      {[...Array(6)].map((_, i) => (
        <Box key={i} args={[1.25, 0.08, 1.25]} position={[0, 0.5 + i * 0.6, 0]}>
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
        </Box>
      ))}
      {/* Side buildings */}
      <Box args={[0.7, 2.5, 0.7]} position={[-1.2, 1.25, 0.3]}>
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
      </Box>
      <Box args={[0.6, 3, 0.6]} position={[1.3, 1.5, -0.2]}>
        <meshStandardMaterial color="#0f0f1a" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
      </Box>
      {/* Ground plane */}
      <Plane args={[8, 8]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a0a14" metalness={0.6} roughness={0.4} />
      </Plane>
    </group>
  )
}

const properties = [
  {
    id: 1, name: 'Villa Lumière', location: 'Cap Ferrat, French Riviera',
    price: '€ 24,500,000', size: '850 m²', rooms: 7, type: 'Villa',
    features: ['Infinity Pool', 'Private Beach', 'Helipad', 'Wine Cave'],
    tag: 'Exclusive'
  },
  {
    id: 2, name: 'Penthouse Elysée', location: 'Avenue Montaigne, Paris 8ème',
    price: '€ 18,200,000', size: '620 m²', rooms: 5, type: 'Penthouse',
    features: ['Rooftop Terrace', 'Eiffel View', 'Private Lift', 'Spa'],
    tag: 'Off-Market'
  },
  {
    id: 3, name: 'Château des Alpes', location: 'Megève, French Alps',
    price: '€ 31,000,000', size: '1,200 m²', rooms: 10, type: 'Château',
    features: ['Ski-in/Ski-out', 'Cinema', 'Indoor Pool', 'Staff Quarters'],
    tag: 'Rare'
  },
  {
    id: 4, name: 'The Grand Monaco', location: 'Monte-Carlo, Monaco',
    price: '€ 42,000,000', size: '480 m²', rooms: 4, type: 'Apartment',
    features: ['Harbor View', 'Concierge 24/7', 'Private Garage', 'Sea Terrace'],
    tag: 'Ultra Prime'
  },
]

const filters = ['All', 'Villas', 'Penthouses', 'Châteaux', 'Off-Market']

export default function RealEstate() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeProperty, setActiveProperty] = useState(0)
  const [budget, setBudget] = useState(20)

  useEffect(() => {
    document.title = 'LuxEstate — Ultra-Premium Real Estate'
  }, [])

  return (
    <div className="bg-[#07070e] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="font-cormorant text-xl font-bold tracking-wide gold-text">LuxEstate</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Properties', 'Locations', 'Services', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#contact" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Private Access
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 10, 5]} intensity={3} color="#C9A84C" />
            <pointLight position={[-5, 5, 5]} intensity={1} color="#4444ff" />
            <spotLight position={[0, 8, 4]} intensity={2} angle={0.3} penumbra={0.5} color="#ffffff" />
            <Stars radius={80} depth={60} count={2000} factor={3} fade speed={0.5} />
            <ArchitecturalScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070e] via-[#07070e]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070e] via-transparent to-transparent" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Off-Market · Discrete · Global</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Estates</span><br />
            <span className="italic gold-text">Beyond</span><br />
            <span className="text-white/40">Compare</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Access the world's most exclusive off-market properties. 
            Villas, penthouses, châteaux — curated for ultra-high-net-worth individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#properties" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Explore Properties
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              Private Consultation
            </a>
          </div>

          <div className="flex gap-12 mt-16">
            {[['€2.1B+', 'Portfolio Value'], ['340+', 'Transactions'], ['68', 'Countries']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Search */}
      <section className="py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Location</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-dm text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors">
                  <option className="bg-[#0A0A0A]">All Locations</option>
                  <option className="bg-[#0A0A0A]">French Riviera</option>
                  <option className="bg-[#0A0A0A]">Paris</option>
                  <option className="bg-[#0A0A0A]">Monaco</option>
                  <option className="bg-[#0A0A0A]">Alps</option>
                  <option className="bg-[#0A0A0A]">Ibiza</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Property Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-dm text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors">
                  <option className="bg-[#0A0A0A]">All Types</option>
                  <option className="bg-[#0A0A0A]">Villa</option>
                  <option className="bg-[#0A0A0A]">Penthouse</option>
                  <option className="bg-[#0A0A0A]">Château</option>
                  <option className="bg-[#0A0A0A]">Private Estate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">
                  Budget: up to €{budget}M
                </label>
                <input
                  type="range" min={5} max={100} step={5} value={budget}
                  onChange={e => setBudget(+e.target.value)}
                  className="w-full accent-[#C9A84C]"
                />
              </div>
              <button className="w-full bg-[#C9A84C] text-black py-3 rounded-xl font-dm font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C97A] transition-colors hoverable">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-playfair text-4xl font-bold">Featured <span className="italic text-[#C9A84C]">Estates</span></h2>
            <div className="flex gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-dm tracking-widest uppercase transition-all hoverable ${
                    activeFilter === f ? 'bg-[#C9A84C] text-black' : 'glass text-white/40 hover:text-white border border-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Property showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Main featured */}
            <div className="lg:col-span-3 group glass rounded-2xl overflow-hidden cursor-pointer hoverable" onClick={() => setActiveProperty(0)}>
              <div className="relative h-72 bg-gradient-to-br from-[#1a0f00] to-[#0f0800] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/10 to-transparent" />
                {/* Architectural visualization */}
                <div className="relative z-10 text-center">
                  <div className="w-32 h-48 mx-auto relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-40 bg-gradient-to-t from-[#C9A84C]/30 to-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-sm" />
                    <div className="absolute bottom-0 left-0 w-10 h-28 bg-gradient-to-t from-[#8B6914]/20 to-transparent border border-white/5 rounded-sm" />
                    <div className="absolute bottom-0 right-0 w-10 h-32 bg-gradient-to-t from-[#8B6914]/20 to-transparent border border-white/5 rounded-sm" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-[#C9A84C] text-black text-xs font-dm font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                  {properties[activeProperty].tag}
                </div>
                <div className="absolute bottom-4 right-4 glass px-4 py-2 rounded-full">
                  <span className="text-[#C9A84C] font-playfair text-lg font-bold">{properties[activeProperty].price}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-2xl font-bold mb-1 group-hover:text-[#C9A84C] transition-colors">{properties[activeProperty].name}</h3>
                <p className="text-white/40 text-sm font-dm mb-4">{properties[activeProperty].location}</p>
                <div className="flex gap-6 mb-4 text-sm font-dm text-white/50">
                  <span>{properties[activeProperty].size}</span>
                  <span>{properties[activeProperty].rooms} Rooms</span>
                  <span>{properties[activeProperty].type}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {properties[activeProperty].features.map(f => (
                    <span key={f} className="text-xs font-dm text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Side properties */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {properties.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProperty(i)}
                  className={`group glass rounded-xl p-5 cursor-pointer transition-all duration-300 hoverable ${
                    activeProperty === i ? 'border-[#C9A84C]/50' : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-dm text-[#C9A84C] tracking-widest uppercase mb-1">{p.tag}</div>
                      <h4 className="font-playfair text-lg font-bold group-hover:text-[#C9A84C] transition-colors">{p.name}</h4>
                      <p className="text-white/30 text-xs font-dm">{p.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-playfair text-sm font-bold text-[#C9A84C]">{p.price}</div>
                      <div className="text-white/30 text-xs font-dm">{p.size}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#05050a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">White-Glove Service</div>
            <h2 className="font-playfair text-5xl font-bold">Beyond the Transaction</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔒', title: 'Off-Market Access', desc: 'Exclusive properties never listed publicly. Discretion guaranteed.' },
              { icon: '✈️', title: 'Private Viewings', desc: 'Helicopter tours, private jet transfers to any property worldwide.' },
              { icon: '⚖️', title: 'Legal & Tax', desc: 'Full legal support, tax optimization strategies, cross-border expertise.' },
              { icon: '🏗️', title: 'Interior Design', desc: 'Complete turnkey renovation with our network of master artisans.' },
            ].map(s => (
              <div key={s.title} className="group glass rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all duration-500">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-playfair text-xl font-bold mb-3 group-hover:text-[#C9A84C] transition-colors">{s.title}</h3>
                <p className="text-white/40 text-sm font-dm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16 text-center">
          <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Request Access</div>
          <h2 className="font-playfair text-5xl font-bold mb-4">Private Portfolio<br />Access</h2>
          <p className="text-white/40 font-dm mb-10">Gain exclusive access to our off-market listings. Available to qualified buyers only.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
            {[['Full Name', 'Alexandre de Montfort'], ['Email', 'alexandre@family-office.com'],
              ['Phone', '+33 1 XX XX XX XX'], ['Investment Budget', '€ 10M – €50M+']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Request Private Access
          </button>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">LuxEstate</span>
          <p className="text-white/20 text-xs font-dm">© 2024 LuxEstate. Ultra-Premium Real Estate · Global</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
