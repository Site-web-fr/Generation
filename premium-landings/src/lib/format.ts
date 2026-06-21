export const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const aed = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'AED',
  maximumFractionDigits: 0,
})

export const num = new Intl.NumberFormat('fr-FR')

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
