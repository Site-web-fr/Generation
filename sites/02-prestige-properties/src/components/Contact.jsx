import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="py-32 bg-[#0A0F1E]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Contact</span>
          <h2 className="font-display text-5xl lg:text-6xl text-[#F5F0E8]">
            Parlons de Votre <span className="gradient-gold italic">Projet</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: Phone, title: 'Téléphone', info: '+33 1 44 XX XX XX', sub: 'Lun-Ven 9h-19h' },
              { icon: Mail, title: 'Email', info: 'contact@prestige-properties.fr', sub: 'Réponse sous 2h' },
              { icon: MapPin, title: 'Bureau Paris', info: '8 Place Vendôme, 75001', sub: 'Sur rendez-vous' },
            ].map(item => (
              <div key={item.title} className="glass-card p-6 flex gap-4 items-start">
                <div className="w-10 h-10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={16} className="text-[#C9A96E]" />
                </div>
                <div>
                  <div className="text-[#F5F0E8]/60 text-xs uppercase tracking-wider mb-1">{item.title}</div>
                  <div className="text-[#F5F0E8] text-sm">{item.info}</div>
                  <div className="text-[#C9A96E]/60 text-xs mt-1">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 glass-card p-12 flex flex-col items-center justify-center text-center">
              <CheckCircle size={48} className="text-[#C9A96E] mb-6" />
              <h3 className="font-display text-3xl text-[#F5F0E8] mb-3">Message Envoyé</h3>
              <p className="text-[#F5F0E8]/50 text-sm">Notre équipe vous contactera dans les 2 heures ouvrées.</p>
            </motion.div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="lg:col-span-2 glass-card p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                {[['Nom Complet', 'name', 'Jean Dupont'], ['Email', 'email', 'jean@email.com']].map(([label, field, ph]) => (
                  <div key={field}>
                    <label className="text-[0.65rem] tracking-widest uppercase text-[#C9A96E]/70 mb-2 block">{label} *</label>
                    <input required value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})}
                      placeholder={ph}
                      className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F5F0E8]/20" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[['Téléphone', 'phone', '+33 6 XX XX XX'], ['Budget', 'budget', 'Ex: 5 000 000€']].map(([label, field, ph]) => (
                  <div key={field}>
                    <label className="text-[0.65rem] tracking-widest uppercase text-[#C9A96E]/70 mb-2 block">{label}</label>
                    <input value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})}
                      placeholder={ph}
                      className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F5F0E8]/20" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[0.65rem] tracking-widest uppercase text-[#C9A96E]/70 mb-2 block">Votre Projet *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Décrivez votre projet immobilier..."
                  className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F5F0E8]/20 resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">Envoyer Ma Demande</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
