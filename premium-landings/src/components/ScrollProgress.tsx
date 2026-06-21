import { useScrollProgress } from '../lib/hooks'

/** Thin accent progress bar fixed to the top of the viewport. */
export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 950,
        transformOrigin: 'left center',
        transform: `scaleX(${progress})`,
        background: 'var(--accent)',
        boxShadow: '0 0 12px var(--accent-glow)',
        pointerEvents: 'none',
      }}
    />
  )
}
