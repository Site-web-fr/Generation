import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Star } from 'lucide-react'

const experiences = [
  { title: 'Tour Burj Al Arab', duration: '2h', group: '1-4 pers', price: 599, route: 'JBR → Palm → Burj Al Arab → retour', highlight: 'Vue exceptionnelle du Burj', color: '#00B4D8' },
  { title: 'Sunset Dubai Skyline', duration: '1h30', group: '1-6 pers', price: 449, route: 'Dubai Marina → Downtown → Retour coucher de soleil', highlight: 'Panorama du skyline au coucher du soleil', color: '#FF6B35' },
  { title: 'Palm Jumeirah Express', duration: '1h', group: '1-4 pers', price: 299, route: 'La Mer → Palm Jumeirah → Tour du Palm', highlight: 'L\'île artificielle la plus célèbre du monde', color: '#7209B7' },
  { title: 'Dubai Marina Full Tour', duration: '3h', group: '2-8 pers', price: 899, route: 'Tour complet de la Marina + plages privées', highlight: 'Expérience complète avec pause baignade', color: '#06D6A0' },
]

export default function Experiences() {
  return (
    <section id="expériences" className="py-32 bg-[#000D1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#00B4D8] mb-3 block">Nos Itinéraires</span>
          <h2 className="font-display text-5xl lg:text-6xl text-white mb-4">
            Expériences <span className="gradient-cyan italic">Uniques</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <motion.div key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card overflow-hidden group cursor-none">
              <div className="h-2" style={{ background: exp.color }} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{exp.title}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => <Star key={j} size={11} fill="#FF6B35" color="#FF6B35" />)}
                    </div>
                  </div>
                  <div className="font-display text-3xl" style={{ color: exp.color }}>{exp.price}€</div>
                </div>

                <div className="flex items-center gap-1 text-white/50 text-sm mb-4">
                  <MapPin size={12} />
                  <span>{exp.route}</span>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Clock size={12} style={{ color: exp.color }} />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Users size={12} style={{ color: exp.color }} />
                    <span>{exp.group}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-3 text-white/70 text-sm italic mb-6">
                  ✨ {exp.highlight}
                </div>

                <a href="#réserver" className="block text-center py-3 text-xs tracking-wider uppercase font-semibold transition-all"
                  style={{ border: `1px solid ${exp.color}`, color: exp.color }}
                  onMouseEnter={e => { e.target.style.background = exp.color; e.target.style.color = '#001122' }}
                  onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = exp.color }}>
                  Réserver Cette Expérience
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
