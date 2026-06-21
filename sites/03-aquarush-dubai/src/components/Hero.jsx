import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Wind, Droplets, Zap } from 'lucide-react'

function OceanWaves() {
  const meshRef = useRef()
  const geo = new THREE.PlaneGeometry(30, 30, 80, 80)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const pos = meshRef.current.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(i,
        Math.sin(x * 0.5 + t * 1.2) * 0.3 +
        Math.sin(y * 0.4 + t * 0.9) * 0.25 +
        Math.sin((x + y) * 0.3 + t * 1.5) * 0.15
      )
    }
    pos.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[30, 30, 80, 80]} />
      <meshPhongMaterial color="#003366" wireframe={false} emissive="#001A33" shininess={100} />
    </mesh>
  )
}

function SprayParticles() {
  const ref = useRef()
  const count = 500
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = Math.random() * 3 - 1.5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    velocities[i * 3] = (Math.random() - 0.5) * 0.02
    velocities[i * 3 + 1] = Math.random() * 0.04
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
  }

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * 2 + i) * 0.005
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00B4D8" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function JetSkiShape() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 1.2) * 0.1 - 0.8
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.05
  })

  return (
    <group ref={ref} position={[0, -0.8, 0]}>
      <mesh rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[3, 0.3, 0.8]} />
        <meshPhongMaterial color="#FF6B35" emissive="#882200" shininess={200} />
      </mesh>
      <mesh position={[0.2, 0.25, 0]} rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.5]} />
        <meshPhongMaterial color="#FF8C42" emissive="#662200" shininess={150} />
      </mesh>
    </group>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 3]} intensity={1.5} color="#00B4D8" />
          <pointLight position={[-5, 3, 3]} intensity={0.8} color="#FF6B35" />
          <directionalLight position={[0, 10, 5]} intensity={0.5} />
          <OceanWaves />
          <SprayParticles />
          <JetSkiShape />
          <fog attach="fog" args={['#001122', 10, 40]} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#001122]/95 via-[#001122]/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001122] via-transparent to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-[#FF6B35]/40 px-4 py-2 mb-8 bg-[#FF6B35]/5">
            <Zap size={12} className="text-[#FF6B35]" />
            <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#FF6B35]">Dubai · La Mer • JBR</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-6xl lg:text-8xl leading-[0.88] text-white mb-6">
            Ride the<br />
            <span className="gradient-cyan italic">Dubai</span><br />
            Waves
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
            Vivez l'expérience ultime sur les eaux cristallines de Dubai. Jet skis de dernière génération, instructeurs certifiés, sensations garanties.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#réserver" className="btn-primary">Réserver Maintenant</a>
            <a href="#fleet" className="btn-outline">Voir la Fleet</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}
            className="flex gap-8">
            {[['150km/h', 'Vitesse Max', Wind], ['100%', 'Sécurité', Droplets], ['5★', 'Note TripAdvisor', Zap]].map(([val, label, Icon]) => (
              <div key={val} className="text-center">
                <Icon size={16} className="text-[#00B4D8] mx-auto mb-2" />
                <div className="font-bold text-xl text-[#00B4D8]">{val}</div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dubai skyline silhouette */}
      <div className="absolute bottom-0 right-0 left-0 z-15 pointer-events-none">
        <svg viewBox="0 0 1440 200" className="w-full opacity-10">
          <path d="M0,200 L0,120 L60,120 L60,80 L80,80 L80,60 L100,60 L100,40 L120,40 L120,60 L140,60 L140,80 L180,80 L180,100 L220,100 L220,60 L240,60 L240,30 L250,20 L260,30 L260,60 L280,60 L280,90 L320,90 L320,70 L340,70 L340,50 L360,50 L360,70 L380,70 L380,90 L420,90 L420,110 L460,110 L460,80 L480,80 L480,50 L490,40 L500,50 L500,80 L540,80 L540,100 L580,100 L580,120 L620,120 L620,90 L650,90 L650,60 L670,50 L680,30 L690,50 L700,60 L700,90 L740,90 L740,110 L780,110 L780,130 L820,130 L820,100 L860,100 L860,120 L900,120 L900,100 L940,100 L940,80 L960,80 L960,60 L980,50 L1000,60 L1000,80 L1040,80 L1040,100 L1080,100 L1080,120 L1120,120 L1120,100 L1160,100 L1160,80 L1180,70 L1200,80 L1200,100 L1240,100 L1240,120 L1280,120 L1280,130 L1320,130 L1320,120 L1360,120 L1360,140 L1440,140 L1440,200 Z" fill="#00B4D8" />
        </svg>
      </div>
    </section>
  )
}
