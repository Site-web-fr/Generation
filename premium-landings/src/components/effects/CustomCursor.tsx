import { useEffect, useRef, useState } from 'react';
import './effects.css';

interface Props {
  color?: string;
}

export default function CustomCursor({ color = '#d4af7a' }: Props) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-color', color);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const bind = () => {
      document.querySelectorAll('a, button, .tool-card, .hub-card, input[type="range"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    bind();

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(loop);

    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      document.querySelectorAll('a, button, .tool-card, .hub-card, input[type="range"]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [color]);

  return (
    <>
      <div
        ref={ringRef}
        className={`fx-cursor--ring ${hovering ? 'fx-cursor-ring--hover' : ''}`}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={`fx-cursor ${hovering ? 'fx-cursor--hover' : ''}`}
        aria-hidden
      />
    </>
  );
}
