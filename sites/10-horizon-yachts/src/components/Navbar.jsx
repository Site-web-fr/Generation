import { useState, useEffect } from 'react'
import { Anchor } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#030B18]/95 backdrop-blur-xl border-b border-[#19A7CE]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[#19A7CE]/30 flex items-center justify-center">
            <Anchor size={18} className="text-[#C9A96E]" />
          </div>
          <div>
            <div className="text-[#EEF6FF] font-display text-xl tracking-[0.15em]">HORIZON</div>
            <div className="text-[#19A7CE] text-[0.5rem] tracking-[0.4em] uppercase">Yachts Charter</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Flotte', 'Destinations', 'Charter', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-[#EEF6FF]/50 hover:text-[#19A7CE] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#charter" className="hidden lg:block btn-primary text-xs py-3 px-6">Réserver un Yacht</a>
      </div>
    </nav>
  )
}
