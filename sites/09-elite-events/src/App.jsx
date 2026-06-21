import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, CheckCircle, ChevronLeft, ChevronRight, Phone, Mail, Heart, Sparkles, Music, Users, Menu, X } from 'lucide-react'

function GlamourParticles() {
  const ref = useRef()
  const count = 3000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 0.3 + Math.random() * 4
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i*3+1] = r * Math.cos(phi) * 1.5
    positions[i*3+2] = r * Math.sin(phi) * Math.sin(theta)
    const c = Math.random()
    if (c < 0.5) { colors[i*3] = 0.72; colors[i*3+1] = 0.43; colors[i*3+2] = 0.47 } // rose
    else { colors[i*3] = 0.79; colors[i*3+1] = 0.66; colors[i*3+2] = 0.43 } // champagne
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.05
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) pos[i*3+1] += Math.sin(t * 0.3 + i * 0.05) * 0.001
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial transparent vertexColors size={0.02} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#08060A]/95 backdrop-blur-xl border-b border-[#B76E79]/10' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#B76E79]/40 rotate-45 flex items-center justify-center">
            <Sparkles size={12} className="text-[#B76E79] rotate-[-45deg]" />
          </div>
          <div>
            <div className="font-display text-xl text-[#B76E79] tracking-[0.2em]">ÉLITE</div>
            <div className="text-[#F5EEF8]/30 text-[0.5rem] tracking-[0.4em] uppercase">Events</div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-10">
          {['Événements', 'Portfolio', 'Estimateur', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[0.72rem] tracking-[0.2em] uppercase text-[#F5EEF8]/50 hover:text-[#B76E79] transition-colors">{l}</a>
          ))}
        </div>
        <a href="#estimateur" className="hidden lg:block btn-outline text-xs py-3 px-6">Demander un Devis</a>
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
          <pointLight position={[3, 5, 3]} intensity={1} color="#B76E79" />
          <pointLight position={[-4, -3, 4]} intensity={0.5} color="#C9A96E" />
          <GlamourParticles />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#08060A]/95 via-[#08060A]/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08060A] via-transparent to-transparent z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8">
            <Heart size={12} fill="#B76E79" className="text-[#B76E79]" />
            <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#B76E79]">Organisation d'Événements Premium</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-6xl lg:text-8xl leading-[0.9] text-[#F5EEF8] mb-6">
            Des Moments<br />
            <span className="gradient-rose italic">Inoubliables</span><br />
            Créés Pour Vous
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-[#F5EEF8]/60 text-lg leading-relaxed mb-10 max-w-md">
            Mariages de rêve, galas d'entreprise, anniversaires prestige — nous transformons vos envies en réalité avec une touche d'exception absolue.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#estimateur" className="btn-primary">Planifier Mon Événement</a>
            <a href="#portfolio" className="btn-outline">Voir Nos Créations</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex gap-10">
            {[['300+', 'Événements Réalisés'], ['200', 'Prestataires Premium'], ['99%', 'Clients Heureux']].map(([v, l]) => (
              <div key={v} className="border-l border-[#B76E79]/20 pl-4">
                <div className="font-display text-3xl text-[#B76E79]">{v}</div>
                <div className="text-[#F5EEF8]/40 text-xs uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const eventTypes = [
  { name: 'Mariage de Rêve', icon: '💍', desc: 'Du lieu d\'exception à la table de réception, chaque détail est une déclaration d\'amour.', highlights: ['Domaines & Châteaux', 'Fleuriste créatif', 'Traiteur étoilé', 'Orchestre live', 'Honeymoon concierge'], basePricePerPerson: 380 },
  { name: 'Gala d\'Entreprise', icon: '🎭', desc: 'Soirées corporate qui marquent les esprits et renforcent la cohésion de vos équipes.', highlights: ['Scène & éclairage pro', 'Animation sur mesure', 'Cocktail dînatoire', 'Awards ceremony', 'Photobooth luxe'], basePricePerPerson: 280 },
  { name: 'Anniversaire Prestige', icon: '🎂', desc: 'Votre anniversaire mérite une célébration à la hauteur de vos ambitions.', highlights: ['Thème personnalisé', 'DJ & musiciens', 'Photographie pro', 'Gâteau sculpture', 'Entertainment VIP'], basePricePerPerson: 320 },
  { name: 'Lancement Produit', icon: '🚀', desc: 'Créez un buzz mémorable autour de votre marque avec un événement press percutant.', highlights: ['Brand experience', 'Media relations', 'Influenceurs VIP', 'Scénographie 3D', 'Live streaming'], basePricePerPerson: 350 },
]

function EventTypes() {
  const [active, setActive] = useState(0)
  return (
    <section id="événements" className="py-32 bg-[#060409]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#B76E79] mb-3 block">Nos Spécialités</span>
          <h2 className="font-display text-5xl text-[#F5EEF8]">Événements <span className="gradient-rose italic">d'Exception</span></h2>
          <div className="section-divider" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {eventTypes.map((e, i) => (
            <button key={e.name} onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-xs tracking-widets uppercase border transition-all ${active === i ? 'bg-[#B76E79] border-[#B76E79] text-white' : 'border-[#B76E79]/20 text-[#F5EEF8]/50'}`}>
              {e.icon} {e.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="text-5xl mb-5">{eventTypes[active].icon}</div>
                <h3 className="font-display text-3xl text-[#F5EEF8] mb-3">{eventTypes[active].name}</h3>
                <p className="text-[#F5EEF8]/60 text-sm leading-relaxed mb-6">{eventTypes[active].desc}</p>
                <div className="text-[#B76E79] font-display text-2xl">
                  À partir de {eventTypes[active].basePricePerPerson}€<span className="text-sm text-[#F5EEF8]/30">/personne</span>
                </div>
              </div>
              <div>
                <div className="text-[0.65rem] tracking-widets uppercase text-[#B76E79] mb-4">Services Inclus</div>
                <div className="space-y-3">
                  {eventTypes[active].highlights.map(h => (
                    <div key={h} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B76E79]" />
                      <span className="text-[#F5EEF8]/70 text-sm">{h}</span>
                    </div>
                  ))}
                </div>
                <a href="#estimateur" className="btn-primary mt-8 inline-block">Planifier Cet Événement</a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Portfolio() {
  const projects = [
    { title: 'Mariage Château de la Loire', guests: 280, budget: '180 000€', tags: ['Mariage', 'Château', 'Orchestre'], color: '#B76E79' },
    { title: 'Gala LVMH · Palais de Tokyo', guests: 450, budget: '350 000€', tags: ['Corporate', 'Gala', 'Paris'], color: '#C9A96E' },
    { title: 'Anniversaire Prestige · Monaco', guests: 120, budget: '85 000€', tags: ['Anniversaire', 'Monaco', 'VIP'], color: '#9B59B6' },
    { title: 'Lancement Bentley · Paris', guests: 200, budget: '120 000€', tags: ['Lancement', 'Luxe', 'Auto'], color: '#B76E79' },
    { title: 'Mariage Villa Cap Ferrat', guests: 80, budget: '95 000€', tags: ['Mariage', 'Mer', 'Intime'], color: '#C9A96E' },
    { title: 'Fashion Week After-Party', guests: 350, budget: '200 000€', tags: ['Mode', 'Nightlife', 'VIP'], color: '#E91E63' },
  ]
  return (
    <section id="portfolio" className="py-32 bg-[#08060A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#B76E79] mb-3 block">Portfolio</span>
          <h2 className="font-display text-5xl text-[#F5EEF8]">Nos <span className="gradient-champagne italic">Créations</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="glass-card overflow-hidden cursor-none group">
              <div className="h-48 relative" style={{ background: `linear-gradient(135deg, ${p.color}20, ${p.color}05)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border" style={{ borderColor: `${p.color}30` }} />
                  <div className="absolute w-10 h-10 border" style={{ borderColor: `${p.color}20`, transform: 'rotate(45deg)' }} />
                </div>
                <div className="absolute bottom-3 right-3 text-xs tracking-widets uppercase px-3 py-1" style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}30` }}>
                  {p.guests} invités
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[#F5EEF8] font-medium mb-2">{p.title}</h3>
                <div className="text-[#B76E79] text-sm mb-3">{p.budget}</div>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map(t => <span key={t} className="text-[0.6rem] tracking-widest uppercase px-2 py-0.5 border border-[#B76E79]/20 text-[#F5EEF8]/40">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BudgetCalculator() {
  const [evType, setEvType] = useState(0)
  const [guests, setGuests] = useState(100)
  const [venue, setVenue] = useState('mid')
  const [duration, setDuration] = useState(1)
  const [extras, setExtras] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const venueMultipliers = { basic: 1, mid: 1.5, premium: 2.2, palace: 3.5 }
  const venueNames = { basic: 'Salle de réception', mid: 'Château / Villa', premium: 'Palace 5★', palace: 'Lieu iconique (Tour Eiffel, Versailles...)' }
  const addonsList = [
    { name: 'Orchestre live', price: 8000 },
    { name: 'DJ international', price: 5000 },
    { name: 'Décoration florale premium', price: guests * 45 },
    { name: 'Photographie & vidéo cinéma', price: 6000 },
    { name: 'Feux d\'artifice', price: 12000 },
    { name: 'Limousines & transferts', price: guests * 35 },
  ]

  const toggleExtra = n => setExtras(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  const basePerPerson = eventTypes[evType].basePricePerPerson * venueMultipliers[venue] * duration
  const addonsTotal = extras.reduce((s, n) => s + (addonsList.find(a => a.name === n)?.price || 0), 0)
  const total = Math.round(basePerPerson * guests + addonsTotal)

  return (
    <section id="estimateur" className="py-32 bg-[#060409]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#B76E79] mb-3 block">Estimateur</span>
          <h2 className="font-display text-5xl text-[#F5EEF8]">Budgétisez Votre <span className="gradient-rose italic">Rêve</span></h2>
          <div className="section-divider" />
        </div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-xl mx-auto">
            <CheckCircle size={56} className="text-[#B76E79] mx-auto mb-6" />
            <h3 className="font-display text-3xl text-[#F5EEF8] mb-3">Demande Envoyée!</h3>
            <p className="text-[#F5EEF8]/60 text-sm">Notre directrice artistique vous contacte dans les 2h pour discuter de votre projet.</p>
            <div className="mt-6 p-5 border border-[#B76E79]/20 bg-[#B76E79]/5">
              <div className="font-display text-4xl text-[#B76E79]">{total.toLocaleString()}€</div>
              <div className="text-[#F5EEF8]/40 text-xs">{eventTypes[evType].name} · {guests} invités</div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#B76E79] mb-4 block">Type d'Événement</label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((e, i) => (
                    <button key={e.name} onClick={() => setEvType(i)}
                      className={`p-3 text-left border transition-all ${evType === i ? 'border-[#B76E79]/40 bg-[#B76E79]/5' : 'border-[#B76E79]/10'}`}>
                      <span className="text-lg">{e.icon}</span>
                      <div className={`text-xs mt-1 ${evType === i ? 'text-[#F5EEF8]' : 'text-[#F5EEF8]/50'}`}>{e.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#B76E79] mb-3 block flex items-center gap-2">
                  <Users size={10} /> Nombre d'Invités: <span className="text-[#F5EEF8]">{guests}</span>
                </label>
                <input type="range" min={20} max={500} step={10} value={guests} onChange={e => setGuests(+e.target.value)}
                  className="w-full accent-[#B76E79]" />
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#B76E79] mb-3 block">Type de Lieu</label>
                <div className="space-y-2">
                  {Object.entries(venueNames).map(([key, name]) => (
                    <button key={key} onClick={() => setVenue(key)}
                      className={`w-full text-left p-3 border transition-all text-sm ${venue === key ? 'border-[#B76E79]/40 bg-[#B76E79]/5 text-[#F5EEF8]' : 'border-[#B76E79]/10 text-[#F5EEF8]/40'}`}>
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#B76E79] mb-3 block">
                  Durée: {duration} jour{duration > 1 ? 's' : ''}
                </label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      className={`flex-1 py-2 text-xs border transition-all ${duration === d ? 'bg-[#B76E79] border-[#B76E79] text-white' : 'border-[#B76E79]/20 text-[#F5EEF8]/40'}`}>
                      {d}j
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <label className="text-[0.65rem] tracking-widets uppercase text-[#B76E79] mb-3 block">Options Premium</label>
                <div className="space-y-2">
                  {addonsList.map(a => (
                    <label key={a.name} className="flex items-center gap-3 cursor-none">
                      <div onClick={() => toggleExtra(a.name)}
                        className={`w-5 h-5 border flex items-center justify-center ${extras.includes(a.name) ? 'bg-[#B76E79] border-[#B76E79]' : 'border-[#B76E79]/30'}`}>
                        {extras.includes(a.name) && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
                      </div>
                      <span className="text-[#F5EEF8]/60 text-sm flex-1">{a.name}</span>
                      <span className="text-[#B76E79] text-xs">{typeof a.price === 'number' ? `${a.price.toLocaleString()}€` : a.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles size={18} className="text-[#B76E79]" />
                  <h3 className="font-display text-2xl text-[#F5EEF8]">Estimation</h3>
                </div>
                <div className="space-y-3 mb-6 pb-6 border-b border-[#B76E79]/10">
                  <div className="flex justify-between text-sm"><span className="text-[#F5EEF8]/50">{eventTypes[evType].name}</span><span className="text-[#F5EEF8]">{eventTypes[evType].basePricePerPerson}€/pers</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#F5EEF8]/50">Lieu: {venueNames[venue].split('/')[0]}</span><span className="text-[#F5EEF8]">×{venueMultipliers[venue]}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#F5EEF8]/50">× {guests} invités × {duration}j</span><span className="text-[#F5EEF8]">{Math.round(basePerPerson * guests).toLocaleString()}€</span></div>
                  {extras.map(n => <div key={n} className="flex justify-between text-xs"><span className="text-[#F5EEF8]/40">{n}</span><span className="text-[#B76E79]">{addonsList.find(a => a.name === n)?.price.toLocaleString()}€</span></div>)}
                </div>
                <div className="bg-[#B76E79]/8 border border-[#B76E79]/20 p-5 mb-6 text-center">
                  <div className="text-[#F5EEF8]/50 text-xs mb-1">Budget Estimé</div>
                  <motion.div key={total} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-display text-4xl text-[#B76E79]">{total.toLocaleString()}€</motion.div>
                </div>
                <div className="space-y-4 mb-5">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom" className="w-full bg-transparent border border-[#B76E79]/20 px-4 py-3 text-[#F5EEF8] text-sm focus:outline-none placeholder-[#F5EEF8]/20" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone" className="w-full bg-transparent border border-[#B76E79]/20 px-4 py-3 text-[#F5EEF8] text-sm focus:outline-none placeholder-[#F5EEF8]/20" />
                </div>
                <button onClick={() => { if (name && phone) setSubmitted(true) }} className="btn-primary w-full">Planifier Mon Événement</button>
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
    { name: 'Claire & Thomas', event: 'Mariage · Château de Chantilly · 220 invités', text: 'Notre mariage était un conte de fées. Chaque détail était parfait, du premier rendez-vous jusqu\'au lendemain. Élite Events a dépassé tous nos rêves.' },
    { name: 'Hermès Paris', event: 'Gala Annuel · Musée d\'Orsay · 600 invités', text: 'Pour nos événements les plus emblématiques, Élite Events est notre partenaire depuis 8 ans. Une créativité sans limites, une exécution sans failles.' },
  ]
  return (
    <section className="py-24 bg-[#08060A]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl text-[#F5EEF8] mb-12">Ils Nous Font <span className="gradient-rose italic">Confiance</span></h2>
        <AnimatePresence mode="wait">
          <motion.div key={c} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-10">
            <div className="flex justify-center gap-1 mb-5">{[...Array(5)].map((_,i) => <Star key={i} size={14} fill="#B76E79" color="#B76E79" />)}</div>
            <p className="font-display text-xl text-[#F5EEF8]/80 italic mb-6">"{reviews[c].text}"</p>
            <div className="text-[#B76E79]">{reviews[c].name}</div>
            <div className="text-[#F5EEF8]/40 text-xs">{reviews[c].event}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => setC(p => (p-1+reviews.length)%reviews.length)} className="w-10 h-10 border border-[#B76E79]/30 flex items-center justify-center hover:border-[#B76E79]"><ChevronLeft size={16} className="text-[#B76E79]" /></button>
          <button onClick={() => setC(p => (p+1)%reviews.length)} className="w-10 h-10 border border-[#B76E79]/30 flex items-center justify-center hover:border-[#B76E79]"><ChevronRight size={16} className="text-[#B76E79]" /></button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#040306] border-t border-[#B76E79]/10 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 border border-[#B76E79]/40 rotate-45 flex items-center justify-center"><Sparkles size={10} className="text-[#B76E79] rotate-[-45deg]" /></div>
            <span className="font-display text-xl text-[#B76E79] tracking-widest">ÉLITE EVENTS</span>
          </div>
          <p className="text-[#F5EEF8]/30 text-xs max-w-xs">Organisation d'événements premium. Des moments inoubliables, conçus avec passion.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#B76E79] mb-4">Événements</div>
            <ul className="space-y-2">{['Mariages', 'Galas Corporate', 'Anniversaires', 'Lancements Produit', 'Fashion Events'].map(s => <li key={s}><a href="#" className="text-[#F5EEF8]/30 text-xs hover:text-[#B76E79] transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <div className="text-[0.6rem] tracking-widets uppercase text-[#B76E79] mb-4">Contact</div>
            <div className="text-[#F5EEF8]/30 text-xs space-y-2">
              <div className="flex items-center gap-2"><Phone size={10} className="text-[#B76E79]" />+33 1 XX XX XX XX</div>
              <div className="flex items-center gap-2"><Mail size={10} className="text-[#B76E79]" />events@elite-events.fr</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#B76E79]/10">
        <p className="text-[#F5EEF8]/20 text-xs">© 2024 Élite Events. Tous droits réservés.</p>
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
    <div className="min-h-screen bg-[#08060A]">
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
      <Navbar />
      <Hero />
      <EventTypes />
      <Portfolio />
      <BudgetCalculator />
      <Testimonials />
      <Footer />
    </div>
  )
}
