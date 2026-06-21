# Déployer sur Netlify (équipe sitewebmontpellier)

Hébergement alternatif à GitHub Pages — même site, URLs plus courtes, souvent plus fiable sur mobile.

**Tableau de bord :** https://app.netlify.com/teams/sitewebmontpellier/projects

---

## Option A — Connecter le dépôt GitHub (recommandé)

1. Ouvrez **Add new project** → **Import an existing project**
2. Choisissez **GitHub** → autorisez Netlify si demandé
3. Sélectionnez le dépôt **`Site-web-fr/Generation`**
4. Netlify lit automatiquement `netlify.toml` à la racine :
   - **Build command** : installe les deps + `npm run build:netlify`
   - **Publish directory** : `halles-lez-landings/dist`
5. Cliquez **Deploy site**
6. Attendez le build vert (~2–3 min)

### Après le premier déploiement

- URL par défaut : `https://<nom-aléatoire>.netlify.app`
- Renommez dans **Site configuration → Domain management → Options → Edit site name**  
  Exemple : `generation-siteweb` → `https://generation-siteweb.netlify.app`

Chaque push sur **`main`** redéploie automatiquement.

---

## Option B — Glisser-déposer (sans Git)

1. Sur GitHub : **Actions** → workflow **Deploy GitHub Pages** (vert)
2. Téléchargez l’artefact **`site-deploy`** (ZIP)
3. Dézippez le contenu
4. https://app.netlify.com/drop → glissez le dossier dézippé

---

## Liens une fois sur Netlify

Remplacez `VOTRE-SITE` par votre sous-domaine Netlify :

| Page | URL |
|------|-----|
| **Pilot mobile** | `https://VOTRE-SITE.netlify.app/pilot.html` |
| Hub Premium | `https://VOTRE-SITE.netlify.app/premium` |
| Velours Auto | `https://VOTRE-SITE.netlify.app/velours-auto` |
| Halles du Lez | `https://VOTRE-SITE.netlify.app/` |

La page **pilot.html** détecte automatiquement Netlify vs GitHub Pages et génère les bons liens.

---

## GitHub Pages reste actif

Les deux hébergements peuvent coexister :

| Hébergement | Exemple |
|-------------|---------|
| GitHub Pages | `https://site-web-fr.github.io/Generation/#/velours-auto` |
| Netlify | `https://VOTRE-SITE.netlify.app/velours-auto` |

---

## Dépannage

| Problème | Solution |
|----------|----------|
| Build échoue sur Netlify | Vérifiez les logs ; Node 22 est configuré dans `netlify.toml` |
| Page blanche | Videz le cache navigateur ou testez en navigation privée |
| 404 sur `/premium` | Vérifiez que le redirect SPA `/* → /index.html` est bien actif (fichier `netlify.toml`) |
| Ancienne erreur `useState` | Cache navigateur — forcez un rechargement |

---

## Test local avant déploiement

```bash
cd premium-landings && npm ci
cd ../halles-lez-landings && npm ci && npm run build:netlify
npx serve dist -l 4173
```

Puis ouvrez http://localhost:4173/premium et http://localhost:4173/pilot.html
