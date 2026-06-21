import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Text3D, Environment } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

function FloatingOrb({ position, color, speed, distort }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3
    ref.current.rotation.y = state.clock.getElapsedTime() * speed * 0.5
  })
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={ref} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const positions = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 20))
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#C9A84C" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

const treatments = [
  { name: 'Rhinoplasty', price: 'From €4,800', duration: '2-3h', recovery: '2 weeks', icon: '✦' },
  { name: 'Facelift', price: 'From €8,500', duration: '3-4h', recovery: '3 weeks', icon: '◈' },
  { name: 'Blepharoplasty', price: 'From €2,900', duration: '1-2h', recovery: '10 days', icon: '◆' },
  { name: 'Lip Enhancement', price: 'From €650', duration: '30min', recovery: '2-3 days', icon: '◇' },
  { name: 'Breast Augmentation', price: 'From €5,200', duration: '2h', recovery: '3 weeks', icon: '✧' },
  { name: 'Liposuction', price: 'From €3,400', duration: '2-3h', recovery: '2 weeks', icon: '⬡' },
]

const doctors = [
  { name: 'Dr. Elena Beaumont', specialty: 'Facial Reconstruction', experience: '18 years', cases: '2,400+' },
  { name: 'Dr. Laurent Morel', specialty: 'Body Contouring', experience: '22 years', cases: '3,100+' },
  { name: 'Dr. Sofia Carvalho', specialty: 'Non-Surgical Aesthetics', experience: '14 years', cases: '5,600+' },
]

const steps = [
  { n: '01', title: 'Private Consultation', desc: 'Confidential 1-on-1 with our senior surgeon. Digital 3D simulation of your expected results.' },
  { n: '02', title: 'Personalized Planning', desc: 'Bespoke treatment plan with pricing, timeline, and complete pre-op guidance.' },
  { n: '03', title: 'The Procedure', desc: 'Performed in our state-of-the-art surgical suite with advanced anesthesia protocols.' },
  { n: '04', title: 'Concierge Recovery', desc: 'VIP aftercare with 24/7 medical team access and luxury recovery suite options.' },
]

export default function AestheticSurgery() {
  const [activeTab, setActiveTab] = useState(0)
  const [beforeAfterPos, setBeforeAfterPos] = useState(50)
  const [hoveredTreatment, setHoveredTreatment] = useState(null)
  const sliderRef = useRef()
  const isDragging = useRef(false)

  useEffect(() => {
    document.title = 'AesthetiCare — Premium Aesthetic Surgery'
  }, [])

  const handleSliderMove = (e) => {
    if (!isDragging.current && e.type === 'mousemove') return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setBeforeAfterPos(pct)
  }

  return (
    <div className="bg-[#050508] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span className="font-cormorant text-xl font-bold tracking-wide gold-text">AesthetiCare</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Treatments', 'Surgeons', 'Gallery', 'Process', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#contact" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Book Consultation
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#C9A84C" />
            <pointLight position={[-5, -5, 3]} intensity={1} color="#8B69E8" />
            <pointLight position={[0, 0, 8]} intensity={0.5} color="#ffffff" />
            <FloatingOrb position={[3.5, 0.5, -2]} color="#C9A84C" speed={0.8} distort={0.3} />
            <FloatingOrb position={[-3, -1, -3]} color="#6B4EFF" speed={1.2} distort={0.5} />
            <FloatingOrb position={[1, 3, -4]} color="#FFB5C5" speed={0.6} distort={0.2} />
            <ParticleField />
          </Canvas>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Certified Excellence · Paris</span>
          </div>
          <h1 className="font-playfair text-6xl md:text-8xl font-black leading-[0.9] mb-6">
            The Art<br />
            <span className="italic text-[#C9A84C]">of</span>{' '}
            <span className="text-white">Beauty</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            Where precision medicine meets aesthetic artistry. Transformative results achieved through 
            cutting-edge surgical techniques and uncompromising care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              <span>Private Consultation</span>
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#gallery" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              View Results
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-16">
            {[['98%', 'Patient Satisfaction'], ['2,400+', 'Procedures'], ['18', 'Years Excellence']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Slider */}
      <section id="gallery" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Transformation Gallery</div>
            <h2 className="font-playfair text-5xl font-bold">Real Results,<br />Real People</h2>
          </div>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="relative rounded-3xl overflow-hidden cursor-ew-resize select-none h-[400px] md:h-[550px]"
            onMouseMove={handleSliderMove}
            onMouseDown={() => isDragging.current = true}
            onMouseUp={() => isDragging.current = false}
            onMouseLeave={() => isDragging.current = false}
            onTouchMove={handleSliderMove}
          >
            {/* Before */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center">
              <div className="text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#2a2a3a] to-[#1a1a2a] mx-auto mb-4 flex items-center justify-center border border-white/10">
                  <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-20">
                    <circle cx="50" cy="35" r="20" fill="currentColor" />
                    <ellipse cx="50" cy="80" rx="30" ry="25" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-white/20 text-sm font-dm">Before Treatment</p>
              </div>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-xs font-dm text-white/60 tracking-widest uppercase">Before</div>
            </div>

            {/* After */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#1a0f00] to-[#0f0800] flex items-center justify-center"
              style={{ clipPath: `inset(0 ${100 - beforeAfterPos}% 0 0)` }}
            >
              <div className="text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#C9A84C]/30 to-[#8B6914]/20 mx-auto mb-4 flex items-center justify-center border border-[#C9A84C]/30">
                  <svg width="60" height="60" viewBox="0 0 100 100" className="text-[#C9A84C]">
                    <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.6" />
                    <ellipse cx="50" cy="80" rx="30" ry="25" fill="currentColor" opacity="0.4" />
                  </svg>
                </div>
                <p className="text-[#C9A84C]/60 text-sm font-dm">After Treatment</p>
              </div>
              <div className="absolute top-4 left-4 bg-[#C9A84C]/20 backdrop-blur px-4 py-2 rounded-full text-xs font-dm text-[#C9A84C] tracking-widest uppercase">After</div>
            </div>

            {/* Divider */}
            <div className="absolute inset-y-0 w-0.5 bg-[#C9A84C] shadow-[0_0_20px_#C9A84C]" style={{ left: `${beforeAfterPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#C9A84C] rounded-full flex items-center justify-center shadow-[0_0_30px_#C9A84C]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                  <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs font-dm tracking-widest">
              ← DRAG TO COMPARE →
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#08080f]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Our Expertise</div>
              <h2 className="font-playfair text-5xl font-bold">Premium<br />Treatments</h2>
            </div>
            <a href="#contact" className="hidden md:flex items-center gap-3 text-[#C9A84C] font-dm text-sm tracking-widest uppercase hoverable">
              <span>All Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatments.map((t, i) => (
              <div
                key={t.name}
                className="group glass rounded-2xl p-6 hover:border-[#C9A84C]/40 transition-all duration-500 cursor-pointer hoverable"
                onMouseEnter={() => setHoveredTreatment(i)}
                onMouseLeave={() => setHoveredTreatment(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[#C9A84C] text-2xl">{t.icon}</div>
                  <div className="text-white/20 text-xs font-dm tracking-widest">{String(i + 1).padStart(2, '0')}</div>
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-1 group-hover:text-[#C9A84C] transition-colors">{t.name}</h3>
                <div className="text-[#C9A84C] font-dm text-sm mb-4">{t.price}</div>
                <div className="flex gap-6 text-white/30 text-xs font-dm">
                  <span>Duration: {t.duration}</span>
                  <span>Recovery: {t.recovery}</span>
                </div>
                <div className="h-px bg-[#C9A84C]/20 mt-4 group-hover:bg-[#C9A84C]/50 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surgeons */}
      <section id="surgeons" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">The Experts</div>
            <h2 className="font-playfair text-5xl font-bold">Master Surgeons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((d) => (
              <div key={d.name} className="group glass rounded-2xl p-8 hover:border-[#C9A84C]/30 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-[#8B6914]/10 mb-6 flex items-center justify-center border border-[#C9A84C]/20">
                  <svg width="32" height="32" viewBox="0 0 100 100" className="text-[#C9A84C] opacity-60">
                    <circle cx="50" cy="35" r="18" fill="currentColor"/>
                    <ellipse cx="50" cy="78" rx="28" ry="22" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-playfair text-xl font-bold mb-1 group-hover:text-[#C9A84C] transition-colors">{d.name}</h3>
                <p className="text-[#C9A84C] text-sm font-dm mb-4">{d.specialty}</p>
                <div className="flex gap-6">
                  <div>
                    <div className="font-playfair text-2xl font-bold text-white">{d.experience}</div>
                    <div className="text-white/30 text-xs font-dm">Experience</div>
                  </div>
                  <div>
                    <div className="font-playfair text-2xl font-bold text-white">{d.cases}</div>
                    <div className="text-white/30 text-xs font-dm">Cases</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-8 md:px-16 bg-gradient-to-b from-[#08080f] to-[#050508]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Your Journey</div>
            <h2 className="font-playfair text-5xl font-bold">From Dream<br />to Reality</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative group">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#C9A84C]/20 z-0" />
                )}
                <div className="glass rounded-2xl p-6 relative z-10 hover:border-[#C9A84C]/30 transition-all duration-500">
                  <div className="font-cormorant text-5xl font-bold text-[#C9A84C]/20 mb-4">{s.n}</div>
                  <h3 className="font-playfair text-lg font-bold mb-3 group-hover:text-[#C9A84C] transition-colors">{s.title}</h3>
                  <p className="text-white/40 text-sm font-dm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-16">
            <div className="text-center mb-12">
              <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Begin Your Transformation</div>
              <h2 className="font-playfair text-5xl font-bold mb-4">Private Consultation</h2>
              <p className="text-white/40 font-dm">Completely confidential. No obligation. First step to a new you.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[['Full Name', 'text', 'Alexandre Dubois'], ['Email', 'email', 'alexandre@email.com'],
                ['Phone', 'tel', '+33 6 XX XX XX XX'], ['City', 'text', 'Paris, Monaco, London...']].map(([label, type, placeholder]) => (
                <div key={label}>
                  <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{label}</label>
                  <input type={type} placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Treatment of Interest</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors">
                <option value="" className="bg-[#0A0A0A]">Select a treatment...</option>
                {treatments.map(t => <option key={t.name} value={t.name} className="bg-[#0A0A0A]">{t.name} — {t.price}</option>)}
              </select>
            </div>
            <div className="mb-8">
              <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Your Goals</label>
              <textarea rows={4} placeholder="Describe your aesthetic goals and any concerns..." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors resize-none" />
            </div>
            <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors duration-300 hoverable">
              Request Private Consultation
            </button>
            <p className="text-center text-white/20 text-xs font-dm mt-4 tracking-wide">
              100% Confidential · Response within 2 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">AesthetiCare</span>
          <p className="text-white/20 text-xs font-dm">© 2024 AesthetiCare. All rights reserved. · Medical Center, Paris 8ème</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
