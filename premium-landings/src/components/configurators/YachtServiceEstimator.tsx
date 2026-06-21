import { useMemo, useState } from 'react';

const sizes = [
  { id: '40', name: '30–45 ft', base: 1200 },
  { id: '60', name: '45–65 ft', base: 2400 },
  { id: '80', name: '65–85 ft', base: 4200 },
  { id: '100', name: '85–120 ft', base: 7800 },
];

const services = [
  { id: 'hull', name: 'Hull detailing', price: 0 },
  { id: 'teak', name: 'Teak restoration', price: 450 },
  { id: 'interior', name: 'Interior deep clean', price: 380 },
  { id: 'engine', name: 'Engine bay service', price: 290 },
  { id: 'antifouling', name: 'Anti-fouling treatment', price: 1200 },
  { id: 'ceramic', name: 'Ceramic coating', price: 2800 },
];

const frequency = [
  { id: 'once', name: 'Ponctuel', mult: 1 },
  { id: 'monthly', name: 'Mensuel', mult: 0.85 },
  { id: 'season', name: 'Saison complète', mult: 0.7 },
];

export default function YachtServiceEstimator() {
  const [size, setSize] = useState(sizes[1]);
  const [selected, setSelected] = useState<string[]>(['hull', 'interior']);
  const [freq, setFreq] = useState(frequency[0]);
  const [location, setLocation] = useState('Monaco');

  const total = useMemo(() => {
    const servicesTotal = services.filter((s) => selected.includes(s.id)).reduce((a, s) => a + s.price, 0);
    const locMult = location === 'Monaco' ? 1.15 : location === 'Saint-Tropez' ? 1.1 : 1;
    return Math.round((size.base + servicesTotal) * freq.mult * locMult);
  }, [size, selected, freq, location]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Taille du yacht</label>
        <div className="configurator-option-group">
          {sizes.map((s) => (
            <button key={s.id} type="button" className={`configurator-option ${size.id === s.id ? 'active' : ''}`} onClick={() => setSize(s)}>
              {s.name}
            </button>
          ))}
        </div>

        <label>Prestations</label>
        <div className="configurator-option-group">
          {services.map((s) => (
            <button key={s.id} type="button" className={`configurator-option ${selected.includes(s.id) ? 'active' : ''}`} onClick={() => toggle(s.id)}>
              {s.name} {s.price > 0 && `(+${s.price}€)`}
            </button>
          ))}
        </div>

        <label>Fréquence</label>
        <div className="configurator-option-group">
          {frequency.map((f) => (
            <button key={f.id} type="button" className={`configurator-option ${freq.id === f.id ? 'active' : ''}`} onClick={() => setFreq(f)}>
              {f.name}
            </button>
          ))}
        </div>

        <label>Port d'attache</label>
        <div className="configurator-option-group">
          {['Monaco', 'Cannes', 'Saint-Tropez', 'Antibes'].map((l) => (
            <button key={l} type="button" className={`configurator-option ${location === l ? 'active' : ''}`} onClick={() => setLocation(l)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="configurator-preview">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⛵</div>
        <p style={{ color: 'var(--muted)' }}>Yacht {size.name} · {location}</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">{selected.length} prestation(s) · {freq.name} · Devis TTC</div>
        </div>
        <button type="button" className="configurator-cta">
          Valider le devis & planifier l'intervention
        </button>
      </div>
    </div>
  );
}
