import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './Loader.css'

const WORDS = ['ESTHÉTIQUE', 'PRESTIGE', 'ADRÉNALINE', 'YACHTING', 'AUTOMOBILE']

/** First-load cinematic curtain with a counter + rotating disciplines. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let current = 0
    const tick = () => {
      const step = current < 80 ? 2 : 1
      current = Math.min(100, current + step)
      setCount(current)
      if (current < 100) {
        setTimeout(tick, current < 80 ? 26 : 48)
      } else {
        setTimeout(() => setDone(true), 420)
      }
    }
    const id = setTimeout(tick, 280)
    return () => clearTimeout(id)
  }, [])

  const wordIndex = Math.min(WORDS.length - 1, Math.floor(count / 20))

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader__brand">ATELIER</div>
          <div className="loader__center">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[wordIndex]}
                className="loader__word"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="loader__foot">
            <span className="loader__meta">SUITE DE LANDING PAGES PREMIUM</span>
            <span className="loader__count">{count.toString().padStart(3, '0')}</span>
          </div>
          <div className="loader__bar">
            <motion.div
              className="loader__bar-fill"
              animate={{ scaleX: count / 100 }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
