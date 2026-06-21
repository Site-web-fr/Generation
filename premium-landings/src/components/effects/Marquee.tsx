import './effects.css';

interface Props {
  items: string[];
}

export default function Marquee({ items }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className="fx-marquee" aria-hidden>
      <div className="fx-marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="fx-marquee-item">
            {item}
            <span className="fx-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
