import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const MENU_SECTIONS = [
  {
    name: 'Amuse-bouche',
    items: [
      { name: 'Caviar Osciètre & Blinis', price: 48, desc: 'Caviar d\'esturgeon Osciètre, blinis au beurre clarifié, crème fraîche fumée', badge: 'Signature' },
      { name: 'Huîtres de Cancale', price: 36, desc: 'Huîtres numéro 2, granité à la pomme verte, concombre et gingembre', badge: null },
    ]
  },
  {
    name: 'Entrées',
    items: [
      { name: 'Foie Gras Torchon', price: 62, desc: 'Foie gras mi-cuit, brioche toastée, chutney de figues au Porto', badge: 'Classique' },
      { name: 'Homard Bleu Breton', price: 78, desc: 'Homard en médaillon, bisque crémée, émulsion de yuzu, caviar végétal', badge: 'Chef' },
      { name: 'Saint-Jacques de Plongée', price: 58, desc: 'Noix snackées, velouté de butternut, truffe noire râpée et huile de noisette', badge: null },
    ]
  },
  {
    name: 'Plats',
    items: [
      { name: 'Bœuf Wagyu A5', price: 145, desc: 'Filet de Wagyu japonais A5, jus corsé au porto, pommes soufflées, légumes du moment', badge: 'Signature' },
      { name: 'Turbot Sauvage', price: 92, desc: 'Turbot de ligne, nage de coquillages, beurre blanc au champagne Krug', badge: null },
      { name: 'Pigeon de Bresse', price: 88, desc: 'Pigeon rôti entier, cromesquis du foie, jus à l\'armagnac, cèpes et pomme Anna', badge: 'Chef' },
    ]
  },
  {
    name: 'Desserts',
    items: [
      { name: 'Grand Cru Chocolate', price: 32, desc: 'Fondant au chocolat Valrhona 72%, glace au caramel salé, tuile croustillante', badge: 'Signature' },
      { name: 'Soufflé Grand Marnier', price: 28, desc: 'Soufflé chaud, crème anglaise à la vanille de Madagascar, orange confite', badge: null },
      { name: 'Mille-Feuille Revisité', price: 30, desc: 'Feuilletage caramélisé, crème diplomate légère, fraises Mara des Bois', badge: null },
    ]
  },
];

const TABLES = [
  { id: 1, x: 15, y: 20, seats: 2, type: 'Intime', available: true },
  { id: 2, x: 35, y: 20, seats: 4, type: 'Famille', available: true },
  { id: 3, x: 55, y: 20, seats: 2, type: 'Fenêtre', available: false },
  { id: 4, x: 75, y: 20, seats: 6, type: 'Groupe', available: true },
  { id: 5, x: 15, y: 55, seats: 2, type: 'Coin', available: true },
  { id: 6, x: 35, y: 55, seats: 4, type: 'Central', available: false },
  { id: 7, x: 55, y: 55, seats: 4, type: 'Jardin', available: true },
  { id: 8, x: 75, y: 55, seats: 8, type: 'Privé', available: true },
  { id: 9, x: 25, y: 82, seats: 2, type: 'Bar', available: true },
  { id: 10, x: 65, y: 82, seats: 12, type: 'Salon', available: false },
];

function RestaurantScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05030a);
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const darkWood = new THREE.MeshPhongMaterial({ color: 0x1a1008, shininess: 30 });
    const cream = new THREE.MeshPhongMaterial({ color: 0xf5f0e8, shininess: 20 });
    const gold = new THREE.MeshPhongMaterial({ color: 0xc9a96e, shininess: 180, emissive: 0xc9a96e, emissiveIntensity: 0.1 });
    const glass = new THREE.MeshPhongMaterial({ color: 0x88aacc, transparent: true, opacity: 0.5, shininess: 200 });

    // Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(12, 0.08, 10), darkWood);
    floor.position.y = -0.05;
    scene.add(floor);

    // Tables
    const tablePositions = [[-3, 0, -2], [0, 0, -2], [3, 0, -2], [-3, 0, 1], [0, 0, 1], [3, 0, 1]];
    tablePositions.forEach(([x, y, z]) => {
      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 16), cream);
      tableTop.position.set(x, y + 0.75, z);
      scene.add(tableTop);

      // Gold trim
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.02, 8, 32), gold);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x, y + 0.78, z);
      scene.add(rim);

      // Table leg
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.7, 8), new THREE.MeshPhongMaterial({ color: 0x8b6914 }));
      leg.position.set(x, y + 0.35, z);
      scene.add(leg);

      // Wine glasses
      for (let g = -0.2; g <= 0.2; g += 0.4) {
        const stemGeo = new THREE.CylinderGeometry(0.015, 0.03, 0.2, 8);
        const stem = new THREE.Mesh(stemGeo, glass);
        stem.position.set(x + g * 0.8, y + 0.85, z + g * 0.3);
        scene.add(stem);
        const cupGeo = new THREE.CylinderGeometry(0.06, 0.03, 0.1, 12);
        const cup = new THREE.Mesh(cupGeo, glass);
        cup.position.set(x + g * 0.8, y + 0.97, z + g * 0.3);
        scene.add(cup);
      }

      // Candle
      const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.15, 8), cream);
      candle.position.set(x, y + 0.83, z);
      scene.add(candle);
      const flame = new THREE.PointLight(0xffa040, 0.5, 2);
      flame.position.set(x, y + 0.95, z);
      scene.add(flame);
    });

    // Chandelier
    const chandelierMain = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.05, 24), gold);
    chandelierMain.position.set(0, 4, 0);
    scene.add(chandelierMain);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const bulbLight = new THREE.PointLight(0xfff0d0, 0.3, 4);
      bulbLight.position.set(Math.cos(angle) * 0.7, 3.9, Math.sin(angle) * 0.7);
      scene.add(bulbLight);
    }

    // Walls
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(12, 5, 0.1), new THREE.MeshPhongMaterial({ color: 0x0a0810 }));
    backWall.position.set(0, 2.5, -5);
    scene.add(backWall);

    // Decorative gold columns
    for (let i = -4; i <= 4; i += 8) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 12), gold);
      col.position.set(i, 2, -5);
      scene.add(col);
    }

    const ambient = new THREE.AmbientLight(0x1a0a05, 1);
    scene.add(ambient);

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      const t = frame * 0.005;
      camera.position.x = Math.sin(t * 0.1) * 1;
      camera.lookAt(0, 0.5, 0);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default function FineDining() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('dîner');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');

  return (
    <div style={{ background: '#05030a', color: '#f0ead8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 60px', background: 'rgba(5,3,10,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,169,110,0.07)' }}
      >
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 400, letterSpacing: '0.15em', color: '#c9a96e' }}>LE CÉNACLE</div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,234,216,0.3)', marginTop: '-2px' }}>Restaurant Gastronomique · 3 Étoiles</div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Menu', 'Plan', 'Chef', 'Réserver'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(240,234,216,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,234,216,0.5)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 28px' }}>Réserver une table</button>
      </motion.nav>

      {/* HERO */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <RestaurantScene />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,3,10,0.9) 35%, rgba(5,3,10,0.2))' }} />
        <motion.div style={{ position: 'absolute', top: '50%', left: '60px', transform: 'translateY(-50%)', zIndex: 2, maxWidth: '580px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a96e' }}>★★★ Guide Michelin</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '20px' }}
          >
            Une symphonie<br />de <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>saveurs</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: 'rgba(240,234,216,0.55)', lineHeight: 1.7, maxWidth: '400px', marginBottom: '40px' }}
          >
            Le Chef Alexandre Laurent crée une cuisine de haute gastronomie française, mariée aux meilleurs produits de saison, dans un cadre intimiste de prestige absolu.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-solid-gold">Réserver maintenant</button>
            <button className="btn-premium">Découvrir le menu</button>
          </motion.div>
        </motion.div>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: '100px 60px', background: 'rgba(201,169,110,0.02)', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, marginBottom: '8px' }}>La Carte</h2>
            <p style={{ color: 'rgba(240,234,216,0.4)', fontSize: '0.8rem', fontStyle: 'italic' }}>Produits de saison · Circuits courts · Excellence française</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '40px' }}>
            {MENU_SECTIONS.map((s, i) => (
              <button key={i} onClick={() => setActiveSection(i)}
                style={{ padding: '10px 20px', background: i === activeSection ? 'rgba(201,169,110,0.12)' : 'transparent', border: `1px solid ${i === activeSection ? '#c9a96e' : 'rgba(240,234,216,0.08)'}`, color: i === activeSection ? '#c9a96e' : 'rgba(240,234,216,0.5)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
              >{s.name}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
              {MENU_SECTIONS[activeSection].items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  style={{ padding: '28px 0', borderBottom: '1px solid rgba(201,169,110,0.08)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 400 }}>{item.name}</span>
                      {item.badge && <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e' }}>{item.badge}</span>}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(240,234,216,0.45)', lineHeight: 1.6, fontStyle: 'italic' }}>{item.desc}</p>
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#c9a96e', whiteSpace: 'nowrap' }}>{item.price} €</div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* TABLE PLAN */}
      <section id="plan" style={{ padding: '80px 60px 100px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, marginBottom: '20px' }}>
              Choisissez<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>votre table</em>
            </h2>
            <p style={{ color: 'rgba(240,234,216,0.5)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '32px' }}>
              Sélectionnez votre emplacement préféré sur le plan de la salle.
            </p>
            {selectedTable && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '24px', background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)', marginBottom: '24px' }}
              >
                {(() => {
                  const t = TABLES.find(tb => tb.id === selectedTable)!;
                  return <>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#c9a96e', marginBottom: '8px' }}>Table {t.id} · {t.type}</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(240,234,216,0.6)' }}>{t.seats} couverts max</div>
                  </>;
                })()}
              </motion.div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,234,216,0.4)', marginBottom: '8px' }}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,234,216,0.1)', padding: '10px 14px', color: '#f0ead8', fontSize: '0.85rem', outline: 'none', fontFamily: 'DM Sans' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,234,216,0.4)', marginBottom: '8px' }}>Heure</label>
                <select value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,234,216,0.1)', padding: '10px 14px', color: '#f0ead8', fontSize: '0.85rem', outline: 'none', fontFamily: 'DM Sans', cursor: 'pointer' }}>
                  {['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(t => <option key={t} value={t} style={{ background: '#0a0810' }}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,234,216,0.4)', marginBottom: '8px' }}>
                Occasion
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['dîner', 'anniversaire', 'romantique', 'affaires', 'célébration'].map(o => (
                  <button key={o} onClick={() => setOccasion(o)} style={{ padding: '6px 14px', fontSize: '0.72rem', border: `1px solid ${o === occasion ? '#c9a96e' : 'rgba(240,234,216,0.1)'}`, background: o === occasion ? 'rgba(201,169,110,0.1)' : 'transparent', color: o === occasion ? '#c9a96e' : 'rgba(240,234,216,0.5)', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.3s' }}>{o}</button>
                ))}
              </div>
            </div>
            <button className="btn-solid-gold" style={{ width: '100%', textAlign: 'center' }}>Confirmer la réservation</button>
          </div>

          {/* Floor plan */}
          <div style={{ background: 'rgba(201,169,110,0.03)', border: '1px solid rgba(201,169,110,0.1)', padding: '20px', position: 'relative', aspectRatio: '1.3' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,234,216,0.3)', marginBottom: '8px', textAlign: 'center' }}>Plan de Salle</div>
            <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 24px)' }}>
              {/* Room outline */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
                <rect x="2" y="5" width="96" height="92" fill="none" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
                <text x="5" y="102" fontSize="3" fill="rgba(201,169,110,0.3)">Entrée</text>
                <rect x="40" y="96" width="20" height="4" fill="rgba(201,169,110,0.1)" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
              </svg>
              {TABLES.map(t => (
                <motion.button
                  key={t.id}
                  onClick={() => t.available ? setSelectedTable(t.id === selectedTable ? null : t.id) : null}
                  whileHover={t.available ? { scale: 1.15 } : {}}
                  style={{
                    position: 'absolute',
                    left: `${t.x}%`,
                    top: `${t.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: t.seats > 6 ? 36 : t.seats > 4 ? 28 : 22,
                    height: t.seats > 6 ? 36 : t.seats > 4 ? 28 : 22,
                    borderRadius: t.seats <= 2 ? '50%' : '4px',
                    background: !t.available ? 'rgba(100,50,50,0.4)' : selectedTable === t.id ? '#c9a96e' : 'rgba(201,169,110,0.15)',
                    border: `1px solid ${!t.available ? 'rgba(180,80,80,0.4)' : selectedTable === t.id ? '#c9a96e' : 'rgba(201,169,110,0.35)'}`,
                    cursor: t.available ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', fontWeight: 700,
                    color: selectedTable === t.id ? '#05030a' : 'rgba(201,169,110,0.7)',
                    boxShadow: selectedTable === t.id ? '0 0 12px rgba(201,169,110,0.4)' : 'none',
                  }}
                  title={`Table ${t.id} · ${t.type} · ${t.seats} places · ${t.available ? 'Disponible' : 'Réservée'}`}
                >
                  {t.id}
                </motion.button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
              {[['Disponible', '#c9a96e'], ['Réservée', 'rgba(180,80,80,0.5)'], ['Sélectionnée', '#c9a96e']].map(([label, color]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.6rem', color: 'rgba(240,234,216,0.4)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, border: label === 'Disponible' ? '1px solid rgba(201,169,110,0.35)' : 'none' }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'rgba(240,234,216,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e', letterSpacing: '0.15em' }}>LE CÉNACLE</span>
        <span>15 Rue de la Paix, Paris 2ème · +33 1 00 00 00 00</span>
        <span>© 2026 · 3 Étoiles Michelin</span>
      </footer>
    </div>
  );
}
