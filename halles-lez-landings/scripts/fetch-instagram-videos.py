#!/usr/bin/env python3
"""Télécharge les reels Instagram food et génère les boucles photo pour le hero."""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "videos"
PHOTOS = ROOT / "public" / "photos"

# slug -> reel shortcode (vidéos nourriture / plat)
REELS: dict[str, str] = {
    "rouge-beef": "DHjRz6kJPFt",
    "manita": "C6iuFzltVNm",
    "banger": "DTm41qzjLAk",
    "casa-asado": "DHvXGV_sNYu",
    "maria-bonita": "DRNECcyCk5R",
    "bambino-tonton": "C76Nw3JNk2P",
}

# slug -> image source pour boucle Ken Burns (reels people-only ou inaccessibles)
GENERATED: dict[str, Path] = {
    "naked": PHOTOS / "menu" / "naked-2.jpg",
    "blue-india": PHOTOS / "menu" / "blue-india-1.jpg",
    "soleira": PHOTOS / "hero" / "soleira.jpg",
    "la-bodeguita": PHOTOS / "hero" / "la-bodeguita.jpg",
}


def ken_burns(slug: str, image: Path) -> None:
    dest = OUT / f"{slug}.mp4"
    if not image.exists():
        print(f"  ✗ image manquante: {image}", file=sys.stderr)
        return
    cmd = [
        "ffmpeg",
        "-y",
        "-loop",
        "1",
        "-framerate",
        "24",
        "-i",
        str(image),
        "-vf",
        "scale=720:900:force_original_aspect_ratio=increase,crop=720:900,"
        "zoompan=z='1+0.06*sin(2*PI*on/216)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=216:s=720x900:fps=24",
        "-t",
        "9",
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "26",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(dest),
    ]
    subprocess.run(cmd, check=True)
    print(f"  ✓ généré {dest.name}")


def download_reel(slug: str, code: str) -> None:
    ytdlp = shutil.which("yt-dlp")
    if not ytdlp:
        raise RuntimeError("yt-dlp introuvable")
    dest = OUT / f"{slug}.mp4"
    url = f"https://www.instagram.com/reel/{code}/"
    cmd = [
        ytdlp,
        "-f",
        "bv*+ba/b",
        "--merge-output-format",
        "mp4",
        "-o",
        str(dest),
        url,
    ]
    subprocess.run(cmd, check=True)
    print(f"  ✓ téléchargé {dest.name}")


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    ok = 0

    for slug, code in REELS.items():
        print(f"→ reel {slug} ({code})")
        try:
            download_reel(slug, code)
            ok += 1
        except subprocess.CalledProcessError:
            print(f"  ✗ échec reel {slug}", file=sys.stderr)

    for slug, image in GENERATED.items():
        print(f"→ boucle {slug}")
        try:
            ken_burns(slug, image)
            ok += 1
        except subprocess.CalledProcessError:
            print(f"  ✗ échec boucle {slug}", file=sys.stderr)

    print(f"\n{ok}/{len(REELS) + len(GENERATED)} vidéos prêtes dans {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
