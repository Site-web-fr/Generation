import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, type ReactNode } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSpeed;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * uSpeed;
    float e =
      sin(pos.x * 0.6 + t) * 0.5 +
      sin(pos.y * 0.8 + t * 1.3) * 0.35 +
      sin((pos.x + pos.y) * 0.4 + t * 0.7) * 0.4;
    e *= uAmp;
    pos.z += e;
    vElevation = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorCrest;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    float mixFactor = smoothstep(-0.6, 0.8, vElevation);
    vec3 color = mix(uColorDeep, uColorCrest, mixFactor);
    // foam-ish crest highlight
    float crest = smoothstep(0.55, 0.95, vElevation);
    color += crest * 0.35;
    // soft vignette toward horizon
    float fade = smoothstep(0.0, 0.35, vUv.y);
    gl_FragColor = vec4(color, 0.92 * fade + 0.08);
  }
`

interface WaveSceneProps {
  colorDeep?: string
  colorCrest?: string
  amplitude?: number
  speed?: number
  children?: ReactNode
}

export default function WaveScene({
  colorDeep = '#0a3a4a',
  colorCrest = '#39c2d6',
  amplitude = 0.6,
  speed = 1,
  children,
}: WaveSceneProps) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: amplitude },
          uSpeed: { value: speed },
          uColorDeep: { value: new THREE.Color(colorDeep) },
          uColorCrest: { value: new THREE.Color(colorCrest) },
        },
      }),
    [amplitude, speed, colorDeep, colorCrest],
  )

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 2]} intensity={1.8} />
      <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.4, 0]}>
        <planeGeometry args={[26, 26, 120, 120]} />
        <primitive object={material} attach="material" />
      </mesh>
      {children && (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          {children}
        </Float>
      )}
    </>
  )
}
