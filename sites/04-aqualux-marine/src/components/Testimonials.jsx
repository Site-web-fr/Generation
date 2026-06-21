import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Baron H. von K.', yacht: 'Superyacht 38m', text: 'AquaLux est la seule société à qui je confie mon Benetti. Professionnalisme absolu, résultats spectaculaires à chaque intervention. Un partenaire de confiance.', stars: 5 },
  { name: 'Famille Marchand', yacht: 'Ferretti 28m', text: 'Notre yacht brille comme à sa sortie du chantier après chaque passage de leur équipe. Service impeccable, respect des délais, personnel discret et efficace.', stars: 5 },
  { name: 'J. Richardson', yacht: 'Sunseeker 24m', text: 'The best marine detailing team on the French Riviera. The ceramic coating they applied has lasted 3 seasons already. Worth every penny of the investment.', stars: 5 },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#030C16]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl text-[#F0F6FF]">La Confiance de Nos <span className="gradient-gold italic">Armateurs</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-8">
              <div className="flex gap-1 mb-4">{[...Array(r.stars)].map((_, j) => <Star key={j} size={12} fill="#C9A96E" color="#C9A96E" />)}</div>
              <p className="text-[#F0F6FF]/70 text-sm italic leading-relaxed mb-6">"{r.text}"</p>
              <div className="text-[#C9A96E] font-medium text-sm">{r.name}</div>
              <div className="text-[#F0F6FF]/40 text-xs">{r.yacht}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
