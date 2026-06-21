# ATELIER — Suite de Landing Pages Premium

Cinq univers de marque haut de gamme, pensés comme des démonstrations
commerciales « wow » : 3D temps réel, interactions cinématiques et
configurateurs qui permettent au visiteur de tout faire seul, sans appeler.

| Univers | Route | Pièce maîtresse interactive |
| --- | --- | --- |
| **MAISON LUMIÈRE** — chirurgie & médecine esthétique | `/clinique` | Diagnostic interactif + comparateur avant/après |
| **ATELIER FONCIER** — immobilier de prestige | `/prestige` | Galerie 3D + estimateur de valorisation privé |
| **AZURE RIDE** — location de jet ski à Dubaï | `/jetski` | Configurateur de session + tarif en direct (AED) |
| **SILLAGE** — detailing & entretien de yachts | `/yacht` | Devis interactif au mètre + niveaux de prestation |
| **OCTANE ATELIER** — location de véhicules d’exception | `/automobile` | **Configurateur de voiture 3D** + estimateur de tarif |

Un **hub** (`/`) présente les cinq univers avec une scène 3D générative.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Three.js** via **@react-three/fiber** + **@react-three/drei** (scènes 3D
  procédurales — aucun asset lourd externe requis)
- **Framer Motion** (révélations au scroll, transitions, headlines animées)
- **React Router** (navigation + code-splitting par route : Three.js n’est
  chargé que sur les pages qui l’utilisent)

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (type-check + bundle)
npm run preview  # prévisualiser le build
npm run lint     # ESLint
```

## Points forts d’expérience

- **Intro cinématique** (compteur + disciplines) au premier chargement.
- **Curseur personnalisé** réactif (magnétisme, libellés contextuels).
- **Palette par marque** : chaque univers a son accent, propagé via variables CSS.
- **Scènes 3D dédiées** : orbe morphique (esthétique), tour architecturale
  (immobilier), océan animé par shader (jet ski / yacht), voiture configurable
  pilotée à l’orbite (automobile), champ de particules génératif (hub).
- **Configurateurs/estimateurs** : le visiteur compose son produit et obtient
  un prix instantané — puis réserve ou appelle. Aucune friction.
- **Accessibilité** : respect de `prefers-reduced-motion`, curseur natif sur
  écrans tactiles, contenus lisibles.

## Personnalisation

Toutes les marques sont décrites dans [`src/theme/brands.ts`](src/theme/brands.ts)
(nom, accent, accroche, localisation). Modifier ce fichier suffit à reskinner
les héros et la navigation. Les tarifs et données des configurateurs sont en
tête de chaque page dans `src/pages/`.

> Démonstration commerciale. Les contenus (prix, témoignages, statistiques)
> sont illustratifs et à remplacer par les données réelles du client.
