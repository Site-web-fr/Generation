import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['Services', 'Traitements', 'Équipe', 'Résultats', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#1A1A1A]/95 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#C9A96E] flex items-center justify-center">
            <div className="w-3 h-3 bg-[#C9A96E]" />
          </div>
          <span className="font-display text-xl tracking-[0.2em] text-[#C9A96E] uppercase">Lumière</span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-[0.75rem] tracking-[0.2em] uppercase text-[#FAFAF7]/60 hover:text-[#C9A96E] transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>

        <a href="#booking" className="hidden lg:block btn-primary text-xs">
          Prendre RDV
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#C9A96E]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1A1A1A]/98 border-b border-[#C9A96E]/20 py-8">
          <div className="flex flex-col items-center gap-6">
            {links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-[#FAFAF7]/70 hover:text-[#C9A96E] transition-colors">
                {link}
              </a>
            ))}
            <a href="#booking" className="btn-primary text-xs mt-2">Prendre RDV</a>
          </div>
        </div>
      )}
    </nav>
  )
}
