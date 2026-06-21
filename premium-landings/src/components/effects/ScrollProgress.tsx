import { motion, useScroll, useSpring } from 'framer-motion';
import './effects.css';

interface Props {
  color?: string;
  glow?: string;
}

export default function ScrollProgress({ color = '#d4af7a', glow = 'rgba(212, 175, 122, 0.5)' }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div
      className="fx-scroll-progress"
      style={
        {
          '--progress-color': color,
          '--progress-glow': glow,
        } as React.CSSProperties
      }
    >
      <motion.div className="fx-scroll-progress-bar" style={{ scaleX }} />
    </div>
  );
}
