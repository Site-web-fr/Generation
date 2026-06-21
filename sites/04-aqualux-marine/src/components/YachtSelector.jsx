import { useState } from 'react'
import { motion } from 'framer-motion'

const yachtTypes = [
  { name: 'Voilier', range: '8-15m', icon: '⛵', desc: 'Voiliers de croisière et de compétition', services: ['Lavage extérieur', 'Polissage coque', 'Nettoyage intérieur', 'Entretien pont'] },
  { name: 'Yacht à Moteur', range: '12-24m', icon: '🛥️', desc: 'Yachts moteur et semi-rigides de luxe', services: ['Détailing complet', 'Céramique', 'Polissage chrome', 'Entretien pont teck'] },
  { name: 'Superyacht', range: '24-50m', icon: '🚢', desc: 'Superyachts et méga-yachts', services: ['Service premium complet', 'Équipe dédiée', 'Traitement antifouling', 'Gestion maintenance'] },
  { name: 'Catamaran', range: '10-22m', icon: '⚓', desc: 'Catamarans de croisière et charter', services: ['Double coque', 'Ponts multiples', 'Filets et trampoline', 'Flotteurs'] },
]

export default function YachtSelector() {
  const [active, setActive] = useState(1)

  return (
    <section id="yachts" className="py-32 bg-[#040E1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Votre Embarcation</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#F0F6FF]">
            Service <span className="gradient-gold italic">Adapté</span> à Votre Yacht
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {yachtTypes.map((y, i) => (
            <button key={y.name} onClick={() => setActive(i)}
              className={`p-6 text-center transition-all border ${active === i ? 'border-[#C9A96E]/50 bg-[#C9A96E]/5' : 'glass-card'}`}>
              <div className="text-3xl mb-3">{y.icon}</div>
              <div className="text-[#F0F6FF] font-medium mb-1">{y.name}</div>
              <div className="text-[#C9A96E] text-xs">{y.range}</div>
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="glass-card p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-4xl mb-4">{yachtTypes[active].icon}</div>
              <h3 className="font-display text-3xl text-[#F0F6FF] mb-2">{yachtTypes[active].name}</h3>
              <div className="text-[#C9A96E] text-sm mb-4">{yachtTypes[active].range} · {yachtTypes[active].desc}</div>
              <p className="text-[#F0F6FF]/50 text-sm leading-relaxed mb-6">
                Nos équipes spécialisées connaissent parfaitement les spécificités de chaque type d'embarcation. 
                Chaque intervention est planifiée avec soin pour respecter votre planning de navigation.
              </p>
              <a href="#contact" className="btn-primary">Obtenir un Devis</a>
            </div>
            <div>
              <div className="text-[0.65rem] tracking-widest uppercase text-[#C9A96E] mb-4">Services Inclus</div>
              <div className="space-y-3">
                {yachtTypes[active].services.map(s => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full" />
                    <span className="text-[#F0F6FF]/70 text-sm">{s}</span>
                    <div className="flex-1 h-px bg-[#C9A96E]/10" />
                    <span className="text-[#C9A96E] text-xs">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
