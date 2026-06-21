import { useRef, type ReactNode } from 'react'
import { useHasFinePointer } from '../lib/hooks'

interface MagneticProps {
  children: ReactNode
  /** pull strength 0–1 */
  strength?: number
  className?: string
}

/** Wraps children so they're gently pulled toward the cursor on hover. */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useHasFinePointer()

  function onMove(e: React.MouseEvent) {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  function onLeave() {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        display: 'inline-flex',
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'transform',
      }}
      data-cursor="hover"
    >
      {children}
    </div>
  )
}
