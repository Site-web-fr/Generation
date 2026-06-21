import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const treatments = [
  { id: 'rhino', name: 'Rhinoplastie', base: 4500 },
  { id: 'filler', name: 'Acide hyaluronique', base: 680 },
  { id: 'botox', name: 'Botox premium', base: 420 },
  { id: 'lifting', name: 'Lifting cervico-facial', base: 8900 },
  { id: 'lipo', name: 'Liposuccion HD', base: 5200 },
];

const zones = ['Visage', 'Lèvres', 'Mâchoire', 'Cou', 'Corps'];

export default function TreatmentPlanner() {
  const [treatment, setTreatment] = useState(treatments[0]);
  const [zone, setZone] = useState(zones[0]);
  const [sessions, setSessions] = useState(1);
  const [morph, setMorph] = useState(50);

  const total = useMemo(() => {
    const zoneMult = zone === 'Corps' ? 1.4 : 1;
    const sessionMult = treatment.id === 'filler' || treatment.id === 'botox' ? sessions : 1;
    return Math.round(treatment.base * zoneMult * sessionMult);
  }, [treatment, zone, sessions]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Traitement</label>
        <div className="configurator-option-group">
          {treatments.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`configurator-option ${treatment.id === t.id ? 'active' : ''}`}
              onClick={() => setTreatment(t)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <label>Zone</label>
        <div className="configurator-option-group">
          {zones.map((z) => (
            <button
              key={z}
              type="button"
              className={`configurator-option ${zone === z ? 'active' : ''}`}
              onClick={() => setZone(z)}
            >
              {z}
            </button>
          ))}
        </div>

        {(treatment.id === 'filler' || treatment.id === 'botox') && (
          <>
            <label>Séances : {sessions}</label>
            <input
              type="range"
              min={1}
              max={4}
              value={sessions}
              onChange={(e) => setSessions(Number(e.target.value))}
            />
          </>
        )}

        <label>Simulation résultat : {morph}%</label>
        <input
          type="range"
          min={0}
          max={100}
          value={morph}
          onChange={(e) => setMorph(Number(e.target.value))}
        />
      </div>

      <div className="configurator-preview">
        <div className="before-after" style={{ width: '100%', maxWidth: 280 }}>
          <div className="ba-face" style={{ position: 'relative', height: 200, borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(180deg, #2a2228, #1a1518)' }}>
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse 60% 80% at 50% 40%, rgba(232,213,196,${morph / 200}), transparent)`,
                clipPath: `inset(0 ${100 - morph}% 0 0)`,
              }}
            />
            <div style={{ position: 'absolute', left: `${morph}%`, top: 0, bottom: 0, width: 2, background: 'var(--accent)', transform: 'translateX(-50%)' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 8, fontSize: '0.65rem', opacity: 0.6 }}>Avant</span>
            <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.65rem', opacity: 0.6 }}>Après</span>
          </div>
        </div>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">{treatment.name} · {zone} · Devis indicatif TTC</div>
        </div>
        <button type="button" className="configurator-cta">
          Réserver ma consultation — Paiement acompte 200 €
        </button>
      </div>
    </div>
  );
}
