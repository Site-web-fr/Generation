import { useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Sphere, Float, MeshDistortMaterial } from '@react-three/drei'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

function OceanScene() {
  const ref = useRef()
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.08
    ref.current.material.distort = Math.abs(Math.sin(t * 0.4)) * 0.3 + 0.2
    ring1.current.rotation.z = t * 0.3
    ring2.current.rotation.z = -t * 0.2
  })

  return (
    <>
      <Sphere ref={ref} args={[3, 80, 80]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#E8F5FF" distort={0.25} speed={1} roughness={0.05} metalness={0.95} transparent opacity={0.12} />
      </Sphere>
      <Torus ref={ring1} args={[4, 0.03, 8, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#87CEEB" emissive="#87CEEB" emissiveIntensity={0.4} transparent opacity={0.5} />
      </Torus>
      <Torus ref={ring2} args={[5.5, 0.015, 8, 100]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshStandardMaterial color="#B0E0E6" emissive="#B0E0E6" emissiveIntensity={0.3} transparent opacity={0.3} />
      </Torus>
      {[...Array(60)].map((_, i) => {
        const theta = (i / 60) * Math.PI * 2
        const r = 3.8 + Math.random() * 1.5
        return (
          <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.5}>
            <Sphere args={[0.02, 4, 4]} position={[Math.cos(theta) * r, Math.sin(theta * 2) * 0.5, Math.sin(theta) * r]}>
              <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
            </Sphere>
          </Float>
        )
      })}
    </>
  )
}

const packages = [
  {
    name: 'Pearl', price: '€890', tagline: 'Essential Shine',
    color: '#87CEEB', bg: 'from-[#0a1520] to-[#050810]',
    features: [
      'Full exterior wash',
      'Deck scrub & rinse',
      'Hull cleaning',
      'Window polishing',
      'Basic interior vacuum',
    ],
    duration: '4-6 hours',
    size: 'Up to 40ft',
    popular: false,
  },
  {
    name: 'Diamond', price: '€2,400', tagline: 'Premium Detail',
    color: '#C9A84C', bg: 'from-[#1a1000] to-[#0a0800]',
    features: [
      'Everything in Pearl',
      'Wax & polish treatment',
      'Interior deep clean',
      'Leather conditioning',
      'Engine bay cleaning',
      'Anti-fouling treatment',
      'Teak deck restoration',
    ],
    duration: '1-2 days',
    size: 'Up to 80ft',
    popular: true,
  },
  {
    name: 'Sovereign', price: 'Custom', tagline: 'Superyacht White Glove',
    color: '#E8C97A', bg: 'from-[#1a1200] to-[#100c00]',
    features: [
      'Everything in Diamond',
      'Full paint correction',
      'Ceramic coating',
      'Underwater hull painting',
      'Brightwork restoration',
      'Mast & rigging detail',
      'Monthly maintenance plan',
      'Dedicated crew',
    ],
    duration: '3-7 days',
    size: 'Any size',
    popular: false,
  },
]

const process = [
  { n: '01', title: 'Inspection & Quote', desc: 'Our expert visits your vessel for a full inspection and delivers a tailored quote within 24h.' },
  { n: '02', title: 'Mobilization', desc: 'Our team arrives with professional-grade marine equipment and eco-certified products.' },
  { n: '03', title: 'Precision Detailing', desc: 'Every surface treated with surgical precision — from hull to helm, below and above waterline.' },
  { n: '04', title: 'Quality Control', desc: 'Final walk-through with our master detailer ensuring perfection before handover.' },
]

const testimonials = [
  { name: 'Laurent Beauchamp', vessel: 'M/Y Azure Spirit (72ft Sunseeker)', text: 'Exceptional work. My yacht came back looking better than the day I bought it. The ceramic coating is still perfect 8 months later.', rating: 5 },
  { name: 'Sofia Marchetti', vessel: 'S/Y Adriatica (55ft Beneteau)', text: 'Finally found a team that treats my boat as their own. Discrete, punctual, and absolutely meticulous. I recommend to all my marina neighbors.', rating: 5 },
  { name: 'Khalid Al-Mansouri', vessel: 'M/Y Desert Wind (95ft Ferretti)', text: 'The Sovereign package transformed my superyacht. The attention to detail is extraordinary. Worth every euro.', rating: 5 },
]

export default function YachtCleaning() {
  const [selectedPackage, setSelectedPackage] = useState(1)
  const [vesselLength, setVesselLength] = useState(50)
  const [vesselType, setVesselType] = useState('Motor Yacht')

  useEffect(() => {
    document.title = 'YachtShine — Premium Marine Detailing'
  }, [])

  const estimatedPrice = () => {
    const base = [890, 2400, 4800][selectedPackage]
    const multiplier = vesselLength <= 40 ? 1 : vesselLength <= 60 ? 1.4 : vesselLength <= 80 ? 2 : 3.2
    return selectedPackage === 2 ? 'Custom Quote' : `€${Math.round(base * multiplier).toLocaleString()}`
  }

  return (
    <div className="bg-[#040810] text-white min-h-screen overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between">
        <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#87CEEB]" />
          <span className="font-cormorant text-xl font-bold tracking-wide" style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>YachtShine</span>
        </div>
        <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
          {['Services', 'Process', 'Fleet', 'Testimonials', 'Contact'].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm font-dm text-white/60 hover:text-[#87CEEB] transition-colors hoverable">{n}</a>
          ))}
        </div>
        <a href="#contact" className="glass px-6 py-3 rounded-full text-sm font-dm border border-[#87CEEB]/30 text-[#87CEEB] hover:bg-[#87CEEB]/10 transition-all hoverable">
          Get a Quote
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} intensity={3} color="#87CEEB" />
            <pointLight position={[-5, -3, 5]} intensity={1} color="#4FA8D5" />
            <pointLight position={[0, -5, 3]} intensity={0.5} color="#ffffff" />
            <OceanScene />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#040810] via-[#040810]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040810] to-transparent opacity-80" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#87CEEB]" />
            <span className="text-xs tracking-[0.4em] text-[#87CEEB] uppercase font-dm">Marine Excellence · Since 2015</span>
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-[0.85] mb-6">
            <span className="text-white">Pristine.</span><br />
            <span className="italic" style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Always.</span>
          </h1>
          <p className="font-dm text-white/50 text-lg max-w-xl leading-relaxed mb-10">
            White-glove yacht detailing for vessels that deserve perfection. 
            From 30-foot sailboats to 120-foot superyachts — every detail matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="group flex items-center gap-4 py-4 px-8 rounded-full font-dm font-semibold text-sm tracking-wider uppercase transition-all duration-300 hoverable"
              style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', color:'#040810'}}>
              Request Quote
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#services" className="flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-white/70 hover:border-[#87CEEB]/50 hover:text-white transition-all duration-300 hoverable">
              View Packages
            </a>
          </div>
          <div className="flex gap-12 mt-16">
            {[['500+', 'Yachts Detailed'], ['100%', 'Eco Products'], ['8', 'Years Excellence']].map(([n, l]) => (
              <div key={l}>
                <div className="font-playfair text-3xl font-bold" style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>{n}</div>
                <div className="text-white/40 text-xs font-dm mt-1 tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="services" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#87CEEB] uppercase font-dm mb-4">Detailing Packages</div>
            <h2 className="font-playfair text-5xl font-bold">Choose Your<br /><span className="italic text-[#87CEEB]">Level of Perfection</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((p, i) => (
              <div
                key={p.name}
                onClick={() => setSelectedPackage(i)}
                className={`relative group glass rounded-2xl p-8 cursor-pointer transition-all duration-500 hoverable ${
                  selectedPackage === i ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
                style={{ borderColor: selectedPackage === i ? p.color + '60' : undefined }}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-xs font-dm font-bold px-4 py-1 rounded-full tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                <div className="text-xs tracking-[0.3em] uppercase font-dm mb-2" style={{ color: p.color }}>{p.tagline}</div>
                <h3 className="font-cormorant text-4xl font-bold mb-1" style={{ color: p.color }}>{p.name}</h3>
                <div className="font-playfair text-3xl font-bold text-white mb-1">{p.price}</div>
                <div className="text-white/30 text-xs font-dm mb-6">{p.size} · {p.duration}</div>
                <div className="space-y-3 mb-8">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm font-dm text-white/60">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 rounded-xl font-dm font-semibold text-sm tracking-widest uppercase transition-all"
                  style={selectedPackage === i
                    ? { background: p.color, color: '#040810' }
                    : { border: `1px solid ${p.color}40`, color: p.color }
                  }
                >
                  {selectedPackage === i ? 'Selected' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#040810]">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-14">
            <div className="text-center mb-10">
              <div className="text-xs tracking-[0.4em] text-[#87CEEB] uppercase font-dm mb-4">Instant Estimate</div>
              <h2 className="font-playfair text-4xl font-bold">Configure Your<br />Detailing Service</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">
                  Vessel Length: {vesselLength}ft
                </label>
                <input type="range" min={20} max={150} step={5} value={vesselLength}
                  onChange={e => setVesselLength(+e.target.value)}
                  className="w-full accent-[#87CEEB]" />
                <div className="flex justify-between text-xs font-dm text-white/20 mt-1">
                  <span>20ft</span><span>150ft+</span>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest text-white/30 uppercase font-dm mb-2">Vessel Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Motor Yacht', 'Sailboat', 'Superyacht'].map(t => (
                    <button key={t}
                      onClick={() => setVesselType(t)}
                      className={`py-2 rounded-xl text-xs font-dm transition-all hoverable ${
                        vesselType === t ? 'bg-[#87CEEB]/20 border border-[#87CEEB]/50 text-[#87CEEB]' : 'glass border border-white/10 text-white/40'
                      }`}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center justify-between mb-8">
              <div>
                <div className="text-xs font-dm text-white/30 tracking-widest uppercase mb-1">Estimated Price</div>
                <div className="font-playfair text-4xl font-bold" style={{color:'#87CEEB'}}>{estimatedPrice()}</div>
                <div className="text-white/30 text-sm font-dm mt-1">
                  {packages[selectedPackage].name} · {vesselLength}ft {vesselType}
                </div>
              </div>
              <div className="text-5xl">⚓</div>
            </div>

            <button className="w-full py-5 rounded-xl font-dm font-semibold tracking-widest uppercase text-sm transition-all hoverable"
              style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', color:'#040810'}}>
              Request Detailed Quote
            </button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#87CEEB] uppercase font-dm mb-4">How We Work</div>
            <h2 className="font-playfair text-5xl font-bold">The YachtShine<br /><span className="italic text-[#87CEEB]">Method</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((s, i) => (
              <div key={s.n} className="group glass rounded-2xl p-6 hover:border-[#87CEEB]/30 transition-all duration-500">
                <div className="font-cormorant text-5xl font-bold text-[#87CEEB]/20 mb-4">{s.n}</div>
                <h3 className="font-playfair text-lg font-bold mb-3 group-hover:text-[#87CEEB] transition-colors">{s.title}</h3>
                <p className="text-white/40 text-sm font-dm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#040810]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] text-[#87CEEB] uppercase font-dm mb-4">Client Reviews</div>
            <h2 className="font-playfair text-5xl font-bold">What Owners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-8 hover:border-[#87CEEB]/20 transition-all duration-500">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-white/60 text-sm font-dm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-playfair text-base font-bold" style={{color:'#87CEEB'}}>{t.name}</div>
                  <div className="text-white/30 text-xs font-dm">{t.vessel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-14">
            <h2 className="font-playfair text-5xl font-bold mb-4">
              Ready to Transform<br /><span className="italic text-[#87CEEB]">Your Vessel?</span>
            </h2>
            <p className="text-white/40 font-dm mb-10 max-w-xl mx-auto">
              Our team is available 7 days a week for inspections and emergency cleaning services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33123456789" className="group flex items-center justify-center gap-3 py-4 px-8 rounded-full font-dm font-semibold text-sm tracking-wider uppercase transition-all hoverable"
                style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', color:'#040810'}}>
                Call +33 1 23 45 67 89
              </a>
              <a href="mailto:contact@yachtshine.fr" className="flex items-center justify-center gap-3 border border-[#87CEEB]/30 px-8 py-4 rounded-full font-dm text-sm tracking-wider uppercase text-[#87CEEB] hover:bg-[#87CEEB]/10 transition-all hoverable">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-2xl font-bold" style={{background:'linear-gradient(135deg,#87CEEB,#4FA8D5)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>YachtShine</span>
          <p className="text-white/20 text-xs font-dm">© 2024 YachtShine · Premium Marine Detailing · French Riviera</p>
          <Link to="/" className="text-[#87CEEB] text-xs font-dm hoverable">← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  )
}
