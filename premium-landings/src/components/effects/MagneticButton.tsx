import { useRef, type ReactNode, type MouseEvent } from 'react';
import './effects.css';

interface Props {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, href, className = '', onClick }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const cls = `fx-magnetic fx-magnetic-btn ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={cls}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}
