// Regenerates the responsive variants served from public/ out of the full-res
// files in masters/. One-off: `node scripts/build-images.mjs` after adding or
// replacing a master. Not wired into `npm run build` — the outputs are committed.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// [master dir, output dir, base width, 2x width]
const JOBS = [
  ['masters/photography', 'public/photography', 800, 1200],
  ['masters/photography-hq', 'public/photography/hq', 800, 1200],
  ['masters/about', 'public/about', 800, 1600],
];

// Both tiers are rendered at least 2x smaller than they are decoded (the widest
// grid slot is ~390 CSS px), so compression artifacts get scaled away. The 2x
// tier is downscaled harder still, hence the lower quality.
const Q_1X = 76;
const Q_2X = 68;

const emit = async (src, out, width, quality) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(out);
  return (await sharp(out).metadata()).width;
};

let short = [];
for (const [from, to, w1x, w2x] of JOBS) {
  for (const f of fs.readdirSync(from).filter((f) => f.endsWith('.webp'))) {
    const src = path.join(from, f);
    await emit(src, path.join(to, f), w1x, Q_1X);
    const got = await emit(src, path.join(to, '2x', f), w2x, Q_2X);
    if (got < w2x) short.push(`${src} 2x is ${got}w, srcset claims ${w2x}w`);
  }
  console.log(`${from} -> ${to} (${w1x}w + 2x/${w2x}w)`);
}
// A master narrower than the 2x target makes the srcset descriptor a lie and
// the browser picks the wrong file. Loud on purpose.
if (short.length) { console.error('\nUNDERSIZED MASTERS:\n' + short.join('\n')); process.exit(1); }
console.log('ok');

// Check: every src in photoDatabase must resolve to both an 800w file and the
// 1200w twin that Photography.jsx's srcset points at. Fails loudly if a photo
// is added to the JSON without a master, or if the 2x/ convention drifts.
const db = JSON.parse(fs.readFileSync('src/data/photoDatabase.json', 'utf8'));
const missing = Object.values(db)
  .flat()
  .flatMap(({ src }) => [src, src.replace(/\/([^/]+)$/, '/2x/$1')])
  .filter((u) => !fs.existsSync('public' + u));
if (missing.length) { console.error('MISSING VARIANTS:\n' + [...new Set(missing)].join('\n')); process.exit(1); }
console.log(`verified ${Object.values(db).flat().length} photoDatabase entries`);
