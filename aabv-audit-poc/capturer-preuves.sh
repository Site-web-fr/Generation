#!/usr/bin/env bash
# Regénère les preuves curl pour démo client — aabv.fr
# Usage : ./capturer-preuves.sh | tee preuves-$(date +%Y%m%d).txt

set -euo pipefail
SITE="https://www.aabv.fr"
SITE_HTTP="http://www.aabv.fr"

echo "=============================================="
echo " PREUVES SÉCURITÉ — www.aabv.fr"
echo " Date: $(date -Iseconds)"
echo "=============================================="
echo

echo ">>> 1. phpinfo.php accessible publiquement"
echo "Commande: curl -sI ${SITE}/phpinfo.php"
curl -sI "${SITE}/phpinfo.php" | head -8
echo
echo "Taille du contenu fuité:"
curl -s "${SITE}/phpinfo.php" | wc -c | awk '{print $1 " octets"}'
echo

echo ">>> 2. HTTP sans redirection HTTPS (vol session)"
echo "Commande: curl -sI ${SITE_HTTP}/"
curl -sI "${SITE_HTTP}/" | grep -iE 'HTTP/|location|set-cookie|strict-transport' || true
echo

echo ">>> 3. Absence X-Frame-Options (clickjacking)"
echo "Commande: curl -sI ${SITE}/ | grep -i frame"
curl -sI "${SITE}/" | grep -i frame || echo "(aucun en-tête frame → site iframe-able)"
echo

echo ">>> 4. Version PHP exposée"
curl -sI "${SITE}/" | grep -i 'x-powered-by' || true
echo

echo ">>> 5. Cookie session non durci"
curl -sI "${SITE}/" | grep -i set-cookie || true
echo

echo ">>> 6. Login accepte POST sans CSRF (réponse générique)"
curl -s -X POST -d "login=preuve_audit&mdp=test" "${SITE}/" \
  | grep -o 'Login et/ou mot de passe incorrects' || echo "(message erreur non trouvé)"
echo

echo "=============================================="
echo " Fin — conserver ce log pour le client"
echo "=============================================="
