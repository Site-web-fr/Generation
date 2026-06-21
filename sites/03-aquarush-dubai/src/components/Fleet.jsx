import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Users, Gauge, Star } from 'lucide-react'

const fleet = [
  { name: 'Sea-Doo RXT-X 325', type: 'Performance', speed: 130, seats: 3, power: '325ch', price: 250, priceHalf: 140, features: ['GPS intégré', 'Bluetooth', 'Écran LCD', 'Stabilisation automatique'], color: '#FF6B35', tag: 'Best Seller' },
  { name: 'Yamaha FX SVHO', type: 'Super Sport', speed: 145, seats: 3, power: '1812cc', price: 300, priceHalf: 170, features: ['Ride Control', 'No Wake Mode', 'Trim System', 'Yamaha Connect'], color: '#00B4D8', tag: 'Premium' },
  { name: 'Kawasaki Ultra 310R', type: 'Racing', speed: 150, seats: 3, power: '310ch', price: 350, priceHalf: 200, features: ['Superchargé', 'Launch Control', 'Arrêt Smart Learning', 'K-ACT II'], color: '#7209B7', tag: 'Racing' },
  { name: 'Sea-Doo Spark Trixx', type: 'Fun & Tricks', speed: 90, seats: 2, power: '90ch', price: 180, priceHalf: 100, features: ['Tricks & Jumps', 'Idéal débutants', 'Ultraléger', 'Mode eFly'], color: '#06D6A0', tag: 'Fun' },
]

export default function Fleet() {
  const [active, setActive] = useState(0)
  const jet = fleet[active]

  return (
    <section id="fleet" className="py-32 bg-[#001122]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#00B4D8] mb-3 block">Notre Flotte</span>
          <h2 className="font-display text-5xl lg:text-6xl text-white mb-4">
            Choisissez Votre <span className="gradient-cyan italic">Machine</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {fleet.map((f, i) => (
            <button key={f.name} onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-xs tracking-wider uppercase border transition-all ${active === i ? 'text-[#001122] border-transparent' : 'border-[#00B4D8]/20 text-white/50 hover:border-[#00B4D8]/40'}`}
              style={active === i ? { background: f.color } : {}}>
              {f.type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div key={active} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative rounded-none overflow-hidden" style={{ background: `linear-gradient(135deg, ${jet.color}15, #001A33)`, border: `1px solid ${jet.color}30` }}>
              {jet.tag && (
                <span className="absolute top-4 left-4 text-[0.6rem] tracking-wider uppercase px-3 py-1 font-bold text-[#001122]"
                  style={{ background: jet.color }}>{jet.tag}</span>
              )}
              <div className="h-64 flex items-center justify-center p-8">
                <svg viewBox="0 0 300 150" className="w-full max-w-xs">
                  {/* Jet ski silhouette */}
                  <ellipse cx="150" cy="85" rx="100" ry="20" fill={jet.color} opacity="0.8" />
                  <ellipse cx="150" cy="80" rx="90" ry="15" fill={jet.color} opacity="0.6" />
                  <path d="M70,80 Q90,55 130,50 Q160,45 180,55 Q210,65 230,80" fill={jet.color} opacity="0.9" />
                  <ellipse cx="150" cy="80" rx="40" ry="12" fill={jet.color} />
                  <path d="M140,55 L160,55 L165,70 L135,70 Z" fill={jet.color} opacity="0.8" />
                  {/* Wake effect */}
                  <path d="M230,85 Q250,75 280,80" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
                  <path d="M230,90 Q255,83 285,88" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[['Vitesse Max', jet.speed + ' km/h', Gauge], ['Places', jet.seats, Users], ['Puissance', jet.power, Zap]].map(([l, v, Icon]) => (
                    <div key={l} className="text-center p-3" style={{ background: `${jet.color}10`, border: `1px solid ${jet.color}20` }}>
                      <Icon size={16} className="mx-auto mb-2" style={{ color: jet.color }} />
                      <div className="text-white font-bold text-lg">{v}</div>
                      <div className="text-white/40 text-xs">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div key={`info-${active}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-[0.65rem] tracking-[0.3em] uppercase mb-2" style={{ color: jet.color }}>{jet.type}</div>
            <h3 className="font-display text-4xl text-white mb-6">{jet.name}</h3>

            <div className="space-y-2 mb-8">
              {jet.features.map(f => (
                <div key={f} className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-1 h-1 rounded-full" style={{ background: jet.color }} />
                  {f}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-5 text-center">
                <div className="text-white/50 text-xs mb-1">30 min</div>
                <div className="font-display text-3xl" style={{ color: jet.color }}>{jet.priceHalf}€</div>
              </div>
              <div className="glass-card p-5 text-center" style={{ background: `${jet.color}10`, borderColor: `${jet.color}30` }}>
                <div className="text-white/50 text-xs mb-1">1 heure</div>
                <div className="font-display text-3xl" style={{ color: jet.color }}>{jet.price}€</div>
              </div>
            </div>

            <a href="#réserver" className="btn-primary w-full text-center block">Réserver ce Jet Ski</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
