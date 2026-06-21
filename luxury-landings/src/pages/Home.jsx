import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })
  return (
    <Sphere ref={meshRef} args={[1.5, 100, 100]}>
      <MeshDistortMaterial
        color="#C9A84C"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </Sphere>
  )
}

const sites = [
  {
    id: 1, path: '/aesthetic-surgery',
    title: 'AesthetiCare', subtitle: 'Aesthetic Surgery Center',
    desc: 'Redefining beauty through precision medicine and artistry.',
    color: '#B8860B', bg: 'from-[#0A0A0A] to-[#1a0a2e]',
    tag: 'Medical Excellence'
  },
  {
    id: 2, path: '/real-estate',
    title: 'LuxEstate', subtitle: 'Premium Real Estate Agency',
    desc: 'Extraordinary properties for extraordinary lives.',
    color: '#8B7355', bg: 'from-[#0A0A0A] to-[#1a1208]',
    tag: 'Ultra-Luxury Properties'
  },
  {
    id: 3, path: '/jetski-dubai',
    title: 'WaveRider', subtitle: 'Jet Ski Rental — Dubai',
    desc: 'Conquer the Arabian Gulf with unmatched power.',
    color: '#006994', bg: 'from-[#0A0A0A] to-[#001a2e]',
    tag: 'Dubai Waterfront'
  },
  {
    id: 4, path: '/yacht-cleaning',
    title: 'YachtShine', subtitle: 'Premium Yacht & Boat Detailing',
    desc: 'White-glove yacht maintenance for the discerning owner.',
    color: '#1B4F72', bg: 'from-[#0A0A0A] to-[#001a1a]',
    tag: 'Marine Excellence'
  },
  {
    id: 5, path: '/vehicle-rental',
    title: 'PrimeFleet', subtitle: 'Ultra-Luxury Vehicle Rental',
    desc: 'Configure your perfect drive. Lamborghini to Rolls-Royce.',
    color: '#8B0000', bg: 'from-[#0A0A0A] to-[#1a0000]',
    tag: 'Supercar Collection'
  },
  {
    id: 6, path: '/private-jet',
    title: 'AeroPrivé', subtitle: 'Private Aviation & Charter',
    desc: 'Your sky, your schedule. Global reach, ultimate discretion.',
    color: '#2C3E50', bg: 'from-[#0A0A0A] to-[#0a0a1a]',
    tag: 'Private Aviation'
  },
  {
    id: 7, path: '/luxury-concierge',
    title: 'ConciergeOne', subtitle: 'Ultra-Premium Concierge',
    desc: 'Every desire anticipated. Every request fulfilled.',
    color: '#4A235A', bg: 'from-[#0A0A0A] to-[#1a001a]',
    tag: 'Global Concierge'
  },
  {
    id: 8, path: '/interior-design',
    title: 'VistaAtelier', subtitle: 'Luxury Interior Architecture',
    desc: 'Spaces that whisper perfection to all five senses.',
    color: '#7D6608', bg: 'from-[#0A0A0A] to-[#1a1400]',
    tag: 'Interior Architecture'
  },
  {
    id: 9, path: '/wine-spirits',
    title: 'CellarMaître', subtitle: 'Fine Wines & Grand Spirits',
    desc: 'Curated excellence from the world\'s finest estates.',
    color: '#6C1433', bg: 'from-[#0A0A0A] to-[#1a0010]',
    tag: 'Fine Spirits'
  },
  {
    id: 10, path: '/event-planning',
    title: 'EventCouture', subtitle: 'Bespoke Event Design',
    desc: 'Unforgettable experiences crafted for those who demand more.',
    color: '#1A5276', bg: 'from-[#0A0A0A] to-[#00101a]',
    tag: 'Exclusive Events'
  }
]

export default function Home() {
  const titleRef = useRef()
  const gridRef = useRef()

  useEffect(() => {
    document.title = 'Luxury Digital Experiences — Premium Landing Pages'
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <AnimatedSphere />
          </Canvas>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase mb-8 font-dm">
            10 Premium Digital Experiences
          </div>
          <h1 className="font-playfair text-7xl md:text-9xl font-black leading-none mb-6">
            <span className="gold-text">Luxury</span><br />
            <span className="text-white">Reimagined</span>
          </h1>
          <p className="font-dm text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            A curated collection of ultra-premium digital experiences. 
            Each crafted with obsessive detail for clients who accept nothing less than extraordinary.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm tracking-widest font-dm uppercase">Explore the Collection</span>
            <div className="h-px w-20 bg-[#C9A84C]" />
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="px-6 md:px-12 lg:px-24 py-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sites.map((site, i) => (
            <Link
              key={site.id}
              to={site.path}
              className="group relative block rounded-2xl overflow-hidden glass border border-white/5 hover:border-[#C9A84C]/30 transition-all duration-700 hover:-translate-y-2 hoverable"
            >
              {/* Number */}
              <div className="absolute top-6 right-6 font-cormorant text-6xl font-bold text-white/5 group-hover:text-[#C9A84C]/10 transition-colors duration-500">
                {String(site.id).padStart(2, '0')}
              </div>

              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${site.bg} opacity-60`} />
              
              {/* Content */}
              <div className="relative z-10 p-8 pt-10 pb-10 flex flex-col min-h-[280px]">
                <div className="text-xs tracking-[0.3em] uppercase mb-3 font-dm" style={{ color: site.color }}>
                  {site.tag}
                </div>
                <h2 className="font-playfair text-4xl font-bold text-white mb-1 group-hover:text-[#E8C97A] transition-colors duration-300">
                  {site.title}
                </h2>
                <p className="text-white/40 text-sm font-dm mb-4">{site.subtitle}</p>
                <p className="text-white/60 text-sm font-dm leading-relaxed flex-1">{site.desc}</p>
                
                {/* CTA */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-[#C9A84C] text-sm font-dm tracking-widest uppercase">View Site</span>
                  <div className="h-px flex-1 bg-[#C9A84C]/20 group-hover:bg-[#C9A84C]/60 transition-colors duration-500" />
                  <svg
                    className="text-[#C9A84C] group-hover:translate-x-2 transition-transform duration-300"
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${site.color}15 0%, transparent 70%)` }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-16 border-t border-white/5">
        <div className="text-[#C9A84C] font-cormorant text-2xl mb-2">10,000€ Per Site</div>
        <p className="text-white/30 text-sm font-dm">Ultra-Premium Digital Experiences · Crafted with Obsessive Detail</p>
      </footer>
    </div>
  )
}
