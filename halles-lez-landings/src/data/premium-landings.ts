export interface PremiumOption {
  label: string;
  value: string;
  description: string;
  setup: number;
}

export interface PremiumSlider {
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  pricePerUnit: number;
}

export interface PremiumLanding {
  slug: string;
  name: string;
  category: string;
  city: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  description: string;
  accent: string;
  secondary: string;
  surface: string;
  glow: string;
  visual: {
    object: string;
    material: string;
    layers: string[];
  };
  estimator: {
    title: string;
    intro: string;
    base: number;
    currency: string;
    resultLabel: string;
    primarySlider: PremiumSlider;
    secondarySlider: PremiumSlider;
    optionLabel: string;
    options: PremiumOption[];
    included: string[];
    cta: string;
  };
  services: {
    title: string;
    text: string;
  }[];
  journey: string[];
  stats: {
    value: string;
    label: string;
  }[];
  proof: string;
  testimonial: {
    text: string;
    author: string;
  };
}

export const premiumLandings: PremiumLanding[] = [
  {
    slug: 'elysian-clinic',
    name: 'Elysian Clinic',
    category: 'Centre de chirurgie esthétique',
    city: 'Paris · Genève',
    eyebrow: 'Luxury medical journey',
    headline: 'Une consultation esthétique pilotée comme une suite privée.',
    subheadline: 'Diagnostic immersif, parcours patient sécurisé, projection de protocole et prise de rendez-vous premium en moins de trois minutes.',
    description:
      'La page transforme une intention sensible en parcours rassurant : tri médical, protocole conseillé, suite de récupération, estimation et appel confidentiel avec une coordinatrice.',
    accent: '#f4d8c8',
    secondary: '#9f6d63',
    surface: '#1d1517',
    glow: 'rgba(244, 216, 200, 0.28)',
    visual: {
      object: 'Face scan 3D',
      material: 'verre champagne',
      layers: ['Consultation privée', 'Simulation morphologique', 'Suite récupération'],
    },
    estimator: {
      title: 'Planifier mon protocole confidentiel',
      intro: 'Le patient choisit une intention, ajuste son niveau de confort et reçoit un parcours clair avant même de parler au cabinet.',
      base: 420,
      currency: 'EUR',
      resultLabel: 'Budget de parcours indicatif',
      primarySlider: {
        label: 'Nuits en suite post-acte',
        min: 0,
        max: 7,
        defaultValue: 2,
        unit: 'nuit(s)',
        pricePerUnit: 380,
      },
      secondarySlider: {
        label: 'Accompagnement concierge',
        min: 1,
        max: 5,
        defaultValue: 3,
        unit: '/5',
        pricePerUnit: 180,
      },
      optionLabel: 'Objectif esthétique',
      options: [
        { label: 'Rajeunissement du visage', value: 'face', description: 'Bilan peau, regard, ovale et protocole combiné.', setup: 2800 },
        { label: 'Silhouette haute précision', value: 'body', description: 'Analyse zones, récupération et suivi nutritionnel.', setup: 3600 },
        { label: 'Greffe capillaire premium', value: 'hair', description: 'Pré-diagnostic, densité cible et protocole PRP.', setup: 4200 },
      ],
      included: ['Questionnaire sécurisé', 'Rendez-vous visio', 'Protocole PDF', 'Conciergerie récupération'],
      cta: 'Réserver la consultation privée',
    },
    services: [
      { title: 'Triage médical UX', text: 'Questions progressives, ton rassurant et alertes de contre-indication avant conversion.' },
      { title: 'Avant / après premium', text: 'Comparateur interactif, consentement clair et visuels contrôlés par le praticien.' },
      { title: 'Espace patient', text: 'Checklist pré-opératoire, documents, acompte et rappels automatisés.' },
    ],
    journey: ['Choisir une intention', 'Recevoir une projection', 'Bloquer un créneau confidentiel', 'Suivre la préparation'],
    stats: [
      { value: '24h', label: 'retour coordinatrice' },
      { value: '4.9/5', label: 'expérience patient' },
      { value: '100%', label: 'parcours discret' },
    ],
    proof: 'Pensé pour un cabinet premium : pédagogie médicale, conversion douce et confidentialité visible à chaque étape.',
    testimonial: {
      text: 'Le site donne immédiatement la sensation d’un établissement très structuré, luxueux et rassurant.',
      author: 'Direction clinique esthétique',
    },
  },
  {
    slug: 'atlas-prime-estate',
    name: 'Atlas Prime Estate',
    category: 'Agence immobilière ultra-premium',
    city: 'Paris · Côte d’Azur · Dubai',
    eyebrow: 'Off-market property intelligence',
    headline: 'Un moteur de recherche immobilier qui ressemble à un salon privé.',
    subheadline: 'Le visiteur compose son mandat, explore des biens off-market et reçoit une sélection qualifiée sans friction commerciale.',
    description:
      'La landing page devient un outil de qualification haut de gamme : budget, style de vie, localisation, rendement, visite privée et dossier acheteur.',
    accent: '#d7b46a',
    secondary: '#6f5b38',
    surface: '#11151c',
    glow: 'rgba(215, 180, 106, 0.28)',
    visual: {
      object: 'Villa holographique',
      material: 'onyx et or brossé',
      layers: ['Carte off-market', 'Dossier acheteur', 'Visite privée'],
    },
    estimator: {
      title: 'Composer mon mandat d’acquisition',
      intro: 'Une expérience de sélection digne d’un family office, avec scoring instantané du profil acheteur.',
      base: 0,
      currency: 'EUR',
      resultLabel: 'Enveloppe cible du mandat',
      primarySlider: {
        label: 'Budget propriété',
        min: 1,
        max: 25,
        defaultValue: 8,
        unit: 'M€',
        pricePerUnit: 1000000,
      },
      secondarySlider: {
        label: 'Pièces souhaitées',
        min: 3,
        max: 12,
        defaultValue: 6,
        unit: 'pièces',
        pricePerUnit: 0,
      },
      optionLabel: 'Style de propriété',
      options: [
        { label: 'Penthouse iconique', value: 'penthouse', description: 'Vue skyline, services hôteliers, accès discret.', setup: 450000 },
        { label: 'Villa front de mer', value: 'villa', description: 'Plage privée, ponton, staff house.', setup: 900000 },
        { label: 'Domaine patrimonial', value: 'estate', description: 'Terres, sécurité, dépendances et rendement.', setup: 1200000 },
      ],
      included: ['Matching off-market', 'Dossier acheteur', 'Visite privée', 'Négociation confidentielle'],
      cta: 'Recevoir ma shortlist privée',
    },
    services: [
      { title: 'Sélecteur lifestyle', text: 'Vue mer, écoles, héliport, marina : le moteur traduit un mode de vie en critères.' },
      { title: 'Cartographie prestige', text: 'Quartiers et zones chaudes visualisés comme une table de marché privée.' },
      { title: 'Data room vendeur', text: 'NDA, justificatifs, calendrier et rendez-vous regroupés dans un tunnel premium.' },
    ],
    journey: ['Définir son style de vie', 'Explorer la carte premium', 'Recevoir 3 biens rares', 'Planifier la visite'],
    stats: [
      { value: '€2B+', label: 'actifs représentés' },
      { value: '72h', label: 'shortlist privée' },
      { value: '61%', label: 'off-market' },
    ],
    proof: 'Le site donne au prospect la sensation d’avoir déjà une équipe de chasse immobilière dédiée.',
    testimonial: {
      text: 'La qualification est élégante, rapide et parfaitement adaptée à une clientèle patrimoniale.',
      author: 'Associé agence real estate',
    },
  },
  {
    slug: 'noir-wave-dubai',
    name: 'Noir Wave Dubai',
    category: 'Location de jet ski premium',
    city: 'Dubai Marina',
    eyebrow: 'Ride the skyline',
    headline: 'Réserver un jet ski devant le Burj Al Arab devient un moment cinéma.',
    subheadline: 'Choix du modèle, créneau, durée, caméra embarquée, instructeur et paiement : l’expérience vend la montée d’adrénaline avant l’appel.',
    description:
      'Un tunnel de réservation pensé tourisme luxe à Dubai : visuel 3D, packs sunset, upsell drone et estimation claire pour convertir immédiatement.',
    accent: '#5ee7ff',
    secondary: '#0ea5c6',
    surface: '#07131f',
    glow: 'rgba(94, 231, 255, 0.3)',
    visual: {
      object: 'Jet ski carbone',
      material: 'carbone bleu électrique',
      layers: ['GPS Marina', 'Caméra 4K', 'Guide privé'],
    },
    estimator: {
      title: 'Construire ma session Dubai',
      intro: 'Le client choisit son ride comme une activité de palace : modèle, durée, intensité et options souvenir.',
      base: 90,
      currency: 'EUR',
      resultLabel: 'Total session estimé',
      primarySlider: {
        label: 'Durée',
        min: 1,
        max: 4,
        defaultValue: 2,
        unit: 'heure(s)',
        pricePerUnit: 140,
      },
      secondarySlider: {
        label: 'Participants',
        min: 1,
        max: 6,
        defaultValue: 2,
        unit: 'pers.',
        pricePerUnit: 75,
      },
      optionLabel: 'Expérience',
      options: [
        { label: 'Marina Explorer', value: 'marina', description: 'Boucle skyline, briefing et photos dock.', setup: 120 },
        { label: 'Burj Al Arab Signature', value: 'burj', description: 'Ride accompagné, spots photos premium.', setup: 260 },
        { label: 'Sunset Drone Pack', value: 'sunset', description: 'Golden hour, drone, montage vertical social.', setup: 480 },
      ],
      included: ['Créneau live', 'Brief sécurité', 'Casier privé', 'Paiement acompte'],
      cta: 'Bloquer le créneau',
    },
    services: [
      { title: 'Booking temps réel', text: 'Créneaux, météo, acompte et documents dans une seule interface mobile.' },
      { title: 'Upsell social content', text: 'Pack drone, GoPro, montage Reel et livraison express depuis la page.' },
      { title: 'Expérience palace', text: 'Chauffeur, serviettes, boissons et accueil VIP proposés sans surcharge cognitive.' },
    ],
    journey: ['Choisir le spot', 'Sélectionner la machine', 'Ajouter drone ou GoPro', 'Payer l’acompte'],
    stats: [
      { value: '15min', label: 'check-in' },
      { value: '4K', label: 'souvenirs inclus' },
      { value: '7/7', label: 'Dubai Marina' },
    ],
    proof: 'Chaque interaction réduit l’hésitation : le visiteur sait quoi louer, quand venir et combien payer.',
    testimonial: {
      text: 'On sent Dubai : rapide, spectaculaire, premium et fait pour convertir sur mobile.',
      author: 'Opérateur loisirs nautiques',
    },
  },
  {
    slug: 'lustral-yacht-care',
    name: 'Lustral Yacht Care',
    category: 'Nettoyage premium de yachts',
    city: 'Monaco · Saint-Tropez',
    eyebrow: 'Yacht detailing concierge',
    headline: 'Le nettoyage de yacht présenté comme une opération de haute précision.',
    subheadline: 'Le capitaine indique la taille, le niveau de finition, la fréquence et reçoit une estimation claire avec planning d’équipe.',
    description:
      'La page remonte le niveau perçu d’une activité de cleaning : inspection, protocole matériaux, reporting photo, intervention sans déranger l’équipage.',
    accent: '#c6f6ff',
    secondary: '#3bbac8',
    surface: '#08191c',
    glow: 'rgba(198, 246, 255, 0.24)',
    visual: {
      object: 'Coque miroir',
      material: 'chrome liquide',
      layers: ['Inspection gelcoat', 'Détailing teck', 'Reporting capitaine'],
    },
    estimator: {
      title: 'Estimer une intervention yacht',
      intro: 'Un capitaine peut cadrer la mission sans appel : longueur, urgence, niveau de finition et créneau portuaire.',
      base: 650,
      currency: 'EUR',
      resultLabel: 'Intervention estimée',
      primarySlider: {
        label: 'Longueur du yacht',
        min: 12,
        max: 70,
        defaultValue: 32,
        unit: 'm',
        pricePerUnit: 28,
      },
      secondarySlider: {
        label: 'Techniciens',
        min: 2,
        max: 12,
        defaultValue: 5,
        unit: 'pers.',
        pricePerUnit: 95,
      },
      optionLabel: 'Niveau de finition',
      options: [
        { label: 'Turnaround charter', value: 'charter', description: 'Nettoyage rapide entre deux invités.', setup: 420 },
        { label: 'Mirror detailing', value: 'mirror', description: 'Polish inox, gelcoat, vitres et pont.', setup: 980 },
        { label: 'Owner arrival protocol', value: 'owner', description: 'Inspection complète, fleurs, linge et report.', setup: 1600 },
      ],
      included: ['Planning équipe', 'Protocole matériaux', 'Photos avant/après', 'Facture capitaine'],
      cta: 'Envoyer la mission au crew manager',
    },
    services: [
      { title: 'Avant/après documenté', text: 'Le site promet un reporting photo utile aux capitaines et managers.' },
      { title: 'Protocole matériaux', text: 'Teck, inox, cuir, gelcoat : le service paraît expert, pas générique.' },
      { title: 'Dispatch équipes', text: 'Calcul du crew nécessaire selon longueur, urgence et standing propriétaire.' },
    ],
    journey: ['Scanner la taille', 'Choisir le protocole', 'Recevoir le planning', 'Valider l’intervention'],
    stats: [
      { value: '70m', label: 'capacité max' },
      { value: '6h', label: 'turnaround possible' },
      { value: '100%', label: 'report photo' },
    ],
    proof: 'Le devis devient concret, opérationnel et premium dès la première visite.',
    testimonial: {
      text: 'Enfin un site de cleaning qui parle le langage des capitaines et des propriétaires.',
      author: 'Yacht manager',
    },
  },
  {
    slug: 'monaco-drive',
    name: 'Monaco Drive Atelier',
    category: 'Location de véhicules haut de gamme',
    city: 'Monaco · Nice · Cannes',
    eyebrow: 'Supercar rental configurator',
    headline: 'Le client configure sa supercar comme un achat plaisir immédiat.',
    subheadline: 'Modèle, jours, kilomètres, livraison palace, assurance, caution et paiement : tout est maîtrisé sur la page.',
    description:
      'La landing page joue le rôle d’un showroom digital : cartes 3D, estimation dynamique, disponibilité, pièces de dossier et appel concierge.',
    accent: '#ffce6b',
    secondary: '#8c6938',
    surface: '#12100d',
    glow: 'rgba(255, 206, 107, 0.26)',
    visual: {
      object: 'Hypercar 3D',
      material: 'carbone doré',
      layers: ['Modèles live', 'Kilométrage', 'Livraison palace'],
    },
    estimator: {
      title: 'Configurer ma location',
      intro: 'L’utilisateur choisit son modèle, ajuste la durée et les kilomètres, puis voit le budget avant de réserver.',
      base: 350,
      currency: 'EUR',
      resultLabel: 'Total location estimé',
      primarySlider: {
        label: 'Durée',
        min: 1,
        max: 14,
        defaultValue: 3,
        unit: 'jour(s)',
        pricePerUnit: 240,
      },
      secondarySlider: {
        label: 'Kilomètres inclus',
        min: 100,
        max: 1200,
        defaultValue: 400,
        unit: 'km',
        pricePerUnit: 1.7,
      },
      optionLabel: 'Modèle',
      options: [
        { label: 'Porsche 911 Turbo S', value: 'porsche', description: 'Sport luxe, daily supercar, Riviera.', setup: 980 },
        { label: 'Ferrari F8 Spider', value: 'ferrari', description: 'Cabriolet iconique, sunset drive.', setup: 1850 },
        { label: 'Lamborghini Urus Performante', value: 'urus', description: 'SUV ultra-luxe, groupe ou famille.', setup: 1450 },
      ],
      included: ['Disponibilité modèle', 'Caution guidée', 'Assurance premium', 'Livraison hôtel'],
      cta: 'Pré-réserver ce véhicule',
    },
    services: [
      { title: 'Carousel showroom', text: 'Chaque modèle a sa fiche, son son moteur, ses conditions et son prix dynamique.' },
      { title: 'Estimateur transparent', text: 'Jours, kilomètres, livraison, assurance et caution visibles avant contact.' },
      { title: 'Concierge de livraison', text: 'Palace, aéroport, yacht ou villa : la page vend la logistique premium.' },
    ],
    journey: ['Choisir le modèle', 'Ajuster km et jours', 'Uploader le permis', 'Payer l’acompte'],
    stats: [
      { value: '38', label: 'véhicules prestige' },
      { value: '30min', label: 'validation dossier' },
      { value: '24/7', label: 'livraison concierge' },
    ],
    proof: 'La page répond aux objections avant l’appel : prix, caution, disponibilité et expérience de livraison.',
    testimonial: {
      text: 'C’est exactement le type de tunnel qui fait réserver sans passer 20 minutes au téléphone.',
      author: 'Fondateur location prestige',
    },
  },
  {
    slug: 'celeste-aviation',
    name: 'Celeste Aviation',
    category: 'Affrètement de jets privés',
    city: 'Le Bourget · Europe',
    eyebrow: 'Private flight desk',
    headline: 'Un devis jet privé qui se construit avec la fluidité d’une app bancaire.',
    subheadline: 'Route, passagers, bagages, catering, transfert et FBO : le prospect comprend immédiatement le niveau de service.',
    description:
      'Le site qualifie une demande complexe avec une interface calme et prestigieuse, puis transmet un brief exploitable au broker.',
    accent: '#d9ecff',
    secondary: '#6d8fb3',
    surface: '#0b111b',
    glow: 'rgba(217, 236, 255, 0.24)',
    visual: {
      object: 'Jet silhouette',
      material: 'titane nacré',
      layers: ['Route Europe', 'FBO privé', 'Catering chef'],
    },
    estimator: {
      title: 'Préparer mon vol privé',
      intro: 'Une demande d’affrètement devient lisible : distance, passagers, niveau cabine et services au sol.',
      base: 6200,
      currency: 'EUR',
      resultLabel: 'Affrètement indicatif',
      primarySlider: {
        label: 'Distance',
        min: 300,
        max: 4200,
        defaultValue: 1200,
        unit: 'km',
        pricePerUnit: 8.5,
      },
      secondarySlider: {
        label: 'Passagers',
        min: 1,
        max: 14,
        defaultValue: 5,
        unit: 'pers.',
        pricePerUnit: 280,
      },
      optionLabel: 'Cabine',
      options: [
        { label: 'Light jet', value: 'light', description: 'Efficace pour les routes européennes rapides.', setup: 4200 },
        { label: 'Midsize cabin', value: 'midsize', description: 'Confort affaires, bagages et catering.', setup: 7200 },
        { label: 'Long range suite', value: 'long', description: 'Cabine nuit, équipage renforcé, ultra premium.', setup: 14800 },
      ],
      included: ['Brief broker', 'FBO recommandé', 'Catering', 'Transfert chauffeur'],
      cta: 'Recevoir ma proposition de vol',
    },
    services: [
      { title: 'Route intelligence', text: 'Le parcours explique les choix avion, aéroport et timing sans jargon.' },
      { title: 'FBO experience', text: 'Transferts, lounge, documents et catering intégrés au tunnel.' },
      { title: 'Broker-ready lead', text: 'Le formulaire final envoie un brief complet, qualifié et priorisé.' },
    ],
    journey: ['Entrer la route', 'Choisir la cabine', 'Ajouter services au sol', 'Valider le brief'],
    stats: [
      { value: '2h', label: 'proposition broker' },
      { value: '900+', label: 'appareils réseau' },
      { value: '24/7', label: 'flight desk' },
    ],
    proof: 'La complexité de l’aviation privée devient une expérience premium simple à acheter.',
    testimonial: {
      text: 'Le tunnel donne un lead complet sans casser la magie du luxe.',
      author: 'Broker aviation privée',
    },
  },
  {
    slug: 'orya-longevity',
    name: 'Orya Longevity',
    category: 'Clinic spa & longevity retreat',
    city: 'Megève · Suisse',
    eyebrow: 'Biohacking retreat',
    headline: 'Un séjour longévité qui se configure comme un protocole sur mesure.',
    subheadline: 'Bilan, cryothérapie, nutrition, sommeil, coach et suite : la page transforme le bien-être en programme concret.',
    description:
      'Une expérience digitale sensorielle qui vend le sérieux médical et le confort hôtelier d’un retreat ultra-premium.',
    accent: '#baf7d0',
    secondary: '#4c8b67',
    surface: '#101813',
    glow: 'rgba(186, 247, 208, 0.24)',
    visual: {
      object: 'Capsule wellness',
      material: 'verre sauge',
      layers: ['Bilan biomarqueurs', 'Sommeil profond', 'Coach privé'],
    },
    estimator: {
      title: 'Composer mon retreat',
      intro: 'Le visiteur sélectionne l’intensité du programme, la durée et les services pour se projeter dans son séjour.',
      base: 900,
      currency: 'EUR',
      resultLabel: 'Programme estimé',
      primarySlider: {
        label: 'Durée du séjour',
        min: 2,
        max: 14,
        defaultValue: 5,
        unit: 'jour(s)',
        pricePerUnit: 680,
      },
      secondarySlider: {
        label: 'Diagnostics avancés',
        min: 1,
        max: 6,
        defaultValue: 3,
        unit: 'test(s)',
        pricePerUnit: 220,
      },
      optionLabel: 'Programme',
      options: [
        { label: 'Reset sommeil', value: 'sleep', description: 'Chronobiologie, spa, nutrition et récupération.', setup: 760 },
        { label: 'Performance executive', value: 'executive', description: 'Biomarqueurs, coaching, stress et focus.', setup: 1280 },
        { label: 'Longevity deep scan', value: 'longevity', description: 'Diagnostic complet, médecin et plan 90 jours.', setup: 2400 },
      ],
      included: ['Bilan initial', 'Planning soins', 'Suite ou chalet', 'Plan post-séjour'],
      cta: 'Demander mon programme',
    },
    services: [
      { title: 'Diagnostic guidé', text: 'Questionnaire élégant, score de priorité et recommandation non anxiogène.' },
      { title: 'Planning immersif', text: 'Le visiteur voit ses journées se composer : soins, repos, nutrition, coaching.' },
      { title: 'Suivi 90 jours', text: 'La conversion inclut un plan après le retreat, pas seulement une réservation.' },
    ],
    journey: ['Définir son objectif', 'Choisir les diagnostics', 'Voir son planning', 'Valider le séjour'],
    stats: [
      { value: '90j', label: 'suivi inclus' },
      { value: '6', label: 'diagnostics clés' },
      { value: '5★', label: 'hospitalité' },
    ],
    proof: 'Le luxe est dans le calme de l’interface et la clarté du protocole.',
    testimonial: {
      text: 'Le site donne envie de réserver parce qu’il rend le programme très tangible.',
      author: 'Directrice hospitality wellness',
    },
  },
  {
    slug: 'maison-vow-events',
    name: 'Maison Vow Events',
    category: 'Événements privés et mariages couture',
    city: 'Provence · Lake Como',
    eyebrow: 'Couture event atelier',
    headline: 'Un mariage de prestige se scénarise dès la première seconde.',
    subheadline: 'Le couple choisit lieu, invités, scénographie, gastronomie et voit naître une proposition artistique premium.',
    description:
      'La landing page remplace le simple portfolio par un atelier interactif où le client compose son univers avant un appel créatif.',
    accent: '#ffd6e8',
    secondary: '#a65a7e',
    surface: '#1b1117',
    glow: 'rgba(255, 214, 232, 0.25)',
    visual: {
      object: 'Table couture',
      material: 'soie rose et cristal',
      layers: ['Moodboard vivant', 'Scénographie', 'Budget invité'],
    },
    estimator: {
      title: 'Imaginer mon événement',
      intro: 'Une estimation élégante qui qualifie le rêve : nombre d’invités, jours, destination et niveau de scénographie.',
      base: 7500,
      currency: 'EUR',
      resultLabel: 'Budget événement indicatif',
      primarySlider: {
        label: 'Invités',
        min: 30,
        max: 300,
        defaultValue: 120,
        unit: 'invités',
        pricePerUnit: 210,
      },
      secondarySlider: {
        label: 'Jours',
        min: 1,
        max: 4,
        defaultValue: 2,
        unit: 'jour(s)',
        pricePerUnit: 3800,
      },
      optionLabel: 'Signature',
      options: [
        { label: 'Garden Riviera', value: 'garden', description: 'Dîner floral, live music, table couture.', setup: 8500 },
        { label: 'Villa takeover', value: 'villa', description: 'Privatisation, scénographie immersive.', setup: 18000 },
        { label: 'Lake Como opera', value: 'como', description: 'Destination wedding, production complète.', setup: 34000 },
      ],
      included: ['Moodboard', 'Budget live', 'Planning invités', 'Appel créatif'],
      cta: 'Recevoir le concept couture',
    },
    services: [
      { title: 'Moodboard interactif', text: 'Le couple voit couleurs, matières, fleurs et ambiance évoluer avec ses choix.' },
      { title: 'Budget intelligent', text: 'Les postes se clarifient sans casser l’émotion : lieu, table, musique, production.' },
      { title: 'Dossier créatif', text: 'Le lead arrive avec un univers exploitable par l’équipe commerciale.' },
    ],
    journey: ['Choisir l’univers', 'Ajuster invités et jours', 'Voir le budget', 'Recevoir le concept'],
    stats: [
      { value: '14', label: 'destinations' },
      { value: '300', label: 'invités max' },
      { value: '48h', label: 'concept board' },
    ],
    proof: 'Le visiteur ne demande pas un devis : il commence déjà à vivre son événement.',
    testimonial: {
      text: 'C’est très haut de gamme, émotionnel et commercialement précis.',
      author: 'Wedding planner destination',
    },
  },
  {
    slug: 'atelier-chronos',
    name: 'Atelier Chronos',
    category: 'Conciergerie montres & joaillerie',
    city: 'Paris · Zurich',
    eyebrow: 'Rare pieces concierge',
    headline: 'La recherche d’une pièce rare devient une chasse privée digitalisée.',
    subheadline: 'Modèle, budget, délai, authentification, sourcing et rendez-vous sécurisé : tout inspire confiance et exclusivité.',
    description:
      'La page donne à un client UHNW un parcours discret pour demander une Rolex rare, une Patek Philippe ou une pièce joaillière sur mesure.',
    accent: '#f7e6b2',
    secondary: '#8f7442',
    surface: '#12100a',
    glow: 'rgba(247, 230, 178, 0.22)',
    visual: {
      object: 'Tourbillon macro',
      material: 'or champagne',
      layers: ['Sourcing rare', 'Authentification', 'Salon privé'],
    },
    estimator: {
      title: 'Lancer une recherche privée',
      intro: 'Le prospect donne assez d’informations pour être pris au sérieux sans exposer publiquement sa demande.',
      base: 650,
      currency: 'EUR',
      resultLabel: 'Mandat de recherche estimé',
      primarySlider: {
        label: 'Budget cible',
        min: 10,
        max: 450,
        defaultValue: 80,
        unit: 'k€',
        pricePerUnit: 1000,
      },
      secondarySlider: {
        label: 'Délai souhaité',
        min: 1,
        max: 12,
        defaultValue: 4,
        unit: 'sem.',
        pricePerUnit: 120,
      },
      optionLabel: 'Type de pièce',
      options: [
        { label: 'Montre iconique', value: 'watch', description: 'Rolex, Patek, Audemars, modèles attendus.', setup: 900 },
        { label: 'Complication rare', value: 'rare', description: 'Calendrier, répétition minutes, édition limitée.', setup: 2400 },
        { label: 'Joaillerie sur mesure', value: 'jewel', description: 'Pierre, dessin, atelier et certificat.', setup: 3600 },
      ],
      included: ['NDA possible', 'Authentification', 'Escrow', 'Rendez-vous salon'],
      cta: 'Confier ma recherche',
    },
    services: [
      { title: 'Qualification discrète', text: 'Le formulaire évite les demandes faibles et valorise le sérieux du mandat.' },
      { title: 'Preuve de confiance', text: 'Certificat, escrow, traçabilité et rendez-vous privé visibles dans le tunnel.' },
      { title: 'Portfolio rare', text: 'Animations macro, matière or, mouvement et pierres sans dépendre de photos clients.' },
    ],
    journey: ['Décrire la pièce', 'Définir budget et délai', 'Valider le mandat', 'Recevoir les opportunités'],
    stats: [
      { value: '48h', label: 'premier retour' },
      { value: '31', label: 'marchés sources' },
      { value: '100%', label: 'authentifié' },
    ],
    proof: 'L’interface vend la confiance, élément central d’une transaction rare.',
    testimonial: {
      text: 'Le site filtre naturellement les prospects et donne une image très exclusive.',
      author: 'Concierge joaillerie',
    },
  },
  {
    slug: 'sentinel-elite',
    name: 'Sentinel Elite',
    category: 'Chauffeur sécurité & protection privée',
    city: 'Paris · Monaco · Dubai',
    eyebrow: 'Executive protection desk',
    headline: 'La protection privée devient lisible, rassurante et réservée.',
    subheadline: 'Trajet, profil, niveau de risque, véhicule blindé, chauffeur et équipe : le décideur obtient un brief opérationnel sans exposer son agenda.',
    description:
      'La landing page transforme une demande sensible en parcours confidentiel, avec priorité donnée à la sécurité, la discrétion et la logistique.',
    accent: '#d6dde8',
    secondary: '#727f91',
    surface: '#0c1016',
    glow: 'rgba(214, 221, 232, 0.2)',
    visual: {
      object: 'SUV blindé',
      material: 'graphite mat',
      layers: ['Risk score', 'Driver detail', 'Secure route'],
    },
    estimator: {
      title: 'Préparer une mission sécurisée',
      intro: 'Un assistant de mission collecte le juste niveau d’information pour déclencher un rappel prioritaire.',
      base: 1200,
      currency: 'EUR',
      resultLabel: 'Mission estimée',
      primarySlider: {
        label: 'Durée mission',
        min: 4,
        max: 72,
        defaultValue: 12,
        unit: 'h',
        pricePerUnit: 95,
      },
      secondarySlider: {
        label: 'Agents',
        min: 1,
        max: 8,
        defaultValue: 3,
        unit: 'agent(s)',
        pricePerUnit: 240,
      },
      optionLabel: 'Niveau de service',
      options: [
        { label: 'Executive driver', value: 'driver', description: 'Chauffeur premium, itinéraire discret.', setup: 420 },
        { label: 'Close protection', value: 'close', description: 'Agent rapproché, avance et coordination.', setup: 1500 },
        { label: 'Diplomatic convoy', value: 'convoy', description: 'Véhicules multiples, route sécurisée, liaison.', setup: 3600 },
      ],
      included: ['Brief confidentiel', 'Route sécurisée', 'Véhicule adapté', 'Rappel prioritaire'],
      cta: 'Demander le rappel sécurisé',
    },
    services: [
      { title: 'Brief sensible', text: 'Le site collecte sans surexposer : ville, niveau, durée et contraintes.' },
      { title: 'Perception premium', text: 'Design mat, précis, institutionnel : sérieux sans agressivité.' },
      { title: 'Dispatch opérationnel', text: 'L’équipe reçoit agents, durée, véhicule et urgence déjà cadrés.' },
    ],
    journey: ['Définir la mission', 'Ajuster le niveau', 'Recevoir le brief', 'Confirmer par canal sécurisé'],
    stats: [
      { value: '15min', label: 'rappel prioritaire' },
      { value: '24/7', label: 'dispatch' },
      { value: 'NDA', label: 'sur demande' },
    ],
    proof: 'Le décideur ressent une capacité opérationnelle immédiate, sans devoir tout expliquer au téléphone.',
    testimonial: {
      text: 'L’expérience est sobre, très premium et donne confiance pour une mission sensible.',
      author: 'Responsable sûreté privée',
    },
  },
];

export function getPremiumLandingBySlug(slug: string): PremiumLanding | undefined {
  return premiumLandings.find((landing) => landing.slug === slug);
}
