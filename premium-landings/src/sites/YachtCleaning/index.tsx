import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const SERVICES = [
  { id: 'exterior', name: 'Lavage Extérieur', icon: '🌊', desc: 'Nettoyage haute pression de la coque et du pont. Traitement anti-salissures biologique.', basePrice: 400, multiplier: 1 },
  { id: 'interior', name: 'Nettoyage Intérieur', icon: '✨', desc: 'Détailing complet des cabines, salons, galley. Produits certifiés respectueux des matières.', basePrice: 350, multiplier: 1 },
  { id: 'polish', name: 'Polissage & Cirage', icon: '💎', desc: 'Polissage de la gelcoat et application de cire hydrophobe premium pour une brillance parfaite.', basePrice: 600, multiplier: 1.2 },
  { id: 'teak', name: 'Teck & Bois', icon: '🪵', desc: 'Traitement, nourrissage et protection des plages de teck. Résultat professionnel garanti.', basePrice: 280, multiplier: 1 },
  { id: 'windows', name: 'Hublots & Vitres', icon: '🔍', desc: 'Nettoyage et traitement des surfaces vitrées. Anti-calcaire et traitement hydrophobe.', basePrice: 180, multiplier: 0.8 },
  { id: 'full', name: 'Pack Complet VIP', icon: '👑', desc: 'Prise en charge totale de A à Z. Équipe dédiée, produits premium, rapport photo inclus.', basePrice: 1200, multiplier: 1.5 },
];

const SIZES = [
  { label: 'Voilier 8–12m', factor: 1 },
  { label: 'Motoryacht 12–18m', factor: 1.5 },
  { label: 'Motoryacht 18–24m', factor: 2 },
  { label: 'Superyacht 24–35m', factor: 2.8 },
  { label: 'Megayacht 35m+', factor: 4 },
];

function YachtModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(6, 3, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const navyMat = new THREE.MeshPhongMaterial({ color: 0x0a1628, shininess: 120, transparent: true, opacity: 0.85 });
    const whiteMat = new THREE.MeshPhongMaterial({ color: 0xe8e8e8, shininess: 100 });
    const goldMat = new THREE.MeshPhongMaterial({ color: 0xc9a96e, shininess: 150, emissive: 0xc9a96e, emissiveIntensity: 0.2 });
    const wireNavy = new THREE.MeshBasicMaterial({ color: 0x29b6f6, wireframe: true, transparent: true, opacity: 0.25 });

    // Hull
    const hullGeo = new THREE.CylinderGeometry(0.6, 0.8, 4, 8, 1, false, 0, Math.PI);
    const hull = new THREE.Mesh(hullGeo, navyMat);
    hull.rotation.z = Math.PI / 2;
    scene.add(hull);
    const hullWire = new THREE.Mesh(hullGeo, wireNavy);
    hullWire.rotation.z = Math.PI / 2;
    scene.add(hullWire);

    // Deck
    const deckGeo = new THREE.BoxGeometry(3.5, 0.1, 1.2);
    const deck = new THREE.Mesh(deckGeo, whiteMat);
    deck.position.y = 0.45;
    scene.add(deck);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.8, 0.9);
    const cabin = new THREE.Mesh(cabinGeo, whiteMat);
    cabin.position.set(-0.2, 0.9, 0);
    scene.add(cabin);

    // Bridge
    const bridgeGeo = new THREE.BoxGeometry(0.8, 0.5, 0.8);
    const bridge = new THREE.Mesh(bridgeGeo, whiteMat);
    bridge.position.set(-0.2, 1.65, 0);
    scene.add(bridge);

    // Mast
    const mastGeo = new THREE.CylinderGeometry(0.02, 0.02, 3, 6);
    const mast = new THREE.Mesh(mastGeo, new THREE.MeshPhongMaterial({ color: 0xd4af37 }));
    mast.position.set(0.8, 1.95, 0);
    scene.add(mast);

    // Antenna
    const antGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.5, 6);
    const ant = new THREE.Mesh(antGeo, goldMat);
    ant.position.set(-0.2, 2.4, 0);
    scene.add(ant);

    // Water plane
    const waterGeo = new THREE.PlaneGeometry(20, 20, 30, 30);
    const waterMat = new THREE.MeshPhongMaterial({ color: 0x0a2a4a, transparent: true, opacity: 0.6, shininess: 100 });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.3;
    scene.add(water);

    // Floating dots
    const dotGeo = new THREE.BufferGeometry();
    const dots = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      dots[i * 3] = (Math.random() - 0.5) * 12;
      dots[i * 3 + 1] = -0.2 + Math.random() * 0.05;
      dots[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dots, 3));
    scene.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x29b6f6, size: 0.04, transparent: true, opacity: 0.3 })));

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xfff0d0, 2);
    sun.position.set(5, 8, 5);
    scene.add(sun);
    const rimLight = new THREE.PointLight(0x29b6f6, 1, 15);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    const waterPos = waterGeo.attributes.position.array as Float32Array;
    const origWater = waterPos.slice();

    let frame = 0;
    const grp = new THREE.Group();
    scene.children.slice(0, -4).forEach(c => grp.add(c));

    let animId: number;
    const animate = () => {
      frame++;
      const t = frame * 0.015;
      for (let i = 0; i < waterPos.length / 3; i++) {
        const x = origWater[i * 3]; const z = origWater[i * 3 + 2];
        waterPos[i * 3 + 2] = origWater[i * 3 + 2] + Math.sin(x * 0.5 + t) * 0.12;
      }
      waterGeo.attributes.position.needsUpdate = true;
      hull.position.y = Math.sin(t * 0.6) * 0.08;
      hullWire.position.y = Math.sin(t * 0.6) * 0.08;
      deck.position.y = 0.45 + Math.sin(t * 0.6) * 0.08;
      cabin.position.y = 0.9 + Math.sin(t * 0.6) * 0.08;
      bridge.position.y = 1.65 + Math.sin(t * 0.6) * 0.08;
      mast.position.y = 1.95 + Math.sin(t * 0.6) * 0.08;
      ant.position.y = 2.4 + Math.sin(t * 0.6) * 0.08;
      scene.rotation.y = Math.sin(t * 0.08) * 0.3;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}

export default function YachtCleaning() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['exterior']);
  const [selectedSize, setSelectedSize] = useState(1);
  const [step, setStep] = useState(1);

  const sizeFactor = SIZES[selectedSize].factor;
  const total = SERVICES.filter(s => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.basePrice * s.multiplier * sizeFactor, 0);

  const toggle = (id: string) => setSelectedServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#04090f', color: '#e8f4f8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 60px', background: 'rgba(4,9,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,169,110,0.08)' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 2, height: 28, background: '#c9a96e' }} />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.15em', color: '#c9a96e' }}>NAUTIL</div>
              <div style={{ fontSize: '0.5rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(232,244,248,0.35)', marginTop: '-3px' }}>Yacht Care Prestige</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Services', 'Processus', 'Flotte', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(232,244,248,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,244,248,0.5)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 24px' }}>Devis gratuit</button>
      </motion.nav>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(10,26,40,0.95) 0%, rgba(4,9,15,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=90" alt="Yacht" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18)' }} />
        </div>

        <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', opacity: 0.85 }}>
          <YachtModel />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 50%, transparent 25%, #04090f 70%)' }} />
        </div>

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '620px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e' }}>Soin Exclusif · Yachts & Superyachts</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '24px' }}
          >
            Votre yacht mérite<br />le <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>meilleur soin</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: 'rgba(232,244,248,0.55)', lineHeight: 1.7, maxWidth: '440px', marginBottom: '48px' }}
          >
            Protocoles professionnels. Produits éco-certifiés. Équipes formées aux standards des plus grands chantiers navals. Votre yacht, brillant comme au premier jour.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            style={{ display: 'flex', gap: '16px' }}
          >
            <button className="btn-solid-gold">Obtenir un devis</button>
            <button className="btn-premium">Voir nos services</button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '40px', marginTop: '60px' }}
          >
            {[['800+', 'Yachts entretenus'], ['15 ans', "d'expérience"], ['100%', 'Éco-responsable']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#c9a96e' }}>{v}</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,244,248,0.35)' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ESTIMATOR */}
      <section id="services" style={{ padding: '100px 60px', background: 'rgba(201,169,110,0.02)', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, marginBottom: '12px' }}>
              Configurez votre <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>prestation</span>
            </h2>
            <p style={{ color: 'rgba(232,244,248,0.45)', fontSize: '0.9rem' }}>Obtenez une estimation instantanée en quelques clics</p>
          </div>

          {/* Step 1 — Size selector */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>
              01 — Taille de votre yacht
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SIZES.map((s, i) => (
                <button key={i} onClick={() => setSelectedSize(i)}
                  style={{ padding: '12px 20px', border: `1px solid ${i === selectedSize ? '#c9a96e' : 'rgba(232,244,248,0.1)'}`, background: i === selectedSize ? 'rgba(201,169,110,0.1)' : 'transparent', color: i === selectedSize ? '#c9a96e' : 'rgba(232,244,248,0.6)', fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Services */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>
              02 — Services souhaités
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {SERVICES.map((s, i) => {
                const isOn = selectedServices.includes(s.id);
                const price = Math.round(s.basePrice * s.multiplier * sizeFactor);
                return (
                  <motion.div key={s.id} onClick={() => toggle(s.id)}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    style={{ padding: '24px', border: `1px solid ${isOn ? '#c9a96e' : 'rgba(232,244,248,0.06)'}`, background: isOn ? 'rgba(201,169,110,0.06)' : 'rgba(255,255,255,0.01)', cursor: 'pointer', transition: 'all 0.3s', position: 'relative' }}
                    whileHover={{ y: -3, borderColor: 'rgba(201,169,110,0.4)' }}
                  >
                    {isOn && <div style={{ position: 'absolute', top: 12, right: 12, width: 18, height: 18, background: '#c9a96e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#04090f', fontWeight: 700 }}>✓</div>}
                    <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', marginBottom: '8px' }}>{s.name}</div>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(232,244,248,0.45)', lineHeight: 1.5, marginBottom: '16px' }}>{s.desc}</p>
                    <div style={{ color: '#c9a96e', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>{price.toLocaleString('fr-FR')} €</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Total */}
          <AnimatePresence>
            {selectedServices.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ padding: '40px', border: '1px solid rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,244,248,0.4)', marginBottom: '8px' }}>
                    {SIZES[selectedSize].label} · {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: '#c9a96e' }}>
                    {Math.round(total).toLocaleString('fr-FR')} €
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.35)', marginTop: '4px' }}>Estimation TTC · Devis définitif gratuit</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button className="btn-solid-gold">Demander mon devis</button>
                  <button className="btn-premium" style={{ textAlign: 'center', fontSize: '0.7rem' }}>Appeler un expert</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(232,244,248,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e' }}>NAUTIL PRESTIGE</span>
        <span>© 2026 · Cannes · Monaco · Saint-Tropez</span>
      </footer>
    </div>
  );
}
