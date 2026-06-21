import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZONES = [
  { id: 'face', label: 'Visage', x: '50%', y: '18%', treatments: ['Soin signature', 'Lifting facial', 'Microneedling', 'Peeling lumière'], color: '#a8d8c8' },
  { id: 'neck', label: 'Cou & Décolleté', x: '50%', y: '30%', treatments: ['Lifting cou', 'Hydratation profonde', 'Raffermissement'], color: '#c8d8a8' },
  { id: 'back', label: 'Dos', x: '50%', y: '50%', treatments: ['Massage hot stone', 'Enveloppement argileux', 'Drainage lymphatique'], color: '#d8c8a8' },
  { id: 'arms', label: 'Bras & Mains', x: '28%', y: '48%', treatments: ['Gommage corps', 'Modelage bras', 'Soin mains'], color: '#c8a8d8' },
  { id: 'legs', label: 'Jambes', x: '50%', y: '78%', treatments: ['Pressothérapie', 'Drainage jambes', 'Enveloppement minceur', 'Réflexologie'], color: '#a8c8d8' },
];

const PACKAGES = [
  { id: 'escape', name: 'Escape Sensoriel', duration: '2h', price: 280, includes: ['Soin visage signature', 'Massage relaxant', 'Accès spa'], description: 'Une parenthèse de bien-être pour retrouver l\'équilibre.' },
  { id: 'restore', name: 'Restore & Glow', duration: '3h30', price: 480, includes: ['Soin corps complet', 'Massage hot stone', 'Enveloppement', 'Accès spa + hammam'], description: 'Régénération complète du corps et de l\'esprit.', popular: true },
  { id: 'royal', name: 'Royal Journey', duration: '5h', price: 780, includes: ['Programme complet corps & visage', 'Rituel hammam', 'Déjeuner bien-être', 'Accès illimité'], description: 'L\'expérience ultime. Une journée entière dédiée à votre renaissance.' },
];

const THERAPISTS = [
  { name: 'Claire Fontaine', specialty: 'Massages thérapeutiques', experience: '12 ans', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
  { name: 'Sophie Renard', specialty: 'Soins visage & anti-âge', experience: '9 ans', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Marie Delacroix', specialty: 'Ayurvéda & holistique', experience: '15 ans', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' },
];

export default function LuxurySpa() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState('restore');
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState('');

  const pkg = PACKAGES.find(p => p.id === selectedPackage)!;
  const total = pkg.price * guests;
  const zone = ZONES.find(z => z.id === activeZone);

  return (
    <div style={{ background: '#0c0f0e', color: '#ece8df', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 60px', background: 'rgba(12,15,14,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(168,216,200,0.1)' }}
      >
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.2em', color: '#a8d8c8' }}>ESSENCE</div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(236,232,223,0.3)', marginTop: '-2px' }}>Retreat & Spa Prestige</div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Soins', 'Packages', 'Équipe', 'Réserver'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(236,232,223,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a8d8c8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(236,232,223,0.5)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ borderColor: '#a8d8c8', color: '#a8d8c8', fontSize: '0.7rem', padding: '10px 24px' }}>Réserver</button>
      </motion.nav>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=90" alt="Spa" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.15)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(12,15,14,0.98) 40%, rgba(12,15,14,0.5) 100%)' }} />
        </div>

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '640px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
          >
            <div style={{ width: 40, height: 1, background: '#a8d8c8' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#a8d8c8' }}>Bien-être · Régénération · Harmonie</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '24px' }}
          >
            Le sanctuaire<br />de votre <em style={{ color: '#a8d8c8', fontStyle: 'italic' }}>renaissance</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: 'rgba(236,232,223,0.55)', lineHeight: 1.7, maxWidth: '430px', marginBottom: '48px' }}
          >
            Un espace hors du temps où chaque soin est un voyage sensoriel unique. Nos thérapeutes d'excellence vous guident vers un équilibre profond corps et âme.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ display: 'flex', gap: '16px' }}>
            <button style={{ background: '#a8d8c8', color: '#0c0f0e', border: 'none', padding: '14px 36px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Réserver un soin</button>
            <button className="btn-premium" style={{ borderColor: '#a8d8c8', color: '#a8d8c8' }}>Découvrir</button>
          </motion.div>
        </motion.div>
      </section>

      {/* BODY MAP */}
      <section style={{ padding: '100px 60px', background: 'rgba(168,216,200,0.03)', borderTop: '1px solid rgba(168,216,200,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div className="luxury-divider" style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#a8d8c8' }}>Carte du Corps</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '20px' }}>
              Cliquez sur une zone<br />pour explorer nos soins
            </h2>
            <p style={{ color: 'rgba(236,232,223,0.5)', lineHeight: 1.7, marginBottom: '32px' }}>
              Chaque zone de votre corps bénéficie de protocoles spécifiques, conçus avec les meilleurs actifs naturels.
            </p>
            <AnimatePresence mode="wait">
              {activeZone ? (
                <motion.div key={activeZone} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '28px', border: '1px solid rgba(168,216,200,0.2)', background: 'rgba(168,216,200,0.04)' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#a8d8c8', marginBottom: '16px' }}>{zone?.label}</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {zone?.treatments.map(t => (
                      <li key={t} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.88rem', color: 'rgba(236,232,223,0.7)' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#a8d8c8', flexShrink: 0 }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="hint" style={{ color: 'rgba(236,232,223,0.35)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  Sélectionnez une zone sur la silhouette →
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Silhouette with hotspots */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 250, height: 480 }}>
              {/* Body silhouette using CSS */}
              <svg width="250" height="480" viewBox="0 0 100 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <ellipse cx="50" cy="14" rx="10" ry="12" stroke="rgba(168,216,200,0.25)" strokeWidth="0.5" fill="rgba(168,216,200,0.04)" />
                {/* Neck */}
                <rect x="45" y="25" width="10" height="8" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Torso */}
                <path d="M30 33 Q20 45 22 75 L78 75 Q80 45 70 33 Z" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Left arm */}
                <path d="M30 35 Q15 55 18 90 L24 90 Q22 55 36 38 Z" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Right arm */}
                <path d="M70 35 Q85 55 82 90 L76 90 Q78 55 64 38 Z" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Hips */}
                <path d="M22 75 Q18 90 24 100 L76 100 Q82 90 78 75 Z" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Left leg */}
                <path d="M24 100 L30 160 L40 160 L42 100 Z" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Right leg */}
                <path d="M76 100 L70 160 L60 160 L58 100 Z" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                {/* Feet */}
                <ellipse cx="35" cy="165" rx="6" ry="4" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
                <ellipse cx="65" cy="165" rx="6" ry="4" stroke="rgba(168,216,200,0.2)" strokeWidth="0.5" fill="rgba(168,216,200,0.03)" />
              </svg>

              {/* Hotspots */}
              {ZONES.map(zone => (
                <motion.button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id === activeZone ? null : zone.id)}
                  whileHover={{ scale: 1.3 }}
                  style={{
                    position: 'absolute',
                    left: zone.x,
                    top: zone.y,
                    transform: 'translate(-50%, -50%)',
                    width: activeZone === zone.id ? 18 : 12,
                    height: activeZone === zone.id ? 18 : 12,
                    borderRadius: '50%',
                    background: activeZone === zone.id ? zone.color : 'rgba(168,216,200,0.4)',
                    border: `2px solid ${zone.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    animation: activeZone !== zone.id ? 'pulse-gold 2s infinite' : 'none',
                    boxShadow: activeZone === zone.id ? `0 0 15px ${zone.color}` : 'none',
                    zIndex: 10,
                    padding: 0,
                  }}
                  title={zone.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ padding: '80px 60px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '50px' }}>
            Packages <span style={{ color: '#a8d8c8', fontStyle: 'italic' }}>Bien-être</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
            {PACKAGES.map((p, i) => {
              const isSelected = selectedPackage === p.id;
              return (
                <motion.div key={p.id} onClick={() => setSelectedPackage(p.id)}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  style={{ padding: '36px 28px', border: `1px solid ${isSelected ? '#a8d8c8' : 'rgba(236,232,223,0.07)'}`, background: isSelected ? 'rgba(168,216,200,0.06)' : 'rgba(255,255,255,0.01)', cursor: 'pointer', transition: 'all 0.35s', position: 'relative' }}
                >
                  {p.popular && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: '#a8d8c8', color: '#0c0f0e', fontSize: '0.6rem', fontWeight: 700, padding: '3px 16px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Recommandé</div>}
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a8d8c8', marginBottom: '8px' }}>{p.duration}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '12px' }}>{p.name}</div>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(236,232,223,0.5)', lineHeight: 1.6, marginBottom: '20px' }}>{p.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                    {p.includes.map(item => (
                      <li key={item} style={{ fontSize: '0.78rem', color: 'rgba(236,232,223,0.65)', padding: '5px 0', display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{ color: '#a8d8c8', fontSize: '0.6rem' }}>✦</span>{item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#a8d8c8' }}>{p.price} €</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(236,232,223,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>par personne</div>
                </motion.div>
              );
            })}
          </div>

          {/* Booking widget */}
          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px', border: '1px solid rgba(168,216,200,0.2)', background: 'rgba(168,216,200,0.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(236,232,223,0.4)', marginBottom: '8px' }}>Personnes: {guests}</label>
                <input type="range" min={1} max={4} value={guests} onChange={e => setGuests(+e.target.value)} style={{ width: '100%', accentColor: '#a8d8c8' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(236,232,223,0.4)', marginBottom: '8px' }}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(236,232,223,0.1)', padding: '10px 12px', color: '#ece8df', fontSize: '0.85rem', outline: 'none', fontFamily: 'DM Sans' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: '#a8d8c8', lineHeight: 1 }}>{total} €</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(236,232,223,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{guests > 1 ? `${guests} pers.` : '1 personne'}</div>
              </div>
            </div>
            <button style={{ width: '100%', background: '#a8d8c8', color: '#0c0f0e', border: 'none', padding: '14px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Réserver mon passage
            </button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(168,216,200,0.1)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(236,232,223,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#a8d8c8', letterSpacing: '0.15em' }}>ESSENCE RETREAT</span>
        <span>© 2026 · Paris · Marbella · Marrakech</span>
      </footer>
    </div>
  );
}
