import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Torus, Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

function GlobeScene() {
  const globeRef = useRef()
  const atmosphereRef = useRef()
  const ringsRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    globeRef.current.rotation.y = t * 0.1
    atmosphereRef.current.rotation.y = t * 0.08
    ringsRef.current.rotation.z = t * 0.05
  })

  // Route points on globe (simplified)
  const routes = [
    { from: [0.8, 0.6, 0.0], to: [-0.7, 0.5, 0.5] },
    { from: [0.3, -0.5, 0.8], to: [0.9, 0.1, -0.4] },
    { from: [-0.5, 0.3, 0.8], to: [0.6, -0.2, 0.8] },
  ]

  return (
    <>
      <Stars radius={100} depth={60} count={3000} factor={4} fade speed={0.3} />
      <Sphere ref={globeRef} args={[2.5, 64, 64]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#0a1628" wireframe={false} metalness={0.3} roughness={0.7} transparent opacity={0.8} />
      </Sphere>
      {/* Grid overlay */}
      <Sphere ref={atmosphereRef} args={[2.52, 32, 32]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#1a3a6e" wireframe metalness={0.1} roughness={0.9} transparent opacity={0.15} />
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere args={[2.7, 32, 32]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#1a4080" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>
      {/* Orbital rings */}
      <group ref={ringsRef} position={[2, 0, 0]}>
        <Torus args={[3.5, 0.01, 8, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.5} transparent opacity={0.4} />
        </Torus>
        <Torus args={[3.8, 0.005, 8, 100]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <meshStandardMaterial color="#4488ff" emissive="#4488ff" emissiveIntensity={0.3} transparent opacity={0.3} />
        </Torus>
      </group>
      {/* Route dots */}
      {[...Array(12)].map((_, i) => {
        const theta = (i / 12) * Math.PI * 2
        const phi = Math.PI / 3
        const r = 2.55
        return (
          <Float key={i} speed={0.5} floatIntensity={0.2}>
            <Sphere args={[0.03, 8, 8]} position={[2 + Math.sin(phi) * Math.cos(theta) * r, Math.cos(phi) * r * 0.5, Math.sin(phi) * Math.sin(theta) * r]}>
              <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={2} />
            </Sphere>
          </Float>
        )
      })}
    </>
  )
}

const aircraft = [
  {
    id: 1, name: 'Citation XLS+', category: 'Light Jet',
    range: '3,700 km', speed: '850 km/h', seats: 8, cruise: '13,000m',
    price: 4800, priceUnit: '/hr',
    features: ['Stand-up Cabin', 'WiFi', 'Galley', 'Lavatory'],
    perfect: 'Short to medium haul · Business travel',
    emoji: '✈️'
  },
  {
    id: 2, name: 'Challenger 350', category: 'Super Mid Jet',
    range: '5,900 km', speed: '870 km/h', seats: 10, cruise: '14,000m',
    price: 7200, priceUnit: '/hr',
    features: ['Flat-Bed Seats', 'HD Entertainment', 'Gourmet Kitchen', 'Shower'],
    perfect: 'Transatlantic · Family travel',
    emoji: '✈️'
  },
  {
    id: 3, name: 'Global 7500', category: 'Ultra Long Range',
    range: '14,260 km', speed: '956 km/h', seats: 19, cruise: '15,545m',
    price: 14500, priceUnit: '/hr',
    features: ['4 Living Spaces', 'Master Bedroom', 'Full Kitchen', 'Shower Suite'],
    perfect: 'Ultra-long range · VIP missions',
    emoji: '✈️'
  },
  {
    id: 4, name: 'ACJ TwoTwenty', category: 'VIP Airliner',
    range: '11,100 km', speed: '850 km/h', seats: 50, cruise: '13,000m',
    price: 22000, priceUnit: '/hr',
    features: ['Conference Room', 'Master Suite', 'Chef\'s Kitchen', 'Entertainment Deck'],
    perfect: 'Group travel · Diplomatic missions',
    emoji: '✈️'
  },
]

const popularRoutes = [
  { from: 'Paris (CDG)', to: 'Dubai (DXB)', distance: '5,250 km', time: '6h', price: '€42,000' },
  { from: 'London (LCY)', to: 'New York (TEB)', distance: '5,570 km', time: '7h30', price: '€58,000' },
  { from: 'Monaco (MCM)', to: 'St. Tropez (TTX)', distance: '80 km', time: '20min', price: '€8,500' },
  { from: 'Geneva (GVA)', to: 'Maldives (MLE)', distance: '8,200 km', time: '10h', price: '€92,000' },
]

export default function PrivateJet() {
  const [selectedAircraft, setSelectedAircraft] = useState(1)
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [pax, setPax] = useState(4)

  useEffect(() => {
    document.title = 'AeroPrivé — Private Aviation & Charter'
  }, [])

  const ac = aircraft[selectedAircraft]
  const estimatedPrice = ac.price * (pax <= ac.seats ? 1 : 1.2)

  return (
    <div className="bg-[#03050f] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <span className="text-lg">✈</span>
          <span className="font-cormorant text-xl font-bold tracking-wide gold-text">AeroPrivé</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Fleet', 'Routes', 'Services', 'Request'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#request" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Request Flight
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#C9A84C" />
            <pointLight position={[-5, 5, 5]} intensity={1} color="#4488ff" />
            <GlobeScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#03050f] via-[#03050f]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03050f] to-transparent opacity-70" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Global Private Aviation · 190+ Countries</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Your Sky.</span><br />
            <span className="italic gold-text">Always.</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Private jet charter with full discretion and total control. 
            Depart on your schedule from any of 40,000 airports worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#request" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Request a Flight
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#fleet" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              View Fleet
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['2h', 'Average Ready Time'], ['40,000', 'Airports Access'], ['100%', 'Discretion Guaranteed']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route planner */}
      <section id="routes" className="py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-6">Instant Route Estimator</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">From</label>
                <input type="text" placeholder="Paris, London, Dubai..."
                  value={fromCity} onChange={e => setFromCity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">To</label>
                <input type="text" placeholder="New York, Tokyo, Miami..."
                  value={toCity} onChange={e => setToCity(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Passengers: {pax}</label>
                <input type="range" min={1} max={50} value={pax} onChange={e => setPax(+e.target.value)} className="w-full accent-[#C9A84C]" />
              </div>
              <button className="w-full bg-[#C9A84C] text-black py-3 rounded-xl font-dm font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C97A] transition-colors hoverable">
                Get Quote
              </button>
            </div>
          </div>

          {/* Popular routes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map(r => (
              <div key={r.from} className="glass rounded-xl p-4 hover:border-[#C9A84C]/30 transition-all hoverable cursor-pointer">
                <div className="text-xs font-dm text-[#C9A84C] tracking-widest mb-2 uppercase">Popular Route</div>
                <div className="font-dm text-sm text-white">{r.from}</div>
                <div className="text-white/20 text-xs my-1">→</div>
                <div className="font-dm text-sm text-white">{r.to}</div>
                <div className="flex gap-4 mt-3 text-xs font-dm text-white/40">
                  <span>{r.time}</span>
                  <span>{r.distance}</span>
                </div>
                <div className="font-playfair text-lg font-bold gold-text mt-2">{r.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Our Aircraft</div>
            <h2 className="font-playfair text-5xl font-bold">The Right Aircraft<br /><span className="italic gold-text">For Every Mission</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aircraft.map((a, i) => (
              <div key={a.id} onClick={() => setSelectedAircraft(i)}
                className={`group glass rounded-2xl p-6 cursor-pointer transition-all duration-500 hoverable ${
                  selectedAircraft === i ? 'border-[#C9A84C]/50' : 'hover:border-white/20'
                }`}>
                <div className="text-3xl mb-3">{a.emoji}</div>
                <div className="text-xs font-dm text-[#C9A84C] tracking-widest uppercase mb-1">{a.category}</div>
                <h3 className="font-playfair text-xl font-bold mb-3 group-hover:text-[#C9A84C] transition-colors">{a.name}</h3>
                <div className="space-y-2 mb-4">
                  {[['Range', a.range], ['Speed', a.speed], ['Seats', a.seats + ' pax']].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs font-dm">
                      <span className="text-white/30">{k}</span>
                      <span className="text-white/70">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="font-playfair text-xl font-bold gold-text">€{a.price.toLocaleString()}<span className="text-sm text-white/30">{a.priceUnit}</span></div>
                <div className="text-white/30 text-xs font-dm mt-1">{a.perfect}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request */}
      <section id="request" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Book Your Flight</div>
            <h2 className="font-playfair text-5xl font-bold">Request a<br />Private Charter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[['Full Name', 'Alexandre de Beaumont'], ['Email', 'alexandre@domain.com'],
              ['Phone', '+33 6 XX XX XX XX'], ['Departure City', 'Paris (CDG)'],
              ['Destination', 'Dubai (DXB)'], ['Departure Date', '']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Aircraft Preference</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {aircraft.map((a, i) => (
                <button key={a.id} onClick={() => setSelectedAircraft(i)}
                  className={`p-3 rounded-xl text-xs font-dm transition-all hoverable text-left ${
                    selectedAircraft === i ? 'bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#C9A84C]' : 'glass border border-white/10 text-white/40'
                  }`}>
                  <div className="font-bold">{a.name}</div>
                  <div className="text-[10px] opacity-60">{a.category}</div>
                </button>
              ))}
            </div>
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Submit Flight Request
          </button>
          <p className="text-center text-white/20 text-xs font-dm mt-4">Response within 30 minutes · 24/7 availability</p>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">AeroPrivé</span>
          <p className="text-white/20 text-xs font-dm">© 2024 AeroPrivé · Private Aviation · Global</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
