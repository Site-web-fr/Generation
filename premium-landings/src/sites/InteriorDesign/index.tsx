import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const STYLES = [
  { id: 'contemporary', name: 'Contemporain', palette: ['#f5f0e8', '#2c2c2c', '#c9a96e', '#e8e0d0'], accent: '#c9a96e' },
  { id: 'minimalist', name: 'Minimaliste', palette: ['#ffffff', '#1a1a1a', '#a0a0a0', '#f0f0f0'], accent: '#1a1a1a' },
  { id: 'neoclassic', name: 'Néo-Classique', palette: ['#f5f0e8', '#8b6914', '#2c2c4a', '#d4c4a0'], accent: '#8b6914' },
  { id: 'industrial', name: 'Industriel Luxe', palette: ['#1a1a1a', '#c9a96e', '#444444', '#888888'], accent: '#c9a96e' },
  { id: 'organic', name: 'Organique', palette: ['#e8f0e0', '#4a7c59', '#c8b88a', '#f5f0e0'], accent: '#4a7c59' },
];

const ROOMS = [
  { id: 'living', name: 'Salon', basePrice: 18000, icon: '🛋' },
  { id: 'bedroom', name: 'Chambre Master', basePrice: 14000, icon: '🛏' },
  { id: 'kitchen', name: 'Cuisine', basePrice: 22000, icon: '👨‍🍳' },
  { id: 'bathroom', name: 'Salle de Bain', basePrice: 12000, icon: '🛁' },
  { id: 'office', name: 'Bureau', basePrice: 9000, icon: '💻' },
  { id: 'dining', name: 'Salle à Manger', basePrice: 11000, icon: '🍽' },
];

const PORTFOLIO = [
  { title: 'Villa Privée, Cap-Ferret', style: 'Contemporain', surface: '420m²', img: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=700&q=80' },
  { title: 'Penthouse, Paris 8ème', style: 'Minimaliste', surface: '280m²', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=80' },
  { title: 'Hôtel 5★, Côte d\'Azur', style: 'Néo-Classique', surface: '1200m²', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=80' },
  { title: 'Loft Industriel, Lyon', style: 'Industriel Luxe', surface: '180m²', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80' },
];

function RoomScene({ colors }: { colors: string[] }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colors[0]);
    const camera = new THREE.PerspectiveCamera(65, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);

    const wallMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[3]) });
    const floorMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[2]), shininess: 40 });
    const furnitureMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[1]) });
    const accentMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[2]), shininess: 120 });

    // Room walls
    // Floor
    const floor = new THREE.Mesh(new THREE.BoxGeometry(8, 0.1, 8), floorMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Back wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 0.1), wallMat);
    backWall.position.set(0, 2.5, -4);
    scene.add(backWall);

    // Left wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5, 8), wallMat);
    leftWall.position.set(-4, 2.5, 0);
    scene.add(leftWall);

    // Sofa
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 1.2), furnitureMat);
    sofaBase.position.set(-0.5, 0.25, 0.5);
    scene.add(sofaBase);
    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3, 0.8, 0.2), furnitureMat);
    sofaBack.position.set(-0.5, 0.75, 1.05);
    scene.add(sofaBack);

    // Coffee table
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.7), accentMat);
    table.position.set(-0.5, 0.5, -0.8);
    scene.add(table);
    const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.48, 8), accentMat);
    [-0.5, 0.5].forEach(x => [-0.3, 0.3].forEach(z => {
      const leg = tableLeg.clone();
      leg.position.set(-0.5 + x * 0.8, 0.24, -0.8 + z * 0.4);
      scene.add(leg);
    }));

    // Lamp
    const lampStand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2, 8), accentMat);
    lampStand.position.set(-3, 1, -0.5);
    scene.add(lampStand);
    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.4, 12, 1, true), new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[3]), side: THREE.DoubleSide }));
    lampShade.position.set(-3, 2.2, -0.5);
    scene.add(lampShade);

    // Art frame on wall
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 0.05), furnitureMat);
    frame.position.set(0.5, 2.5, -3.95);
    scene.add(frame);
    const artwork = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1, 0.02), new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[2]) }));
    artwork.position.set(0.5, 2.5, -3.91);
    scene.add(artwork);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const warmLight = new THREE.PointLight(new THREE.Color(0xfff0d0), 2, 15);
    warmLight.position.set(-3, 2.2, -0.5);
    scene.add(warmLight);
    const sunLight = new THREE.DirectionalLight(0xfff8f0, 1.5);
    sunLight.position.set(5, 8, 5);
    scene.add(sunLight);
    const accentLight = new THREE.PointLight(new THREE.Color(colors[2]), 0.8, 10);
    accentLight.position.set(2, 3, -2);
    scene.add(accentLight);

    let frame_ = 0;
    let animId: number;
    const animate = () => {
      frame_++;
      const t = frame_ * 0.005;
      camera.position.x = 5 + Math.sin(t * 0.2) * 0.5;
      camera.lookAt(0, 0.5, 0);
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, [colors]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}

export default function InteriorDesign() {
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['living', 'bedroom']);
  const [sqm, setSqm] = useState(150);

  const style = selectedStyle;
  const totalRooms = ROOMS.filter(r => selectedRooms.includes(r.id)).reduce((s, r) => s + r.basePrice, 0);
  const sqmFactor = sqm / 100;
  const totalEstimate = Math.round(totalRooms * sqmFactor * (1 + 0.2));

  const toggleRoom = (id: string) => setSelectedRooms(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#080808', color: '#ede8df', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 60px', background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,169,110,0.07)' }}
      >
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.15em', color: '#c9a96e' }}>
          FORM<span style={{ color: 'rgba(237,232,223,0.4)' }}> & </span>MATTER
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Studio', 'Portfolio', 'Devis', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(237,232,223,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,232,223,0.5)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 24px' }}>Consultation</button>
      </motion.nav>

      {/* HERO — 3D ROOM CONFIGURATOR */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div key={selectedStyle.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ position: 'absolute', inset: 0 }}>
              <RoomScene colors={selectedStyle.palette} />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.92) 35%, rgba(8,8,8,0.1) 100%)' }} />
        </div>

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '560px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e' }}>Architecture d'intérieur · Prestige</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '24px' }}
          >
            Votre espace,<br /><em style={{ color: '#c9a96e', fontStyle: 'italic' }}>votre signature</em>
          </motion.h1>

          {/* Style selector */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,232,223,0.45)', marginBottom: '12px' }}>Style actuel: {selectedStyle.name}</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {STYLES.map(s => (
                <button key={s.id} onClick={() => setSelectedStyle(s)}
                  style={{ padding: '6px 14px', fontSize: '0.72rem', border: `1px solid ${s.id === selectedStyle.id ? '#c9a96e' : 'rgba(237,232,223,0.12)'}`, background: s.id === selectedStyle.id ? 'rgba(201,169,110,0.1)' : 'transparent', color: s.id === selectedStyle.id ? '#c9a96e' : 'rgba(237,232,223,0.5)', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-solid-gold">Démarrer mon projet</button>
            <button className="btn-premium">Portfolio</button>
          </motion.div>
        </motion.div>
      </section>

      {/* ESTIMATOR */}
      <section style={{ padding: '100px 60px', background: 'rgba(201,169,110,0.02)', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '60px' }}>
            Estimateur de <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>projet</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>
                  Surface totale: {sqm} m²
                </label>
                <input type="range" min={50} max={1000} step={10} value={sqm} onChange={e => setSqm(+e.target.value)} style={{ width: '100%', accentColor: '#c9a96e' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(237,232,223,0.25)', marginTop: '4px' }}><span>50m²</span><span>1000m²</span></div>
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>Pièces à aménager</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {ROOMS.map(r => {
                    const isOn = selectedRooms.includes(r.id);
                    return (
                      <div key={r.id} onClick={() => toggleRoom(r.id)}
                        style={{ padding: '12px 16px', border: `1px solid ${isOn ? '#c9a96e' : 'rgba(237,232,223,0.07)'}`, background: isOn ? 'rgba(201,169,110,0.07)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', transition: 'all 0.3s' }}
                      >
                        <span>{r.icon}</span>
                        <span style={{ color: isOn ? '#ede8df' : 'rgba(237,232,223,0.5)' }}>{r.name}</span>
                        {isOn && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#c9a96e' }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ROOMS.filter(r => selectedRooms.includes(r.id)).map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '8px 0', borderBottom: '1px solid rgba(237,232,223,0.05)' }}>
                  <span style={{ color: 'rgba(237,232,223,0.6)' }}>{r.icon} {r.name}</span>
                  <span style={{ color: '#c9a96e' }}>{Math.round(r.basePrice * sqmFactor).toLocaleString('fr-FR')} €</span>
                </div>
              ))}
              {selectedRooms.length === 0 && <p style={{ color: 'rgba(237,232,223,0.3)', fontStyle: 'italic', fontSize: '0.85rem' }}>Sélectionnez des pièces...</p>}
              {selectedRooms.length > 0 && (
                <div style={{ marginTop: 'auto', padding: '24px', background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)' }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(237,232,223,0.4)', marginBottom: '8px' }}>
                    Estimation projet · {selectedStyle.name}
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, color: '#c9a96e' }}>
                    {totalEstimate.toLocaleString('fr-FR')} €
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(237,232,223,0.3)', marginTop: '8px' }}>TVA incluse · Hors fournitures</p>
                  <button className="btn-solid-gold" style={{ width: '100%', marginTop: '16px', textAlign: 'center' }}>Demander un devis précis</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: '80px 60px 100px' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', marginBottom: '50px' }}>
          Réalisations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {PORTFOLIO.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              whileHover={{ y: -4 }}
            >
              <img src={p.img} alt={p.title} style={{ width: '100%', height: '260px', objectFit: 'cover', filter: 'brightness(0.7)', transition: 'transform 0.6s, filter 0.6s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(0.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.7)'; }}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(8,8,8,0.95), transparent)' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', marginBottom: '4px' }}>{p.title}</div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', color: 'rgba(237,232,223,0.5)' }}>
                  <span>{p.style}</span><span>·</span><span>{p.surface}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(237,232,223,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e', letterSpacing: '0.1em' }}>FORM & MATTER</span>
        <span>© 2026 · Studio Paris · +33 1 00 00 00 00</span>
      </footer>
    </div>
  );
}
