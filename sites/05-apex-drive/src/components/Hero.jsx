import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Zap, Shield, Clock } from 'lucide-react'

function LuxuryCar() {
  const groupRef = useRef()
  const wheelRefs = [useRef(), useRef(), useRef(), useRef()]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05 - 0.2
    }
    wheelRefs.forEach(r => { if (r.current) r.current.rotation.x = t * 3 })
  })

  const carColor = new THREE.MeshPhysicalMaterial({
    color: '#1A0000', metalness: 0.9, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0
  })
  const redAccent = new THREE.MeshPhongMaterial({ color: '#DC143C', emissive: '#400000' })
  const chromeMat = new THREE.MeshPhysicalMaterial({ color: '#C0C0C0', metalness: 1, roughness: 0 })
  const glassMat = new THREE.MeshPhysicalMaterial({ color: '#1A2A3A', transparent: true, opacity: 0.4, metalness: 0.1, roughness: 0 })

  return (
    <group ref={groupRef}>
      {/* Car body - low profile */}
      <mesh position={[0, 0.1, 0]} material={carColor}>
        <boxGeometry args={[4.2, 0.5, 1.8]} />
      </mesh>
      {/* Cabin/roof */}
      <mesh position={[0.2, 0.55, 0]} material={carColor}>
        <boxGeometry args={[2.2, 0.55, 1.6]} />
      </mesh>
      {/* Glass */}
      <mesh position={[0.2, 0.58, 0]} material={glassMat}>
        <boxGeometry args={[1.8, 0.4, 1.4]} />
      </mesh>
      {/* Front */}
      <mesh position={[1.9, -0.05, 0]} material={carColor}>
        <boxGeometry args={[0.5, 0.4, 1.8]} />
      </mesh>
      {/* Rear */}
      <mesh position={[-1.9, -0.05, 0]} material={carColor}>
        <boxGeometry args={[0.5, 0.4, 1.8]} />
      </mesh>
      {/* Red accents */}
      <mesh position={[-2.1, 0, 0]} material={redAccent}>
        <boxGeometry args={[0.05, 0.08, 1.5]} />
      </mesh>
      <mesh position={[2.1, 0, 0]} material={redAccent}>
        <boxGeometry args={[0.05, 0.08, 1.5]} />
      </mesh>
      {/* Wheels */}
      {[[1.3, -0.3, 1.05], [1.3, -0.3, -1.05], [-1.3, -0.3, 1.05], [-1.3, -0.3, -1.05]].map(([x,y,z], i) => (
        <group key={i} position={[x,y,z]}>
          <mesh ref={wheelRefs[i]} rotation={[0, 0, Math.PI/2]} material={chromeMat}>
            <torusGeometry args={[0.35, 0.15, 8, 20]} />
          </mesh>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 12]} />
            <meshPhongMaterial color="#1A1A1A" />
          </mesh>
        </group>
      ))}
      {/* Ground reflection glow */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[6, 3]} />
        <meshBasicMaterial color="#DC143C" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

function SpeedLines() {
  const ref = useRef()
  const count = 300
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i*3] = (Math.random()-0.5)*20
    positions[i*3+1] = (Math.random()-0.5)*8
    positions[i*3+2] = (Math.random()-0.5)*15 - 5
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i*3] += 0.08
      if (pos[i*3] > 10) pos[i*3] = -10
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#DC143C" size={0.02} transparent opacity={0.3} />
    </points>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 8], fov: 55 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 5, 5]} intensity={1.5} color="#DC143C" />
          <pointLight position={[-5, 3, 3]} intensity={0.8} color="#C0C0C0" />
          <pointLight position={[5, 2, -3]} intensity={0.6} color="#F5F5F5" />
          <LuxuryCar />
          <SpeedLines />
          {/* Ground */}
          <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.8, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshPhongMaterial color="#0A0A0A" />
          </mesh>
          <fog attach="fog" args={['#080808', 15, 40]} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[0.65rem] tracking-[0.4em] uppercase text-[#DC143C] mb-6 flex items-center gap-3">
            <div className="w-8 h-px bg-[#DC143C]" />
            Location Premium · Paris · Monaco · Dubai
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-7xl lg:text-9xl leading-[0.85] text-white mb-8">
            Drive<br />
            <span className="gradient-red italic">Beyond</span><br />
            Limits
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
            Lamborghini, Ferrari, Rolls-Royce, Bentley — la crème des automobiles à votre disposition. Configurez votre location en quelques clics.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#configurateur" className="btn-primary">Configurer Ma Location</a>
            <a href="#fleet" className="btn-outline">Voir la Flotte</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-8">
            {[['100+', 'Véhicules', Zap], ['24/7', 'Service', Clock], ['Assurance', 'Incluse', Shield]].map(([val, label, Icon]) => (
              <div key={val}>
                <Icon size={14} className="text-[#DC143C] mb-1" />
                <div className="text-white font-bold text-lg">{val}</div>
                <div className="text-white/30 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
