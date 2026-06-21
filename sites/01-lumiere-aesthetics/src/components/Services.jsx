import { motion } from 'framer-motion'
import { Sparkles, Zap, Eye, Smile, Heart, Activity } from 'lucide-react'

const services = [
  { icon: Sparkles, title: 'Lifting du Visage', desc: 'Rajeunissement harmonieux par des techniques mini-invasives de pointe pour un résultat naturel et durable.', price: 'À partir de 4 500€', tag: 'Plus Populaire' },
  { icon: Eye, title: 'Blépharoplastie', desc: 'Correction des paupières tombantes ou gonflées. Révélez l\'éclat de votre regard avec une précision chirurgicale absolue.', price: 'À partir de 2 800€', tag: null },
  { icon: Zap, title: 'Rhinoplastie', desc: 'Sculpture du nez pour une harmonie faciale parfaite. Chaque intervention est une œuvre d\'art personnalisée.', price: 'À partir de 5 200€', tag: 'Signature' },
  { icon: Smile, title: 'Augmentation des Lèvres', desc: 'Des lèvres pulpeuses et naturelles grâce à nos techniques d\'injection à l\'acide hyaluronique premium.', price: 'À partir de 480€', tag: null },
  { icon: Heart, title: 'Augmentation Mammaire', desc: 'Silhouette sublime et équilibrée avec des implants de nouvelle génération, adaptés à votre morphologie.', price: 'À partir de 6 800€', tag: null },
  { icon: Activity, title: 'Corps & Silhouette', desc: 'Liposuccion, abdominoplastie et sculpture corporelle pour révéler la meilleure version de vous-même.', price: 'À partir de 3 200€', tag: null },
]

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Notre Expertise</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7] mb-6">
            Des Traitements <span className="gradient-gold italic">d'Exception</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-[#FAFAF7]/50 max-w-xl mx-auto text-sm leading-relaxed">
            Chaque traitement est conçu pour sublimer votre beauté naturelle avec les techniques les plus avancées de la chirurgie esthétique mondiale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 relative group cursor-none"
            >
              {service.tag && (
                <span className="absolute top-4 right-4 text-[0.6rem] tracking-[0.2em] uppercase bg-[#C9A96E] text-[#1A1A1A] px-3 py-1 font-semibold">
                  {service.tag}
                </span>
              )}
              <div className="w-12 h-12 border border-[#C9A96E]/30 flex items-center justify-center mb-6 group-hover:border-[#C9A96E] transition-colors duration-300">
                <service.icon size={20} className="text-[#C9A96E]" />
              </div>
              <h3 className="font-display text-2xl text-[#FAFAF7] mb-3">{service.title}</h3>
              <p className="text-[#FAFAF7]/50 text-sm leading-relaxed mb-6">{service.desc}</p>
              <div className="flex items-center justify-between border-t border-[#C9A96E]/10 pt-4">
                <span className="text-[#C9A96E] text-sm font-medium">{service.price}</span>
                <button className="text-[0.65rem] tracking-[0.2em] uppercase text-[#FAFAF7]/40 hover:text-[#C9A96E] transition-colors">
                  En savoir +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
