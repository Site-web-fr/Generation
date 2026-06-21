import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const img = (id: string) => `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

const vehicles = [
  { id: 'sf90', name: 'Ferrari SF90 Stradale', daily: 3500, km: 200, image: img('photo-1583121274602-3e2820c50d8d') },
  { id: 'huracan', name: 'Lamborghini Huracán EVO', daily: 2800, km: 250, image: img('photo-1618843479313-40f8afb4b4d8') },
  { id: 'rolls', name: 'Rolls-Royce Ghost', daily: 2200, km: 300, image: img('photo-1619767886558-ef1a8250a3c4') },
  { id: 'bentley', name: 'Bentley Continental GT', daily: 1800, km: 300, image: img('photo-1503376780353-7e6692767b70') },
  { id: 'porsche', name: 'Porsche 911 Turbo S', daily: 1500, km: 350, image: img('photo-1503736334956-4c8f8e929645') },
  { id: 'range', name: 'Range Rover SV Autobiography', daily: 900, km: 400, image: img('photo-1519641471654-76ce01057ad1') },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function VehicleRental({ colors, phone }: Props) {
  const [vehicle, setVehicle] = useState(vehicles[0]);
  const [days, setDays] = useState(3);
  const [extraKm, setExtraKm] = useState(0);
  const [delivery, setDelivery] = useState(true);
  const [insurance, setInsurance] = useState(true);

  const total = useMemo(() => {
    let price = vehicle.daily * days;
    const discount = days >= 7 ? 0.85 : days >= 4 ? 0.92 : 1;
    price *= discount;
    price += extraKm * 3.5;
    if (delivery) price += 350;
    if (insurance) price += days * 120;
    return Math.round(price);
  }, [vehicle, days, extraKm, delivery, insurance]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-carousel">
        <h3>Sélectionnez votre véhicule</h3>
        <div className="tool-vehicle-track">
          {vehicles.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`tool-vehicle-card ${vehicle.id === v.id ? 'active' : ''}`}
              onClick={() => setVehicle(v)}
            >
              <img className="tool-vehicle-photo" src={v.image} alt={v.name} loading="lazy" />
              <span className="tool-card-name">{v.name}</span>
              <span className="tool-card-price">{formatCurrency(v.daily)}/jour</span>
              <span className="tool-card-meta">{v.km} km inclus</span>
            </button>
          ))}
        </div>
      </div>
      <div className="tool-grid">
        <div className="tool-panel">
          <div className="tool-sliders-group">
            <label>Durée ({days} jours)
              <input type="range" min={1} max={14} value={days} onChange={(e) => setDays(+e.target.value)} className="tool-slider" />
            </label>
            <label>Kilomètres supplémentaires ({extraKm} km)
              <input type="range" min={0} max={1000} step={50} value={extraKm} onChange={(e) => setExtraKm(+e.target.value)} className="tool-slider" />
            </label>
          </div>
          <div className="tool-toggles">
            <label className="tool-toggle"><input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} /> Livraison à domicile (+350 €)</label>
            <label className="tool-toggle"><input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} /> Assurance premium (+120 €/jour)</label>
          </div>
        </div>
        <div className="tool-result">
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">{vehicle.name}</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            {days >= 4 && <p className="tool-estimate-badge">Remise longue durée appliquée</p>}
            <p className="tool-estimate-note">{vehicle.km * days + extraKm} km total · Caution : 15 000 €</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Réserver — appel ou paiement</a>
            <button type="button" className="tool-btn tool-btn--ghost">Payer en ligne</button>
          </div>
        </div>
      </div>
    </div>
  );
}
