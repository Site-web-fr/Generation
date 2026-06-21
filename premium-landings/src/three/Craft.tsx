import { RoundedBox } from '@react-three/drei'

/** Sleek stylized jet ski built from primitives. */
export function JetSki({ color = '#39c2d6' }: { color?: string }) {
  return (
    <group rotation={[0, -0.5, 0.04]} scale={1.15}>
      {/* hull */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.42, 2.1, 12, 24]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
      </mesh>
      {/* nose accent */}
      <mesh position={[1.35, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.42, 0.7, 24]} />
        <meshStandardMaterial color="#0c0e13" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* seat */}
      <RoundedBox args={[1.1, 0.34, 0.6]} radius={0.16} smoothness={4} position={[-0.2, 0.4, 0]}>
        <meshStandardMaterial color="#0c0e13" metalness={0.4} roughness={0.5} />
      </RoundedBox>
      {/* handlebar column */}
      <mesh position={[0.55, 0.55, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 12]} />
        <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.72, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.7, 12]} />
        <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

/** Stylized motor-yacht built from primitives. */
export function Yacht({ color = '#cfeee5' }: { color?: string }) {
  return (
    <group rotation={[0, -0.6, 0]} scale={0.9} position={[0, 0.1, 0]}>
      {/* hull */}
      <RoundedBox args={[4.6, 0.7, 1.3]} radius={0.3} smoothness={5} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.25} />
      </RoundedBox>
      {/* bow wedge */}
      <mesh position={[2.5, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.62, 1.1, 4]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.25} />
      </mesh>
      {/* superstructure */}
      <RoundedBox args={[2.2, 0.6, 1.0]} radius={0.16} smoothness={4} position={[-0.4, 0.62, 0]}>
        <meshStandardMaterial color="#f4f1ea" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      {/* tinted windows */}
      <RoundedBox args={[1.9, 0.26, 1.02]} radius={0.1} smoothness={4} position={[-0.4, 0.7, 0]}>
        <meshStandardMaterial color="#0c1a22" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      {/* mast */}
      <mesh position={[-1.1, 1.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 8]} />
        <meshStandardMaterial color="#1a1d24" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}
