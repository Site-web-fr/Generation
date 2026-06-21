import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Float, Stars, MeshDistortMaterial, Torus } from '@react-three/drei'
import { Link } from 'react-router-dom'

function CrownScene() {
  const groupRef = useRef()
  const sphere1 = useRef()
  const sphere2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.15
    sphere1.current.material.distort = Math.abs(Math.sin(t * 0.4)) * 0.4 + 0.2
    sphere2.current.material.distort = Math.abs(Math.cos(t * 0.3)) * 0.3 + 0.2
  })

  return (
    <group ref={groupRef}>
      <Stars radius={80} depth={50} count={2500} factor={4} fade speed={0.4} />
      <Sphere ref={sphere1} args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#4A235A" distort={0.3} speed={1.5} roughness={0.1} metalness={0.9} transparent opacity={0.5} />
      </Sphere>
      <Sphere ref={sphere2} args={[2.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#C9A84C" distort={0.2} speed={0.8} roughness={0.3} metalness={0.6} wireframe transparent opacity={0.08} />
      </Sphere>
      {[3.5, 4.5, 5.5].map((r, i) => (
        <Torus key={i} args={[r, 0.02, 8, 100]} rotation={[Math.PI / (3 + i), i * 0.5, 0]}>
          <meshStandardMaterial color={i === 0 ? "#C9A84C" : "#8B69E8"} emissive={i === 0 ? "#C9A84C" : "#8B69E8"} emissiveIntensity={0.4} transparent opacity={0.3} />
        </Torus>
      ))}
    </group>
  )
}

const services = [
  {
    category: 'Travel & Aviation',
    icon: '✈️',
    items: ['Private jet booking (2hr notice)', 'Yacht charter worldwide', 'Helicopter transfers', 'VIP airport protocols', 'Custom itinerary planning']
  },
  {
    category: 'Dining & Events',
    icon: '🍾',
    items: ['Michelin-starred reservations', 'Private chef arrangements', 'Exclusive venue access', 'Wine & sommelier service', 'Bespoke event creation']
  },
  {
    category: 'Lifestyle & Leisure',
    icon: '💎',
    items: ['Luxury property access', 'Supercar arrangements', 'Private island booking', 'Spa & wellness retreats', 'Cultural & art experiences']
  },
  {
    category: 'Personal & Business',
    icon: '👑',
    items: ['24/7 personal assistant', 'Corporate event planning', 'VIP security detail', 'Gift curation & sourcing', 'Family office support']
  },
]

const tiers = [
  {
    name: 'Silver', price: '€2,500', period: '/month',
    color: '#C0C0C0',
    features: ['24/7 Concierge Line', '40h Monthly Assistance', 'Travel Planning', 'Restaurant Reservations', 'Emergency Support'],
  },
  {
    name: 'Gold', price: '€6,500', period: '/month',
    color: '#C9A84C',
    popular: true,
    features: ['Dedicated Manager', 'Unlimited Assistance', 'Private Jet Access', 'Full Lifestyle Management', 'Global Network', 'Family Members Included'],
  },
  {
    name: 'Platinum', price: 'Custom', period: '',
    color: '#E8E8FF',
    features: ['Ultra-Private Service', 'Dedicated Team of 3', 'On-site Presence', 'Family Office Integration', 'No Limits', 'Full Discretion Protocol'],
  },
]

const experiences = [
  { title: 'Dinner at Noma, Private Room', location: 'Copenhagen', category: 'Dining', availability: '3 months wait → 48h with us' },
  { title: 'Superyacht Week in Monaco', location: 'Monaco Grand Prix', category: 'Events', availability: 'Invitation only → Available' },
  { title: 'Private Safari, Singita Grumeti', location: 'Tanzania', category: 'Travel', availability: '18 month lead → 30 days' },
  { title: 'Art Basel VIP Preview', location: 'Basel, Switzerland', category: 'Culture', availability: 'Industry only → We have access' },
  { title: 'Aman Nai Lert, Presidential Suite', location: 'Bangkok', category: 'Stays', availability: 'Fully booked → Arrangements made' },
  { title: 'Private Couture Fitting, Chanel', location: 'Paris', category: 'Fashion', availability: 'By invitation only → We arrange it' },
]

export default function LuxuryConcierge() {
  const [selectedTier, setSelectedTier] = useState(1)
  const [selectedService, setSelectedService] = useState(0)

  useEffect(() => {
    document.title = 'ConciergeOne — Ultra-Premium Lifestyle Management'
  }, [])

  return (
    <div className="bg-[#06030a] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span className="font-cormorant text-xl font-bold tracking-wide gold-text">ConciergeOne</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Services', 'Membership', 'Experiences', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#C9A84C] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#contact" className="glass px-6 py-3 rounded-full text-sm font-dm text-[#C9A84C] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all hoverable">
          Apply for Membership
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#C9A84C" />
            <pointLight position={[-5, -3, 5]} intensity={1} color="#8B69E8" />
            <CrownScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#06030a] via-[#06030a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06030a] to-transparent opacity-80" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm">Ultra-Premium · Members Only</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Every</span><br />
            <span className="italic gold-text">Desire.</span><br />
            <span className="text-white/40">Fulfilled.</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            The world's most elite concierge service. Whatever you need, wherever you are — 
            we make the impossible possible, 24 hours a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#membership" className="group flex items-center gap-4 bg-[#C9A84C] text-black px-8 py-4 rounded-full font-dm font-semibold text-sm tracking-wider uppercase hover:bg-[#E8C97A] transition-all duration-300 hoverable">
              Apply for Membership
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#services" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#C9A84C]/50 hover:text-white transition-all duration-300 hoverable">
              Explore Services
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['1,200+', 'Elite Members'], ['190', 'Countries'], ['∞', 'Possibilities']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold gold-text">{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">What We Do</div>
            <h2 className="font-playfair text-5xl font-bold">Every Aspect of<br /><span className="italic gold-text">Your Life, Managed</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {services.map((s, i) => (
              <button key={s.category} onClick={() => setSelectedService(i)}
                className={`group glass rounded-2xl p-4 text-left cursor-pointer transition-all duration-300 hoverable ${
                  selectedService === i ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : 'hover:border-white/20'
                }`}>
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className="font-playfair text-lg font-bold group-hover:text-[#C9A84C] transition-colors">{s.category}</div>
              </button>
            ))}
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{services[selectedService].icon}</span>
              <h3 className="font-playfair text-2xl font-bold">{services[selectedService].category}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services[selectedService].items.map(item => (
                <div key={item} className="flex items-center gap-3 text-sm font-dm text-white/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#06030a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">The Impossible Made Possible</div>
            <h2 className="font-playfair text-5xl font-bold">Experiences That<br /><span className="italic gold-text">Don't Exist... Until You Call</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map(e => (
              <div key={e.title} className="group glass rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-all duration-500">
                <div className="text-xs font-dm text-[#C9A84C] tracking-widest uppercase mb-2">{e.category} · {e.location}</div>
                <h3 className="font-playfair text-lg font-bold mb-3 group-hover:text-[#C9A84C] transition-colors">{e.title}</h3>
                <div className="h-px bg-white/10 mb-3" />
                <p className="text-white/30 text-xs font-dm italic">{e.availability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Membership</div>
            <h2 className="font-playfair text-5xl font-bold">Choose Your Level<br /><span className="italic gold-text">of Access</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <div key={t.name} onClick={() => setSelectedTier(i)}
                className={`relative group glass rounded-2xl p-8 cursor-pointer transition-all duration-500 hoverable ${
                  selectedTier === i ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
                style={{ borderColor: selectedTier === i ? t.color + '50' : undefined }}>
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-xs font-dm font-bold px-4 py-1 rounded-full tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <div className="text-xs tracking-[0.3em] uppercase font-dm mb-2" style={{ color: t.color }}>
                  {t.name} Membership
                </div>
                <div className="font-playfair text-4xl font-bold mb-0.5" style={{ color: t.color }}>{t.price}</div>
                <div className="text-white/30 text-sm font-dm mb-6">{t.period}</div>
                <div className="space-y-3 mb-8">
                  {t.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm font-dm text-white/60">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: t.color }} />
                      {f}
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl font-dm font-semibold text-sm tracking-widest uppercase transition-all"
                  style={selectedTier === i ? { background: t.color, color: '#06030a' } : { border: `1px solid ${t.color}40`, color: t.color }}>
                  {selectedTier === i ? 'Apply Now' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase font-dm mb-4">Membership Application</div>
            <h2 className="font-playfair text-5xl font-bold">Begin Your<br />Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[['Full Name', 'Alexandre de Montfort'], ['Email', 'alexandre@family.com'],
              ['Phone', '+33 6 XX XX XX XX'], ['Country of Residence', 'France, Monaco...']].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">{l}</label>
                <input type="text" placeholder={p}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors" />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Primary Needs</label>
            <textarea rows={3} placeholder="Travel, events, lifestyle management..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-dm text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors resize-none" />
          </div>
          <button className="w-full bg-[#C9A84C] text-black py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm hover:bg-[#E8C97A] transition-colors hoverable">
            Submit Application
          </button>
          <p className="text-center text-white/20 text-xs font-dm mt-4">Membership by approval only · Complete discretion</p>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold gold-text">ConciergeOne</span>
          <p className="text-white/20 text-xs font-dm">© 2024 ConciergeOne · Ultra-Premium Lifestyle Management · Global</p>
          <Link to="/" className="text-[#C9A84C] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
