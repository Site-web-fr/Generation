import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const metals = [
  { id: 'plat', name: 'Platine 950', multiplier: 1.4 },
  { id: 'gold18', name: 'Or jaune 18K', multiplier: 1 },
  { id: 'gold14', name: 'Or rose 14K', multiplier: 0.85 },
  { id: 'white', name: 'Or blanc 18K', multiplier: 1.05 },
];

const stones = [
  { id: 'd1', name: 'Diamant 1.0 ct G VS1', price: 8500 },
  { id: 'd15', name: 'Diamant 1.5 ct F VVS2', price: 18000 },
  { id: 'd2', name: 'Diamant 2.0 ct E IF', price: 42000 },
  { id: 'sapphire', name: 'Saphir Ceylan 2 ct', price: 12000 },
];

const settings = ['Solitaire', 'Halo', 'Pavé', 'Trilogie', 'Art Déco'];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function JewelryConfigurator({ colors, phone }: Props) {
  const [metal, setMetal] = useState(metals[1]);
  const [stone, setStone] = useState(stones[0]);
  const [setting, setSetting] = useState(settings[0]);
  const [engraving, setEngraving] = useState(true);

  const total = useMemo(() => {
    let price = 2500 * metal.multiplier + stone.price;
    if (setting === 'Pavé') price += 1800;
    if (setting === 'Halo') price += 1200;
    if (engraving) price += 150;
    return Math.round(price);
  }, [metal, stone, setting, engraving]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Créez votre bague</h3>
          <div className="tool-jewelry-preview">
            <div className={`tool-ring tool-ring--${metal.id}`}>
              <div className="tool-ring-stone" />
            </div>
          </div>
          <h4>Métal</h4>
          <div className="tool-chips">
            {metals.map((m) => (
              <button key={m.id} type="button" className={`tool-chip ${metal.id === m.id ? 'active' : ''}`} onClick={() => setMetal(m)}>
                {m.name}
              </button>
            ))}
          </div>
          <h4>Pierre</h4>
          <div className="tool-cards tool-cards--compact">
            {stones.map((s) => (
              <button key={s.id} type="button" className={`tool-card ${stone.id === s.id ? 'active' : ''}`} onClick={() => setStone(s)}>
                <span className="tool-card-name">{s.name}</span>
                <span className="tool-card-price">{formatCurrency(s.price)}</span>
              </button>
            ))}
          </div>
          <h4>Sertissage</h4>
          <div className="tool-chips">
            {settings.map((s) => (
              <button key={s} type="button" className={`tool-chip ${setting === s ? 'active' : ''}`} onClick={() => setSetting(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <label className="tool-toggle"><input type="checkbox" checked={engraving} onChange={(e) => setEngraving(e.target.checked)} /> Gravure personnalisée (+150 €)</label>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Votre création</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">Certificat GIA · Fabrication 4-6 semaines · Garantie à vie</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">RDV avec le maître joaillier</a>
            <button type="button" className="tool-btn tool-btn--ghost">Visualisation 3D complète</button>
          </div>
        </div>
      </div>
    </div>
  );
}
