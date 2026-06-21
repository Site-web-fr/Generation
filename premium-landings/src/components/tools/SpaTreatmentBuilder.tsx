import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const treatments = [
  { id: 'massage', name: 'Massage Signature', duration: 90, price: 380 },
  { id: 'facial', name: 'Soin Visage La Mer', duration: 75, price: 450 },
  { id: 'cryo', name: 'Cryothérapie Corps Entier', duration: 15, price: 180 },
  { id: 'iv', name: 'IV Therapy Premium', duration: 45, price: 320 },
  { id: 'hbot', name: 'HBOT Session', duration: 60, price: 280 },
  { id: 'ritual', name: 'Rituel Ayurvédique', duration: 120, price: 520 },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function SpaTreatmentBuilder({ colors, phone }: Props) {
  const [selected, setSelected] = useState<string[]>(['massage', 'facial']);
  const [days, setDays] = useState(3);
  const [suite, setSuite] = useState(true);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const total = useMemo(() => {
    const treatmentTotal = treatments.filter((t) => selected.includes(t.id)).reduce((s, t) => s + t.price, 0);
    const dayTotal = treatmentTotal * days;
    const suiteCost = suite ? days * 850 : 0;
    return dayTotal + suiteCost;
  }, [selected, days, suite]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Composez votre programme</h3>
          <div className="tool-cards tool-cards--spa">
            {treatments.map((t) => (
              <button key={t.id} type="button" className={`tool-card ${selected.includes(t.id) ? 'active' : ''}`} onClick={() => toggle(t.id)}>
                <span className="tool-card-name">{t.name}</span>
                <span className="tool-card-meta">{t.duration} min</span>
                <span className="tool-card-price">{formatCurrency(t.price)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <label className="tool-slider-label">Durée du séjour ({days} jours)
            <input type="range" min={1} max={7} value={days} onChange={(e) => setDays(+e.target.value)} className="tool-slider" />
          </label>
          <label className="tool-toggle"><input type="checkbox" checked={suite} onChange={(e) => setSuite(e.target.checked)} /> Suite privée avec vue Alpes (+850 €/nuit)</label>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Programme sur-mesure</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">{selected.length} soins/jour · Bilan longévité offert</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Réserver mon séjour</a>
            <button type="button" className="tool-btn tool-btn--ghost">Questionnaire pré-arrivée</button>
          </div>
        </div>
      </div>
    </div>
  );
}
