import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const properties = [
  { id: 1, name: 'Penthouse Avenue Montaigne', city: 'Paris 8e', price: 4200000, sqm: 185, rooms: 5, view: 'Tour Eiffel' },
  { id: 2, name: 'Villa Belle Époque', city: 'Nice', price: 6800000, sqm: 320, rooms: 7, view: 'Mer' },
  { id: 3, name: 'Loft Marais Contemporain', city: 'Paris 3e', price: 1950000, sqm: 142, rooms: 4, view: 'Cour intérieure' },
  { id: 4, name: 'Propriété Cap Ferrat', city: 'Saint-Jean-Cap-Ferrat', price: 12500000, sqm: 480, rooms: 9, view: 'Méditerranée' },
];

export default function PropertyExplorer() {
  const [selected, setSelected] = useState(properties[0]);
  const [budget, setBudget] = useState(5000000);
  const [duration, setDuration] = useState(20);
  const [rate, setRate] = useState(3.2);

  const monthly = useMemo(() => {
    const loan = selected.price * 0.8;
    const r = rate / 100 / 12;
    const n = duration * 12;
    return Math.round((loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  }, [selected, duration, rate]);

  const filtered = properties.filter((p) => p.price <= budget);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Budget max : {(budget / 1000000).toFixed(1)} M€</label>
        <input type="range" min={1500000} max={15000000} step={250000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} />

        <label>Durée crédit : {duration} ans</label>
        <input type="range" min={10} max={25} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />

        <label>Taux : {rate}%</label>
        <input type="range" min={2.5} max={4.5} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} />

        <label>Biens disponibles ({filtered.length})</label>
        <div className="configurator-option-group" style={{ flexDirection: 'column' }}>
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`configurator-option ${selected.id === p.id ? 'active' : ''}`}
              style={{ textAlign: 'left' }}
              onClick={() => setSelected(p)}
            >
              <strong>{p.name}</strong>
              <br />
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{p.city} · {(p.price / 1000000).toFixed(2)} M€</span>
            </button>
          ))}
        </div>
      </div>

      <div className="configurator-preview">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <div style={{ height: 160, borderRadius: 12, background: `linear-gradient(135deg, #1a2030, #2a3548)`, marginBottom: 1.5 + 'rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              🏛️
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>{selected.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{selected.sqm} m² · {selected.rooms} pièces · Vue {selected.view}</p>
          </motion.div>
        </AnimatePresence>
        <div className="configurator-price">
          <div className="amount">{(selected.price / 1000000).toFixed(2)} M€</div>
          <div className="detail">Mensualité estimée : {monthly.toLocaleString('fr-FR')} €/mois (80% financement)</div>
        </div>
        <button type="button" className="configurator-cta">
          Réserver une visite privée
        </button>
      </div>
    </div>
  );
}
