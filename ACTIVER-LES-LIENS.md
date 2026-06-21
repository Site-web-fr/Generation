# ⚠️ ACTIVATION REQUISE — Les liens ne marchent pas tant que GitHub Pages n'est pas activé

## Pourquoi rien ne fonctionne ?

Le dépôt **Generation** est **privé** et **GitHub Pages n'est pas activé** (`has_pages: false`).

Sur un dépôt privé avec un compte GitHub gratuit, les Pages ne sont **pas disponibles**. Il faut l'une de ces options :

---

## Option A — Rendre le dépôt public (recommandé pour des démos client)

1. Ouvrez https://github.com/Site-web-fr/Generation/settings
2. Descendez en bas → **Danger Zone**
3. **Change repository visibility** → **Public**
4. Puis allez dans **Settings → Pages**
5. **Build and deployment** → Source : **GitHub Actions**
6. Relancez le workflow : **Actions → Deploy GitHub Pages → Run workflow**

**Vos liens seront :**

| Page | URL |
|------|-----|
| **Pilot mobile** | https://site-web-fr.github.io/Generation/pilot.html |
| **Hub Premium** | https://site-web-fr.github.io/Generation/#/premium |
| **Velours Auto** | https://site-web-fr.github.io/Generation/#/velours-auto |
| **Halles du Lez** | https://site-web-fr.github.io/Generation/#/ |

---

## Option B — Garder le dépôt privé (GitHub Pro requis)

Avec **GitHub Pro**, **Team** ou **Enterprise** :

1. **Settings → Pages**
2. Source : **GitHub Actions**
3. Relancez le workflow **Deploy GitHub Pages**

---

## Option C — Déployer sur Netlify (gratuit, 2 minutes)

1. Allez sur https://app.netlify.com/drop
2. Glissez le dossier `halles-lez-landings/dist` (après `npm run build:pages` avec `GITHUB_PAGES=true`)
3. Ajoutez aussi `pilot.html` à la racine du dossier
4. Netlify vous donne une URL du type `https://xxx.netlify.app`

Pour builder localement :

```bash
cd halles-lez-landings
npm ci && npm ci --prefix ../premium-landings
GITHUB_PAGES=true npm run build:pages
cp ../pilot.html dist/pilot.html
# Glissez le dossier dist/ sur Netlify Drop
```

---

## Vérifier que le déploiement a réussi

1. https://github.com/Site-web-fr/Generation/actions — workflow **Deploy GitHub Pages** doit être vert
2. https://github.com/Site-web-fr/Generation/settings/pages — doit afficher une URL

---

## Tous les liens premium (une fois en ligne)

- https://site-web-fr.github.io/Generation/#/premium
- https://site-web-fr.github.io/Generation/#/eclat-aesthetic
- https://site-web-fr.github.io/Generation/#/maison-lumiere
- https://site-web-fr.github.io/Generation/#/azure-thrill
- https://site-web-fr.github.io/Generation/#/pristine-yachts
- https://site-web-fr.github.io/Generation/#/velours-auto
- https://site-web-fr.github.io/Generation/#/horizon-charter
- https://site-web-fr.github.io/Generation/#/sanctum-spa
- https://site-web-fr.github.io/Generation/#/aether-aviation
- https://site-web-fr.github.io/Generation/#/atelier-nocturne
- https://site-web-fr.github.io/Generation/#/grand-palais-events
