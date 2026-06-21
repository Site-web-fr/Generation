import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#080808]/95 backdrop-blur-xl border-b border-white/5' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-[#DC143C] transform skew-x-[-10deg]" />
            <div className="w-2 h-6 bg-[#DC143C]/60 transform skew-x-[-10deg]" />
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-[0.2em]">APEX</div>
            <div className="text-[#DC143C] text-[0.5rem] tracking-[0.4em] uppercase">Drive</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Fleet', 'Configurateur', 'Services', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-white/50 hover:text-[#DC143C] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#configurateur" className="hidden lg:block btn-primary text-xs py-3 px-6">Réserver</a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#DC143C]">{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
    </nav>
  )
}
