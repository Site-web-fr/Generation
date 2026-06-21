import { motion } from 'framer-motion';
import CustomCursor from './CustomCursor';

export default function PageWrapper({ children, bgColor = '#000' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ background: bgColor, minHeight: '100vh', overflowX: 'hidden' }}
    >
      <CustomCursor />
      {children}
    </motion.div>
  );
}
