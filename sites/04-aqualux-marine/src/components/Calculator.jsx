import { useState } from 'react'
import { motion } from 'framer-motion'

const sizes = ['8-12m', '12-18m', '18-24m', '24-35m', '35m+']
const sizeMultipliers = [1, 1.6, 2.4, 3.5, 5.2]
const basePrice = 380

const servicePackages = [
  { name: 'Essentiel', desc: 'Lavage extérieur + rinçage + séchage', mult: 1 },
  { name: 'Premium', desc: '+ Polissage + nettoyage intérieur', mult: 2 },
  { name: 'Excellence', desc: '+ Céramique + teck + chrome', mult: 3.2 },
  { name: 'Prestige', desc: 'Service complet + maintenance 6 mois', mult: 5 },
]

const extras = [
  { name: 'Traitement antifouling', price: 450 },
  { name: 'Protection UV premium', price: 280 },
  { name: 'Désinfection complète', price: 150 },
  { name: 'Rapport photographique', price: 80 },
]

export default function Calculator() {
  const [size, setSize] = useState(1)
  const [pkg, setPkg] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState([])

  const toggleExtra = n => setSelectedExtras(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  const extrasTotal = selectedExtras.reduce((sum, n) => sum + (extras.find(e => e.name === n)?.price || 0), 0)
  const total = Math.round(basePrice * sizeMultipliers[size] * servicePackages[pkg].mult + extrasTotal)

  return (
    <section className="py-32 bg-[#040E1A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Estimateur</span>
          <h2 className="font-display text-5xl text-[#F0F6FF]">
            Calculez Votre <span className="gradient-gold italic">Devis</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <label className="text-[0.65rem] tracking-widest uppercase text-[#C9A96E] mb-4 block">Taille du Yacht</label>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((s, i) => (
                  <button key={s} onClick={() => setSize(i)}
                    className={`py-3 text-xs border transition-all ${size === i ? 'bg-[#C9A96E]/20 border-[#C9A96E]/60 text-[#C9A96E]' : 'border-[#C9A96E]/15 text-[#F0F6FF]/40 hover:border-[#C9A96E]/30'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <label className="text-[0.65rem] tracking-widests uppercase text-[#C9A96E] mb-4 block">Formule de Service</label>
              <div className="space-y-3">
                {servicePackages.map((p, i) => (
                  <button key={p.name} onClick={() => setPkg(i)}
                    className={`w-full text-left p-4 border transition-all ${pkg === i ? 'border-[#C9A96E]/50 bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 hover:border-[#C9A96E]/25'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[#F0F6FF] font-medium text-sm">{p.name}</div>
                        <div className="text-[#F0F6FF]/40 text-xs mt-0.5">{p.desc}</div>
                      </div>
                      {pkg === i && <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <label className="text-[0.65rem] tracking-widests uppercase text-[#C9A96E] mb-4 block">Options Additionnelles</label>
              <div className="space-y-3">
                {extras.map(e => (
                  <label key={e.name} className="flex items-center gap-3 cursor-none">
                    <div onClick={() => toggleExtra(e.name)}
                      className={`w-5 h-5 border flex items-center justify-center transition-all ${selectedExtras.includes(e.name) ? 'bg-[#C9A96E] border-[#C9A96E]' : 'border-[#C9A96E]/30'}`}>
                      {selectedExtras.includes(e.name) && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="#040E1A" strokeWidth="2" strokeLinecap="round"/></svg>}
                    </div>
                    <span className="text-[#F0F6FF]/70 text-sm flex-1">{e.name}</span>
                    <span className="text-[#C9A96E] text-sm">+{e.price}€</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-24">
            <div className="glass-card p-8">
              <h3 className="font-display text-2xl text-[#F0F6FF] mb-6">Votre Devis Estimatif</h3>
              <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A96E]/10">
                <div className="flex justify-between text-sm">
                  <span className="text-[#F0F6FF]/50">Yacht {sizes[size]}</span>
                  <span className="text-[#F0F6FF]">{servicePackages[pkg].name}</span>
                </div>
                {selectedExtras.map(n => (
                  <div key={n} className="flex justify-between text-sm">
                    <span className="text-[#F0F6FF]/50">{n}</span>
                    <span className="text-[#C9A96E]">+{extras.find(e => e.name === n)?.price}€</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#C9A96E]/8 border border-[#C9A96E]/20 p-5 mb-6 text-center">
                <div className="text-[#F0F6FF]/50 text-xs mb-1">Estimation à partir de</div>
                <motion.div key={total} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="font-display text-4xl text-[#C9A96E]">{total}€</motion.div>
                <div className="text-[#F0F6FF]/30 text-xs mt-1">* Devis définitif après inspection</div>
              </div>
              <a href="#contact" className="btn-primary w-full text-center block">Demander le Devis Officiel</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
