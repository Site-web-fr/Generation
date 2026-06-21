import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['Propriétés', 'Services', 'Estimateur', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#0A0F1E]/95 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="1" y="1" width="30" height="30" stroke="#C9A96E" strokeWidth="0.5" />
            <path d="M8 24V14L16 8L24 14V24" stroke="#C9A96E" strokeWidth="1" fill="none" />
            <rect x="13" y="18" width="6" height="6" stroke="#C9A96E" strokeWidth="0.5" fill="rgba(201,169,110,0.1)" />
          </svg>
          <span className="font-display text-xl tracking-[0.2em] text-[#C9A96E] uppercase">Prestige</span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-[0.72rem] tracking-[0.2em] uppercase text-[#F5F0E8]/60 hover:text-[#C9A96E] transition-colors">
              {link}
            </a>
          ))}
        </div>

        <a href="#contact" className="hidden lg:block btn-primary text-xs">Estimation Gratuite</a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#C9A96E]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0F1E]/98 border-b border-[#C9A96E]/20 py-8">
          <div className="flex flex-col items-center gap-6">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-[#F5F0E8]/70 hover:text-[#C9A96E]">
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
