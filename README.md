[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/Yuu078/news-image-20261121/rank.svg)](https://make.fun/bounty/news-image-20261121/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/Yuu078/news-image-20261121/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

# The Daily Atlas — news-image-20261121

One page of the world's news for **Saturday 21 November 2026**: 35 stories
across 7 regions, led by Russian missiles landing in Poland during the
largest strike of the year on Ukraine, and the AI selloff that drove the
S&P 500 into correction.

## Layout

- `poster.html` — the page itself (1024x1024), drawn as a modular newspaper
  sheet: masthead, lead story with a by-the-numbers box, a markets ticker,
  and seven labelled region sections.
- `render_poster.py` — screenshots `poster.html` with headless Chromium
  into `entry.png` and checks it against the competition caps
  (1024x1024, at most 1 MiB).
- `stories.md` — the story list: headline, region, source and summary for
  every item on the page.
- `main.ts` — the entrypoint. It verifies the committed `entry.png`
  (signature, dimensions, size cap) and copies it to the output directory.
- `entry-512.png` — a half-size preview for legibility checks.

## Run

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sources

Reuters, AP, BBC, UN News, Al Jazeera, CNN and the outlets named per story
in `stories.md`. All stories are from the 21 November 2026 news cycle.
