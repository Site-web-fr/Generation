import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

export default function TextReveal({ text, className = '', as: Tag = 'h1', delay = 0 }: Props) {
  const words = text.split(' ');

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="fx-text-reveal-word">
          <motion.span
            className="fx-text-reveal-inner"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
