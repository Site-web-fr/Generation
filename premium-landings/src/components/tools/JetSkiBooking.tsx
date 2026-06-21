import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const fleet = [
  { id: 'gtx', name: 'Sea-Doo GTX Limited 300', power: '300 HP', price: 450, image: 'gtx' },
  { id: 'rxt', name: 'Sea-Doo RXT-X RS', power: '325 HP', price: 550, image: 'rxt' },
  { id: 'spark', name: 'Sea-Doo Spark Trixx', power: '90 HP', price: 280, image: 'spark' },
  { id: 'fx', name: 'Yamaha FX SVHO', power: '250 HP', price: 480, image: 'fx' },
];

const experiences = [
  { id: 'standard', name: 'Standard', multiplier: 1 },
  { id: 'sunrise', name: 'Sunrise VIP', multiplier: 1.4 },
  { id: 'sunset', name: 'Sunset Premium', multiplier: 1.3 },
  { id: 'private', name: 'Private Tour + Drone', multiplier: 1.8 },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function JetSkiBooking({ colors, phone }: Props) {
  const [vehicle, setVehicle] = useState(fleet[0]);
  const [experience, setExperience] = useState(experiences[0]);
  const [hours, setHours] = useState(2);
  const [riders, setRiders] = useState(1);

  const total = useMemo(() => {
    const base = vehicle.price * hours * experience.multiplier;
    const extraRiders = Math.max(0, riders - 1) * 80 * hours;
    return Math.round(base + extraRiders);
  }, [vehicle, experience, hours, riders]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Choisissez votre jet ski</h3>
          <div className="tool-cards tool-cards--fleet">
            {fleet.map((v) => (
              <button key={v.id} type="button" className={`tool-card tool-card--fleet ${vehicle.id === v.id ? 'active' : ''}`} onClick={() => setVehicle(v)}>
                <div className={`tool-fleet-visual tool-fleet-visual--${v.image}`} />
                <span className="tool-card-name">{v.name}</span>
                <span className="tool-card-meta">{v.power}</span>
                <span className="tool-card-price">{formatCurrency(v.price)}/h</span>
              </button>
            ))}
          </div>
          <h4>Expérience</h4>
          <div className="tool-chips">
            {experiences.map((e) => (
              <button key={e.id} type="button" className={`tool-chip ${experience.id === e.id ? 'active' : ''}`} onClick={() => setExperience(e)}>
                {e.name}
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <div className="tool-sliders-group">
            <label>Durée ({hours}h)
              <input type="range" min={1} max={8} value={hours} onChange={(e) => setHours(+e.target.value)} className="tool-slider" />
            </label>
            <label>Conducteurs ({riders})
              <input type="range" min={1} max={4} value={riders} onChange={(e) => setRiders(+e.target.value)} className="tool-slider" />
            </label>
          </div>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Total estimé</span>
            <span className="tool-estimate-value">{formatCurrency(total, 'AED')}</span>
            <p className="tool-estimate-note">Assurance, gilet, briefing inclus · Transfert hôtel +150 AED</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Confirmer ma réservation</a>
            <button type="button" className="tool-btn tool-btn--ghost">Payer en ligne — Stripe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
