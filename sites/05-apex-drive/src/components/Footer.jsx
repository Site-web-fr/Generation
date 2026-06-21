export default function Footer() {
  return (
    <footer className="bg-[#030303] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1"><div className="w-5 h-5 bg-[#DC143C] transform skew-x-[-10deg]" /><div className="w-1.5 h-5 bg-[#DC143C]/50 transform skew-x-[-10deg]" /></div>
              <div className="text-white font-bold text-lg tracking-wider">APEX DRIVE</div>
            </div>
            <p className="text-white/30 text-xs max-w-xs">Location de véhicules de luxe et de sport. Paris · Monaco · Cannes · Dubai.</p>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="text-[0.6rem] tracking-widest uppercase text-[#DC143C] mb-4">Véhicules</div>
              <ul className="space-y-2">{['Supercars', 'GT & Sport', 'Luxury', 'SUV Premium', 'Convertibles'].map(s => <li key={s}><a href="#" className="text-white/30 text-xs hover:text-[#DC143C] transition-colors">{s}</a></li>)}</ul>
            </div>
            <div>
              <div className="text-[0.6rem] tracking-widets uppercase text-[#DC143C] mb-4">Villes</div>
              <ul className="space-y-2">{['Paris', 'Monaco', 'Nice', 'Cannes', 'Dubai'].map(s => <li key={s}><a href="#" className="text-white/30 text-xs hover:text-[#DC143C] transition-colors">{s}</a></li>)}</ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex justify-between items-center">
          <p className="text-white/20 text-xs">© 2024 Apex Drive. Tous droits réservés.</p>
          <p className="text-white/20 text-xs">+33 1 XX XX XX XX · contact@apex-drive.fr</p>
        </div>
      </div>
    </footer>
  )
}
