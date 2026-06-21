import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Évaluation', desc: 'Inspection complète de votre embarcation par nos experts. Établissement d\'un rapport détaillé et d\'un plan d\'intervention personnalisé.' },
  { num: '02', title: 'Préparation', desc: 'Mise en place de l\'équipement spécialisé, protection des surfaces sensibles, approvisionnement en produits marins haut de gamme.' },
  { num: '03', title: 'Intervention', desc: 'Exécution minutieuse du plan d\'intervention par notre équipe certifiée. Contrôle qualité à chaque étape du processus.' },
  { num: '04', title: 'Contrôle Final', desc: 'Inspection finale exhaustive, test de toutes les surfaces, remise d\'un rapport de traitement complet et recommandations d\'entretien.' },
]

export default function Process() {
  return (
    <section id="processus" className="py-32 bg-[#030C16]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Notre Méthode</span>
          <h2 className="font-display text-5xl text-[#F0F6FF]">
            Un Processus <span className="gradient-gold italic">Irréprochable</span>
          </h2>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative">
                <div className="w-16 h-16 border border-[#C9A96E]/30 flex items-center justify-center mb-6 relative z-10 bg-[#030C16]">
                  <span className="font-display text-2xl text-[#C9A96E]">{s.num}</span>
                </div>
                <h3 className="font-display text-2xl text-[#F0F6FF] mb-3">{s.title}</h3>
                <p className="text-[#F0F6FF]/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
