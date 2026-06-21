import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

export function FloatingSphere({ position = [0, 0, 0], scale = 1, color = '#d4af37', distort = 0.3, speed = 2 }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Sphere ref={mesh} position={position} scale={scale} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.15}
        distort={distort}
        speed={speed}
        roughness={0.1}
        metalness={0.8}
        wireframe={false}
      />
    </Sphere>
  );
}

export function RotatingTorus({ position = [0, 0, 0], scale = 1, color = '#d4af37' }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.4;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusGeometry args={[1, 0.08, 16, 100]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

export function GlowingSphere({ position = [0, 0, 0], scale = 1, color = '#d4af37' }) {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.scale.setScalar(scale + Math.sin(t * 2) * 0.03 * scale);
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}
