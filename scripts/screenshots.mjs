// Captures implementation screenshots for visual QA.
// Usage: node scripts/screenshots.mjs [baseUrl] [--sections] [--viewports=1920x1080,390x844] [--out=dir] [--paths=/,/sell]
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const args = process.argv.slice(2);
const base = args.find((a) => !a.startsWith('--')) ?? 'http://localhost:3100';
const opt = (name, fallback) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? fallback;
const sections = args.includes('--sections');
const reduced = args.includes('--reduced');
const out = opt('out', 'docs/screenshots/latest');
const viewports = opt('viewports', '1920x1080,1440x900,1024x768,768x1024,390x844,360x800')
  .split(',')
  .map((v) => v.split('x').map(Number));
const paths = opt('paths', '/').split(',');
const SECTION_IDS = ['home', 'approach', 'founders', 'buyers', 'opportunities', 'trust', 'introduction'];

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const [w, h] of viewports) {
  const context = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  // Skip the first-visit intro for page captures; the intro has its own capture.
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem('overbid.intro.seen.v1', '1');
    } catch {}
  });
  const page = await context.newPage();
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const slug = p === '/' ? 'home' : p.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.warn(`OVERFLOW ${overflow}px at ${w}x${h} ${p}`);
    await page.screenshot({ path: `${out}/${slug}-${w}x${h}-full.png`, fullPage: true });
    if (sections && p === '/') {
      for (const id of SECTION_IDS) {
        await page.evaluate((sid) => {
          const el = document.getElementById(sid);
          if (!el) return;
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, sid === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY);
        }, id);
        await page.waitForTimeout(250);
        await page.screenshot({ path: `${out}/section-${id}-${w}x${h}.png` });
      }
    }
  }
  await context.close();
  console.log(`captured ${w}x${h}`);
}
await browser.close();
