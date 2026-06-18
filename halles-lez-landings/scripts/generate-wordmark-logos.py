#!/usr/bin/env python3
"""Génère des wordmarks SVG par stand (identité typo + couleur charte)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOGOS = ROOT / "public" / "logos"
MANIFEST = ROOT / "src" / "data" / "residents-manifest.json"

# Polices alignées sur typography.ts (Google Fonts déjà chargées)
FONT: dict[str, tuple[str, int, str]] = {
    "rouge-beef": ('"Bebas Neue", sans-serif', 38, "700"),
    "manita": ('"Archivo Black", sans-serif', 32, "900"),
    "naked": ('"Syne", sans-serif', 34, "700"),
    "blue-india": ('"Playfair Display", serif', 28, "700"),
    "banger": ('"Black Ops One", cursive', 30, "400"),
    "soleira": ('"Libre Baskerville", serif', 26, "700"),
    "casa-asado": ('"Oswald", sans-serif', 34, "700"),
    "maria-bonita": ('"Righteous", cursive', 28, "400"),
    "bambino": ('"Space Grotesk", sans-serif', 30, "700"),
    "tonton-haricot": ('"Space Grotesk", sans-serif', 22, "700"),
    "la-bodeguita": ('"Cinzel", serif', 24, "700"),
}

COLOR: dict[str, tuple[str, str]] = {
    "rouge-beef": ("#c41e3a", "#f5e6c8"),
    "manita": ("#ffd166", "#e85d04"),
    "naked": ("#e8e4df", "#c9a962"),
    "blue-india": ("#fbbf24", "#2563eb"),
    "banger": ("#facc15", "#ef4444"),
    "soleira": ("#fef3c7", "#d97706"),
    "casa-asado": ("#fbbf24", "#dc2626"),
    "maria-bonita": ("#fde68a", "#ec4899"),
    "bambino": ("#ef4444", "#faf7f4"),
    "tonton-haricot": ("#22c55e", "#faf7f4"),
    "la-bodeguita": ("#facc15", "#ea580c"),
}

DEFAULT_FONT = ('"Archivo Black", sans-serif', 26, "900")
DEFAULT_COLOR = ("#faf7f4", "#e85d04")


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def display_name(slug: str, name: str) -> str:
    if slug in ("manita", "naked", "banger", "opa"):
        return name.upper()
    if slug == "soleira":
        return "SOLEIRA"
    return name


def estimate_width(text: str, size: int) -> int:
    return max(120, int(len(text) * size * 0.55) + 24)


def make_svg(slug: str, name: str) -> str:
    text = display_name(slug, name)
    font, size, weight = FONT.get(slug, DEFAULT_FONT)
    fill, accent = COLOR.get(slug, DEFAULT_COLOR)
    width = estimate_width(text, size)
    y = int(size * 0.92)
    letter = ' letter-spacing="0.04em"' if "Oswald" in font or "Bebas" in font else ""
    line = (
        f'  <line x1="0" y1="{y + 8}" x2="{width}" y2="{y + 8}" '
        f'stroke="{accent}" stroke-width="2" opacity="0.85"/>'
        if slug not in ("banger",)
        else ""
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 56" fill="none" role="img" aria-label="{esc(name)}">
  <text x="0" y="{y}" font-family={font} font-size="{size}" font-weight="{weight}" fill="{fill}"{letter}>{esc(text)}</text>
{line}
</svg>
'''


def main() -> None:
    residents = json.loads(MANIFEST.read_text(encoding="utf-8"))
    LOGOS.mkdir(parents=True, exist_ok=True)
    created = 0
    for r in residents:
        slug = r["slug"]
        dest = LOGOS / f"{slug}.svg"
        if dest.exists():
            continue
        dest.write_text(make_svg(slug, r["name"]), encoding="utf-8")
        created += 1
        print(f"  + {slug}.svg")
    print(f"Done — {created} new wordmarks")


if __name__ == "__main__":
    main()
