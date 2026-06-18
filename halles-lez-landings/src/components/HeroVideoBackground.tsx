import { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../utils/url';

interface Props {
  src: string;
  poster?: string;
}

export default function HeroVideoBackground({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setActive(!motion.matches);

    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!active || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  if (!active) return null;

  return (
    <>
      <video
        ref={videoRef}
        className="hero-video"
        src={assetUrl(src)}
        poster={poster ? assetUrl(poster) : undefined}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-overlay" aria-hidden="true" />
    </>
  );
}
