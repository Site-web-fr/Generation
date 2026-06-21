import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/url';
import type { SiteColors } from '../../data/sites';

const eventTypes = [
  { id: 'gala', name: 'Gala de prestige', base: 85000 },
  { id: 'launch', name: 'Lancement produit', base: 120000 },
  { id: 'wedding', name: 'Mariage royal', base: 250000 },
  { id: 'summit', name: 'Sommet international', base: 180000 },
];

const venues = [
  { id: 'grand', name: 'Salon Grand Palais', capacity: 800 },
  { id: 'jardin', name: 'Jardin Privé', capacity: 300 },
  { id: 'terrasse', name: 'Terrasse Panoramique', capacity: 150 },
];

interface Props {
  colors: SiteColors;
  phone: string;
}

export default function EventPackageBuilder({ colors, phone }: Props) {
  const [event, setEvent] = useState(eventTypes[0]);
  const [venue, setVenue] = useState(venues[0]);
  const [guests, setGuests] = useState(200);
  const [catering, setCatering] = useState(true);
  const [av, setAv] = useState(true);
  const [artist, setArtist] = useState(false);

  const total = useMemo(() => {
    let price = event.base;
    price += guests * 180;
    if (catering) price += guests * 220;
    if (av) price += 25000;
    if (artist) price += 45000;
    if (guests > venue.capacity) price *= 1.2;
    return Math.round(price);
  }, [event, venue, guests, catering, av, artist]);

  return (
    <div className="tool" style={{ '--tool-accent': colors.accent } as React.CSSProperties}>
      <div className="tool-grid">
        <div className="tool-panel">
          <h3>Type d'événement</h3>
          <div className="tool-cards">
            {eventTypes.map((e) => (
              <button key={e.id} type="button" className={`tool-card ${event.id === e.id ? 'active' : ''}`} onClick={() => setEvent(e)}>
                <span className="tool-card-name">{e.name}</span>
                <span className="tool-card-price">dès {formatCurrency(e.base)}</span>
              </button>
            ))}
          </div>
          <h4>Lieu</h4>
          <div className="tool-chips">
            {venues.map((v) => (
              <button key={v.id} type="button" className={`tool-chip ${venue.id === v.id ? 'active' : ''}`} onClick={() => setVenue(v)}>
                {v.name} ({v.capacity})
              </button>
            ))}
          </div>
        </div>
        <div className="tool-result">
          <label className="tool-slider-label">Nombre d'invités ({guests})
            <input type="range" min={50} max={800} step={10} value={guests} onChange={(e) => setGuests(+e.target.value)} className="tool-slider" />
          </label>
          <div className="tool-toggles">
            <label className="tool-toggle"><input type="checkbox" checked={catering} onChange={(e) => setCatering(e.target.checked)} /> Catering Michelin</label>
            <label className="tool-toggle"><input type="checkbox" checked={av} onChange={(e) => setAv(e.target.checked)} /> Production AV immersive</label>
            <label className="tool-toggle"><input type="checkbox" checked={artist} onChange={(e) => setArtist(e.target.checked)} /> Artiste international</label>
          </div>
          <motion.div className="tool-estimate" key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <span className="tool-estimate-label">Budget estimé</span>
            <span className="tool-estimate-value">{formatCurrency(total)}</span>
            <p className="tool-estimate-note">{venue.name} · Scénographie 3D incluse · Coordinateur dédié</p>
          </motion.div>
          <div className="tool-actions">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="tool-btn tool-btn--primary">Planifier mon événement</a>
            <button type="button" className="tool-btn tool-btn--ghost">Visite virtuelle du lieu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
