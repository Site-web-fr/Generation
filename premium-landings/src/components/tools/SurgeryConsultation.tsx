import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const procedures = [
  { id: 'rhino', name: 'Rhinoplastie', base: 8500, duration: '2h', recovery: '10 jours' },
  { id: 'lift', name: 'Lifting cervico-facial', base: 12000, duration: '3h', recovery: '14 jours' },
  { id: 'bleph', name: 'Blépharoplastie', base: 4500, duration: '1h30', recovery: '7 jours' },
  { id: 'lipo', name: 'Liposuccion HD', base: 6500, duration: '2h', recovery: '14 jours' },
  { id: 'breast', name: 'Augmentation mammaire', base: 7500, duration: '1h30', recovery: '10 jours' },
  { id: 'inject', name: 'Protocole injectables', base: 1200, duration: '45min', recovery: '2 jours' },
];

const zones = ['Visage', 'Corps', 'Seins', 'Médecine esthétique'];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function SurgeryConsultation({ colors, phone }: Props) {
  const [procedure, setProcedure] = useState(procedures[0]);
  const [zone, setZone] = useState(zones[0]);
  const [consultation, setConsultation] = useState(true);
  const [simulation3d, setSimulation3d] = useState(true);
  const [beforeAfter, setBeforeAfter] = useState(50);

  const total = useMemo(() => {
    let price = procedure.base;
    if (consultation) price += 250;
    if (simulation3d) price += 500;
    return price;
  }, [procedure, consultation, simulation3d]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Choisissez votre intervention</h3>
          <div className="tool-chips">
            {zones.map((z) => (
              <button key={z} type="button" className={`tool-chip ${zone === z ? 'active' : ''}`} onClick={() => setZone(z)}>
                {z}
              </button>
            ))}
          </div>
          <div className="tool-cards">
            {procedures.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`tool-card ${procedure.id === p.id ? 'active' : ''}`}
                onClick={() => setProcedure(p)}
              >
                <span className="tool-card-name">{p.name}</span>
                <span className="tool-card-meta">{p.duration} · {p.recovery}</span>
                <span className="tool-card-price">dès {formatCurrency(p.base)}</span>
              </button>
            ))}
          </div>
          <div className="tool-toggles">
            <label className="tool-toggle">
              <input type="checkbox" checked={consultation} onChange={(e) => setConsultation(e.target.checked)} />
              Consultation pré-opératoire (+250 €)
            </label>
            <label className="tool-toggle">
              <input type="checkbox" checked={simulation3d} onChange={(e) => setSimulation3d(e.target.checked)} />
              Simulation 3D (+500 €)
            </label>
          </div>
        </div>
        <div className="tool-result">
          <div className="tool-ba">
            <span>Avant</span>
            <input type="range" min={0} max={100} value={beforeAfter} onChange={(e) => setBeforeAfter(+e.target.value)} className="tool-slider" />
            <span>Après</span>
            <div className="tool-ba-preview" style={{ clipPath: `inset(0 ${100 - beforeAfter}% 0 0)` }}>
              <div className="tool-ba-after" />
            </div>
          </div>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Estimation totale</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">Consultation gratuite si intervention confirmée sous 30 jours</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Réserver ma consultation</a>
            <button type="button" className="tool-btn tool-btn--ghost">Recevoir le dossier par email</button>
          </div>
        </div>
      </div>
    </div>
  );
}
