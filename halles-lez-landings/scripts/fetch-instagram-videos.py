#!/usr/bin/env python3
"""Télécharge les reels Instagram promo pour les fonds hero (yt-dlp requis)."""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "videos"

# slug -> reel shortcode (instagram.com/reel/<code>/)
REELS: dict[str, str] = {
    "rouge-beef": "DHjRz6kJPFt",
    "manita": "DZHofvnu4AA",
    "naked": "DLztz2YN_Eg",
    "blue-india": "DNz4_yAVLIp",
    "banger": "DTm41qzjLAk",
    "casa-asado": "DHvXGV_sNYu",
    "maria-bonita": "DRNECcyCk5R",
    "bambino-tonton": "C76Nw3JNk2P",
}


def main() -> int:
    ytdlp = shutil.which("yt-dlp")
    if not ytdlp:
        print("yt-dlp introuvable — installez-le: pip install yt-dlp", file=sys.stderr)
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    ok = 0
    for slug, code in REELS.items():
        dest = OUT / f"{slug}.mp4"
        url = f"https://www.instagram.com/reel/{code}/"
        print(f"→ {slug} ({code})")
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
        try:
            subprocess.run(cmd, check=True)
            ok += 1
        except subprocess.CalledProcessError:
            print(f"  ✗ échec: {url}", file=sys.stderr)

    print(f"\n{ok}/{len(REELS)} reels téléchargés dans {OUT}")
    print("Soleira & La Bodeguita : générer avec ffmpeg (voir README) si reels inaccessibles.")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
