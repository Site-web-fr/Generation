import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'

const destinations = [
  { name: 'Côte d\'Azur', flag: '🇫🇷', season: 'Mai - Oct', highlights: ['Monaco', 'Cannes', 'Saint-Tropez', 'Antibes'], desc: 'La quintessence du luxe méditerranéen. Criques sauvages et ports de prestige.' },
  { name: 'Grèce & Cyclades', flag: '🇬🇷', season: 'Avr - Oct', highlights: ['Mykonos', 'Santorin', 'Rhodes', 'Corfou'], desc: 'Des eaux cristallines et des îles légendaires à explorer au gré du vent.' },
  { name: 'Caraïbes', flag: '🌴', season: 'Nov - Avr', highlights: ['Saint-Barth', 'Antigua', 'BVI', 'Grenadines'], desc: 'Eaux turquoise, lagons paradisiaques et rhum sous les étoiles.' },
  { name: 'Croatie', flag: '🇭🇷', season: 'Mai - Sep', highlights: ['Dubrovnik', 'Hvar', 'Split', 'Kornati'], desc: 'Côtes découpées, ports médiévaux et eaux aux mille nuances de bleu.' },
]

export default function Destinations() {
  const [active, setActive] = useState(0)
  return (
    <section id="destinations" className="py-32 bg-[#021020]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#19A7CE] mb-3 block">Destinations</span>
          <h2 className="font-display text-5xl text-[#EEF6FF]">Les Plus Belles <span className="gradient-ocean italic">Mers</span></h2>
          <div className="section-divider" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {destinations.map((d, i) => (
            <button key={d.name} onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-xs tracking-wider uppercase border transition-all ${active === i ? 'bg-[#19A7CE] border-[#19A7CE] text-[#030B18]' : 'border-[#19A7CE]/20 text-[#EEF6FF]/50'}`}>
              {d.flag} {d.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="text-5xl mb-4">{destinations[active].flag}</div>
                <h3 className="font-display text-3xl text-[#EEF6FF] mb-3">{destinations[active].name}</h3>
                <div className="flex items-center gap-2 text-[#19A7CE] text-sm mb-4">
                  <Calendar size={12} /><span>Saison: {destinations[active].season}</span>
                </div>
                <p className="text-[#EEF6FF]/60 text-sm leading-relaxed mb-6">{destinations[active].desc}</p>
                <a href="#charter" className="btn-primary inline-block">Charter vers {destinations[active].name}</a>
              </div>
              <div>
                <div className="text-[0.65rem] tracking-wider uppercase text-[#19A7CE] mb-4">Escales Phares</div>
                <div className="grid grid-cols-2 gap-3">
                  {destinations[active].highlights.map(h => (
                    <div key={h} className="glass-card p-4 flex items-center gap-3">
                      <MapPin size={14} className="text-[#C9A96E] flex-shrink-0" />
                      <span className="text-[#EEF6FF]/70 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
