import type { ReactNode } from 'react'
import './configurator.css'

export interface Option<T extends string = string> {
  id: T
  label: string
  sub?: string
}

/** A segmented set of selectable chips. */
export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly Option<T>[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="cfg-field">
      <span className="cfg-field__label">{label}</span>
      <div className="cfg-chips">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`cfg-chip ${value === o.id ? 'is-active' : ''}`}
            onClick={() => onChange(o.id)}
            data-cursor="hover"
          >
            <span className="cfg-chip__label">{o.label}</span>
            {o.sub && <span className="cfg-chip__sub">{o.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

/** A labelled range slider with live value display. */
export function RangeField({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format,
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (v: number) => void
  format: (v: number) => string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="cfg-field">
      <div className="cfg-range__head">
        <span className="cfg-field__label">{label}</span>
        <span className="cfg-range__value">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cfg-range"
        style={{ ['--pct' as string]: `${pct}%` }}
        data-cursor="hover"
      />
    </div>
  )
}

/** Color swatch picker (used by the car configurator). */
export function SwatchGroup({
  label,
  swatches,
  value,
  onChange,
}: {
  label: string
  swatches: readonly { id: string; label: string; hex: string }[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="cfg-field">
      <span className="cfg-field__label">{label}</span>
      <div className="cfg-swatches">
        {swatches.map((s) => (
          <button
            key={s.id}
            type="button"
            title={s.label}
            aria-label={s.label}
            className={`cfg-swatch ${value === s.id ? 'is-active' : ''}`}
            style={{ ['--swatch' as string]: s.hex }}
            onClick={() => onChange(s.id)}
            data-cursor="hover"
          />
        ))}
      </div>
    </div>
  )
}

/** Big animated price/summary readout with CTAs. */
export function PriceReadout({
  caption,
  amount,
  note,
  children,
}: {
  caption: string
  amount: string
  note?: string
  children?: ReactNode
}) {
  return (
    <div className="cfg-readout">
      <span className="cfg-readout__caption">{caption}</span>
      <div className="cfg-readout__amount">{amount}</div>
      {note && <span className="cfg-readout__note muted">{note}</span>}
      {children && <div className="cfg-readout__actions">{children}</div>}
    </div>
  )
}
