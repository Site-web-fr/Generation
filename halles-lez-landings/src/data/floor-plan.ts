/** Plan axonométrique officiel Halles du Lez — positions calibrées sur halles-axio.jpg (1587×964). */
export type Entrance = 'nord' | 'est' | 'sud' | 'ouest';

export interface StandCoord {
  id: string;
  x: number;
  y: number;
  entrance: Entrance;
}

export const PLAN_IMAGE = '/plans/halles-axio.jpg';
export const PLAN_ASPECT = 1587 / 964;

export const ENTRANCE_LABELS: Record<Entrance, string> = {
  nord: 'Entrée Nord',
  est: 'Entrée Est',
  sud: 'Entrée Sud',
  ouest: 'Entrée Ouest',
};

const COORDS: Record<string, StandCoord> = {
  '1': { id: '1', x: 28.5, y: 56.5, entrance: 'ouest' },
  '2A': { id: '2A', x: 27.5, y: 50.5, entrance: 'ouest' },
  '3A': { id: '3A', x: 32.5, y: 61.5, entrance: 'ouest' },
  '3B': { id: '3B', x: 36.0, y: 63.0, entrance: 'ouest' },
  '4A': { id: '4A', x: 41.0, y: 65.5, entrance: 'sud' },
  '4B': { id: '4B', x: 46.5, y: 66.5, entrance: 'sud' },
  '5A': { id: '5A', x: 37.5, y: 55.5, entrance: 'ouest' },
  '5B': { id: '5B', x: 42.0, y: 56.0, entrance: 'ouest' },
  '6A': { id: '6A', x: 47.0, y: 56.0, entrance: 'sud' },
  '6B': { id: '6B', x: 52.0, y: 55.5, entrance: 'sud' },
  '7A': { id: '7A', x: 57.0, y: 55.5, entrance: 'est' },
  '7B': { id: '7B', x: 60.0, y: 53.0, entrance: 'est' },
  '8A': { id: '8A', x: 64.0, y: 53.0, entrance: 'est' },
  '8B': { id: '8B', x: 67.0, y: 50.5, entrance: 'est' },
  '9': { id: '9', x: 71.0, y: 38.0, entrance: 'nord' },
  '10A': { id: '10A', x: 69.5, y: 45.0, entrance: 'est' },
  '10B': { id: '10B', x: 69.5, y: 42.0, entrance: 'est' },
  '11A': { id: '11A', x: 67.0, y: 40.0, entrance: 'nord' },
  '11B': { id: '11B', x: 64.0, y: 38.0, entrance: 'nord' },
  '12A': { id: '12A', x: 45.0, y: 31.5, entrance: 'nord' },
  '12B': { id: '12B', x: 52.0, y: 31.5, entrance: 'nord' },
  '13A': { id: '13A', x: 56.5, y: 33.5, entrance: 'nord' },
  '13B': { id: '13B', x: 60.0, y: 32.5, entrance: 'nord' },
  '14A': { id: '14A', x: 63.0, y: 31.0, entrance: 'nord' },
  '14B': { id: '14B', x: 58.5, y: 31.0, entrance: 'nord' },
  '15A': { id: '15A', x: 72.5, y: 36.5, entrance: 'est' },
  '16A': { id: '16A', x: 75.5, y: 42.5, entrance: 'est' },
  '16B': { id: '16B', x: 75.5, y: 47.5, entrance: 'est' },
  '17': { id: '17', x: 50.5, y: 39.5, entrance: 'sud' },
  '18A': { id: '18A', x: 75.0, y: 54.5, entrance: 'est' },
  '18B': { id: '18B', x: 75.0, y: 59.5, entrance: 'est' },
  A: { id: 'A', x: 48.5, y: 46.5, entrance: 'sud' },
  B: { id: 'B', x: 52.5, y: 44.5, entrance: 'nord' },
  C: { id: 'C', x: 46.5, y: 42.5, entrance: 'nord' },
  D: { id: 'D', x: 50.5, y: 48.5, entrance: 'sud' },
  E: { id: 'E', x: 54.5, y: 46.5, entrance: 'est' },
  F: { id: 'F', x: 44.5, y: 48.5, entrance: 'ouest' },
  G: { id: 'G', x: 48.5, y: 50.5, entrance: 'sud' },
};

/** Slug → identifiant(s) sur le plan officiel. */
const SLUG_STANDS: Record<string, string[]> = {
  'aux-copains-dabord': ['12A'],
  kochi: ['12B'],
  'la-vita-al-dente': ['A', '17'],
  'bar-des-halles': ['B'],
  'bar-a-lez': ['C'],
  'la-bodeguita': ['D'],
  soleira: ['9'],
  lepicurieuse: ['9'],
  'comptoir-alaryk': ['F'],
  naked: ['G'],
  'blue-india': ['16B'],
  manita: ['1'],
  'chicken-shake': ['2A'],
  'dom-pata-negra': ['4B'],
  'comptoir-des-iles': ['5B'],
  bonobo: ['10B'],
  ummi: ['16A'],
  'casa-asado': ['E'],
  'tonton-haricot': ['3A'],
  bambino: ['3B'],
  'ma-cocotte': ['4A'],
  mamaona: ['5A'],
  'oh-my-goz': ['6A'],
  hyoga: ['6B'],
  latelier: ['7A', '7B'],
  sax: ['8A'],
  'jean-le-croquant': ['8B'],
  opa: ['10A'],
  'bouchon-petit-jardin': ['11A'],
  'maria-bonita': ['11B'],
  'tok-tok-wok': ['13A'],
  'clara-jung': ['13B'],
  banger: ['14A'],
  cherry: ['14B'],
  'rouge-beef': ['15A'],
  'pitas-de-sacha': ['18A'],
  'rotisserie-du-lez': ['18B'],
};

export function standPositionsForSlug(slug: string): StandCoord[] {
  const ids = SLUG_STANDS[slug];
  if (!ids) return [];
  return ids.map((id) => COORDS[id]).filter(Boolean);
}

export function primaryEntrance(slug: string): Entrance | undefined {
  const positions = standPositionsForSlug(slug);
  return positions[0]?.entrance;
}
