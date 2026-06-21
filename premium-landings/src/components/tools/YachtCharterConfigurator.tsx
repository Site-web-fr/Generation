import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const yachts = [
  { id: 'sunseeker', name: 'Sunseeker 75', length: 23, weekly: 45000, guests: 8 },
  { id: 'princess', name: 'Princess Y85', length: 26, weekly: 68000, guests: 10 },
  { id: 'lurssen', name: 'Lürssen 52m', length: 52, weekly: 380000, guests: 12 },
  { id: 'feadship', name: 'Feadship 62m', length: 62, weekly: 520000, guests: 14 },
];

const destinations = [
  { id: 'med', name: 'Méditerranée', multiplier: 1 },
  { id: 'carib', name: 'Caraïbes', multiplier: 1.2 },
  { id: 'maldives', name: 'Maldives', multiplier: 1.35 },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function YachtCharterConfigurator({ colors, phone }: Props) {
  const [yacht, setYacht] = useState(yachts[1]);
  const [dest, setDest] = useState(destinations[0]);
  const [weeks, setWeeks] = useState(1);
  const [chef, setChef] = useState(true);
  const [heli, setHeli] = useState(false);

  const total = useMemo(() => {
    let price = yacht.weekly * weeks * dest.multiplier;
    if (chef) price += weeks * 8500;
    if (heli) price += weeks * 15000;
    return Math.round(price);
  }, [yacht, dest, weeks, chef, heli]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Sélectionnez votre yacht</h3>
          <div className="tool-cards">
            {yachts.map((y) => (
              <button key={y.id} type="button" className={`tool-card ${yacht.id === y.id ? 'active' : ''}`} onClick={() => setYacht(y)}>
                <span className="tool-card-name">{y.name}</span>
                <span className="tool-card-meta">{y.length}m · {y.guests} invités</span>
                <span className="tool-card-price">{formatCurrency(y.weekly)}/sem</span>
              </button>
            ))}
          </div>
          <h4>Destination</h4>
          <div className="tool-chips">
            {destinations.map((d) => (
              <button key={d.id} type="button" className={`tool-chip ${dest.id === d.id ? 'active' : ''}`} onClick={() => setDest(d)}>
                {d.name}
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <label className="tool-slider-label">Durée ({weeks} semaine{weeks > 1 ? 's' : ''})
            <input type="range" min={1} max={4} value={weeks} onChange={(e) => setWeeks(+e.target.value)} className="tool-slider" />
          </label>
          <div className="tool-toggles">
            <label className="tool-toggle"><input type="checkbox" checked={chef} onChange={(e) => setChef(e.target.checked)} /> Chef étoilé à bord</label>
            <label className="tool-toggle"><input type="checkbox" checked={heli} onChange={(e) => setHeli(e.target.checked)} /> Transfert hélicoptère</label>
          </div>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Charter estimé</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">APA 30% · Équipage 5★ · Itinéraire personnalisé inclus</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Demander l'itinéraire</a>
            <button type="button" className="tool-btn tool-btn--ghost">Brochure PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
