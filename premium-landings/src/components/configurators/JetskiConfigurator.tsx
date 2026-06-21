import { useMemo, useState } from 'react';

const routes = [
  { id: 'marina', name: 'Dubai Marina Loop', base: 350, duration: '45 min' },
  { id: 'palm', name: 'Palm Jumeirah Circuit', base: 550, duration: '90 min' },
  { id: 'burj', name: 'Burj Al Arab Vista', base: 750, duration: '2h' },
  { id: 'sunset', name: 'Sunset Arabian Gulf', base: 950, duration: '2h30' },
];

const models = [
  { id: 'spark', name: 'Sea-Doo Spark Trixx', mult: 1 },
  { id: 'gtx', name: 'GTX Limited 300', mult: 1.5 },
  { id: 'fx', name: 'FX Cruiser SVHO', mult: 1.8 },
];

export default function JetskiConfigurator() {
  const [route, setRoute] = useState(routes[0]);
  const [model, setModel] = useState(models[0]);
  const [riders, setRiders] = useState(1);
  const [hours, setHours] = useState(1);

  const total = useMemo(() => {
    const riderMult = riders > 1 ? 1 + (riders - 1) * 0.6 : 1;
    return Math.round(route.base * model.mult * riderMult * hours);
  }, [route, model, riders, hours]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Parcours</label>
        <div className="configurator-option-group">
          {routes.map((r) => (
            <button key={r.id} type="button" className={`configurator-option ${route.id === r.id ? 'active' : ''}`} onClick={() => setRoute(r)}>
              {r.name}
            </button>
          ))}
        </div>

        <label>Modèle Jet Ski</label>
        <div className="configurator-option-group">
          {models.map((m) => (
            <button key={m.id} type="button" className={`configurator-option ${model.id === m.id ? 'active' : ''}`} onClick={() => setModel(m)}>
              {m.name}
            </button>
          ))}
        </div>

        <label>Riders : {riders}</label>
        <input type="range" min={1} max={3} value={riders} onChange={(e) => setRiders(Number(e.target.value))} />

        <label>Durée : {hours}h</label>
        <input type="range" min={1} max={4} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
      </div>

      <div className="configurator-preview">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌊</div>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{route.name} · {route.duration}</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} AED</div>
          <div className="detail">{model.name} · {riders} rider{riders > 1 ? 's' : ''} · Assurance incluse</div>
        </div>
        <button type="button" className="configurator-cta">
          Réserver & payer — Confirmation instantanée
        </button>
      </div>
    </div>
  );
}
