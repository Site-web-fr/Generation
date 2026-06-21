import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Anchor, Shield, Star } from 'lucide-react'

function YachtScene() {
  const groupRef = useRef()
  const waterRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.12
      groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.015
    }
    if (waterRef.current) {
      const pos = waterRef.current.geometry.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i)
        pos.setZ(i, Math.sin(x * 0.6 + t * 1.1) * 0.25 + Math.sin(y * 0.4 + t * 0.8) * 0.18)
      }
      pos.needsUpdate = true
      waterRef.current.geometry.computeVertexNormals()
    }
  })

  return (
    <>
      {/* Water */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[25, 20, 60, 60]} />
        <meshPhongMaterial color="#0A3D62" emissive="#051B2E" shininess={80} transparent opacity={0.9} />
      </mesh>

      {/* Yacht Hull */}
      <group ref={groupRef} position={[0, -0.3, 0]}>
        <mesh>
          <boxGeometry args={[5, 0.5, 1.2]} />
          <meshPhongMaterial color="#F0F6FF" emissive="#0A1428" shininess={200} />
        </mesh>
        <mesh position={[0.3, 0.6, 0]}>
          <boxGeometry args={[3, 0.8, 1]} />
          <meshPhongMaterial color="#E8EFF8" emissive="#0A1428" shininess={150} />
        </mesh>
        {/* Mast */}
        <mesh position={[0.5, 2.5, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 4, 8]} />
          <meshPhongMaterial color="#C9A96E" emissive="#3D2A00" shininess={100} />
        </mesh>
      </group>

      {/* Reflections/particles */}
      {Array.from({ length: 200 }, (_, i) => {
        const x = (Math.random() - 0.5) * 20
        const z = (Math.random() - 0.5) * 15
        return (
          <mesh key={i} position={[x, -1.7 + Math.random() * 0.1, z]}>
            <sphereGeometry args={[0.03, 4, 4]} />
            <meshBasicMaterial color="#A8D8E8" transparent opacity={0.4 + Math.random() * 0.4} />
          </mesh>
        )
      })}
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 10], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[6, 6, 4]} intensity={1.2} color="#C9A96E" />
          <pointLight position={[-6, 4, 6]} intensity={0.6} color="#A8D8E8" />
          <directionalLight position={[0, 8, 0]} intensity={0.4} color="#F0F6FF" />
          <YachtScene />
          <fog attach="fog" args={['#040E1A', 15, 35]} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#040E1A] via-[#040E1A]/75 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040E1A] via-transparent to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <Anchor size={14} className="text-[#C9A96E]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E]">Services de Détailing Premium</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-6xl lg:text-7xl leading-[0.9] text-[#F0F6FF] mb-6">
            Votre Yacht<br />
            <span className="gradient-gold italic">Immaculé</span><br />
            à Chaque Escale
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[#F0F6FF]/60 text-lg leading-relaxed mb-10 max-w-md">
            Service de nettoyage et détailing haut de gamme pour superyachts et yachts de luxe. Nos équipes spécialisées interviennent dans tous les ports de la Méditerranée.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#contact" className="btn-primary">Demander un Devis</a>
            <a href="#services" className="btn-outline">Nos Services</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-8">
            {[['500+', 'Yachts Traités', Shield], ['8 ans', 'Expérience', Anchor], ['5.0★', 'Note Moyenne', Star]].map(([val, label, Icon]) => (
              <div key={val}>
                <Icon size={14} className="text-[#C9A96E] mb-1" />
                <div className="font-display text-2xl text-[#C9A96E]">{val}</div>
                <div className="text-[#F0F6FF]/40 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
