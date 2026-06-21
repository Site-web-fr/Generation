import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = '', id }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
