import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, -0.55, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.42, 0.42, 0.34, 32]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.175, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 24]} />
        <meshStandardMaterial color="#cfcfcf" metalness={1} roughness={0.18} />
      </mesh>
    </group>
  )
}

function Car({ color, finishRoughness }: { color: string; finishRoughness: number }) {
  return (
    <group position={[0, 0.1, 0]}>
      {/* lower body */}
      <RoundedBox args={[3.4, 0.55, 1.5]} radius={0.22} smoothness={5} position={[0, -0.15, 0]}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.7}
          roughness={finishRoughness}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* mid body (wider) */}
      <RoundedBox args={[3.0, 0.5, 1.62]} radius={0.26} smoothness={5} position={[0, 0.18, 0]}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.7}
          roughness={finishRoughness}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* cabin / greenhouse */}
      <RoundedBox args={[1.7, 0.5, 1.32]} radius={0.24} smoothness={5} position={[-0.1, 0.55, 0]}>
        <meshPhysicalMaterial color="#0a0d12" metalness={0.9} roughness={0.06} clearcoat={1} />
      </RoundedBox>
      {/* windshield wedge */}
      <mesh position={[0.78, 0.5, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.5, 1.28]} />
        <meshPhysicalMaterial color="#0a0d12" metalness={0.9} roughness={0.05} clearcoat={1} />
      </mesh>
      {/* front splitter */}
      <RoundedBox args={[0.5, 0.16, 1.55]} radius={0.06} smoothness={3} position={[1.6, -0.42, 0]}>
        <meshStandardMaterial color="#0a0a0c" metalness={0.5} roughness={0.5} />
      </RoundedBox>
      {/* rear diffuser */}
      <RoundedBox args={[0.4, 0.18, 1.5]} radius={0.06} smoothness={3} position={[-1.62, -0.4, 0]}>
        <meshStandardMaterial color="#0a0a0c" metalness={0.5} roughness={0.5} />
      </RoundedBox>
      {/* headlights */}
      <mesh position={[1.66, 0.02, 0.5]}>
        <boxGeometry args={[0.08, 0.12, 0.32]} />
        <meshStandardMaterial color="#fff7e6" emissive="#fff2cc" emissiveIntensity={2.4} />
      </mesh>
      <mesh position={[1.66, 0.02, -0.5]}>
        <boxGeometry args={[0.08, 0.12, 0.32]} />
        <meshStandardMaterial color="#fff7e6" emissive="#fff2cc" emissiveIntensity={2.4} />
      </mesh>
      {/* taillight bar */}
      <mesh position={[-1.68, 0.05, 0]}>
        <boxGeometry args={[0.06, 0.1, 1.2]} />
        <meshStandardMaterial color="#ff3b30" emissive="#ff2d22" emissiveIntensity={2.2} />
      </mesh>
      <Wheel x={1.05} z={0.78} />
      <Wheel x={1.05} z={-0.78} />
      <Wheel x={-1.05} z={0.78} />
      <Wheel x={-1.05} z={-0.78} />
    </group>
  )
}

interface CarSceneProps {
  color?: string
  /** matte vs gloss finish */
  finishRoughness?: number
  autoRotate?: boolean
}

export default function CarScene({
  color = '#d8553f',
  finishRoughness = 0.18,
  autoRotate = true,
}: CarSceneProps) {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current || autoRotate) return
    // gentle idle bob when auto-rotate is off
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.04
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 3]} intensity={2} castShadow />
      <spotLight position={[-6, 6, -4]} intensity={120} angle={0.5} penumbra={1} color="#ffffff" />
      <group ref={group}>
        <Car color={color} finishRoughness={finishRoughness} />
      </group>
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.6}
        scale={12}
        blur={2.4}
        far={4}
        color="#000000"
      />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 4, -3]} scale={[12, 4, 1]} color="#ffffff" />
        <Lightformer intensity={2} position={[-5, 2, 1]} scale={[3, 8, 1]} color="#fff0d0" />
        <Lightformer intensity={2} position={[5, 2, 1]} scale={[3, 8, 1]} color="#cfe0ff" />
        <Lightformer intensity={1.4} position={[0, -3, 2]} scale={[10, 4, 1]} color="#ffffff" />
      </Environment>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.9}
      />
    </>
  )
}
