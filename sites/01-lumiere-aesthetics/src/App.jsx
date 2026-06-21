import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import TreatmentMap from './components/TreatmentMap'
import Team from './components/Team'
import Calculator from './components/Calculator'
import BeforeAfter from './components/BeforeAfter'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = mouseX + 'px'
        cursor.style.top = mouseY + 'px'
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      if (follower) {
        follower.style.left = followerX + 'px'
        follower.style.top = followerY + 'px'
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    const interactives = document.querySelectorAll('button, a, .interactive')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => follower?.classList.add('hovered'))
      el.addEventListener('mouseleave', () => follower?.classList.remove('hovered'))
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <Services />
      <TreatmentMap />
      <Team />
      <Calculator />
      <BeforeAfter />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  )
}
