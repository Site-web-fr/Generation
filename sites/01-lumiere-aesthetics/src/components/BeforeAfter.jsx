import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const cases = [
  { title: 'Lifting du Visage', age: '52 ans', result: '-15 ans', detail: 'Lifting cervico-facial complet avec liposuccion du double-menton' },
  { title: 'Rhinoplastie', age: '28 ans', result: 'Harmonie parfaite', detail: 'Rhinoplastie médicale et correction de la bosse nasale' },
  { title: 'Blépharoplastie', age: '45 ans', result: 'Regard sublimé', detail: 'Blépharoplastie supérieure et inférieure simultanée' },
]

export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)

  const handleMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    const pos = ((x - rect.left) / rect.width) * 100
    setSliderPos(Math.max(5, Math.min(95, pos)))
  }

  return (
    <section id="résultats" className="py-32 bg-[#141414] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Résultats Réels</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7] mb-6">
            Avant / <span className="gradient-gold italic">Après</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          {cases.map((c, i) => (
            <button
              key={c.title}
              onClick={() => setActive(i)}
              className={`glass-card p-5 text-left transition-all ${active === i ? 'border-[#C9A96E]/50 bg-[#C9A96E]/5' : ''}`}
            >
              <div className="text-[#C9A96E] text-xs tracking-wider mb-1">{c.result}</div>
              <div className="text-[#FAFAF7] font-medium">{c.title}</div>
              <div className="text-[#FAFAF7]/40 text-xs mt-1">{c.age}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={containerRef}
            className="relative h-[400px] overflow-hidden select-none border border-[#C9A96E]/10"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* Before */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]">
              <div className="text-center">
                <div className="w-32 h-32 border border-[#FAFAF7]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="text-[#FAFAF7]/20 text-xs">AVANT</div>
                </div>
                <div className="text-[#FAFAF7]/20 text-sm">Photo confidentielle</div>
              </div>
            </div>

            {/* After overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#C9A96E]/5 to-[#8B2252]/5"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div className="text-center">
                <div className="w-32 h-32 border border-[#C9A96E]/30 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#C9A96E]/5">
                  <div className="text-[#C9A96E]/60 text-xs">APRÈS</div>
                </div>
                <div className="text-[#C9A96E]/60 text-sm">Résultat sublimé</div>
              </div>
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-[#C9A96E] z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#C9A96E] rounded-full flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 text-[0.6rem] tracking-widest uppercase text-[#FAFAF7]/40 z-10">Avant</div>
            <div className="absolute top-4 right-4 text-[0.6rem] tracking-widest uppercase text-[#C9A96E]/70 z-10">Après</div>
          </div>

          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[0.7rem] tracking-[0.3em] uppercase text-[#C9A96E]">Cas Clinique</span>
              <h3 className="font-display text-4xl text-[#FAFAF7] mt-3 mb-4">{cases[active].title}</h3>
              <p className="text-[#FAFAF7]/50 text-sm leading-relaxed mb-6">{cases[active].detail}</p>
              <div className="flex gap-8 mb-8">
                <div>
                  <div className="font-display text-3xl text-[#C9A96E]">{cases[active].result}</div>
                  <div className="text-[#FAFAF7]/40 text-xs uppercase tracking-wider mt-1">Résultat obtenu</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-[#FAFAF7]">{cases[active].age}</div>
                  <div className="text-[#FAFAF7]/40 text-xs uppercase tracking-wider mt-1">Âge du patient</div>
                </div>
              </div>
              <p className="text-[#FAFAF7]/30 text-xs italic mb-6">
                * Photos reproduites avec le consentement du patient. Résultats variables selon les individus.
              </p>
              <button className="btn-outline">Voir Plus de Résultats</button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
