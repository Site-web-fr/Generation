import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const TIERS = [
  { id: 'black', name: 'Black', price: 15000, billing: '/an', color: '#1a1a1a', accent: '#c9a96e', features: ['Conciergerie 24/7', '50 requêtes/mois', 'Lifestyle manager dédié', 'Réservations prioritaires', 'Accès réseau partenaires'] },
  { id: 'onyx', name: 'Onyx', price: 35000, billing: '/an', color: '#0d0d12', accent: '#e8d5a3', features: ['Tout Black +', 'Requêtes illimitées', 'Manager dédié exclusif', 'Jet privé à tarif préférentiel', 'Accès événements VIP', 'Service voyages sur-mesure'] },
  { id: 'titanium', name: 'Titanium', price: 0, billing: 'Sur invitation', color: '#080808', accent: '#f0f0f0', features: ['Service blanc complet', 'Équipe dédiée 4 personnes', 'Résidence secondaire gérée', 'Sécurité rapprochée', 'Intelligence économique', 'Accès cercle privé mondial'] },
];

const SERVICES = [
  { id: 'travel', icon: '✈', name: 'Voyages & Transferts', desc: 'Organisation complète de vos déplacements. Jets privés, suites présidentielles, transferts blindés.', examples: ['Villa à Ibiza pour 20 personnes', 'Safari privé au Kenya', 'Yacht en Méditerranée'] },
  { id: 'events', icon: '🎭', name: 'Événements Exclusifs', desc: 'Accès aux événements les plus fermés du monde. Festivals, galas, avant-premières, matchs VIP.', examples: ['Loges F1 Monaco', 'Oscars & afterparties', 'Fashion Week front row'] },
  { id: 'real', icon: '🏛', name: 'Real Estate Mondial', desc: 'Accès à des propriétés off-market dans les destinations les plus prisées du monde.', examples: ['Penthouse NYC', 'Villa Côte d\'Azur', 'Chalet Megève privé'] },
  { id: 'lifestyle', icon: '💎', name: 'Lifestyle Premium', desc: 'Votre vie organisée dans les moindres détails. Du pressing au chef privé, de la nourrice au PA.', examples: ['Personal shopper Hermès', 'Chef étoilé à domicile', 'Sécurité rapprochée'] },
  { id: 'health', icon: '⚕', name: 'Santé & Bien-être', desc: 'Accès immédiat aux meilleurs spécialistes mondiaux. Bilan de santé, médecine préventive, spa.', examples: ['Clinique Mayo express', 'Médecin 24/7 à domicile', 'Retraite wellness privée'] },
  { id: 'edu', icon: '🎓', name: 'Éducation & Carrière', desc: 'Admission dans les meilleures institutions mondiales. Mentoring et réseau d\'élite.', examples: ['Admission Harvard', 'Coaching exécutif', 'Réseau alumni exclusif'] },
];

function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Globe
    const globeGeo = new THREE.SphereGeometry(1.8, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x0a1628,
      wireframe: false,
      transparent: true,
      opacity: 0.6,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    const wireGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xc9a96e, wireframe: true, transparent: true, opacity: 0.08 })
    );
    scene.add(wireGlobe);

    // Latitude lines
    for (let lat = -75; lat <= 75; lat += 25) {
      const r = Math.cos((lat * Math.PI) / 180) * 1.82;
      const y = Math.sin((lat * Math.PI) / 180) * 1.82;
      const lineGeo = new THREE.TorusGeometry(r, 0.003, 8, 64);
      const lineMesh = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.12 }));
      lineMesh.rotation.x = Math.PI / 2;
      lineMesh.position.y = y;
      scene.add(lineMesh);
    }

    // Longitude lines
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI;
      const lineGeo = new THREE.TorusGeometry(1.82, 0.003, 8, 64);
      const lineMesh = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.08 }));
      lineMesh.rotation.y = angle;
      scene.add(lineMesh);
    }

    // City dots (major cities)
    const cities = [
      { lat: 48.8, lon: 2.3 },   // Paris
      { lat: 25.2, lon: 55.3 },  // Dubai
      { lat: 40.7, lon: -74.0 }, // NYC
      { lat: 51.5, lon: -0.1 },  // London
      { lat: 35.7, lon: 139.7 }, // Tokyo
      { lat: -33.8, lon: 151.2 }, // Sydney
      { lat: 19.4, lon: -99.1 }, // Mexico
      { lat: -23.5, lon: -46.6 }, // São Paulo
      { lat: 1.3, lon: 103.8 },  // Singapore
      { lat: 55.7, lon: 37.6 },  // Moscow
    ];

    cities.forEach(({ lat, lon }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(1.85 * Math.sin(phi) * Math.cos(theta));
      const z = (1.85 * Math.sin(phi) * Math.sin(theta));
      const y = (1.85 * Math.cos(phi));

      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dot = new THREE.Mesh(dotGeo, new THREE.MeshPhongMaterial({ color: 0xc9a96e, emissive: 0xc9a96e, emissiveIntensity: 0.8 }));
      dot.position.set(x, y, z);
      scene.add(dot);

      // Glow light
      const light = new THREE.PointLight(0xc9a96e, 0.3, 1);
      light.position.set(x, y, z);
      scene.add(light);
    });

    // Connection arcs
    const arcMat = new THREE.LineBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.2 });
    const connectPairs = [[0, 1], [0, 2], [1, 3], [2, 8], [3, 4], [1, 9]];
    connectPairs.forEach(([a, b]) => {
      const ca = cities[a]; const cb = cities[b];
      const points = [];
      for (let t = 0; t <= 20; t++) {
        const tt = t / 20;
        const phi = (90 - (ca.lat + (cb.lat - ca.lat) * tt)) * (Math.PI / 180);
        const theta = ((ca.lon + (cb.lon - ca.lon) * tt) + 180) * (Math.PI / 180);
        const r = 1.9 + Math.sin(tt * Math.PI) * 0.4;
        points.push(new THREE.Vector3(
          -(r * Math.sin(phi) * Math.cos(theta)),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ));
      }
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      scene.add(new THREE.Line(arcGeo, arcMat));
    });

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 30;
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.5 })));

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const sunLight = new THREE.DirectionalLight(0xfff0d0, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      const t = frame * 0.003;
      globe.rotation.y = t * 0.5;
      wireGlobe.rotation.y = t * 0.5;
      scene.children.forEach(child => {
        if (child.userData.isGlobeChild) child.rotation.y = t * 0.5;
      });
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

export default function ConciergeService() {
  const [selectedTier, setSelectedTier] = useState('onyx');
  const [activeService, setActiveService] = useState<string | null>(null);
  const [requestText, setRequestText] = useState('');

  const tier = TIERS.find(t => t.id === selectedTier)!;

  return (
    <div style={{ background: '#050508', color: '#e8e4dc', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 60px', background: 'rgba(5,5,8,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,169,110,0.07)' }}
      >
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '0.25em', color: '#c9a96e' }}>AURUM</div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.6em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.3)', marginTop: '-2px' }}>Conciergerie d'Exception</div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Services', 'Memberships', 'Demande', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(232,228,220,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,220,0.5)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 28px' }}>Demande privée</button>
      </motion.nav>

      {/* HERO */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <GlobeScene />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,8,0.95) 40%, rgba(5,5,8,0.2))' }} />

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '620px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e' }}>Conciergerie · Disponible partout dans le monde</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '24px' }}
          >
            Le monde<br />à votre <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>service</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: 'rgba(232,228,220,0.55)', lineHeight: 1.7, maxWidth: '430px', marginBottom: '48px' }}
          >
            Aurum Conciergerie met à votre disposition un réseau mondial d'experts de l'excellence. 24h/24, 7j/7, où que vous soyez sur la planète.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-solid-gold">Devenir membre</button>
            <button className="btn-premium">Faire une demande</button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '40px', marginTop: '60px' }}
          >
            {[['3 min', 'Temps de réponse moyen'], ['180+', 'Pays couverts'], ['100%', 'Confidentialité garantie']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#c9a96e' }}>{v}</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.35)' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '100px 60px', background: 'rgba(201,169,110,0.02)', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, textAlign: 'center', marginBottom: '60px' }}>
          Nos <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Domaines d'Expertise</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {SERVICES.map((s, i) => {
            const isActive = activeService === s.id;
            return (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => setActiveService(isActive ? null : s.id)}
                whileHover={{ y: -4 }}
                style={{ padding: '32px', border: `1px solid ${isActive ? '#c9a96e' : 'rgba(232,228,220,0.07)'}`, background: isActive ? 'rgba(201,169,110,0.06)' : 'rgba(255,255,255,0.01)', cursor: 'pointer', transition: 'all 0.35s' }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', marginBottom: '10px' }}>{s.name}</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(232,228,220,0.5)', lineHeight: 1.6, marginBottom: isActive ? '16px' : 0 }}>{s.desc}</p>
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '8px' }}>Exemples récents</div>
                      {s.examples.map(ex => (
                        <div key={ex} style={{ fontSize: '0.78rem', color: 'rgba(232,228,220,0.65)', padding: '4px 0', display: 'flex', gap: '8px' }}>
                          <span style={{ color: '#c9a96e', fontSize: '0.6rem' }}>✦</span>{ex}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="memberships" style={{ padding: '80px 60px 100px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, textAlign: 'center', marginBottom: '60px' }}>
          Accès <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Memberships</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1000px', margin: '0 auto 60px' }}>
          {TIERS.map((t, i) => {
            const isSelected = selectedTier === t.id;
            return (
              <motion.div key={t.id} onClick={() => setSelectedTier(t.id)}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{ padding: '40px 32px', background: isSelected ? `rgba(201,169,110,0.08)` : `rgba(255,255,255,0.01)`, border: `1px solid ${isSelected ? '#c9a96e' : 'rgba(232,228,220,0.07)'}`, cursor: 'pointer', transition: 'all 0.35s', position: 'relative' }}
              >
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: t.accent, marginBottom: '8px' }}>Aurum</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: t.accent, marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: t.price === 0 ? '1.5rem' : '2.4rem', color: '#e8e4dc', marginBottom: '4px' }}>
                  {t.price === 0 ? t.billing : `${t.price.toLocaleString('fr-FR')} €`}
                </div>
                {t.price > 0 && <div style={{ fontSize: '0.7rem', color: 'rgba(232,228,220,0.35)', marginBottom: '24px' }}>{t.billing}</div>}
                <div style={{ height: '1px', background: `rgba(201,169,110,0.15)`, margin: '20px 0' }} />
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {t.features.map(f => (
                    <li key={f} style={{ fontSize: '0.8rem', color: 'rgba(232,228,220,0.65)', padding: '6px 0', display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ color: t.accent, fontSize: '0.6rem' }}>✦</span>{f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* REQUEST FORM */}
      <section style={{ padding: '60px 60px 100px', background: 'rgba(201,169,110,0.03)', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, textAlign: 'center', marginBottom: '12px' }}>
            Faites une <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>demande privée</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(232,228,220,0.45)', marginBottom: '40px', fontSize: '0.85rem' }}>
            Décrivez votre besoin. Nous vous répondons dans les 3 minutes.
          </p>
          <textarea
            value={requestText}
            onChange={e => setRequestText(e.target.value)}
            placeholder="Je souhaite organiser un dîner privé pour 12 personnes sur un yacht à Monaco pour le week-end du Grand Prix..."
            rows={5}
            style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,228,220,0.1)', padding: '20px', color: '#e8e4dc', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'DM Sans', lineHeight: 1.7, marginBottom: '16px', transition: 'border-color 0.3s' }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(232,228,220,0.1)')}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {['Nom & Prénom', 'Téléphone / WhatsApp'].map(p => (
              <input key={p} placeholder={p} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,228,220,0.1)', padding: '12px 16px', color: '#e8e4dc', fontSize: '0.9rem', outline: 'none', fontFamily: 'DM Sans', transition: 'border-color 0.3s' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(232,228,220,0.1)')}
              />
            ))}
          </div>
          <button className="btn-solid-gold" style={{ width: '100%', padding: '16px' }}>
            Envoyer ma demande confidentielle
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(232,228,220,0.25)', marginTop: '12px' }}>
            🔒 Toutes vos demandes sont strictement confidentielles et chiffrées
          </p>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'rgba(232,228,220,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e', letterSpacing: '0.25em' }}>AURUM</span>
        <span>Paris · Dubai · New York · Singapore · +33 1 00 00 00 00</span>
        <span>© 2026 · Strictement Confidentiel</span>
      </footer>
    </div>
  );
}
