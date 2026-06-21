import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'

const team = [
  {
    name: 'Dr. Isabelle Moreau',
    title: 'Chirurgienne Esthétique en Chef',
    specialty: 'Chirurgie du Visage',
    experience: '18 ans',
    certifications: ['Société Française de Chirurgie Plastique', 'ISAPS Member'],
    gradient: 'from-[#C9A96E]/20 to-[#8B2252]/20',
  },
  {
    name: 'Dr. Alexandre Petit',
    title: 'Chirurgien Senior',
    specialty: 'Corps & Silhouette',
    experience: '14 ans',
    certifications: ['Académie Nationale de Chirurgie', 'European Board Member'],
    gradient: 'from-[#8B2252]/20 to-[#C9A96E]/20',
  },
  {
    name: 'Dr. Camille Laurent',
    title: 'Médecin Esthétique',
    specialty: 'Médecine Esthétique',
    experience: '10 ans',
    certifications: ['Diplôme Universitaire Paris VI', 'Expert Injections'],
    gradient: 'from-[#C9A96E]/20 to-transparent',
  },
]

export default function Team() {
  return (
    <section id="équipe" className="py-32 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Notre Équipe</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7] mb-6">
            Des Experts <span className="gradient-gold italic">Mondialement</span> Reconnus
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group cursor-none"
            >
              <div className={`relative h-80 bg-gradient-to-br ${doc.gradient} border border-[#C9A96E]/10 group-hover:border-[#C9A96E]/30 transition-all duration-500 mb-6 flex items-end p-6 overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-32 h-32 border border-[#C9A96E] rounded-full" />
                  <div className="absolute w-20 h-20 border border-[#C9A96E]/50 rounded-full" />
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 border border-[#C9A96E]/30 flex items-center justify-center">
                    <Award size={14} className="text-[#C9A96E]" />
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-[0.6rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-1">{doc.specialty}</div>
                  <div className="font-display text-2xl text-[#FAFAF7]">{doc.name}</div>
                </div>
              </div>

              <div className="px-2">
                <h3 className="font-medium text-[#FAFAF7]/80 text-sm mb-1">{doc.title}</h3>
                <p className="text-[#C9A96E] text-xs mb-4">{doc.experience} d'expérience</p>
                <div className="space-y-2">
                  {doc.certifications.map(cert => (
                    <div key={cert} className="flex items-center gap-2">
                      <GraduationCap size={12} className="text-[#C9A96E]/60 flex-shrink-0" />
                      <span className="text-[#FAFAF7]/40 text-xs">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
