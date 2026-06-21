export default function Footer() {
  return (
    <footer className="bg-[#020810] border-t border-[#C9A96E]/10 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-display text-xl text-[#C9A96E] tracking-widest mb-2">AQUALUX MARINE</div>
          <p className="text-[#F0F6FF]/30 text-xs max-w-xs leading-relaxed">Service de détailing nautique premium. Votre yacht entre les meilleures mains.</p>
        </div>
        <div className="flex gap-16">
          <div>
            <div className="text-[0.6rem] tracking-widest uppercase text-[#C9A96E] mb-4">Services</div>
            <ul className="space-y-2">{['Lavage Premium', 'Polissage', 'Céramique', 'Antifouling'].map(s => <li key={s}><a href="#" className="text-[#F0F6FF]/30 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-widest uppercase text-[#C9A96E] mb-4">Ports</div>
            <ul className="space-y-2">{['Monaco', 'Nice', 'Cannes', 'Antibes', 'Saint-Tropez'].map(s => <li key={s}><a href="#" className="text-[#F0F6FF]/30 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>)}</ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-[#C9A96E]/10">
        <p className="text-[#F0F6FF]/20 text-xs">© 2024 AquaLux Marine. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
