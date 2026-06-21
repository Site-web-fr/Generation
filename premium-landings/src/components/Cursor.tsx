import { useEffect, useRef } from 'react'
import { useHasFinePointer } from '../lib/hooks'
import './Cursor.css'

/** A soft, lerped custom cursor that reacts to [data-cursor] targets. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const fine = useHasFinePointer()

  useEffect(() => {
    if (!fine) return
    document.body.classList.add('has-custom-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }
    let raf = 0
    let hovering = false

    function onMove(e: MouseEvent) {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      const el = (e.target as HTMLElement)?.closest('[data-cursor]') as
        | HTMLElement
        | null
      const next = !!el
      if (next !== hovering) {
        hovering = next
        ringRef.current?.classList.toggle('is-hover', hovering)
      }
      const label = el?.getAttribute('data-cursor-label') || ''
      if (labelRef.current) labelRef.current.textContent = label
    }

    function loop() {
      ring.x += (target.x - ring.x) * 0.16
      ring.y += (target.y - ring.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [fine])

  if (!fine) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <div ref={labelRef} className="cursor-label" />
      </div>
    </>
  )
}
