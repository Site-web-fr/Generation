import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, CheckCircle, ChevronLeft, ChevronRight, Phone, Mail, MenuIcon, X, Users, Calendar, ChefHat, Award } from 'lucide-react'

function FoodParticles() {
  const ref = useRef()
  const count = 1500
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 0.5 + Math.random() * 3
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i*3+1] = r * Math.cos(phi) + (Math.random() - 0.5) * 2
    positions[i*3+2] = r * Math.sin(phi) * Math.sin(theta)
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.04
    ref.current.rotation.x = Math.sin(t * 0.03) * 0.2
  })
  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent color="#C9A96E" size={0.018} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  )
}

function SpiceRing() {
  const ref = useRef()
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.08 })
  return (
    <mesh ref={ref} rotation={[Math.PI/3, 0, 0]}>
      <torusGeometry args={[2.5, 0.01, 2, 100]} />
      <meshBasicMaterial color="#722F37" transparent opacity={0.4} />
    </mesh>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#0F0804]/95 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <ChefHat size={20} className="text-[#C9A96E]" />
          <div>
            <div className="font-display text-xl text-[#C9A96E] tracking-[0.2em]">MAISON</div>
            <div className="text-[#F8F0E8]/30 text-[0.5rem] tracking-[0.4em] uppercase">Gourmet</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Menu', 'Chef', 'Événements', 'Réserver'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-[#F8F0E8]/50 hover:text-[#C9A96E] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#réserver" className="hidden lg:block btn-outline text-xs py-3 px-6">Réserver un Chef</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 4, 3]} intensity={1} color="#C9A96E" />
          <pointLight position={[-3, -2, 4]} intensity={0.5} color="#722F37" />
          <FoodParticles />
          <SpiceRing />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0804]/95 via-[#0F0804]/65 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0804] via-transparent to-transparent z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <Award size={14} className="text-[#C9A96E]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E]">Chef Étoilé · Cuisine à Domicile</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] text-[#F8F0E8] mb-6">
            La Grande<br />
            <span className="gradient-gold italic">Gastronomie</span><br />
            Chez Vous
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-[#F8F0E8]/60 text-lg leading-relaxed mb-10 max-w-md">
            Des chefs étoilés qui viennent cuisiner dans votre cuisine. Dîners privés, événements d'entreprise, mariages — une expérience gastronomique inoubliable.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#réserver" className="btn-primary">Réserver un Chef</a>
            <a href="#menu" className="btn-outline">Voir les Menus</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-10">
            {[['20+', 'Chefs Étoilés'], ['500+', 'Événements'], ['★★★', 'Qualité Michelin']].map(([v, l]) => (
              <div key={v} className="border-l border-[#C9A96E]/20 pl-4">
                <div className="font-display text-3xl text-[#C9A96E]">{v}</div>
                <div className="text-[#F8F0E8]/40 text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const menus = [
  { name: 'Menu Dégustation Classique', courses: 5, price: 180, perPerson: true, description: 'Foie gras, langoustine, filet de bœuf Wagyu, plateau de fromages, dessert signature.', style: 'Cuisine Française Classique', chefMin: 'Thomas Michelin', minPax: 4 },
  { name: 'Mer & Terroir', courses: 6, price: 220, perPerson: true, description: 'Homard thermidor, sole meunière, Saint-Jacques, millefeuille de légumes oubliés, vacherin maison.', style: 'Cuisine de la Mer', chefMin: 'Sophie Gauthier', minPax: 4 },
  { name: 'Parcours Gastronomique', courses: 8, price: 340, perPerson: true, description: 'Menu exclusif 8 temps avec accords mets et vins. L\'expérience gastronomique absolue.', style: 'Haute Cuisine', chefMin: 'Alexandre Dupont', minPax: 6, tag: 'Signature' },
  { name: 'Menu Végétalien de Prestige', courses: 6, price: 195, perPerson: true, description: 'Une odyssée végétale de haut vol. Légumes de saison, champignons nobles, desserts végans raffinés.', style: 'Cuisine Végane Premium', chefMin: 'Isabelle Laurent', minPax: 4 },
]

function MenuSection() {
  const [active, setActive] = useState(0)
  return (
    <section id="menu" className="py-32 bg-[#0A0603]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Nos Menus</span>
          <h2 className="font-display text-5xl text-[#F8F0E8]">Menus <span className="gradient-gold italic">d'Exception</span></h2>
          <div className="section-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menus.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 relative cursor-none">
              {m.tag && <span className="absolute top-4 right-4 text-[0.6rem] tracking-widets uppercase bg-[#C9A96E] text-[#0F0804] px-3 py-1 font-bold">{m.tag}</span>}
              <div className="text-[#C9A96E] text-xs tracking-widets uppercase mb-2">{m.style}</div>
              <h3 className="font-display text-2xl text-[#F8F0E8] mb-2">{m.name}</h3>
              <p className="text-[#F8F0E8]/50 text-sm leading-relaxed mb-4">{m.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#C9A96E]/10">
                <div>
                  <div className="text-[#F8F0E8]/40 text-xs">{m.courses} services · Min. {m.minPax} pers.</div>
                  <div className="text-[#F8F0E8]/40 text-xs">Chef: {m.chefMin}</div>
                </div>
                <div className="font-display text-3xl text-[#C9A96E]">{m.price}€<span className="text-sm text-[#F8F0E8]/30">/pers.</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const eventTypes = [
  { name: 'Dîner Privé', icon: '🕯️', minPax: 4, maxPax: 20, pricePerPerson: 220 },
  { name: 'Cocktail Dînatoire', icon: '🥂', minPax: 15, maxPax: 100, pricePerPerson: 120 },
  { name: 'Mariage Gastronomique', icon: '💍', minPax: 30, maxPax: 300, pricePerPerson: 180 },
  { name: 'Séminaire d\'Entreprise', icon: '💼', minPax: 10, maxPax: 150, pricePerPerson: 145 },
  { name: 'Anniversaire Prestige', icon: '🎂', minPax: 8, maxPax: 50, pricePerPerson: 195 },
  { name: 'Brunch Raffiné', icon: '☕', minPax: 6, maxPax: 40, pricePerPerson: 95 },
]

function CateringCalculator() {
  const [eventType, setEventType] = useState(0)
  const [pax, setPax] = useState(20)
  const [menu, setMenu] = useState(0)
  const [addons, setAddons] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')

  const addonsList = [
    { name: 'Sommelier & Vins', price: 45 },
    { name: 'Service de table prestige', price: 35 },
    { name: 'Décoration florale', price: 25 },
    { name: 'Musique live', price: 800 },
    { name: 'Location de vaisselle premium', price: 20 },
  ]

  const toggleAddon = n => setAddons(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  const eventPrice = eventTypes[eventType].pricePerPerson + menus[menu].price
  const addonsTotal = addons.reduce((s, n) => s + (addonsList.find(a => a.name === n)?.price * (n === 'Musique live' ? 1 : pax) || 0), 0)
  const total = Math.round(eventPrice * pax + addonsTotal)

  return (
    <section id="événements" className="py-32 bg-[#0F0804]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#C9A96E] mb-3 block">Devis en Ligne</span>
          <h2 className="font-display text-5xl text-[#F8F0E8]">Calculez Votre <span className="gradient-gold italic">Événement</span></h2>
          <div className="section-divider" />
        </div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto">
            <CheckCircle size={56} className="text-[#C9A96E] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[#F8F0E8] mb-3">Demande Reçue!</h3>
            <p className="text-[#F8F0E8]/60 text-sm">Notre équipe vous recontacte dans les 2 heures pour finaliser votre projet gastronomique.</p>
            <div className="mt-6 p-5 border border-[#C9A96E]/20 bg-[#C9A96E]/5">
              <div className="font-display text-4xl text-[#C9A96E]">{total.toLocaleString()}€</div>
              <div className="text-[#F8F0E8]/40 text-xs">{eventTypes[eventType].name} · {pax} personnes · {date}</div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E] mb-4 block">Type d'Événement</label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((e, i) => (
                    <button key={e.name} onClick={() => setEventType(i)}
                      className={`p-3 text-left border transition-all ${eventType === i ? 'border-[#C9A96E]/40 bg-[#C9A96E]/5' : 'border-[#C9A96E]/10 hover:border-[#C9A96E]/25'}`}>
                      <span className="text-lg">{e.icon}</span>
                      <div className={`text-xs mt-1 ${eventType === i ? 'text-[#F8F0E8]' : 'text-[#F8F0E8]/50'}`}>{e.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E] mb-3 block flex items-center gap-2">
                  <Users size={10} /> Nombre de Convives: <span className="text-[#F8F0E8]">{pax}</span>
                </label>
                <input type="range" min={eventTypes[eventType].minPax} max={eventTypes[eventType].maxPax} value={pax} onChange={e => setPax(+e.target.value)}
                  className="w-full accent-[#C9A96E]" />
                <div className="flex justify-between text-xs text-[#F8F0E8]/20 mt-1">
                  <span>{eventTypes[eventType].minPax}</span><span>{eventTypes[eventType].maxPax}</span>
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E] mb-3 block">Menu</label>
                <div className="space-y-2">
                  {menus.map((m, i) => (
                    <button key={m.name} onClick={() => setMenu(i)}
                      className={`w-full text-left p-3 border transition-all flex justify-between text-sm ${menu === i ? 'border-[#C9A96E]/40 bg-[#C9A96E]/5 text-[#F8F0E8]' : 'border-[#C9A96E]/10 text-[#F8F0E8]/40'}`}>
                      <span>{m.name}</span><span className="text-[#C9A96E] text-xs">{m.price}€/pers</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#C9A96E] mb-3 block">Options</label>
                <div className="space-y-2">
                  {addonsList.map(a => (
                    <label key={a.name} className="flex items-center gap-3 cursor-none">
                      <div onClick={() => toggleAddon(a.name)}
                        className={`w-5 h-5 border flex items-center justify-center ${addons.includes(a.name) ? 'bg-[#C9A96E] border-[#C9A96E]' : 'border-[#C9A96E]/20'}`}>
                        {addons.includes(a.name) && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="#0F0804" strokeWidth="2" strokeLinecap="round"/></svg>}
                      </div>
                      <span className="text-[#F8F0E8]/60 text-sm flex-1">{a.name}</span>
                      <span className="text-[#C9A96E] text-xs">+{a.price}€{a.name !== 'Musique live' ? '/pers' : ''}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ChefHat size={18} className="text-[#C9A96E]" />
                  <h3 className="font-display text-2xl text-[#F8F0E8]">Votre Devis</h3>
                </div>
                <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A96E]/10">
                  <div className="flex justify-between text-sm"><span className="text-[#F8F0E8]/50">{eventTypes[eventType].name}</span><span className="text-[#F8F0E8]">{eventTypes[eventType].pricePerPerson}€/pers</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#F8F0E8]/50">{menus[menu].name}</span><span className="text-[#F8F0E8]">{menus[menu].price}€/pers</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#F8F0E8]/50">× {pax} convives</span><span className="text-[#F8F0E8]">{Math.round(eventPrice * pax).toLocaleString()}€</span></div>
                  {addons.map(n => <div key={n} className="flex justify-between text-xs"><span className="text-[#F8F0E8]/40">{n}</span><span className="text-[#C9A96E]">+{addonsList.find(a => a.name === n)?.price}€{n !== 'Musique live' ? '/pers' : ''}</span></div>)}
                </div>
                <div className="bg-[#C9A96E]/8 border border-[#C9A96E]/20 p-5 mb-6 text-center">
                  <div className="text-[#F8F0E8]/50 text-xs mb-1">Budget Total Estimé</div>
                  <motion.div key={total} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-display text-4xl text-[#C9A96E]">{total.toLocaleString()}€</motion.div>
                  <div className="text-[#F8F0E8]/30 text-xs mt-1">{pax} pers · Chef inclus</div>
                </div>
                <div className="space-y-4 mb-5">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom"
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F8F0E8] text-sm focus:outline-none placeholder-[#F8F0E8]/20" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone"
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F8F0E8] text-sm focus:outline-none placeholder-[#F8F0E8]/20" />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    className="w-full bg-transparent border border-[#C9A96E]/20 px-4 py-3 text-[#F8F0E8] text-sm focus:outline-none" style={{ colorScheme: 'dark' }} />
                </div>
                <button onClick={() => { if (name && phone) setSubmitted(true) }} className="btn-primary w-full">
                  Demander un Devis Officiel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Testimonials() {
  const [c, setC] = useState(0)
  const reviews = [
    { name: 'Famille de Beaumont', event: 'Dîner de Mariage · 120 personnes', text: 'Le Chef Alexandre a transcendé notre mariage. Chaque plat était une œuvre d\'art. Nos invités nous en parlent encore un an après. Un talent rare et une équipe exceptionnelle.' },
    { name: 'LVMH Corporate', event: 'Séminaire · 80 personnes', text: 'Pour nos événements corporate les plus importants, nous faisons confiance à Maison Gourmet. La qualité est constante, la discrétion totale, le professionnalisme irréprochable.' },
  ]
  return (
    <section className="py-24 bg-[#0A0603]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl text-[#F8F0E8] mb-12">Ils Se Sont <span className="gradient-gold italic">Régalés</span></h2>
        <AnimatePresence mode="wait">
          <motion.div key={c} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-10">
            <div className="flex justify-center gap-1 mb-5">{[...Array(5)].map((_,i) => <Star key={i} size={14} fill="#C9A96E" color="#C9A96E" />)}</div>
            <p className="font-display text-xl text-[#F8F0E8]/80 italic mb-6">"{reviews[c].text}"</p>
            <div className="text-[#C9A96E]">{reviews[c].name}</div>
            <div className="text-[#F8F0E8]/40 text-xs">{reviews[c].event}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => setC(p => (p-1+reviews.length)%reviews.length)} className="w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E]"><ChevronLeft size={16} className="text-[#C9A96E]" /></button>
          <button onClick={() => setC(p => (p+1)%reviews.length)} className="w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center hover:border-[#C9A96E]"><ChevronRight size={16} className="text-[#C9A96E]" /></button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#080402] border-t border-[#C9A96E]/10 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3"><ChefHat size={16} className="text-[#C9A96E]" /><span className="font-display text-xl text-[#C9A96E] tracking-widest">MAISON GOURMET</span></div>
          <p className="text-[#F8F0E8]/30 text-xs max-w-xs leading-relaxed">Chefs étoilés à domicile. La gastronomie d'exception dans votre espace de vie.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#C9A96E] mb-4">Services</div>
            <ul className="space-y-2">{['Dîners Privés', 'Mariages', 'Corporate', 'Brunchs', 'Cocktails'].map(s => <li key={s}><a href="#" className="text-[#F8F0E8]/30 text-xs hover:text-[#C9A96E] transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#C9A96E] mb-4">Contact</div>
            <div className="text-[#F8F0E8]/30 text-xs space-y-2">
              <div className="flex items-center gap-2"><Phone size={10} className="text-[#C9A96E]" />+33 1 XX XX XX XX</div>
              <div className="flex items-center gap-2"><Mail size={10} className="text-[#C9A96E]" />chefs@maison-gourmet.fr</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#C9A96E]/10">
        <p className="text-[#F8F0E8]/20 text-xs">© 2024 Maison Gourmet. Tous droits réservés.</p>
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
    <div className="min-h-screen bg-[#0F0804]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <MenuSection />
      <CateringCalculator />
      <Testimonials />
      <Footer />
    </div>
  )
}
