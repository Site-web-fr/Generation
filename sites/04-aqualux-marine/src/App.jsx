import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import YachtSelector from './components/YachtSelector'
import Process from './components/Process'
import Calculator from './components/Calculator'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current, follower = followerRef.current
    let mx = 0, my = 0, fx = 0, fy = 0
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (cursor) { cursor.style.left = mx+'px'; cursor.style.top = my+'px' } }
    const animate = () => { fx += (mx-fx)*0.1; fy += (my-fy)*0.1; if (follower) { follower.style.left = fx+'px'; follower.style.top = fy+'px' } requestAnimationFrame(animate) }
    window.addEventListener('mousemove', onMove); animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#040E1A]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <Services />
      <YachtSelector />
      <Process />
      <Calculator />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
