import { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Crown / Key Scene ─────────────────────────────────────────────────────

function CrownGems() {
  const group = useRef();
  const count = 800;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = 1.5 + Math.sin(i * 7) * 0.5;
      const y = Math.cos(i * 13) * 1.2;
      arr[i * 3] = r * Math.cos(theta);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = r * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.15;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Main torus – crown base */}
      <mesh>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial color="#2d6a4f" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Crown spires */}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const angle = (deg * Math.PI) / 180;
        const x = 1.5 * Math.cos(angle);
        const z = 1.5 * Math.sin(angle);
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.05, 0.08, 1.0, 8]} />
              <meshStandardMaterial color="#2d6a4f" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
              <octahedronGeometry args={[0.12]} />
              <meshStandardMaterial color="#c9a028" metalness={1} roughness={0} emissive="#c9a028" emissiveIntensity={0.3} />
            </mesh>
          </group>
        );
      })}
      {/* Gold ring */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[1.5, 0.04, 16, 100]} />
        <meshStandardMaterial color="#c9a028" metalness={1} roughness={0} />
      </mesh>
      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#2d6a4f" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

// ─── Services Data ────────────────────────────────────────────────────────────

const tiers = [
  {
    name: 'Prestige',
    price: 2500,
    period: 'month',
    color: '#c0c0c0',
    perks: ['24/7 dedicated advisor', '50 requests/month', 'Restaurant reservations', 'Event access', 'Travel assistance'],
    desc: 'Essential luxury services for the discerning individual.',
  },
  {
    name: 'Elite',
    price: 6500,
    period: 'month',
    color: '#c9a028',
    highlighted: true,
    perks: ['24/7 private advisor team', 'Unlimited requests', 'VIP table access', 'Private event invitations', 'Travel planning', 'Home management', 'Health concierge', 'Personal shopping'],
    desc: 'Comprehensive lifestyle management for extraordinary lives.',
  },
  {
    name: 'Royale',
    price: null,
    period: 'bespoke',
    color: '#2d6a4f',
    perks: ['Dedicated 3-person team', 'Unlimited everything', 'World-exclusive access', 'Family office support', 'Security coordination', 'Global network VIP', 'Unlimited travel', 'Full estate management'],
    desc: 'The absolute pinnacle — tailored to billionaires and heads of state.',
  },
];

const services = [
  { icon: '✈', title: 'Travel & Aviation', items: ['Private jet charter', 'Yacht hire', 'Bespoke itineraries', 'Luxury transfers'] },
  { icon: '🍽', title: 'Gastronomy', items: ['Michelin restaurant access', 'Private chef hire', 'Wine procurement', 'Exclusive tastings'] },
  { icon: '🎭', title: 'Entertainment', items: ['VIP event tickets', 'Fashion week access', 'F1 hospitality', 'Art fair invitations'] },
  { icon: '🏠', title: 'Estate Management', items: ['Property supervision', 'Staff management', 'Renovation oversight', 'Security services'] },
  { icon: '🛍', title: 'Personal Shopping', items: ['Luxury goods sourcing', 'Bespoke tailoring', 'Jewellery acquisition', 'Art investment'] },
  { icon: '💊', title: 'Health & Wellness', items: ['Medical appointments', 'Spa reservations', 'Personal trainers', 'Nutrition planning'] },
];

export default function LeConciergerie() {
  const [selectedTier, setSelectedTier] = useState(1);
  const [activeService, setActiveService] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', tier: 'Elite', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageWrapper bgColor="#080f0a">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(8,15,10,0.95), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-[#2d6a4f] transition-colors">← Portfolio</Link>
        <div className="font-display text-xl font-light tracking-[0.4em]" style={{ color: '#c9a028' }}>LE CONCIERGERIE</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Lifestyle Management</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
            <ambientLight intensity={0.05} />
            <pointLight position={[4, 5, 4]} color="#c9a028" intensity={4} />
            <pointLight position={[-4, 3, 3]} color="#2d6a4f" intensity={3} />
            <pointLight position={[0, 8, -2]} color="#ffffff" intensity={0.5} />
            <Stars radius={100} depth={50} count={4000} factor={4} fade speed={0.2} />
            <Suspense fallback={null}>
              <Float speed={1} floatIntensity={0.3}>
                <CrownGems />
              </Float>
              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-6" style={{ color: '#c9a028' }}>Private Members Club · Est. 2008</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Life,<br />
              <span style={{ color: '#2d6a4f' }} className="italic">Curated</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-white/40 text-lg font-light leading-relaxed max-w-lg">
              A private conciergerie for those who expect nothing less than the exceptional. Access the inaccessible. Experience the impossible.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                style={{ background: 'linear-gradient(135deg, #c9a028, #e8c84a)', color: '#080f0a', fontWeight: 700 }}
                className="px-8 py-4 tracking-widest uppercase text-sm"
                onClick={() => document.getElementById('membership').scrollIntoView({ behavior: 'smooth' })}
              >
                Become a Member
              </button>
              <button className="btn-outline border-white/20" onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}>
                Our Services
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services-section" className="py-24 px-8 md:px-16">
        <ScrollReveal>
          <p className="section-subtitle mb-4">What We Do</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            Every Detail,<br /><span className="text-gradient-gold italic">Handled</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <motion.div
                onClick={() => setActiveService(activeService === i ? null : i)}
                className="p-6 border cursor-pointer transition-all duration-300"
                style={{
                  background: activeService === i ? 'rgba(45,106,79,0.08)' : 'rgba(255,255,255,0.02)',
                  borderColor: activeService === i ? '#2d6a4f40' : 'rgba(255,255,255,0.05)',
                }}
                whileHover={{ borderColor: 'rgba(45,106,79,0.3)' }}
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-display text-xl font-light text-white mb-3">{s.title}</h3>
                <AnimatePresence>
                  {activeService === i && (
                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white/50">
                          <span style={{ color: '#2d6a4f' }}>◈</span>
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <div className="mt-3 text-xs text-white/20">{activeService === i ? '↑ Close' : '↓ See services'}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Membership Tiers ── */}
      <section id="membership" className="py-24 px-8 md:px-16 border-t border-white/5">
        <ScrollReveal>
          <p className="section-subtitle mb-4">Membership</p>
          <h2 className="font-display text-5xl font-light text-white mb-12">
            Choose Your<br /><span className="text-gradient-gold italic">Level</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <motion.div
                onClick={() => setSelectedTier(i)}
                className="p-8 border cursor-pointer transition-all duration-300 relative"
                style={{
                  background: t.highlighted ? 'rgba(201,160,40,0.06)' : 'rgba(255,255,255,0.02)',
                  borderColor: selectedTier === i ? t.color + '80' : 'rgba(255,255,255,0.06)',
                  boxShadow: t.highlighted ? '0 0 60px rgba(201,160,40,0.08)' : 'none',
                }}
                whileHover={{ borderColor: t.color + '50' }}
              >
                {t.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs tracking-widest uppercase" style={{ background: '#c9a028', color: '#080f0a' }}>
                    Most Popular
                  </div>
                )}
                <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: t.color }}>{t.name}</div>
                <div className="font-display text-4xl font-light text-white mb-1">
                  {t.price ? `€${t.price.toLocaleString()}` : 'Bespoke'}
                </div>
                <div className="text-xs text-white/30 mb-6">per {t.period}</div>
                <p className="text-white/40 text-sm mb-6">{t.desc}</p>
                <div className="space-y-2">
                  {t.perks.map((p, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-white/60">
                      <span style={{ color: t.color }}>✓</span>
                      {p}
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 mt-6 tracking-widest uppercase text-sm border transition-all duration-300"
                  style={{
                    background: selectedTier === i ? t.color : 'transparent',
                    borderColor: t.color,
                    color: selectedTier === i ? '#080f0a' : t.color,
                    fontWeight: selectedTier === i ? 700 : 400,
                  }}
                  onClick={() => { setSelectedTier(i); document.getElementById('apply').scrollIntoView({ behavior: 'smooth' }); }}
                >
                  {t.price ? 'Apply Now' : 'Request Meeting'}
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="py-24 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="section-subtitle mb-4 text-center">Apply</p>
            <h2 className="font-display text-4xl font-light text-white text-center mb-12">
              Begin Your<br /><span className="text-gradient-gold italic">Journey</span>
            </h2>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" className="glass-gold p-8 md:p-10 space-y-5"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div>
                  <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Full Name *</label>
                  <input className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500"
                    placeholder="Your name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Membership Tier</label>
                  <select className="w-full bg-[#080f0a] border border-white/10 text-white/80 px-4 py-3 focus:outline-none focus:border-gold-500"
                    value={contactForm.tier} onChange={e => setContactForm(f => ({ ...f, tier: e.target.value }))}>
                    {tiers.map(t => <option key={t.name} value={t.name}>{t.name} {t.price ? `— €${t.price.toLocaleString()}/month` : '— Bespoke'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">Private Phone Number</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500"
                    placeholder="+33 6 XX XX XX XX" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs tracking-[0.3em] text-white/40 uppercase block mb-2">About You</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 resize-none"
                    placeholder="Tell us about your lifestyle and what you're looking for..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <p className="text-xs text-white/20">Your application is fully confidential. We contact qualified applicants within 24 hours.</p>
                <button type="submit" className="btn-gold w-full">Submit Application</button>
              </motion.form>
            ) : (
              <motion.div key="success" className="glass-gold p-12 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-5xl mb-4 text-gradient-gold">♛</div>
                <h3 className="font-display text-3xl text-white mb-3">Application Received</h3>
                <p className="text-white/50">A senior advisor will contact you within 24 hours at your private number.</p>
                <button className="btn-gold mt-8" onClick={() => setSubmitted(false)}>New Application</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.4em] text-gradient-gold">LE CONCIERGERIE</div>
          <div className="text-xs text-white/20 tracking-wider">By invitation & application · Members only</div>
          <div className="text-xs text-white/20">© 2026 Le Conciergerie.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
