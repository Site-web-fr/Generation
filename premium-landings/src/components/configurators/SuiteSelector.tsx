import { useMemo, useState } from 'react';

const suites = [
  { id: 'deluxe', name: 'Deluxe City View', nightly: 680, sqm: 45 },
  { id: 'junior', name: 'Junior Suite Panorama', nightly: 1200, sqm: 72 },
  { id: 'presidential', name: 'Presidential Suite', nightly: 4500, sqm: 180 },
  { id: 'penthouse', name: 'Penthouse Royal', nightly: 12000, sqm: 320 },
];

const extras = [
  { id: 'champagne', name: 'Champagne à l\'arrivée', price: 180 },
  { id: 'spa', name: 'Spa privé 2h', price: 450 },
  { id: 'chef', name: 'Chef privé dîner', price: 890 },
  { id: 'transfer', name: 'Transfert aéroport VIP', price: 220 },
  { id: 'butler', name: ' Majordome 24h', price: 650 },
];

export default function SuiteSelector() {
  const [suite, setSuite] = useState(suites[1]);
  const [nights, setNights] = useState(3);
  const [selected, setSelected] = useState<string[]>(['champagne', 'transfer']);
  const [view, setView] = useState('Mer');

  const toggle = (id: string) => setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const total = useMemo(() => {
    const extrasTotal = extras.filter((e) => selected.includes(e.id)).reduce((a, e) => a + e.price, 0);
    const viewMult = view === 'Mer' ? 1.1 : 1;
    return Math.round((suite.nightly * nights + extrasTotal) * viewMult);
  }, [suite, nights, selected, view]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Suite</label>
        <div className="configurator-option-group">
          {suites.map((s) => (
            <button key={s.id} type="button" className={`configurator-option ${suite.id === s.id ? 'active' : ''}`} onClick={() => setSuite(s)}>{s.name}</button>
          ))}
        </div>
        <label>Vue</label>
        <div className="configurator-option-group">
          {['Jardin', 'Ville', 'Mer', 'Montagne'].map((v) => (
            <button key={v} type="button" className={`configurator-option ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>{v}</button>
          ))}
        </div>
        <label>Nuits : {nights}</label>
        <input type="range" min={1} max={14} value={nights} onChange={(e) => setNights(Number(e.target.value))} />
        <label>Services</label>
        <div className="configurator-option-group">
          {extras.map((e) => (
            <button key={e.id} type="button" className={`configurator-option ${selected.includes(e.id) ? 'active' : ''}`} onClick={() => toggle(e.id)}>{e.name}</button>
          ))}
        </div>
      </div>

      <div className="configurator-preview">
        <div style={{ height: 140, borderRadius: 12, background: 'linear-gradient(135deg, #1a1814, #2a2420)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🏨</div>
        <p style={{ color: 'var(--muted)' }}>{suite.name} · {suite.sqm} m² · Vue {view}</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">{nights} nuit(s) · {selected.length} service(s) · Check-in digital</div>
        </div>
        <button type="button" className="configurator-cta">
          Confirmer la réservation & payer
        </button>
      </div>
    </div>
  );
}
