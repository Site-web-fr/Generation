import { Anchor, Phone, Mail, Wind } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#020810] border-t border-[#19A7CE]/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Anchor size={18} className="text-[#C9A96E]" />
              <span className="font-display text-xl text-[#EEF6FF] tracking-[0.15em]">HORIZON YACHTS</span>
            </div>
            <p className="text-[#EEF6FF]/30 text-xs max-w-xs leading-relaxed">Charter de yachts de luxe. Méditerranée, Caraïbes, Océan Indien. Votre prochaine aventure commence ici.</p>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-wider uppercase text-[#19A7CE] mb-4">Destinations</div>
            <ul className="space-y-2">{['Côte d\'Azur', 'Grèce & Cyclades', 'Caraïbes', 'Croatie', 'Maldives'].map(s => <li key={s}><a href="#" className="text-[#EEF6FF]/30 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-wider uppercase text-[#19A7CE] mb-4">Contact</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#EEF6FF]/30"><Phone size={10} className="text-[#19A7CE]" />+33 4 XX XX XX XX</div>
              <div className="flex items-center gap-2 text-[#EEF6FF]/30"><Mail size={10} className="text-[#19A7CE]" />charter@horizon-yachts.fr</div>
              <div className="flex items-center gap-2 text-[#C9A96E]/60 mt-2"><Wind size={10} />Disponible 7j/7</div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#19A7CE]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#EEF6FF]/20 text-xs">© 2024 Horizon Yachts. Tous droits réservés.</p>
          <p className="text-[#EEF6FF]/20 text-xs">Licence MCA · Assurance P&I · MYBA Member</p>
        </div>
      </div>
    </footer>
  )
}
