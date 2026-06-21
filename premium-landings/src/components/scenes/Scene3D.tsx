import { Suspense, useEffect, useState, useRef, type ComponentType } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  Cone,
  Sparkles,
  Environment,
  MeshTransmissionMaterial,
  RoundedBox,
} from '@react-three/drei';
import type { SceneType } from '../../data/sites';
import { isMobileDevice } from '../../utils/device';
import * as THREE from 'three';

const mobile = isMobileDevice();

interface Props {
  type: SceneType;
  color: string;
  accent: string;
}

function useMouseParallax(intensity = 0.3) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    target.current.x = (state.pointer.x * intensity);
    target.current.y = (state.pointer.y * intensity);
    group.current.rotation.y += (target.current.x - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-target.current.y * 0.5 - group.current.rotation.x) * 0.05;
  });

  return group;
}

function SceneLights({ accent }: { accent: string }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 8, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, 3, -3]} intensity={0.6} color={accent} />
      <pointLight position={[0, 2, 3]} intensity={1.2} color={accent} distance={10} />
      <Sparkles count={mobile ? 20 : 60} scale={4} size={mobile ? 1 : 1.5} speed={0.3} opacity={0.35} color={accent} />
    </>
  );
}

function OrganicShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.4);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (inner.current) inner.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={inner} args={[1.15, mobile ? 32 : 128, mobile ? 32 : 128]} scale={[1, 1.18, 0.92]}>
          <MeshDistortMaterial
            color={color}
            roughness={0.15}
            metalness={0.85}
            distort={0.38}
            speed={2.5}
            emissive={accent}
            emissiveIntensity={0.2}
          />
        </Sphere>
        <Sphere args={[1.45, 32, 32]}>
          <meshStandardMaterial color={accent} transparent opacity={0.06} wireframe />
        </Sphere>
      </Float>
    </group>
  );
}

function ArchitectureShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.35);
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={group}>
      <group ref={spin}>
        <Float speed={1.2} floatIntensity={0.4}>
          {[0, 1, 2, 3].map((i) => (
            <RoundedBox
              key={i}
              args={[0.35, 0.6 + i * 0.45, 0.35]}
              radius={0.02}
              position={[(i - 1.5) * 0.55, (0.6 + i * 0.45) / 2 - 0.4, 0]}
            >
              <meshStandardMaterial
                color={i === 2 ? accent : color}
                metalness={0.95}
                roughness={0.08}
                envMapIntensity={1.5}
              />
            </RoundedBox>
          ))}
          <Box args={[2.2, 0.05, 0.8]} position={[0, -0.5, 0]}>
            <meshStandardMaterial color={accent} metalness={1} roughness={0.05} />
          </Box>
        </Float>
      </group>
    </group>
  );
}

function WaterShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.5);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });
  return (
    <group ref={group}>
      <Float speed={2.5} floatIntensity={1.2}>
        <Torus ref={ref} args={[1, 0.32, mobile ? 16 : 32, mobile ? 32 : 64]} rotation={[Math.PI / 2.8, 0, 0]}>
          {mobile ? (
            <meshStandardMaterial color={color} emissive={accent} emissiveIntensity={0.3} metalness={0.6} roughness={0.2} />
          ) : (
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.4}
              chromaticAberration={0.05}
              color={color}
            />
          )}
        </Torus>
        <Sphere args={[0.25, 32, 32]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} metalness={1} roughness={0} />
        </Sphere>
      </Float>
    </group>
  );
}

function YachtShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.35);
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.1;
  });
  return (
    <group ref={group}>
      <group ref={spin}>
        <Float speed={1.4} floatIntensity={0.6}>
          <RoundedBox args={[2.4, 0.25, 0.7]} radius={0.08} position={[0, -0.15, 0]}>
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.08} envMapIntensity={2} />
          </RoundedBox>
          <RoundedBox args={[0.9, 0.55, 0.55]} radius={0.04} position={[-0.35, 0.2, 0]}>
            <meshStandardMaterial color={accent} metalness={0.8} roughness={0.12} />
          </RoundedBox>
          <Cone args={[0.12, 1, 8]} position={[0.65, 0.65, 0]} rotation={[0, 0, -0.25]}>
            <meshStandardMaterial color={accent} metalness={0.95} roughness={0.05} />
          </Cone>
          <Box args={[2.5, 0.02, 0.02]} position={[0, 0.85, 0]}>
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
          </Box>
        </Float>
      </group>
    </group>
  );
}

function AutomotiveShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.45);
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <group ref={spin} scale={0.85}>
        <Float speed={1.6} floatIntensity={0.5}>
          <RoundedBox args={[2.4, 0.35, 1]} radius={0.06} position={[0, 0, 0]}>
            <meshStandardMaterial color={color} metalness={0.98} roughness={0.03} envMapIntensity={2.5} />
          </RoundedBox>
          <RoundedBox args={[1.1, 0.3, 0.8]} radius={0.08} position={[-0.15, 0.32, 0]}>
            <meshStandardMaterial color={accent} metalness={0.95} roughness={0.05} transparent opacity={0.9} />
          </RoundedBox>
          {([-0.75, 0.75] as const).map((x, i) => (
            <group key={i} position={[x, -0.12, 0.38]}>
              <Torus args={[0.2, 0.05, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.2} />
              </Torus>
              <Torus args={[0.12, 0.02, 8, 16]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color={accent} metalness={1} roughness={0} emissive={accent} emissiveIntensity={0.3} />
              </Torus>
            </group>
          ))}
          <Box args={[0.8, 0.04, 0.15]} position={[1.1, 0.05, 0]}>
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} metalness={1} roughness={0} />
          </Box>
        </Float>
      </group>
    </group>
  );
}

function OceanShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.3);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.18;
  });
  return (
    <group ref={group}>
      <Float speed={1.2} floatIntensity={0.8}>
        <Sphere ref={ref} args={[1.05, mobile ? 32 : 64, mobile ? 32 : 64]}>
          <MeshDistortMaterial color={color} distort={0.25} speed={2} metalness={0.6} roughness={0.2} emissive={accent} emissiveIntensity={0.25} />
        </Sphere>
        <Torus args={[1.4, 0.015, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} metalness={1} roughness={0} />
        </Torus>
      </Float>
    </group>
  );
}

function WellnessShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.25);
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.06;
  });
  return (
    <group ref={group}>
      <group ref={spin}>
        <Float speed={0.9} floatIntensity={0.7}>
          <Torus args={[0.95, 0.06, 32, 64]}>
            <meshStandardMaterial color={accent} metalness={0.8} roughness={0.15} emissive={accent} emissiveIntensity={0.3} />
          </Torus>
          <Torus args={[0.7, 0.04, 32, 64]} rotation={[Math.PI / 3, 0, 0]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} transparent opacity={0.7} />
          </Torus>
          <Sphere args={[0.3, mobile ? 16 : 64, mobile ? 16 : 64]}>
            {mobile ? (
              <meshStandardMaterial color={accent} metalness={0.8} roughness={0.1} emissive={accent} emissiveIntensity={0.25} />
            ) : (
              <MeshTransmissionMaterial color={accent} thickness={0.5} roughness={0} transmission={0.95} />
            )}
          </Sphere>
        </Float>
      </group>
    </group>
  );
}

function SkyShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.4);
  const spin = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (spin.current) {
      spin.current.rotation.y += 0.008;
      spin.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });
  return (
    <group ref={group}>
      <group ref={spin}>
        <Float speed={2.2} floatIntensity={0.55}>
          <RoundedBox args={[2, 0.35, 0.4]} radius={0.05} rotation={[0, 0, Math.PI / 2]} position={[-0.2, 0, 0]}>
            <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} envMapIntensity={2} />
          </RoundedBox>
          <Cone args={[0.45, 0.5, 4]} rotation={[0, 0, -Math.PI / 2]} position={[1.1, 0.1, 0]}>
            <meshStandardMaterial color={accent} metalness={0.9} roughness={0.08} />
          </Cone>
          <Box args={[0.6, 0.04, 0.25]} position={[-0.8, 0.15, 0]}>
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} metalness={1} roughness={0} />
          </Box>
        </Float>
      </group>
    </group>
  );
}

function GemShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.5);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <group ref={group}>
      <Float speed={1.4} floatIntensity={0.6}>
        <mesh ref={ref}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.02} emissive={accent} emissiveIntensity={0.35} envMapIntensity={3} />
        </mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.15, 0]} />
          <meshStandardMaterial color={accent} wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

function VenueShape({ color, accent }: { color: string; accent: string }) {
  const group = useMouseParallax(0.3);
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={group}>
      <group ref={spin}>
        <Float speed={1} floatIntensity={0.35}>
          <RoundedBox args={[2, 0.12, 1.3]} radius={0.02} position={[0, -0.55, 0]}>
            <meshStandardMaterial color={accent} metalness={0.85} roughness={0.15} />
          </RoundedBox>
          {[0, 1, 2, 3, 4].map((i) => (
            <Box key={i} args={[0.1, 1.3, 0.1]} position={[(i - 2) * 0.5, 0.1, 0.55]}>
              <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} envMapIntensity={1.5} />
            </Box>
          ))}
          <Torus args={[1, 0.035, 8, 48]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} metalness={1} roughness={0} />
          </Torus>
        </Float>
      </group>
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

function PostFX() {
  const [Fx, setFx] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (mobile) return;
    import('./Scene3DPostFX').then((m) => setFx(() => m.default));
  }, []);

  if (!Fx) return null;
  return <Fx />;
}

function EnvMap() {
  if (mobile) return null;
  return <Environment preset="city" environmentIntensity={0.35} />;
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 0.3 - state.camera.position.x) * 0.03;
    state.camera.position.y += (state.pointer.y * 0.2 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D({ type, color, accent }: Props) {
  return (
    <div className="scene3d">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={mobile ? 1 : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: mobile ? 'default' : 'high-performance' }}
      >
        <SceneLights accent={accent} />
        <EnvMap />
        <Suspense fallback={null}>
          <SceneContent type={type} color={color} accent={accent} />
        </Suspense>
        {!mobile && <CameraRig />}
        <PostFX />
      </Canvas>
      <div className="scene3d-ring" aria-hidden />
    </div>
  );
}
