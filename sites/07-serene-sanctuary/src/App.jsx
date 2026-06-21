import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Heart, Star, Clock, Phone, Mail, CheckCircle, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

function ZenParticles() {
  const ref = useRef()
  const count = 2000
  const positions = new Float32Array(count * 3)
  const original = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const r = 1 + Math.random() * 2.5
    const y = (Math.random() - 0.5) * 4
    positions[i*3] = r * Math.cos(theta); positions[i*3+1] = y; positions[i*3+2] = r * Math.sin(theta)
    original[i*3] = positions[i*3]; original[i*3+1] = positions[i*3+1]; original[i*3+2] = positions[i*3+2]
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.06
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i*3+1] = original[i*3+1] + Math.sin(t * 0.5 + i * 0.03) * 0.1
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent color="#7FB27A" size={0.025} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function LotusRings() {
  const rings = [2.8, 3.5, 4.2]
  return (
    <>
      {rings.map((r, i) => {
        const ref = useRef()
        useFrame(({ clock }) => { if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * (0.05 + i * 0.02) })
        return (
          <mesh key={r} ref={ref} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[r, 0.005, 2, 80]} />
            <meshBasicMaterial color="#C9A96E" transparent opacity={0.15 - i * 0.04} />
          </mesh>
        )
      })}
    </>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#0A1A12]/95 backdrop-blur-xl border-b border-[#7FB27A]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border border-[#7FB27A]/40 rounded-full" style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }} />
            <div className="absolute inset-2 bg-[#7FB27A]/20 rounded-full" />
          </div>
          <div>
            <div className="text-[#7FB27A] font-display text-lg tracking-[0.15em]">SERENE</div>
            <div className="text-[#F0F7F2]/30 text-[0.5rem] tracking-[0.4em] uppercase">Sanctuary</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Soins', 'Formules', 'Équipe', 'Réserver'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-[#F0F7F2]/50 hover:text-[#7FB27A] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#réserver" className="hidden lg:block btn-outline text-xs py-3 px-6">Prendre RDV</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 5, 3]} intensity={0.8} color="#7FB27A" />
          <pointLight position={[-5, -3, 5]} intensity={0.4} color="#C9A96E" />
          <ZenParticles />
          <LotusRings />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A12]/95 via-[#0A1A12]/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] via-transparent to-transparent z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <Leaf size={14} className="text-[#7FB27A]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#7FB27A]">Wellness · Bien-être · Équilibre</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] text-[#F0F7F2] mb-6">
            L'Art de<br />
            <span className="gradient-sage italic">Prendre</span><br />
            Soin de Soi
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-[#F0F7F2]/60 text-lg leading-relaxed mb-10 max-w-md">
            Un havre de paix où chaque soin est une invitation au voyage intérieur. Massages, soins du visage, rituels bien-être d'exception.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#réserver" className="btn-primary">Réserver un Soin</a>
            <a href="#soins" className="btn-outline">Nos Soins</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-10">
            {[['50+', 'Soins Exclusifs'], ['12', 'Experts'], ['98%', 'Satisfaction']].map(([v, l]) => (
              <div key={v} className="border-l border-[#7FB27A]/20 pl-4">
                <div className="font-display text-3xl text-[#7FB27A]">{v}</div>
                <div className="text-[#F0F7F2]/40 text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const treatments = [
  { cat: 'Massage', name: 'Massage Signature Serene', duration: '90 min', price: 220, desc: 'Notre massage phare combinant techniques suédoises, hot stones et aromathérapie. Un voyage sensoriel complet.', icon: '🤲' },
  { cat: 'Visage', name: 'Soin Visage Lumière', duration: '75 min', price: 185, desc: 'Soin anti-âge personnalisé avec acides hyaluroniques, vitamines C et masque au caviar marin.', icon: '✨' },
  { cat: 'Corps', name: 'Rituel Corps Doré', duration: '120 min', price: 290, desc: 'Exfoliation au sucre de canne, enveloppement à l\'argile dorée, massage huiles précieuses. Perfection totale.', icon: '🌿' },
  { cat: 'Bien-être', name: 'Hammam Traditionnel', duration: '60 min', price: 150, desc: 'Rituel oriental authentique. Vapeur, savon beldi, kessa, masque d\'argile. Une renaissance.', icon: '🕯️' },
  { cat: 'Massage', name: 'Massage Californien', duration: '60 min', price: 165, desc: 'Mouvements amples et enveloppants pour une relaxation profonde du corps et de l\'esprit.', icon: '🌊' },
  { cat: 'Couple', name: 'Rituel Duo Évasion', duration: '180 min', price: 480, desc: 'Suite privée, champagne, massages en duo, bain aux pétales. L\'expérience romantique ultime.', icon: '💑' },
]

function Treatments() {
  const [cat, setCat] = useState('Tous')
  const cats = ['Tous', 'Massage', 'Visage', 'Corps', 'Bien-être', 'Couple']
  const filtered = cat === 'Tous' ? treatments : treatments.filter(t => t.cat === cat)
  return (
    <section id="soins" className="py-32 bg-[#071410]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#7FB27A] mb-3 block">Nos Soins</span>
          <h2 className="font-display text-5xl text-[#F0F7F2]">Rituels <span className="gradient-sage italic">d'Exception</span></h2>
          <div className="section-divider" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all ${cat === c ? 'bg-[#7FB27A] border-[#7FB27A] text-[#0A1A12]' : 'border-[#7FB27A]/20 text-[#F0F7F2]/40'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 cursor-none">
              <div className="text-3xl mb-4">{t.icon}</div>
              <div className="text-[#7FB27A] text-xs tracking-widest uppercase mb-1">{t.cat}</div>
              <h3 className="font-display text-2xl text-[#F0F7F2] mb-3">{t.name}</h3>
              <p className="text-[#F0F7F2]/50 text-sm leading-relaxed mb-5">{t.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#7FB27A]/10">
                <div>
                  <span className="text-[#7FB27A] text-xs"><Clock size={10} className="inline mr-1" />{t.duration}</span>
                </div>
                <div className="font-display text-2xl text-[#C9A96E]">{t.price}€</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const packages = [
  { name: 'Évasion', duration: '3h', price: 380, includes: ['Hammam', 'Massage 60min', 'Soin visage express', 'Tisane & fruits frais'] },
  { name: 'Sérénité', duration: '5h', price: 580, includes: ['Hammam', 'Massage Signature 90min', 'Soin visage Lumière', 'Rituel corps', 'Déjeuner spa'], popular: true },
  { name: 'Absolu', duration: 'Journée', price: 890, includes: ['Accès complet spa', 'Massage 90min', 'Soin visage premium', 'Rituel corps', 'Déjeuner & dîner', 'Suite de relaxation privée'] },
]

function Packages() {
  return (
    <section id="formules" className="py-32 bg-[#0A1A12]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#7FB27A] mb-3 block">Formules</span>
          <h2 className="font-display text-5xl text-[#F0F7F2]">Packages <span className="gradient-gold italic">Bien-être</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`glass-card p-8 relative ${p.popular ? 'border-[#7FB27A]/40' : ''}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-widets uppercase bg-[#7FB27A] text-[#0A1A12] px-4 py-1 font-bold">Plus Populaire</span>}
              <div className="text-[#F0F7F2]/40 text-xs uppercase tracking-wider mb-2">{p.duration}</div>
              <h3 className="font-display text-3xl text-[#F0F7F2] mb-2">{p.name}</h3>
              <div className="font-display text-4xl text-[#C9A96E] mb-6">{p.price}€</div>
              <ul className="space-y-3 mb-8">
                {p.includes.map(item => (
                  <li key={item} className="flex items-center gap-2 text-[#F0F7F2]/60 text-sm">
                    <div className="w-1 h-1 rounded-full bg-[#7FB27A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#réserver" className="block text-center py-3 border text-xs tracking-widets uppercase transition-all"
                style={p.popular ? { background: '#7FB27A', borderColor: '#7FB27A', color: '#0A1A12' } : { borderColor: 'rgba(127,178,122,0.3)', color: '#7FB27A' }}>
                Choisir cette Formule
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Booking() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', treatment: '', date: '', time: '', message: '' })
  const [sent, setSent] = useState(false)
  const times = ['09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

  return (
    <section id="réserver" className="py-32 bg-[#071410]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#7FB27A] mb-3 block">Réservation</span>
          <h2 className="font-display text-5xl text-[#F0F7F2]">Planifiez Votre <span className="gradient-sage italic">Moment de Sérénité</span></h2>
        </div>
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-lg mx-auto">
            <CheckCircle size={56} className="text-[#7FB27A] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[#F0F7F2] mb-3">Réservation Confirmée</h3>
            <p className="text-[#F0F7F2]/60 text-sm">Un email de confirmation vous a été envoyé. Votre espace de sérénité vous attend.</p>
          </motion.div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="glass-card p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {[['Prénom & Nom', 'name', 'Claire Martin'], ['Email', 'email', 'claire@email.com'], ['Téléphone', 'phone', '+33 6 XX XX XX']].map(([l, f, ph]) => (
                <div key={f} className={f === 'phone' ? 'sm:col-span-1' : ''}>
                  <label className="text-[0.65rem] tracking-widets uppercase text-[#7FB27A]/70 mb-2 block">{l} *</label>
                  <input required={f !== 'phone'} value={form[f]} onChange={e => setForm({...form, [f]: e.target.value})} placeholder={ph}
                    className="w-full bg-transparent border border-[#7FB27A]/20 px-4 py-3 text-[#F0F7F2] text-sm focus:outline-none focus:border-[#7FB27A]/40 placeholder-[#F0F7F2]/20" />
                </div>
              ))}
              <div>
                <label className="text-[0.65rem] tracking-widets uppercase text-[#7FB27A]/70 mb-2 block">Soin Souhaité *</label>
                <select required value={form.treatment} onChange={e => setForm({...form, treatment: e.target.value})}
                  className="w-full bg-[#0A1A12] border border-[#7FB27A]/20 px-4 py-3 text-[#F0F7F2] text-sm focus:outline-none focus:border-[#7FB27A]/40 appearance-none">
                  <option value="">Sélectionner...</option>
                  {treatments.map(t => <option key={t.name}>{t.name}</option>)}
                  {packages.map(p => <option key={p.name}>Formule {p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="text-[0.65rem] tracking-widets uppercase text-[#7FB27A]/70 mb-2 block">Date Souhaitée *</label>
                <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                  className="w-full bg-transparent border border-[#7FB27A]/20 px-4 py-3 text-[#F0F7F2] text-sm focus:outline-none" style={{ colorScheme: 'dark' }} />
              </div>
              <div>
                <label className="text-[0.65rem] tracking-widets uppercase text-[#7FB27A]/70 mb-2 block">Créneau Horaire</label>
                <div className="grid grid-cols-5 gap-1">
                  {times.slice(0,5).map(t => (
                    <button key={t} type="button" onClick={() => setForm({...form, time: t})}
                      className={`py-2 text-[0.6rem] border transition-all ${form.time === t ? 'border-[#7FB27A] bg-[#7FB27A]/10 text-[#7FB27A]' : 'border-[#7FB27A]/15 text-[#F0F7F2]/40'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Informations particulières (allergies, préférences...)"
              className="w-full bg-transparent border border-[#7FB27A]/20 px-4 py-3 text-[#F0F7F2] text-sm focus:outline-none mb-6 resize-none placeholder-[#F0F7F2]/20" />
            <button type="submit" className="btn-primary w-full">Confirmer Ma Réservation</button>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#050D08] border-t border-[#7FB27A]/10 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-display text-xl text-[#7FB27A] tracking-widests mb-3">SERENE SANCTUARY</div>
          <p className="text-[#F0F7F2]/30 text-xs max-w-xs leading-relaxed">Un espace de bien-être d'exception pour nourrir corps, esprit et âme.</p>
          <div className="flex items-center gap-2 mt-4 text-[#F0F7F2]/30 text-xs">
            <Phone size={12} className="text-[#7FB27A]" />+33 1 XX XX XX XX
          </div>
          <div className="flex items-center gap-2 mt-2 text-[#F0F7F2]/30 text-xs">
            <Mail size={12} className="text-[#7FB27A]" />contact@serene-sanctuary.fr
          </div>
        </div>
        <div className="flex gap-12">
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#7FB27A] mb-4">Soins</div>
            <ul className="space-y-2">{['Massages', 'Soins Visage', 'Rituels Corps', 'Hammam', 'Wellness'].map(s => <li key={s}><a href="#" className="text-[#F0F7F2]/30 text-xs hover:text-[#7FB27A] transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#7FB27A] mb-4">Horaires</div>
            <div className="text-[#F0F7F2]/30 text-xs space-y-1">
              <div>Lun-Ven: 9h-20h</div><div>Sam-Dim: 9h-18h</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#7FB27A]/10">
        <p className="text-[#F0F7F2]/20 text-xs">© 2024 Serene Sanctuary. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  useEffect(() => {
    const cursor = cursorRef.current, follower = followerRef.current
    let mx = 0, my = 0, fx = 0, fy = 0
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (cursor) { cursor.style.left = mx+'px'; cursor.style.top = my+'px' } }
    const animate = () => { fx += (mx-fx)*0.1; fy += (my-fy)*0.1; if (follower) { follower.style.left = fx+'px'; follower.style.top = fy+'px' } requestAnimationFrame(animate) }
    window.addEventListener('mousemove', onMove); animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <div className="min-h-screen bg-[#0A1A12]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <Treatments />
      <Packages />
      <Booking />
      <Footer />
    </div>
  )
}
