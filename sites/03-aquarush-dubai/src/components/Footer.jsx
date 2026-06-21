import { Phone, Mail, MapPin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#000810] border-t border-[#00B4D8]/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="text-white font-bold text-lg tracking-wider mb-2">AQUARUSH</div>
            <div className="text-[#00B4D8] text-xs tracking-widest mb-4">DUBAI · JET SKI EXPERIENCE</div>
            <p className="text-white/40 text-sm leading-relaxed">Les meilleurs jet skis de Dubai. Expériences uniques sur les eaux cristallines de la mer d'Arabie.</p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 border border-[#00B4D8]/30 flex items-center justify-center text-[#00B4D8]/60 hover:border-[#00B4D8] hover:text-[#00B4D8] transition-all"><Instagram size={14} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-5">Expériences</h4>
            <ul className="space-y-3">
              {['Tour Burj Al Arab', 'Sunset Skyline Tour', 'Palm Jumeirah Tour', 'Journée Complète', 'Cours Débutants'].map(s => (
                <li key={s}><a href="#" className="text-white/40 text-xs hover:text-[#00B4D8] transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-5">Contact</h4>
            <div className="space-y-3">
              {[[Phone, '+971 50 XXX XXXX'], [Mail, 'info@aquarush-dubai.com'], [MapPin, 'JBR Beach, Stand 12, Dubai']].map(([Icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-white/40 text-xs">
                  <Icon size={12} className="text-[#00B4D8]" />{text}
                </div>
              ))}
            </div>
            <div className="mt-4 glass-card p-3 text-center">
              <div className="text-[#FF6B35] font-bold text-sm">WhatsApp Direct</div>
              <div className="text-white/40 text-xs">Réponse en moins de 5 min</div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#00B4D8]/10 pt-6 text-center">
          <p className="text-white/20 text-xs">© 2024 AquaRush Dubai. Tous droits réservés. Licence Dubai Tourism #XXXX</p>
        </div>
      </div>
    </footer>
  )
}
