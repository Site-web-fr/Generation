import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  { name: 'Philippe & Hélène D.', title: 'Acquéreurs Villa Monaco', text: 'Prestige Properties a trouvé notre villa de rêve en seulement 3 semaines. Un accompagnement hors du commun, de la recherche jusqu\'à la remise des clés. Nous recommandons sans réserve.' },
  { name: 'Groupe Industriel Marchand', title: 'Investisseur Institutionnel', text: 'Pour notre portefeuille de 12 actifs parisiens, l\'équipe Prestige a su identifier les meilleures opportunités avec une expertise marché remarquable. Partenariat renouvelé chaque année.' },
  { name: 'Sarah L.', title: 'Acquéreuse Penthouse Paris', text: 'Passer par Prestige Properties a été la meilleure décision. Ils ont compris exactement ce que je cherchais et m\'ont présenté le bien parfait. Service discret, efficace, exceptionnel.' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="py-32 bg-[#060A14]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Témoignages</span>
          <h2 className="font-display text-5xl text-[#F5F0E8]">
            Ils Nous <span className="gradient-gold italic">Confient</span> Leur Patrimoine
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-card p-12 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C9A96E" color="#C9A96E" />)}
            </div>
            <p className="font-display text-xl text-[#F5F0E8]/80 italic leading-relaxed mb-8">
              "{testimonials[current].text}"
            </p>
            <div className="text-[#C9A96E] font-medium">{testimonials[current].name}</div>
            <div className="text-[#F5F0E8]/40 text-xs mt-1">{testimonials[current].title}</div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={() => setCurrent(p => (p-1+testimonials.length)%testimonials.length)}
            className="w-11 h-11 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E] transition-all">
            <ChevronLeft size={16} className="text-[#C9A96E]" />
          </button>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${i === current ? 'w-6 h-1.5 bg-[#C9A96E]' : 'w-1.5 h-1.5 bg-[#C9A96E]/30'}`} />
          ))}
          <button onClick={() => setCurrent(p => (p+1)%testimonials.length)}
            className="w-11 h-11 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E] transition-all">
            <ChevronRight size={16} className="text-[#C9A96E]" />
          </button>
        </div>
      </div>
    </section>
  )
}
