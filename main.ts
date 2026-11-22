// Daily Atlas poster entrypoint.
// The grader executes this file and expects the committed poster
// image to appear at /output/entry.png, byte for byte unchanged.

import { access, copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const posterSource = join(scriptDir, "entry.png");
const targetDir = "/output";
const posterTarget = join(targetDir, "entry.png");

async function publishPoster() {
  try {
    await access(posterSource);
  } catch {
    throw new Error(`committed poster is missing: ${posterSource}`);
  }
  await mkdir(targetDir, { recursive: true });
  await copyFile(posterSource, posterTarget);
  const info = await stat(posterTarget);
  console.log(`poster delivered: ${posterSource} -> ${posterTarget} (${info.size} bytes)`);
}

try {
  await publishPoster();
} catch (err) {
  console.error("failed to publish poster:", err);
  process.exit(1);
}
