import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Cone } from '@react-three/drei';
import type { SceneType } from '../../data/sites';
import * as THREE from 'three';

interface Props {
  type: SceneType;
  color: string;
  accent: string;
}

function OrganicShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1.2, 64, 64]} scale={[1, 1.15, 0.95]}>
        <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.35} speed={2} emissive={accent} emissiveIntensity={0.15} />
      </Sphere>
    </Float>
  );
}

function ArchitectureShape({ color, accent }: { color: string; accent: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
  });
  return (
    <group ref={group}>
      <Float speed={1} floatIntensity={0.3}>
        {[0, 1, 2].map((i) => (
          <Box key={i} args={[0.4, 0.8 + i * 0.5, 0.4]} position={[(i - 1) * 0.6, (0.8 + i * 0.5) / 2 - 0.5, 0]}>
            <meshStandardMaterial color={i === 1 ? accent : color} metalness={0.9} roughness={0.15} />
          </Box>
        ))}
      </Float>
    </group>
  );
}

function WaterShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <Torus ref={ref} args={[1, 0.35, 16, 48]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color={color} emissive={accent} emissiveIntensity={0.3} metalness={0.6} roughness={0.2} />
      </Torus>
    </Float>
  );
}

function YachtShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={ref}>
      <Float speed={1.2} floatIntensity={0.5}>
        <Box args={[2, 0.3, 0.6]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.1} />
        </Box>
        <Box args={[0.8, 0.5, 0.5]} position={[-0.3, 0.15, 0]}>
          <meshStandardMaterial color={accent} metalness={0.7} roughness={0.2} />
        </Box>
        <Cone args={[0.15, 0.8, 8]} position={[0.5, 0.5, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
        </Cone>
      </Float>
    </group>
  );
}

function AutomotiveShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={ref} scale={0.9}>
      <Float speed={1.5} floatIntensity={0.4}>
        <Box args={[2.2, 0.4, 0.9]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} />
        </Box>
        <Box args={[1, 0.35, 0.75]} position={[-0.2, 0.35, 0]}>
          <meshStandardMaterial color={accent} metalness={0.9} roughness={0.1} />
        </Box>
        {([-0.7, 0.7] as const).map((x, i) => (
          <Torus key={i} args={[0.18, 0.06, 8, 16]} rotation={[Math.PI / 2, 0, 0]} position={[x, -0.15, 0.35]}>
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
          </Torus>
        ))}
      </Float>
    </group>
  );
}

function OceanShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
  });
  return (
    <Float speed={1} floatIntensity={0.6}>
      <Sphere ref={ref} args={[1.1, 32, 32]}>
        <MeshDistortMaterial color={color} distort={0.2} speed={1.5} metalness={0.5} roughness={0.3} emissive={accent} emissiveIntensity={0.2} />
      </Sphere>
    </Float>
  );
}

function WellnessShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={ref}>
      <Float speed={0.8} floatIntensity={0.6}>
        <Torus args={[0.9, 0.08, 16, 48]}>
          <meshStandardMaterial color={accent} metalness={0.7} roughness={0.2} emissive={accent} emissiveIntensity={0.2} />
        </Torus>
        <Sphere args={[0.35, 32, 32]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} transparent opacity={0.85} />
        </Sphere>
      </Float>
    </group>
  );
}

function SkyShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
    }
  });
  return (
    <group ref={ref}>
      <Float speed={2} floatIntensity={0.5}>
        <Cone args={[0.5, 2, 4]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </Cone>
        <Box args={[1.8, 0.08, 0.3]} position={[-0.3, 0, 0]}>
          <meshStandardMaterial color={accent} metalness={0.85} roughness={0.15} />
        </Box>
      </Float>
    </group>
  );
}

function GemShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <Float speed={1.2} floatIntensity={0.5}>
      <Cone ref={ref} args={[0.8, 1.6, 6]} rotation={[0, Math.PI / 6, 0]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.05} emissive={accent} emissiveIntensity={0.25} />
      </Cone>
    </Float>
  );
}

function VenueShape({ color, accent }: { color: string; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <group ref={ref}>
      <Float speed={0.9} floatIntensity={0.3}>
        <Box args={[1.8, 0.15, 1.2]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} />
        </Box>
        {[0, 1, 2, 3].map((i) => (
          <Box key={i} args={[0.12, 1.2, 0.12]} position={[(i - 1.5) * 0.55, 0.1, 0.5]}>
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </Box>
        ))}
        <Torus args={[0.9, 0.04, 8, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} metalness={1} roughness={0.05} />
        </Torus>
      </Float>
    </group>
  );
}

function SceneContent({ type, color, accent }: Props) {
  switch (type) {
    case 'organic': return <OrganicShape color={color} accent={accent} />;
    case 'architecture': return <ArchitectureShape color={color} accent={accent} />;
    case 'water': return <WaterShape color={color} accent={accent} />;
    case 'yacht': return <YachtShape color={color} accent={accent} />;
    case 'automotive': return <AutomotiveShape color={color} accent={accent} />;
    case 'ocean': return <OceanShape color={color} accent={accent} />;
    case 'wellness': return <WellnessShape color={color} accent={accent} />;
    case 'sky': return <SkyShape color={color} accent={accent} />;
    case 'gem': return <GemShape color={color} accent={accent} />;
    case 'venue': return <VenueShape color={color} accent={accent} />;
  }
}

export default function Scene3D({ type, color, accent }: Props) {
  return (
    <div className="scene3d">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color={accent} />
        <Suspense fallback={null}>
          <SceneContent type={type} color={color} accent={accent} />
        </Suspense>
      </Canvas>
    </div>
  );
}
