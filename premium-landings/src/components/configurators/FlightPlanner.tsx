import { useMemo, useState } from 'react';

const aircraft = [
  { id: 'cj3', name: 'Cessna Citation CJ3+', seats: 7, hourly: 4200 },
  { id: 'phenom', name: 'Embraer Phenom 300', seats: 9, hourly: 5800 },
  { id: 'g650', name: 'Gulfstream G650', seats: 14, hourly: 12000 },
  { id: 'heli', name: 'Airbus H145', seats: 6, hourly: 3500 },
];

const routes = [
  { from: 'Paris', to: 'Genève', dist: 410 },
  { from: 'Nice', to: 'Ibiza', dist: 680 },
  { from: 'Londres', to: 'Monaco', dist: 1040 },
  { from: 'Dubai', to: 'Maldives', dist: 2800 },
];

export default function FlightPlanner() {
  const [plane, setPlane] = useState(aircraft[1]);
  const [route, setRoute] = useState(routes[0]);
  const [passengers, setPassengers] = useState(4);
  const flightHours = useMemo(() => Math.max(1, route.dist / (plane.id === 'heli' ? 200 : 750)), [route, plane]);
  const total = useMemo(() => Math.round(plane.hourly * flightHours * (passengers > plane.seats ? 1.2 : 1)), [plane, flightHours, passengers]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Appareil</label>
        <div className="configurator-option-group">
          {aircraft.map((a) => (
            <button key={a.id} type="button" className={`configurator-option ${plane.id === a.id ? 'active' : ''}`} onClick={() => setPlane(a)}>
              {a.name}
            </button>
          ))}
        </div>

        <label>Trajet</label>
        <div className="configurator-option-group">
          {routes.map((r, i) => (
            <button key={i} type="button" className={`configurator-option ${route === r ? 'active' : ''}`} onClick={() => setRoute(r)}>
              {r.from} → {r.to}
            </button>
          ))}
        </div>

        <label>Passagers : {passengers}</label>
        <input type="range" min={1} max={plane.seats} value={Math.min(passengers, plane.seats)} onChange={(e) => setPassengers(Number(e.target.value))} />
      </div>

      <div className="configurator-preview">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✈️</div>
        <p style={{ color: 'var(--muted)' }}>{route.from} → {route.to} · ~{flightHours.toFixed(1)}h de vol</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">{plane.name} · {passengers} PAX · Charter tout inclus</div>
        </div>
        <button type="button" className="configurator-cta">
          Demander le vol & confirmer par paiement
        </button>
      </div>
    </div>
  );
}
