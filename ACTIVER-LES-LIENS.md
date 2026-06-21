# ⚠️ ACTIVATION — Dernière étape : activer Pages dans Settings

Le dépôt est maintenant **public** ✅ — il reste à activer GitHub Pages :

1. https://github.com/Site-web-fr/Generation/settings/pages
2. **Build and deployment** → Source : **Deploy from a branch**
3. Branch : **gh-pages** → **/ (root)** → **Save**

Puis attendez 1–2 minutes et testez : https://site-web-fr.github.io/Generation/pilot.html

---

# ⚠️ POURQUOI AUCUN LIEN NE FONCTIONNE (résolu partiellement)

**Diagnostic confirmé :**
- Le dépôt `Generation` est **PRIVÉ**
- GitHub Pages est **DÉSACTIVÉ** (`has_pages: false`)
- → Toutes les URLs renvoient **404**

**Le code et le déploiement sont prêts.** Il manque **2 clics dans GitHub** de votre côté.

---

## ✅ SOLUTION EN 2 MINUTES (obligatoire)

### Étape 1 — Rendre le dépôt public

Les démos client doivent être visibles publiquement. Sur un compte GitHub gratuit, **Pages ne fonctionne pas sur un dépôt privé**.

1. Ouvrez : **https://github.com/Site-web-fr/Generation/settings**
2. Tout en bas → section **Danger Zone**
3. Cliquez **Change repository visibility**
4. Choisissez **Public** → confirmez

### Étape 2 — Activer GitHub Pages

1. Toujours dans Settings → menu gauche **Pages**
2. **Build and deployment** → Source : **Deploy from a branch**
3. Branch : **gh-pages** → dossier **/ (root)** → **Save**

*Alternative : Source **GitHub Actions** si proposé.*

### Étape 3 — Attendre 1 à 2 minutes

Puis testez : **https://site-web-fr.github.io/Generation/pilot.html**

---

## 📱 VOS LIENS (après activation)

| Page | Lien |
|------|------|
| **Pilot mobile (favori)** | https://site-web-fr.github.io/Generation/pilot.html |
| Hub Premium | https://site-web-fr.github.io/Generation/#/premium |
| Velours Auto | https://site-web-fr.github.io/Generation/#/velours-auto |
| Éclat Aesthetic | https://site-web-fr.github.io/Generation/#/eclat-aesthetic |
| Halles du Lez | https://site-web-fr.github.io/Generation/#/ |

### Tous les sites premium

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

---

## 🔄 PLAN B — Netlify (si vous ne voulez pas rendre le repo public)

1. Allez sur https://app.netlify.com/drop
2. Téléchargez le ZIP depuis GitHub Actions :
   - **Actions** → dernier workflow vert **Deploy GitHub Pages**
   - Téléchargez l'artefact **site-deploy**
3. Dézippez et glissez le contenu sur Netlify Drop
4. Netlify vous donne une URL du type `https://votre-site.netlify.app`

---

## Vérification

Le workflow **Deploy GitHub Pages** doit être ✅ vert :  
https://github.com/Site-web-fr/Generation/actions

La branche **gh-pages** contient déjà le site déployé :  
https://github.com/Site-web-fr/Generation/tree/gh-pages
