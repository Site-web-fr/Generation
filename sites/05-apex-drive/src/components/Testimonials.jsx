import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Nicolas B.', car: 'Lamborghini Huracán', text: 'Expérience absolument incroyable. La Ferrari était impeccable, livrée directement à mon palace. L\'équipe Apex Drive est au top. On reviendra!', stars: 5 },
  { name: 'Alexandra M.', car: 'Rolls-Royce Ghost', text: 'Pour notre mariage, nous avons loué la Ghost. Service irréprochable, chauffeur professionnel, voiture magnifique. Nos invités étaient épatés.', stars: 5 },
  { name: 'Robert K.', car: 'Porsche 911 Turbo S', text: 'Trois jours sur la Côte d\'Azur avec la 911 Turbo S. Quelques virages de légende. Une expérience que je recommande à tout passionné!', stars: 5 },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-white">Nos <span className="gradient-red italic">Conducteurs</span> Témoignent</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-8">
              <div className="flex gap-1 mb-3">{[...Array(r.stars)].map((_, j) => <Star key={j} size={12} fill="#DC143C" color="#DC143C" />)}</div>
              <p className="text-white/70 text-sm italic leading-relaxed mb-5">"{r.text}"</p>
              <div className="text-white font-medium text-sm">{r.name}</div>
              <div className="text-[#DC143C]/60 text-xs">{r.car}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
