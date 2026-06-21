import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

function BuildingWireframe() {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.12
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.1
  })

  const floors = 10
  const w = 1.5, d = 1.5
  const floorH = 0.4
  const gold = new THREE.Color('#C9A96E')
  const goldDim = new THREE.Color('#3D2E0A')

  const lines = []

  for (let f = 0; f <= floors; f++) {
    const y = f * floorH - (floors * floorH) / 2
    lines.push(<Line key={`fl${f}`} points={[[-w/2,y,-d/2],[ w/2,y,-d/2],[ w/2,y, d/2],[-w/2,y, d/2],[-w/2,y,-d/2]]} color={f % 3 === 0 ? gold : goldDim} lineWidth={f % 3 === 0 ? 0.8 : 0.3} />)
  }

  const corners = [[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]]
  const bottom = -floors * floorH / 2
  const top = floors * floorH / 2
  corners.forEach(([cx, cz], i) => {
    lines.push(<Line key={`col${i}`} points={[[cx, bottom, cz],[cx, top, cz]]} color={gold} lineWidth={1} />)
  })

  return <group ref={groupRef}>{lines}</group>
}

function FloatingParticles() {
  const ref = useRef()
  const count = 800
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i*3] = (Math.random()-0.5)*12
    positions[i*3+1] = (Math.random()-0.5)*8
    positions[i*3+2] = (Math.random()-0.5)*6
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02
  })
  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent color="#C9A96E" size={0.01} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#C9A96E" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#1E3A5F" />
          <BuildingWireframe />
          <FloatingParticles />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] via-[#0A0F1E]/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E]">Immobilier de Prestige</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] mb-8 text-[#F5F0E8]">
            L'Immobilier<br />
            <span className="gradient-gold italic">d'Exception</span><br />
            à Votre Portée
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
            className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-10 max-w-xl">
            Nous sélectionnons les propriétés les plus prestigieuses pour des clients exigeants. Paris, Côte d'Azur, Genève, Dubai — votre prochaine résidence d'exception nous attend.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#propriétés" className="btn-primary flex items-center gap-3 justify-center">
              Voir les Propriétés <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline">Estimation Gratuite</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-6">
            {[['850M€+', 'Transactions Réalisées'], ['1200+', 'Propriétés Vendues'], ['15', 'Pays Couverts']].map(([n, l]) => (
              <div key={n} className="border-l border-[#C9A96E]/30 pl-4">
                <div className="font-display text-3xl text-[#C9A96E]">{n}</div>
                <div className="text-[0.65rem] tracking-widest uppercase text-[#F5F0E8]/40 mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col gap-3">
        {['Paris · 8ème', 'Monaco', 'Dubai Marina'].map(loc => (
          <div key={loc} className="flex items-center gap-2 text-[#F5F0E8]/30 text-xs">
            <MapPin size={10} className="text-[#C9A96E]/50" />
            {loc}
          </div>
        ))}
      </div>
    </section>
  )
}
