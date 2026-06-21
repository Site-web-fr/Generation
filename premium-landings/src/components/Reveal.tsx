import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** delay in seconds */
  delay?: number
  /** travel distance in px */
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'section'
}

/** Scroll-triggered fade + rise. Respects reduced motion via viewport once. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Word-by-word headline reveal. Pass a string; <em>…</em> spans are honored. */
export function RevealHeadline({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  // Split on <em> markers while keeping them
  const parts = text.split(/(<em>.*?<\/em>)/g).filter(Boolean)
  let wordIndex = 0
  return (
    <h1 className={className} aria-label={text.replace(/<\/?em>/g, '')}>
      {parts.map((part, i) => {
        const isEm = part.startsWith('<em>')
        const clean = part.replace(/<\/?em>/g, '')
        const words = clean.split(' ').filter(Boolean)
        return words.map((word, j) => {
          const idx = wordIndex++
          const content = (
            <motion.span
              key={`${i}-${j}`}
              style={{ display: 'inline-block', willChange: 'transform' }}
              initial={{ opacity: 0, y: '0.5em', rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {'\u00A0'}
            </motion.span>
          )
          return isEm ? (
            <em key={`em-${i}-${j}`} style={{ fontStyle: 'italic' }}>
              {content}
            </em>
          ) : (
            content
          )
        })
      })}
    </h1>
  )
}
