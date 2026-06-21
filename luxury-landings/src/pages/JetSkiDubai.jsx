import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Sphere, Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

function WaterScene() {
  const meshRef = useRef()
  const count = 3000
  const positions = useRef(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return arr
  })

  const waterRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    waterRef.current.rotation.z = t * 0.05
    waterRef.current.material.distort = Math.sin(t * 0.5) * 0.3 + 0.4
    meshRef.current.rotation.y = t * 0.03
  })

  return (
    <>
      <Sphere ref={waterRef} args={[12, 64, 64]} position={[0, -8, 0]}>
        <MeshDistortMaterial color="#004080" distort={0.4} speed={2} roughness={0.1} metalness={0.3} transparent opacity={0.5} wireframe />
      </Sphere>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions.current()} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#00BFFF" transparent opacity={0.8} sizeAttenuation />
      </points>
      {/* Speed rings */}
      {[3, 4.5, 6].map((r, i) => (
        <Float key={i} speed={0.5 + i * 0.2} floatIntensity={0.5}>
          <Torus args={[r, 0.02, 8, 60]} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1 - i * 0.3, 0]}>
            <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.5} transparent opacity={0.3 - i * 0.07} />
          </Torus>
        </Float>
      ))}
    </>
  )
}

const jetskis = [
  {
    id: 1, name: 'Sea-Doo RXT-X 325', power: '325 HP', topSpeed: '80 km/h',
    capacity: '3 persons', price: 250, tag: 'Champion', color: '#FF4500',
    features: ['Launch Control', 'Bluetooth Audio', 'Fish Finder', 'GPS Navigation'],
    emoji: '🔴'
  },
  {
    id: 2, name: 'Yamaha FX SVHO', power: '250 HP', topSpeed: '72 km/h',
    capacity: '3 persons', price: 200, tag: 'Elite', color: '#1E90FF',
    features: ['Cruise Control', 'Trim System', 'RiDE Technology', 'Multi-Mount'],
    emoji: '🔵'
  },
  {
    id: 3, name: 'Kawasaki Ultra 310LX', power: '310 HP', topSpeed: '78 km/h',
    capacity: '3 persons', price: 230, tag: 'Legend', color: '#228B22',
    features: ['ERGO-FIT Seats', 'KQS Steering', 'Smart Cruise', 'LED Display'],
    emoji: '🟢'
  },
  {
    id: 4, name: 'Sea-Doo GTX 300', power: '300 HP', topSpeed: '75 km/h',
    capacity: '3 persons', price: 220, tag: 'Premium', color: '#9400D3',
    features: ['iBR Braking', 'VTS System', 'Sound System', 'Tow Hook'],
    emoji: '🟣'
  },
]

const experiences = [
  { name: 'Burj Al Arab Tour', duration: '2h', km: '30 km', price: 580, desc: 'Circle the iconic sail hotel from the sea' },
  { name: 'Palm Jumeirah Circuit', duration: '3h', km: '50 km', price: 720, desc: 'Explore the world\'s most famous artificial island' },
  { name: 'Dubai Marina Sunset', duration: '1.5h', km: '20 km', price: 420, desc: 'Breathtaking golden hour on Dubai\'s waterfront' },
  { name: 'Atlantis & The World', duration: '4h', km: '70 km', price: 980, desc: 'Epic journey to Atlantis hotel and The World islands' },
]

export default function JetSkiDubai() {
  const [selectedJetski, setSelectedJetski] = useState(0)
  const [hours, setHours] = useState(2)
  const [passengers, setPassengers] = useState(1)
  const [selectedExp, setSelectedExp] = useState(null)

  useEffect(() => {
    document.title = 'WaveRider Dubai — Premium Jet Ski Rental'
  }, [])

  const total = selectedExp
    ? experiences[selectedExp].price
    : jetskis[selectedJetski].price * hours

  return (
    <div className="bg-[#030810] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <span className="text-xl">🌊</span>
          <span className="font-cormorant text-xl font-bold tracking-wide" style={{background:'linear-gradient(135deg,#00BFFF,#006994)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>WaveRider</span>
          <span className="text-xs font-dm text-white/30 tracking-widest">DUBAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Fleet', 'Experiences', 'Book', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#00BFFF] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#book" className="glass px-6 py-3 rounded-full text-sm font-dm border border-[#00BFFF]/30 text-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all hoverable">
          Book Now
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 2, 10], fov: 55 }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.15} />
            <pointLight position={[0, 10, 5]} intensity={3} color="#00BFFF" />
            <pointLight position={[-5, 5, 5]} intensity={1} color="#FFD700" />
            <Stars radius={100} depth={50} count={1500} factor={3} fade speed={0.3} />
            <WaterScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030810] via-[#030810]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030810] to-transparent opacity-80" />

        {/* Dubai skyline silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,80 L50,80 L50,40 L60,40 L60,20 L70,20 L70,40 L80,40 L80,0 L90,0 L90,40 L100,40 L100,80 L150,80 L150,30 L165,30 L165,80 L200,80 L200,50 L210,50 L210,30 L220,30 L220,50 L230,50 L230,80 L300,80 L300,20 L320,20 L320,80 L400,80 L400,10 L415,10 L415,5 L430,5 L430,10 L445,10 L445,80 L500,80 L500,40 L520,40 L520,80 L600,80 L600,25 L620,25 L620,15 L640,15 L640,25 L660,25 L660,80 L700,80 L700,50 L720,50 L720,80 L800,80 L800,35 L815,35 L815,80 L900,80 L900,20 L920,20 L920,80 L1000,80 L1000,45 L1020,45 L1020,80 L1200,80 L1200,120 L0,120 Z" fill="white"/>
          </svg>
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#00BFFF]" />
            <span className="text-xs tracking-[0.4em] text-[#00BFFF] uppercase font-dm">Dubai Marine · Est. 2019</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Ride</span><br />
            <span className="italic" style={{background:'linear-gradient(135deg,#00BFFF,#006994)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>the Gulf</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Conquer Dubai's iconic waters on the world's most powerful jet skis. 
            Burj Al Arab, Palm Jumeirah, and beyond — at 80 km/h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#book" className="group flex items-center gap-4 py-4 px-8 rounded-full font-dm font-semibold text-sm tracking-wider uppercase transition-all duration-300 hoverable"
              style={{background:'linear-gradient(135deg,#00BFFF,#006994)', color:'#fff'}}>
              Book Your Ride
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#fleet" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#00BFFF]/50 hover:text-white transition-all duration-300 hoverable">
              Explore Fleet
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['325 HP', 'Max Power'], ['80 km/h', 'Top Speed'], ['4.9★', 'Customer Rating']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold" style={{background:'linear-gradient(135deg,#00BFFF,#006994)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#00BFFF] uppercase font-dm mb-4">Our Fleet</div>
            <h2 className="font-playfair text-5xl font-bold">World-Class<br /><span className="italic text-[#00BFFF]">Machines</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jetskis.map((j, i) => (
              <div
                key={j.id}
                onClick={() => setSelectedJetski(i)}
                className={`group glass rounded-2xl p-6 cursor-pointer transition-all duration-500 hoverable ${
                  selectedJetski === i ? 'border-[#00BFFF]/50 bg-[#00BFFF]/5' : 'hover:border-white/20'
                }`}
              >
                <div className="text-4xl mb-4">{j.emoji}</div>
                <div className="text-xs font-dm tracking-widest text-[#00BFFF] uppercase mb-1">{j.tag}</div>
                <h3 className="font-playfair text-lg font-bold mb-3 leading-tight">{j.name}</h3>
                <div className="space-y-2 mb-4">
                  {[['Power', j.power], ['Top Speed', j.topSpeed], ['Capacity', j.capacity]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs font-dm">
                      <span className="text-white/30">{k}</span>
                      <span className="text-white/70">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[#00BFFF] font-playfair text-xl font-bold">AED {j.price}/hr</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#030810]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#00BFFF] uppercase font-dm mb-4">Curated Experiences</div>
            <h2 className="font-playfair text-5xl font-bold">Dubai From<br /><span className="italic text-[#00BFFF]">The Water</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((e, i) => (
              <div
                key={e.name}
                onClick={() => setSelectedExp(selectedExp === i ? null : i)}
                className={`group glass rounded-2xl p-6 cursor-pointer transition-all duration-500 hoverable ${
                  selectedExp === i ? 'border-[#00BFFF]/50' : 'hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold group-hover:text-[#00BFFF] transition-colors">{e.name}</h3>
                    <p className="text-white/40 text-sm font-dm mt-1">{e.desc}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-playfair text-2xl font-bold text-[#00BFFF]">AED {e.price}</div>
                    <div className="text-white/30 text-xs font-dm">per person</div>
                  </div>
                </div>
                <div className="flex gap-6 text-xs font-dm text-white/40">
                  <span>⏱ {e.duration}</span>
                  <span>📍 {e.km}</span>
                  <span>🌊 All levels</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Estimator */}
      <section id="book" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-16">
            <div className="text-center mb-12">
              <div className="text-xs tracking-[0.4em] text-[#00BFFF] uppercase font-dm mb-4">Instant Booking</div>
              <h2 className="font-playfair text-5xl font-bold">Configure<br />Your Ride</h2>
            </div>

            {/* Jet ski selector */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-4">Select Your Machine</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {jetskis.map((j, i) => (
                  <button
                    key={j.id}
                    onClick={() => { setSelectedJetski(i); setSelectedExp(null) }}
                    className={`p-3 rounded-xl text-left transition-all hoverable ${
                      selectedJetski === i && !selectedExp ? 'bg-[#00BFFF]/20 border border-[#00BFFF]/50' : 'glass border border-white/10 hover:border-[#00BFFF]/30'
                    }`}
                  >
                    <div className="text-xl mb-1">{j.emoji}</div>
                    <div className="text-xs font-dm text-white/60 leading-tight">{j.name.split(' ').slice(0,3).join(' ')}</div>
                    <div className="text-[#00BFFF] text-sm font-bold mt-1">AED {j.price}/h</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">
                Duration: {hours} hour{hours > 1 ? 's' : ''}
              </label>
              <input
                type="range" min={1} max={8} step={0.5} value={hours}
                onChange={e => { setHours(+e.target.value); setSelectedExp(null) }}
                className="w-full accent-[#00BFFF]"
              />
              <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                <span>1 hour</span><span>8 hours</span>
              </div>
            </div>

            {/* Passengers */}
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-4">
                Passengers: {passengers}
              </label>
              <div className="flex gap-3">
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    onClick={() => setPassengers(p)}
                    className={`flex-1 py-3 rounded-xl font-dm text-sm transition-all hoverable ${
                      passengers === p ? 'bg-[#00BFFF]/20 border border-[#00BFFF]/50 text-[#00BFFF]' : 'glass border border-white/10 text-white/40'
                    }`}
                  >
                    {p} {p === 1 ? 'Person' : 'People'}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="glass rounded-2xl p-6 mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs font-dm text-white/30 tracking-widest uppercase mb-1">Total Estimate</div>
                <div className="font-playfair text-4xl font-bold text-[#00BFFF]">AED {total.toLocaleString()}</div>
                <div className="text-white/30 text-sm font-dm mt-1">
                  {selectedJetski !== null && !selectedExp ? `${jetskis[selectedJetski].name} · ${hours}h · ${passengers} pax` : selectedExp !== null ? experiences[selectedExp].name : ''}
                </div>
              </div>
              <div className="text-5xl">🌊</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[['Full Name', 'text', 'Mohammed Al Rashid'], ['Phone / WhatsApp', 'tel', '+971 50 XXX XXXX'],
                ['Date', 'date', ''], ['Preferred Time', 'time', '']].map(([l, t, p]) => (
                <div key={l}>
                  <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                  <input type={t} placeholder={p}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00BFFF]/50 transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm transition-all hoverable"
              style={{background:'linear-gradient(135deg,#00BFFF,#006994)', color:'#fff'}}>
              Confirm Booking
            </button>
            <p className="text-center text-white/20 text-xs font-dm mt-4">
              Free cancellation up to 24h before · WhatsApp support 24/7
            </p>
          </div>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold" style={{background:'linear-gradient(135deg,#00BFFF,#006994)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>WaveRider Dubai</span>
          <p className="text-white/20 text-xs font-dm">© 2024 WaveRider. Dubai Marina · JBR · Palm Jumeirah</p>
          <Link to="/" className="text-[#00BFFF] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
