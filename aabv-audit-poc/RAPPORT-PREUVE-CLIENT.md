# Preuves d'attaques réalisables — www.aabv.fr

**Date :** 18 juin 2026  
**Périmètre :** Tests non destructifs, avec autorisation du client  
**Objectif :** Démontrer des failles exploitables sans modifier le site

---

## Résumé pour le client (30 secondes)

Votre site **expose publiquement la configuration complète du serveur**, accepte les connexions **non chiffrées (HTTP)**, et **ne protège pas** le formulaire de connexion des adhérents contre le **détournement de clic (clickjacking)**.  
Un attaquant sur le même réseau Wi‑Fi ou un script malveillant peut **voler une session adhérent** ou **induire une fausse connexion**.

---

## Preuve n°1 — Fuite totale de configuration (`phpinfo.php`)

### Ce qu'un attaquant voit sans mot de passe

Ouvrir dans un navigateur : **https://www.aabv.fr/phpinfo.php**

| Indicateur | Valeur mesurée |
|------------|----------------|
| Code HTTP | **200 OK** (accessible à tous) |
| Taille de la page | **~98 Ko** de données techniques |
| Modules PHP exposés | **64** (MySQL, IMAP, SSH2, Redis, MongoDB…) |
| Version PHP | **7.4.33** (plus maintenue depuis 2022) |

### Informations sensibles révélées (extrait réel)

```
session.cookie_httponly = 0        → cookie lisible par JavaScript (XSS)
session.cookie_secure   = 0        → cookie envoyé aussi en HTTP clair
session.use_trans_sid   = 1        → ID de session peut fuiter dans l'URL
session.use_strict_mode = 0        → fixation de session possible
expose_php              = On       → version PHP visible
mysqli.allow_local_infile = On     → dangereux si faille SQL
open_basedir            = (vide)   → pas de sandbox fichiers
```

### Impact métier

- Cartographie complète de l'infrastructure pour préparer une attaque ciblée
- Facilite l'exploitation d'autres failles (SQLi, LFI, etc.)
- **Correction : supprimer le fichier ou bloquer l'accès — 5 minutes**

### Reproduction (ligne de commande)

```bash
curl -sI https://www.aabv.fr/phpinfo.php
# Attendu actuellement : HTTP/2 200
```

---

## Preuve n°2 — Vol de session sur HTTP (MITM)

### Constat

Le site répond en **HTTP 200** sans rediriger vers HTTPS :

```bash
curl -sI http://www.aabv.fr/
# HTTP/1.1 200 OK
# set-cookie: PHPSESSID=xxxxxxxx; path=/
#   ↑ PAS de flag "Secure" → cookie transmis en clair sur HTTP
```

Aucun en-tête `Strict-Transport-Security` (HSTS).

### Scénario d'attaque (démontrable en réunion)

1. L'adhérent se connecte depuis un **Wi‑Fi public** (gare, café, hôtel).
2. Une application ou un proxy force une requête en **http://** (ou l'utilisateur tape l'URL sans `https`).
3. Le cookie **`PHPSESSID`** transite **en clair** sur le réseau.
4. L'attaquant capture le cookie → **accès à l'espace adhérent** sans mot de passe.

### Démonstration visuelle

Ouvrir le fichier **`demo-http-session.html`** dans ce dossier : il montre côte à côte la différence entre une session sécurisée et la configuration actuelle du site.

---

## Preuve n°3 — Clickjacking sur le login adhérents

### Constat

Aucun en-tête `X-Frame-Options` ni `Content-Security-Policy: frame-ancestors`.

```bash
curl -sI https://www.aabv.fr/ | grep -i frame
# (aucun résultat = site intégrable dans une iframe malveillante)
```

### Scénario d'attaque

1. L'attaquant envoie un e-mail « Gagnez un cadeau — cliquez ici ».
2. La page affiche un bouton « J'accepte ».
3. **Derrière**, en iframe invisible, le vrai formulaire de connexion aabv.fr.
4. La victime clique → en réalité elle valide **Connexion** ou saisit identifiants sur le site réel, contrôlé par l'attaquant (superposition).

### Démonstration live (sans toucher au site)

Ouvrir **`demo-clickjacking.html`** dans Chrome/Firefox :  
le formulaire de connexion aabv.fr apparaît sous un bouton factice.  
**C'est exactement le vecteur d'attaque.**

---

## Preuve n°4 — Absence de protection CSRF

Le formulaire de connexion (`POST /`, champs `login`, `mdp`) **n'a pas de jeton CSRF** dans le HTML.

Ouvrir **`demo-csrf-login.html`** : une page externe peut envoyer un POST vers aabv.fr.  
(Même origine : la requête part ; seule la lecture de la réponse est bloquée par le navigateur.)

---

## Preuve n°5 — PHP obsolète (exploits publics)

PHP **7.4** est en **fin de vie** : plus aucun correctif de sécurité officiel.  
Des CVE publiques existent pour cette branche ; un hébergeur mutualisé partageant la même stack est un vecteur connu.

---

## Matrice risque / effort attaquant

| Attaque | Compétence requise | Outils | Impact adhérents |
|---------|-------------------|--------|------------------|
| Lire phpinfo | Aucune | Navigateur | Préparation attaque |
| Sniffer session HTTP | Faible | Wireshark, mitmproxy | **Accès compte adhérent** |
| Clickjacking login | Faible | Page HTML | Vol identifiants / actions |
| Exploit PHP 7.4 | Moyenne | Scripts publics | Prise de serveur possible |

---

## Corrections prioritaires (devis type)

| Action | Délai | Coût indicatif* |
|--------|-------|-----------------|
| Supprimer phpinfo.php + forcer HTTPS | 1 h | Faible |
| En-têtes sécurité + cookies session | 2 h | Faible |
| Migration PHP 8.2 + tests adhérents | 1–2 j | Moyen |
| Audit code (SQL, uploads, auth) | 3–5 j | Contrat maintenance |

\*À chiffrer selon votre grille.

---

## Fichiers de démonstration inclus

| Fichier | Usage en réunion |
|---------|------------------|
| `demo-clickjacking.html` | Projection écran — effet « waouh » |
| `demo-http-session.html` | Expliquer le vol Wi‑Fi |
| `demo-csrf-login.html` | Formulaire externe → POST aabv.fr |
| `capturer-preuves.sh` | Regénérer les preuves curl en direct |

---

*Document produit dans le cadre d'un audit autorisé. Ne pas diffuser publiquement les URLs d'exploitation une fois les correctifs appliqués.*
