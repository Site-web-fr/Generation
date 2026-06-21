import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator as CalcIcon, ChevronDown } from 'lucide-react'

const treatments = [
  { name: 'Lifting du Visage', base: 4500, anesthesia: 800, recovery: 14 },
  { name: 'Rhinoplastie', base: 5200, anesthesia: 900, recovery: 14 },
  { name: 'Blépharoplastie', base: 2800, anesthesia: 600, recovery: 7 },
  { name: 'Augmentation Mammaire', base: 6800, anesthesia: 1000, recovery: 21 },
  { name: 'Liposuccion', base: 3200, anesthesia: 700, recovery: 10 },
  { name: 'Abdominoplastie', base: 5500, anesthesia: 900, recovery: 21 },
  { name: 'Augmentation des Lèvres', base: 480, anesthesia: 0, recovery: 0 },
  { name: 'Injections Botox', base: 350, anesthesia: 0, recovery: 0 },
]

const extras = [
  { name: 'Chambre VIP Premium', price: 500 },
  { name: 'Suivi post-op 3 mois', price: 350 },
  { name: 'Transfert aéroport', price: 150 },
  { name: 'Kit de soins premium', price: 200 },
]

export default function Calculator() {
  const [selected, setSelected] = useState(treatments[0])
  const [nights, setNights] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showResult, setShowResult] = useState(false)

  const toggleExtra = (extra) => {
    setSelectedExtras(prev =>
      prev.includes(extra.name) ? prev.filter(e => e !== extra.name) : [...prev, extra.name]
    )
  }

  const extrasTotal = selectedExtras.reduce((sum, name) => {
    const extra = extras.find(e => e.name === name)
    return sum + (extra?.price || 0)
  }, 0)

  const hospitalCost = nights * 350
  const total = selected.base + selected.anesthesia + hospitalCost + extrasTotal

  return (
    <section className="py-32 bg-[#141414]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Estimateur</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7] mb-6">
            Calculez Votre <span className="gradient-gold italic">Devis</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-3 block">
                Traitement Souhaité
              </label>
              <div className="relative">
                <select
                  value={selected.name}
                  onChange={e => setSelected(treatments.find(t => t.name === e.target.value))}
                  className="w-full bg-transparent text-[#FAFAF7] border border-[#C9A96E]/20 px-4 py-3 text-sm appearance-none focus:outline-none focus:border-[#C9A96E]/50"
                >
                  {treatments.map(t => (
                    <option key={t.name} value={t.name} className="bg-[#1A1A1A]">{t.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A96E]/50 pointer-events-none" />
              </div>
            </div>

            {selected.recovery > 0 && (
              <div className="glass-card p-6">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-4 block">
                  Nuits d'Hospitalisation: <span className="text-[#FAFAF7]">{nights}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max={Math.max(7, selected.recovery)}
                  value={nights}
                  onChange={e => setNights(+e.target.value)}
                  className="w-full accent-[#C9A96E]"
                />
                <div className="flex justify-between text-xs text-[#FAFAF7]/30 mt-2">
                  <span>1 nuit</span>
                  <span>{Math.max(7, selected.recovery)} nuits</span>
                </div>
              </div>
            )}

            <div className="glass-card p-6">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-4 block">
                Options Premium
              </label>
              <div className="space-y-3">
                {extras.map(extra => (
                  <label key={extra.name} className="flex items-center gap-3 cursor-none">
                    <div
                      onClick={() => toggleExtra(extra)}
                      className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center transition-all ${
                        selectedExtras.includes(extra.name)
                          ? 'border-[#C9A96E] bg-[#C9A96E]'
                          : 'border-[#C9A96E]/30'
                      }`}
                    >
                      {selectedExtras.includes(extra.name) && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[#FAFAF7]/70 text-sm flex-1">{extra.name}</span>
                    <span className="text-[#C9A96E] text-sm">+{extra.price}€</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-24">
            <motion.div
              className="glass-card p-8"
              animate={{ borderColor: showResult ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.15)' }}
            >
              <div className="flex items-center gap-3 mb-8">
                <CalcIcon size={20} className="text-[#C9A96E]" />
                <h3 className="font-display text-2xl text-[#FAFAF7]">Récapitulatif</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-3 border-b border-[#FAFAF7]/5">
                  <span className="text-[#FAFAF7]/60 text-sm">{selected.name}</span>
                  <span className="text-[#FAFAF7] text-sm">{selected.base.toLocaleString()}€</span>
                </div>
                {selected.anesthesia > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-[#FAFAF7]/5">
                    <span className="text-[#FAFAF7]/60 text-sm">Anesthésie</span>
                    <span className="text-[#FAFAF7] text-sm">{selected.anesthesia}€</span>
                  </div>
                )}
                {selected.recovery > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-[#FAFAF7]/5">
                    <span className="text-[#FAFAF7]/60 text-sm">Hospitalisation ({nights}n)</span>
                    <span className="text-[#FAFAF7] text-sm">{hospitalCost}€</span>
                  </div>
                )}
                {selectedExtras.map(name => {
                  const extra = extras.find(e => e.name === name)
                  return extra ? (
                    <div key={name} className="flex justify-between items-center pb-3 border-b border-[#FAFAF7]/5">
                      <span className="text-[#FAFAF7]/60 text-sm">{name}</span>
                      <span className="text-[#FAFAF7] text-sm">{extra.price}€</span>
                    </div>
                  ) : null
                })}
              </div>

              <div className="bg-[#C9A96E]/10 border border-[#C9A96E]/20 p-5 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#FAFAF7]/80 text-sm uppercase tracking-wider">Estimation Totale</span>
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl text-[#C9A96E]"
                  >
                    {total.toLocaleString()}€
                  </motion.span>
                </div>
                {selected.recovery > 0 && (
                  <p className="text-[#FAFAF7]/40 text-xs mt-2">
                    Convalescence estimée: {selected.recovery} jours
                  </p>
                )}
              </div>

              <p className="text-[#FAFAF7]/30 text-xs mb-6">
                * Ce devis est indicatif. Le prix définitif est établi lors de la consultation avec votre chirurgien.
              </p>

              <a href="#booking" className="btn-primary w-full text-center block">
                Prendre Rendez-vous
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
