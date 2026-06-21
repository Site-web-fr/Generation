import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Properties from './components/Properties'
import Stats from './components/Stats'
import Calculator from './components/Calculator'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0, fx = 0, fy = 0

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px' }
    }

    const animate = () => {
      fx += (mouseX - fx) * 0.1; fy += (mouseY - fy) * 0.1
      if (follower) { follower.style.left = fx + 'px'; follower.style.top = fy + 'px' }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <Stats />
      <Properties />
      <Services />
      <Calculator />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
