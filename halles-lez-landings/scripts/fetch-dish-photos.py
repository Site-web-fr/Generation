#!/usr/bin/env python3
"""Télécharge et convertit les photos de plats depuis sources publiques vérifiées."""
from __future__ import annotations

import io
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "photos"
UA = {"User-Agent": "Mozilla/5.0 (compatible; HallesLezDemo/1.0)"}

# slug -> [(dest_relative, url, credit_tag)]
SOURCES: dict[str, list[tuple[str, str, str]]] = {
    "manita": [
        ("hero/manita.jpg", "https://foto1.sluurpy.com/locali/fr/1989838/65336363.jpg", "sluurpy"),
        ("menu/manita-1.jpg", "https://foto1.sluurpy.com/locali/fr/1989838/65336363.jpg", "sluurpy"),
        ("menu/manita-2.jpg", "https://foto1.sluurpy.com/locali/fr/1989838/65336364.jpg", "sluurpy"),
        ("menu/manita-3.jpg", "https://foto1.sluurpy.com/locali/fr/1989838/65336367.jpg", "sluurpy"),
        ("gallery/manita-2.jpg", "https://foto1.sluurpy.com/locali/fr/1989838/53788464.jpg", "sluurpy"),
    ],
    "blue-india": [
        ("hero/blue-india.jpg", "https://claap.fr/wp-content/uploads/2023/07/montpellier-blue-india-de-la-cuisine-indienne-au-marche-du-lez-750x375-2.webp", "claap"),
        ("menu/blue-india-1.jpg", "https://claap.fr/wp-content/uploads/2023/07/montpellier-blue-india-de-la-cuisine-indienne-au-marche-du-lez-750x375-2.webp", "claap"),
        ("menu/blue-india-3.jpg", "https://claap.fr/wp-content/uploads/2023/06/Blue-India-Publi-Insta-e1686644327232.png", "instagram"),
    ],
    "soleira": [
        ("hero/soleira.jpg", "https://marchedulez.com/wp-content/uploads/2025/07/4.jpeg", "marchedulez"),
        ("menu/soleira-1.jpg", "https://marchedulez.com/wp-content/uploads/2025/07/4.jpeg", "marchedulez"),
    ],
    "rouge-beef": [
        ("menu/rouge-beef-1.jpg", "https://studio-therese.fr/wp-content/uploads/2022/02/studio-therese-graphiste-montpellier-33.jpg", "studio-therese"),
        ("menu/rouge-beef-2.jpg", "https://studio-therese.fr/wp-content/uploads/2022/02/studio-therese-graphiste-montpellier-41.jpg", "studio-therese"),
    ],
}


def download(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def save_jpg(data: bytes, dest: Path, quality: int = 88) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(io.BytesIO(data))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    elif img.mode != "RGB":
        img = img.convert("RGB")
    img.save(dest, "JPEG", quality=quality, optimize=True)
    print(f"  OK {dest.name} ({dest.stat().st_size // 1024} KB)")


def main() -> None:
    for slug, items in SOURCES.items():
        print(f"\n[{slug}]")
        for rel, url, _ in items:
            dest = ROOT / rel
            try:
                save_jpg(download(url), dest)
            except Exception as e:
                print(f"  FAIL {rel}: {e}")


if __name__ == "__main__":
    main()
