export default function Footer() {
  return (
    <footer className="bg-[#060A14] border-t border-[#C9A96E]/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="1" y="1" width="30" height="30" stroke="#C9A96E" strokeWidth="0.5" />
                <path d="M8 24V14L16 8L24 14V24" stroke="#C9A96E" strokeWidth="1" fill="none" />
              </svg>
              <span className="font-display text-xl tracking-[0.2em] text-[#C9A96E] uppercase">Prestige</span>
            </div>
            <p className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-xs">
              L'immobilier de prestige et d'exception, au service des clients les plus exigeants depuis 2008.
            </p>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Services</h4>
            <ul className="space-y-3">
              {['Vente Résidentielle', 'Investissement Locatif', 'Gestion de Patrimoine', 'Conseil Fiscal', 'Marchands de Biens'].map(s => (
                <li key={s}><a href="#" className="text-[#F5F0E8]/40 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[0.65rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Destinations</h4>
            <ul className="space-y-3">
              {['Paris Intra-muros', 'Côte d\'Azur', 'Monaco', 'Bordeaux', 'Dubai & Abu Dhabi'].map(s => (
                <li key={s}><a href="#" className="text-[#F5F0E8]/40 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C9A96E]/10 pt-8 flex justify-between items-center">
          <p className="text-[#F5F0E8]/20 text-xs">© 2024 Prestige Properties. Tous droits réservés.</p>
          <div className="flex gap-4">
            {['Mentions Légales', 'Confidentialité'].map(s => (
              <a key={s} href="#" className="text-[#F5F0E8]/20 text-xs hover:text-[#C9A96E] transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
