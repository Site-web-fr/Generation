import { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../utils/url';

interface Props {
  src: string;
  poster: string;
  alt: string;
  objectPosition?: string;
}

export default function HeroDishVideo({ src, poster, alt, objectPosition = 'center' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setUseVideo(!motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  const tryPlay = () => {
    videoRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    if (!useVideo) return;
    const el = videoRef.current;
    if (!el) return;

    tryPlay();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [useVideo, src]);

  if (!useVideo) {
    return (
      <img
        src={assetUrl(poster)}
        alt={alt}
        className="hero-dish"
        fetchPriority="high"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="hero-dish hero-dish-video"
      style={{ objectPosition }}
      src={assetUrl(src)}
      poster={assetUrl(poster)}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      onLoadedData={tryPlay}
      onCanPlay={tryPlay}
      aria-label={alt}
    />
  );
}
