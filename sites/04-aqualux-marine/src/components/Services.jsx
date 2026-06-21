import { motion } from 'framer-motion'
import { Droplets, Sparkles, Shield, Wind, Sun, Anchor } from 'lucide-react'

const services = [
  { icon: Droplets, title: 'Lavage Extérieur Premium', desc: 'Nettoyage haute pression professionnel, dégraissage de la coque, rinçage à l\'eau douce osmosée. Produits marins certifiés éco-responsables.', detail: 'Coque · Pont · Superstructure' },
  { icon: Sparkles, title: 'Polissage & Cirage', desc: 'Polissage électronique multi-étapes, protection par nanocéramique ou cire marine de haute qualité. Brillance restaurée comme à l\'état neuf.', detail: 'Gelcoat · Fibre de Verre · Inox' },
  { icon: Shield, title: 'Protection Céramique', desc: 'Application de revêtements céramiques professionnels pour une protection durable contre les UV, le sel et les contaminants marins.', detail: 'Protection 2-5 ans' },
  { icon: Wind, title: 'Nettoyage Intérieur', desc: 'Nettoyage approfondi de toutes les surfaces intérieures, traitement du cuir et des tissus, désinfection et déodorisation complète.', detail: 'Cabines · Salon · Cuisine' },
  { icon: Sun, title: 'Traitement Antifouling', desc: 'Application et entretien des peintures antifouling pour protéger votre coque des organismes marins et maintenir les performances nautiques.', detail: 'Carénage complet' },
  { icon: Anchor, title: 'Entretien de Pont', desc: 'Rénovation et traitement des ponts en teck, polissage des acajous, entretien des rails et garnitures inox, cordages et voilerie.', detail: 'Teck · Inox · Gréement' },
]

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#030C16]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Notre Expertise</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#F0F6FF] mb-4">
            Services <span className="gradient-gold italic">d'Excellence</span>
          </h2>
          <div className="section-divider" />
          <p className="text-[#F0F6FF]/50 max-w-lg mx-auto text-sm mt-4">
            Chaque yacht bénéficie d'un traitement sur mesure, adapté à ses spécificités et aux exigences de son propriétaire.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 group cursor-none">
              <div className="w-12 h-12 border border-[#C9A96E]/20 flex items-center justify-center mb-6 group-hover:border-[#C9A96E] transition-colors">
                <s.icon size={20} className="text-[#C9A96E]/70 group-hover:text-[#C9A96E]" />
              </div>
              <h3 className="font-display text-2xl text-[#F0F6FF] mb-3">{s.title}</h3>
              <p className="text-[#F0F6FF]/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="text-[#C9A96E] text-xs tracking-wider border-t border-[#C9A96E]/10 pt-4">{s.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
