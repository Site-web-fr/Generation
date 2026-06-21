import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    };

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      follower.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'rgba(201, 169, 110, 0.8)';
      follower.style.background = 'rgba(201, 169, 110, 0.05)';
    };

    const onLeave = () => {
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.borderColor = 'rgba(201, 169, 110, 0.4)';
      follower.style.background = 'transparent';
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 10,
          height: 10,
          background: 'var(--gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          transition: 'none',
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          width: 40,
          height: 40,
          border: '1px solid rgba(201, 169, 110, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s, background 0.3s',
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
