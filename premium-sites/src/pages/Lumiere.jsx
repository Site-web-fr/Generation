import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import PageWrapper from '../components/ui/PageWrapper';
import { AnimatedWords, ScrollReveal, ScrollRevealX, FadeInUp } from '../components/ui/AnimatedText';
import { Link } from 'react-router-dom';

// ─── 3D Scene ───────────────────────────────────────────────────────────────

function GoldenFace() {
  const groupRef = useRef();
  const particlesRef = useRef();

  const particleCount = 3000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.8 + Math.random() * 1.2;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.3;
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.5;
    const brightness = 0.7 + Math.random() * 0.3;
    colors[i * 3] = brightness * 0.83;
    colors[i * 3 + 1] = brightness * 0.68;
    colors[i * 3 + 2] = brightness * 0.22;
  }

  useFrame(({ clock }) => {
    if (!groupRef.current || !particlesRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    particlesRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#d4af37"
            distort={0.25}
            speed={2}
            roughness={0.1}
            metalness={1}
            transparent
            opacity={0.12}
          />
        </Sphere>
        <Sphere args={[1.0, 32, 32]}>
          <meshStandardMaterial
            color="#c9a028"
            roughness={0.05}
            metalness={1}
            transparent
            opacity={0.08}
          />
        </Sphere>
        {[1.5, 2.2, 3.0].map((r, i) => (
          <mesh key={i} rotation={[Math.PI / 3 * i, Math.PI / 4 * i, 0]}>
            <torusGeometry args={[r, 0.015, 16, 100]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} transparent opacity={0.25 - i * 0.05} />
          </mesh>
        ))}
      </Float>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.018} vertexColors transparent opacity={0.7} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

// ─── Procedures Data ─────────────────────────────────────────────────────────

const procedures = [
  { id: 'rhinoplasty', name: 'Rhinoplasty', duration: '2–3h', recovery: '2 weeks', price: 'From €4,500', desc: 'Precision reshaping of the nasal structure for perfect facial harmony.', icon: '◈' },
  { id: 'facelifting', name: 'Face Lifting', duration: '3–5h', recovery: '3 weeks', price: 'From €7,200', desc: 'Comprehensive rejuvenation restoring youthful facial contours.', icon: '◉' },
  { id: 'blepharoplasty', name: 'Blepharoplasty', duration: '1–2h', recovery: '10 days', price: 'From €3,200', desc: 'Eyelid refinement for a brighter, more awakened appearance.', icon: '◎' },
  { id: 'lipofilling', name: 'Lipo-filling', duration: '2–3h', recovery: '2 weeks', price: 'From €3,800', desc: 'Natural volumisation using your own tissue for lasting results.', icon: '◌' },
  { id: 'breast', name: 'Breast Augmentation', duration: '1–2h', recovery: '3 weeks', price: 'From €5,500', desc: 'Natural-looking enhancement tailored to your unique silhouette.', icon: '◇' },
  { id: 'liposuction', name: 'Liposuction', duration: '1–4h', recovery: '2 weeks', price: 'From €3,500', desc: 'Body sculpting with surgical precision for defined contours.', icon: '◆' },
];

const stats = [
  { value: '2,400+', label: 'Procedures Performed' },
  { value: '18', label: 'Years of Excellence' },
  { value: '99.2%', label: 'Satisfaction Rate' },
  { value: '12', label: 'Board-Certified Surgeons' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Lumiere() {
  const [activeProcedure, setActiveProcedure] = useState(null);
  const [consultForm, setConsultForm] = useState({ name: '', email: '', phone: '', procedure: '', date: '', message: '' });
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper bgColor="#050505">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)' }}>
        <Link to="/" className="text-xs tracking-[0.3em] text-white/40 uppercase font-light hover:text-gold-400 transition-colors">← Portfolio</Link>
        <div className="font-display text-2xl font-light tracking-[0.3em] text-gradient-gold">LUMIÈRE</div>
        <div className="text-xs tracking-[0.2em] text-white/30 uppercase font-light hidden md:block">Aesthetic Surgery</div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[5, 5, 5]} color="#d4af37" intensity={2} />
            <pointLight position={[-5, -3, 3]} color="#c9a028" intensity={1} />
            <pointLight position={[0, -5, 2]} color="#ffffff" intensity={0.5} />
            <Stars radius={80} depth={40} count={3000} factor={3} fade />
            <Suspense fallback={null}>
              <GoldenFace />
              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl">
          <FadeInUp delay={0.2}>
            <p className="section-subtitle mb-6">Centre de Chirurgie Esthétique</p>
          </FadeInUp>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              The Art of<br />
              <span className="text-gradient-gold italic">Beauty</span>
            </motion.h1>
          </div>
          <FadeInUp delay={0.8}>
            <p className="mt-8 text-white/50 text-lg font-light leading-relaxed max-w-lg">
              Where surgical excellence meets aesthetic vision. Twelve board-certified surgeons dedicated to your transformation.
            </p>
          </FadeInUp>
          <FadeInUp delay={1.0}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                className="btn-gold"
                onClick={() => document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' })}
              >
                Book Consultation
              </button>
              <button
                className="btn-outline"
                onClick={() => document.getElementById('procedures').scrollIntoView({ behavior: 'smooth' })}
              >
                Our Procedures
              </button>
            </div>
          </FadeInUp>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500 to-transparent mx-auto" />
          <p className="text-xs tracking-[0.3em] text-white/30 mt-3 text-center">SCROLL</p>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-8 md:px-16 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-4xl md:text-5xl font-light text-gradient-gold">{s.value}</div>
                <div className="mt-2 text-xs tracking-[0.2em] uppercase text-white/40">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Procedures ── */}
      <section id="procedures" className="py-24 px-8 md:px-16">
        <ScrollReveal>
          <p className="section-subtitle mb-4">Our Expertise</p>
          <h2 className="section-title text-white mb-16">
            Surgical<br /><span className="text-gradient-gold italic">Procedures</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {procedures.map((proc, i) => (
            <motion.div
              key={proc.id}
              className="card-premium cursor-pointer bg-[#050505]"
              whileHover={{ backgroundColor: '#0a0a0a' }}
              onClick={() => setActiveProcedure(activeProcedure?.id === proc.id ? null : proc)}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl text-gold-500">{proc.icon}</span>
                <span className="text-xs tracking-[0.2em] text-white/20 font-mono">0{i + 1}</span>
              </div>
              <h3 className="font-display text-2xl font-light text-white mb-3">{proc.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{proc.desc}</p>
              <AnimatePresence>
                {activeProcedure?.id === proc.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Duration</span>
                        <span className="text-white/80">{proc.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Recovery</span>
                        <span className="text-white/80">{proc.recovery}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Investment</span>
                        <span className="text-gradient-gold font-medium">{proc.price}</span>
                      </div>
                      <button
                        className="w-full btn-gold mt-2 text-xs py-3"
                        onClick={(e) => { e.stopPropagation(); setConsultForm(f => ({ ...f, procedure: proc.name })); document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' }); }}
                      >
                        Book This Procedure
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-4 flex items-center gap-2 text-xs text-gold-500/60">
                <span>{activeProcedure?.id === proc.id ? 'Less info ↑' : 'More info ↓'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-24 px-8 md:px-16 bg-gradient-to-b from-transparent to-[#0a0800]">
        <ScrollReveal>
          <p className="section-subtitle mb-4">Results</p>
          <h2 className="section-title text-white mb-4">
            Real<br /><span className="text-gradient-gold italic">Transformations</span>
          </h2>
          <p className="text-white/40 max-w-xl mb-16">Each result is the product of careful planning, surgical mastery, and deep respect for individual beauty.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Rhinoplasty', 'Face Lifting', 'Breast Augmentation'].map((name, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="relative group overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <div
                  className="absolute inset-0 flex items-end p-6"
                  style={{
                    background: `linear-gradient(135deg, ${['#1a0f00', '#0a0a1a', '#1a001a'][i]}, #000)`,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08), transparent 70%)',
                    }}
                  />
                  <div className="relative z-10">
                    <div className="text-xs tracking-[0.2em] text-white/30 uppercase mb-1">Case Study</div>
                    <div className="font-display text-xl text-white font-light">{name}</div>
                    <div className="text-xs text-gold-500/60 mt-1">Patient • 38 years</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 glass px-3 py-1 text-xs text-gold-400 tracking-wider">
                  ★★★★★
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Consultation Form ── */}
      <section id="consultation" className="py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="section-subtitle mb-4 text-center">Begin Your Journey</p>
            <h2 className="section-title text-white text-center mb-4">
              Private<br /><span className="text-gradient-gold italic">Consultation</span>
            </h2>
            <p className="text-white/40 text-center mb-12">Complete your confidential request. Our medical coordinator will contact you within 24 hours.</p>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="glass-gold p-8 md:p-12 space-y-6"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-8 h-8 flex items-center justify-center text-xs border transition-all duration-300 ${formStep >= s ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-white/10 text-white/20'}`}>
                        {s}
                      </div>
                      {s < 3 && <div className={`flex-1 h-px w-12 transition-all duration-300 ${formStep > s ? 'bg-gold-500' : 'bg-white/10'}`} />}
                    </div>
                  ))}
                  <span className="text-xs text-white/30 tracking-wider ml-2">
                    {formStep === 1 ? 'Identity' : formStep === 2 ? 'Procedure' : 'Appointment'}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {formStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Full Name *</label>
                        <input className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" placeholder="Jean-Philippe Moreau" value={consultForm.name} onChange={e => setConsultForm(f => ({ ...f, name: e.target.value }))} required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Email *</label>
                          <input type="email" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" placeholder="contact@email.com" value={consultForm.email} onChange={e => setConsultForm(f => ({ ...f, email: e.target.value }))} required />
                        </div>
                        <div>
                          <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Phone</label>
                          <input type="tel" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" placeholder="+33 6 XX XX XX XX" value={consultForm.phone} onChange={e => setConsultForm(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                      </div>
                      <button type="button" className="btn-gold w-full mt-4" onClick={() => setFormStep(2)}>Continue →</button>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Area of Interest *</label>
                        <select className="w-full bg-[#050505] border border-white/10 text-white/80 px-4 py-3 focus:outline-none focus:border-gold-500" value={consultForm.procedure} onChange={e => setConsultForm(f => ({ ...f, procedure: e.target.value }))} required>
                          <option value="">Select a procedure</option>
                          {procedures.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                          <option value="Consultation générale">General consultation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Your Message</label>
                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors resize-none" placeholder="Describe your expectations and any relevant medical history..." value={consultForm.message} onChange={e => setConsultForm(f => ({ ...f, message: e.target.value }))} />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" className="btn-outline flex-1" onClick={() => setFormStep(1)}>← Back</button>
                        <button type="button" className="btn-gold flex-1" onClick={() => setFormStep(3)}>Continue →</button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div>
                        <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-2">Preferred Date *</label>
                        <input type="date" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors" value={consultForm.date} onChange={e => setConsultForm(f => ({ ...f, date: e.target.value }))} required />
                      </div>
                      <div className="glass p-4 space-y-2">
                        <p className="text-xs text-white/40 tracking-widest uppercase mb-3">Summary</p>
                        {consultForm.name && <div className="flex justify-between text-sm"><span className="text-white/40">Patient</span><span className="text-white/80">{consultForm.name}</span></div>}
                        {consultForm.procedure && <div className="flex justify-between text-sm"><span className="text-white/40">Procedure</span><span className="text-gold-400">{consultForm.procedure}</span></div>}
                        {consultForm.date && <div className="flex justify-between text-sm"><span className="text-white/40">Date</span><span className="text-white/80">{consultForm.date}</span></div>}
                      </div>
                      <div className="flex gap-4">
                        <button type="button" className="btn-outline flex-1" onClick={() => setFormStep(2)}>← Back</button>
                        <button type="submit" className="btn-gold flex-1">Confirm Request</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="glass-gold p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-5xl mb-4">◈</div>
                <h3 className="font-display text-3xl text-white mb-3">Consultation Requested</h3>
                <p className="text-white/50">Our medical coordinator will contact you at <span className="text-gold-400">{consultForm.email}</span> within 24 hours.</p>
                <button className="btn-gold mt-8" onClick={() => { setSubmitted(false); setFormStep(1); }}>New Request</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-light tracking-[0.3em] text-gradient-gold">LUMIÈRE</div>
          <div className="text-xs text-white/20 tracking-wider">12 Avenue Montaigne, Paris 75008 · +33 1 XX XX XX XX</div>
          <div className="text-xs text-white/20">© 2026 Lumière. All rights reserved.</div>
        </div>
      </footer>
    </PageWrapper>
  );
}
