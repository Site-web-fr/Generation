export type BrandId =
  | 'aesthetic'
  | 'realestate'
  | 'jetski'
  | 'yacht'
  | 'vehicle'

export interface Brand {
  id: BrandId
  /** URL slug */
  path: string
  /** Wordmark shown in nav / hero */
  name: string
  /** Short discipline label */
  category: string
  /** Hero headline (supports <em> for italic accent) */
  headline: string
  /** Supporting hero sentence */
  tagline: string
  /** City / locale */
  location: string
  accent: string
  accent2: string
  /** rgba used for glows */
  glow: string
  /** Hub card description */
  blurb: string
}

export const BRANDS: Brand[] = [
  {
    id: 'aesthetic',
    path: '/clinique',
    name: 'MAISON LUMIÈRE',
    category: 'Chirurgie & Médecine Esthétique',
    headline: 'La beauté, <em>sculptée</em> avec précision',
    tagline:
      "Un centre d'excellence où la science médicale rencontre l'art du sur-mesure. Chirurgiens de renommée internationale, protocoles d'avant-garde.",
    location: 'Paris · 8ᵉ',
    accent: '#cfa6c9',
    accent2: '#f0dcec',
    glow: 'rgba(207, 166, 201, 0.42)',
    blurb:
      "Clinique de chirurgie & médecine esthétique. Diagnostic interactif, simulation et prise de rendez-vous en ligne.",
  },
  {
    id: 'realestate',
    path: '/prestige',
    name: 'ATELIER FONCIER',
    category: 'Immobilier de Prestige',
    headline: "L'adresse <em>rare</em>, révélée",
    tagline:
      "Propriétés d'exception, hôtels particuliers et villas signature. Une curation confidentielle pour une clientèle qui ne cherche pas — qui choisit.",
    location: 'Côte d’Azur · Paris · Genève',
    accent: '#c8a26a',
    accent2: '#e9d6b0',
    glow: 'rgba(200, 162, 106, 0.45)',
    blurb:
      "Immobilier de prestige. Galerie 3D immersive, recherche par lifestyle et estimation privée instantanée.",
  },
  {
    id: 'jetski',
    path: '/jetski',
    name: 'AZURE RIDE',
    category: 'Location de Jet Ski · Dubaï',
    headline: 'Dubaï, <em>à pleine</em> vitesse',
    tagline:
      "Jet skis dernière génération au pied de Burj Al Arab. Réservez votre créneau, votre skyline et votre montée d'adrénaline en quelques secondes.",
    location: 'Dubai Marina · JBR',
    accent: '#39c2d6',
    accent2: '#a7ecf5',
    glow: 'rgba(57, 194, 214, 0.45)',
    blurb:
      "Location de jet ski premium à Dubaï. Configurateur de session, créneaux en direct et réservation immédiate.",
  },
  {
    id: 'yacht',
    path: '/yacht',
    name: 'SILLAGE',
    category: 'Entretien & Detailing de Yachts',
    headline: 'Votre yacht, <em>impeccable</em> à quai',
    tagline:
      "Detailing nautique d'exception : carène, teck, gelcoat et finitions. Une équipe dédiée, des produits marins haut de gamme, une discrétion absolue.",
    location: 'Monaco · Saint-Tropez · Cannes',
    accent: '#6fb6a6',
    accent2: '#cfeee5',
    glow: 'rgba(111, 182, 166, 0.42)',
    blurb:
      "Detailing & entretien de yachts. Devis interactif au mètre, planning d'intervention et suivi premium.",
  },
  {
    id: 'vehicle',
    path: '/automobile',
    name: 'OCTANE ATELIER',
    category: "Location de Véhicules d'Exception",
    headline: 'Conduisez la <em>légende</em>',
    tagline:
      "GT, supercars et grandes routières à la demande. Configurez votre modèle en 3D, estimez votre tarif et repartez au volant — sans intermédiaire.",
    location: 'Paris · Monaco · Milan',
    accent: '#d8553f',
    accent2: '#f3b8a6',
    glow: 'rgba(216, 85, 63, 0.45)',
    blurb:
      "Location de véhicules d'exception. Configurateur 3D temps réel et estimateur de tarif intégré.",
  },
]

export const BRAND_MAP: Record<BrandId, Brand> = BRANDS.reduce(
  (acc, b) => {
    acc[b.id] = b
    return acc
  },
  {} as Record<BrandId, Brand>,
)

/** Apply a brand's accent palette to a DOM element via CSS variables. */
export function brandStyle(brand: Brand): React.CSSProperties {
  return {
    ['--accent' as string]: brand.accent,
    ['--accent-2' as string]: brand.accent2,
    ['--accent-glow' as string]: brand.glow,
  }
}
