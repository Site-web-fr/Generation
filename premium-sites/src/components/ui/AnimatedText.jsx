import { motion } from 'framer-motion';

export function AnimatedTitle({ children, className = '', delay = 0 }) {
  const words = String(children).split(' ');
  return (
    <div className={`overflow-hidden ${className}`} aria-label={String(children)}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AnimatedWords({ children, className = '', delay = 0 }) {
  const words = String(children).split(' ');
  return (
    <div className={className} aria-label={String(children)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export function AnimatedLine({ className = '', color = '#d4af37', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ originX: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    />
  );
}

export function FadeInUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealX({ children, delay = 0, direction = 'left', className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: direction === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
