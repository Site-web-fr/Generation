import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

/** Refined, breathing orb — used for the aesthetic clinic hero. */
function Orb({ color }: { color: string }) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.12
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.15
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={2.1}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          distort={0.32}
          speed={1.4}
          roughness={0.12}
          metalness={0.65}
          envMapIntensity={0.6}
        />
      </mesh>
    </Float>
  )
}

export default function OrbScene({ color = '#cfa6c9' }: { color?: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -3, -2]} intensity={30} color={color} />
      <pointLight position={[4, -4, 4]} intensity={14} color="#ffffff" />
      <Orb color={color} />
      <Sparkles count={70} scale={9} size={2.4} speed={0.3} color={color} opacity={0.7} />
    </>
  )
}
