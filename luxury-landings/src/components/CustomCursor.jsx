import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.08
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.08
      follower.style.left = followerPos.current.x + 'px'
      follower.style.top = followerPos.current.y + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('hoverable')) {
        cursor.classList.add('scale-150', 'bg-[#C9A84C]')
        follower.classList.add('scale-[2.5]', 'opacity-20')
      }
    }

    const onLeave = () => {
      cursor.classList.remove('scale-150', 'bg-[#C9A84C]')
      follower.classList.remove('scale-[2.5]', 'opacity-20')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999] w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 mix-blend-difference"
        style={{ left: '-100px', top: '-100px' }}
      />
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[99998] w-8 h-8 border border-[#C9A84C] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60 transition-transform duration-300"
        style={{ left: '-100px', top: '-100px' }}
      />
    </>
  )
}
