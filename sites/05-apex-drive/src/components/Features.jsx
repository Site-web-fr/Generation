import { motion } from 'framer-motion'
import { Shield, Clock, Star, MapPin, Phone, Zap } from 'lucide-react'

const features = [
  { icon: Shield, title: 'Assurance Tous Risques', desc: 'Chaque véhicule est assuré tous risques. Conduisez l\'esprit serein.' },
  { icon: Clock, title: 'Disponible 24/7', desc: 'Assistance et support disponibles à toute heure, 7 jours sur 7.' },
  { icon: Star, title: 'Véhicules Premium', desc: 'Flotte exclusive, entretenue par des spécialistes certifiés, toujours impeccable.' },
  { icon: MapPin, title: 'Livraison & Reprise', desc: 'Livraison à votre hôtel, aéroport ou domicile dans toutes nos villes.' },
  { icon: Phone, title: 'Concierge Dédié', desc: 'Un conseiller personnel vous accompagne du début à la fin.' },
  { icon: Zap, title: 'Réservation Instantanée', desc: 'Confirmez votre réservation en moins de 5 minutes. Simple et efficace.' },
]

export default function Features() {
  return (
    <section id="services" className="py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#DC143C] mb-3 block">Pourquoi Apex Drive</span>
          <h2 className="font-display text-5xl text-white">
            L'Excellence <span className="gradient-red italic">Sans Compromis</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:border-[#DC143C]/30 transition-all cursor-none">
              <f.icon size={24} className="text-[#DC143C] mb-5" />
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
