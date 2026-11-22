"""Render poster.html to entry.png with headless Chromium (Playwright build).

The poster is laid out at exactly 1024x1024. We screenshot it in a taller
window (this Chromium drops the bottom rows at exactly 1024), crop the top
1024x1024, then verify the PNG against the competition caps.
"""

import glob
import os
import subprocess

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
HTML = os.path.join(HERE, "poster.html")
PNG = os.path.join(HERE, "entry.png")
PREVIEW = os.path.join(HERE, "entry-512.png")
THUMB = os.path.join(HERE, "entry-300.png")
CAP = 1_048_576


def chromium_path():
    env = os.environ.get("POSTER_CHROMIUM")
    if env and os.path.exists(env):
        return env
    cache = os.path.expanduser("~/.cache/ms-playwright")
    hits = sorted(
        glob.glob(os.path.join(cache, "chromium-*", "chrome-linux*", "chrome")),
        reverse=True,
    )
    if hits:
        return hits[0]
    raise SystemExit("no chromium found under ~/.cache/ms-playwright")


def main():
    raw = os.path.join(HERE, ".render-raw.png")
    subprocess.run(
        [
            chromium_path(),
            "--headless=new", "--no-sandbox", "--disable-gpu",
            "--hide-scrollbars", "--force-device-scale-factor=1",
            "--window-size=1024,1350",
            "--screenshot=" + raw,
            "file://" + HTML,
        ],
        check=True,
    )
    img = Image.open(raw).crop((0, 0, 1024, 1024))
    img.save(PNG)
    img.resize((512, 512)).save(PREVIEW)
    img.resize((300, 300)).save(THUMB)
    os.remove(raw)
    size = os.path.getsize(PNG)
    print(f"entry.png {img.size[0]}x{img.size[1]}, {size} bytes (cap {CAP})")
    assert img.size == (1024, 1024) and size <= CAP


if __name__ == "__main__":
    main()
