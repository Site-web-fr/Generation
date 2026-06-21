import { useState } from 'react'
import { CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', yacht: '', port: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="py-32 bg-[#040E1A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Contact</span>
          <h2 className="font-display text-5xl text-[#F0F6FF]">
            Planifiez Votre <span className="gradient-gold italic">Intervention</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            {[[Phone, '+33 4 XX XX XX XX', 'Urgence 7j/7'], [Mail, 'contact@aqualux-marine.fr', 'Réponse sous 2h'], [MapPin, 'Port Vieux-Port, Marseille', 'Intervention Méditerranée']].map(([Icon, info, sub]) => (
              <div key={info} className="glass-card p-5 flex gap-4">
                <div className="w-10 h-10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#C9A96E]" />
                </div>
                <div>
                  <div className="text-[#F0F6FF] text-sm">{info}</div>
                  <div className="text-[#C9A96E]/60 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
            <div className="glass-card p-5 border-[#C9A96E]/20">
              <div className="text-[#C9A96E] text-xs tracking-widest uppercase mb-2">Zones d'intervention</div>
              {['Côte d\'Azur', 'Corse', 'Monaco', 'Costa del Sol', 'Sardaigne'].map(z => (
                <div key={z} className="text-[#F0F6FF]/50 text-xs py-1 border-b border-[#F0F6FF]/5">{z}</div>
              ))}
            </div>
          </div>
          {sent ? (
            <div className="lg:col-span-2 glass-card p-12 flex flex-col items-center justify-center text-center">
              <CheckCircle size={48} className="text-[#C9A96E] mb-6" />
              <h3 className="font-display text-3xl text-[#F0F6FF] mb-3">Demande Reçue</h3>
              <p className="text-[#F0F6FF]/50 text-sm">Notre responsable technique vous contactera dans les 2 heures.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="lg:col-span-2 glass-card p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                {[['Nom Complet', 'name', 'Jean Dupont'], ['Email', 'email', 'jean@email.com']].map(([l, f, ph]) => (
                  <div key={f}>
                    <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E]/70 mb-2 block">{l} *</label>
                    <input required value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} placeholder={ph}
                      className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F0F6FF] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F0F6FF]/20" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[['Téléphone', 'phone', '+33 6 XX XX XX'], ['Type de Yacht', 'yacht', 'Ex: Ferretti 24m']].map(([l, f, ph]) => (
                  <div key={f}>
                    <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E]/70 mb-2 block">{l}</label>
                    <input value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} placeholder={ph}
                      className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F0F6FF] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F0F6FF]/20" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E]/70 mb-2 block">Port d'Attache *</label>
                <input required value={form.port} onChange={e => setForm({...form, port: e.target.value})} placeholder="Ex: Port de Monaco"
                  className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F0F6FF] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F0F6FF]/20" />
              </div>
              <div>
                <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E]/70 mb-2 block">Message</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Décrivez vos besoins..."
                  className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F0F6FF] text-sm focus:outline-none focus:border-[#C9A96E]/50 placeholder-[#F0F6FF]/20 resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">Demander un Devis Gratuit</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
