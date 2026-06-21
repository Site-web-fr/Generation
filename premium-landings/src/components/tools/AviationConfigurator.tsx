import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const aircraft = [
  { id: 'g650', name: 'Gulfstream G650', seats: 14, hourly: 12000, range: 7500 },
  { id: 'global', name: 'Bombardier Global 7500', seats: 17, hourly: 14500, range: 7700 },
  { id: 'falcon', name: 'Dassault Falcon 8X', seats: 12, hourly: 10500, range: 6450 },
  { id: 'citation', name: 'Cessna Citation X', seats: 8, hourly: 6500, range: 3500 },
];

const routes = [
  { from: 'Paris LBG', to: 'Genève GVA', hours: 0.9 },
  { from: 'Paris LBG', to: 'Nice NCE', hours: 1.2 },
  { from: 'Paris LBG', to: 'Londres FAB', hours: 1.0 },
  { from: 'Genève GVA', to: 'Milan LIN', hours: 0.7 },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function AviationConfigurator({ colors, phone }: Props) {
  const [plane, setPlane] = useState(aircraft[0]);
  const [route, setRoute] = useState(routes[0]);
  const [passengers, setPassengers] = useState(4);
  const [catering, setCatering] = useState(true);
  const [returnFlight, setReturnFlight] = useState(false);

  const total = useMemo(() => {
    let price = plane.hourly * route.hours * 1.5;
    if (returnFlight) price *= 1.8;
    if (catering) price += passengers * 350;
    return Math.round(price);
  }, [plane, route, passengers, catering, returnFlight]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Sélectionnez votre aéronef</h3>
          <div className="tool-cards">
            {aircraft.map((a) => (
              <button key={a.id} type="button" className={`tool-card ${plane.id === a.id ? 'active' : ''}`} onClick={() => setPlane(a)}>
                <span className="tool-card-name">{a.name}</span>
                <span className="tool-card-meta">{a.seats} places · {a.range} km</span>
                <span className="tool-card-price">{formatCurrency(a.hourly)}/h</span>
              </button>
            ))}
          </div>
          <h4>Itinéraire</h4>
          <div className="tool-chips">
            {routes.map((r, i) => (
              <button key={i} type="button" className={`tool-chip ${route === r ? 'active' : ''}`} onClick={() => setRoute(r)}>
                {r.from.split(' ')[0]} → {r.to.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <label className="tool-slider-label">Passagers ({passengers})
            <input type="range" min={1} max={plane.seats} value={passengers} onChange={(e) => setPassengers(+e.target.value)} className="tool-slider" />
          </label>
          <div className="tool-toggles">
            <label className="tool-toggle"><input type="checkbox" checked={catering} onChange={(e) => setCatering(e.target.checked)} /> Catering premium</label>
            <label className="tool-toggle"><input type="checkbox" checked={returnFlight} onChange={(e) => setReturnFlight(e.target.checked)} /> Vol retour</label>
          </div>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">{route.from} → {route.to}</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">Départ sous 2h · FBO VIP · Vol {route.hours}h estimé</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Réserver ce vol</a>
            <button type="button" className="tool-btn tool-btn--ghost">Empty legs disponibles</button>
          </div>
        </div>
      </div>
    </div>
  );
}
