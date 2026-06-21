import { useMemo, useState } from 'react';

const cases = ['Or rose', 'Acier', 'Platine', 'Titane'];
const dials = ['Noir', 'Bleu nuit', 'Argenté', 'Vert forêt'];
const straps = ['Cuir alligator', 'Bracelet acier', 'Caoutchouc', 'Tissu NATO'];

export default function WatchConfigurator() {
  const [caseMat, setCaseMat] = useState(cases[0]);
  const [dial, setDial] = useState(dials[0]);
  const [strap, setStrap] = useState(straps[0]);
  const [engraving, setEngraving] = useState(false);

  const base = 28500;
  const total = useMemo(() => {
    let price = base;
    if (caseMat === 'Platine') price += 12000;
    if (caseMat === 'Or rose') price += 8000;
    if (caseMat === 'Titane') price += 3500;
    if (strap === 'Cuir alligator') price += 2800;
    if (engraving) price += 450;
    return price;
  }, [caseMat, strap, engraving]);

  return (
    <div className="configurator-grid">
      <div className="configurator-controls">
        <label>Boîtier</label>
        <div className="configurator-option-group">
          {cases.map((c) => (
            <button key={c} type="button" className={`configurator-option ${caseMat === c ? 'active' : ''}`} onClick={() => setCaseMat(c)}>{c}</button>
          ))}
        </div>
        <label>Cadran</label>
        <div className="configurator-option-group">
          {dials.map((d) => (
            <button key={d} type="button" className={`configurator-option ${dial === d ? 'active' : ''}`} onClick={() => setDial(d)}>{d}</button>
          ))}
        </div>
        <label>Bracelet</label>
        <div className="configurator-option-group">
          {straps.map((s) => (
            <button key={s} type="button" className={`configurator-option ${strap === s ? 'active' : ''}`} onClick={() => setStrap(s)}>{s}</button>
          ))}
        </div>
        <label>
          <input type="checkbox" checked={engraving} onChange={(e) => setEngraving(e.target.checked)} style={{ marginRight: 8 }} />
          Gravure personnalisée (+450 €)
        </label>
      </div>

      <div className="configurator-preview">
        <div style={{ width: 160, height: 160, borderRadius: '50%', border: '3px solid var(--accent)', background: `radial-gradient(circle at 30% 30%, ${dial === 'Noir' ? '#1a1a1a' : dial === 'Bleu nuit' ? '#0a1628' : dial === 'Vert forêt' ? '#1a2e1a' : '#c0c0c0'}, #0a0a0a)`, margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(212,175,55,0.2)' }} />
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{caseMat} · Cadran {dial} · {strap}</p>
        <div className="configurator-price">
          <div className="amount">{total.toLocaleString('fr-FR')} €</div>
          <div className="detail">Pièce configurée sur-mesure · Livraison 8–12 semaines</div>
        </div>
        <button type="button" className="configurator-cta">
          Commander & verser l'acompte 30%
        </button>
      </div>
    </div>
  );
}
