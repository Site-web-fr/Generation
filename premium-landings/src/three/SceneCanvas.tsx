import { Canvas } from '@react-three/fiber'
import { Suspense, type ReactNode } from 'react'

interface SceneCanvasProps {
  children: ReactNode
  camera?: { position?: [number, number, number]; fov?: number }
  className?: string
  /** Disable on reduced-motion / low-power if needed */
  dpr?: [number, number]
  /** Allow pointer interaction (orbit, drag). Defaults to false (decorative). */
  interactive?: boolean
}

/** Shared, accessible R3F canvas. Transparent background, sits behind content. */
export default function SceneCanvas({
  children,
  camera = { position: [0, 0, 6], fov: 42 },
  className,
  dpr = [1, 2],
  interactive = false,
}: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={camera}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
