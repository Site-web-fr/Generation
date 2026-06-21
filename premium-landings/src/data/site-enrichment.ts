export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ReassuranceItem {
  icon: string;
  title: string;
  text: string;
}

export interface LocationInfo {
  address: string;
  district: string;
  hours: string;
  access: string;
  parking: string;
  mapQuery: string;
}

export interface ReviewItem {
  rating: number;
  text: string;
  author: string;
  role: string;
  source: string;
}

export interface ReviewSummary {
  score: number;
  count: number;
  source: string;
}

export interface SiteEnrichment {
  heroImage: string;
  heroImageAlt: string;
  heroAccent?: string;
  gallery: GalleryImage[];
  reassurance: ReassuranceItem[];
  location: LocationInfo;
  reviewSummary: ReviewSummary;
  reviews: ReviewItem[];
  aboutTitle: string;
  aboutText: string;
}

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const siteEnrichment: Record<string, SiteEnrichment> = {
  'eclat-aesthetic': {
    heroImage: u('photo-1570172619644-dfd03ed5d881'),
    heroImageAlt: 'Cabinet de chirurgie esthétique premium — lumière douce et intimité',
    gallery: [
      { src: u('photo-1519494026892-80bbd2d6fd0d', 800), alt: 'Suite de consultation privée', caption: 'Consultation privée' },
      { src: u('photo-1629909613654-28e377c37b09', 800), alt: 'Bloc opératoire certifié', caption: 'Bloc certifié HAS' },
      { src: u('photo-1515377905703-c4788e51af15', 800), alt: 'Espace récupération', caption: 'Suivi post-opératoire' },
      { src: u('photo-1487412948497-957902aff287', 800), alt: 'Accueil concierge', caption: 'Conciergerie médicale' },
    ],
    reassurance: [
      { icon: '🏥', title: 'Certification HAS', text: 'Établissement agréé, protocoles chirurgicaux les plus stricts d\'Europe.' },
      { icon: '🔒', title: 'Confidentialité totale', text: 'Entrée discrète, dossier médical chiffré, discrétion absolue garantie.' },
      { icon: '✦', title: 'Visualisation incluse', text: 'Visualisez le résultat avant toute décision grâce à notre outil de simulation photo.' },
      { icon: '♡', title: 'Suivi 12 mois', text: 'Accompagnement personnalisé du premier rendez-vous à la récupération complète.' },
    ],
    location: {
      address: '12 Avenue Montaigne, 75008 Paris',
      district: 'Triangle d\'Or — Paris 8e',
      hours: 'Lun–Sam 9h–19h · Urgences concierge 24/7',
      access: 'Métro Franklin D. Roosevelt (L1, L9) · 3 min à pied',
      parking: 'Voiturier partenaire George V — réservation incluse',
      mapQuery: 'Avenue+Montaigne+Paris+8',
    },
    reviewSummary: { score: 4.9, count: 312, source: 'Google Avis' },
    reviews: [
      { rating: 5, text: 'Une expérience d\'une humanité rare. L\'estimateur en ligne m\'a permis d\'arriver parfaitement informée.', author: 'Camille R.', role: 'Rhinoplastie', source: 'Google' },
      { rating: 5, text: 'Résultat naturel, suivi impeccable. Le cabinet le plus premium que j\'ai visité à Paris.', author: 'Sophie M.', role: 'Lifting cervico-facial', source: 'Google' },
      { rating: 5, text: 'Équipe médicale d\'exception. Discrétion et professionnalisme au rendez-vous.', author: 'Isabelle T.', role: 'Médecine esthétique', source: 'Doctolib' },
      { rating: 4, text: 'Consultation très complète, délais un peu longs mais la qualité justifie l\'attente.', author: 'Nadia K.', role: 'Première consultation', source: 'Google' },
    ],
    aboutTitle: 'L\'excellence au service de votre image',
    aboutText: 'Fondé par des chirurgiens formés aux meilleures cliniques européennes, Éclat Aesthetic allie art médical et technologies de pointe. Chaque parcours est unique, chaque résultat pensé pour sublimer sans dénaturer.',
  },
  'maison-lumiere': {
    heroImage: u('photo-1613490493576-7fde63acd811'),
    heroImageAlt: 'Penthouse d\'exception avec vue panoramique',
    gallery: [
      { src: u('photo-1600596542815-ffad4c1539a9', 800), alt: 'Villa contemporaine', caption: 'Villas architecturales' },
      { src: u('photo-1600607687939-ce8a6c25118c', 800), alt: 'Intérieur design', caption: 'Intérieurs signés' },
      { src: u('photo-1600566753190-17f0baa2a6c3', 800), alt: 'Terrasse rooftop', caption: 'Rooftops parisiens' },
      { src: u('photo-1600585154340-be6161a56a0c', 800), alt: 'Piscine à débordement', caption: 'Résidences Côte d\'Azur' },
    ],
    reassurance: [
      { icon: '◆', title: '100 % off-market', text: 'Accès exclusif aux biens jamais publiés — réseau de 2 400 propriétaires privés.' },
      { icon: '⚖', title: 'Due diligence intégrale', text: 'Audit juridique, fiscal et technique avant toute visite.' },
      { icon: '🌍', title: '28 pays couverts', text: 'De Paris à Dubai, de Gstaad à New York — un seul interlocuteur.' },
      { icon: '🔐', title: 'NDA systématique', text: 'Vente et achat en toute discrétion, sans exposition médiatique.' },
    ],
    location: {
      address: '8 Place Vendôme, 75001 Paris',
      district: 'Quartier Vendôme — Showroom privé sur rendez-vous',
      hours: 'Sur rendez-vous · 7j/7 pour clients qualifiés',
      access: 'Tuileries (L1) · Entrée privée Place Vendôme',
      parking: 'Place Vendôme — créneau réservé à votre arrivée',
      mapQuery: 'Place+Vendome+Paris',
    },
    reviewSummary: { score: 4.95, count: 89, source: 'Avis clients privés' },
    reviews: [
      { rating: 5, text: 'Ils ont trouvé notre penthouse en 48h. Le simulateur de financement m\'a évité des semaines de négociations.', author: 'Laurent & Isabelle D.', role: 'Acheteurs — Paris 16e', source: 'Recommandation' },
      { rating: 5, text: 'Discrétion, réseau, excellence. Maison Lumière redéfinit l\'immobilier de luxe.', author: 'Marc-Antoine V.', role: 'Investisseur patrimonial', source: 'Recommandation' },
      { rating: 5, text: 'Visite virtuelle 3D impeccable. Nous avons signé sans nous déplacer depuis Singapour.', author: 'Wei L.', role: 'Acquisition — Cologny', source: 'Recommandation' },
    ],
    aboutTitle: 'Des propriétés qui transcendent le temps',
    aboutText: 'Maison Lumière conseille familles, family offices et investisseurs internationaux depuis 1987. Notre credo : ne jamais lister un bien — le présenter à la bonne personne, au bon moment.',
  },
  'azure-thrill': {
    heroImage: u('photo-1559827260-dc66d52bef19'),
    heroImageAlt: 'Jet ski premium sur les eaux de Dubai Marina',
    gallery: [
      { src: u('photo-1544551763-46a013bb70d5', 800), alt: 'Sunrise sur la Marina', caption: 'Sunrise Expedition' },
      { src: u('photo-1505118380757-91f5f5632de4', 800), alt: 'Flotte jet ski', caption: 'Flotte 2025' },
      { src: u('photo-1519046904211-83b9f719d71b', 800), alt: 'Burj Al Arab en fond', caption: 'Tour iconique' },
      { src: u('photo-1512453979798-5ea266f8880c', 800), alt: 'Dubai skyline', caption: 'Skyline Dubai' },
    ],
    reassurance: [
      { icon: '🛡', title: 'Assurance incluse', text: 'Couverture complète passager et tiers — zéro paperasse à l\'arrivée.' },
      { icon: '✓', title: 'Instructeurs certifiés', text: 'Tous nos guides sont certifiés DMCA et premiers secours.' },
      { icon: '📸', title: 'Photos & drone offerts', text: 'Pack souvenir HD inclus sur toutes les formules VIP.' },
      { icon: '🚐', title: 'Transfert hôtel', text: 'Prise en charge depuis votre hôtel à Dubai Marina ou Palm.' },
    ],
    location: {
      address: 'Dubai Marina Walk, Dubai, UAE',
      district: 'Quai 7 — Dubai Marina Yacht Club',
      hours: '6h–20h · Sessions sunrise dès 5h30',
      access: 'Tram Dubai Marina · 5 min · Valet parking disponible',
      parking: 'Parking Marina Mall — 2h offertes avec réservation',
      mapQuery: 'Dubai+Marina+Yacht+Club',
    },
    reviewSummary: { score: 4.9, count: 1240, source: 'TripAdvisor' },
    reviews: [
      { rating: 5, text: 'Booking en 2 minutes, prix transparent. L\'expérience sunrise était magique.', author: 'James K.', role: 'VIP Tour — Londres', source: 'TripAdvisor' },
      { rating: 5, text: 'Best jet ski rental in Dubai. Premium fleet, zero hassle.', author: 'Sarah L.', role: 'Group booking — NYC', source: 'Google' },
      { rating: 5, text: 'Équipe au top, jet skis neufs, photos drone incroyables. À refaire !', author: 'Marco B.', role: 'Sunrise Expedition', source: 'TripAdvisor' },
      { rating: 5, text: 'Organisé un team building pour 20 personnes — exécution parfaite.', author: 'HR Team', role: 'Corporate — Dubaï', source: 'Google' },
    ],
    aboutTitle: 'Dominez les eaux de Dubaï',
    aboutText: 'Azure Thrill opère depuis 2012 avec la flotte la plus récente de la Marina. Sea-Doo GTX Limited, Yamaha FX SVHO — entretenus chaque semaine pour une expérience sans compromis.',
  },
  'pristine-yachts': {
    heroImage: u('photo-1567899377494-49b0a6032c75'),
    heroImageAlt: 'Superyacht impeccable dans le port de Monaco',
    gallery: [
      { src: u('photo-1559591935-c7bcfe234c84', 800), alt: 'Detailing coque', caption: 'Traitement céramique' },
      { src: u('photo-1544551763-46a013bb70d5', 800), alt: 'Yacht en mer', caption: 'Pré-charter express' },
      { src: u('photo-1605281317010-fe14ffe4a3e0', 800), alt: 'Pont en teck', caption: 'Pont & teck' },
      { src: u('photo-1569263979103-6e9fada78a72', 800), alt: 'Intérieur yacht', caption: 'Intérieurs sur-mesure' },
    ],
    reassurance: [
      { icon: '✧', title: 'Garantie brillance 30j', text: 'Reprise gratuite si le rendu ne répond pas à nos standards.' },
      { icon: '🌿', title: 'Produits éco-premium', text: 'Gamme Méditerranée — biodégradables, sans impact sur les écosystèmes.' },
      { icon: '⚡', title: 'Intervention 4h', text: 'Urgence pré-charter garantie dans tous nos ports.' },
      { icon: '📋', title: 'Reporting photo', text: 'Compte-rendu détaillé après chaque passage — traçabilité totale.' },
    ],
    location: {
      address: 'Quai Antoine 1er, 98000 Monaco',
      district: 'Port Hercule — Base opérationnelle',
      hours: '24/7 · Équipes en rotation permanente',
      access: 'Heliport Monaco 8 min · Nice Côte d\'Azur 25 min',
      parking: 'Parking du Port — accès équipes certifié',
      mapQuery: 'Port+Hercule+Monaco',
    },
    reviewSummary: { score: 5.0, count: 156, source: 'Captains & Owners' },
    reviews: [
      { rating: 5, text: 'Notre 45m n\'a jamais été aussi impeccable. Le configurateur de service en ligne est brillant.', author: 'Captain Reynolds', role: 'M/Y Serenity', source: 'Direct' },
      { rating: 5, text: 'White-glove service. They understand superyacht standards.', author: 'Owner — 62m Lurssen', role: 'Client privé', source: 'Direct' },
      { rating: 5, text: 'Intervention express avant notre charter Cannes — équipe discrète et efficace.', author: 'Chief Stew', role: 'M/Y Azure', source: 'Direct' },
    ],
    aboutTitle: 'Perfection absolue pour votre yacht',
    aboutText: 'Pristine Yachts est la référence des capitaines Méditerranée. De Monaco à Antibes, Saint-Tropez à Porto Cervo — nos équipes certifiés IWCA interviennent sur yachts de 24 à 100m.',
  },
  'velours-auto': {
    heroImage: u('photo-1503376780353-7e6692767b70'),
    heroImageAlt: 'Ferrari rouge — location véhicule d\'exception',
    gallery: [
      { src: u('photo-1618843479313-40f8afb4b4d8', 800), alt: 'Lamborghini', caption: 'Lamborghini Huracán' },
      { src: u('photo-1619767886558-ef1a8250a3c4', 800), alt: 'Rolls-Royce', caption: 'Rolls-Royce Ghost' },
      { src: u('photo-1583121274602-3e2820c50d8d', 800), alt: 'Ferrari intérieur', caption: 'Intérieurs cuir' },
      { src: u('photo-1492144534655-ae79c964c9d7', 800), alt: 'Route Côte d\'Azur', caption: 'Livraison Côte d\'Azur' },
    ],
    reassurance: [
      { icon: '🚗', title: 'Livraison 48h France', text: 'Véhicule livré à domicile, hôtel ou aéroport — préparation incluse.' },
      { icon: '🛡', title: 'Assurance tous risques', text: 'Couverture premium sans franchise sur option Concierge.' },
      { icon: '∞', title: 'Kilométrage flexible', text: 'Forfaits 200, 500 ou illimité — adaptés à votre séjour.' },
      { icon: '★', title: 'Flotte vérifiée', text: 'Chaque véhicule contrôlé 47 points avant chaque location.' },
    ],
    location: {
      address: 'Boulevard de la Croisette, 06400 Cannes',
      district: 'Showroom Cannes · Hub Paris Opéra',
      hours: '8h–22h · Livraisons nocturnes sur demande',
      access: 'Aéroport Nice Côte d\'Azur — 25 min · Héliport Cannes',
      parking: 'Voiturier Croisette pour restitution véhicule',
      mapQuery: 'Boulevard+Croisette+Cannes',
    },
    reviewSummary: { score: 4.9, count: 428, source: 'Google Avis' },
    reviews: [
      { rating: 5, text: 'J\'ai configuré ma location en 3 clics. La SF90 livrée devant l\'hôtel à 7h du matin.', author: 'Alexandre B.', role: 'Entrepreneur — Monaco', source: 'Google' },
      { rating: 5, text: 'Flotte incroyable, service irréprochable. L\'estimateur en ligne est un game-changer.', author: 'Thomas W.', role: 'London — 1 semaine', source: 'Google' },
      { rating: 5, text: 'Week-end en Huracán sur la Corniche — véhicule neuf, équipe réactive.', author: 'Pierre D.', role: 'Marseille — Track Day', source: 'Google' },
      { rating: 5, text: 'Mariage à Saint-Tropez : 3 Rolls livrées à l\'heure. Parfait.', author: 'Élodie M.', role: 'Wedding planner', source: 'Recommandation' },
    ],
    aboutTitle: 'Conduisez l\'extraordinaire',
    aboutText: 'Velours Auto collectionne les plus belles mécaniques du monde depuis 2008. Ferrari, Lamborghini, McLaren, Rolls-Royce — chaque véhicule est sélectionné pour son état, son histoire et l\'émotion qu\'il procure.',
  },
  'horizon-charter': {
    heroImage: u('photo-1544551763-46a013bb70d5'),
    heroImageAlt: 'Yacht charter privé en Méditerranée',
    gallery: [
      { src: u('photo-1567899377494-49b0a6032c75', 800), alt: 'Superyacht', caption: 'Flotte 40m+' },
      { src: u('photo-1605281317010-fe14ffe4a3e0', 800), alt: 'Pont yacht', caption: 'Ponts panoramiques' },
      { src: u('photo-1540541330187-a11d2d003c5a', 800), alt: 'Calanques', caption: 'Calanques de Cassis' },
      { src: u('photo-1506905925346-21bda4d32df4', 800), alt: 'Côte méditerranéenne', caption: 'Itinéraires exclusifs' },
    ],
    reassurance: [
      { icon: '⚓', title: 'Équipage 5★', text: 'Capitaines MYA certifiés, stewards formés palace.' },
      { icon: '👨‍🍳', title: 'Chef étoilé à bord', text: 'Partenariat avec 12 maisons Michelin — menu sur-mesure.' },
      { icon: '🗺', title: 'Itinéraire sur-mesure', text: 'Calanques secrètes, criques privées — hors des circuits classiques.' },
      { icon: '🚁', title: 'Transfert hélico', text: 'Nice → yacht en 12 minutes — coordination incluse.' },
    ],
    location: {
      address: 'Port de Saint-Tropez, 83990 Saint-Tropez',
      district: 'Base Méditerranée · Bureau Antibes',
      hours: 'Saison Avr–Oct · Conciergerie 24/7 en charter',
      access: 'Héliport Saint-Tropez La Môle · Nice 1h15 route',
      parking: 'Port Saint-Tropez — accueil VIP quai',
      mapQuery: 'Port+Saint-Tropez',
    },
    reviewSummary: { score: 4.95, count: 74, source: 'Clients charter' },
    reviews: [
      { rating: 5, text: 'Le configurateur d\'itinéraire nous a fait gagner des semaines de planification.', author: 'Famille D.', role: 'Charter 52m — 2 semaines', source: 'Recommandation' },
      { rating: 5, text: 'Perfection from booking to disembarkation.', author: 'David Chen', role: 'CEO — Singapore', source: 'Recommandation' },
      { rating: 5, text: 'Calanques, Porquerolles, Monaco — un voyage inoubliable. Équipage exceptionnel.', author: 'Claire & Marc', role: 'Charter famille — 10 jours', source: 'Recommandation' },
    ],
    aboutTitle: 'Votre océan, votre règne',
    aboutText: 'Horizon Charter affrète 85 yachts dans les plus belles eaux du monde. Méditerranée, Caraïbes, Maldives — chaque voyage est orchestré par un charter manager dédié, disponible avant, pendant et après votre croisière.',
  },
  'sanctum-spa': {
    heroImage: u('photo-1544161515-4ab6ce6db949'),
    heroImageAlt: 'Retraite wellness alpine — piscine et montagnes',
    gallery: [
      { src: u('photo-1540555700478-4be289fbecef', 800), alt: 'Spa treatment room', caption: 'Suites de soins' },
      { src: u('photo-1571902949902-9fa104b1e5d9', 800), alt: 'Piscine intérieure', caption: 'Bassin thermal' },
      { src: u('photo-1507652313519-d4e9174996f2', 800), alt: 'Montagnes Gstaad', caption: 'Cadre alpin' },
      { src: u('photo-1515377905703-c4788e51af15', 800), alt: 'Espace détente', caption: 'Silence & lumière' },
    ],
    reassurance: [
      { icon: '🏔', title: 'Relais & Châteaux', text: 'Membre du réseau — standards d\'excellence reconnus mondialement.' },
      { icon: '🧬', title: 'Bilan longévité', text: 'Analyses complètes avant arrivée — programme personnalisé validé par médecin.' },
      { icon: '🤫', title: 'Discrétion absolue', text: '12 suites seulement — clientèle internationale exigeante.' },
      { icon: '❄', title: 'Cryo & HBOT', text: 'Équipements médicaux de pointe — protocoles validés cliniquement.' },
    ],
    location: {
      address: 'Alpine Retreat, 3780 Gstaad, Suisse',
      district: 'Domaine privé — Gstaad Saanenland',
      hours: 'Programmes 3 à 14 jours · Arrivée dimanche',
      access: 'Genève Aéroport 2h · Heliski sur demande',
      parking: 'Transfert privé inclus depuis Gstaad station',
      mapQuery: 'Gstaad+Switzerland',
    },
    reviewSummary: { score: 4.9, count: 203, source: 'Guests reviews' },
    reviews: [
      { rating: 5, text: 'Le builder de programme en ligne m\'a permis d\'arriver avec un plan sur-mesure déjà validé.', author: 'Elena V.', role: 'Programme 5 jours', source: 'Guest book' },
      { rating: 5, text: 'A sanctuary for body and mind. Unparalleled.', author: 'Michael R.', role: 'CEO — Zurich', source: 'Guest book' },
      { rating: 5, text: 'Le silence, les soins, la cuisine — une parenthèse qui change la vie.', author: 'Anna S.', role: 'Retraite 7 jours', source: 'Guest book' },
    ],
    aboutTitle: 'Le silence qui transforme',
    aboutText: 'Sanctum Spa est une retraite de 12 suites nichée à 1 200m d\'altitude. Praticiens ayurvédiques, naturopathes et médecins anti-âge collaborent pour des programmes de régénération profonde.',
  },
  'aether-aviation': {
    heroImage: u('photo-1436491865339-9a61a6fa08db'),
    heroImageAlt: 'Jet privé au lever du soleil sur piste',
    gallery: [
      { src: u('photo-1474302779097-643ab022d7b3', 800), alt: 'Cabine Gulfstream', caption: 'Cabines sur-mesure' },
      { src: u('photo-1540962351504-03099e0a754b', 800), alt: 'Terminal FBO', caption: 'FBO Le Bourget' },
      { src: u('photo-1529107386315-e1a2cc48af49', 800), alt: 'Vue depuis le jet', caption: 'Au-dessus des nuages' },
      { src: u('photo-1583608205776-bfd35f0d9f83', 800), alt: 'Hélicoptère', caption: 'Transferts héli' },
    ],
    reassurance: [
      { icon: '✈', title: 'ARGUS Platinum', text: 'Opérateurs certifiés aux plus hauts standards de sécurité mondiaux.' },
      { icon: '⏱', title: 'Départ sous 2h', text: 'Vol charter confirmé en moins de 120 minutes sur routes européennes.' },
      { icon: '🍽', title: 'Catering étoilé', text: 'Menus Ducasse, Robuchon ou sur-mesure — servis à l\'heure souhaitée.' },
      { icon: '🌐', title: '180 destinations', text: 'Réseau mondial FBO — Paris, Genève, Nice, Londres, Dubai, New York.' },
    ],
    location: {
      address: 'FBO Terminal 1, Aéroport du Bourget, 93350 Le Bourget',
      district: 'Hub Europe · Bureau Genève Cointrin',
      hours: '24/7/365 · Dispatch permanent',
      access: 'RER B Le Bourget · Accès direct FBO privé',
      parking: 'Parking FBO VIP — accès tarmac sur rendez-vous',
      mapQuery: 'Le+Bourget+Airport+FBO',
    },
    reviewSummary: { score: 4.95, count: 312, source: 'Corporate clients' },
    reviews: [
      { rating: 5, text: 'Paris-Genève en 55 minutes. Le configurateur de vol m\'a donné un devis en temps réel.', author: 'Philippe M.', role: 'Family Office', source: 'Direct' },
      { rating: 5, text: 'Seamless, discreet, flawless. Our go-to for European travel.', author: 'Board Member', role: 'Fortune 500', source: 'Direct' },
      { rating: 5, text: 'Empty leg Nice-Londres à -70%. Service identique au charter classique.', author: 'Sophie L.', role: 'Entrepreneur', source: 'Direct' },
    ],
    aboutTitle: 'Le ciel n\'a plus de limites',
    aboutText: 'Aether Aviation opère une flotte de 45 appareils — Global 7500, Gulfstream G650, Falcon 8X. Notre dispatch centralisé au Bourget coordonne chaque vol avec une précision suisse.',
  },
  'atelier-nocturne': {
    heroImage: u('photo-1515562141207-7a88fb791ce1'),
    heroImageAlt: 'Bague de fiançailles diamant — haute joaillerie',
    gallery: [
      { src: u('photo-1605100804763-247f67b3557e', 800), alt: 'Diamant serti', caption: 'Sertissage main' },
      { src: u('photo-1611591437281-460bfbe1220a', 800), alt: 'Atelier joaillier', caption: 'Atelier Place Vendôme' },
      { src: u('photo-1535632066927-ab7c9ab60908', 800), alt: 'Collier sur-mesure', caption: 'Créations uniques' },
      { src: u('photo-1506630448388-4e683c67ddb0', 800), alt: 'Pierres précieuses', caption: 'Pierres certifiées GIA' },
    ],
    reassurance: [
      { icon: '◇', title: 'Certificat GIA', text: 'Chaque diamant > 0.30ct accompagné de son certificat gemmologique.' },
      { icon: '✋', title: 'Sertissage main', text: 'Artisans formés à la Place Vendôme — 140 ans de savoir-faire.' },
      { icon: '∞', title: 'Garantie à vie', text: 'Entretien, polissage et ajustement gratuits à vie.' },
      { icon: '🔐', title: 'Livraison sécurisée', text: 'Transport blindé Brink\'s — assurance tous risques incluse.' },
    ],
    location: {
      address: '22 Place Vendôme, 75001 Paris',
      district: 'Showroom sur rendez-vous — 2e étage',
      hours: 'Mar–Sam 11h–19h · Rendez-vous privé uniquement',
      access: 'Opéra (L3, L7, L8) · Entrée discrète Place Vendôme',
      parking: 'Voiturier Ritz Paris — partenaire officiel',
      mapQuery: 'Place+Vendome+Paris+jewelry',
    },
    reviewSummary: { score: 5.0, count: 67, source: 'Clients privés' },
    reviews: [
      { rating: 5, text: 'Le configurateur 3D m\'a permis de visualiser la bague parfaite avant la première visite.', author: 'Julien & Marie', role: 'Fiançailles sur-mesure', source: 'Recommandation' },
      { rating: 5, text: 'Craftsmanship beyond compare. A true Place Vendôme experience.', author: 'Ambassador\'s wife', role: 'Parure privée', source: 'Recommandation' },
      { rating: 5, text: 'Transformation d\'un héritage familial en collier moderne — émotion et talent.', author: 'Comtesse M.', role: 'Restauration bijou', source: 'Recommandation' },
    ],
    aboutTitle: 'L\'éternité gravée dans la lumière',
    aboutText: 'Depuis 1884, Atelier Nocturne crée des pièces uniques pour une clientèle qui ne demande qu\'une chose : l\'exception absolue. Chaque pierre est sélectionnée à la loupe, chaque sertissage est une signature.',
  },
  'grand-palais-events': {
    heroImage: u('photo-1519167758481-83f550bb49b0'),
    heroImageAlt: 'Gala prestigieux — salle événementielle illuminée',
    gallery: [
      { src: u('photo-1470229722913-7c0e2dbbafd3', 800), alt: 'Concert live', caption: 'Scène immersive' },
      { src: u('photo-1464366400600-6642d0288c0f', 800), alt: 'Tables gala', caption: 'Dîners de prestige' },
      { src: u('photo-1511578314322-379afb476865', 800), alt: 'Lancement produit', caption: 'Lancements marques' },
      { src: u('photo-1519225421980-fbd0db020fad', 800), alt: 'Mariage royal', caption: 'Mariages d\'exception' },
    ],
    reassurance: [
      { icon: '★', title: '800 convives', text: 'Trois salons modulables — de l\'intime 50 pers. au gala 800 couverts.' },
      { icon: '🎬', title: 'Production intégrée', text: 'Régie AV, mapping 3D, streaming — équipe technique dédiée.' },
      { icon: '🍷', title: 'Partenaire Michelin', text: 'Chefs étoilés en résidence — menus co-créés avec votre brief.' },
      { icon: '🛎', title: 'Conciergerie invités', text: 'Hébergement, transferts, accréditations — gestion clé en main.' },
    ],
    location: {
      address: 'Avenue Winston Churchill, 75008 Paris',
      district: 'Grand Palais éphémère · Villa Méditerranée Cannes',
      hours: 'Visites sur rendez-vous · Événements toute l\'année',
      access: 'Champs-Élysées Clemenceau (L1, L13) · Entrée VIP',
      parking: '500 places sécurisées — accès limousine',
      mapQuery: 'Grand+Palais+Paris',
    },
    reviewSummary: { score: 4.9, count: 124, source: 'Organisateurs' },
    reviews: [
      { rating: 5, text: 'Le configurateur d\'événement nous a fait économiser 3 semaines de réunions. Tout était clair dès le départ.', author: 'LVMH Events', role: 'Lancement produit 2025', source: 'Direct' },
      { rating: 5, text: 'The most breathtaking venue in Europe. Flawless execution.', author: 'Royal Wedding Planner', role: 'Monaco', source: 'Direct' },
      { rating: 5, text: 'Gala 600 personnes — scénographie, catering, artistes : un seul interlocuteur.', author: 'Fondation Cartier', role: 'Gala annuel', source: 'Direct' },
    ],
    aboutTitle: 'Là où les légendes se célèbrent',
    aboutText: 'Le Grand Palais Events accueille plus de 200 événements par an : galas, sommets, lancements, mariages. Une équipe de 80 professionnels transforme chaque brief en expérience mémorable.',
  },
};

export function getSiteEnrichment(slug: string): SiteEnrichment {
  return siteEnrichment[slug] ?? siteEnrichment['velours-auto'];
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.replace(/\+/g, ' '))}`;
}
