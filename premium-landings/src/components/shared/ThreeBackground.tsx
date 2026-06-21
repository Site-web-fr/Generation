import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './ThreeBackground.css';

function Particles({ color = '#c9a962', count = 800 }: { color?: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function FloatingShape({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

interface Props {
  color?: string;
  variant?: 'particles' | 'shape' | 'both';
  className?: string;
}

export default function ThreeBackground({ color = '#c9a962', variant = 'both', className = '' }: Props) {
  return (
    <div className={`three-bg ${className}`} aria-hidden>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Suspense fallback={null}>
          {(variant === 'particles' || variant === 'both') && <Particles color={color} />}
          {(variant === 'shape' || variant === 'both') && <FloatingShape color={color} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
