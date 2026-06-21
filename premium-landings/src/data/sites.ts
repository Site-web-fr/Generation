export type ToolType =
  | 'surgery-consultation'
  | 'property-finder'
  | 'jetski-booking'
  | 'yacht-cleaning'
  | 'vehicle-rental'
  | 'yacht-charter'
  | 'spa-treatments'
  | 'aviation-config'
  | 'jewelry-config'
  | 'event-package';

export type SceneType =
  | 'organic'
  | 'architecture'
  | 'water'
  | 'yacht'
  | 'automotive'
  | 'ocean'
  | 'wellness'
  | 'sky'
  | 'gem'
  | 'venue';

export interface SiteColors {
  bg: string;
  bgAlt: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  cta: string;
  ctaText: string;
  glow: string;
}

export interface SiteFonts {
  heading: string;
  body: string;
}

export interface SiteStat {
  value: string;
  label: string;
}

export interface SiteService {
  title: string;
  description: string;
  icon: string;
}

export interface SiteTestimonial {
  text: string;
  author: string;
  role: string;
}

export interface Site {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  budget: string;
  toolType: ToolType;
  sceneType: SceneType;
  colors: SiteColors;
  fonts: SiteFonts;
  heroVideo?: string;
  stats: SiteStat[];
  services: SiteService[];
  testimonials: SiteTestimonial[];
  perks: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export const sites: Site[] = [
  {
    slug: 'eclat-aesthetic',
    name: 'Éclat Aesthetic',
    subtitle: 'Institut de Chirurgie Esthétique',
    tagline: 'L\'art de révéler votre beauté naturelle',
    description:
      'Centre d\'excellence en chirurgie esthétique et médecine anti-âge. Consultations personnalisées, technologies de pointe et accompagnement sur-mesure du premier rendez-vous à la récupération complète.',
    location: 'Avenue Montaigne, Paris 8e',
    phone: '+33 1 42 00 00 01',
    email: 'concierge@eclat-aesthetic.fr',
    budget: '10 000 €',
    toolType: 'surgery-consultation',
    sceneType: 'organic',
    colors: {
      bg: '#0a0908',
      bgAlt: '#141210',
      primary: '#e8d5c4',
      secondary: '#c9a87c',
      accent: '#d4af7a',
      text: '#faf6f2',
      muted: '#9a8f85',
      cta: '#c9a87c',
      ctaText: '#0a0908',
      glow: 'rgba(201, 168, 124, 0.4)',
    },
    fonts: { heading: '"Cormorant Garamond", serif', body: '"DM Sans", sans-serif' },
    stats: [
      { value: '15K+', label: 'Interventions' },
      { value: '98%', label: 'Satisfaction' },
      { value: '25', label: 'Chirurgiens experts' },
      { value: 'ISO', label: 'Certifié' },
    ],
    services: [
      { title: 'Visage & Profil', description: 'Rhinoplastie, lifting, blépharoplastie avec simulation 3D pré-opératoire.', icon: '✦' },
      { title: 'Corps & Silhouette', description: 'Liposuccion HD, abdominoplastie, augmentation mammaire personnalisée.', icon: '◈' },
      { title: 'Médecine Esthétique', description: 'Injectables premium, skinbooster, laser et protocoles anti-âge exclusifs.', icon: '◇' },
    ],
    testimonials: [
      { text: 'Une expérience d\'une humanité rare. L\'estimateur en ligne m\'a permis d\'arriver en consultation parfaitement informée.', author: 'Camille R.', role: 'Patiente — Rhinoplastie' },
      { text: 'Résultat naturel, suivi impeccable. Le cabinet le plus premium que j\'ai visité.', author: 'Sophie M.', role: 'Patiente — Lifting' },
    ],
    perks: ['Simulation 3D', 'Suivi 12 mois', 'Conciergerie médicale', 'Confidentialité absolue'],
    ctaPrimary: 'Estimer ma consultation',
    ctaSecondary: 'Réserver un appel privé',
  },
  {
    slug: 'maison-lumiere',
    name: 'Maison Lumière',
    subtitle: 'Immobilier d\'Exception',
    tagline: 'Des propriétés qui transcendent le temps',
    description:
      'Agence immobilière ultra-premium spécialisée dans les biens d\'exception : penthouse, villas architecturales, hôtels particuliers et investissements patrimoniaux internationaux.',
    location: 'Place Vendôme, Paris',
    phone: '+33 1 42 00 00 02',
    email: 'private@maison-lumiere.com',
    budget: '10 000 €',
    toolType: 'property-finder',
    sceneType: 'architecture',
    colors: {
      bg: '#080a0c',
      bgAlt: '#0f1218',
      primary: '#f0ebe3',
      secondary: '#8b9cb3',
      accent: '#c4a962',
      text: '#f5f2ed',
      muted: '#7a8494',
      cta: '#c4a962',
      ctaText: '#080a0c',
      glow: 'rgba(196, 169, 98, 0.35)',
    },
    fonts: { heading: '"Playfair Display", serif', body: '"Inter", sans-serif' },
    stats: [
      { value: '€2.4Md', label: 'Portefeuille actif' },
      { value: '340+', label: 'Biens exclusifs' },
      { value: '28', label: 'Pays' },
      { value: '100%', label: 'Off-market' },
    ],
    services: [
      { title: 'Acquisition Privée', description: 'Accès off-market aux plus belles propriétés avant mise en vente publique.', icon: '⌂' },
      { title: 'Vente Discrète', description: 'Marketing confidentiel pour vendeurs exigeants, sans exposition publique.', icon: '◆' },
      { title: 'Conseil Patrimonial', description: 'Structuration fiscale, due diligence et gestion locative haut de gamme.', icon: '▣' },
    ],
    testimonials: [
      { text: 'Ils ont trouvé notre penthouse en 48h. Le simulateur de financement m\'a évité des semaines de négociations.', author: 'Laurent & Isabelle D.', role: 'Acheteurs — Paris 16e' },
      { text: 'Discrétion, réseau, excellence. Maison Lumière redéfinit l\'immobilier de luxe.', author: 'Marc-Antoine V.', role: 'Investisseur' },
    ],
    perks: ['Visite virtuelle 3D', 'Conciergerie achat', 'Réseau off-market', 'Expertise juridique'],
    ctaPrimary: 'Explorer les biens',
    ctaSecondary: 'Simuler mon financement',
  },
  {
    slug: 'azure-thrill',
    name: 'Azure Thrill',
    subtitle: 'Jet Ski Rental — Dubai Marina',
    tagline: 'Dominez les eaux de Dubaï',
    description:
      'Location de jet skis premium dans la Dubai Marina et Palm Jumeirah. Flotte d\'exception, instructeurs certifiés, expériences sunrise et sunset sur mesure pour une clientèle internationale.',
    location: 'Dubai Marina, UAE',
    phone: '+971 4 000 0003',
    email: 'book@azure-thrill.ae',
    budget: '10 000 €',
    toolType: 'jetski-booking',
    sceneType: 'water',
    colors: {
      bg: '#030810',
      bgAlt: '#071018',
      primary: '#e0f4ff',
      secondary: '#00d4ff',
      accent: '#ff6b35',
      text: '#f0f8ff',
      muted: '#6b8fa8',
      cta: '#00d4ff',
      ctaText: '#030810',
      glow: 'rgba(0, 212, 255, 0.4)',
    },
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"Outfit", sans-serif' },
    stats: [
      { value: '50+', label: 'Jet skis premium' },
      { value: '4.9★', label: 'TripAdvisor' },
      { value: '12K', label: 'Clients/an' },
      { value: '24/7', label: 'Disponibilité' },
    ],
    services: [
      { title: 'Sunrise Expedition', description: 'Départ à l\'aube, Burj Al Arab et Palm Jumeirah dans la brume matinale.', icon: '☀' },
      { title: 'VIP Private Tour', description: 'Guide dédié, jet ski dernière génération, photos et vidéos drone incluses.', icon: '◉' },
      { title: 'Corporate Events', description: 'Team building nautique pour groupes jusqu\'à 30 personnes.', icon: '▲' },
    ],
    testimonials: [
      { text: 'Booking en 2 minutes, prix transparent. L\'expérience sunrise était magique.', author: 'James K.', role: 'London — VIP Tour' },
      { text: 'Best jet ski rental in Dubai. Premium fleet, zero hassle.', author: 'Sarah L.', role: 'New York — Group booking' },
    ],
    perks: ['Assurance incluse', 'Équipement premium', 'Photos drone', 'Transfert hôtel'],
    ctaPrimary: 'Réserver mon jet ski',
    ctaSecondary: 'Calculer mon tarif',
  },
  {
    slug: 'pristine-yachts',
    name: 'Pristine Yachts',
    subtitle: 'Yacht Care & Detailing',
    tagline: 'Perfection absolue pour votre yacht',
    description:
      'Service ultra-premium de nettoyage, detailing et maintenance esthétique pour yachts et superyachts. Équipes certifiées, produits écologiques haut de gamme, intervention 24/7 dans tous les ports méditerranéens.',
    location: 'Port Hercule, Monaco',
    phone: '+377 00 00 04',
    email: 'ops@pristine-yachts.mc',
    budget: '10 000 €',
    toolType: 'yacht-cleaning',
    sceneType: 'yacht',
    colors: {
      bg: '#040608',
      bgAlt: '#0a0e14',
      primary: '#eef2f7',
      secondary: '#4a90d9',
      accent: '#ffffff',
      text: '#f4f7fb',
      muted: '#6b7d8f',
      cta: '#4a90d9',
      ctaText: '#040608',
      glow: 'rgba(74, 144, 217, 0.35)',
    },
    fonts: { heading: '"Cinzel", serif', body: '"Inter", sans-serif' },
    stats: [
      { value: '800+', label: 'Yachts/an' },
      { value: '50m+', label: 'Superyachts' },
      { value: '6', label: 'Ports couverts' },
      { value: '100%', label: 'Garantie brillance' },
    ],
    services: [
      { title: 'Full Detail', description: 'Nettoyage intégral coque, pont, intérieur et traitement céramique.', icon: '◈' },
      { title: 'Maintenance Program', description: 'Abonnement mensuel avec interventions planifiées et reporting photo.', icon: '◎' },
      { title: 'Emergency Response', description: 'Intervention 24h avant charter ou événement, délai garanti 4h.', icon: '⚡' },
    ],
    testimonials: [
      { text: 'Notre 45m n\'a jamais été aussi impeccable. Le configurateur de service en ligne est brillant.', author: 'Captain Reynolds', role: 'M/Y Serenity' },
      { text: 'White-glove service. They understand superyacht standards.', author: 'Owner — 62m Lurssen', role: 'Client privé' },
    ],
    perks: ['Produits éco-premium', 'Équipe certifiée', 'Reporting photo', 'Garantie 30 jours'],
    ctaPrimary: 'Configurer mon service',
    ctaSecondary: 'Devis instantané',
  },
  {
    slug: 'velours-auto',
    name: 'Velours Auto',
    subtitle: 'Location Véhicules d\'Exception',
    tagline: 'Conduisez l\'extraordinaire',
    description:
      'Location de véhicules ultra-premium : Ferrari, Lamborghini, Rolls-Royce, Bentley. Livraison à domicile, kilométrage flexible, assurance tous risques et conciergerie 24/7 pour une expérience sans compromis.',
    location: 'Côte d\'Azur & Paris',
    phone: '+33 6 00 00 05',
    email: 'concierge@velours-auto.fr',
    budget: '10 000 €',
    toolType: 'vehicle-rental',
    sceneType: 'automotive',
    colors: {
      bg: '#060606',
      bgAlt: '#0e0e0e',
      primary: '#ffffff',
      secondary: '#c41e3a',
      accent: '#d4af37',
      text: '#f5f5f5',
      muted: '#888888',
      cta: '#c41e3a',
      ctaText: '#ffffff',
      glow: 'rgba(196, 30, 58, 0.4)',
    },
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"DM Sans", sans-serif' },
    stats: [
      { value: '120+', label: 'Véhicules' },
      { value: '€50K+', label: 'Valeur moyenne' },
      { value: '48h', label: 'Livraison France' },
      { value: '0', label: 'Franchise option' },
    ],
    services: [
      { title: 'Location Courte Durée', description: 'Week-end, semaine ou mois — véhicules disponibles immédiatement.', icon: '▸' },
      { title: 'Expérience Track Day', description: 'Circuit privé, instructeur pilote, Ferrari 488 GT3 ou Lamborghini Huracán.', icon: '◉' },
      { title: 'Corporate & Events', description: 'Flotte pour shootings, mariages, lancements produit et événements VIP.', icon: '★' },
    ],
    testimonials: [
      { text: 'J\'ai configuré ma location en 3 clics. La SF90 livrée devant l\'hôtel à 7h du matin.', author: 'Alexandre B.', role: 'Entrepreneur — Monaco' },
      { text: 'Flotte incroyable, service irréprochable. L\'estimateur en ligne est un game-changer.', author: 'Thomas W.', role: 'London — 1 semaine' },
    ],
    perks: ['Livraison gratuite', 'Assurance premium', 'Kilométrage flexible', 'Conciergerie 24/7'],
    ctaPrimary: 'Choisir mon véhicule',
    ctaSecondary: 'Estimer ma location',
  },
  {
    slug: 'horizon-charter',
    name: 'Horizon Charter',
    subtitle: 'Yacht Charter Privé',
    tagline: 'Votre océan, votre règne',
    description:
      'Charter de yachts et superyachts dans les plus belles destinations : Méditerranée, Caraïbes, Maldives. Itinéraires sur-mesure, équipage dédié, chef étoilé à bord.',
    location: 'Saint-Tropez & Antibes',
    phone: '+33 4 00 00 06',
    email: 'charter@horizon-yachts.com',
    budget: '10 000 €',
    toolType: 'yacht-charter',
    sceneType: 'ocean',
    colors: {
      bg: '#030508',
      bgAlt: '#080c12',
      primary: '#e8f0f8',
      secondary: '#2e6b9e',
      accent: '#f0c674',
      text: '#eef4fa',
      muted: '#5a7088',
      cta: '#2e6b9e',
      ctaText: '#ffffff',
      glow: 'rgba(46, 107, 158, 0.4)',
    },
    fonts: { heading: '"Playfair Display", serif', body: '"Outfit", sans-serif' },
    stats: [
      { value: '85', label: 'Yachts charter' },
      { value: '15', label: 'Destinations' },
      { value: '€2M+', label: 'Charter moyen' },
      { value: '5★', label: 'Équipage' },
    ],
    services: [
      { title: 'Charter Méditerranée', description: 'Côte d\'Azur, Sardaigne, Amalfi — itinéraires exclusifs.', icon: '◈' },
      { title: 'Superyacht Experience', description: 'Yachts 40m+ avec hélistation, spa, cinéma et jet ski.', icon: '◆' },
      { title: 'Corporate Retreat', description: 'Team building nautique pour comités de direction.', icon: '▣' },
    ],
    testimonials: [
      { text: 'Le configurateur d\'itinéraire nous a fait gagner des semaines de planification.', author: 'Famille Rothschild', role: 'Charter 52m — 2 semaines' },
      { text: 'Perfection from booking to disembarkation.', author: 'David Chen', role: 'CEO — Singapore' },
    ],
    perks: ['Chef étoilé', 'Équipage 5★', 'Itinéraire sur-mesure', 'Transfert hélico'],
    ctaPrimary: 'Planifier mon charter',
    ctaSecondary: 'Estimer mon voyage',
  },
  {
    slug: 'sanctum-spa',
    name: 'Sanctum Spa',
    subtitle: 'Wellness & Longévité',
    tagline: 'Le silence qui transforme',
    description:
      'Retraite wellness ultra-premium : soins signature, cryothérapie, IV therapy, programmes de longévité personnalisés. Architecture sensorielle, praticiens internationaux, expérience holistique.',
    location: 'Gstaad, Suisse',
    phone: '+41 33 000 07',
    email: 'sanctum@gstaad.ch',
    budget: '10 000 €',
    toolType: 'spa-treatments',
    sceneType: 'wellness',
    colors: {
      bg: '#080a08',
      bgAlt: '#0f120e',
      primary: '#e8ebe4',
      secondary: '#7a9e7e',
      accent: '#c4b896',
      text: '#f0f2ed',
      muted: '#7a8478',
      cta: '#7a9e7e',
      ctaText: '#080a08',
      glow: 'rgba(122, 158, 126, 0.35)',
    },
    fonts: { heading: '"Cormorant Garamond", serif', body: '"Inter", sans-serif' },
    stats: [
      { value: '40+', label: 'Soins signature' },
      { value: '12', label: 'Praticiens experts' },
      { value: '7j', label: 'Programmes' },
      { value: '5★', label: 'Relais & Châteaux' },
    ],
    services: [
      { title: 'Programme Longévité', description: 'Bilan complet, protocole personnalisé sur 3 à 7 jours.', icon: '✦' },
      { title: 'Soins Signature', description: 'Massages, soins visage La Mer, rituels ayurvédiques.', icon: '◇' },
      { title: 'Cryo & Recovery', description: 'Cryothérapie, HBOT, IV therapy et récupération sportive.', icon: '◈' },
    ],
    testimonials: [
      { text: 'Le builder de programme en ligne m\'a permis d\'arriver avec un plan sur-mesure déjà validé.', author: 'Elena V.', role: 'Programme 5 jours' },
      { text: 'A sanctuary for body and mind. Unparalleled.', author: 'Michael R.', role: 'CEO — Zurich' },
    ],
    perks: ['Bilan pré-arrivée', 'Nutritionniste dédié', 'Suite privée', 'Transfert heliski'],
    ctaPrimary: 'Composer mon séjour',
    ctaSecondary: 'Estimer mon programme',
  },
  {
    slug: 'aether-aviation',
    name: 'Aether Aviation',
    subtitle: 'Aviation Privée',
    tagline: 'Le ciel n\'a plus de limites',
    description:
      'Charter de jets privés et hélicoptères. Flotte Global 7500, Gulfstream G650, Falcon 8X. Réservation instantanée, empty legs exclusifs, conciergerie aéroportuaire mondiale.',
    location: 'Le Bourget & Genève',
    phone: '+33 1 00 00 08',
    email: 'flight@aether-aviation.com',
    budget: '10 000 €',
    toolType: 'aviation-config',
    sceneType: 'sky',
    colors: {
      bg: '#050608',
      bgAlt: '#0c0e14',
      primary: '#eef0f5',
      secondary: '#5b7fd4',
      accent: '#e8c547',
      text: '#f2f4f8',
      muted: '#6b7280',
      cta: '#5b7fd4',
      ctaText: '#ffffff',
      glow: 'rgba(91, 127, 212, 0.4)',
    },
    fonts: { heading: '"Space Grotesk", sans-serif', body: '"Inter", sans-serif' },
    stats: [
      { value: '45', label: 'Aéronefs' },
      { value: '180', label: 'Destinations' },
      { value: '2h', label: 'Départ garanti' },
      { value: 'ARGUS', label: 'Platinum' },
    ],
    services: [
      { title: 'Jet Charter', description: 'Vol privé sur-mesure, catering étoilé, FBO premium.', icon: '▲' },
      { title: 'Empty Legs', description: 'Réduction jusqu\'à 75% sur vols repositionnement.', icon: '◉' },
      { title: 'Helicopter Transfer', description: 'Transferts héliport-héliport, événements, ski.', icon: '◎' },
    ],
    testimonials: [
      { text: 'Paris-Genève en 55 minutes. Le configurateur de vol m\'a donné un devis en temps réel.', author: 'Philippe M.', role: 'Family Office' },
      { text: 'Seamless, discreet, flawless. Our go-to for European travel.', author: 'Board Member', role: 'Fortune 500' },
    ],
    perks: ['Devis instantané', 'FBO VIP', 'Catering sur-mesure', 'Conciergerie globale'],
    ctaPrimary: 'Configurer mon vol',
    ctaSecondary: 'Voir les empty legs',
  },
  {
    slug: 'atelier-nocturne',
    name: 'Atelier Nocturne',
    subtitle: 'Haute Joaillerie Sur-Mesure',
    tagline: 'L\'éternité gravée dans la lumière',
    description:
      'Maison de joaillerie artisanale : bagues de fiançailles, parures sur-mesure, pierres certifiées GIA. Configurateur 3D, rendez-vous privé avec maître joaillier, livraison sécurisée mondiale.',
    location: 'Place Vendôme, Paris',
    phone: '+33 1 42 00 00 09',
    email: 'atelier@nocturne.paris',
    budget: '10 000 €',
    toolType: 'jewelry-config',
    sceneType: 'gem',
    colors: {
      bg: '#0a0808',
      bgAlt: '#120e0e',
      primary: '#f5efe8',
      secondary: '#8b6914',
      accent: '#d4af37',
      text: '#faf6f0',
      muted: '#8a8078',
      cta: '#d4af37',
      ctaText: '#0a0808',
      glow: 'rgba(212, 175, 55, 0.35)',
    },
    fonts: { heading: '"Cinzel", serif', body: '"Cormorant Garamond", serif' },
    stats: [
      { value: '140', label: 'Ans d\'héritage' },
      { value: 'GIA', label: 'Certification' },
      { value: '100%', label: 'Sur-mesure' },
      { value: '∞', label: 'Garantie à vie' },
    ],
    services: [
      { title: 'Bague de Fiançailles', description: 'Diamants certifiés, sertissage main, gravure personnalisée.', icon: '◇' },
      { title: 'Parure Sur-Mesure', description: 'Collier, boucles, bracelet — création unique avec maître joaillier.', icon: '◈' },
      { title: 'Restauration & Héritage', description: 'Transformation de bijoux familiaux en pièces contemporaines.', icon: '✦' },
    ],
    testimonials: [
      { text: 'Le configurateur 3D m\'a permis de visualiser la bague parfaite avant la première visite.', author: 'Julien & Marie', role: 'Fiançailles sur-mesure' },
      { text: 'Craftsmanship beyond compare. A true Place Vendôme experience.', author: 'Ambassador\'s wife', role: 'Parure privée' },
    ],
    perks: ['Configurateur 3D', 'Maître joaillier dédié', 'Certificat GIA', 'Livraison sécurisée'],
    ctaPrimary: 'Créer ma bague',
    ctaSecondary: 'Estimer ma création',
  },
  {
    slug: 'grand-palais-events',
    name: 'Le Grand Palais Events',
    subtitle: 'Venue & Événements d\'Exception',
    tagline: 'Là où les légendes se célèbrent',
    description:
      'Lieu événementiel iconique pour galas, lancements produit, mariages royaux et sommets internationaux. Capacité 800, scénographie immersive, partenaires Michelin et production audiovisuelle intégrée.',
    location: 'Paris & Côte d\'Azur',
    phone: '+33 1 42 00 00 10',
    email: 'events@grand-palais.paris',
    budget: '10 000 €',
    toolType: 'event-package',
    sceneType: 'venue',
    colors: {
      bg: '#0a0806',
      bgAlt: '#141008',
      primary: '#f5ede0',
      secondary: '#a08050',
      accent: '#e8c878',
      text: '#faf6ee',
      muted: '#8a8070',
      cta: '#a08050',
      ctaText: '#ffffff',
      glow: 'rgba(160, 128, 80, 0.35)',
    },
    fonts: { heading: '"Playfair Display", serif', body: '"DM Sans", sans-serif' },
    stats: [
      { value: '800', label: 'Capacité max' },
      { value: '200+', label: 'Événements/an' },
      { value: '3', label: 'Salons iconiques' },
      { value: 'Michelin', label: 'Partenaire' },
    ],
    services: [
      { title: 'Galas & Dîners', description: 'Soirées de prestige avec scénographie sur-mesure et artistes internationaux.', icon: '★' },
      { title: 'Lancements Produit', description: 'Révélation automobile, horlogerie, mode — production intégrée.', icon: '◆' },
      { title: 'Mariages Royaux', description: 'Cérémonies jusqu\'à 500 invités, coordination complète 12 mois.', icon: '◇' },
    ],
    testimonials: [
      { text: 'Le configurateur d\'événement nous a fait économiser 3 semaines de réunions. Tout était clair dès le départ.', author: 'LVMH Events', role: 'Lancement produit 2025' },
      { text: 'The most breathtaking venue in Europe. Flawless execution.', author: 'Royal Wedding Planner', role: 'Monaco' },
    ],
    perks: ['Scénographie 3D', 'Chef étoilé', 'Production AV', 'Conciergerie invités'],
    ctaPrimary: 'Planifier mon événement',
    ctaSecondary: 'Estimer mon budget',
  },
];

export function getSiteBySlug(slug: string): Site | undefined {
  return sites.find((s) => s.slug === slug);
}
