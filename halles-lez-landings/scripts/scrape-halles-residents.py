#!/usr/bin/env python3
"""Télécharge logos officiels Halles du Lez + photos résidents, extrait les couleurs."""
from __future__ import annotations

import json
import re
import urllib.request
from collections import Counter
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGOS = PUBLIC / "logos-official"
HEROES = PUBLIC / "photos" / "hero"
BASE = "https://hallesdulez.com/img/"
UA = {"User-Agent": "Mozilla/5.0 (compatible; HallesLezDemo/1.0)"}

# Source: hallesdulez.com/les-residents_food-court.php (mars 2026)
RESIDENTS: list[dict] = [
    {"slug": "aux-copains-dabord", "name": "Aux Copains d'Abord", "subtitle": "Bagels & Dwichs", "stand": "12A", "picto": "pict-residents-halles-du-lez-montpellier-bagel.png", "hero": "halles-du-lez--residents-aux-copains-dabord.jpg", "instagram": "aux_copains_dabord", "category": "manger"},
    {"slug": "kochi", "name": "Kochi", "subtitle": "Sushi · Hand Roll · Sando · Onigiri", "stand": "12B", "picto": "pict-residents-halles-du-lez-montpellier-specialites-japonaises.png", "hero": "halles-du-lez--residents--kochi.png", "instagram": "", "category": "manger"},
    {"slug": "la-vita-al-dente", "name": "La Vita al Dente", "subtitle": "Épicerie & pâtes fraîches", "stand": "A & 17", "picto": "pict-residents-halles-du-lez-montpellier-bar-a-pates-cocktail-italien.png", "hero": "halles-du-lez--residents-comptoir-la-vita-al-dente.jpg", "instagram": "", "category": "manger"},
    {"slug": "bar-des-halles", "name": "Bar des Halles", "subtitle": "Bar guinguette", "stand": "B", "picto": "pict-residents-halles-du-lez-montpellier-bar-guinguette.png", "hero": "halles-du-lez--residents-bar-des-halles.jpg", "instagram": "lebardeshalles_hallesdulez", "category": "boire"},
    {"slug": "bar-a-lez", "name": "Bar à Lez", "subtitle": "Bar à vins & Aveyron", "stand": "C", "picto": "pict-residents-halles-du-lez-montpellier-bar-a-vin.png", "hero": "halles-du-lez--residents-baralez.jpg", "instagram": "", "category": "boire"},
    {"slug": "la-bodeguita", "name": "La Bodeguita", "subtitle": "Paëllas & tapas", "stand": "D", "picto": "pict-residents-halles-du-lez-montpellier-paellas-tapas.png", "hero": "halles-du-lez--residents-labodeguita.jpg", "instagram": "labodeguita_hallesdulez", "category": "manger"},
    {"slug": "soleira", "name": "SOLEIRA", "subtitle": "Cuisine du Sud-Ouest", "stand": "9", "picto": "pict-residents-halles-du-lez-montpellier-soleira.png", "hero": "halles-du-lez--residents--soleira.png", "instagram": "soleira.montpellier", "category": "manger"},
    {"slug": "comptoir-alaryk", "name": "Le Comptoir Alaryk", "subtitle": "Bar à bières artisanales", "stand": "F", "picto": "pict-residents-halles-du-lez-montpellier-bar-a-bieres.png", "hero": "halles-du-lez--residents-comptoir-alaryk.jpg", "instagram": "", "category": "boire"},
    {"slug": "naked", "name": "NAKED", "subtitle": "Bar à cocktails & œufs", "stand": "G", "picto": "pict-residents-halles-du-lez-montpellier-cocktails-us-bar-a-oeufs.png", "hero": "halles-du-lez--residents-naked.jpg", "instagram": "nakedmtp", "category": "boire"},
    {"slug": "blue-india", "name": "Blue India", "subtitle": "Cuisine indienne", "stand": "16B", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-indienne.png", "hero": "halles-du-lez--residents-blue-india.jpg", "instagram": "blueindia_mtp", "category": "manger"},
    {"slug": "manita", "name": "MANITA", "subtitle": "Saveurs entre Suds", "stand": "1", "picto": "pict-residents-halles-du-lez-montpellier-saveurs-entre-suds.png", "hero": "halles-du-lez--residents-manita.jpg", "instagram": "manita_montpellier", "category": "manger"},
    {"slug": "chicken-shake", "name": "Chicken & Shake", "subtitle": "Poulet frit & milkshakes", "stand": "2A", "picto": "pict-residents-halles-du-lez-montpellier-poulet.png", "hero": "halles-du-lez--residents-chicken-shake.jpg", "instagram": "", "category": "manger"},
    {"slug": "dom-pata-negra", "name": "Dom Pata Negra", "subtitle": "Jambons ibériques & tapas", "stand": "4B", "picto": "pict-residents-halles-du-lez-montpellier-bar-a-jambons-tapas-charcuteries-iberiques.png", "hero": "halles-du-lez--residents-dom-pata-negra.jpg", "instagram": "", "category": "manger"},
    {"slug": "comptoir-des-iles", "name": "Le Comptoir des Îles", "subtitle": "Maurice · Madagascar · Réunion", "stand": "5B", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-maurice-madagascar-reunion.png", "hero": "halles-du-lez--residents-comptoir-des-iles.jpg", "instagram": "", "category": "manger"},
    {"slug": "bonobo", "name": "Bonobo", "subtitle": "Cuisine australienne", "stand": "10B", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-australienne.png", "hero": "halles-du-lez--residents-bonobo.jpg", "instagram": "", "category": "manger"},
    {"slug": "ummi", "name": "Ummi", "subtitle": "Saveurs orientales", "stand": "16A", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-orientale.png", "hero": "halles-du-lez--residents-ummi.jpg", "instagram": "", "category": "manger"},
    {"slug": "casa-asado", "name": "Casa Asado", "subtitle": "Bar à viandes", "stand": "E", "picto": "pict-residents-halles-du-lez-montpellier-bar-a-viande-boucherie-grillade.png", "hero": "halles-du-lez--residents-casa-asado.jpg", "instagram": "casa.asado", "category": "manger"},
    {"slug": "tonton-haricot", "name": "Tonton Haricot", "subtitle": "Bar à salades", "stand": "3A", "picto": "pict-residents-halles-du-lez-montpellier-cafe-healthy-food.png", "hero": "halles-du-lez--residents-tonton-haricot.jpg", "instagram": "", "category": "manger"},
    {"slug": "bambino", "name": "Bambino", "subtitle": "Pizza Club", "stand": "3B", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-italienne-pizza.png", "hero": "halles-du-lez--residents-bambino.jpg", "instagram": "bambinopizzaclub", "category": "manger"},
    {"slug": "ma-cocotte", "name": "Ma Cocotte", "subtitle": "Cuisine traditionnelle", "stand": "4A", "picto": "pict-residents-halles-du-lez-montpellier-epicerie-produits-bio.png", "hero": "halles-du-lez--residents-ma-cocotte.jpg", "instagram": "", "category": "manger"},
    {"slug": "mamaona", "name": "Mamaona", "subtitle": "Healthy food", "stand": "5A", "picto": "pict-residents-halles-du-lez-montpellier-cafe-healthy-food.png", "hero": "halles-du-lez--residents-mamaona.jpg", "instagram": "", "category": "manger"},
    {"slug": "oh-my-goz", "name": "Oh My Göz", "subtitle": "Turkish street food", "stand": "6A", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-turque.png", "hero": "halles-du-lez--residents-oh-my-goz.jpg", "instagram": "", "category": "manger"},
    {"slug": "hyoga", "name": "Hyoga", "subtitle": "Glaces & pancakes", "stand": "6B", "picto": "pict-residents-halles-du-lez-montpellier-glaces-pancakes.png", "hero": "halles-du-lez--residents-hyoga.jpg", "instagram": "", "category": "manger"},
    {"slug": "latelier", "name": "L'Atelier", "subtitle": "Friterie belge & pâtisserie", "stand": "7A & 7B", "picto": "pict-residents-halles-du-lez-montpellier-friterie-belge.png", "hero": "halles-du-lez--residents-latelier.jpg", "instagram": "", "category": "manger"},
    {"slug": "sax", "name": "Sax", "subtitle": "Spécialités fromagères", "stand": "8A", "picto": "pict-residents-halles-du-lez-montpellier-glaces-pancakes.png", "hero": "halles-du-lez--residents-sax.jpg", "instagram": "", "category": "manger"},
    {"slug": "jean-le-croquant", "name": "Jean le Croquant", "subtitle": "Croque-monsieur", "stand": "8B", "picto": "pict-residents-halles-du-lez-montpellier-croque-monsieur.png", "hero": "halles-du-lez--residents-jean-le-croquant.jpg", "instagram": "", "category": "manger"},
    {"slug": "opa", "name": "OPA", "subtitle": "Greek food spot", "stand": "10A", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-grecque.png", "hero": "halles-du-lez--residents-opa.jpg", "instagram": "", "category": "manger"},
    {"slug": "bouchon-petit-jardin", "name": "Le Bouchon du Petit Jardin", "subtitle": "Spécialités lyonnaises", "stand": "11A", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-japonaise-coreenne.png", "hero": "halles-du-lez--residents-bouchon-petit-jardin.jpg", "instagram": "", "category": "manger"},
    {"slug": "maria-bonita", "name": "Maria Bonita", "subtitle": "Empanadas argentines", "stand": "11B", "picto": "pict-residents-halles-du-lez-montpellier-empanada-argentin-artisanal.png", "hero": "halles-du-lez--residents-maria-bonita.jpg", "instagram": "mariabonitamontpellier", "category": "manger"},
    {"slug": "tok-tok-wok", "name": "Tok Tok Wok", "subtitle": "Wok · Gua Bao · Vapeurs", "stand": "13A", "picto": "pict-residents-halles-du-lez-montpellier-wok-bao.png", "hero": "halles-du-lez--residents-tok-tok-wok.jpg", "instagram": "", "category": "manger"},
    {"slug": "clara-jung", "name": "Clara Jung", "subtitle": "Pâtisseries créatives", "stand": "13B", "picto": "pict-residents-halles-du-lez-montpellier-patisserie.png", "hero": "halles-du-lez--residents-clara-jung.jpg", "instagram": "", "category": "manger"},
    {"slug": "banger", "name": "BANGER", "subtitle": "Smash burgers & cookies", "stand": "14A", "picto": "pict-residents-halles-du-lez-montpellier-banger.png", "hero": "halles-du-lez--residents-banger.jpg", "instagram": "smashbanger_co", "category": "manger"},
    {"slug": "cherry", "name": "Cherry", "subtitle": "Crêpes & gaufres", "stand": "14B", "picto": "pict-residents-halles-du-lez-montpellier-crepes-gaufres-barista-bar-a-jus.png", "hero": "halles-du-lez--residents-cherry.jpg", "instagram": "", "category": "manger"},
    {"slug": "rouge-beef", "name": "Rouge Beef", "subtitle": "Burgers & viandes maturées", "stand": "15A", "picto": "pict-residents-halles-du-lez-montpellier-burgers-viandes-maturees.png", "hero": "halles-du-lez--residents-rouge-beef.jpg", "instagram": "rouge_beef", "category": "manger"},
    {"slug": "pitas-de-sacha", "name": "Les Pitas de Sacha", "subtitle": "Falafel & chawarma", "stand": "18A", "picto": "pict-residents-halles-du-lez-montpellier-cuisine-maurice-madagascar-reunion.png", "hero": "halles-du-lez--residents-les-pitas-de-sacha.jpg", "instagram": "", "category": "manger"},
    {"slug": "rotisserie-du-lez", "name": "La Rôtisserie du Lez", "subtitle": "Rôtisserie", "stand": "18B", "picto": "pict-residents-halles-du-lez-montpellier-rotisserie-volailler.png", "hero": "halles-du-lez--residents-rotisserie-du-lez.jpg", "instagram": "", "category": "manger"},
    {"slug": "lepicurieuse", "name": "L'Epicurieuse", "subtitle": "Épicerie fine", "stand": "9", "picto": "pict-residents-halles-du-lez-montpellier-epicerie-fine-produits-locaux.png", "hero": "halles-du-lez--residents-lepicurieuse.jpg", "instagram": "", "category": "epicerie"},
]


def download(url: str, dest: Path) -> bool:
    try:
        req = urllib.request.Request(url, headers=UA)
        data = urllib.request.urlopen(req, timeout=30).read()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return True
    except Exception as e:
        print(f"  ✗ {url}: {e}")
        return False


def rgb_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02x}{g:02x}{b:02x}"


def extract_palette(path: Path) -> dict[str, str]:
    img = Image.open(path).convert("RGBA")
    img = img.resize((120, 120))
    pixels = [p[:3] for p in img.getdata() if p[3] > 128]
    if not pixels:
        pixels = [p[:3] for p in img.convert("RGB").getdata()]
    # ignore near-white/black
    filtered = [p for p in pixels if not (sum(p) > 700 or sum(p) < 40)]
    if not filtered:
        filtered = pixels
    counts = Counter(filtered)
    top = [c for c, _ in counts.most_common(6)]
    primary = top[0] if top else (200, 80, 60)
    accent = top[1] if len(top) > 1 else primary
    bg = tuple(max(0, c - 40) for c in primary)
    return {
        "primary": rgb_hex(*primary),
        "accent": rgb_hex(*accent),
        "bg": rgb_hex(min(255, bg[0] + 10), min(255, bg[1] + 10), min(255, bg[2] + 10)),
    }


def optimize_hero(src: Path, dest: Path) -> None:
    img = Image.open(src)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    img.thumbnail((1400, 933), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=85, optimize=True)


def main() -> None:
    LOGOS.mkdir(parents=True, exist_ok=True)
    HEROES.mkdir(parents=True, exist_ok=True)
    colors: dict[str, dict] = {}

    for r in RESIDENTS:
        slug = r["slug"]
        print(f"→ {slug}")

        logo_url = BASE + r["picto"]
        logo_dest = LOGOS / f"{slug}.png"
        if download(logo_url, logo_dest):
            print(f"  logo OK")
            try:
                colors[slug] = extract_palette(logo_dest)
            except Exception:
                pass

        hero_file = r.get("hero", "")
        if hero_file:
            ext = Path(hero_file).suffix.lower()
            hero_dest = HEROES / f"{slug}.jpg"
            tmp = HEROES / f"{slug}{ext}"
            if download(BASE + hero_file, tmp):
                if ext in (".jpg", ".jpeg"):
                    tmp.rename(hero_dest)
                else:
                    optimize_hero(tmp, hero_dest)
                    tmp.unlink(missing_ok=True)
                print(f"  hero OK")

    out = ROOT / "src" / "data" / "brand-colors.json"
    out.write_text(json.dumps(colors, indent=2), encoding="utf-8")
    manifest = ROOT / "src" / "data" / "residents-manifest.json"
    manifest.write_text(json.dumps(RESIDENTS, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n{len(RESIDENTS)} résidents · couleurs → {out.name}")


if __name__ == "__main__":
    main()
