import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobileDevice } from '../../utils/device';
import './effects.css';

interface Props {
  label: string;
  accent?: string;
  font?: string;
  onComplete?: () => void;
}

export default function PageLoader({ label, accent = '#d4af7a', font, onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(() => isMobileDevice());
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isMobileDevice()) {
      onCompleteRef.current?.();
      return;
    }

    document.body.style.overflow = 'hidden';
    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const duration = 1600;

    const finish = () => {
      setDone(true);
      document.body.style.overflow = '';
      onCompleteRef.current?.();
    };

    const tick = (now: number) => {
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
