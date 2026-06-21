import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = ['Fleet', 'Expériences', 'Réserver', 'Contact']

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#001122]/95 backdrop-blur-xl border-b border-[#00B4D8]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 border border-[#00B4D8]/40 rounded-full" />
            <div className="absolute inset-2 border border-[#FF6B35]/40 rounded-full" />
            <div className="absolute inset-[35%] bg-[#00B4D8] rounded-full" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wider">AQUARUSH</div>
            <div className="text-[#00B4D8] text-[0.55rem] tracking-[0.3em] uppercase">Dubai</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-[0.72rem] tracking-[0.2em] uppercase text-white/60 hover:text-[#00B4D8] transition-colors">
              {l}
            </a>
          ))}
        </div>

        <a href="#réserver" className="hidden lg:block btn-primary text-xs">Réserver Maintenant</a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#00B4D8]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#001122]/98 border-b border-[#00B4D8]/20 py-8">
          <div className="flex flex-col items-center gap-6">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-sm tracking-widest uppercase text-white/60 hover:text-[#00B4D8]">{l}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
