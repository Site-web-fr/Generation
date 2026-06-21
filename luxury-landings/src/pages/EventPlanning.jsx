import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Torus, Float, Stars, MeshDistortMaterial, Box, Cylinder } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

function EventScene() {
  const ringRefs = [useRef(), useRef(), useRef()]
  const sphereRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ringRefs[0].current.rotation.z = t * 0.2
    ringRefs[1].current.rotation.z = -t * 0.15
    ringRefs[2].current.rotation.x = t * 0.1
    sphereRef.current.material.distort = Math.abs(Math.sin(t * 0.4)) * 0.3 + 0.2
  })

  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#1A5276" distort={0.3} speed={1.5} metalness={0.9} roughness={0.1} transparent opacity={0.5} />
      </Sphere>
      {[4, 5.5, 7].map((r, i) => (
        <Torus key={i} ref={ringRefs[i]} args={[r, 0.02, 8, 100]} rotation={[Math.PI / (2 + i * 0.5), i * 0.8, 0]}>
          <meshStandardMaterial color={i === 0 ? "#C9A84C" : i === 1 ? "#E8D5A3" : "#1A5276"} emissive={i === 0 ? "#C9A84C" : "#1A5276"} emissiveIntensity={0.4} transparent opacity={0.4} />
        </Torus>
      ))}
      {[...Array(50)].map((_, i) => {
        const theta = (i / 50) * Math.PI * 2
        const phi = (i / 50) * Math.PI
        const r = 3 + Math.random() * 2
        return (
          <Float key={i} speed={0.3 + Math.random() * 0.5} floatIntensity={0.5}>
            <Sphere args={[0.025, 4, 4]} position={[Math.sin(phi) * Math.cos(theta) * r, Math.cos(phi) * r * 0.5, Math.sin(phi) * Math.sin(theta) * r]}>
              <meshStandardMaterial color={i % 3 === 0 ? "#C9A84C" : "#ffffff"} emissive={i % 3 === 0 ? "#C9A84C" : "#ffffff"} emissiveIntensity={1.5} />
            </Sphere>
          </Float>
        )
      })}
    </>
  )
}

const eventTypes = [
  {
    name: 'Gala Dinner', icon: '🥂', color: '#C9A84C',
    desc: 'Black-tie elegance for 20 to 2,000 guests',
    features: ['Michelin-starred catering', 'Custom floral design', 'Live entertainment', 'Valet parking', 'Custom lighting design'],
    from: '€150,000'
  },
  {
    name: 'Wedding Couture', icon: '💍', color: '#E8D5A3',
    desc: 'Your perfect day, crafted without compromise',
    features: ['Full venue transformation', 'Private chef + sommelier', 'Floral couture', 'Entertainment curation', 'Photography & Film'],
    from: '€200,000'
  },
  {
    name: 'Corporate Gala', icon: '🏆', color: '#1A5276',
    desc: 'Leadership events that inspire and impress',
    features: ['A/V & production', 'Speaker curation', 'Branded experiences', 'Hospitality suites', 'Transportation fleet'],
    from: '€80,000'
  },
  {
    name: 'Private Celebration', icon: '🎊', color: '#8B69E8',
    desc: 'Birthdays, anniversaries, intimate gatherings',
    features: ['Exclusive venue sourcing', 'Surprise coordination', 'Celebrity appearances', 'Luxury transport', 'Custom entertainment'],
    from: '€30,000'
  },
]

const venues = [
  { name: 'Versailles Palace', location: 'Versailles, France', cap: '500', type: 'Heritage' },
  { name: 'Eden Roc Terrace', location: 'Cap d\'Antibes', cap: '300', type: 'Seaside' },
  { name: 'Maeght Foundation', location: 'Saint-Paul-de-Vence', cap: '200', type: 'Art' },
  { name: 'Superyacht Charter', location: 'Mediterranean', cap: '100', type: 'Marine' },
  { name: 'Private Alpine Chalet', location: 'Megève Alps', cap: '150', type: 'Mountain' },
  { name: 'Louvre Pyramid', location: 'Paris, France', cap: '400', type: 'Iconic' },
]

const process = [
  { n: '01', title: 'Creative Brief', desc: 'A deep dive into your vision, values, and dreams. We listen before we create.' },
  { n: '02', title: 'Concept Design', desc: '3D renders, mood boards, and full concept presentation within 7 days.' },
  { n: '03', title: 'Orchestration', desc: 'We manage every vendor, every detail, every timeline with military precision.' },
  { n: '04', title: 'The Moment', desc: 'You arrive as a guest at your own event. We handle everything else.' },
]

export default function EventPlanning() {
  const [selectedType, setSelectedType] = useState(0)
  const [guests, setGuests] = useState(100)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [budget, setBudget] = useState(200)

  useEffect(() => {
    document.title = 'EventCouture — Bespoke Event Design'
  }, [])

  const ev = eventTypes[selectedType]

  return (
    <div className="bg-[#030810] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <span className="text-lg">✨</span>
          <span className="font-cormorant text-xl font-bold tracking-wide" style={{background:'linear-gradient(135deg,#C9A84C,#1A5276)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>EventCouture</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Events', 'Venues', 'Process', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#contact" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Plan Your Event
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#C9A84C" />
            <pointLight position={[-5, -3, 5]} intensity={1} color="#1A5276" />
            <EventScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030810] via-[#030810]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030810] to-transparent opacity-80" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Bespoke Events · Global Reach</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Events</span><br />
            <span className="italic gold-text">That</span><br />
            <span className="text-white">Echo.</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            From intimate dinners at the Palace of Versailles to superyacht galas in the Mediterranean — 
            we craft moments that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Start Planning
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#events" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              Our Events
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['450+', 'Events Produced'], ['€2.8B', 'Total Value'], ['4.9★', 'Client Rating']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section id="events" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">What We Create</div>
            <h2 className="font-playfair text-5xl font-bold">Every Event,<br /><span className="italic gold-text">A Masterpiece</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {eventTypes.map((e, i) => (
              <button key={e.name} onClick={() => setSelectedType(i)}
                className={`group glass rounded-2xl p-5 text-left transition-all duration-300 hoverable ${
                  selectedType === i ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : 'hover:border-white/20'
                }`}>
                <div className="text-3xl mb-3">{e.icon}</div>
                <div className="font-playfair text-lg font-bold mb-1 group-hover:text-[#C9A84C] transition-colors">{e.name}</div>
                <div className="text-white/30 text-xs font-dm mb-2">{e.desc}</div>
                <div className="font-playfair text-base font-bold" style={{ color: e.color }}>From {e.from}</div>
              </button>
            ))}
          </div>

          {/* Selected event details */}
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-4xl mb-4">{ev.icon}</div>
                <h3 className="font-playfair text-4xl font-bold mb-2">{ev.name}</h3>
                <p className="text-white/40 font-dm mb-6">{ev.desc}</p>
                <div className="space-y-3">
                  {ev.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm font-dm text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {/* Event Builder */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">
                      Guest Count: {guests}
                    </label>
                    <input type="range" min={20} max={2000} step={20} value={guests}
                      onChange={e => setGuests(+e.target.value)}
                      className="w-full accent-[#C9A84C]" />
                    <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                      <span>20 guests</span><span>2,000 guests</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">
                      Budget: €{budget.toLocaleString()}k
                    </label>
                    <input type="range" min={30} max={2000} step={10} value={budget}
                      onChange={e => setBudget(+e.target.value)}
                      className="w-full accent-[#C9A84C]" />
                    <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                      <span>€30k</span><span>€2M+</span>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <div className="text-xs font-dm text-white/30 tracking-widest uppercase mb-2">Your Event Budget</div>
                    <div className="font-playfair text-4xl font-bold gold-text mb-1">€{budget.toLocaleString()}k</div>
                    <div className="text-white/40 text-sm font-dm">{ev.name} · {guests} guests</div>
                    <div className="text-[#C9A84C] text-xs font-dm mt-2">€{Math.round(budget * 1000 / guests).toLocaleString()} per guest</div>
                  </div>
                  <a href="#contact" className="block w-full bg-[#C9A84C] text-black py-4 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm text-center hover:bg-[#E8C97A] transition-colors hoverable">
                    Request Proposal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues */}
      <section id="venues" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#030810]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Exclusive Venues</div>
            <h2 className="font-playfair text-5xl font-bold">The World's Most<br /><span className="italic gold-text">Coveted Spaces</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((v, i) => (
              <div key={v.name}
                onClick={() => setSelectedVenue(selectedVenue === i ? null : i)}
                className={`group glass rounded-2xl p-6 cursor-pointer transition-all duration-500 hoverable ${
                  selectedVenue === i ? 'border-[#C9A84C]/50' : 'hover:border-white/20'
                }`}>
                <div className="h-24 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, #0a0a14, #1a1a2e)` }}>
                  <div className="text-center">
                    <div className="font-cormorant text-3xl font-bold gold-text">{v.name.charAt(0)}</div>
                    <div className="text-xs font-dm text-[#C9A84C]/50 tracking-widest uppercase">{v.type}</div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-playfair text-xl font-bold group-hover:text-[#C9A84C] transition-colors">{v.name}</h3>
                    <p className="text-white/40 text-sm font-dm">{v.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-dm text-[#C9A84C]">Up to</div>
                    <div className="font-playfair text-lg font-bold">{v.cap}</div>
                    <div className="text-white/30 text-xs font-dm">guests</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Our Approach</div>
            <h2 className="font-playfair text-5xl font-bold">From Vision<br /><span className="italic gold-text">to Memory</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((s, i) => (
              <div key={s.n} className="group glass rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all duration-500">
                <div className="font-cormorant text-5xl font-bold text-[#C9A84C]/20 mb-4">{s.n}</div>
                <h3 className="font-playfair text-lg font-bold mb-3 group-hover:text-[#C9A84C] transition-colors">{s.title}</h3>
                <p className="text-white/40 text-sm font-dm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Start the Journey</div>
            <h2 className="font-playfair text-5xl font-bold">Let's Create<br /><span className="italic gold-text">Your Legend</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[['Full Name', 'Alexandre Beaumont'], ['Email', 'alexandre@domain.com'],
              ['Phone', '+33 6 XX XX XX XX'], ['Event Type', 'Gala, Wedding, Corporate...'],
              ['Date', 'June 2025, TBD...'], ['Guest Count', '50, 200, 500...']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Your Vision</label>
            <textarea rows={4} placeholder="Describe your dream event..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors resize-none" />
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Request Event Proposal
          </button>
          <p className="text-center text-white/20 text-xs font-dm mt-4">Proposal delivered within 48h · Strictly confidential</p>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">EventCouture</span>
          <p className="text-white/20 text-xs font-dm">© 2024 EventCouture · Bespoke Event Design · Global</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
