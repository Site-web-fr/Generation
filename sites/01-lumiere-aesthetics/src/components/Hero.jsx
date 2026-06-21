import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ArrowDown, Star } from 'lucide-react'

function ParticleSphere({ mouse }) {
  const pointsRef = useRef()
  const count = 3000
  const positions = new Float32Array(count * 3)
  const originalPositions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = Math.acos(2 * Math.random() - 1)
    const phi = 2 * Math.PI * Math.random()
    const r = 2 + Math.random() * 0.3
    const x = r * Math.sin(theta) * Math.cos(phi)
    const y = r * Math.sin(theta) * Math.sin(phi)
    const z = r * Math.cos(theta)
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    originalPositions[i * 3] = x
    originalPositions[i * 3 + 1] = y
    originalPositions[i * 3 + 2] = z
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.08
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.2

    const pos = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3]
      const oy = originalPositions[i * 3 + 1]
      const oz = originalPositions[i * 3 + 2]
      const wave = Math.sin(t * 0.8 + i * 0.01) * 0.08
      pos[i * 3] = ox + wave * (mouse.current.x * 0.3)
      pos[i * 3 + 1] = oy + Math.sin(t * 0.5 + i * 0.02) * 0.06
      pos[i * 3 + 2] = oz + wave
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A96E"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function RingEffect() {
  const ringRef = useRef()
  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = t * 0.15
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1
  })
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.6, 0.008, 2, 120]} />
      <meshBasicMaterial color="#C9A96E" transparent opacity={0.3} />
    </mesh>
  )
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const { gl } = useThree()

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    gl.domElement.addEventListener('mousemove', onMove)
    return () => gl.domElement.removeEventListener('mousemove', onMove)
  }, [gl])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#C9A96E" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B2252" />
      <ParticleSphere mouse={mouse} />
      <RingEffect />
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/50 to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9A96E" color="#C9A96E" />)}
            </div>
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[#C9A96E]/80">Excellence & Prestige</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] mb-6 text-[#FAFAF7]"
          >
            L'Art de la<br />
            <span className="gradient-gold italic">Beauté</span><br />
            Sublimée
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#FAFAF7]/60 text-lg leading-relaxed mb-10 max-w-md"
          >
            Centre de chirurgie esthétique d'exception. Des résultats naturels et harmonieux,
            signés par les meilleurs experts mondiaux.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#booking" className="btn-primary">Consultation Gratuite</a>
            <a href="#services" className="btn-outline">Nos Traitements</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-8 mt-16"
          >
            {[['2000+', 'Patients Satisfaits'], ['15+', 'Années d\'Expertise'], ['98%', 'Taux de Satisfaction']].map(([num, label]) => (
              <div key={num}>
                <div className="font-display text-3xl text-[#C9A96E]">{num}</div>
                <div className="text-[0.7rem] tracking-widest text-[#FAFAF7]/50 uppercase mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E]/50">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-[#C9A96E]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
