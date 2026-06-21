import { useState } from 'react'
import { motion } from 'framer-motion'
import { Anchor, CheckCircle, Users, Compass } from 'lucide-react'

const yachts = [
  { name: 'Azimut 55 (17m)', price: 4500, maxPax: 10 },
  { name: 'Sunseeker 74 (23m)', price: 8500, maxPax: 12 },
  { name: 'Lagoon 52 - Cata (16m)', price: 3800, maxPax: 10 },
  { name: 'Ferretti 881 (27m)', price: 14000, maxPax: 14 },
]

const destinations = ['Côte d\'Azur', 'Grèce & Cyclades', 'Caraïbes', 'Croatie']

const addonsList = [
  { name: 'Chef à bord', price: 350 },
  { name: 'Hôtesse', price: 280 },
  { name: 'Sports nautiques', price: 150 },
  { name: 'Plongée sous-marine', price: 200 },
  { name: 'Excursions guidées', price: 120 },
]

export default function CharterCalculator() {
  const [yacht, setYacht] = useState(0)
  const [days, setDays] = useState(7)
  const [pax, setPax] = useState(6)
  const [dest, setDest] = useState(0)
  const [extras, setExtras] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const toggleAddon = n => setExtras(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  const discount = days >= 14 ? 0.88 : days >= 7 ? 0.93 : 1
  const addonsTotal = extras.reduce((s, n) => s + (addonsList.find(a => a.name === n)?.price * days || 0), 0)
  const total = Math.round(yachts[yacht].price * days * discount + addonsTotal)

  return (
    <section id="charter" className="py-32 bg-[#030B18]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#19A7CE] mb-3 block">Réservation</span>
          <h2 className="font-display text-5xl text-[#EEF6FF]">Configurez Votre <span className="gradient-ocean italic">Croisière</span></h2>
          <div className="section-divider" />
        </div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto">
            <CheckCircle size={56} className="text-[#19A7CE] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[#EEF6FF] mb-3">Réservation Confirmée!</h3>
            <p className="text-[#EEF6FF]/60 text-sm">Notre équipe charter vous contacte dans les 2 heures pour finaliser votre croisière de rêve.</p>
            <div className="mt-6 p-5 border border-[#19A7CE]/20 bg-[#19A7CE]/5">
              <div className="font-display text-4xl text-[#C9A96E]">{total.toLocaleString()}€</div>
              <div className="text-[#EEF6FF]/40 text-xs">{yachts[yacht].name} · {days}j · {destinations[dest]}</div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-wider uppercase text-[#19A7CE] mb-4 block">Yacht</label>
                <div className="space-y-2">
                  {yachts.map((y, i) => (
                    <button key={y.name} onClick={() => setYacht(i)}
                      className={`w-full text-left p-3 border transition-all flex justify-between text-sm ${yacht === i ? 'border-[#19A7CE]/40 bg-[#19A7CE]/5 text-[#EEF6FF]' : 'border-[#19A7CE]/10 text-[#EEF6FF]/40'}`}>
                      <span>{y.name}</span>
                      <span className="text-[#C9A96E] text-xs">{y.price}€/nuit</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5">
                  <label className="text-[0.65rem] tracking-wider uppercase text-[#19A7CE] mb-2 block">
                    Durée: {days}j {days >= 14 && <span className="text-[#C9A96E] text-[0.55rem]">-12%</span>}{days >= 7 && days < 14 && <span className="text-[#C9A96E] text-[0.55rem]">-7%</span>}
                  </label>
                  <input type="range" min={3} max={30} value={days} onChange={e => setDays(+e.target.value)} className="w-full accent-[#19A7CE]" />
                </div>
                <div className="glass-card p-5">
                  <label className="text-[0.65rem] tracking-wider uppercase text-[#19A7CE] mb-2 block flex items-center gap-1">
                    <Users size={9} /> Passagers: {pax}
                  </label>
                  <input type="range" min={2} max={yachts[yacht].maxPax} value={Math.min(pax, yachts[yacht].maxPax)} onChange={e => setPax(+e.target.value)} className="w-full accent-[#19A7CE]" />
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-wider uppercase text-[#19A7CE] mb-3 block flex items-center gap-2">
                  <Compass size={10} /> Destination
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {destinations.map((d, i) => (
                    <button key={d} onClick={() => setDest(i)}
                      className={`py-2 px-3 text-xs border transition-all ${dest === i ? 'border-[#19A7CE]/40 bg-[#19A7CE]/5 text-[#EEF6FF]' : 'border-[#19A7CE]/10 text-[#EEF6FF]/40'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-wider uppercase text-[#19A7CE] mb-3 block">Services à Bord</label>
                <div className="space-y-2">
                  {addonsList.map(a => (
                    <label key={a.name} className="flex items-center gap-3 cursor-none">
                      <div onClick={() => toggleAddon(a.name)}
                        className={`w-5 h-5 border flex items-center justify-center ${extras.includes(a.name) ? 'bg-[#19A7CE] border-[#19A7CE]' : 'border-[#19A7CE]/20'}`}>
                        {extras.includes(a.name) && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="#030B18" strokeWidth="2" strokeLinecap="round"/></svg>}
                      </div>
                      <span className="text-[#EEF6FF]/60 text-sm flex-1">{a.name}</span>
                      <span className="text-[#19A7CE] text-xs">+{a.price}€/j</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Anchor size={18} className="text-[#C9A96E]" />
                  <h3 className="font-display text-2xl text-[#EEF6FF]">Votre Croisière</h3>
                </div>
                <div className="space-y-3 mb-6 pb-6 border-b border-[#19A7CE]/10">
                  <div className="flex justify-between text-sm"><span className="text-[#EEF6FF]/50">{yachts[yacht].name}</span><span className="text-[#EEF6FF]">{yachts[yacht].price * days}€</span></div>
                  {discount < 1 && <div className="flex justify-between text-sm"><span className="text-[#19A7CE]">Remise longue durée</span><span className="text-[#19A7CE]">-{Math.round(yachts[yacht].price * days * (1-discount))}€</span></div>}
                  {extras.map(n => <div key={n} className="flex justify-between text-xs"><span className="text-[#EEF6FF]/40">{n}</span><span className="text-[#19A7CE]">+{addonsList.find(a => a.name === n)?.price * days}€</span></div>)}
                </div>
                <div className="bg-[#19A7CE]/8 border border-[#19A7CE]/20 p-5 mb-6 text-center">
                  <div className="text-[#EEF6FF]/50 text-xs mb-1">Total Charter</div>
                  <motion.div key={total} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-display text-4xl text-[#C9A96E]">{total.toLocaleString()}€</motion.div>
                  <div className="text-[#EEF6FF]/30 text-xs mt-1">{days}j · {pax} pers · {destinations[dest]}</div>
                </div>
                <div className="space-y-4 mb-5">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom"
                    className="w-full bg-transparent border border-[#19A7CE]/20 px-4 py-3 text-[#EEF6FF] text-sm focus:outline-none placeholder-[#EEF6FF]/20" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone / WhatsApp"
                    className="w-full bg-transparent border border-[#19A7CE]/20 px-4 py-3 text-[#EEF6FF] text-sm focus:outline-none placeholder-[#EEF6FF]/20" />
                </div>
                <button onClick={() => { if (name && phone) setSubmitted(true) }} className="btn-primary w-full">Réserver Ma Croisière</button>
                <p className="text-[#EEF6FF]/20 text-xs text-center mt-3">Acompte 30% · Annulation 60j avant</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
