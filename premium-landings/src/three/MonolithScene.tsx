import { Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

/** Abstract architectural tower of polished glass slabs — real estate hero. */
function Tower({ color }: { color: string }) {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = t * 0.18
  })

  const slabs = [
    { y: -2.1, w: 2.8, d: 2.8, h: 0.55, rot: 0 },
    { y: -1.4, w: 2.5, d: 2.5, h: 0.55, rot: 0.18 },
    { y: -0.7, w: 2.2, d: 2.2, h: 0.55, rot: 0.36 },
    { y: 0.0, w: 1.9, d: 1.9, h: 0.55, rot: 0.54 },
    { y: 0.7, w: 1.6, d: 1.6, h: 0.55, rot: 0.72 },
    { y: 1.4, w: 1.3, d: 1.3, h: 0.55, rot: 0.9 },
    { y: 2.1, w: 1.0, d: 1.0, h: 0.55, rot: 1.08 },
  ]

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} position={[0, -0.2, 0]}>
        {slabs.map((s, i) => (
          <RoundedBox
            key={i}
            args={[s.w, s.h, s.d]}
            radius={0.06}
            smoothness={4}
            position={[0, s.y, 0]}
            rotation={[0, s.rot, 0]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? '#1a1d24' : color}
              metalness={0.95}
              roughness={0.14}
              envMapIntensity={1.1}
            />
          </RoundedBox>
        ))}
      </group>
    </Float>
  )
}

export default function MonolithScene({ color = '#c8a26a' }: { color?: string }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 8, 4]} intensity={1.6} />
      <Tower color={color} />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, -5]} scale={[10, 5, 1]} color="#fff" />
        <Lightformer intensity={1.4} position={[-6, 1, 2]} scale={[5, 8, 1]} color={color} />
        <Lightformer intensity={1} position={[6, -2, 2]} scale={[5, 8, 1]} color="#88aaff" />
      </Environment>
    </>
  )
}
