import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#040E1A]/95 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#C9A96E]/60 rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#C9A96E]/80 rotate-[-45deg]" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
          </div>
          <div>
            <div className="text-[#C9A96E] font-display text-lg tracking-[0.2em]">AQUALUX</div>
            <div className="text-[#F0F6FF]/40 text-[0.5rem] tracking-[0.4em] uppercase">Marine Care</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Services', 'Yachts', 'Processus', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-[#F0F6FF]/50 hover:text-[#C9A96E] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#contact" className="hidden lg:block btn-outline text-xs py-3 px-6">Devis Gratuit</a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#C9A96E]">{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
    </nav>
  )
}
