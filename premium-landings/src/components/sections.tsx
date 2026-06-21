import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { useInView } from '../lib/hooks'
import { useEffect, useRef, useState } from 'react'
import './sections.css'

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <header className={`sec-head sec-head--${align}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display sec-head__title">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p className="lead sec-head__intro">{intro}</p>
        </Reveal>
      )}
    </header>
  )
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const dur = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])
  return (
    <span ref={ref}>
      {val.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}

export interface StatItem {
  value: number
  suffix?: string
  label: string
}

export function Stats({ items }: { items: StatItem[] }) {
  return (
    <div className="stats">
      {items.map((s, i) => (
        <Reveal key={i} delay={i * 0.08} className="stats__item">
          <div className="stats__value">
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <div className="stats__label">{s.label}</div>
        </Reveal>
      ))}
    </div>
  )
}

export interface FeatureItem {
  title: string
  body: string
  icon?: ReactNode
}

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="features">
      {items.map((f, i) => (
        <Reveal key={i} delay={i * 0.06} className="feature card">
          <div className="feature__index">0{i + 1}</div>
          {f.icon && <div className="feature__icon">{f.icon}</div>}
          <h3 className="feature__title">{f.title}</h3>
          <p className="feature__body muted">{f.body}</p>
        </Reveal>
      ))}
    </div>
  )
}

export interface StepItem {
  title: string
  body: string
}

export function Steps({ items }: { items: StepItem[] }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <Reveal key={i} delay={i * 0.08} as="li" className="step">
          <span className="step__num">{(i + 1).toString().padStart(2, '0')}</span>
          <div>
            <h3 className="step__title">{s.title}</h3>
            <p className="muted">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

export function Quote({
  quote,
  author,
  role,
}: {
  quote: string
  author: string
  role: string
}) {
  return (
    <Reveal className="quote">
      <p className="quote__text">“{quote}”</p>
      <div className="quote__by">
        <span className="quote__author">{author}</span>
        <span className="quote__role muted">{role}</span>
      </div>
    </Reveal>
  )
}
