import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Alexandre M.', country: '🇫🇷 France', text: 'Experience incroyable! Le Kawasaki 310R est une bête. L\'instructeur était super professionnel. On reviendra!', stars: 5 },
  { name: 'Sarah K.', country: '🇬🇧 UK', text: 'Best activity in Dubai! The sunset tour was breathtaking. The jet skis are brand new and powerful. Highly recommend!', stars: 5 },
  { name: 'Mohammed Al F.', country: '🇦🇪 UAE', text: 'Les meilleurs jets skis de Dubai Marina! Service impeccable, équipe sympa, les photos étaient magnifiques. 10/10!', stars: 5 },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#000D1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-white">Ce Que Disent Nos <span className="gradient-cyan italic">Riders</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6">
              <div className="flex gap-1 mb-3">{[...Array(r.stars)].map((_, j) => <Star key={j} size={12} fill="#FF6B35" color="#FF6B35" />)}</div>
              <p className="text-white/70 text-sm italic mb-4">"{r.text}"</p>
              <div className="text-[#00B4D8] font-medium text-sm">{r.name}</div>
              <div className="text-white/40 text-xs">{r.country}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
