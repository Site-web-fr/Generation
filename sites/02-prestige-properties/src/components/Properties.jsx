import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bed, Bath, Square, MapPin, Heart, ArrowUpRight } from 'lucide-react'

const properties = [
  { id: 1, name: 'Penthouse Champs-Élysées', location: 'Paris 8ème', price: '12 500 000€', size: 420, beds: 5, baths: 4, tag: 'Exclusivité', category: 'Vente', gradient: 'from-[#C9A96E]/20 to-[#1E3A5F]/30' },
  { id: 2, name: 'Villa Méditerranée', location: 'Cap Ferrat', price: '28 000 000€', size: 780, beds: 8, baths: 7, tag: 'Coup de Cœur', category: 'Vente', gradient: 'from-[#1E3A5F]/30 to-[#C9A96E]/20' },
  { id: 3, name: 'Appartement Trocadéro', location: 'Paris 16ème', price: '8 900 000€', size: 280, beds: 4, baths: 3, tag: null, category: 'Vente', gradient: 'from-[#2D1810]/30 to-[#C9A96E]/10' },
  { id: 4, name: 'Château Bordelais', location: 'Saint-Émilion', price: '4 500 000€', size: 1200, beds: 10, baths: 8, tag: 'Historique', category: 'Vente', gradient: 'from-[#0A1628]/50 to-[#C9A96E]/20' },
  { id: 5, name: 'Duplex Côte d\'Azur', location: 'Monaco', price: '18 500 000€', size: 350, beds: 4, baths: 4, tag: 'Vue Mer', category: 'Location', gradient: 'from-[#1E3A5F]/40 to-transparent' },
  { id: 6, name: 'Loft Design Marais', location: 'Paris 4ème', price: '3 200 000€', size: 195, beds: 2, baths: 2, tag: null, category: 'Vente', gradient: 'from-[#C9A96E]/10 to-[#1A1A1A]/50' },
]

const categories = ['Tous', 'Vente', 'Location']
const locations = ['Tous les lieux', 'Paris', 'Côte d\'Azur', 'Monaco', 'Bordeaux']

export default function Properties() {
  const [cat, setCat] = useState('Tous')
  const [wishlist, setWishlist] = useState([])

  const filtered = cat === 'Tous' ? properties : properties.filter(p => p.category === cat)

  return (
    <section id="propriétés" className="py-32 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div data-reveal>
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Notre Sélection</span>
            <h2 className="font-display text-5xl lg:text-6xl text-[#F5F0E8]">
              Propriétés <span className="gradient-gold italic">d'Exception</span>
            </h2>
          </div>
          <div className="flex gap-2 mt-8 lg:mt-0">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2 text-xs tracking-wider uppercase transition-all border ${cat === c ? 'bg-[#C9A96E] text-[#0A0F1E] border-[#C9A96E]' : 'border-[#C9A96E]/20 text-[#F5F0E8]/50 hover:border-[#C9A96E]/40'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((prop, i) => (
            <motion.div key={prop.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card overflow-hidden cursor-none">
              <div className={`relative h-64 bg-gradient-to-br ${prop.gradient} overflow-hidden`}>
                {prop.tag && (
                  <span className="absolute top-4 left-4 text-[0.6rem] tracking-wider uppercase bg-[#C9A96E] text-[#0A0F1E] px-3 py-1 font-semibold z-10">
                    {prop.tag}
                  </span>
                )}
                <button
                  onClick={() => setWishlist(w => w.includes(prop.id) ? w.filter(x => x !== prop.id) : [...w, prop.id])}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center z-10 backdrop-blur-sm bg-black/20">
                  <Heart size={16} className={wishlist.includes(prop.id) ? 'fill-[#C9A96E] text-[#C9A96E]' : 'text-white/60'} />
                </button>

                {/* Abstract architecture visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 180" className="w-full h-full opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                    <rect x="60" y="40" width="80" height="110" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="0.5" />
                    {[60,70,80,90,100,110,120].map(x => (
                      <line key={x} x1={x} y1="40" x2={x} y2="150" stroke="rgba(201,169,110,0.1)" strokeWidth="0.3" />
                    ))}
                    {[60,75,90,105,120,135,150].map(y => (
                      <line key={y} x1="60" y1={y} x2="140" y2={y} stroke="rgba(201,169,110,0.1)" strokeWidth="0.3" />
                    ))}
                    <rect x="85" y="120" width="30" height="30" fill="rgba(201,169,110,0.1)" stroke="rgba(201,169,110,0.5)" strokeWidth="0.5" />
                    <polygon points="60,40 100,15 140,40" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[#C9A96E] font-display text-2xl font-semibold">{prop.price}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#F5F0E8] font-medium mb-1">{prop.name}</h3>
                    <div className="flex items-center gap-1 text-[#F5F0E8]/40 text-xs">
                      <MapPin size={10} />
                      <span>{prop.location}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-[#C9A96E]/40 group-hover:text-[#C9A96E] transition-colors mt-1" />
                </div>

                <div className="flex items-center gap-5 pt-4 border-t border-[#C9A96E]/10">
                  <div className="flex items-center gap-1.5 text-[#F5F0E8]/40 text-xs">
                    <Bed size={12} /><span>{prop.beds}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#F5F0E8]/40 text-xs">
                    <Bath size={12} /><span>{prop.baths}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#F5F0E8]/40 text-xs">
                    <Square size={12} /><span>{prop.size}m²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-outline">Voir Toutes les Propriétés</button>
        </div>
      </div>
    </section>
  )
}
