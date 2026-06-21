import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const PROPERTIES = [
  { id: 1, name: 'Villa Horizon', location: 'Cap-Ferret, Bordeaux', price: 4200000, surface: 450, rooms: 6, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', tag: 'Exclusivité' },
  { id: 2, name: 'Penthouse Le Marais', location: 'Paris 3ème', price: 3800000, surface: 280, rooms: 5, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', tag: 'Vue 360°' },
  { id: 3, name: 'Mas Provençal', location: 'Saint-Rémy-de-Provence', price: 2100000, surface: 520, rooms: 8, img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', tag: 'Coup de cœur' },
  { id: 4, name: 'Chalet Blanc', location: 'Courchevel 1850', price: 5600000, surface: 380, rooms: 7, img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', tag: 'Ski in/out' },
  { id: 5, name: 'Villa Azur', location: 'Saint-Jean-Cap-Ferrat', price: 8900000, surface: 680, rooms: 9, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', tag: 'Bord de mer' },
  { id: 6, name: 'Hôtel Particulier', location: 'Paris 16ème', price: 6200000, surface: 420, rooms: 7, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', tag: 'Prestige' },
];

const SERVICES = [
  { icon: '◈', title: 'Mandat Exclusif', desc: 'Commercialisation premium avec présence internationale sur les plateformes de luxe.' },
  { icon: '◉', title: 'Home Staging', desc: 'Mise en scène professionnelle de votre bien pour maximiser son potentiel.' },
  { icon: '◇', title: 'Visite Virtuelle 3D', desc: 'Visite immersive en réalité virtuelle disponible 24h/24 pour vos acheteurs.' },
  { icon: '◆', title: 'Conseil Juridique', desc: 'Accompagnement notarial et juridique complet sur toutes vos transactions.' },
];

function ThreeDBuilding() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(5, 4, 8);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const gold = new THREE.MeshPhongMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.3 });
    const wireGold = new THREE.MeshBasicMaterial({ color: 0xc9a96e, wireframe: true, transparent: true, opacity: 0.5 });

    // Building floors
    const floors: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const floorGeo = new THREE.BoxGeometry(2 - i * 0.05, 0.3, 2 - i * 0.05);
      const floor = new THREE.Mesh(floorGeo, wireGold);
      floor.position.y = i * 0.5;
      scene.add(floor);
      floors.push(floor);

      const solidFloor = new THREE.Mesh(floorGeo, gold);
      solidFloor.position.y = i * 0.5;
      scene.add(solidFloor);
    }

    // Ground plane grid
    const gridHelper = new THREE.GridHelper(12, 12, 0xc9a96e, 0xc9a96e);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.08;
    scene.add(gridHelper);

    // Floating particles
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xc9a96e, size: 0.04, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xc9a96e, 3, 15);
    pointLight.position.set(4, 6, 4);
    scene.add(pointLight);

    let frame = 0;
    const animate = () => {
      frame++;
      const t = frame * 0.005;
      scene.rotation.y = t * 0.3;
      particles.rotation.y = -t * 0.1;
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

export default function RealEstate() {
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [surfaceFilter, setSurfaceFilter] = useState(0);
  const [activeProperty, setActiveProperty] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filteredProperties = PROPERTIES.filter(p =>
    p.price >= priceRange[0] &&
    p.price <= priceRange[1] &&
    p.surface >= surfaceFilter
  );

  return (
    <div style={{ background: '#07080d', color: '#f0eed8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 60px',
          background: 'rgba(7,8,13,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,169,110,0.08)',
        }}
      >
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.15em', color: '#f0eed8' }}>
            PRESTIGE<span style={{ color: '#c9a96e' }}>·</span>IMMOBILIER
          </div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(240,238,216,0.35)', marginTop: '-2px' }}>Agence de Prestige</div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {['Biens', 'Services', 'Expertise', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(240,238,216,0.6)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,238,216,0.6)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 24px' }}>Estimation Gratuite</button>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90"
            alt="Luxury Property"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,8,13,0.95) 40%, rgba(7,8,13,0.3) 100%)' }} />
        </div>

        {/* 3D Building overlay */}
        <div style={{ position: 'absolute', right: '5%', top: '10%', width: '45%', height: '80%', opacity: 0.7 }}>
          <ThreeDBuilding />
        </div>

        <motion.div style={{ y: heroY, position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '660px' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e' }}>Immobilier d'Exception</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '28px' }}
          >
            Votre résidence<br />de <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>prestige</em><br />vous attend
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ color: 'rgba(240,238,216,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '430px', marginBottom: '48px' }}
          >
            200 biens d'exception. Un réseau international. Une discrétion absolue. Prestige Immobilier — votre partenaire pour les transactions les plus importantes de votre vie.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            style={{ display: 'flex', gap: '16px' }}
          >
            <button className="btn-solid-gold">Explorer nos biens</button>
            <button className="btn-premium">Estimation gratuite</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{ display: 'flex', gap: '48px', marginTop: '64px' }}
          >
            {[['200+', 'Biens exclusifs'], ['€ 2Md+', 'Transactions 2025'], ['98%', 'Clients satisfaits']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, color: '#c9a96e' }}>{v}</div>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,238,216,0.35)' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SEARCH & FILTER */}
      <section style={{ padding: '80px 60px 40px', background: 'rgba(201,169,110,0.03)', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, marginBottom: '32px', textAlign: 'center' }}>
            Filtrer votre recherche
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>
                Budget max: {(priceRange[1] / 1000000).toFixed(1)}M €
              </div>
              <input type="range" min={500000} max={10000000} step={100000}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(240,238,216,0.35)', marginTop: '4px' }}>
                <span>500K €</span><span>10M €</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>
                Surface min: {surfaceFilter} m²
              </div>
              <input type="range" min={0} max={800} step={50}
                value={surfaceFilter}
                onChange={e => setSurfaceFilter(+e.target.value)}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(240,238,216,0.35)', marginTop: '4px' }}>
                <span>0 m²</span><span>800 m²</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,238,216,0.4)', marginBottom: '12px' }}>
                {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} trouvé{filteredProperties.length > 1 ? 's' : ''}
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'btn-solid-gold' : 'btn-premium'} style={{ fontSize: '0.7rem', padding: '8px 16px' }}>Grille</button>
                <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'btn-solid-gold' : 'btn-premium'} style={{ fontSize: '0.7rem', padding: '8px 16px' }}>Liste</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <section id="biens" style={{ padding: '40px 60px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + filteredProperties.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr', gap: '24px' }}
          >
            {filteredProperties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="hub-card"
                style={{ border: '1px solid rgba(201,169,110,0.12)', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setActiveProperty(p.id)}
              >
                <div style={{ position: 'relative', height: viewMode === 'grid' ? '220px' : '200px', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', top: 16, left: 16, background: '#c9a96e', color: '#07080d', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px' }}>
                    {p.tag}
                  </div>
                </div>
                <div style={{ padding: '24px', background: 'rgba(7,8,13,0.9)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 400, marginBottom: '4px' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(240,238,216,0.45)' }}>📍 {p.location}</div>
                    </div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#c9a96e', textAlign: 'right' }}>
                      {(p.price / 1000000).toFixed(1)}M €
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '0.75rem', color: 'rgba(240,238,216,0.45)' }}>
                    <span>⬛ {p.surface} m²</span>
                    <span>🚪 {p.rooms} pièces</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '80px 60px', background: 'rgba(201,169,110,0.03)', borderTop: '1px solid rgba(201,169,110,0.1)', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300 }}>Nos services exclusifs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '32px 24px', border: '1px solid rgba(201,169,110,0.1)', transition: 'all 0.3s', textAlign: 'center' }}
                whileHover={{ y: -4, borderColor: 'rgba(201,169,110,0.4)' }}
              >
                <div style={{ fontSize: '1.5rem', color: '#c9a96e', marginBottom: '16px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '10px' }}>{s.title}</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(240,238,216,0.5)', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'rgba(240,238,216,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', letterSpacing: '0.1em', color: '#c9a96e' }}>PRESTIGE IMMOBILIER</span>
        <span>© 2026 · Paris · Côte d'Azur · Genève</span>
      </footer>
    </div>
  );
}
