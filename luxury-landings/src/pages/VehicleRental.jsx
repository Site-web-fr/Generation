import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Cylinder, Sphere, Float, Torus, Stars, MeshDistortMaterial } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

// 3D stylized car model
function CarModel({ color }) {
  const groupRef = useRef()
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
  })
  const carColor = color || '#C9A84C'
  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.2}>
      {/* Body */}
      <Box args={[2.4, 0.5, 1.1]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color={carColor} metalness={0.95} roughness={0.05} />
      </Box>
      {/* Cabin */}
      <Box args={[1.4, 0.5, 1.0]} position={[0.1, 0.72, 0]}>
        <meshStandardMaterial color={carColor} metalness={0.9} roughness={0.1} />
      </Box>
      {/* Windshield */}
      <Box args={[0.05, 0.45, 0.9]} position={[0.79, 0.72, 0]}>
        <meshStandardMaterial color="#1a3a5c" metalness={0.1} roughness={0} transparent opacity={0.7} />
      </Box>
      {/* Rear window */}
      <Box args={[0.05, 0.45, 0.9]} position={[-0.59, 0.72, 0]}>
        <meshStandardMaterial color="#1a3a5c" metalness={0.1} roughness={0} transparent opacity={0.7} />
      </Box>
      {/* Hood */}
      <Box args={[0.8, 0.08, 1.05]} position={[0.82, 0.52, 0]}>
        <meshStandardMaterial color={carColor} metalness={0.95} roughness={0.05} />
      </Box>
      {/* Spoiler */}
      <Box args={[0.6, 0.12, 1.1]} position={[-1.0, 0.75, 0]}>
        <meshStandardMaterial color={carColor} metalness={0.9} roughness={0.1} />
      </Box>
      {/* Wheels */}
      {[[-0.85, -0.1, 0.6], [-0.85, -0.1, -0.6], [0.85, -0.1, 0.6], [0.85, -0.1, -0.6]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <Cylinder args={[0.32, 0.32, 0.2, 24]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.22, 12]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
          </Cylinder>
        </group>
      ))}
      {/* Headlights */}
      {[[1.21, 0.2, 0.35], [1.21, 0.2, -0.35]].map(([x, y, z], i) => (
        <Sphere key={i} args={[0.1, 12, 12]} position={[x, y, z]}>
          <meshStandardMaterial color="#FFF5E0" emissive="#FFF5E0" emissiveIntensity={2} />
        </Sphere>
      ))}
      {/* Ground shadow */}
      <Cylinder args={[1.5, 1.5, 0.01, 32]} position={[0, -0.42, 0]}>
        <meshStandardMaterial color="#000" transparent opacity={0.4} />
      </Cylinder>
    </group>
  )
}

function SceneEnv() {
  return (
    <>
      <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.3} />
      {[...Array(30)].map((_, i) => {
        const theta = (i / 30) * Math.PI * 2
        const r = 6
        return (
          <Float key={i} speed={0.3 + Math.random() * 0.5} floatIntensity={0.3}>
            <Sphere args={[0.02, 4, 4]} position={[Math.cos(theta) * r, Math.sin(i) * 1.5, Math.sin(theta) * r]}>
              <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={1} />
            </Sphere>
          </Float>
        )
      })}
    </>
  )
}

const cars = [
  {
    id: 1, make: 'Lamborghini', model: 'Huracán EVO', year: '2024',
    power: '640 HP', speed: '325 km/h', accel: '2.9s 0-100',
    price: 1800, color: '#FF4500', colorName: 'Arancio Borealis',
    category: 'Supercar', engine: 'V10 5.2L', seats: 2,
    features: ['Carbon Package', 'Lifting System', 'Sensonum Audio', 'Rear Camera'],
    emoji: '🟠'
  },
  {
    id: 2, make: 'Ferrari', model: '488 GTB', year: '2024',
    power: '670 HP', speed: '330 km/h', accel: '3.0s 0-100',
    price: 2100, color: '#CC0000', colorName: 'Rosso Corsa',
    category: 'Supercar', engine: 'V8 3.9L Turbo', seats: 2,
    features: ['F1-DCT Gearbox', 'Side Slip Control', 'Carbon Brakes', 'Track Mode'],
    emoji: '🔴'
  },
  {
    id: 3, make: 'Rolls-Royce', model: 'Ghost', year: '2024',
    power: '563 HP', speed: '250 km/h', accel: '4.8s 0-100',
    price: 2800, color: '#C0C0C0', colorName: 'Arctic White',
    category: 'Ultra-Luxury', engine: 'V12 6.75L Twin-Turbo', seats: 4,
    features: ['Starlight Headliner', 'Massage Seats', 'Champagne Cooler', 'Bespoke Audio'],
    emoji: '⚪'
  },
  {
    id: 4, make: 'Bentley', model: 'Continental GT', year: '2024',
    power: '659 HP', speed: '333 km/h', accel: '3.6s 0-100',
    price: 1600, color: '#1C2E4A', colorName: 'Beluga Black',
    category: 'Grand Tourer', engine: 'W12 6.0L Twin-Turbo', seats: 4,
    features: ['Naim Audio', 'Diamond Stitching', 'Night Vision', 'All-Wheel Drive'],
    emoji: '🔵'
  },
  {
    id: 5, make: 'McLaren', model: '720S', year: '2024',
    power: '720 HP', speed: '341 km/h', accel: '2.9s 0-100',
    price: 1950, color: '#FF8C00', colorName: 'Papaya Spark',
    category: 'Hypercar', engine: 'V8 4.0L M840T', seats: 2,
    features: ['Proactive Chassis', 'Carbon MonoCell', 'Electrochromic Roof', 'Track Telemetry'],
    emoji: '🟡'
  },
  {
    id: 6, make: 'Porsche', model: '911 GT3', year: '2024',
    power: '510 HP', speed: '318 km/h', accel: '3.4s 0-100',
    price: 1400, color: '#2E8B57', colorName: 'Python Green',
    category: 'Sports', engine: 'Flat-6 4.0L NA', seats: 2,
    features: ['PDK 7-Speed', 'Bucket Seats', 'Roll Cage Prep', 'Ceramic Brakes'],
    emoji: '🟢'
  },
]

const categories = ['All', 'Supercar', 'Hypercar', 'Ultra-Luxury', 'Grand Tourer', 'Sports']

export default function VehicleRental() {
  const [selectedCar, setSelectedCar] = useState(0)
  const [days, setDays] = useState(3)
  const [km, setKm] = useState(500)
  const [activeCategory, setActiveCategory] = useState('All')
  const [step, setStep] = useState(1)

  useEffect(() => {
    document.title = 'PrimeFleet — Ultra-Luxury Vehicle Rental'
  }, [])

  const car = cars[selectedCar]
  const extraKm = Math.max(0, km - days * 150) * 3
  const basePrice = car.price * days
  const total = basePrice + extraKm

  const filteredCars = activeCategory === 'All' ? cars : cars.filter(c => c.category === activeCategory)

  return (
    <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span className="font-cormorant text-xl font-bold tracking-wide gold-text">PrimeFleet</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Fleet', 'Configure', 'Services', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#configure" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Configure & Book
        </a>
      </nav>

      {/* Hero with 3D Car */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.15} />
            <pointLight position={[5, 5, 5]} intensity={3} color="#C9A84C" />
            <pointLight position={[-5, 3, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[0, -2, 3]} intensity={1} color="#ff4400" />
            <spotLight position={[0, 8, 4]} intensity={4} angle={0.3} penumbra={0.5} color="#C9A84C" />
            <SceneEnv />
            <CarModel color={car.color} />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-70" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Supercar Collection · Paris · Monaco · Cannes</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="gold-text">Drive</span><br />
            <span className="text-white">Legend</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Lamborghini. Ferrari. Rolls-Royce. McLaren. Configure your dream drive, 
            estimate your price instantly, and be behind the wheel in hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#configure" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Configure Your Drive
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#fleet" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              View Full Fleet
            </a>
          </div>

          <div className="flex gap-12 mt-16">
            {[['6', 'Supercars'], ['24h', 'Delivery'], ['0€', 'Hidden Fees']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Car info overlay */}
        <div className="absolute bottom-12 right-12 glass px-8 py-6 rounded-2xl hidden lg:block">
          <div className="text-xs font-dm text-[#C9A84C] tracking-widest uppercase mb-1">{car.category}</div>
          <div className="font-playfair text-2xl font-bold mb-1">{car.make}</div>
          <div className="text-white/40 font-dm text-sm mb-3">{car.model} · {car.year}</div>
          <div className="flex gap-6">
            {[['⚡', car.power], ['🏎', car.speed], ['0-100', car.accel]].map(([i, v]) => (
              <div key={v} className="text-center">
                <div className="text-sm font-dm text-white/80">{v}</div>
                <div className="text-xs text-white/30">{i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Our Collection</div>
              <h2 className="font-playfair text-5xl font-bold">Select Your<br /><span className="italic gold-text">Machine</span></h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-full text-xs font-dm tracking-wider uppercase transition-all hoverable ${
                    activeCategory === c ? 'bg-[#C9A84C] text-black' : 'glass text-white/40 hover:text-white border border-white/10'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((c, i) => {
              const idx = cars.findIndex(car => car.id === c.id)
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCar(idx)}
                  className={`group glass rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-1 hoverable ${
                    selectedCar === idx ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{c.emoji}</div>
                    <div className="text-right">
                      <div className="text-xs font-dm text-white/30 tracking-widest">{c.category}</div>
                      <div className="font-playfair text-xl font-bold gold-text">€{c.price.toLocaleString()}<span className="text-sm text-white/30">/day</span></div>
                    </div>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-0.5 group-hover:text-[#C9A84C] transition-colors">{c.make}</h3>
                  <p className="text-white/40 text-sm font-dm mb-4">{c.model} · {c.year}</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[['⚡', c.power], ['🏎', c.speed], ['⏱', c.accel]].map(([icon, val]) => (
                      <div key={val} className="text-center glass rounded-lg p-2">
                        <div className="text-xs font-dm text-white/60">{val}</div>
                        <div className="text-[10px] text-white/20">{icon}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.features.slice(0, 3).map(f => (
                      <span key={f} className="text-[10px] font-dm text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3D Configurator & Price Estimator */}
      <section id="configure" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Real-Time Configurator</div>
            <h2 className="font-playfair text-5xl font-bold">Build Your<br /><span className="italic gold-text">Perfect Drive</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Viewer */}
            <div className="glass rounded-3xl overflow-hidden h-[400px] relative">
              <Canvas camera={{ position: [0, 1, 5], fov: 45 }} style={{ background: 'transparent' }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[5, 5, 5]} intensity={3} color="#C9A84C" />
                <pointLight position={[-5, 3, 5]} intensity={2} color="#ffffff" />
                <pointLight position={[0, -2, 3]} intensity={1} />
                <CarModel color={car.color} />
              </Canvas>
              <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-full text-xs font-dm text-[#C9A84C]">
                360° View · Drag to rotate
              </div>
              <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full">
                <div className="text-xs font-dm text-white/60">{car.colorName}</div>
                <div className="flex gap-2 mt-1">
                  {cars.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCar(i)}
                      className="w-4 h-4 rounded-full border-2 transition-all hoverable"
                      style={{
                        background: c.color,
                        borderColor: selectedCar === i ? '#C9A84C' : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Configurator */}
            <div className="glass rounded-3xl p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{car.emoji}</div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold">{car.make} {car.model}</h3>
                    <p className="text-white/40 text-sm font-dm">{car.engine} · {car.power}</p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs tracking-widest text-white/30 uppercase font-dm">Duration</label>
                  <span className="text-[#C9A84C] font-dm font-bold">{days} day{days > 1 ? 's' : ''}</span>
                </div>
                <input type="range" min={1} max={30} value={days} onChange={e => setDays(+e.target.value)} className="w-full accent-[#C9A84C]" />
                <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                  <span>1 day</span><span>30 days</span>
                </div>
              </div>

              {/* KM Included: 150/day */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs tracking-widest text-white/30 uppercase font-dm">
                    Estimated Kilometers
                  </label>
                  <span className="text-[#C9A84C] font-dm font-bold">{km} km</span>
                </div>
                <input type="range" min={100} max={5000} step={50} value={km} onChange={e => setKm(+e.target.value)} className="w-full accent-[#C9A84C]" />
                <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                  <span>100 km</span>
                  <span className="text-[#C9A84C]/50">{days * 150} km included</span>
                  <span>5,000 km</span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="glass rounded-2xl p-6 mb-6 space-y-3">
                <div className="flex justify-between text-sm font-dm">
                  <span className="text-white/50">Base rental ({days} days)</span>
                  <span className="text-white">€{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-dm">
                  <span className="text-white/50">Included km ({days * 150} km)</span>
                  <span className="text-green-400">Included</span>
                </div>
                {extraKm > 0 && (
                  <div className="flex justify-between text-sm font-dm">
                    <span className="text-white/50">Extra km ({km - days * 150} km × €3)</span>
                    <span className="text-orange-400">€{extraKm.toLocaleString()}</span>
                  </div>
                )}
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-end">
                  <span className="font-dm text-white/70">Total Estimate</span>
                  <div className="text-right">
                    <div className="font-playfair text-3xl font-bold gold-text">€{total.toLocaleString()}</div>
                    <div className="text-white/30 text-xs font-dm">Insurance & delivery included</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#C9A84C] text-black py-4 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
                Reserve This Vehicle
              </button>
              <p className="text-center text-white/20 text-xs font-dm mt-3">
                Free cancellation 48h · Delivery to your location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">The PrimeFleet Experience</div>
            <h2 className="font-playfair text-5xl font-bold">Beyond the Keys</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚗', title: 'Doorstep Delivery', desc: 'Your car arrives at your hotel, villa, or airport within hours. Available 24/7.' },
              { icon: '📱', title: 'Concierge App', desc: 'Real-time tracking, breakdown support, itinerary planning — all in one app.' },
              { icon: '🛡️', title: 'Full Insurance', desc: 'Comprehensive coverage with zero excess options. Drive with complete peace of mind.' },
              { icon: '🏁', title: 'Track Days', desc: 'Exclusive access to private circuits. Push your car to the limit safely.' },
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
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-14 text-center">
          <h2 className="font-playfair text-5xl font-bold mb-4">Ready to Drive?</h2>
          <p className="text-white/40 font-dm mb-10">Our concierge is available 24/7 to arrange your perfect supercar experience.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
            {[['Full Name', 'Alexandre Durand'], ['Phone', '+33 6 XX XX XX XX'], ['Date', ''], ['Location', 'Paris, Monaco, Cannes...']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Contact Our Concierge
          </button>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">PrimeFleet</span>
          <p className="text-white/20 text-xs font-dm">© 2024 PrimeFleet · Ultra-Luxury Vehicle Rental · Paris · Monaco · Cannes</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
