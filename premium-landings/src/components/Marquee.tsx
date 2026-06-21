import './Marquee.css'

interface MarqueeProps {
  items: string[]
  /** seconds per loop */
  duration?: number
  reverse?: boolean
}

/** Infinite horizontal ticker. Duplicates content for a seamless loop. */
export default function Marquee({
  items,
  duration = 28,
  reverse = false,
}: MarqueeProps) {
  const sequence = [...items, ...items]
  return (
    <div className="marquee" aria-hidden>
      <div
        className="marquee__track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {sequence.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
