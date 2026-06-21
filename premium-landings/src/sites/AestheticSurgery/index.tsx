import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import ParticleField from '../../components/ParticleField';

const TREATMENTS = [
  { id: 'rhinoplasty', name: 'Rhinoplastie', price: 4200, duration: '2-3h', recovery: '10-14j', icon: '◈', desc: 'Remodelage précis du nez pour une harmonie parfaite du visage.' },
  { id: 'blepharoplasty', name: 'Blépharoplastie', price: 2800, duration: '1-2h', recovery: '7-10j', icon: '◉', desc: 'Rajeunissement du regard par correction des paupières tombantes.' },
  { id: 'facelift', name: 'Lifting Facial', price: 6800, duration: '3-4h', recovery: '14-21j', icon: '◇', desc: 'Lifting complet pour un visage redéfini et naturellement jeune.' },
  { id: 'lips', name: 'Lèvres & Contour', price: 890, duration: '30min', recovery: '3-5j', icon: '◈', desc: 'Acide hyaluronique premium pour des lèvres parfaitement dessinées.' },
  { id: 'botox', name: 'Botox Médical', price: 450, duration: '20min', recovery: '0j', icon: '◎', desc: 'Injection de précision pour effacer rides et ridules durablement.' },
  { id: 'jawline', name: 'Remodelage Mâchoire', price: 1200, duration: '45min', recovery: '2-3j', icon: '◆', desc: 'Définition du jawline pour un profil sculpté et affuté.' },
];

const TESTIMONIALS = [
  { name: 'Isabelle M.', text: 'Une transformation discrète et naturelle. Le Dr. Chen a su exactement ce que je cherchais.', rating: 5, procedure: 'Rhinoplastie' },
  { name: 'Sophie R.', text: 'Résultats au-delà de mes espérances. L\'équipe est d\'une professionnalisme absolu.', rating: 5, procedure: 'Lifting Facial' },
  { name: 'Marie L.', text: 'Clinique d\'exception. Je me suis sentie entre les meilleures mains de Paris.', rating: 5, procedure: 'Blépharoplastie' },
];

function ThreeDScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Main diamond geometry
    const geo = new THREE.OctahedronGeometry(1.2, 2);
    const mat = new THREE.MeshPhongMaterial({
      color: 0xc9a96e,
      wireframe: false,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wireGeo = new THREE.OctahedronGeometry(1.2, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc9a96e,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Inner core
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0xe8d5a3,
      emissive: 0xc9a96e,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Orbiting rings
    const rings: THREE.Mesh[] = [];
    [1.8, 2.2, 2.6].forEach((r, i) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.005, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc9a96e,
        transparent: true,
        opacity: 0.3 - i * 0.07,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + i * 0.3;
      ring.rotation.y = i * 0.5;
      scene.add(ring);
      rings.push(ring);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xc9a96e, 2, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xe8d5a3, 1.5, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    let frame = 0;
    const animate = () => {
      frame++;
      const t = frame * 0.005;
      mesh.rotation.y = t * 0.5;
      mesh.rotation.x = t * 0.3;
      wireMesh.rotation.y = -t * 0.4;
      wireMesh.rotation.x = t * 0.2;
      core.rotation.y = t * 1.2;
      core.rotation.z = t * 0.8;
      rings.forEach((ring, i) => {
        ring.rotation.z = t * (0.3 + i * 0.1);
        ring.rotation.x = Math.PI / 3 + i * 0.3 + Math.sin(t + i) * 0.1;
      });
      pointLight.position.x = Math.sin(t * 0.7) * 4;
      pointLight.position.z = Math.cos(t * 0.7) * 4;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}

export default function AestheticSurgery() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const totalPrice = TREATMENTS.filter(t => selected.includes(t.id)).reduce((s, t) => s + t.price, 0);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#050508', color: '#f5f0e8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 60px',
          background: 'linear-gradient(to bottom, rgba(5,5,8,0.95), transparent)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 300, letterSpacing: '0.1em', color: '#c9a96e' }}>LUMIÈRE</span>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginTop: '-4px' }}>AESTHETIC CLINIC</span>
        </div>
        <div style={{ display: 'flex', gap: '40px', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Traitements', 'Médecins', 'Résultats', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'rgba(245,240,232,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.7)')}
            >{item}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 24px' }}>
          Consultation
        </button>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <ParticleField color="#c9a96e" count={60} speed={0.2} opacity={0.25} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '650px' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>Excellence · Précision · Beauté</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '24px', color: '#f5f0e8' }}
          >
            L'art de la<br /><em style={{ fontStyle: 'italic', color: '#c9a96e' }}>beauté naturelle</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.65)', maxWidth: '440px', marginBottom: '48px' }}
          >
            Clinique de référence à Paris. Nos chirurgiens sculptent votre beauté avec une précision millimétrique, dans le respect absolu de votre harmonie naturelle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          >
            <button className="btn-solid-gold">Prendre rendez-vous</button>
            <button className="btn-premium">Nos résultats</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            style={{ display: 'flex', gap: '40px', marginTop: '60px' }}
          >
            {[['2,400+', 'Opérations'], ['98%', 'Satisfaction'], ['15 ans', "d'excellence"]].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#c9a96e' }}>{val}</div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Scene */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', zIndex: 1 }}>
          <ThreeDScene />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, transparent 30%, #050508 70%)' }} />
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '40px', left: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)' }}>Découvrir</span>
          <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)' }} />
        </motion.div>
      </section>

      {/* TREATMENTS SECTION */}
      <section id="traitements" style={{ padding: '120px 60px', position: 'relative' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <div className="luxury-divider" style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>Nos Soins</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, marginBottom: '16px' }}>
            Traitements d'exception
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Sélectionnez vos soins pour obtenir une estimation personnalisée.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {TREATMENTS.map((t, i) => {
            const isSelected = selected.includes(t.id);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => toggle(t.id)}
                style={{
                  padding: '32px',
                  border: `1px solid ${isSelected ? '#c9a96e' : 'rgba(245,240,232,0.08)'}`,
                  background: isSelected ? 'rgba(201,169,110,0.07)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer !important',
                  transition: 'all 0.35s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(201,169,110,0.5)' }}
              >
                {isSelected && (
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, background: '#c9a96e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#050508', fontWeight: 600 }}>✓</div>
                )}
                <div style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#c9a96e' }}>{t.icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400, marginBottom: '10px' }}>{t.name}</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6, marginBottom: '16px' }}>{t.desc}</p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.72rem', color: 'rgba(245,240,232,0.4)' }}>
                  <span>⏱ {t.duration}</span>
                  <span>🌿 Récup. {t.recovery}</span>
                </div>
                <div style={{ marginTop: '16px', fontSize: '1.2rem', fontFamily: 'Cormorant Garamond, serif', color: '#c9a96e', fontWeight: 300 }}>
                  à partir de {t.price.toLocaleString('fr-FR')} €
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Estimator */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              style={{
                maxWidth: '700px', margin: '50px auto 0',
                padding: '40px', background: 'rgba(201,169,110,0.05)',
                border: '1px solid rgba(201,169,110,0.25)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '20px', color: '#c9a96e' }}>
                Votre estimation personnalisée
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {TREATMENTS.filter(t => selected.includes(t.id)).map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', padding: '8px 0', borderBottom: '1px solid rgba(245,240,232,0.05)' }}>
                    <span>{t.name}</span>
                    <span style={{ color: '#c9a96e' }}>{t.price.toLocaleString('fr-FR')} €</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '4px' }}>Total estimé</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, color: '#c9a96e' }}>
                    {totalPrice.toLocaleString('fr-FR')} €
                  </div>
                </div>
                <button className="btn-solid-gold">Confirmer consultation</button>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'rgba(245,240,232,0.3)', marginTop: '16px' }}>
                * Tarifs indicatifs. Estimation définitive lors de votre consultation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 60px', background: 'rgba(201,169,110,0.03)', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ fontSize: '3rem', color: '#c9a96e', marginBottom: '16px', fontFamily: 'serif', opacity: 0.4 }}>"</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, lineHeight: 1.6, marginBottom: '24px', color: 'rgba(245,240,232,0.9)' }}>
                {TESTIMONIALS[activeTestimonial].text}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '12px' }}>
                {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                  <span key={i} style={{ color: '#c9a96e' }}>★</span>
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.1em' }}>
                {TESTIMONIALS[activeTestimonial].name} · {TESTIMONIALS[activeTestimonial].procedure}
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{ width: i === activeTestimonial ? 24 : 8, height: 2, background: i === activeTestimonial ? '#c9a96e' : 'rgba(201,169,110,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: '120px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div>
          <div className="luxury-divider" style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>Contact</span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '24px' }}>
            Votre consultation<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>confidentielle</em>
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.55)', lineHeight: 1.7, marginBottom: '40px' }}>
            Chaque consultation est confidentielle et sur mesure. Nos experts prennent le temps de comprendre vos attentes pour vous proposer le protocole le plus adapté.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
            {[['📍', '12 Rue du Faubourg Saint-Honoré, Paris 8ème'], ['📞', '+33 1 40 00 00 00'], ['✉', 'contact@lumiere-clinic.fr'], ['⏰', 'Lun–Ven 8h–20h · Sam 9h–18h']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'rgba(245,240,232,0.6)' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={e => e.preventDefault()}>
            {['name', 'email', 'phone'].map(field => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field === 'name' ? 'Votre nom' : field === 'email' ? 'Votre email' : 'Votre téléphone'}
                value={formData[field as keyof typeof formData]}
                onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,240,232,0.1)', padding: '14px 20px', color: '#f5f0e8', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s', fontFamily: 'DM Sans, sans-serif' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.1)')}
              />
            ))}
            <textarea
              placeholder="Vos souhaits et questions..."
              rows={4}
              value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,240,232,0.1)', padding: '14px 20px', color: '#f5f0e8', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'DM Sans, sans-serif', transition: 'border-color 0.3s' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.1)')}
            />
            <button type="submit" className="btn-solid-gold" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              Demander ma consultation
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'rgba(245,240,232,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e' }}>LUMIÈRE CLINIC</span>
        <span>© 2026 Lumière Aesthetic Clinic · Paris · Tous droits réservés</span>
      </footer>
    </div>
  );
}
