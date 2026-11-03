// Converts owner-supplied plates in Reference-Guidelines/assets into web masters under public/media.
// next/image resizes these per viewport; the reference folder itself is never served.
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'Reference-Guidelines/assets';
const OUT = 'public/media';

const PLATES = [
  { id: 'A01', src: 'Obsidian Triangle Gateway with Lime Edges-1.png', out: 'hero-gateway.webp' },
  { id: 'A03', src: 'Obsidian Key with Brass Geometry-2.png', out: 'sculptural-key.webp' },
  { id: 'A04', src: 'Floating Luxury Dossier Trio-3.png', out: 'archive-dossiers.webp' },
  { id: 'A05', src: 'Obsidian dossier with lime accent-4.png', out: 'trust-dossier.webp' },
  { id: 'A06', src: 'Ascending ivory slabs with lime accent-5.png', out: 'listing-software.webp' },
  { id: 'A07', src: 'Luxury Ivory Blocks, Acid Lime Accent-6.png', out: 'listing-commerce.webp' },
  { id: 'A08', src: 'Three Ribbons in Rising Harmony-7.png', out: 'listing-services.webp' },
];

await mkdir(OUT, { recursive: true });
for (const p of PLATES) {
  const input = path.join(SRC, p.src);
  const output = path.join(OUT, p.out);
  const info = await sharp(input).removeAlpha().webp({ quality: 88, effort: 6, smartSubsample: true }).toFile(output);
  const kb = Math.round((await stat(output)).size / 1024);
  console.log(`${p.id} ${p.out} ${info.width}x${info.height} ${kb}KB`);
}
