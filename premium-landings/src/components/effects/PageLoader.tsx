import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './effects.css';

interface Props {
  label: string;
  accent?: string;
  font?: string;
  onComplete?: () => void;
}

export default function PageLoader({ label, accent = '#d4af7a', font, onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let frame: number;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = '';
          onComplete?.();
        }, 400);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fx-loader"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
      )}
    </AnimatePresence>
  );
}
