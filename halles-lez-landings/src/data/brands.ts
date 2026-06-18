/**
 * Source de vérité unique — résidents du food court des Halles du Lez.
 *
 * RÈGLE ABSOLUE : zéro contenu inventé.
 * - Identité, stand, entrée, téléphone, réseaux → hallesdulez.com (officiel).
 * - Descriptions & spécialités → marchedulez.com / hallesdulez.com / sites officiels
 *   (paraphrase fidèle de texte réel, sources notées par stand).
 * - Aucun prix, aucun avis client, aucune photo de plat inventés.
 * - Les liens Uber Eats ne figurent QUE s'ils ont été vérifiés.
 */
import { paletteForSlug } from './palettes';
import { fontsForSlug } from './typography';

export type Category = 'boire' | 'manger' | 'epicerie';

export interface Brand {
  slug: string;
  name: string;
  /** Type de cuisine officiel (Halles du Lez). */
  type: string;
  category: Category;
  /** Numéro de stand officiel. */
  stand: string;
  /** Entrée la plus proche (Nord / Sud / Est / Ouest). */
  entrance: string;
  /** Description réelle, paraphrasée de sources publiques. */
  description: string;
  /** Spécialités réelles citées par les sources (sans prix inventés). */
  specialties: string[];
  /** Horaires réels — seulement quand vérifiés et propres au stand. */
  hours?: string;

  /** Contacts vérifiés (officiels). */
  phone?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  /** Uniquement si la boutique Uber Eats a été confirmée. */
  uberEats?: string;

  /** Design (charte par type de cuisine). */
  colors: {
    bg: string;
    bgAlt: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
    cta: string;
    ctaText: string;
  };
  fonts: {
    heading: string;
    body: string;
    headingSpacing?: string;
    headingTransform?: 'uppercase' | 'none';
  };
  heroPattern: string;
  heroGlow: string;

  /** Dérivés. */
  address: string;
  googleMaps: string;
  /** Recherche Google honnête (pas d'avis fabriqués). */
  googleReviewsUrl: string;
}

interface Resident {
  slug: string;
  name: string;
  type: string;
  category: Category;
  stand: string;
  entrance: string;
  description: string;
  specialties: string[];
  hours?: string;
  phone?: string;
  ig?: string;
  fb?: string;
  web?: string;
  uberEats?: string;
}

const ADDRESS = '1348 Avenue Raymond Dugrand, Halles du Lez — 34000 Montpellier';
const MAPS =
  'https://www.google.com/maps/search/?api=1&query=Halles+du+Lez+1348+Avenue+Raymond+Dugrand+Montpellier';

/**
 * 36 résidents officiels du food court (hallesdulez.com).
 * Descriptions/spécialités : recherche sourcée (marchedulez.com sauf mention).
 */
const RESIDENTS: Resident[] = [
  {
    slug: 'aux-copains-dabord',
    name: "Aux Copains d'Abord",
    type: 'Bagels & dwichs · Coffee shop',
    category: 'manger',
    stand: '12A',
    entrance: 'Entrée Nord',
    description:
      "Foodtruck coffee shop tenu par Ismaël, diplômé barista de l'école Musetti à Milan, avec une carte gourmande de cafés et de street food.",
    specialties: ['Cafés (expresso, frappuccino)', 'Milkshakes & smoothies', 'Bagels & sandwiches', 'Salades garnies', 'Petit déjeuner'],
    hours: 'Mar–Dim · 8h–22h en continu',
    ig: 'aux_copains_dabord',
  },
  {
    slug: 'kochi',
    name: 'Kochi',
    type: 'Sushi · Hand roll · Sando · Onigiri',
    category: 'manger',
    stand: '12B',
    entrance: 'Entrée Nord',
    description:
      "Sushis singuliers axés goût et durabilité : handrolls, sandos et onigiris réinventés à partir de thon de Méditerranée, truite d'Ardèche et riz de Camargue.",
    specialties: ['Sushis', 'Handrolls', 'Sandos', 'Onigiris', 'Produits locaux & durables'],
    fb: 'kochi.montpellier',
  },
  {
    slug: 'la-vita-al-dente',
    name: 'La Vita al Dente',
    type: 'Épicerie & pâtes fraîches italiennes',
    category: 'manger',
    stand: 'A & 17',
    entrance: 'Entrée Sud',
    description:
      "Cuisine et épicerie italienne fondée par Lorenzo : pâtes fraîches maison selon les traditions italiennes, produits sélectionnés et antipasti, au comptoir ou en terrasse.",
    specialties: ['Pâtes fraîches maison', 'Sauces maison', 'Antipasti', 'Épicerie italienne', 'Spritz'],
    phone: '0687560982',
    ig: 'lavitaaldente',
  },
  {
    slug: 'bar-des-halles',
    name: 'Bar des Halles',
    type: 'Bar guinguette',
    category: 'boire',
    stand: 'B',
    entrance: 'Entrée Ouest',
    description:
      "Bar généraliste et guinguette tenu en famille par Laye (ex-gérant du Palm Ray) et Céline. Le point de rendez-vous central des Halles, autour d'un comptoir en zinc.",
    specialties: ['Café', 'Bière pression', 'Rosé en pichets', 'Mojitos', 'Jus & sodas'],
    phone: '0662500963',
    ig: 'lebardeshalles_hallesdulez',
  },
  {
    slug: 'bar-a-lez',
    name: 'Bar à Lez',
    type: "Bar à vins & produits de l'Aveyron",
    category: 'boire',
    stand: 'C',
    entrance: 'Entrée Ouest',
    description:
      "Comptoir du chef Pierre-Olivier Prouhèze et de la famille Romagnoli (Caves Notre Dame) : grands crus et cépages locaux, accompagnés de charcuteries lozériennes et aveyronnaises.",
    specialties: ['Vins (grands crus & cépages locaux)', 'Charcuteries de Lozère & Aveyron', 'Pâtés', 'Terrines fermières', 'Planches à partager'],
    fb: 'baralez',
  },
  {
    slug: 'la-bodeguita',
    name: 'La Bodeguita',
    type: 'Paëllas & tapas espagnoles',
    category: 'manger',
    stand: 'D',
    entrance: 'Entrée Nord',
    description:
      "Au cœur des Halles (stand D), La Bodeguita a succédé à Txoko : un espace de dégustation dédié à la cuisine traditionnelle espagnole travaillée aux codes de la street food.",
    specialties: ['Paëlla en poêlon individuel', 'Paëlla royale', 'Paëlla végétale', 'Paëlla fruits de mer', 'Tapas & sangria maison'],
    ig: 'labodeguita_hallesdulez',
  },
  {
    slug: 'soleira',
    name: 'Soleira',
    type: 'Cuisine du Sud-Ouest',
    category: 'manger',
    stand: '9',
    entrance: 'Entrée Nord',
    description:
      "Cuisine ensoleillée du Sud-Ouest revisitée en street food par Bérengère et Guillaume, ex-chef et sommelière également vignerons : classiques régionaux et plats généreux.",
    specialties: ['Tapas', 'Wraps frais', 'Hot dogs', 'Cassoulet de Toulouse', 'Magret de canard', 'Vins du domaine'],
    hours: 'Mar–Dim · 12h–14h & 19h–22h',
    ig: 'soleira.montpellier',
  },
  {
    slug: 'comptoir-alaryk',
    name: 'Le Comptoir Alaryk',
    type: 'Bar à bières artisanales',
    category: 'boire',
    stand: 'F',
    entrance: 'Entrée Est',
    description:
      'La brasserie artisanale Alaryk, lancée à Béziers en 2016, pose ses fûts au cœur du food court et propose ses bières biologiques à la pression.',
    specialties: ['Bières artisanales bio à la pression', 'Blonde', 'Blanche', 'Ambrée', 'IPA', 'Brune'],
    web: 'alaryk.fr',
  },
  {
    slug: 'naked',
    name: 'NAKED',
    type: 'Bar à cocktails & œufs',
    category: 'boire',
    stand: 'G',
    entrance: 'Entrée Est',
    description:
      "Lieu de vie au croisement de l'art et de l'artisanat : drinks élaborés et plats déclinant l'œuf sous toutes ses formes. Esprit fait maison, circuit court, zéro déchet.",
    specialties: ['Cocktails & drinks élaborés', "Plats à base d'œuf", 'Circuit court', 'Zéro déchet'],
    ig: 'nakedmtp',
  },
  {
    slug: 'blue-india',
    name: 'Blue India',
    type: 'Cuisine indienne',
    category: 'manger',
    stand: '16B',
    entrance: 'Entrée Sud',
    description:
      "Cuisine indienne du fondateur d'origine indo-mauricienne : recettes familiales et traditionnelles, épices maison, du sud au nord de l'Inde, en version équilibrée.",
    specialties: ['Cheese naan & garlic naan', 'Tandoori', 'Tikka massala', 'Butter chicken', 'Thali & plats ayurvédiques'],
    hours: 'Mar–Sam · 12h–14h30 & 19h–23h30 · Dim 12h–15h30',
    fb: 'blueindia_mtp',
  },
  {
    slug: 'manita',
    name: 'MANITA',
    type: 'Saveurs entre Suds',
    category: 'manger',
    stand: '1',
    entrance: 'Entrée Ouest',
    description:
      "Par les frères Jacques et Laurent Pourcel : une cuisine des Suds, du sud de la Camargue à l'Amérique latine. Simple et authentique, fraîche et inspirée.",
    specialties: ['Ceviche', 'BBQ', 'Brochettes', 'Cuisine de Camargue', "Cuisine d'Amérique latine"],
    ig: 'manita_hallesdulez',
  },
  {
    slug: 'chicken-shake',
    name: 'Chicken & Shake',
    type: 'Poulet frit & milkshakes',
    category: 'manger',
    stand: '2A',
    entrance: 'Entrée Ouest',
    description:
      'Concept venu des USA : poulet frit à l’américaine ultra croustillant en tenders, wings ou sandwiches, avec frites, sauces maison et milkshakes épais.',
    specialties: ['Tenders de poulet frit', 'Wings', 'Sandwiches poulet frit', 'Frites', 'Milkshakes'],
  },
  {
    slug: 'dom-pata-negra',
    name: 'Dom Pata Negra',
    type: 'Jambons ibériques & tapas',
    category: 'manger',
    stand: '4B',
    entrance: 'Entrée Ouest',
    description:
      "Spécialités ibériques : produits de qualité supérieure issus des meilleurs producteurs espagnols, importés directement d'Espagne, cochon noir ibérique cuit à la plancha.",
    specialties: ['Tapas espagnoles', 'Planches de charcuterie', 'Cochon noir ibérique de bellota', 'Jambons ibériques'],
    phone: '0643542147',
    fb: 'dompatanegrahallesdulez',
  },
  {
    slug: 'comptoir-des-iles',
    name: 'Le Comptoir des Îles',
    type: 'Maurice · Madagascar · Réunion',
    category: 'manger',
    stand: '5B',
    entrance: 'Entrée Ouest',
    description:
      "Restaurant et épicerie fine : cuisine authentique de Maurice, La Réunion, Madagascar et des Antilles, pour végétariens comme amateurs de viande.",
    specialties: ['Rougail saucisses', 'Curry poulet massala', 'Accras de morue', 'Bœuf massalé', 'Rhums arrangés'],
    hours: 'Mar–Sam · 12h–14h30 & 19h–23h · Dim 12h–15h · Lun fermé',
    phone: '0638859847',
    fb: 'LeComptoirDesIles',
  },
  {
    slug: 'tonton-haricot',
    name: 'Tonton Haricot',
    type: 'Bar à salades',
    category: 'manger',
    stand: '3A',
    entrance: 'Entrée Ouest',
    description:
      "Bar à salades à composer (3, 5 ou 7 ingrédients) ou créations du jour. Produits frais de saison, producteurs locaux, circuits courts et fait maison.",
    specialties: ['Salades composables (3, 5 ou 7 ingrédients)', 'Créations du jour', 'Tartines maison', 'Soupes'],
    ig: 'tontonharicot',
  },
  {
    slug: 'bambino',
    name: 'Bambino',
    type: 'Pizza Club',
    category: 'manger',
    stand: '3B',
    entrance: 'Entrée Ouest',
    description:
      "Pizza Club d'inspiration industrielle et new-yorkaise. Le pizzaiolo (25 ans d'expérience) prépare les pizzas devant vous, produits italiens DOP et pâte napolitaine.",
    specialties: ['Pizzas napolitaines', 'Pizza entière ou à la part', 'Truffa Lova (signature truffe)', 'Produits DOP'],
    ig: 'bambinopizzaclub',
    uberEats: 'https://www.ubereats.com/fr/store/bambino-pizza-club/TGX7c4zJUlqjSitY2F5nDQ',
  },
  {
    slug: 'ma-cocotte',
    name: 'Ma Cocotte',
    type: 'Cuisine traditionnelle',
    category: 'manger',
    stand: '4A',
    entrance: 'Entrée Ouest',
    description:
      "À l'entrée des Halles, Ma Cocotte propose de savoureux plats dont l'œuf est le roi. Entièrement faits maison, ils reflètent une cuisine traditionnelle et gourmande.",
    specialties: ['Omelettes', "Plats à base d'œuf", 'Cuisine traditionnelle', 'Fait maison'],
    ig: 'ma_cocotte_hdl',
  },
  {
    slug: 'mamaona',
    name: 'Mamaona',
    type: 'Healthy food · Café californien',
    category: 'manger',
    stand: '5A',
    entrance: 'Entrée Ouest',
    description:
      "Café californien healthy fondé par Mona : cuisine inspirée des tendances californiennes et australiennes, avec des recettes vegan, sans gluten et sans lactose.",
    specialties: ['Lunch bowls', 'Avocado toast', 'Grilled cheese', 'Açaï bowl', 'Pâtisseries (carrot cake, banana bread)'],
    phone: '0781176879',
    ig: 'mamaonacafe',
  },
  {
    slug: 'oh-my-goz',
    name: 'Oh My Göz',
    type: 'Turkish street food',
    category: 'manger',
    stand: '6A',
    entrance: 'Entrée Nord',
    description:
      "Street food turque : le gözleme, recette traditionnelle transmise de génération en génération, en version salée ou sucrée, par Noémie et Burak.",
    specialties: ['Gözleme salé', 'Gözleme sucré', 'Street food turque'],
    fb: 'ohmygoz_hallesdulez',
  },
  {
    slug: 'hyoga',
    name: 'Hyoga Glacier Catalan',
    type: 'Glaces · Pancakes · Milkshakes',
    category: 'manger',
    stand: '6B',
    entrance: 'Entrée Nord',
    description:
      'Glacier familial catalan fondé en 1977, aujourd’hui tenu par la 3e génération (Sarah Etienne). Concept de « glace truck » : glaces et pancakes maison.',
    specialties: ['Glaces artisanales', 'Pancakes', 'Milkshakes'],
    phone: '0762467528',
    fb: 'hyogabycatalan',
  },
  {
    slug: 'latelier',
    name: "L'Atelier",
    type: 'Friterie belge & pâtisserie',
    category: 'manger',
    stand: '7A & 7B',
    entrance: 'Entrée Nord',
    description:
      'Friterie belge proposant différentes spécialités belges avec des produits frais, dont des frites fraîches venues directement de Belgique.',
    specialties: ['Frites fraîches', 'Plats garnis', 'Croquettes', 'Sauces maison', 'Bières belges'],
    hours: 'Mar–Sam · 11h30–15h & 18h30–23h · Dim 11h30–16h & 18h30–22h · Lun fermé',
    phone: '0613076597',
    fb: 'latelierhallesdulez',
  },
  {
    slug: 'sax',
    name: 'Sax',
    type: 'Spécialités fromagères',
    category: 'manger',
    stand: '8A',
    entrance: 'Entrée Nord',
    description:
      'Cuisine au fromage orchestrée par Sam & Max : des tapas du fromager aux plats traditionnels et à la planche à partager, au comptoir en bois, en circuit court.',
    specialties: ['Tapas du fromager', 'Plats traditionnels', 'Planche de fromage à partager', 'Surprises du chef'],
    phone: '0676193789',
    ig: 'sax.specialitesfromageres',
  },
  {
    slug: 'jean-le-croquant',
    name: 'Jean le Croquant',
    type: 'Croque-monsieur',
    category: 'manger',
    stand: '8B',
    entrance: 'Entrée Nord',
    description:
      'Carte de croque-monsieur élaborée par la cheffe Camille Dreulle : recettes originales préparées sur place avec des produits frais et locaux.',
    specialties: ['Croque jambon supérieur & truffe', 'Croque canard confit', 'Croque tome de Savoie'],
    phone: '0756949442',
    web: 'jeanlecroquant.fr',
    uberEats: 'https://www.ubereats.com/fr/store/jean-le-croquant-halles-du-lez/sU14JZthQciMZY08mGsIRA',
  },
  {
    slug: 'opa',
    name: 'OPA',
    type: 'Greek food spot',
    category: 'manger',
    stand: '10A',
    entrance: 'Entrée Nord',
    description:
      'Cuisine grecque aux Halles du Lez : gyros, sandwichs, salades fraîches et spécialités méditerranéennes, dans une ambiance festive et généreuse.',
    specialties: ['Gyros', 'Sandwichs grecs', 'Salades fraîches', 'Spécialités méditerranéennes'],
    ig: 'weareopa',
  },
  {
    slug: 'bonobo',
    name: 'Bonobo',
    type: 'Brunch · Cuisine australienne',
    category: 'manger',
    stand: '10B',
    entrance: 'Entrée Nord',
    description:
      "Le brunch montpelliérain installé aux Halles du Lez : brunch quotidien — pancakes, planches à partager et bowls, dans une ambiance anglo-saxonne.",
    specialties: ['Pancakes', 'Eggs Benedict', 'Planches à partager', 'Bowls', 'Café de spécialité'],
    web: 'bonobo-brunch.com',
  },
  {
    slug: 'bouchon-petit-jardin',
    name: 'Le Bouchon du Petit Jardin',
    type: 'Spécialités lyonnaises',
    category: 'manger',
    stand: '11A',
    entrance: 'Entrée Nord',
    description:
      'Hommage authentique aux bouchons lyonnais : cuisine traditionnelle de Lyon dans une ambiance chaleureuse, au cœur des Halles du Lez.',
    specialties: ['Quenelles', 'Andouillettes', 'Cuisses de grenouille', 'Charcuterie lyonnaise'],
    hours: 'Mar–Sam · 12h–14h30 & 19h–22h30 · Dim 11h30–15h',
    phone: '0430969908',
    ig: 'bouchondupetitjardin',
    web: 'petit-jardin.com',
  },
  {
    slug: 'maria-bonita',
    name: 'Maria Bonita',
    type: 'Empanadas argentines',
    category: 'manger',
    stand: '11B',
    entrance: 'Entrée Nord',
    description:
      "Troisième adresse du groupe Maria Social Club, dédiée à la cuisine populaire argentine, avec une ambiance et une équipe 100 % latino.",
    specialties: ['Empanadas carne picante', 'Empanadas végétariennes', 'Sauce chimichurri', 'Maté argentin', 'Bières'],
    phone: '0770738936',
    fb: 'mariabonitamontpellier',
  },
  {
    slug: 'tok-tok-wok',
    name: 'Tok Tok Wok',
    type: 'Wok · Gua Bao · Vapeurs',
    category: 'manger',
    stand: '13A',
    entrance: 'Entrée Est',
    description:
      'Woks à composer, minis Gua Baos fourrés, bouchées vapeur et Ha Cao. Tok Tok Wok officie désormais aux Halles du Lez (en lieu et place des Sardines).',
    specialties: ['Woks à composer', 'Gua Baos fourrés', 'Bouchées vapeur', 'Ha Cao'],
    ig: 'toktokwok_hallesdulez',
  },
  {
    slug: 'clara-jung',
    name: 'Clara Jung',
    type: 'Pâtisseries créatives',
    category: 'manger',
    stand: '13B',
    entrance: 'Entrée Est',
    description:
      "Spécialiste montpelliéraine des gâteaux de mariage et ancienne chef pâtissière en gastronomie, Clara Jung revisite avec créativité les pâtisseries françaises et étrangères.",
    specialties: ['Kannelbullar', 'Financiers', 'Cookie shot', 'Shortbread millionaires', 'Chocolats chauds & latte'],
    web: 'clarajung.fr',
  },
  {
    slug: 'banger',
    name: 'BANGER',
    type: 'Smash burgers · Pancakes · Cookies',
    category: 'manger',
    stand: '14A',
    entrance: 'Entrée Est',
    description:
      'Le smash burger a son adresse : bun brioché, steak, american cheddar, pickles et sauce cocktail maison, en formules L et XL. Aussi pancakes maison et cookies.',
    specialties: ['Smash burger', 'Formules L & XL (2 ou 3 steaks)', 'Pancakes salés ou sucrés', 'Cookies'],
    ig: 'smashbanger_co',
  },
  {
    slug: 'cherry',
    name: 'Cherry',
    type: 'Crêpes & gaufres',
    category: 'manger',
    stand: '14B',
    entrance: 'Entrée Est',
    description:
      'La crêpe bretonne en version ludique et moderne : crêpes salées et sucrées à composer, cookies moelleux et petites douceurs pour le goûter ou sur le pouce.',
    specialties: ['Crêpes salées', 'Crêpes sucrées', 'Cookies moelleux', 'Petites douceurs'],
  },
  {
    slug: 'rouge-beef',
    name: 'Rouge Beef',
    type: 'Burgers & viandes maturées',
    category: 'manger',
    stand: '15A',
    entrance: 'Entrée Est',
    description:
      'Cadre contemporain mêlant style industriel et matières naturelles : burgers de viandes du Massif Central, viandes maturées, tartes salées et sucrées de saison.',
    specialties: ['Burgers viandes du Massif Central', 'Viandes de bœuf maturées', 'Tartes salées & sucrées', "Bières & vins d'exception"],
    phone: '0666918911',
    ig: 'rouge_beef',
    fb: 'rougebeefhallesdulez',
    uberEats: 'https://www.ubereats.com/fr/store/rouge-beef-halles-du-lez/6fq7pl3QVw-2hHdMN4ST_g',
  },
  {
    slug: 'ummi',
    name: 'Ummi',
    type: 'Saveurs orientales',
    category: 'manger',
    stand: '16A',
    entrance: 'Entrée Sud',
    description:
      'Saveurs orientales : viandes marinées servies avec patatas au safran, légumes grillés ou en döner, en galette ou msemen. Pâtisseries orientales et couscous le vendredi.',
    specialties: ['Pastilla poulet amandes', 'Chich taouk', 'Brochettes & merguez', 'Salade marocaine', 'Couscous du vendredi'],
    phone: '0761413134',
    ig: 'ummi.hallesdulez',
    uberEats: 'https://www.ubereats.com/fr-en/store/ummi/0OaJV5wvUAOwkEgijl19_g',
  },
  {
    slug: 'pitas-de-sacha',
    name: 'Les Pitas de Sacha',
    type: 'Falafel & chawarma',
    category: 'manger',
    stand: '18A',
    entrance: 'Entrée Sud',
    description:
      "Touche moyen-orientale fraîche et épicée : sandwich falafel ou chawarma en pain pita, aussi en assiette, relevé de cumin, coriandre, ail et menthe, en version veggie ou carnée.",
    specialties: ['Sandwich falafel pita', 'Sandwich chawarma pita', 'Versions en assiette', 'Option végétarienne'],
    phone: '0762648456',
    ig: 'lespitasdesacha_hallesdulez',
  },
  {
    slug: 'rotisserie-du-lez',
    name: 'La Rôtisserie du Lez',
    type: 'Rôtisserie',
    category: 'manger',
    stand: '18B',
    entrance: 'Entrée Sud',
    description:
      'Rôtisserie tenue par Yves, qui prépare ses plats rôtis devant vous. La star : le poulet fermier label rouge (entier, ½ ou ¼), midi et soir du mardi au dimanche.',
    specialties: ['Poulet fermier label rouge', 'Magret de canard', 'Joue de porc', 'Frites', 'Sauce maison'],
    ig: 'larotisseriedulez',
  },
  {
    slug: 'casa-asado',
    name: 'Casa Asado',
    type: 'Bar à viandes · Grill argentin',
    category: 'manger',
    stand: 'E',
    entrance: 'Entrée Nord',
    description:
      "Bar à viandes en hommage aux barbecues argentins : côtes de taureau ou bœuf Black Angus, tartare charolais au couteau, picanha, avec frites maison et salade fraîche.",
    specialties: ['Côte de taureau', 'Bœuf Black Angus', 'Tartare charolais au couteau', 'Picanha', 'Frites maison'],
    phone: '0627170517',
    ig: 'casa.asado',
  },
];

function igUrl(handle?: string): string | undefined {
  return handle ? `https://instagram.com/${handle}` : undefined;
}
function fbUrl(handle?: string): string | undefined {
  return handle ? `https://facebook.com/${handle}` : undefined;
}
function webUrl(domain?: string): string | undefined {
  if (!domain) return undefined;
  return domain.startsWith('http') ? domain : `https://${domain}`;
}
function reviewsUrl(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name} Halles du Lez Montpellier`,
  )}`;
}

function buildBrand(r: Resident): Brand {
  const palette = paletteForSlug(r.slug, r.category);
  const fonts = fontsForSlug(r.slug, r.category);
  return {
    slug: r.slug,
    name: r.name,
    type: r.type,
    category: r.category,
    stand: r.stand,
    entrance: r.entrance,
    description: r.description,
    specialties: r.specialties,
    hours: r.hours,
    phone: r.phone,
    instagram: igUrl(r.ig),
    facebook: fbUrl(r.fb),
    website: webUrl(r.web),
    uberEats: r.uberEats,
    colors: {
      bg: palette.bg,
      bgAlt: palette.bgAlt,
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      text: palette.text,
      muted: palette.muted,
      cta: palette.cta,
      ctaText: palette.ctaText,
    },
    fonts: {
      heading: fonts.heading,
      body: fonts.body,
      headingSpacing: fonts.headingSpacing,
      headingTransform: fonts.headingTransform,
    },
    heroPattern: palette.heroPattern,
    heroGlow: palette.heroGlow,
    address: ADDRESS,
    googleMaps: MAPS,
    googleReviewsUrl: reviewsUrl(r.name),
  };
}

export const brands: Brand[] = RESIDENTS.map(buildBrand);

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/** Premier lien externe « voir la carte » réellement disponible. */
export function menuLink(brand: Brand): { href: string; label: string } | undefined {
  if (brand.uberEats) return { href: brand.uberEats, label: 'Voir la carte sur Uber Eats' };
  if (brand.website) return { href: brand.website, label: 'Voir le site officiel' };
  if (brand.instagram) return { href: brand.instagram, label: 'Voir la carte sur Instagram' };
  if (brand.facebook) return { href: brand.facebook, label: 'Voir la carte sur Facebook' };
  return undefined;
}
