import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Shield, Fuel, CheckCircle } from 'lucide-react'

const vehicles = [
  { name: 'Lamborghini Huracán', daily: 1800 },
  { name: 'Ferrari 488 GTB', daily: 1600 },
  { name: 'Rolls-Royce Ghost', daily: 1400 },
  { name: 'Bentley Continental GT', daily: 1200 },
  { name: 'Porsche 911 Turbo S', daily: 900 },
  { name: 'Aston Martin Vantage', daily: 950 },
  { name: 'Mercedes AMG GT', daily: 750 },
  { name: 'BMW M8 Competition', daily: 650 },
]

const options = [
  { name: 'Chauffeur professionnel', price: 400, icon: '👨‍✈️' },
  { name: 'Livraison à l\'hôtel', price: 150, icon: '🏨' },
  { name: 'Assurance tous risques premium', price: 200, icon: '🛡️' },
  { name: 'GPS + Carnet de bord', price: 50, icon: '🗺️' },
  { name: 'Carburant inclus', price: 180, icon: '⛽' },
  { name: 'Assistance 24/7', price: 80, icon: '📞' },
]

const cities = ['Paris', 'Monaco', 'Nice', 'Cannes', 'Dubai', 'Ibiza', 'Saint-Tropez']

export default function Configurator() {
  const [vehicle, setVehicle] = useState(0)
  const [days, setDays] = useState(3)
  const [city, setCity] = useState('Paris')
  const [extras, setExtras] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const toggleExtra = (n) => setExtras(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  const extrasTotal = extras.reduce((s, n) => s + (options.find(o => o.name === n)?.price || 0), 0)
  const discount = days >= 7 ? 0.85 : days >= 4 ? 0.92 : 1
  const subtotal = vehicles[vehicle].daily * days
  const discountAmt = Math.round(subtotal * (1 - discount))
  const total = Math.round(subtotal * discount + extrasTotal)

  return (
    <section id="configurateur" className="py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#DC143C] mb-3 block">Configurateur</span>
          <h2 className="font-display text-5xl lg:text-6xl text-white mb-4">
            Créez Votre <span className="gradient-red italic">Location</span> Idéale
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto">
            <CheckCircle size={56} className="text-[#DC143C] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-white mb-4">Réservation Confirmée!</h3>
            <p className="text-white/60 text-sm">Notre équipe vous contacte dans 30 minutes pour finaliser les détails, {name}.</p>
            <div className="mt-6 p-4 border border-[#DC143C]/30 bg-[#DC143C]/5">
              <div className="font-display text-4xl text-[#DC143C]">{total}€</div>
              <div className="text-white/40 text-xs">{vehicles[vehicle].name} · {days} jours · {city}</div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widest uppercase text-[#DC143C] mb-4 block">Véhicule</label>
                <div className="grid grid-cols-1 gap-2">
                  {vehicles.map((v, i) => (
                    <button key={v.name} onClick={() => setVehicle(i)}
                      className={`p-3 text-left flex justify-between border transition-all text-sm ${vehicle === i ? 'border-[#DC143C]/50 bg-[#DC143C]/5 text-white' : 'border-white/5 text-white/40 hover:border-[#DC143C]/20'}`}>
                      <span>{v.name}</span>
                      <span className={vehicle === i ? 'text-[#DC143C]' : ''}>{v.daily}€/j</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widests uppercase text-[#DC143C] mb-4 block flex items-center gap-2">
                  <Calendar size={10} /> Durée de Location: <span className="text-white">{days} jour{days > 1 ? 's' : ''}</span>
                  {days >= 7 && <span className="ml-2 text-[0.55rem] bg-[#DC143C] text-white px-2 py-0.5">-15%</span>}
                  {days >= 4 && days < 7 && <span className="ml-2 text-[0.55rem] bg-[#DC143C]/60 text-white px-2 py-0.5">-8%</span>}
                </label>
                <input type="range" min={1} max={30} value={days} onChange={e => setDays(+e.target.value)}
                  className="w-full accent-[#DC143C] mb-3" />
                <div className="flex justify-between text-xs text-white/20">
                  <span>1 jour</span><span>1 semaine (-15%)</span><span>30 jours</span>
                </div>
              </div>

              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widests uppercase text-[#DC143C] mb-4 block flex items-center gap-2">
                  <MapPin size={10} /> Ville de Prise en Charge
                </label>
                <div className="flex flex-wrap gap-2">
                  {cities.map(c => (
                    <button key={c} onClick={() => setCity(c)}
                      className={`px-4 py-2 text-xs border transition-all ${city === c ? 'bg-[#DC143C] border-[#DC143C] text-white' : 'border-white/10 text-white/40 hover:border-[#DC143C]/40'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <label className="text-[0.65rem] tracking-widests uppercase text-[#DC143C] mb-4 block">Options & Services</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map(opt => (
                    <button key={opt.name} onClick={() => toggleExtra(opt.name)}
                      className={`p-3 text-left border transition-all ${extras.includes(opt.name) ? 'border-[#DC143C]/50 bg-[#DC143C]/5' : 'border-white/5 hover:border-[#DC143C]/20'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{opt.icon}</span>
                        <span className={`text-xs ${extras.includes(opt.name) ? 'text-[#DC143C]' : 'text-white/40'}`}>+{opt.price}€/j</span>
                      </div>
                      <div className={`text-xs ${extras.includes(opt.name) ? 'text-white' : 'text-white/50'}`}>{opt.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass-card p-8 sticky top-24">
                <h3 className="font-display text-2xl text-white mb-6">Récapitulatif</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">{vehicles[vehicle].name}</span>
                    <span className="text-white">{vehicles[vehicle].daily * days}€</span>
                  </div>
                  {discountAmt > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#DC143C]">Remise longue durée</span>
                      <span className="text-[#DC143C]">-{discountAmt}€</span>
                    </div>
                  )}
                  {extras.map(n => (
                    <div key={n} className="flex justify-between text-sm">
                      <span className="text-white/50 text-xs">{n}</span>
                      <span className="text-white text-xs">+{options.find(o => o.name === n)?.price}€</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#DC143C]/10 border border-[#DC143C]/20 p-5 mb-6 text-center">
                  <div className="text-white/50 text-xs mb-1">Total de la Location</div>
                  <motion.div key={total} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-display text-4xl text-[#DC143C]">{total.toLocaleString()}€</motion.div>
                  <div className="text-white/30 text-xs mt-1">{days} jour{days > 1 ? 's' : ''} · {city}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom complet"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#DC143C]/40 placeholder-white/20" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone / WhatsApp"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#DC143C]/40 placeholder-white/20" />
                </div>

                <button onClick={() => { if (name && phone) setSubmitted(true) }}
                  className="btn-primary w-full text-center">
                  Confirmer la Réservation
                </button>
                <p className="text-white/20 text-xs text-center mt-3">Sans engagement · Annulation 48h avant</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
