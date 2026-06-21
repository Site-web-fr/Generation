export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#C9A96E]/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-[#C9A96E] flex items-center justify-center">
                <div className="w-3 h-3 bg-[#C9A96E]" />
              </div>
              <span className="font-display text-xl tracking-[0.2em] text-[#C9A96E] uppercase">Lumière</span>
            </div>
            <p className="text-[#FAFAF7]/40 text-sm leading-relaxed max-w-xs">
              Centre de chirurgie esthétique d'excellence. Alliant art, science et bienveillance pour sublimer votre beauté naturelle.
            </p>
            <div className="flex gap-3 mt-6">
              {['Instagram', 'Facebook', 'LinkedIn'].map(s => (
                <a key={s} href="#" className="w-9 h-9 border border-[#C9A96E]/20 flex items-center justify-center text-[#FAFAF7]/40 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all text-xs">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[0.7rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Traitements</h4>
            <ul className="space-y-3">
              {['Chirurgie Faciale', 'Chirurgie Corporelle', 'Médecine Esthétique', 'Chirurgie des Seins', 'Traitements Laser'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[#FAFAF7]/40 text-xs hover:text-[#C9A96E] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] tracking-[0.3em] uppercase text-[#C9A96E] mb-5">Contact</h4>
            <ul className="space-y-3 text-[#FAFAF7]/40 text-xs">
              <li>12 Rue de la Paix, 75001 Paris</li>
              <li>+33 1 42 XX XX XX</li>
              <li>contact@lumiere-aesthetics.fr</li>
              <li className="pt-3 text-[#C9A96E]/60">Lun-Ven: 09h-18h</li>
              <li>Samedi: 09h-14h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#C9A96E]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FAFAF7]/20 text-xs">© 2024 Lumière Aesthetics. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Mentions Légales', 'Politique de Confidentialité', 'CGU'].map(item => (
              <a key={item} href="#" className="text-[#FAFAF7]/20 text-xs hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
