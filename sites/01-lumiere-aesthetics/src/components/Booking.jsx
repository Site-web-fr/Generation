import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Phone, Mail, ChevronDown, CheckCircle } from 'lucide-react'

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']

export default function Booking() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', treatment: '', date: '', time: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="booking" className="py-32 bg-[#141414]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-4 block">Consultation</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#FAFAF7] mb-6">
            Réservez Votre <span className="gradient-gold italic">Rendez-vous</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-[#FAFAF7]/50 text-sm max-w-md mx-auto">
            Consultation initiale offerte — 45 minutes avec l'un de nos experts
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto"
          >
            <CheckCircle size={48} className="text-[#C9A96E] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[#FAFAF7] mb-4">Demande Confirmée</h3>
            <p className="text-[#FAFAF7]/60 text-sm leading-relaxed">
              Notre équipe vous contactera dans les 2 heures pour confirmer votre rendez-vous. Un email de confirmation vous sera envoyé.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-display text-2xl text-[#FAFAF7]">Nos Horaires</h3>
              <div className="space-y-4">
                {[['Lundi - Vendredi', '09:00 - 18:00'], ['Samedi', '09:00 - 14:00'], ['Dimanche', 'Fermé']].map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center border-b border-[#FAFAF7]/5 pb-3">
                    <span className="text-[#FAFAF7]/60 text-sm">{day}</span>
                    <span className="text-[#C9A96E] text-sm">{hours}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[#C9A96E]" />
                  <span className="text-[#FAFAF7]/60 text-sm">+33 1 42 XX XX XX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[#C9A96E]" />
                  <span className="text-[#FAFAF7]/60 text-sm">contact@lumiere-aesthetics.fr</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-2 glass-card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">Prénom & Nom *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#FAFAF7] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#FAFAF7]/20"
                    placeholder="Marie Dupont"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">Email *</label>
                  <input
                    required type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#FAFAF7] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#FAFAF7]/20"
                    placeholder="marie@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">Téléphone *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#FAFAF7] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#FAFAF7]/20"
                    placeholder="+33 6 XX XX XX XX"
                  />
                </div>
                <div className="relative">
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">Traitement Souhaité</label>
                  <select
                    value={form.treatment}
                    onChange={e => setForm({...form, treatment: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-[#C9A96E]/20 px-4 py-3 text-[#FAFAF7] text-sm appearance-none focus:outline-none focus:border-[#C9A96E]/50"
                  >
                    <option value="">Sélectionner...</option>
                    <option>Lifting du Visage</option>
                    <option>Rhinoplastie</option>
                    <option>Blépharoplastie</option>
                    <option>Augmentation Mammaire</option>
                    <option>Liposuccion</option>
                    <option>Médecine Esthétique</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-[60%] -translate-y-1/2 text-[#C9A96E]/50 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">
                    <Calendar size={10} className="inline mr-1" />
                    Date Souhaitée
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#FAFAF7] text-sm focus:outline-none focus:border-[#C9A96E]/50"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">
                    <Clock size={10} className="inline mr-1" />
                    Créneau Horaire
                  </label>
                  <div className="grid grid-cols-5 gap-1">
                    {timeSlots.slice(0, 5).map(t => (
                      <button
                        key={t} type="button"
                        onClick={() => setForm({...form, time: t})}
                        className={`py-2 text-xs border transition-all ${form.time === t ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]' : 'border-[#C9A96E]/20 text-[#FAFAF7]/40 hover:border-[#C9A96E]/40'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-[#C9A96E]/70 mb-2 block">Message (optionnel)</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  rows={3}
                  className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#FAFAF7] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#FAFAF7]/20 resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Confirmer la Consultation Gratuite
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
