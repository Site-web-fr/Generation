import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Marie-Claire D.', age: 48, treatment: 'Lifting du Visage', rating: 5, text: 'Une expérience extraordinaire. Le Dr. Moreau est une artiste. Résultat naturel, invisible. Mes amies ne comprennent pas pourquoi j\'ai l\'air si jeune et reposée. Je recommande vivement Lumière à toutes mes amies.' },
  { name: 'Sophie M.', age: 34, treatment: 'Rhinoplastie', rating: 5, text: 'Je complexais depuis toujours à cause de ma bosse nasale. Le Dr. Petit m\'a offert le nez de mes rêves, en harmonie totale avec mon visage. Le suivi post-opératoire était impeccable. Merci infiniment.' },
  { name: 'Caroline F.', age: 41, treatment: 'Blépharoplastie', rating: 5, text: 'Mon regard a retrouvé la fraîcheur de mes 25 ans. L\'équipe est professionnelle, chaleureuse et rassurante. La clinique est magnifique et les soins sont d\'un niveau exceptionnel.' },
  { name: 'Isabelle R.', age: 52, treatment: 'Lifting Cervico-facial', rating: 5, text: 'Après 20 ans de complexe, j\'ai enfin osé franchir le pas. Aucun regret. Le résultat surpasse toutes mes attentes. Je me sens enfin en accord avec l\'image que j\'ai de moi-même. Merci Lumière.' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(p => (p + 1) % testimonials.length)

  return (
    <section className="py-32 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Témoignages</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7]">
            Elles Nous <span className="gradient-gold italic">Font Confiance</span>
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-12 text-center"
            >
              <Quote size={40} className="text-[#C9A96E]/20 mx-auto mb-8" />
              <p className="font-display text-xl lg:text-2xl text-[#FAFAF7]/80 leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#C9A96E" color="#C9A96E" />
                ))}
              </div>
              <div className="text-[#C9A96E] font-medium">{testimonials[current].name}</div>
              <div className="text-[#FAFAF7]/40 text-xs mt-1 tracking-wider">
                {testimonials[current].age} ans · {testimonials[current].treatment}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all">
              <ChevronLeft size={18} className="text-[#C9A96E]" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-[#C9A96E] w-6' : 'bg-[#C9A96E]/30'}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all">
              <ChevronRight size={18} className="text-[#C9A96E]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
