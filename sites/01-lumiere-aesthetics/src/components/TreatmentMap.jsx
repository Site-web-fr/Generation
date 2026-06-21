import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const areas = [
  { id: 'forehead', label: 'Front', x: 47, y: 12, treatments: ['Botox anti-rides', 'Lifting frontal', 'Traitement des rides'], color: '#C9A96E' },
  { id: 'eyes', label: 'Yeux', x: 47, y: 22, treatments: ['Blépharoplastie', 'Comblement cernes', 'Injections peri-oculaires'], color: '#C9A96E' },
  { id: 'nose', label: 'Nez', x: 47, y: 34, treatments: ['Rhinoplastie médicale', 'Rhinoplastie chirurgicale', 'Correction de déviation'], color: '#C9A96E' },
  { id: 'lips', label: 'Lèvres', x: 47, y: 46, treatments: ['Augmentation des lèvres', 'Contour des lèvres', 'Hydratation profonde'], color: '#C9A96E' },
  { id: 'cheeks', label: 'Joues', x: 22, y: 30, treatments: ['Comblement pommettes', 'Liposuccion faciale', 'Lifting des joues'], color: '#C9A96E' },
  { id: 'chin', label: 'Menton', x: 47, y: 56, treatments: ['Mentoplastie', 'Augmentation du menton', 'Liposuccion double menton'], color: '#C9A96E' },
  { id: 'neck', label: 'Cou', x: 47, y: 66, treatments: ['Lifting cervical', 'Liposuccion cou', 'Traitement rides de cou'], color: '#C9A96E' },
]

export default function TreatmentMap() {
  const [active, setActive] = useState(null)

  return (
    <section id="traitements" className="py-32 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Zones de Traitement</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7] mb-6">
            Explorez Nos <span className="gradient-gold italic">Interventions</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-[#FAFAF7]/50 max-w-md mx-auto text-sm">
            Cliquez sur une zone pour découvrir les traitements disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative mx-auto" style={{ width: 300, height: 420 }}>
            <svg viewBox="0 0 100 140" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 40px rgba(201,169,110,0.15))' }}>
              {/* Abstract face silhouette */}
              <ellipse cx="50" cy="45" rx="28" ry="35" fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="0.5" />
              <ellipse cx="50" cy="40" rx="20" ry="26" fill="rgba(201,169,110,0.03)" stroke="rgba(201,169,110,0.08)" strokeWidth="0.3" />
              {/* Neck */}
              <rect x="42" y="79" width="16" height="20" rx="3" fill="rgba(201,169,110,0.03)" stroke="rgba(201,169,110,0.1)" strokeWidth="0.3" />
              {/* Shoulders */}
              <path d="M 20 99 Q 35 95 50 97 Q 65 95 80 99" fill="none" stroke="rgba(201,169,110,0.1)" strokeWidth="0.3" />

              {/* Interactive dots */}
              {areas.map((area) => (
                <g key={area.id} onClick={() => setActive(active?.id === area.id ? null : area)}>
                  <circle
                    cx={area.x}
                    cy={area.y}
                    r="3.5"
                    fill={active?.id === area.id ? '#C9A96E' : 'rgba(201,169,110,0.3)'}
                    stroke="#C9A96E"
                    strokeWidth="0.5"
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                  />
                  <circle
                    cx={area.x}
                    cy={area.y}
                    r="6"
                    fill="none"
                    stroke="rgba(201,169,110,0.2)"
                    strokeWidth="0.3"
                    style={{ animation: active?.id === area.id ? 'none' : 'pulse 2s infinite' }}
                  />
                  <text
                    x={area.x + (area.x < 40 ? -12 : area.x > 60 ? 12 : 8)}
                    y={area.y}
                    textAnchor={area.x < 40 ? 'end' : 'start'}
                    dominantBaseline="middle"
                    fill="rgba(201,169,110,0.6)"
                    fontSize="3"
                    style={{ userSelect: 'none' }}
                  >
                    {area.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-display text-4xl text-[#FAFAF7] mb-2">
                    Zone: <span className="text-[#C9A96E]">{active.label}</span>
                  </h3>
                  <div className="section-divider mb-8" style={{ margin: '24px 0', width: 60 }} />
                  <p className="text-[#FAFAF7]/50 text-sm mb-8">
                    Nos experts vous proposent des solutions personnalisées pour cette zone, alliant précision technique et résultats naturels.
                  </p>
                  <div className="space-y-4">
                    {active.treatments.map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-4 flex items-center gap-4"
                      >
                        <div className="w-1 h-8 bg-[#C9A96E]" />
                        <span className="text-[#FAFAF7]/80 text-sm">{t}</span>
                      </motion.div>
                    ))}
                  </div>
                  <button className="btn-primary mt-8">
                    Consulter un Expert
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center lg:text-left"
                >
                  <h3 className="font-display text-4xl text-[#FAFAF7]/40 mb-4">
                    Sélectionnez une zone
                  </h3>
                  <p className="text-[#FAFAF7]/30 text-sm">
                    Cliquez sur les points dorés pour découvrir les traitements disponibles pour chaque zone du visage.
                  </p>
                  <div className="mt-12 grid grid-cols-2 gap-3">
                    {areas.slice(0, 4).map(area => (
                      <button
                        key={area.id}
                        onClick={() => setActive(area)}
                        className="glass-card p-3 text-left hover:border-[#C9A96E]/40"
                      >
                        <span className="text-[#C9A96E] text-xs tracking-wider">{area.label}</span>
                        <div className="text-[#FAFAF7]/40 text-xs mt-1">{area.treatments.length} traitements</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </section>
  )
}
