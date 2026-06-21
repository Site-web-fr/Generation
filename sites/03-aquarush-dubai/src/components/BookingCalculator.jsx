import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react'

const jetSkis = [
  { name: 'Sea-Doo RXT-X 325', price: 250 },
  { name: 'Yamaha FX SVHO', price: 300 },
  { name: 'Kawasaki Ultra 310R', price: 350 },
  { name: 'Sea-Doo Spark Trixx', price: 180 },
]

const durations = [
  { label: '30 minutes', multiplier: 0.55 },
  { label: '1 heure', multiplier: 1 },
  { label: '2 heures', multiplier: 1.8 },
  { label: '3 heures', multiplier: 2.5 },
  { label: 'Journée complète', multiplier: 6 },
]

const addons = [
  { name: 'Instructeur privé', price: 100 },
  { name: 'GoPro Camera', price: 50 },
  { name: 'Photos & Vidéo Pro', price: 150 },
  { name: 'Assurance Premium', price: 30 },
]

export default function BookingCalculator() {
  const [jet, setJet] = useState(0)
  const [dur, setDur] = useState(1)
  const [qty, setQty] = useState(1)
  const [extras, setExtras] = useState([])
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleExtra = (e) => setExtras(p => p.includes(e.name) ? p.filter(x => x !== e.name) : [...p, e.name])
  const extrasTotal = extras.reduce((sum, n) => sum + (addons.find(a => a.name === n)?.price || 0), 0)
  const total = Math.round(jetSkis[jet].price * durations[dur].multiplier * qty + extrasTotal)

  return (
    <section id="réserver" className="py-32 bg-[#001122]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#00B4D8] mb-3 block">Réservation</span>
          <h2 className="font-display text-5xl lg:text-6xl text-white mb-4">
            Configurez Votre <span className="gradient-cyan italic">Session</span>
          </h2>
          <div className="section-divider" />
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto">
            <CheckCircle size={56} className="text-[#00B4D8] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-white mb-4">Réservation Confirmée!</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Merci {name}! Vous recevrez une confirmation par SMS sur {phone}. Rendez-vous à <strong className="text-[#00B4D8]">JBR Beach, Stand AquaRush</strong>.
            </p>
            <div className="mt-6 p-4 bg-[#00B4D8]/10 border border-[#00B4D8]/20">
              <div className="text-[#00B4D8] font-bold text-2xl">{total}€</div>
              <div className="text-white/40 text-xs">à régler sur place</div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-4 block">Votre Jet Ski</label>
                <div className="space-y-2">
                  {jetSkis.map((j, i) => (
                    <button key={j.name} onClick={() => setJet(i)}
                      className={`w-full text-left p-3 flex justify-between items-center transition-all border ${jet === i ? 'bg-[#00B4D8]/10 border-[#00B4D8]/40 text-white' : 'border-white/10 text-white/50 hover:border-[#00B4D8]/20'}`}>
                      <span className="text-sm">{j.name}</span>
                      <span className="text-[#00B4D8] text-sm">{j.price}€/h</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-4 block">Durée de la Session</label>
                <div className="grid grid-cols-2 gap-2">
                  {durations.map((d, i) => (
                    <button key={d.label} onClick={() => setDur(i)}
                      className={`py-3 px-4 text-sm transition-all border ${dur === i ? 'bg-[#FF6B35] border-[#FF6B35] text-white font-medium' : 'border-white/10 text-white/50 hover:border-[#FF6B35]/30'}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8]">Nombre de Jet Skis: {qty}</label>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 border border-white/20 text-white hover:border-[#00B4D8] transition-all text-xl">−</button>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00B4D8] transition-all" style={{ width: `${qty * 20}%` }} />
                  </div>
                  <button onClick={() => setQty(Math.min(5, qty+1))} className="w-10 h-10 border border-white/20 text-white hover:border-[#00B4D8] transition-all text-xl">+</button>
                </div>
              </div>

              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-4 block">Options</label>
                <div className="space-y-3">
                  {addons.map(a => (
                    <label key={a.name} className="flex items-center gap-3 cursor-none">
                      <div onClick={() => toggleExtra(a)}
                        className={`w-5 h-5 border flex items-center justify-center transition-all ${extras.includes(a.name) ? 'bg-[#00B4D8] border-[#00B4D8]' : 'border-white/20'}`}>
                        {extras.includes(a.name) && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="#001122" strokeWidth="2" strokeLinecap="round" /></svg>}
                      </div>
                      <span className="text-white/70 text-sm flex-1">{a.name}</span>
                      <span className="text-[#00B4D8] text-sm">+{a.price}€</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="glass-card p-8">
                <h3 className="font-display text-2xl text-white mb-6">Récapitulatif</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  {[
                    [jetSkis[jet].name, `${Math.round(jetSkis[jet].price * durations[dur].multiplier * qty)}€`],
                    ...extras.map(n => [n, `+${addons.find(a => a.name === n)?.price}€`])
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-white/50">{label}</span>
                      <span className="text-white">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/20 p-5 mb-6 text-center">
                  <div className="text-white/60 text-xs mb-1">Total Estimé</div>
                  <motion.div key={total} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className="font-display text-4xl text-[#00B4D8]">{total}€</motion.div>
                  <div className="text-white/40 text-xs mt-1">
                    {qty} jet ski{qty>1?'s':''} · {durations[dur].label}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-2 block">Votre Nom *</label>
                    <input required value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-transparent border border-[#00B4D8]/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00B4D8]/50 placeholder-white/20"
                      placeholder="Jean Dupont" />
                  </div>
                  <div>
                    <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-2 block">Téléphone / WhatsApp *</label>
                    <input required value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full bg-transparent border border-[#00B4D8]/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00B4D8]/50 placeholder-white/20"
                      placeholder="+971 50 XXX XXXX" />
                  </div>
                  <div>
                    <label className="text-[0.65rem] tracking-widest uppercase text-[#00B4D8] mb-2 block">
                      <Calendar size={10} className="inline mr-1" /> Date Souhaitée
                    </label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                      className="w-full bg-transparent border border-[#00B4D8]/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00B4D8]/50"
                      style={{ colorScheme: 'dark' }} />
                  </div>
                </div>

                <button onClick={() => { if (name && phone) setSubmitted(true) }}
                  className="btn-primary w-full mt-6 block text-center">
                  Confirmer la Réservation
                </button>

                <p className="text-white/30 text-xs text-center mt-3">
                  Paiement sur place · Annulation gratuite 24h avant
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
