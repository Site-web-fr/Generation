export interface Project {
  slug: string;
  name: string;
  tagline: string;
  sector: string;
  budget: string;
  description: string;
  features: string[];
  colors: {
    bg: string;
    bgAlt: string;
    primary: string;
    accent: string;
    text: string;
    muted: string;
  };
  heroGradient: string;
  interactiveLabel: string;
}

export const projects: Project[] = [
  {
    slug: 'lumiere-clinic',
    name: 'LUMIÈRE Clinic',
    tagline: 'Chirurgie esthétique & médecine régénérative',
    sector: 'Cabinet esthétique',
    budget: '10 000 €',
    description: 'Parcours patient immersif — simulateur de résultats, planificateur de soins, réservation sans appel.',
    features: ['Simulateur avant/après', 'Planificateur de protocole', 'Devis instantané', 'Prise de RDV en ligne'],
    colors: { bg: '#0d0b0e', bgAlt: '#161218', primary: '#e8d5c4', accent: '#c4a484', text: '#f5f0eb', muted: '#9a8f87' },
    heroGradient: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,164,132,0.18), transparent 70%)',
    interactiveLabel: 'Simulateur de traitement',
  },
  {
    slug: 'maison-elite',
    name: 'MAISON ÉLITE',
    tagline: 'Immobilier d\'exception — Paris & Côte d\'Azur',
    sector: 'Agence immobilière',
    budget: '10 000 €',
    description: 'Explorateur de biens cinématique, calculateur de financement, visite virtuelle interactive.',
    features: ['Explorateur 3D de biens', 'Simulateur crédit', 'Filtres intelligents', 'Réservation visite'],
    colors: { bg: '#080a0f', bgAlt: '#0f1219', primary: '#f0ebe3', accent: '#8b9dc3', text: '#f5f3ef', muted: '#7a8294' },
    heroGradient: 'radial-gradient(ellipse 70% 50% at 60% 10%, rgba(139,157,195,0.15), transparent 65%)',
    interactiveLabel: 'Explorateur de biens',
  },
  {
    slug: 'aqua-velocity',
    name: 'AQUA VELOCITY',
    tagline: 'Jet Ski & expériences nautiques — Dubai Marina',
    sector: 'Location Jet Ski Dubai',
    budget: '10 000 €',
    description: 'Configurateur d\'aventure — choix du parcours, durée, équipement, paiement direct.',
    features: ['Configurateur de parcours', 'Sélection durée & riders', 'Tarif en temps réel', 'Réservation instantanée'],
    colors: { bg: '#030810', bgAlt: '#071018', primary: '#e0f4ff', accent: '#00d4ff', text: '#f0f8ff', muted: '#5a7a94' },
    heroGradient: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0,212,255,0.12), transparent 60%)',
    interactiveLabel: 'Configurateur d\'aventure',
  },
  {
    slug: 'nautic-pristine',
    name: 'NAUTIC PRISTINE',
    tagline: 'Entretien & detailing yacht — Méditerranée',
    sector: 'Nettoyage yacht premium',
    budget: '10 000 €',
    description: 'Estimateur de prestation sur-mesure — taille du yacht, services, fréquence, devis immédiat.',
    features: ['Estimateur yacht', 'Sélection prestations', 'Planning automatique', 'Devis & paiement'],
    colors: { bg: '#050a0c', bgAlt: '#0a1216', primary: '#d4e8f0', accent: '#4ecdc4', text: '#eef6f8', muted: '#6b8a94' },
    heroGradient: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(78,205,196,0.14), transparent 65%)',
    interactiveLabel: 'Estimateur de prestation',
  },
  {
    slug: 'velocita',
    name: 'VELOCITÀ',
    tagline: 'Location véhicules d\'exception',
    sector: 'Location véhicules premium',
    budget: '10 000 €',
    description: 'Showroom 3D interactif — carousel de modèles, configurateur kilomètres/jours, estimation & réservation.',
    features: ['Showroom 3D', 'Configurateur véhicule', 'Estimateur tarif', 'Réservation en ligne'],
    colors: { bg: '#0a0a0a', bgAlt: '#121212', primary: '#ffffff', accent: '#e63946', text: '#f5f5f5', muted: '#888888' },
    heroGradient: 'radial-gradient(ellipse 70% 50% at 80% 30%, rgba(230,57,70,0.15), transparent 60%)',
    interactiveLabel: 'Configurateur véhicule',
  },
  {
    slug: 'altitude',
    name: 'ALTITUDE',
    tagline: 'Aviation privée — jets & hélicoptères',
    sector: 'Aviation privée',
    budget: '10 000 €',
    description: 'Planificateur de vol sur-mesure — trajet, passagers, classe, estimation charter instantanée.',
    features: ['Planificateur de vol', 'Carte interactive', 'Devis charter', 'Réservation VIP'],
    colors: { bg: '#060608', bgAlt: '#0c0c10', primary: '#e8e6e3', accent: '#b8860b', text: '#f2f0ed', muted: '#8a8680' },
    heroGradient: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,134,11,0.12), transparent 70%)',
    interactiveLabel: 'Planificateur de vol',
  },
  {
    slug: 'aurum',
    name: 'AURUM',
    tagline: 'Horlogerie de prestige — Genève',
    sector: 'Boutique horlogère',
    budget: '10 000 €',
    description: 'Atelier de personnalisation — sélection boîtier, cadran, bracelet, visualisation 3D.',
    features: ['Configurateur montre', 'Visualisation 3D', 'Estimation valeur', 'Commande sur-mesure'],
    colors: { bg: '#0c0a08', bgAlt: '#141008', primary: '#f5e6c8', accent: '#d4af37', text: '#faf6f0', muted: '#9a8b6e' },
    heroGradient: 'radial-gradient(ellipse 70% 50% at 40% 30%, rgba(212,175,55,0.14), transparent 65%)',
    interactiveLabel: 'Atelier de personnalisation',
  },
  {
    slug: 'serenite',
    name: 'SÉRÉNITÉ',
    tagline: 'Spa & wellness palace — Alpes',
    sector: 'Spa de luxe',
    budget: '10 000 €',
    description: 'Architecte de séjour bien-être — composition de soins, durée, hébergement, tarif personnalisé.',
    features: ['Composeur de soins', 'Planning séjour', 'Devis wellness', 'Réservation suite'],
    colors: { bg: '#0a0c0a', bgAlt: '#101410', primary: '#e8f0e4', accent: '#7cb87c', text: '#f0f5ee', muted: '#7a9480' },
    heroGradient: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(124,184,124,0.12), transparent 60%)',
    interactiveLabel: 'Architecte de séjour',
  },
  {
    slug: 'grand-cru',
    name: 'GRAND CRU',
    tagline: 'Caviste & investissement vin — Bordeaux',
    sector: 'Caviste premium',
    budget: '10 000 €',
    description: 'Constructeur de cave — sélection millésimes, capacité, climatisation, estimation patrimoine.',
    features: ['Constructeur de cave', 'Sélection millésimes', 'Estimation patrimoine', 'Livraison & stockage'],
    colors: { bg: '#0e0808', bgAlt: '#160c0c', primary: '#f0e0d8', accent: '#8b2942', text: '#f8f0ec', muted: '#9a7070' },
    heroGradient: 'radial-gradient(ellipse 70% 50% at 70% 40%, rgba(139,41,66,0.16), transparent 65%)',
    interactiveLabel: 'Constructeur de cave',
  },
  {
    slug: 'palatial',
    name: 'PALATIAL',
    tagline: 'Hôtellerie palace — expériences sur-mesure',
    sector: 'Hôtel de luxe',
    budget: '10 000 €',
    description: 'Sélecteur de suite interactif — vue, services, durée, extras, confirmation sans intermédiaire.',
    features: ['Sélecteur de suite', 'Options sur-mesure', 'Tarif dynamique', 'Check-in digital'],
    colors: { bg: '#0a0908', bgAlt: '#12100e', primary: '#f2ebe0', accent: '#c9a962', text: '#faf8f4', muted: '#9a9080' },
    heroGradient: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(201,169,98,0.14), transparent 65%)',
    interactiveLabel: 'Sélecteur de suite',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
