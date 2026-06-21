import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const VEHICLES = [
  { id: 'lambo', name: 'Lamborghini Huracán', category: 'Super Sport', price: 1200, seats: 2, power: '640 CV', speed: '325 km/h', color: '#f5a623', accent: '#f5a623', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80' },
  { id: 'ferrari', name: 'Ferrari 488 Spider', category: 'Spider', price: 1400, seats: 2, power: '660 CV', speed: '330 km/h', color: '#e53e3e', accent: '#e53e3e', img: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80' },
  { id: 'bentley', name: 'Bentley Continental GT', category: 'Grand Tourisme', price: 950, seats: 4, power: '635 CV', speed: '318 km/h', color: '#c9a96e', accent: '#c9a96e', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80' },
  { id: 'rolls', name: 'Rolls-Royce Ghost', category: 'Ultra Luxe', price: 1800, seats: 5, power: '563 CV', speed: '250 km/h', color: '#a0aec0', accent: '#e2e8f0', img: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80' },
  { id: 'mclaren', name: 'McLaren 720S', category: 'Hypercar', price: 1600, seats: 2, power: '720 CV', speed: '341 km/h', color: '#ed8936', accent: '#fbd38d', img: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=800&q=80' },
  { id: 'porsche', name: 'Porsche 911 Turbo S', category: 'Sport', price: 680, seats: 4, power: '650 CV', speed: '330 km/h', color: '#4a5568', accent: '#a0aec0', img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80' },
];

const INSURANCES = [
  { id: 'basic', name: 'Essentiel', price: 0, cover: '2500€ franchise' },
  { id: 'comfort', name: 'Confort', price: 80, cover: '500€ franchise' },
  { id: 'full', name: 'Prestige Zero', price: 150, cover: 'Zéro franchise' },
];

function CarScene({ accent }: { accent: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(4, 2, 5);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const accentColor = parseInt(accent.replace('#', ''), 16);
    const bodyMat = new THREE.MeshPhongMaterial({ color: accentColor, shininess: 150 });
    const blackMat = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 100 });
    const glassMat = new THREE.MeshPhongMaterial({ color: 0x29b6f6, transparent: true, opacity: 0.4, shininess: 200 });
    const chromeMat = new THREE.MeshPhongMaterial({ color: 0xc9a96e, shininess: 200 });

    // Car body
    const carBody = new THREE.Group();

    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 1), bodyMat);
    mainBody.position.y = 0.2;
    carBody.add(mainBody);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.9), bodyMat);
    cabin.position.set(-0.1, 0.57, 0);
    carBody.add(cabin);

    const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.38, 0.88), glassMat);
    windshield.position.set(0.36, 0.57, 0);
    carBody.add(windshield);

    const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.88), glassMat);
    rearWindow.position.set(-0.55, 0.57, 0);
    carBody.add(rearWindow);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.18, 20);
    const wheelPositions = [[-0.75, 0, 0.55], [0.75, 0, 0.55], [-0.75, 0, -0.55], [0.75, 0, -0.55]];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, blackMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      carBody.add(wheel);
      const hubcap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.2, 10), chromeMat);
      hubcap.rotation.z = Math.PI / 2;
      hubcap.position.set(x, y, z);
      carBody.add(hubcap);
    });

    // Ground grid
    const gridHelper = new THREE.GridHelper(12, 20, 0x1a1a1a, 0x1a1a1a);
    scene.add(gridHelper);

    // Reflection plane
    const reflGeo = new THREE.PlaneGeometry(10, 10);
    const reflMat = new THREE.MeshPhongMaterial({ color: 0x080808, transparent: true, opacity: 0.8, shininess: 100 });
    const refl = new THREE.Mesh(reflGeo, reflMat);
    refl.rotation.x = -Math.PI / 2;
    refl.position.y = -0.01;
    scene.add(refl);

    scene.add(carBody);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const spotLight = new THREE.SpotLight(0xffffff, 3, 20, Math.PI / 4);
    spotLight.position.set(0, 6, 3);
    scene.add(spotLight);
    const accentLight = new THREE.PointLight(accentColor, 1.5, 8);
    accentLight.position.set(-3, 2, 2);
    scene.add(accentLight);
    const rimLight = new THREE.PointLight(0xffffff, 0.5, 10);
    rimLight.position.set(3, 1, -4);
    scene.add(rimLight);

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      const t = frame * 0.005;
      carBody.rotation.y = Math.sin(t * 0.3) * 0.3 + t * 0.2;
      accentLight.position.x = Math.sin(t * 0.5) * 3;
      accentLight.position.z = Math.cos(t * 0.5) * 3;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, [accent]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}

export default function VehicleRental() {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0]);
  const [days, setDays] = useState(3);
  const [km, setKm] = useState(300);
  const [insurance, setInsurance] = useState('comfort');
  const [pickupCity, setPickupCity] = useState('Paris');

  const ins = INSURANCES.find(i => i.id === insurance)!;
  const kmExtra = Math.max(0, km - days * 150);
  const vehicleTotal = selectedVehicle.price * days;
  const insuranceTotal = ins.price * days;
  const kmTotal = kmExtra * 1.5;
  const grandTotal = vehicleTotal + insuranceTotal + kmTotal;

  return (
    <div style={{ background: '#0a0a0a', color: '#f0f0f0', minHeight: '100vh', fontFamily: 'Space Grotesk, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px', background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.12em', color: selectedVehicle.accent, transition: 'color 0.5s' }}>APEX DRIVE</div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.3)' }}>Location · Véhicules d'exception</div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {['Flotte', 'Simulateur', 'Services', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(240,240,240,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = selectedVehicle.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,240,240,0.5)')}>{i}</a>
          ))}
        </div>
        <button style={{ background: selectedVehicle.accent, color: '#0a0a0a', border: 'none', padding: '10px 28px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.5s' }}>
          Réserver
        </button>
      </motion.nav>

      {/* HERO — 3D CAR */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 60% 50%, ${selectedVehicle.accent}12 0%, transparent 65%)`, transition: 'background 0.8s' }} />

        <div style={{ position: 'absolute', right: 0, top: 0, width: '58%', height: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div key={selectedVehicle.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0 }}>
              <CarScene accent={selectedVehicle.accent} />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 60% 50%, transparent 30%, #0a0a0a 72%)' }} />
        </div>

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={selectedVehicle.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5 }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: selectedVehicle.accent, marginBottom: '12px', transition: 'color 0.5s' }}>
                {selectedVehicle.category}
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '24px' }}>
                {selectedVehicle.name}
              </h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {[['⚡', selectedVehicle.power, 'Puissance'], ['🏎', selectedVehicle.speed, 'Vitesse max'], ['💺', `${selectedVehicle.seats} pl.`, 'Places']].map(([icon, val, label]) => (
                  <div key={label} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{icon}</div>
                    <div style={{ fontWeight: 600, color: selectedVehicle.accent, transition: 'color 0.5s' }}>{val}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(240,240,240,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 700, color: selectedVehicle.accent, transition: 'color 0.5s', marginBottom: '8px' }}>
                {selectedVehicle.price.toLocaleString()} € <span style={{ fontSize: '1rem', fontWeight: 400, color: 'rgba(240,240,240,0.4)' }}>/jour</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <button style={{ background: selectedVehicle.accent, color: '#0a0a0a', border: 'none', padding: '14px 40px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.5s', boxShadow: `0 10px 30px ${selectedVehicle.accent}40` }}>
            Réserver ce véhicule
          </button>
        </motion.div>
      </section>

      {/* FLEET SELECTOR */}
      <section id="flotte" style={{ padding: '80px 60px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '40px', letterSpacing: '0.05em' }}>
          Notre <span style={{ color: '#c9a96e' }}>Flotte</span> d'Exception
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {VEHICLES.map((v, i) => (
            <motion.div key={v.id} onClick={() => setSelectedVehicle(v)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              style={{ border: `1px solid ${v.id === selectedVehicle.id ? v.accent : 'rgba(255,255,255,0.06)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.35s', background: v.id === selectedVehicle.id ? `${v.accent}08` : 'transparent', boxShadow: v.id === selectedVehicle.id ? `0 0 30px ${v.accent}20` : 'none' }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)', transition: 'transform 0.6s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', bottom: 10, left: 12, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 10px', background: v.accent, color: '#0a0a0a' }}>{v.category}</div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{v.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <div style={{ color: 'rgba(240,240,240,0.4)', fontSize: '0.78rem' }}>{v.power} · {v.speed}</div>
                  <div style={{ color: v.accent, fontWeight: 700, fontSize: '1.05rem', transition: 'color 0.3s' }}>{v.price} €/j</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulateur" style={{ padding: '100px 60px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '50px', textAlign: 'center' }}>
          Simulateur de <span style={{ color: selectedVehicle.accent, transition: 'color 0.5s' }}>prix</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.4)', marginBottom: '12px' }}>
              Durée: {days} jour{days > 1 ? 's' : ''}
            </label>
            <input type="range" min={1} max={14} value={days} onChange={e => setDays(+e.target.value)} style={{ width: '100%', accentColor: selectedVehicle.accent }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(240,240,240,0.25)', marginTop: '4px' }}><span>1j</span><span>14j</span></div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.4)', marginBottom: '12px' }}>
              Kilométrage: {km} km
            </label>
            <input type="range" min={100} max={2000} step={50} value={km} onChange={e => setKm(+e.target.value)} style={{ width: '100%', accentColor: selectedVehicle.accent }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(240,240,240,0.25)', marginTop: '4px' }}><span>100km</span><span>2000km</span></div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.4)', marginBottom: '12px' }}>Ville de départ</label>
            <select value={pickupCity} onChange={e => setPickupCity(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', color: '#f0f0f0', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {['Paris', 'Nice', 'Monaco', 'Cannes', 'Lyon', 'Bordeaux'].map(c => <option key={c} value={c} style={{ background: '#1a1a1a' }}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,240,240,0.4)', marginBottom: '12px' }}>Assurance</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {INSURANCES.map(ins_ => (
                <div key={ins_.id} onClick={() => setInsurance(ins_.id)}
                  style={{ padding: '10px 14px', border: `1px solid ${insurance === ins_.id ? selectedVehicle.accent : 'rgba(255,255,255,0.08)'}`, background: insurance === ins_.id ? `${selectedVehicle.accent}10` : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', transition: 'all 0.3s' }}
                >
                  <span>{ins_.name} <span style={{ color: 'rgba(240,240,240,0.4)', fontSize: '0.75rem' }}>({ins_.cover})</span></span>
                  <span style={{ color: selectedVehicle.accent, fontWeight: 600 }}>{ins_.price === 0 ? 'Inclus' : `+${ins_.price}€/j`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          style={{ padding: '40px', border: `1px solid ${selectedVehicle.accent}40`, background: `${selectedVehicle.accent}06`, transition: 'all 0.5s' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {[
              [`${vehicleTotal.toLocaleString()} €`, `${selectedVehicle.name} × ${days}j`],
              [`${insuranceTotal.toLocaleString()} €`, `Assurance ${ins.name}`],
              [`${kmTotal > 0 ? '+' + kmTotal.toLocaleString() : '0'} €`, kmTotal > 0 ? `${kmExtra} km supp.` : 'Km inclus'],
              [`${grandTotal.toLocaleString()} €`, 'TOTAL TTC'],
            ].map(([val, label], i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px', background: i === 3 ? `${selectedVehicle.accent}15` : 'rgba(255,255,255,0.02)', border: i === 3 ? `1px solid ${selectedVehicle.accent}50` : '1px solid rgba(255,255,255,0.04)', transition: 'all 0.5s' }}>
                <div style={{ fontSize: i === 3 ? '1.6rem' : '1.25rem', fontWeight: 700, color: i === 3 ? selectedVehicle.accent : '#f0f0f0', transition: 'color 0.5s' }}>{val}</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(240,240,240,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{ background: selectedVehicle.accent, color: '#0a0a0a', border: 'none', padding: '14px 48px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: `0 10px 30px ${selectedVehicle.accent}40`, transition: 'all 0.5s' }}>
              Réserver maintenant
            </button>
            <button style={{ background: 'transparent', color: 'rgba(240,240,240,0.6)', border: '1px solid rgba(240,240,240,0.15)', padding: '14px 32px', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Appeler
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(240,240,240,0.25)', marginTop: '16px' }}>
            * {days * 150} km inclus · Carburant non inclus · Conducteur ≥ 25 ans · Permis ≥ 3 ans
          </p>
        </motion.div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(240,240,240,0.25)' }}>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#c9a96e' }}>APEX DRIVE</span>
        <span>© 2026 · Paris · Nice · Monaco · +33 1 00 00 00 00</span>
      </footer>
    </div>
  );
}
