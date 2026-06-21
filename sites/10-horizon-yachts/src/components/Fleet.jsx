import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const yachts = [
  { name: 'Azimut 55', type: 'Yacht Moteur', length: '17m', pax: 10, crew: 2, price: 4500, features: ['3 cabines VIP', 'Salon luxe', 'Cuisine équipée', 'Flybridge'], color: '#19A7CE', tag: 'Populaire' },
  { name: 'Sunseeker 74', type: 'Mega Yacht', length: '23m', pax: 12, crew: 4, price: 8500, features: ['4 cabines suite', 'Jacuzzi pont', 'Jet ski incl.', 'Chef à bord'], color: '#C9A96E', tag: 'Premium' },
  { name: 'Lagoon 52', type: 'Catamaran', length: '16m', pax: 10, crew: 2, price: 3800, features: ['4 cabines doubles', 'Trampolines', 'Annexe & paddle', 'Écologique'], color: '#7DCFB6', tag: null },
  { name: 'Ferretti 881', type: 'Superyacht', length: '27m', pax: 14, crew: 5, price: 14000, features: ['5 cabines master', 'Spa à bord', 'Garage nautic', 'Hélicoptère'], color: '#B76E79', tag: 'Prestige' },
]

export default function Fleet() {
  const [active, setActive] = useState(0)
  const y = yachts[active]
  return (
    <section id="flotte" className="py-32 bg-[#030B18]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#19A7CE] mb-3 block">Notre Flotte</span>
          <h2 className="font-display text-5xl text-[#EEF6FF]">Yachts <span className="gradient-gold italic">d'Exception</span></h2>
          <div className="section-divider" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {yachts.map((yacht, i) => (
            <button key={yacht.name} onClick={() => setActive(i)}
              className="px-5 py-2.5 text-xs tracking-wider uppercase border transition-all"
              style={active === i ? { background: yacht.color, borderColor: yacht.color, color: '#030B18', fontWeight: 'bold' } : { borderColor: 'rgba(25,167,206,0.2)', color: 'rgba(238,246,255,0.5)' }}>
              {yacht.type}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {y.tag && <span className="text-[0.6rem] tracking-wider uppercase px-3 py-1 mb-4 inline-block font-bold text-[#030B18]" style={{ background: y.color }}>{y.tag}</span>}
                <h3 className="font-display text-4xl text-[#EEF6FF] mb-2">{y.name}</h3>
                <div className="text-sm mb-6" style={{ color: y.color }}>{y.type} · {y.length}</div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[['Longueur', y.length], ['Passagers', y.pax + ' pers.'], ['Équipage', y.crew + ' marins'], ['Tarif/nuit', y.price + '€']].map(([l, v]) => (
                    <div key={l} className="glass-card p-3 text-center">
                      <div className="text-[#EEF6FF]/40 text-xs mb-1">{l}</div>
                      <div className="font-medium" style={{ color: y.color }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-8">
                  {y.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: y.color }} />
                      <span className="text-[#EEF6FF]/60 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#charter" className="btn-primary block text-center">Réserver ce Yacht</a>
              </div>
              <div className="relative h-64 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${y.color}15, #030B18)`, border: `1px solid ${y.color}20` }}>
                <svg viewBox="0 0 350 180" className="w-full max-w-sm">
                  <ellipse cx="175" cy="130" rx="150" ry="25" fill={y.color} opacity="0.15" />
                  <path d="M50,110 Q80,75 140,70 Q175,65 210,70 Q270,75 300,110 L310,120 L40,120 Z" fill={y.color} opacity="0.7" />
                  <path d="M110,70 Q140,45 200,42 Q240,42 260,65 L260,75 L110,75 Z" fill={y.color} opacity="0.5" />
                  <line x1="175" y1="10" x2="175" y2="65" stroke="#C9A96E" strokeWidth="1.5" opacity="0.6" />
                  {[130,148,166,184,202].map(x => <rect key={x} x={x} y="53" width="10" height="7" rx="1" fill="#1A3A5A" opacity="0.8" />)}
                </svg>
                <div className="absolute bottom-4 right-4">
                  <div className="font-display text-2xl" style={{ color: y.color }}>{y.price}€<span className="text-xs text-[#EEF6FF]/30">/nuit</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
