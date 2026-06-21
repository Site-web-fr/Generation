import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Users, Shield, Star, Phone, Mail, CheckCircle, ArrowRight, Plane, Globe, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

// NAVBAR
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#04071A]/95 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Plane size={20} className="text-[#C9A96E]" />
          <div>
            <div className="text-[#C9A96E] font-display text-lg tracking-[0.2em]">ALTITUDE</div>
            <div className="text-[#E8EFF8]/30 text-[0.5rem] tracking-[0.4em] uppercase">Private Aviation</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Fleet', 'Routes', 'Charter', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-[#E8EFF8]/50 hover:text-[#C9A96E] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#charter" className="hidden lg:block btn-primary text-xs py-3 px-6">Devis Instantané</a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#C9A96E]">{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
    </nav>
  )
}

// 3D GLOBE
function Globe3D() {
  const sphereRef = useRef()
  const linesRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (sphereRef.current) { sphereRef.current.rotation.y = t * 0.1; sphereRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 }
  })

  const routes = [
    [[-0.1, 0.9, 0.4], [0.6, 0.7, -0.4]], // Paris-Dubai
    [[0.5, 0.8, 0.3], [-0.7, 0.6, 0.4]], // Dubai-NY
    [[-0.4, 0.8, 0.4], [0.3, 0.4, -0.9]], // Europe-Asia
  ]

  return (
    <group ref={sphereRef}>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial color="#040E2A" emissive="#020710" wireframe={false} transparent opacity={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.52, 32, 32]} />
        <meshBasicMaterial color="#1A3A6A" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Route arcs */}
      {routes.map((route, i) => {
        const [a, b] = route
        const mid = [(a[0]+b[0])/2*1.6, (a[1]+b[1])/2*1.6, (a[2]+b[2])/2*1.6]
        const pts = []
        for (let t = 0; t <= 1; t += 0.05) {
          const x = a[0]*(1-t)*(1-t) + mid[0]*2*t*(1-t) + b[0]*t*t
          const y = a[1]*(1-t)*(1-t) + mid[1]*2*t*(1-t) + b[1]*t*t
          const z = a[2]*(1-t)*(1-t) + mid[2]*2*t*(1-t) + b[2]*t*t
          const len = Math.sqrt(x*x+y*y+z*z)
          pts.push(new THREE.Vector3(x/len*2.6, y/len*2.6, z/len*2.6))
        }
        return <Line key={i} points={pts} color="#C9A96E" lineWidth={1.5} transparent opacity={0.6} />
      })}
      {/* City dots */}
      {[[-0.1, 2.4, 0.95], [1.4, 1.8, -0.95], [-1.7, 1.5, 0.9], [0.7, 1.1, -2.3]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#C9A96E" />
        </mesh>
      ))}
    </group>
  )
}

function CloudParticles() {
  const ref = useRef()
  const count = 600
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 3.5 + Math.random() * 3
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i*3+2] = r * Math.cos(phi)
  }
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.03 })
  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent color="#C9A96E" size={0.02} sizeAttenuation depthWrite={false} opacity={0.3} />
    </Points>
  )
}

// HERO
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#C9A96E" />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#1A3A8A" />
          <Globe3D />
          <CloudParticles />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#04071A] via-[#04071A]/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04071A] via-transparent to-transparent z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <Globe size={14} className="text-[#C9A96E]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E]">Aviation Privée · 150+ Destinations</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] text-[#E8EFF8] mb-6">
            Volez<br />
            <span className="gradient-gold italic">Sans</span><br />
            Frontières
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-[#E8EFF8]/60 text-lg leading-relaxed mb-10 max-w-md">
            Charter privé, jet d'affaires, hélicoptère. Voyagez selon vos conditions, sur vos horaires, vers vos destinations.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#charter" className="btn-primary flex items-center gap-3 justify-center">Obtenir un Devis <ArrowRight size={16} /></a>
            <a href="#fleet" className="btn-outline">Voir la Flotte</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-10">
            {[['150+', 'Destinations'], ['24/7', 'Disponible'], ['0', 'Correspondances']].map(([v, l]) => (
              <div key={v} className="border-l border-[#C9A96E]/20 pl-4">
                <div className="font-display text-3xl text-[#C9A96E]">{v}</div>
                <div className="text-[#E8EFF8]/40 text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// FLEET
const jets = [
  { name: 'Cessna Citation XLS+', category: 'Léger', range: '3700 km', pax: 9, speed: 858, price: 4200, desc: 'Idéal pour les vols européens. Confort et efficacité.' },
  { name: 'Bombardier Challenger 350', category: 'Moyen', range: '5900 km', pax: 10, speed: 870, price: 7800, desc: 'Parfait pour les vols intercontinentaux en classe affaires.' },
  { name: 'Gulfstream G650', category: 'Long-courrier', range: '12960 km', pax: 19, speed: 956, price: 14500, desc: 'Le summum du luxe pour les vols transatlantiques et au-delà.' },
  { name: 'Airbus ACJ319', category: 'VIP Liner', range: '11100 km', pax: 50, speed: 820, price: 28000, desc: 'L\'avion de ligne transformé en palace volant pour VVIP.' },
]

function Fleet() {
  const [active, setActive] = useState(0)
  return (
    <section id="fleet" className="py-32 bg-[#030614]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Notre Flotte</span>
          <h2 className="font-display text-5xl text-[#E8EFF8]">Jets <span className="gradient-gold italic">d'Exception</span></h2>
          <div className="section-divider" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {jets.map((j, i) => (
            <button key={j.name} onClick={() => setActive(i)}
              className={`px-5 py-2 text-xs tracking-wider uppercase border transition-all ${active === i ? 'bg-[#C9A96E] border-[#C9A96E] text-[#04071A]' : 'border-[#C9A96E]/20 text-[#E8EFF8]/50'}`}>
              {j.category}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="glass-card p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Jet silhouette */}
                <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-[#C9A96E]/10 to-transparent border border-[#C9A96E]/10 mb-6">
                  <svg viewBox="0 0 400 160" className="w-full max-w-sm opacity-70">
                    <path d="M50,80 Q120,20 200,75 Q280,130 350,80" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.3" />
                    {/* Fuselage */}
                    <ellipse cx="200" cy="80" rx="140" ry="15" fill="#C9A96E" opacity="0.6" />
                    <ellipse cx="200" cy="80" rx="130" ry="12" fill="#8B6914" opacity="0.4" />
                    {/* Wings */}
                    <polygon points="200,75 290,120 290,85 200,82" fill="#C9A96E" opacity="0.5" />
                    <polygon points="200,75 110,120 110,85 200,82" fill="#C9A96E" opacity="0.5" />
                    {/* Tail */}
                    <polygon points="70,80 50,55 70,70" fill="#C9A96E" opacity="0.5" />
                    <polygon points="70,80 50,100 70,88" fill="#C9A96E" opacity="0.4" />
                    {/* Windows */}
                    {[150,165,180,195,210,225,240].map(x => <ellipse key={x} cx={x} cy="76" rx="5" ry="4" fill="#1A3A6A" opacity="0.8" />)}
                  </svg>
                </div>
                <div className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">{jets[active].category}</div>
                <h3 className="font-display text-3xl text-[#E8EFF8] mb-3">{jets[active].name}</h3>
                <p className="text-[#E8EFF8]/50 text-sm leading-relaxed">{jets[active].desc}</p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[['Autonomie', jets[active].range], ['Passagers', jets[active].pax + ' pers.'], ['Vitesse', jets[active].speed + ' km/h'], ['Tarif/h', jets[active].price + '€']].map(([l, v]) => (
                    <div key={l} className="glass-card p-4 text-center">
                      <div className="text-[#E8EFF8]/40 text-xs uppercase mb-1">{l}</div>
                      <div className="text-[#C9A96E] font-display text-xl">{v}</div>
                    </div>
                  ))}
                </div>
                <a href="#charter" className="btn-primary block text-center w-full">Réserver ce Jet</a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// CHARTER CALCULATOR
const routes = [
  { from: 'Paris (CDG)', to: 'Dubai (DXB)', km: 5200, baseH: 6.5 },
  { from: 'Paris (LBG)', to: 'New York (TEB)', km: 5840, baseH: 7.5 },
  { from: 'Geneva (GVA)', to: 'London (LCY)', km: 760, baseH: 1.2 },
  { from: 'Nice (NCE)', to: 'Ibiza (IBZ)', km: 680, baseH: 1.1 },
  { from: 'Monaco (MCM)', to: 'Maldives (MLE)', km: 9200, baseH: 11 },
]

function Charter() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [jet, setJet] = useState(1)
  const [pax, setPax] = useState(4)
  const [oneWay, setOneWay] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const route = routes[jet % routes.length]
  const price = Math.round(route.baseH * jets[jet].price * (oneWay ? 1 : 1.8))

  return (
    <section id="charter" className="py-32 bg-[#04071A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Calculateur</span>
          <h2 className="font-display text-5xl text-[#E8EFF8]">Estimez Votre <span className="gradient-gold italic">Vol Privé</span></h2>
          <div className="section-divider" />
        </div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto">
            <CheckCircle size={56} className="text-[#C9A96E] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[#E8EFF8] mb-3">Demande Envoyée</h3>
            <p className="text-[#E8EFF8]/60 text-sm">Notre équipe revient vers vous dans les 30 minutes avec une offre détaillée.</p>
            <div className="mt-6 p-5 border border-[#C9A96E]/20 bg-[#C9A96E]/5">
              <div className="font-display text-4xl text-[#C9A96E]">{price.toLocaleString()}€</div>
              <div className="text-[#E8EFF8]/40 text-xs">{jets[jet].name} · {route.from} → {route.to}</div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widests uppercase text-[#C9A96E] mb-4 block">Type d'Appareil</label>
                <div className="space-y-2">
                  {jets.map((j, i) => (
                    <button key={j.name} onClick={() => setJet(i)}
                      className={`w-full text-left p-3 border transition-all flex justify-between text-sm ${jet === i ? 'border-[#C9A96E]/40 bg-[#C9A96E]/5 text-[#E8EFF8]' : 'border-[#C9A96E]/10 text-[#E8EFF8]/40'}`}>
                      <span>{j.name}</span><span className="text-[#C9A96E] text-xs">{j.price}€/h</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5">
                  <label className="text-[0.65rem] tracking-widests uppercase text-[#C9A96E] mb-3 block">Passagers: {pax}</label>
                  <input type="range" min={1} max={jets[jet].pax} value={pax} onChange={e => setPax(+e.target.value)}
                    className="w-full accent-[#C9A96E]" />
                </div>
                <div className="glass-card p-5 flex items-center">
                  <label className="flex items-center gap-3 cursor-none w-full">
                    <div onClick={() => setOneWay(!oneWay)}
                      className={`w-10 h-5 rounded-full relative transition-all ${!oneWay ? 'bg-[#C9A96E]' : 'bg-[#C9A96E]/20'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${!oneWay ? 'left-5' : 'left-0.5'}`} />
                    </div>
                    <span className="text-[#E8EFF8]/60 text-xs">Aller-Retour</span>
                  </label>
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widests uppercase text-[#C9A96E] mb-3 block">Itinéraire Populaire</label>
                <div className="space-y-2">
                  {routes.slice(0,4).map((r, i) => (
                    <button key={i} onClick={() => {}}
                      className="w-full text-left p-3 border border-[#C9A96E]/10 hover:border-[#C9A96E]/30 text-sm text-[#E8EFF8]/50 flex justify-between">
                      <span>{r.from} → {r.to}</span>
                      <span className="text-[#C9A96E] text-xs">{r.km} km</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Plane size={18} className="text-[#C9A96E]" />
                  <h3 className="font-display text-2xl text-[#E8EFF8]">Estimation de Vol</h3>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A96E]/10">
                  <div className="flex justify-between text-sm"><span className="text-[#E8EFF8]/50">Appareil</span><span className="text-[#E8EFF8]">{jets[jet].name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#E8EFF8]/50">Durée estimée</span><span className="text-[#E8EFF8]">{route.baseH}h</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#E8EFF8]/50">Passagers</span><span className="text-[#E8EFF8]">{pax} pers.</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#E8EFF8]/50">Type</span><span className="text-[#E8EFF8]">{oneWay ? 'Aller simple' : 'Aller-retour'}</span></div>
                </div>

                <div className="bg-[#C9A96E]/8 border border-[#C9A96E]/20 p-5 mb-6 text-center">
                  <div className="text-[#E8EFF8]/50 text-xs mb-1">Estimation</div>
                  <motion.div key={price} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-display text-4xl text-[#C9A96E]">{price.toLocaleString()}€</motion.div>
                  <div className="text-[#E8EFF8]/30 text-xs mt-1">* Prix définitif selon disponibilité</div>
                </div>

                <div className="space-y-4 mb-6">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom"
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#E8EFF8] text-sm focus:outline-none focus:border-[#C9A96E]/40 placeholder-[#E8EFF8]/20" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone direct"
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#E8EFF8] text-sm focus:outline-none focus:border-[#C9A96E]/40 placeholder-[#E8EFF8]/20" />
                </div>

                <button onClick={() => { if (name && phone) setSubmitted(true) }} className="btn-primary w-full">
                  Demander un Devis Officiel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Testimonials() {
  const [current, setCurrent] = useState(0)
  const reviews = [
    { name: 'Sheikh A.', role: 'Homme d\'affaires, Dubai', text: 'Altitude Private est devenu mon partenaire de voyage incontournable. Disponibilité, flexibilité, luxe absolu. Mes voyages Paris-Dubai n\'ont jamais été aussi agréables.' },
    { name: 'Marie-Hélène D.', role: 'CEO, Paris', text: 'Pour mes déplacements professionnels, je ne conçois plus de voyager autrement. Le service est parfait, les avions magnifiques, l\'équipe exceptionnelle.' },
  ]
  return (
    <section className="py-24 bg-[#030614]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl text-[#E8EFF8] mb-12">Ils Nous Font <span className="gradient-gold italic">Confiance</span></h2>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-10">
            <div className="flex justify-center gap-1 mb-5">{[...Array(5)].map((_,i) => <Star key={i} size={14} fill="#C9A96E" color="#C9A96E" />)}</div>
            <p className="font-display text-xl text-[#E8EFF8]/80 italic mb-6">"{reviews[current].text}"</p>
            <div className="text-[#C9A96E]">{reviews[current].name}</div>
            <div className="text-[#E8EFF8]/40 text-xs">{reviews[current].role}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => setCurrent(p => (p-1+reviews.length)%reviews.length)} className="w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E]"><ChevronLeft size={16} className="text-[#C9A96E]" /></button>
          <button onClick={() => setCurrent(p => (p+1)%reviews.length)} className="w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E]"><ChevronRight size={16} className="text-[#C9A96E]" /></button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#020510] border-t border-[#C9A96E]/10 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3"><Plane size={16} className="text-[#C9A96E]" /><span className="font-display text-lg text-[#C9A96E] tracking-widest">ALTITUDE PRIVATE</span></div>
          <p className="text-[#E8EFF8]/30 text-xs max-w-xs">Aviation privée d'exception. Jets, hélicoptères, voyages sur mesure dans le monde entier.</p>
        </div>
        <div className="flex gap-16">
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#C9A96E] mb-4">Services</div>
            <ul className="space-y-2">{['Charter Jet Privé', 'Hélicoptère VIP', 'Cargo Priority', 'Concierge Voyage'].map(s => <li key={s}><a href="#" className="text-[#E8EFF8]/30 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#C9A96E] mb-4">Contact</div>
            <div className="space-y-2 text-[#E8EFF8]/30 text-xs">
              <div>+33 1 XX XX XX XX</div>
              <div>ops@altitude-private.fr</div>
              <div className="text-[#C9A96E]/50">Disponible 24h/24</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#C9A96E]/10">
        <p className="text-[#E8EFF8]/20 text-xs">© 2024 Altitude Private. AOC FR.XXX. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  useEffect(() => {
    const cursor = cursorRef.current, follower = followerRef.current
    let mx = 0, my = 0, fx = 0, fy = 0
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (cursor) { cursor.style.left = mx+'px'; cursor.style.top = my+'px' } }
    const animate = () => { fx += (mx-fx)*0.1; fy += (my-fy)*0.1; if (follower) { follower.style.left = fx+'px'; follower.style.top = fy+'px' } requestAnimationFrame(animate) }
    window.addEventListener('mousemove', onMove); animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div className="min-h-screen bg-[#04071A]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <Fleet />
      <Charter />
      <Testimonials />
      <Footer />
    </div>
  )
}
