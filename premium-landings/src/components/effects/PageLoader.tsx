import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './effects.css';

interface Props {
  label: string;
  accent?: string;
  font?: string;
  preloadImage?: string;
  onComplete?: () => void;
}

const MAX_WAIT_MS = 6000;

export default function PageLoader({ label, accent = '#d4af7a', font, preloadImage, onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let cancelled = false;
    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;
    let maxWait: ReturnType<typeof setTimeout>;

    const finish = () => {
      if (cancelled) return;
      setDone(true);
      document.body.style.overflow = '';
      onCompleteRef.current?.();
    };

    maxWait = setTimeout(finish, MAX_WAIT_MS);

    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(finish, 300);
      }
    };

    frame = requestAnimationFrame(tick);

    if (preloadImage) {
      const img = new Image();
      img.src = preloadImage;
    }

    return () => {
      cancelled = true;
      clearTimeout(maxWait);
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, []);

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fx-loader"
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={
          {
            '--loader-accent': accent,
            '--loader-font': font,
          } as React.CSSProperties
        }
      >
        <span className="fx-loader-label">Expérience premium</span>
        <span className="fx-loader-name">{label}</span>
        <span className="fx-loader-counter">{progress}</span>
        <div className="fx-loader-bar-wrap">
          <motion.div
            className="fx-loader-bar"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
