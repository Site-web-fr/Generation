import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Cylinder, Sphere, Float, Stars, MeshDistortMaterial, Torus } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

// 3D Rotating bottle
function BottleScene({ color }) {
  const groupRef = useRef()
  const bottleRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.3
    glowRef.current.material.distort = Math.abs(Math.sin(t * 0.3)) * 0.4 + 0.2
  })

  const bottleColor = color || '#6C1433'

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Bottle body */}
      <Cylinder ref={bottleRef} args={[0.35, 0.4, 2, 32]} position={[0, -0.3, 0]}>
        <meshStandardMaterial color={bottleColor} metalness={0.3} roughness={0.1} transparent opacity={0.9} />
      </Cylinder>
      {/* Bottle neck */}
      <Cylinder args={[0.12, 0.35, 0.6, 32]} position={[0, 1.05, 0]}>
        <meshStandardMaterial color={bottleColor} metalness={0.3} roughness={0.1} transparent opacity={0.9} />
      </Cylinder>
      {/* Top neck */}
      <Cylinder args={[0.1, 0.12, 0.5, 32]} position={[0, 1.6, 0]}>
        <meshStandardMaterial color={bottleColor} metalness={0.3} roughness={0.1} transparent opacity={0.9} />
      </Cylinder>
      {/* Cork/capsule */}
      <Cylinder args={[0.11, 0.11, 0.15, 32]} position={[0, 1.92, 0]}>
        <meshStandardMaterial color="#8B6914" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* Label */}
      <Cylinder args={[0.401, 0.401, 0.8, 32]} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#F5F0E8" transparent opacity={0.9} side={THREE.FrontSide} />
      </Cylinder>
      {/* Label decoration */}
      <Cylinder args={[0.402, 0.402, 0.05, 32]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.3} side={THREE.FrontSide} />
      </Cylinder>
      <Cylinder args={[0.402, 0.402, 0.05, 32]} position={[0, -0.7, 0]}>
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.3} side={THREE.FrontSide} />
      </Cylinder>
      {/* Glow sphere */}
      <Sphere ref={glowRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial color={bottleColor} distort={0.3} speed={1} transparent opacity={0.06} />
      </Sphere>
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => {
        const theta = (i / 30) * Math.PI * 2
        const r = 1.8
        return (
          <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.5}>
            <Sphere args={[0.015, 4, 4]} position={[Math.cos(theta) * r, Math.sin(i * 0.7) * 1.5, Math.sin(theta) * r]}>
              <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={1.5} />
            </Sphere>
          </Float>
        )
      })}
    </group>
  )
}

const collections = [
  {
    id: 1, name: 'Pétrus 2015', type: 'Red Wine', region: 'Pomerol, Bordeaux',
    vintage: 2015, score: '100/100 Parker', price: '€5,400', bottle: '75cl',
    color: '#6C1433', bottleColor: '#3d0a1e',
    notes: 'Truffles, black cherry, cassis, graphite',
    grapes: 'Merlot 95%, Cabernet Franc 5%',
    cellaring: '30+ years',
    desc: 'The most celebrated wine of the right bank. Liquid perfection.'
  },
  {
    id: 2, name: 'Dom Pérignon P2 2004', type: 'Champagne', region: 'Épernay, Champagne',
    vintage: 2004, score: '99/100 Wine Spectator', price: '€380', bottle: '75cl',
    color: '#F4D03F', bottleColor: '#1a1a00',
    notes: 'White truffle, smoked almond, citrus, brioche',
    grapes: 'Pinot Noir, Chardonnay',
    cellaring: '20+ years',
    desc: 'The P2 plénitude: a transcendental experience in every sip.'
  },
  {
    id: 3, name: 'Macallan 50 Years', type: 'Scotch Whisky', region: 'Speyside, Scotland',
    vintage: 1967, score: '98/100', price: '€38,000', bottle: '70cl',
    color: '#D4A017', bottleColor: '#3d2000',
    notes: 'Dried fruits, orange peel, ginger, dark chocolate',
    grapes: 'Single Malt Scotch',
    cellaring: 'Ready to drink',
    desc: 'Half a century of patience distilled into one extraordinary dram.'
  },
  {
    id: 4, name: 'Hennessy Paradis Impérial', type: 'Cognac', region: 'Cognac, France',
    vintage: 'Blend', score: '96/100', price: '€2,800', bottle: '70cl',
    color: '#B8860B', bottleColor: '#2d1800',
    notes: 'Jasmine, iris, candied orange, sandalwood',
    grapes: 'Grande Champagne, Petite Champagne',
    cellaring: 'Ready to drink',
    desc: 'Imperial perfection. Created for emperors, savored by the world\'s elite.'
  },
]

const pairings = {
  'Red Wine': ['Wagyu A5 Beef', 'Black Truffle Risotto', 'Aged Parmesan', 'Dark Chocolate 85%'],
  'Champagne': ['Beluga Caviar', 'Oysters', 'Lobster Thermidor', 'Strawberries & Cream'],
  'Scotch Whisky': ['Smoked Salmon', 'Blue Cheese', 'Dark Chocolate', 'Dried Figs'],
  'Cognac': ['Foie Gras', 'Vanilla Crème Brûlée', 'Tiramisu', 'Peach Tatin'],
}

export default function WineSpirits() {
  const [selected, setSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const wine = collections[selected]

  useEffect(() => {
    document.title = 'CellarMaître — Fine Wines & Grand Spirits'
  }, [])

  return (
    <div className="bg-[#080208] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <span className="text-lg">🍷</span>
          <span className="font-cormorant text-xl font-bold tracking-wide" style={{background:'linear-gradient(135deg,#C9A84C,#6C1433)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>CellarMaître</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Wines', 'Spirits', 'Pairings', 'Cellar', 'Order'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#order" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Request Allocation
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[3, 5, 5]} intensity={3} color="#C9A84C" />
            <pointLight position={[-3, -2, 4]} intensity={1} color={wine.color} />
            <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.3} />
            <BottleScene color={wine.bottleColor} />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080208] via-[#080208]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080208] to-transparent opacity-80" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Fine Wine & Spirits · Curated Excellence</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">The Art</span><br />
            <span className="italic gold-text">of the</span><br />
            <span className="text-white">Cellar</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Ultra-rare bottles from the world's finest estates. 
            Private allocations, cellar management, and bespoke curation for true connoisseurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#wines" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Explore Collection
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#order" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              Request Allocation
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['12,000+', 'References'], ['€50M+', 'In Cellar'], ['1855', 'Heritage Year']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Bottle Rotator & Collection */}
      <section id="wines" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Rare Collection</div>
            <h2 className="font-playfair text-5xl font-bold">Icons of the<br /><span className="italic gold-text">Wine World</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Bottle Viewer */}
            <div className="glass rounded-3xl overflow-hidden h-[500px] relative">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.15} />
                <pointLight position={[3, 5, 5]} intensity={3} color="#C9A84C" />
                <pointLight position={[-3, -2, 4]} intensity={1.5} color={wine.color} />
                <BottleScene color={wine.bottleColor} />
              </Canvas>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <div className="glass px-6 py-3 rounded-full">
                  <div className="text-xs font-dm text-[#C9A84C] tracking-widest">{wine.type}</div>
                  <div className="font-playfair text-lg font-bold">{wine.name}</div>
                </div>
              </div>
            </div>

            {/* Wine Details */}
            <div className="flex flex-col gap-4">
              {/* Bottle selector */}
              <div className="grid grid-cols-2 gap-3">
                {collections.map((c, i) => (
                  <button key={c.id} onClick={() => setSelected(i)}
                    className={`group glass rounded-xl p-4 text-left transition-all duration-300 hoverable ${
                      selected === i ? 'border-[#C9A84C]/50' : 'hover:border-white/20'
                    }`}>
                    <div className="text-xs font-dm tracking-widest uppercase mb-1" style={{ color: c.color }}>{c.type}</div>
                    <div className="font-playfair text-base font-bold group-hover:text-[#C9A84C] transition-colors">{c.name}</div>
                    <div className="font-playfair text-lg font-bold gold-text mt-1">{c.price}</div>
                  </button>
                ))}
              </div>

              {/* Wine details */}
              <div className="glass rounded-2xl p-6 flex-1">
                <div className="text-xs font-dm text-[#C9A84C] tracking-widest uppercase mb-2">{wine.score}</div>
                <h3 className="font-playfair text-3xl font-bold mb-1">{wine.name}</h3>
                <p className="text-white/40 font-dm text-sm mb-4">{wine.region} · {wine.vintage}</p>
                <p className="text-white/60 font-dm text-sm italic mb-4">"{wine.desc}"</p>
                <div className="space-y-3 mb-4">
                  {[['Tasting Notes', wine.notes], ['Grapes', wine.grapes], ['Cellaring', wine.cellaring]].map(([k, v]) => (
                    <div key={k} className="flex gap-3 text-sm font-dm">
                      <span className="text-white/30 w-28 flex-shrink-0">{k}</span>
                      <span className="text-white/70">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Pairing */}
                <div className="bg-[#C9A84C]/5 rounded-xl p-4 border border-[#C9A84C]/20 mb-4">
                  <div className="text-xs font-dm text-[#C9A84C] tracking-widest uppercase mb-2">Perfect Pairings</div>
                  <div className="flex flex-wrap gap-2">
                    {(pairings[wine.type] || []).map(p => (
                      <span key={p} className="text-xs font-dm text-white/60 bg-white/5 px-3 py-1 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>

                {/* Order */}
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-xs font-dm text-white/30 mb-1">Quantity</div>
                    <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#C9A84C] hoverable">−</button>
                      <span className="font-dm text-white w-4 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="text-[#C9A84C] hoverable">+</button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-dm text-white/30 mb-1">Total</div>
                    <div className="font-playfair text-2xl font-bold gold-text">
                      {wine.price.replace('€', '€').split('.')[0].replace(/\d+/, n => (parseInt(n) * quantity).toLocaleString())}
                    </div>
                  </div>
                  <button className="bg-[#C9A84C] text-black px-6 py-3 rounded-xl font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-colors hoverable">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cellar Services */}
      <section id="cellar" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#080208]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Services</div>
            <h2 className="font-playfair text-5xl font-bold">Your Personal<br /><span className="italic gold-text">Cave Master</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏛', title: 'Private Cellar', desc: 'Secure climate-controlled storage in our bonded warehouse. Full insurance and inventory management.' },
              { icon: '🔍', title: 'Sourcing & Allocation', desc: 'Access to the world\'s most sought-after releases. DRC, Pétrus, Masseto — we secure your allocation.' },
              { icon: '📈', title: 'Investment Advisory', desc: 'Wine as an asset class. Portfolio construction, valuation, and strategic trading.' },
              { icon: '🎁', title: 'Curation & Gifting', desc: 'Bespoke bottle selection for corporate gifts, weddings, or personal collections.' },
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

      {/* Order/Contact */}
      <section id="order" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Private Allocation</div>
            <h2 className="font-playfair text-5xl font-bold">Request Your<br /><span className="italic gold-text">Curation</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[['Full Name', 'Alexandre Beauchamp'], ['Email', 'alexandre@domain.com'],
              ['Phone', '+33 6 XX XX XX XX'], ['Budget Range', '€5k, €50k, €500k+'],
              ['Preferred Types', 'Bordeaux, Burgundy, Whisky...'], ['Occasion', 'Collection, Gift, Investment...']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Request Private Consultation
          </button>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">CellarMaître</span>
          <p className="text-white/20 text-xs font-dm">© 2024 CellarMaître · Fine Wines & Grand Spirits · Paris · London</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
