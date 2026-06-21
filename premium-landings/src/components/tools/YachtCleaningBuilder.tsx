import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const packages = [
  { id: 'express', name: 'Express Wash', base: 800, desc: 'Coque + pont rapide' },
  { id: 'detail', name: 'Full Detail', base: 2500, desc: 'Intérieur + extérieur complet' },
  { id: 'ceramic', name: 'Ceramic Pro', base: 4500, desc: 'Traitement céramique 5 ans' },
  { id: 'maintenance', name: 'Maintenance Program', base: 1800, desc: 'Mensuel — 4 interventions/an' },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function YachtCleaningBuilder({ colors, phone }: Props) {
  const [pkg, setPkg] = useState(packages[1]);
  const [length, setLength] = useState(35);
  const [interior, setInterior] = useState(true);
  const [teak, setTeak] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const total = useMemo(() => {
    let price = pkg.base;
    if (length > 30) price += (length - 30) * 120;
    if (length > 50) price += (length - 50) * 200;
    if (interior) price += length * 25;
    if (teak) price += length * 40;
    if (urgent) price *= 1.5;
    return Math.round(price);
  }, [pkg, length, interior, teak, urgent]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Configurez votre service</h3>
          <div className="tool-cards">
            {packages.map((p) => (
              <button key={p.id} type="button" className={`tool-card ${pkg.id === p.id ? 'active' : ''}`} onClick={() => setPkg(p)}>
                <span className="tool-card-name">{p.name}</span>
                <span className="tool-card-meta">{p.desc}</span>
                <span className="tool-card-price">dès {formatCurrency(p.base)}</span>
              </button>
            ))}
          </div>
          <label className="tool-slider-label">Longueur du yacht ({length}m)
            <input type="range" min={15} max={80} value={length} onChange={(e) => setLength(+e.target.value)} className="tool-slider" />
          </label>
          <div className="tool-toggles">
            <label className="tool-toggle"><input type="checkbox" checked={interior} onChange={(e) => setInterior(e.target.checked)} /> Intérieur premium</label>
            <label className="tool-toggle"><input type="checkbox" checked={teak} onChange={(e) => setTeak(e.target.checked)} /> Traitement teck</label>
            <label className="tool-toggle"><input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} /> Intervention urgente (&lt;4h)</label>
          </div>
        </div>
        <div className="tool-result">
          <div className="tool-yacht-preview">
            <div className="tool-yacht-hull" style={{ width: `${Math.min(100, length)}%` }} />
            <span>{length}m — {length > 50 ? 'Superyacht' : length > 30 ? 'Motor Yacht' : 'Day Cruiser'}</span>
          </div>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Devis instantané</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">Garantie brillance 30 jours · Reporting photo inclus</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Réserver l'intervention</a>
            <button type="button" className="tool-btn tool-btn--ghost">Programme maintenance</button>
          </div>
        </div>
      </div>
    </div>
  );
}
