# Premium Landings — 10 Propositions Client

10 landing pages premium (~10 000 € chacune) avec UX interactive, animations 3D (Three.js) et estimateurs en temps réel.

## Sites inclus

| # | Site | Secteur | Outil interactif |
|---|------|---------|------------------|
| 1 | **Éclat Aesthetic** | Chirurgie esthétique | Estimateur consultation + slider avant/après |
| 2 | **Maison Lumière** | Immobilier de luxe | Sélecteur de biens + simulateur financement |
| 3 | **Azure Thrill** | Jet ski Dubai | Flotte + booking + calculateur tarif |
| 4 | **Pristine Yachts** | Nettoyage yacht | Configurateur service + devis instantané |
| 5 | **Velours Auto** | Location véhicules premium | Carousel 3D + estimateur location |
| 6 | **Horizon Charter** | Yacht charter | Configurateur charter + itinéraire |
| 7 | **Sanctum Spa** | Wellness & longévité | Builder programme soins |
| 8 | **Aether Aviation** | Aviation privée | Configurateur vol + devis |
| 9 | **Atelier Nocturne** | Haute joaillerie | Configurateur bague 3D |
| 10 | **Le Grand Palais Events** | Événements d'exception | Builder package événement |

## Stack

- React 19 + TypeScript + Vite
- Three.js / React Three Fiber — scènes 3D par secteur
- Framer Motion — animations scroll et micro-interactions
- Estimateurs temps réel sur chaque site

## Lancer en local

```bash
cd premium-landings && npm install && npm run dev
```

## Build production

```bash
npm run build
```

Chaque landing est accessible via `/#/{slug}` (ex: `/#/velours-auto`).
