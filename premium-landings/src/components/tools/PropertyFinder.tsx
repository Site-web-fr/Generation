import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const properties = [
  { id: 'penthouse', name: 'Penthouse Triangle d\'Or', price: 8900000, sqm: 320, rooms: 5, location: 'Paris 8e' },
  { id: 'villa', name: 'Villa Architecte Cap Ferrat', price: 24500000, sqm: 680, rooms: 8, location: 'Saint-Jean-Cap-Ferrat' },
  { id: 'loft', name: 'Loft Industrial Le Marais', price: 3200000, sqm: 185, rooms: 3, location: 'Paris 4e' },
  { id: 'chalet', name: 'Chalet Contemporain Gstaad', price: 15800000, sqm: 520, rooms: 7, location: 'Gstaad' },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function PropertyFinder({ colors, phone }: Props) {
  const [property, setProperty] = useState(properties[0]);
  const [downPayment, setDownPayment] = useState(30);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(3.2);

  const finance = useMemo(() => {
    const loan = property.price * (1 - downPayment / 100);
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return { loan, monthly, down: property.price * (downPayment / 100) };
  }, [property, downPayment, years, rate]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Sélectionnez un bien exclusif</h3>
          <div className="tool-cards tool-cards--property">
            {properties.map((p) => (
              <button key={p.id} type="button" className={`tool-card tool-card--property ${property.id === p.id ? 'active' : ''}`} onClick={() => setProperty(p)}>
                <div className="tool-property-visual" />
                <span className="tool-card-name">{p.name}</span>
                <span className="tool-card-meta">{p.sqm} m² · {p.rooms} pièces · {p.location}</span>
                <span className="tool-card-price">{formatCurrency(p.price)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <h3>Simulateur de financement</h3>
          <div className="tool-sliders-group">
            <label>Apport ({downPayment}%)
              <input type="range" min={10} max={50} value={downPayment} onChange={(e) => setDownPayment(+e.target.value)} className="tool-slider" />
            </label>
            <label>Durée ({years} ans)
              <input type="range" min={10} max={25} value={years} onChange={(e) => setYears(+e.target.value)} className="tool-slider" />
            </label>
            <label>Taux ({rate}%)
              <input type="range" min={2} max={5} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className="tool-slider" />
            </label>
          </div>
          <motion.div className="tool-estimate" key={finance.monthly} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <div className="tool-finance-row"><span>Apport</span><span>{formatCurrency(finance.down)}</span></div>
            <div className="tool-finance-row"><span>Emprunt</span><span>{formatCurrency(finance.loan)}</span></div>
            <div className="tool-finance-row tool-finance-row--highlight">
              <span>Mensualité estimée</span>
              <span>{formatCurrency(finance.monthly)}/mois</span>
            </div>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Planifier une visite privée</a>
            <button type="button" className="tool-btn tool-btn--ghost">Visite virtuelle 3D</button>
          </div>
        </div>
      </div>
    </div>
  );
}
