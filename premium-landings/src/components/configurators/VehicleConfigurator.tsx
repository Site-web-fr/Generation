import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const cars = [
  { id: '911', name: 'Porsche 911 GT3', daily: 890, color: '#e63946' },
  { id: 'huracan', name: 'Lamborghini Huracán', daily: 1200, color: '#ffd700' },
  { id: 'sclass', name: 'Mercedes S-Class', daily: 450, color: '#1a1a2e' },
  { id: 'range', name: 'Range Rover SV', daily: 520, color: '#2d4a3e' },
  { id: 'ferrari', name: 'Ferrari Roma', daily: 1450, color: '#c41230' },
];

function CarMesh({ color, active }: { color: string; active: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * (active ? 0.4 : 0.15);
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={group} scale={active ? 1.2 : 0.9}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.5, 1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.2, 0.35, 0.85]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>
      {[[-0.7, -0.1, 0.45], [-0.7, -0.1, -0.45], [0.7, -0.1, 0.45], [0.7, -0.1, -0.45]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.18, 0.18, 0.15, 16]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function VehicleConfigurator() {
  const [index, setIndex] = useState(0);
  const [days, setDays] = useState(3);
  const [km, setKm] = useState(500);
  const [insurance, setInsurance] = useState('premium');

  const car = cars[index];

  const total = useMemo(() => {
    const kmExtra = Math.max(0, km - 200 * days) * 0.8;
    const insMult = insurance === 'premium' ? 1.25 : insurance === 'standard' ? 1.1 : 1;
    const dayDiscount = days >= 7 ? 0.85 : days >= 4 ? 0.92 : 1;
    return Math.round((car.daily * days + kmExtra) * insMult * dayDiscount);
  }, [car, days, km, insurance]);

  const prev = () => setIndex((i) => (i - 1 + cars.length) % cars.length);
  const next = () => setIndex((i) => (i + 1) % cars.length);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Véhicule — carousel 3D</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button type="button" className="configurator-option" onClick={prev}>←</button>
          <span style={{ flex: 1, textAlign: 'center', fontFamily: 'Syne', fontSize: '0.9rem' }}>{car.name}</span>
          <button type="button" className="configurator-option" onClick={next}>→</button>
        </div>

        <label>Durée : {days} jour{days > 1 ? 's' : ''}</label>
        <input type="range" min={1} max={14} value={days} onChange={(e) => setDays(Number(e.target.value))} />

        <label>Kilomètres : {km} km</label>
        <input type="range" min={100} max={2000} step={50} value={km} onChange={(e) => setKm(Number(e.target.value))} />

        <label>Assurance</label>
        <div className="configurator-option-group">
          {[
            { id: 'basic', name: 'Basique' },
            { id: 'standard', name: 'Standard' },
            { id: 'premium', name: 'Premium' },
          ].map((ins) => (
            <button key={ins.id} type="button" className={`configurator-option ${insurance === ins.id ? 'active' : ''}`} onClick={() => setInsurance(ins.id)}>
              {ins.name}
            </button>
          ))}
        </div>
      </div>

      <div className="configurator-preview">
        <div style={{ width: '100%', height: 220, borderRadius: 12, overflow: 'hidden' }}>
          <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <spotLight position={[-3, 5, 2]} intensity={0.5} color="#fff" />
            <Suspense fallback={null}>
              <CarMesh color={car.color} active />
            </Suspense>
          </Canvas>
        </div>
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="configurator-price"
        >
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">{car.daily} €/jour · {km} km · Assurance {insurance}</div>
        </motion.div>
        <button type="button" className="configurator-cta">
          Réserver & payer l'acompte — 30%
        </button>
      </div>
    </div>
  );
}
