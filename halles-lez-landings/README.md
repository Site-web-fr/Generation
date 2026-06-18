# Halles du Lez — Propositions Landing Pages

10 landing pages de démonstration pour la prospection commerciale des commerces des **Halles du Lez** (Montpellier).

## Voir sur mobile (GitHub Pages)

Une fois déployé, le site est accessible depuis **n'importe quel téléphone** via une URL publique :

**Hub (toutes les démos)**  
`https://site-web-fr.github.io/Generation/`

**Lien direct par commerce** (à envoyer en prospection) :

| Commerce | URL |
|----------|-----|
| Rouge Beef | `https://site-web-fr.github.io/Generation/#/rouge-beef` |
| MANITA | `https://site-web-fr.github.io/Generation/#/manita` |
| NAKED | `https://site-web-fr.github.io/Generation/#/naked` |
| Blue India | `https://site-web-fr.github.io/Generation/#/blue-india` |
| BANGER | `https://site-web-fr.github.io/Generation/#/banger` |
| SOLEIRA | `https://site-web-fr.github.io/Generation/#/soleira` |
| Casa Asado | `https://site-web-fr.github.io/Generation/#/casa-asado` |
| Maria Bonita | `https://site-web-fr.github.io/Generation/#/maria-bonita` |
| Bambino & Tonton | `https://site-web-fr.github.io/Generation/#/bambino-tonton` |
| La Bodeguita | `https://site-web-fr.github.io/Generation/#/la-bodeguita` |

### Activer GitHub Pages (une seule fois)

1. Va sur **GitHub → repo Generation → Settings → Pages**
2. Source : **GitHub Actions**
3. Merge la branche `cursor/halles-lez-landings-7629` (ou `main`) — le workflow se lance automatiquement
4. Après ~2 min, l'URL est live sur ton téléphone

Chaque landing a un bouton **📱 Partager** et **📄 Export PDF** (impression / enregistrer en PDF depuis le mobile).

## Fonctionnalités

- Logos officiels Halles du Lez + photos des stands
- Hero plein écran avec photo réelle par commerce
- Galerie « En images » + lien Instagram
- Menu avec photos de plats (remplaçables par visuels Insta)
- Hub central listant les 10 propositions
- Landing page par commerce avec charte graphique dédiée
- Animations Framer Motion, CRO (sticky CTA, urgence, social proof)
- Uber Eats intégré : Rouge Beef, Blue India, Soleira, Bambino

## Lancer en local

```bash
cd halles-lez-landings
npm install
npm run dev
```

Ouvrir `http://localhost:5173`

## Ajouter des visuels Instagram

Remplacer les fichiers dans `public/` :

```
public/
  logos-official/   → logo PNG transparent par slug
  photos/hero/      → 1 photo hero (jpg ou png)
  photos/menu/      → slug-1, slug-2, slug-3 (1 par plat)
  photos/gallery/   → photos supplémentaires
```

Les chemins sont configurés dans `src/data/assets.ts`.

## Build

```bash
npm run build          # local
npm run build:pages    # GitHub Pages (/Generation/)
```
