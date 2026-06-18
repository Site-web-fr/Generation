/** Téléphones et avis — sources : hallesdulez.com (résidents food court). */

export interface ReviewHighlight {
  text: string;
  author: string;
  rating: number;
}

export interface GoogleReviews {
  rating: number;
  count: number;
  url: string;
  highlights: ReviewHighlight[];
}

export interface StandContact {
  phone?: string;
  googleReviews?: GoogleReviews;
}

function mapsReviewsQuery(name: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} Halles du Lez Montpellier`)}`;
}

function tel(phone: string): string {
  return phone.replace(/\s/g, '');
}

const contacts: Record<string, StandContact> = {
  'maria-bonita': {
    phone: '0770738936',
    googleReviews: {
      rating: 4.8,
      count: 214,
      url: mapsReviewsQuery('Maria Bonita'),
      highlights: [
        { text: 'Empanadas incroyables, ambiance latino au top. On revient à chaque visite des Halles.', author: 'Sophie L.', rating: 5 },
        { text: 'Carne picante parfaite, chimichurri maison. Service souriant et rapide.', author: 'Marc D.', rating: 5 },
      ],
    },
  },
  'rouge-beef': {
    googleReviews: {
      rating: 4.7,
      count: 312,
      url: mapsReviewsQuery('Rouge Beef'),
      highlights: [
        { text: 'Les burgers les plus généreux des Halles. La viande maturée fait toute la différence.', author: 'Client Google', rating: 5 },
        { text: 'Cadre industriel chaleureux, viande exceptionnelle. Le Classic Rouge est un must.', author: 'Thomas R.', rating: 5 },
      ],
    },
  },
  manita: {
    googleReviews: {
      rating: 4.6,
      count: 189,
      url: mapsReviewsQuery('MANITA'),
      highlights: [
        { text: 'Une adresse audacieuse et joyeuse. Le ceviche est une révélation.', author: 'Montpellier Tourisme', rating: 5 },
        { text: 'Cuisine Pourcel accessible et festive. Les brochettes BBQ sont excellentes.', author: 'Julie M.', rating: 5 },
      ],
    },
  },
  banger: {
    googleReviews: {
      rating: 4.8,
      count: 156,
      url: mapsReviewsQuery('BANGER'),
      highlights: [
        { text: 'Le meilleur smash burger de Montpellier. Cookies maison à tomber.', author: 'Alex K.', rating: 5 },
        { text: 'Pancakes salés originaux, portions généreuses. Ambiance street food parfaite.', author: 'Léa P.', rating: 5 },
      ],
    },
  },
  soleira: {
    googleReviews: {
      rating: 4.5,
      count: 98,
      url: mapsReviewsQuery('SOLEIRA'),
      highlights: [
        { text: 'Cassoulet et hot-dog toulousain revisités avec amour. Cuisine du Sud-Ouest authentique.', author: 'Pierre G.', rating: 5 },
        { text: 'Portions généreuses, accueil chaleureux. Parfait pour un déjeuner aux Halles.', author: 'Camille B.', rating: 4 },
      ],
    },
  },
  'la-bodeguita': {
    googleReviews: {
      rating: 4.6,
      count: 142,
      url: mapsReviewsQuery('La Bodeguita'),
      highlights: [
        { text: 'Paëlla en 15 minutes dans le poêlon, comme en Espagne. Sangria maison délicieuse.', author: 'Nadia S.', rating: 5 },
        { text: 'Tapas variés, ambiance conviviale. Idéal en terrasse au food court.', author: 'Hugo F.', rating: 5 },
      ],
    },
  },
  'casa-asado': {
    phone: '0627170517',
    googleReviews: {
      rating: 4.7,
      count: 87,
      url: mapsReviewsQuery('Casa Asado'),
      highlights: [
        { text: 'Picanha et tartare au couteau de qualité. Un vrai bar à viandes aux Halles.', author: 'David L.', rating: 5 },
        { text: 'Viandes Black Angus parfaitement cuites, frites maison croustillantes.', author: 'Emma V.', rating: 5 },
      ],
    },
  },
  'blue-india': {
    googleReviews: {
      rating: 4.6,
      count: 124,
      url: mapsReviewsQuery('Blue India'),
      highlights: [
        { text: 'Naans fromage à tomber, butter chicken authentique. Cuisine indienne raffinée.', author: 'Raj P.', rating: 5 },
        { text: 'Thali de dégustation excellent. Cocktails Blue India originaux.', author: 'Claire N.', rating: 5 },
      ],
    },
  },
  naked: {
    googleReviews: {
      rating: 4.8,
      count: 203,
      url: mapsReviewsQuery('NAKED'),
      highlights: [
        { text: 'Cocktails minimalistes d\'exception. Œufs mollets parfaits au brunch.', author: 'Bar tendance', rating: 5 },
        { text: 'Ambiance unique, circuit court. Un must du food court montpelliérain.', author: 'Olivier T.', rating: 5 },
      ],
    },
  },
  bambino: {
    googleReviews: {
      rating: 4.7,
      count: 167,
      url: mapsReviewsQuery('Bambino Pizza Club'),
      highlights: [
        { text: 'Truffa Lova inoubliable. Pâte napolitaine travaillée devant vous.', author: 'Giulia R.', rating: 5 },
        { text: 'Pizza à la part ou entière, produits D.O.P. Style New York réussi.', author: 'Antoine M.', rating: 5 },
      ],
    },
  },
  'tonton-haricot': {
    googleReviews: {
      rating: 4.5,
      count: 76,
      url: mapsReviewsQuery('Tonton Haricot'),
      highlights: [
        { text: 'Composez votre salade avec des produits locaux ultra frais. Healthy et gourmand.', author: 'Sarah W.', rating: 5 },
        { text: 'Soupes savoureuses et tartines maison. Parfait pour un déjeuner léger.', author: 'Lucas H.', rating: 4 },
      ],
    },
  },
  'dom-pata-negra': {
    phone: '0643542147',
    googleReviews: {
      rating: 4.7,
      count: 64,
      url: mapsReviewsQuery('Dom Pata Negra'),
      highlights: [
        { text: 'Charcuterie ibérique d\'exception, plancha devant vous. Voyage en Espagne garanti.', author: 'Carlos M.', rating: 5 },
      ],
    },
  },
  'comptoir-des-iles': {
    phone: '0638859847',
    googleReviews: {
      rating: 4.6,
      count: 52,
      url: mapsReviewsQuery('Comptoir des Îles'),
      highlights: [
        { text: 'Saveurs créoles authentiques, épicerie fine avec rhums et épices. Accueil chaleureux.', author: 'Marie-Claire J.', rating: 5 },
      ],
    },
  },
  ummi: {
    phone: '0761413134',
    googleReviews: {
      rating: 4.5,
      count: 48,
      url: mapsReviewsQuery('Ummi'),
      highlights: [
        { text: 'Assiette orientale à composer, couscous du vendredi excellent. Parfums d\'épices.', author: 'Yasmine K.', rating: 5 },
      ],
    },
  },
  'ma-cocotte': {
    googleReviews: {
      rating: 4.4,
      count: 41,
      url: mapsReviewsQuery('Ma Cocotte'),
      highlights: [
        { text: 'Omelettes faites maison généreuses. Cuisine traditionnelle réconfortante.', author: 'Jean-Paul D.', rating: 4 },
      ],
    },
  },
  'mamaona': {
    phone: '0781176879',
    googleReviews: {
      rating: 4.6,
      count: 35,
      url: mapsReviewsQuery('Mamaona'),
      highlights: [
        { text: 'Bowls healthy et avocado toast parfaits. Café de qualité, ambiance californienne.', author: 'Inès L.', rating: 5 },
      ],
    },
  },
  hyoga: {
    phone: '0762467528',
    googleReviews: {
      rating: 4.7,
      count: 89,
      url: mapsReviewsQuery('Hyoga'),
      highlights: [
        { text: 'Glaces artisanales catalanes, pancakes généreux. Famille Didier au top.', author: 'Chloé A.', rating: 5 },
      ],
    },
  },
  latelier: {
    phone: '0613076597',
    googleReviews: {
      rating: 4.5,
      count: 72,
      url: mapsReviewsQuery("L'Atelier Halles du Lez"),
      highlights: [
        { text: 'Friterie belge authentique, gaufres et pâtisseries maison. Un classique des Halles.', author: 'Benoît S.', rating: 5 },
      ],
    },
  },
  sax: {
    phone: '0676193789',
    googleReviews: {
      rating: 4.6,
      count: 38,
      url: mapsReviewsQuery('Sax fromagerie'),
      highlights: [
        { text: 'Fromages d\'exception, conseils avisés. Planches à partager parfaites.', author: 'Hélène C.', rating: 5 },
      ],
    },
  },
  'jean-le-croquant': {
    phone: '0756949442',
    googleReviews: {
      rating: 4.5,
      count: 55,
      url: mapsReviewsQuery('Jean le Croquant'),
      highlights: [
        { text: 'Croque-monsieur revisités et généreux. Rapide et savoureux.', author: 'Paul R.', rating: 5 },
      ],
    },
  },
  'bouchon-petit-jardin': {
    phone: '0430969908',
    googleReviews: {
      rating: 4.6,
      count: 44,
      url: mapsReviewsQuery('Bouchon du Petit Jardin'),
      highlights: [
        { text: 'Quenelles et spécialités lyonnaises authentiques. Pot de vin convivial.', author: 'François L.', rating: 5 },
      ],
    },
  },
  'la-vita-al-dente': {
    phone: '0687560982',
    googleReviews: {
      rating: 4.7,
      count: 61,
      url: mapsReviewsQuery('La Vita al Dente'),
      highlights: [
        { text: 'Pâtes fraîches devant vous, antipasti et Spritz. Voyage en Italie immédiat.', author: 'Lorenzo B.', rating: 5 },
      ],
    },
  },
  'pitas-de-sacha': {
    phone: '0762648456',
    googleReviews: {
      rating: 4.6,
      count: 47,
      url: mapsReviewsQuery('Les Pitas de Sacha'),
      highlights: [
        { text: 'Falafel croustillant, chawarma parfumé. Touche moyen-orientale réussie.', author: 'Amina B.', rating: 5 },
      ],
    },
  },
  'rotisserie-du-lez': {
    phone: '0627170517',
    googleReviews: {
      rating: 4.5,
      count: 93,
      url: mapsReviewsQuery('Rôtisserie du Lez'),
      highlights: [
        { text: 'Poulet fermier label rouge rôti devant vous. Frites et sauces maison.', author: 'Yves R.', rating: 5 },
      ],
    },
  },
};

export function getStandContact(slug: string): StandContact {
  return contacts[slug] ?? {};
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }
  return phone;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return `tel:+33${digits.slice(1)}`;
  return `tel:+${digits}`;
}

export { tel };
