import { motion } from 'framer-motion'
import { Search, TrendingUp, Shield, Globe, Key, Users } from 'lucide-react'

const services = [
  { icon: Search, title: 'Recherche Sur Mesure', desc: 'Nous trouvons la propriété parfaite selon vos critères les plus exigeants, partout dans le monde.' },
  { icon: TrendingUp, title: 'Valorisation Optimale', desc: 'Stratégies de vente premium pour maximiser la valeur de votre bien dans les meilleurs délais.' },
  { icon: Shield, title: 'Accompagnement Juridique', desc: 'Notaires, avocats fiscalistes et experts en droit immobilier à votre service à chaque étape.' },
  { icon: Globe, title: 'Réseau International', desc: 'Accès à un réseau exclusif de 500+ agences partenaires dans 15 pays pour des acquisitions mondiales.' },
  { icon: Key, title: 'Gestion Locative', desc: 'Gestion complète de votre patrimoine locatif : rendement optimisé, locataires sélectionnés.' },
  { icon: Users, title: 'Conseil Patrimonial', desc: 'Stratégies d\'investissement personnalisées pour construire et protéger votre patrimoine immobilier.' },
]

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#060A14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Notre Savoir-Faire</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#F5F0E8] mb-4">
            Services <span className="gradient-gold italic">Exclusifs</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A96E]/10">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#060A14] p-10 group hover:bg-[#0A0F1E] transition-all cursor-none">
              <div className="w-12 h-12 border border-[#C9A96E]/20 flex items-center justify-center mb-6 group-hover:border-[#C9A96E] group-hover:bg-[#C9A96E]/5 transition-all">
                <s.icon size={20} className="text-[#C9A96E]/60 group-hover:text-[#C9A96E]" />
              </div>
              <h3 className="font-medium text-[#F5F0E8] mb-3">{s.title}</h3>
              <p className="text-[#F5F0E8]/40 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
