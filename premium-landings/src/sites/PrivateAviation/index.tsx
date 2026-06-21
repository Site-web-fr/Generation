import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const AIRCRAFT = [
  { id: 'citation', name: 'Citation CJ4', category: 'Light Jet', capacity: 7, range: '3400 km', speed: '778 km/h', pricePerHour: 4200, img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=90', features: ['Wi-Fi Starlink', 'Catering premium', 'Bagages 700kg'] },
  { id: 'challenger', name: 'Bombardier Challenger 350', category: 'Super Mid', capacity: 10, range: '5700 km', speed: '870 km/h', pricePerHour: 7800, img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=90', features: ['Cabine stand-up', 'Suite privée', 'Bar premium', 'Wi-Fi'] },
  { id: 'global', name: 'Bombardier Global 7500', category: 'Ultra Long Range', capacity: 19, range: '14260 km', speed: '956 km/h', pricePerHour: 14500, img: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=90', features: ['4 zones de vie', 'Suite master', 'Douche à bord', 'Chef à bord', 'Wi-Fi ultra haut débit'] },
];

const AIRPORTS = [
  'Paris Le Bourget (LBG)',
  'Paris CDG (CDG)',
  'Nice Côte d\'Azur (NCE)',
  'Genève (GVA)',
  'Monaco (MCM)',
  'Dubai (DWC)',
  'New York (TEB)',
  'Londres (LCY)',
  'Miami (OPF)',
  'Los Angeles (VNY)',
];

function AircraftScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 200);
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const whiteMat = new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 100 });
    const navyMat = new THREE.MeshPhongMaterial({ color: 0x0a1628, shininess: 80 });
    const goldMat = new THREE.MeshPhongMaterial({ color: 0xc9a96e, shininess: 180, emissive: 0xc9a96e, emissiveIntensity: 0.15 });
    const glassMat = new THREE.MeshPhongMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.5, shininess: 200 });

    const plane = new THREE.Group();

    // Fuselage
    const fus = new THREE.CylinderGeometry(0.35, 0.35, 5, 12);
    const fusMesh = new THREE.Mesh(fus, whiteMat);
    fusMesh.rotation.z = Math.PI / 2;
    plane.add(fusMesh);

    // Nose
    const nose = new THREE.ConeGeometry(0.35, 1.2, 12);
    const noseMesh = new THREE.Mesh(nose, whiteMat);
    noseMesh.rotation.z = -Math.PI / 2;
    noseMesh.position.x = 3.1;
    plane.add(noseMesh);

    // Tail cone
    const tail = new THREE.ConeGeometry(0.25, 1, 12);
    const tailMesh = new THREE.Mesh(tail, whiteMat);
    tailMesh.rotation.z = Math.PI / 2;
    tailMesh.position.x = -3.1;
    plane.add(tailMesh);

    // Main wings
    const wingGeo = new THREE.BoxGeometry(0.15, 0.08, 5);
    const wingL = new THREE.Mesh(wingGeo, whiteMat);
    wingL.position.set(0, -0.1, 2);
    plane.add(wingL);
    const wingR = new THREE.Mesh(wingGeo, whiteMat);
    wingR.position.set(0, -0.1, -2);
    plane.add(wingR);

    // Winglets
    const wlt = new THREE.BoxGeometry(0.04, 0.4, 0.08);
    const wltL = new THREE.Mesh(wlt, goldMat);
    wltL.position.set(0, 0.1, 2.5);
    plane.add(wltL);
    const wltR = new THREE.Mesh(wlt, goldMat);
    wltR.position.set(0, 0.1, -2.5);
    plane.add(wltR);

    // Tail fin
    const tailFinGeo = new THREE.BoxGeometry(1, 0.08, 0.6);
    const tailFin = new THREE.Mesh(tailFinGeo, whiteMat);
    tailFin.position.set(-2.2, 0.5, 0);
    tailFin.rotation.x = Math.PI / 8;
    plane.add(tailFin);

    // Gold stripe
    const stripeGeo = new THREE.BoxGeometry(5, 0.06, 0.06);
    const stripe = new THREE.Mesh(stripeGeo, goldMat);
    stripe.position.set(0, 0.2, 0.35);
    plane.add(stripe);
    const stripe2 = stripe.clone();
    stripe2.position.z = -0.35;
    plane.add(stripe2);

    // Windows
    for (let i = -2; i <= 2; i++) {
      const winGeo = new THREE.BoxGeometry(0.18, 0.12, 0.02);
      const win = new THREE.Mesh(winGeo, glassMat);
      win.position.set(i * 0.55, 0.15, 0.36);
      plane.add(win);
    }

    // Engines
    [-1.2, 1.2].forEach(z => {
      const engGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.8, 10);
      const eng = new THREE.Mesh(engGeo, navyMat);
      eng.rotation.z = Math.PI / 2;
      eng.position.set(0, -0.3, z);
      plane.add(eng);
    });

    scene.add(plane);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 })));

    // Cloud-like particles
    const cloudGeo = new THREE.BufferGeometry();
    const cloudPos = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      cloudPos[i * 3] = (Math.random() - 0.5) * 20;
      cloudPos[i * 3 + 1] = (Math.random() - 0.5) * 4 - 1;
      cloudPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPos, 3));
    scene.add(new THREE.Points(cloudGeo, new THREE.PointsMaterial({ color: 0xc9a96e, size: 0.05, transparent: true, opacity: 0.25 })));

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xfff0d0, 2);
    sun.position.set(10, 8, 5);
    scene.add(sun);
    const rimLight = new THREE.PointLight(0xc9a96e, 1, 20);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      const t = frame * 0.008;
      plane.rotation.y = t * 0.2;
      plane.position.y = Math.sin(t * 0.5) * 0.3;
      plane.rotation.z = Math.sin(t * 0.3) * 0.03;
      rimLight.position.x = Math.sin(t * 0.4) * 5;
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

export default function PrivateAviation() {
  const [selectedAircraft, setSelectedAircraft] = useState(AIRCRAFT[1]);
  const [departure, setDeparture] = useState('Paris Le Bourget (LBG)');
  const [destination, setDestination] = useState('Dubai (DWC)');
  const [hours, setHours] = useState(4);
  const [pax, setPax] = useState(4);
  const [tab, setTab] = useState<'aircraft' | 'estimator'>('aircraft');

  const estimatedPrice = selectedAircraft.pricePerHour * hours;

  return (
    <div style={{ background: '#04060e', color: '#e8eef8', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 60px', background: 'rgba(4,6,14,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,169,110,0.08)' }}
      >
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', letterSpacing: '0.2em', color: '#c9a96e' }}>SKY ÉLITE</div>
          <div style={{ fontSize: '0.5rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.3)' }}>Aviation privée d'exception</div>
        </div>
        <div style={{ display: 'flex', gap: '36px', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['Flotte', 'Destinations', 'Services', 'Contact'].map(i => (
            <a key={i} href="#" style={{ color: 'rgba(232,238,248,0.5)', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a96e')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,238,248,0.5)')}>{i}</a>
          ))}
        </div>
        <button className="btn-premium" style={{ fontSize: '0.7rem', padding: '10px 28px' }}>Devis charter</button>
      </motion.nav>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(4,6,14,0.2) 0%, rgba(4,6,14,0.95) 100%)' }} />
        <AircraftScene />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(4,6,14,0.92) 40%, transparent)' }} />

        <motion.div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '640px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
          >
            <div style={{ width: 40, height: 1, background: '#c9a96e' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e' }}>Charter Privé · Disponible 24/7</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 5rem)', fontWeight: 300, lineHeight: 1.08, marginBottom: '24px' }}
          >
            L'horizon<br />comme <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>frontière</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: 'rgba(232,238,248,0.55)', lineHeight: 1.7, maxWidth: '420px', marginBottom: '48px' }}
          >
            Flotte internationale. Équipages certifiés. Conciergerie 24/7. Voyagez à vos conditions, selon vos horaires, vers n'importe quelle destination.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-solid-gold">Obtenir un devis</button>
            <button className="btn-premium">Explorer la flotte</button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            style={{ display: 'flex', gap: '40px', marginTop: '60px' }}
          >
            {[['24/7', 'Disponibilité'], ['180+', 'Destinations'], ['2h', 'Préavis minimum']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#c9a96e' }}>{v}</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.35)' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FLEET */}
      <section id="flotte" style={{ padding: '100px 60px', background: 'rgba(201,169,110,0.02)', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, textAlign: 'center', marginBottom: '60px' }}>
          Notre <span style={{ color: '#c9a96e', fontStyle: 'italic' }}>Flotte</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto 60px' }}>
          {AIRCRAFT.map((a, i) => (
            <motion.div key={a.id} onClick={() => setSelectedAircraft(a)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ border: `1px solid ${a.id === selectedAircraft.id ? '#c9a96e' : 'rgba(232,238,248,0.06)'}`, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.35s', background: a.id === selectedAircraft.id ? 'rgba(201,169,110,0.06)' : 'transparent' }}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src={a.img} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)', transition: 'transform 0.6s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', bottom: 12, left: 12, background: '#c9a96e', color: '#04060e', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px' }}>{a.category}</div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', marginBottom: '8px' }}>{a.name}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {[[`${a.capacity} pax`, 'Capacité'], [a.range, 'Autonomie'], [a.speed, 'Vitesse']].map(([v, l]) => (
                    <div key={l} style={{ textAlign: 'center', padding: '10px 8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontWeight: 500, fontSize: '0.85rem', color: '#c9a96e' }}>{v}</div>
                      <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(232,238,248,0.35)', marginTop: '2px' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#c9a96e', fontWeight: 300 }}>
                  {a.pricePerHour.toLocaleString('fr-FR')} € <span style={{ fontSize: '0.8rem', color: 'rgba(232,238,248,0.4)', fontFamily: 'DM Sans, sans-serif' }}>/heure de vol</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CHARTER ESTIMATOR */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px', border: '1px solid rgba(201,169,110,0.2)', background: 'rgba(201,169,110,0.04)' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, marginBottom: '32px', color: '#c9a96e' }}>
            Estimateur de charter
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.45)', marginBottom: '8px' }}>Départ</label>
              <select value={departure} onChange={e => setDeparture(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,238,248,0.1)', padding: '12px 16px', color: '#e8eef8', fontSize: '0.85rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}
              >
                {AIRPORTS.map(a => <option key={a} value={a} style={{ background: '#0a0a14' }}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.45)', marginBottom: '8px' }}>Destination</label>
              <select value={destination} onChange={e => setDestination(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,238,248,0.1)', padding: '12px 16px', color: '#e8eef8', fontSize: '0.85rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}
              >
                {AIRPORTS.map(a => <option key={a} value={a} style={{ background: '#0a0a14' }}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.45)', marginBottom: '8px' }}>
                Durée de vol estimée: {hours}h
              </label>
              <input type="range" min={1} max={15} value={hours} onChange={e => setHours(+e.target.value)} style={{ width: '100%', accentColor: '#c9a96e' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(232,238,248,0.25)', marginTop: '4px' }}><span>1h</span><span>15h</span></div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.45)', marginBottom: '8px' }}>
                Passagers: {pax}
              </label>
              <input type="range" min={1} max={selectedAircraft.capacity} value={pax} onChange={e => setPax(+e.target.value)} style={{ width: '100%', accentColor: '#c9a96e' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(232,238,248,0.25)', marginTop: '4px' }}><span>1</span><span>{selectedAircraft.capacity}</span></div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,238,248,0.4)', marginBottom: '8px' }}>
                {selectedAircraft.name} · {hours}h de vol
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 300, color: '#c9a96e' }}>
                {estimatedPrice.toLocaleString('fr-FR')} €
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(232,238,248,0.35)' }}>Catering, handling, taxes inclus</div>
            </div>
            <button className="btn-solid-gold">Obtenir le devis</button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(201,169,110,0.1)', padding: '36px 60px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(232,238,248,0.3)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#c9a96e', letterSpacing: '0.15em' }}>SKY ÉLITE</span>
        <span>© 2026 · Paris · Genève · Dubai · +33 1 00 00 00 00</span>
      </footer>
    </div>
  );
}
