import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const PACKAGES = [
  { id: 'discovery', name: 'Discovery', duration: 30, price: 180, desc: 'Parfait pour les débutants. Tour guidé des îles de Palm Jumeirah.', features: ['Guide expert', 'Équipement fourni', 'Photos offertes'] },
  { id: 'adventure', name: 'Adventure', duration: 60, price: 320, desc: 'Explorez la skyline de Dubai à toute vitesse. Frissons garantis.', features: ['Guide expert', 'Équipement complet', 'Photos & vidéos', 'Boissons incluses'] },
  { id: 'vip', name: 'VIP Sunset', duration: 90, price: 550, desc: 'Expérience de luxe au coucher du soleil. Champagne et transfert inclus.', features: ['Guide dédié', 'Équipement premium', 'Photos & vidéos', 'Champagne & snacks', 'Transfert hôtel'] },
  { id: 'private', name: 'Private Charter', duration: 120, price: 980, desc: 'Location privée pour 2 jet skis. Itinéraire 100% personnalisé.', features: ['Guide dédié', 'Équipement premium', 'Photos & vidéos', 'Champagne', 'Transfert', 'Itinéraire sur-mesure'] },
];

const ROUTES = [
  { name: 'Palm Jumeirah', duration: '30min', distance: '15km', diff: 'Facile', color: '#4fc3f7' },
  { name: 'Burj Al Arab', duration: '45min', distance: '22km', diff: 'Modéré', color: '#81c784' },
  { name: 'Dubai Marina', duration: '60min', distance: '30km', diff: 'Sportif', color: '#ffb74d' },
  { name: 'World Islands', duration: '90min', distance: '45km', diff: 'Expert', color: '#ef5350' },
];

function WaterScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Water surface plane with wave geometry
    const waveGeo = new THREE.PlaneGeometry(20, 20, 50, 50);
    const waveMat = new THREE.MeshPhongMaterial({
      color: 0x0077be,
      transparent: true,
      opacity: 0.4,
      wireframe: false,
      shininess: 100,
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.rotation.x = -Math.PI / 2;
    scene.add(wave);

    const waveWire = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20, 30, 30),
      new THREE.MeshBasicMaterial({ color: 0x29b6f6, wireframe: true, transparent: true, opacity: 0.12 })
    );
    waveWire.rotation.x = -Math.PI / 2;
    waveWire.position.y = 0.01;
    scene.add(waveWire);

    // Jet ski body (simplified box mesh)
    const bodyGeo = new THREE.BoxGeometry(0.6, 0.25, 1.8);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xf97316, shininess: 80 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.3, 0);
    scene.add(body);

    // Jet ski nose
    const noseGeo = new THREE.ConeGeometry(0.25, 0.6, 8);
    const noseMat = new THREE.MeshPhongMaterial({ color: 0xf97316 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.rotation.x = -Math.PI / 2;
    nose.position.set(0, 0.3, -1.2);
    scene.add(nose);

    // Wake particles
    const wakeGeo = new THREE.BufferGeometry();
    const wakePositions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      wakePositions[i * 3] = (Math.random() - 0.5) * 2;
      wakePositions[i * 3 + 1] = 0.05;
      wakePositions[i * 3 + 2] = Math.random() * 4;
    }
    wakeGeo.setAttribute('position', new THREE.BufferAttribute(wakePositions, 3));
    const wakeMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.6 });
    const wake = new THREE.Points(wakeGeo, wakeMat);
    scene.add(wake);

    // Dubai skyline (simple boxes)
    const skylineColors = [0xffa000, 0xff6f00, 0xf57c00];
    for (let i = 0; i < 15; i++) {
      const h = 1 + Math.random() * 5;
      const bGeo = new THREE.BoxGeometry(0.3 + Math.random() * 0.3, h, 0.3);
      const bMat = new THREE.MeshPhongMaterial({ color: skylineColors[i % 3], transparent: true, opacity: 0.15 + Math.random() * 0.1 });
      const b = new THREE.Mesh(bGeo, bMat);
      b.position.set(-7 + i * 1, h / 2 - 2, -8 - Math.random() * 2);
      scene.add(b);
    }

    const ambientLight = new THREE.AmbientLight(0xfff5e0, 0.8);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffd700, 2);
    sunLight.position.set(5, 8, 5);
    scene.add(sunLight);

    const posArray = waveGeo.attributes.position.array as Float32Array;
    const originalY = posArray.slice();

    let frame = 0;
    const animate = () => {
      frame++;
      const t = frame * 0.02;

      // Wave animation
      for (let i = 0; i < posArray.length / 3; i++) {
        const x = originalY[i * 3];
        const z = originalY[i * 3 + 2];
        posArray[i * 3 + 2] = originalY[i * 3 + 2] + Math.sin(x * 0.8 + t) * 0.15 + Math.sin(z * 0.6 + t * 0.7) * 0.1;
      }
      waveGeo.attributes.position.needsUpdate = true;

      body.position.y = 0.3 + Math.sin(t * 0.8) * 0.05;
      body.rotation.z = Math.sin(t * 0.5) * 0.03;
      nose.position.y = 0.3 + Math.sin(t * 0.8) * 0.05;

      scene.rotation.y = Math.sin(t * 0.1) * 0.2;
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
    return () => { window.removeEventListener('resize', onResize); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}

export default function JetSkiDubai() {
  const [selectedPackage, setSelectedPackage] = useState('adventure');
  const [people, setPeople] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeRoute, setActiveRoute] = useState(0);

  const pkg = PACKAGES.find(p => p.id === selectedPackage)!;
  const total = pkg.price * people;

  return (
    <div style={{ background: '#030b18', color: '#f0f8ff', minHeight: '100vh', fontFamily: 'Space Grotesk, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 50px', background: 'rgba(3,11,24,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(41,182,246,0.1)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #f97316, #fb923c)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🌊</div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em', color: '#f97316' }}>AQUA RUSH</div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(240,248,255,0.4)' }}>Dubai · Jet Ski</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {['Packages', 'Routes', 'Réserver', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(240,248,255,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f97316')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,248,255,0.6)')}>{i}</a>
          ))}
        </div>
        <button style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '10px 24px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>
          Réserver maintenant
        </button>
      </motion.nav>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 50%, rgba(41,182,246,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 80%, rgba(249,115,22,0.12) 0%, transparent 60%)' }} />

        <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%' }}>
          <WaterScene />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 50%, transparent 30%, #030b18 80%)' }} />
        </div>

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 50px', maxWidth: '600px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', padding: '6px 16px', borderRadius: '100px', marginBottom: '28px' }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', animation: 'pulse-gold 2s infinite' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f97316' }}>Available now · Dubai Marina</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 700, lineHeight: 1, marginBottom: '24px' }}
          >
            <span style={{ color: '#f0f8ff' }}>Feel the</span><br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #29b6f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RUSH</span><br />
            <span style={{ color: 'rgba(240,248,255,0.7)', fontSize: '60%', fontWeight: 400 }}>of Dubai waters</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: 'rgba(240,248,255,0.55)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '400px', marginBottom: '40px' }}
          >
            Jet ski de dernière génération. Guides certifiés. Expériences inoubliables sur les plus belles eaux du monde.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <button style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '14px 36px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(249,115,22,0.3)' }}>
              Réserver maintenant
            </button>
            <button style={{ background: 'transparent', color: 'rgba(240,248,255,0.7)', border: '1px solid rgba(240,248,255,0.2)', padding: '14px 28px', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}>
              Voir les routes
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '32px', marginTop: '56px' }}
          >
            {[['500+', 'Aventuriers/mois'], ['4.9★', 'Note moyenne'], ['0', 'Incident'], ['2015', 'Fondée']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f97316' }}>{v}</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,248,255,0.35)' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ padding: '100px 50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, marginBottom: '12px' }}>
            Nos <span style={{ color: '#f97316' }}>Packages</span>
          </h2>
          <p style={{ color: 'rgba(240,248,255,0.5)', fontSize: '0.95rem' }}>Choisissez votre niveau d'adrénaline</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {PACKAGES.map(p => {
            const isSelected = selectedPackage === p.id;
            return (
              <motion.div key={p.id} onClick={() => setSelectedPackage(p.id)}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                whileHover={{ y: -6 }}
                style={{
                  padding: '32px 24px', border: `1px solid ${isSelected ? '#f97316' : 'rgba(240,248,255,0.08)'}`,
                  background: isSelected ? 'rgba(249,115,22,0.08)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                  boxShadow: isSelected ? '0 0 30px rgba(249,115,22,0.2)' : 'none',
                }}
              >
                {p.id === 'vip' && (
                  <div style={{ position: 'absolute', top: 12, right: -24, background: '#f97316', color: '#fff', fontSize: '0.6rem', fontWeight: 700, padding: '3px 32px', transform: 'rotate(45deg)', letterSpacing: '0.1em' }}>POPULAIRE</div>
                )}
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: isSelected ? '#f97316' : '#f0f8ff', marginBottom: '4px' }}>{p.duration} min</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: isSelected ? '#f97316' : '#f0f8ff' }}>{p.name}</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(240,248,255,0.5)', lineHeight: 1.6, marginBottom: '20px' }}>{p.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: '0.78rem', color: 'rgba(240,248,255,0.65)', padding: '4px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', fontSize: '0.6rem' }}>✦</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{ fontWeight: 700, fontSize: '1.6rem', color: isSelected ? '#f97316' : '#f0f8ff' }}>{p.price} AED</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(240,248,255,0.35)' }}>par personne</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="réserver" style={{ padding: '60px 50px 100px', background: 'rgba(249,115,22,0.04)', borderTop: '1px solid rgba(249,115,22,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
            Calculez votre <span style={{ color: '#f97316' }}>expérience</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,248,255,0.5)', marginBottom: '12px' }}>
                Nombre de personnes: {people}
              </label>
              <input type="range" min={1} max={6} value={people} onChange={e => setPeople(+e.target.value)} style={{ width: '100%', accentColor: '#f97316' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(240,248,255,0.3)', marginTop: '4px' }}>
                <span>1</span><span>6</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,248,255,0.5)', marginBottom: '12px' }}>Date souhaitée</label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,248,255,0.15)', padding: '12px 16px', color: '#f0f8ff', fontSize: '0.9rem', outline: 'none', fontFamily: 'Space Grotesk, sans-serif', cursor: 'pointer' }}
              />
            </div>
          </div>
          <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.2)', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,248,255,0.4)', marginBottom: '4px' }}>
                {pkg.name} · {people} personne{people > 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 700, color: '#f97316' }}>{total.toLocaleString()} AED</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(240,248,255,0.4)' }}>≈ {Math.round(total / 3.67).toLocaleString()} €</div>
            </div>
            <button style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '16px 40px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 10px 30px rgba(249,115,22,0.4)' }}>
              Confirmer
            </button>
          </div>
        </div>
      </section>

      {/* ROUTES */}
      <section style={{ padding: '80px 50px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>
          Nos <span style={{ color: '#29b6f6' }}>Routes</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {ROUTES.map((r, i) => (
            <motion.div key={i} onClick={() => setActiveRoute(i)}
              whileHover={{ scale: 1.02 }}
              style={{ padding: '24px', border: `1px solid ${i === activeRoute ? r.color : 'rgba(240,248,255,0.08)'}`, background: i === activeRoute ? `rgba(41,182,246,0.05)` : 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{r.name}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', background: `${r.color}22`, color: r.color, borderRadius: '100px' }}>{r.diff}</div>
              </div>
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'rgba(240,248,255,0.5)' }}>
                <span>⏱ {r.duration}</span>
                <span>📍 {r.distance}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(249,115,22,0.1)', padding: '32px 50px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(240,248,255,0.3)' }}>
        <span style={{ color: '#f97316', fontWeight: 700, fontSize: '1rem' }}>AQUA RUSH DUBAI</span>
        <span>© 2026 · Dubai Marina · +971 4 000 0000</span>
      </footer>
    </div>
  );
}
