import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    let rafId;
    const animate = () => {
      followerX += (mouseX - followerX - 20) * 0.12;
      followerY += (mouseY - followerY - 20) * 0.12;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      cursor.style.transform += ' scale(2)';
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'rgba(212, 175, 55, 0.8)';
    };

    const onLeaveLink = () => {
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }} />
      <div ref={followerRef} className="custom-cursor-follower" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998 }} />
    </>
  );
}
