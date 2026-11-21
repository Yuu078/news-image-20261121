// THE DAILY ATLAS — entrypoint for news-image-20261121.
//
// The poster ships in this repository as entry.png: one 1024x1024 page
// drawn from poster.html (render_poster.py screenshots it with headless
// Chromium at authoring time). At grading time there is no browser in the
// sandbox, so this program verifies the committed page — PNG signature,
// dimensions, the 1 MiB cap — and copies it to the output directory.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CAP_BYTES = 1024 * 1024;
const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const page = readFileSync(join(here, "entry.png"));

if (page.length > CAP_BYTES) fail(`entry.png is ${page.length} bytes, over the 1 MiB cap`);
if (SIGNATURE.some((byte, i) => page[i] !== byte)) fail("entry.png is not a PNG");

// IHDR width and height sit at byte offsets 16 and 20, big-endian.
const width = page.readUInt32BE(16);
const height = page.readUInt32BE(20);
if (width !== 1024 || height !== 1024) fail(`entry.png is ${width}x${height}, expected 1024x1024`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), page);
console.log(`entry.png written to ${outDir} (${page.length} bytes)`);
