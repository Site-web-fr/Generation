import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Euro } from 'lucide-react'

export default function Calculator() {
  const [price, setPrice] = useState(2000000)
  const [apport, setApport] = useState(30)
  const [duration, setDuration] = useState(20)
  const [rate, setRate] = useState(3.8)
  const [rental, setRental] = useState(false)
  const [rentPrice, setRentPrice] = useState(5000)

  const loan = price * (1 - apport / 100)
  const monthlyRate = rate / 100 / 12
  const months = duration * 12
  const monthlyPayment = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalCost = monthlyPayment * months
  const notaryFees = price * 0.075
  const agencyFees = price * 0.025
  const totalInvestment = price + notaryFees + agencyFees
  const annualRent = rentPrice * 12
  const grossYield = rental ? ((annualRent / totalInvestment) * 100).toFixed(2) : null

  return (
    <section id="estimateur" className="py-32 bg-[#0A0F1E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Outil Financier</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#F5F0E8] mb-4">
            Simulateur <span className="gradient-gold italic">d'Investissement</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[
              { label: 'Prix du Bien', value: price, setter: setPrice, min: 300000, max: 30000000, step: 50000, format: (v) => `${(v/1000000).toFixed(2)}M€` },
              { label: `Apport Personnel: ${apport}%`, value: apport, setter: setApport, min: 10, max: 80, step: 5, format: (v) => `${v}%` },
              { label: `Durée: ${duration} ans`, value: duration, setter: setDuration, min: 5, max: 25, step: 5, format: (v) => `${v} ans` },
              { label: `Taux d'intérêt: ${rate}%`, value: rate, setter: setRate, min: 1, max: 6, step: 0.1, format: (v) => `${v}%` },
            ].map(({ label, value, setter, min, max, step }) => (
              <div key={label} className="glass-card p-5">
                <div className="flex justify-between mb-3">
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/80">{label}</label>
                  <span className="text-[#F5F0E8] text-sm font-medium">
                    {label.includes('Prix') ? `${(value/1000000).toFixed(2)}M€` : label.includes('Apport') ? `${(price * apport/100).toLocaleString()}€` : ''}
                  </span>
                </div>
                <input type="range" min={min} max={max} step={step} value={value}
                  onChange={e => setter(+e.target.value)}
                  className="w-full accent-[#C9A96E]" />
              </div>
            ))}

            <div className="glass-card p-5">
              <label className="flex items-center gap-3 cursor-none">
                <div onClick={() => setRental(!rental)}
                  className={`w-10 h-5 rounded-full relative transition-all ${rental ? 'bg-[#C9A96E]' : 'bg-[#C9A96E]/20'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${rental ? 'left-5' : 'left-0.5'}`} />
                </div>
                <span className="text-[#F5F0E8]/70 text-sm">Mode investissement locatif</span>
              </label>
              {rental && (
                <div className="mt-4">
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/80 mb-2 block">
                    Loyer mensuel estimé: {rentPrice.toLocaleString()}€
                  </label>
                  <input type="range" min={500} max={20000} step={250} value={rentPrice}
                    onChange={e => setRentPrice(+e.target.value)}
                    className="w-full accent-[#C9A96E]" />
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-8 sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp size={20} className="text-[#C9A96E]" />
              <h3 className="font-display text-2xl text-[#F5F0E8]">Analyse Financière</h3>
            </div>

            <div className="space-y-4 mb-6">
              {[
                ['Montant emprunté', `${loan.toLocaleString()}€`],
                ['Mensualité estimée', `${Math.round(monthlyPayment).toLocaleString()}€/mois`],
                ['Coût total du crédit', `${Math.round(totalCost - loan).toLocaleString()}€`],
                ['Frais de notaire (7.5%)', `${Math.round(notaryFees).toLocaleString()}€`],
                ['Frais d\'agence (2.5%)', `${Math.round(agencyFees).toLocaleString()}€`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-[#F5F0E8]/5">
                  <span className="text-[#F5F0E8]/50 text-sm">{label}</span>
                  <span className="text-[#F5F0E8] text-sm font-medium">{value}</span>
                </div>
              ))}

              {rental && (
                <>
                  <div className="flex justify-between items-center py-2 border-b border-[#C9A96E]/20">
                    <span className="text-[#C9A96E] text-sm">Loyer annuel brut</span>
                    <span className="text-[#C9A96E] text-sm font-medium">{annualRent.toLocaleString()}€</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#C9A96E] text-sm font-medium">Rendement brut</span>
                    <span className="text-[#C9A96E] font-display text-2xl">{grossYield}%</span>
                  </div>
                </>
              )}
            </div>

            <div className="bg-[#C9A96E]/10 border border-[#C9A96E]/20 p-5 mb-6">
              <div className="text-[#F5F0E8]/60 text-xs mb-1">Investissement Total</div>
              <motion.div key={totalInvestment} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-display text-3xl text-[#C9A96E]">
                {Math.round(totalInvestment).toLocaleString()}€
              </motion.div>
            </div>

            <a href="#contact" className="btn-primary w-full text-center block">
              Parler à un Conseiller
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
