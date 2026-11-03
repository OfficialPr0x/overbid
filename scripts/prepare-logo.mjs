// Derives transparent web exports from the approved raster logo without redrawing it.
// Pixels are keyed against the near-black source background (colour-to-alpha), so
// contours stay exactly as supplied. Re-run: `npm run assets:logo`.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SOURCE = 'Reference-Guidelines/00-approved-logo.png';
const OUT = 'public/brand';
// Source background sits at max-channel 3-4 with noise to ~12; solid ivory/lime fills are >= 240.
const BG_LEVEL = 10;
const SOLID_LEVEL = 236;

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

function keyed(region) {
  const { left, top, width, height, keep } = region;
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sx = left + x;
      const sy = top + y;
      const i = (sy * W + sx) * 3;
      const o = (y * width + x) * 4;
      if (keep && !keep(sx, sy)) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const m = Math.max(r, g, b);
      const a = Math.min(1, Math.max(0, (m - BG_LEVEL) / (SOLID_LEVEL - BG_LEVEL)));
      if (a === 0) continue;
      out[o] = Math.min(255, Math.round(r / a));
      out[o + 1] = Math.min(255, Math.round(g / a));
      out[o + 2] = Math.min(255, Math.round(b / a));
      out[o + 3] = Math.round(a * 255);
    }
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function trimmed(region) {
  const buf = await keyed(region).png().toBuffer();
  return sharp(buf).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toBuffer();
}

await mkdir(OUT, { recursive: true });

const full = await trimmed({ left: 0, top: 0, width: W, height: H });
// Mark only: the triangle base overlaps the wordmark's "O" column range, so above y=500
// everything right of x=612 belongs to the wordmark.
const mark = await trimmed({
  left: 0, top: 0, width: 668, height: H,
  keep: (x, y) => x < 612 || y >= 500,
});

const report = {};
for (const [name, buf, widths] of [
  ['overbid-logo', full, [1040]],
  ['overbid-mark', mark, [640]],
]) {
  const meta = await sharp(buf).metadata();
  await writeFile(`${OUT}/${name}.png`, buf);
  for (const w of widths) {
    const webp = await sharp(buf).resize({ width: w }).webp({ quality: 92, alphaQuality: 100 }).toBuffer();
    await writeFile(`${OUT}/${name}-${w}.webp`, webp);
    report[`${name}-${w}.webp`] = webp.length;
  }
  report[`${name}.png`] = { width: meta.width, height: meta.height, bytes: buf.length };
}
console.log(JSON.stringify(report, null, 2));
