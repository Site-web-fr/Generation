import { useMemo, useState } from 'react';

const treatments = [
  { id: 'massage', name: 'Massage signature', price: 180 },
  { id: 'facial', name: 'Soin visage La Prairie', price: 320 },
  { id: 'hammam', name: 'Rituel hammam', price: 150 },
  { id: 'cryo', name: 'Cryothérapie', price: 95 },
  { id: 'yoga', name: 'Yoga privé', price: 120 },
  { id: 'detox', name: 'Programme détox', price: 450 },
];

const suites = [
  { id: 'deluxe', name: 'Suite Alpine', nightly: 890 },
  { id: 'spa', name: 'Suite Spa Privée', nightly: 1450 },
  { id: 'chalet', name: 'Chalet exclusif', nightly: 3200 },
];

export default function WellnessArchitect() {
  const [selected, setSelected] = useState<string[]>(['massage', 'facial']);
  const [suite, setSuite] = useState(suites[0]);
  const [nights, setNights] = useState(2);

  const toggle = (id: string) => setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const total = useMemo(() => {
    const treatmentsTotal = treatments.filter((t) => selected.includes(t.id)).reduce((a, t) => a + t.price, 0);
    return treatmentsTotal + suite.nightly * nights;
  }, [selected, suite, nights]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Soins</label>
        <div className="configurator-option-group">
          {treatments.map((t) => (
            <button key={t.id} type="button" className={`configurator-option ${selected.includes(t.id) ? 'active' : ''}`} onClick={() => toggle(t.id)}>
              {t.name} ({t.price}€)
            </button>
          ))}
        </div>
        <label>Hébergement</label>
        <div className="configurator-option-group">
          {suites.map((s) => (
            <button key={s.id} type="button" className={`configurator-option ${suite.id === s.id ? 'active' : ''}`} onClick={() => setSuite(s)}>{s.name}</button>
          ))}
        </div>
        <label>Nuits : {nights}</label>
        <input type="range" min={1} max={7} value={nights} onChange={(e) => setNights(Number(e.target.value))} />
      </div>

      <div className="configurator-preview">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧘</div>
        <p style={{ color: 'var(--muted)' }}>{selected.length} soin(s) · {suite.name} · {nights} nuit(s)</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">Séjour wellness complet · Petit-déjeuner bio inclus</div>
        </div>
        <button type="button" className="configurator-cta">
          Réserver mon séjour
        </button>
      </div>
    </div>
  );
}
