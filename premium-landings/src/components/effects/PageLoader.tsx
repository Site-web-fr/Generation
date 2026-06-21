import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '../../utils/device';
import { preloadPremiumExperience } from '../../utils/preloadPremiumChunks';
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
  const [status, setStatus] = useState('Préparation');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let cancelled = false;
    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;

    const finish = () => {
      if (cancelled) return;
      setDone(true);
      document.body.style.overflow = '';
      onCompleteRef.current?.();
    };

    if (isMobileDevice()) {
      setStatus('Chargement 3D');
      preloadPremiumExperience((pct) => {
        if (!cancelled) setProgress(pct);
      })
        .then(() => {
          if (!cancelled) {
            setProgress(100);
            timeout = setTimeout(finish, 400);
          }
        })
        .catch(() => {
          if (!cancelled) finish();
        });

      return () => {
        cancelled = true;
        clearTimeout(timeout);
        document.body.style.overflow = '';
      };
    }

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
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
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
        {isMobileDevice() && <span className="fx-loader-status">{status}</span>}
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
