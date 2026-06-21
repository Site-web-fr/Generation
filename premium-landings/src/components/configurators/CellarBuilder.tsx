import { useMemo, useState } from 'react';

const capacities = [
  { id: '100', name: '100 bouteilles', base: 8500 },
  { id: '250', name: '250 bouteilles', base: 18000 },
  { id: '500', name: '500 bouteilles', base: 32000 },
  { id: '1000', name: '1000+ bouteilles', base: 58000 },
];

const wines = [
  { id: 'bordeaux', name: 'Bordeaux Grands Crus', price: 12000 },
  { id: 'bourgogne', name: 'Bourgogne Premier Cru', price: 18000 },
  { id: 'champagne', name: 'Champagne millésimé', price: 8000 },
  { id: 'rhone', name: 'Côtes du Rhône rares', price: 5000 },
];

const options = [
  { id: 'climate', name: 'Climatisation pro', price: 4500 },
  { id: 'security', name: 'Système sécurité', price: 2800 },
  { id: 'display', name: 'Vitrine éclairée', price: 3200 },
];

export default function CellarBuilder() {
  const [capacity, setCapacity] = useState(capacities[1]);
  const [selectedWines, setSelectedWines] = useState<string[]>(['bordeaux']);
  const [selectedOpts, setSelectedOpts] = useState<string[]>(['climate']);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) => {
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const total = useMemo(() => {
    const winesTotal = wines.filter((w) => selectedWines.includes(w.id)).reduce((a, w) => a + w.price, 0);
    const optsTotal = options.filter((o) => selectedOpts.includes(o.id)).reduce((a, o) => a + o.price, 0);
    return capacity.base + winesTotal + optsTotal;
  }, [capacity, selectedWines, selectedOpts]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Capacité</label>
        <div className="configurator-option-group">
          {capacities.map((c) => (
            <button key={c.id} type="button" className={`configurator-option ${capacity.id === c.id ? 'active' : ''}`} onClick={() => setCapacity(c)}>{c.name}</button>
          ))}
        </div>
        <label>Millésimes</label>
        <div className="configurator-option-group">
          {wines.map((w) => (
            <button key={w.id} type="button" className={`configurator-option ${selectedWines.includes(w.id) ? 'active' : ''}`} onClick={() => toggle(selectedWines, setSelectedWines, w.id)}>{w.name}</button>
          ))}
        </div>
        <label>Équipements</label>
        <div className="configurator-option-group">
          {options.map((o) => (
            <button key={o.id} type="button" className={`configurator-option ${selectedOpts.includes(o.id) ? 'active' : ''}`} onClick={() => toggle(selectedOpts, setSelectedOpts, o.id)}>{o.name}</button>
          ))}
        </div>
      </div>

      <div className="configurator-preview">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍷</div>
        <p style={{ color: 'var(--muted)' }}>{capacity.name} · {selectedWines.length} sélection(s)</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">Cave clé en main · Estimation patrimoine vin</div>
        </div>
        <button type="button" className="configurator-cta">
          Valider le projet & planifier la livraison
        </button>
      </div>
    </div>
  );
}
