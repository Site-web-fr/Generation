import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gauge, Zap, Users, ArrowUpRight } from 'lucide-react'

const cars = [
  { brand: 'Lamborghini', model: 'Huracán Evo', category: 'Supercar', price: 1800, day: 2400, speed: 325, power: '640ch', seats: 2, color: '#FF6B00', tag: 'Best Seller', accel: '2.9s' },
  { brand: 'Ferrari', model: '488 GTB', category: 'Supercar', price: 1600, day: 2200, speed: 330, power: '670ch', seats: 2, color: '#DC143C', tag: 'Exclusif', accel: '3.0s' },
  { brand: 'Rolls-Royce', model: 'Ghost', category: 'Luxury', price: 1400, day: 1900, speed: 250, power: '563ch', seats: 5, color: '#C0C0C0', tag: 'Prestige', accel: '4.5s' },
  { brand: 'Bentley', model: 'Continental GT', category: 'GT', price: 1200, day: 1700, speed: 318, power: '650ch', seats: 4, color: '#2D5016', tag: null, accel: '3.6s' },
  { brand: 'Porsche', model: '911 Turbo S', category: 'Sportive', price: 900, day: 1300, speed: 330, power: '650ch', seats: 4, color: '#1A1A1A', tag: null, accel: '2.7s' },
  { brand: 'Aston Martin', model: 'Vantage', category: 'GT', price: 950, day: 1350, speed: 314, power: '510ch', seats: 2, color: '#1B4D3E', tag: null, accel: '3.6s' },
]

const categories = ['Tous', 'Supercar', 'Luxury', 'GT', 'Sportive']

export default function Fleet() {
  const [cat, setCat] = useState('Tous')
  const filtered = cat === 'Tous' ? cars : cars.filter(c => c.category === cat)

  return (
    <section id="fleet" className="py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div>
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#DC143C] mb-3 block">Notre Flotte</span>
            <h2 className="font-display text-5xl lg:text-6xl text-white">
              La Crème de <span className="gradient-red italic">l'Automobile</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-all border ${cat === c ? 'bg-[#DC143C] border-[#DC143C] text-white' : 'border-white/10 text-white/40 hover:border-[#DC143C]/40'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
            <motion.div key={car.model}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card overflow-hidden group cursor-none">
              {/* Car visual */}
              <div className="relative h-48" style={{ background: `linear-gradient(135deg, ${car.color}15, #0A0A0A)` }}>
                {car.tag && <span className="absolute top-3 left-3 text-[0.6rem] tracking-widest uppercase bg-[#DC143C] text-white px-3 py-1 font-bold">{car.tag}</span>}
                <ArrowUpRight size={16} className="absolute top-3 right-3 text-white/20 group-hover:text-[#DC143C] transition-colors" />
                {/* Car silhouette SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 280 120" className="w-56 h-auto opacity-60 group-hover:opacity-90 transition-opacity">
                    <ellipse cx="140" cy="80" rx="110" ry="18" fill={car.color} opacity="0.3" />
                    <path d="M40,80 Q50,40 90,35 Q120,30 140,30 Q165,30 195,38 Q220,45 230,70 L240,80 L40,80Z" fill={car.color} opacity="0.7" />
                    <path d="M90,35 Q120,20 165,20 Q190,22 200,35" fill={car.color} opacity="0.5" />
                    <circle cx="80" cy="80" r="18" fill="#1A1A1A" stroke={car.color} strokeWidth="3" opacity="0.8" />
                    <circle cx="80" cy="80" r="10" fill="#0A0A0A" />
                    <circle cx="200" cy="80" r="18" fill="#1A1A1A" stroke={car.color} strokeWidth="3" opacity="0.8" />
                    <circle cx="200" cy="80" r="10" fill="#0A0A0A" />
                  </svg>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="font-display text-2xl" style={{ color: car.color }}>{car.price}€<span className="text-sm text-white/40">/j</span></span>
                </div>
              </div>

              <div className="p-6">
                <div className="text-white/40 text-xs tracking-widest uppercase mb-1">{car.brand}</div>
                <h3 className="text-white font-bold text-xl mb-4">{car.model}</h3>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[[Gauge, car.speed + ' km/h', 'Vmax'], [Zap, car.accel, '0-100'], [Users, car.seats + ' places', 'Places']].map(([Icon, val, label]) => (
                    <div key={label} className="text-center p-2 bg-white/3 border border-white/5">
                      <Icon size={12} className="mx-auto mb-1 text-[#DC143C]" />
                      <div className="text-white text-xs font-medium">{val}</div>
                      <div className="text-white/30 text-[0.55rem] uppercase">{label}</div>
                    </div>
                  ))}
                </div>

                <a href="#configurateur" className="block text-center py-3 border border-[#DC143C]/40 text-[#DC143C] text-xs tracking-wider uppercase hover:bg-[#DC143C] hover:text-white transition-all">
                  Réserver
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
