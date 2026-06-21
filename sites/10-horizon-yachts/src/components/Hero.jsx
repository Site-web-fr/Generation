import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Compass, Anchor } from 'lucide-react'

function OceanWaves() {
  const waterRef = useRef()
  useFrame(({ clock }) => {
    if (!waterRef.current) return
    const t = clock.getElapsedTime()
    const pos = waterRef.current.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i)
      pos.setZ(i, Math.sin(x * 0.4 + t * 1.1) * 0.35 + Math.sin(y * 0.3 + t * 0.8) * 0.25)
    }
    pos.needsUpdate = true
    waterRef.current.geometry.computeVertexNormals()
  })
  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2.3, 0, 0.1]} position={[0, -1.8, 0]}>
      <planeGeometry args={[30, 25, 80, 80]} />
      <meshPhongMaterial color="#0A2D4A" emissive="#051525" shininess={60} transparent opacity={0.95} />
    </mesh>
  )
}

function YachtModel() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 0.6) * 0.1 - 0.6
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.02
  })
  return (
    <group ref={ref} position={[0.5, -0.6, 0]}>
      <mesh><boxGeometry args={[5.5, 0.6, 1.5]} /><meshPhongMaterial color="#EEF6FF" shininess={200} /></mesh>
      <mesh position={[0.5, 0.7, 0]}><boxGeometry args={[3, 0.9, 1.3]} /><meshPhongMaterial color="#E8F0F8" shininess={150} /></mesh>
      <mesh position={[1, 3.2, 0]}><cylinderGeometry args={[0.025, 0.035, 4.5, 8]} /><meshPhongMaterial color="#C9A96E" emissive="#3D2A00" /></mesh>
    </group>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2.5, 11], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 8, 5]} intensity={1.2} color="#C9A96E" />
          <pointLight position={[-6, 4, 6]} intensity={0.7} color="#19A7CE" />
          <OceanWaves />
          <YachtModel />
          <fog attach="fog" args={['#030B18', 15, 40]} />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#030B18]/95 via-[#030B18]/65 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030B18] via-transparent to-transparent z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <Compass size={14} className="text-[#C9A96E]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E]">Charter Yacht de Luxe · Méditerranée & Caraïbes</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] text-[#EEF6FF] mb-6">
            Voguez Vers<br />
            <span className="gradient-ocean italic">l'Horizon</span><br />
            Sans Limite
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-[#EEF6FF]/60 text-lg leading-relaxed mb-10 max-w-md">
            Une flotte de yachts et superyachts d'exception pour des croisières privées inoubliables. Méditerranée, Caraïbes, Océan Indien.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#charter" className="btn-primary">Réserver un Yacht</a>
            <a href="#flotte" className="btn-outline">Voir la Flotte</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-10">
            {[['45+', 'Yachts Disponibles'], ['80+', 'Destinations'], ['2000+', 'Charteristes']].map(([v, l]) => (
              <div key={v} className="border-l border-[#19A7CE]/20 pl-4">
                <div className="font-display text-3xl text-[#C9A96E]">{v}</div>
                <div className="text-[#EEF6FF]/40 text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
