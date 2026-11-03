// Captures the first-visit intro at exact timeline points and through the Enter fly-through.
// CSS animations are paused and seeked via the Web Animations API, and the page clock is faked,
// so frames are deterministic regardless of machine speed.
// Usage: node scripts/screenshot-intro.mjs [baseUrl] [--out=dir] [--viewports=WxH,...]
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const base = args.find((a) => !a.startsWith('--')) ?? 'http://localhost:3100';
const out = args.find((a) => a.startsWith('--out='))?.slice(6) ?? 'output/intro';
const viewports = (args.find((a) => a.startsWith('--viewports='))?.slice(12) ?? '1920x1080,1440x900,768x1024,390x844')
  .split(',')
  .map((v) => v.split('x').map(Number));
const FRAMES = [0, 400, 900, 1400, 2000, 4000];
const ENTER_FRAMES = [150, 400, 600, 750];

const seek = (page, ms) =>
  page.evaluate((t) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = t;
    }
  }, ms);

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
for (const [width, height] of viewports) {
  for (const reduced of [false, true]) {
    if (reduced && width !== 1920 && width !== 390) continue;
    const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage();
    if (reduced) await page.addInitScript(() => sessionStorage.setItem('overbid.intro.replay.v1', '1'));
    await page.clock.install();
    await page.goto(base + '/', { waitUntil: 'load', timeout: 90_000 });
    await page.locator('dialog[data-state]').waitFor({ state: 'visible', timeout: 15_000 });
    await page.evaluate(() =>
      Promise.race([
        Promise.all([...document.querySelectorAll('dialog img')].map((i) => i.decode().catch(() => {}))),
        new Promise((r) => setTimeout(r, 4000)),
      ]),
    );
    const tag = `${width}x${height}${reduced ? '-reduced' : ''}`;
    for (const t of reduced ? [0] : FRAMES) {
      await seek(page, t);
      await page.screenshot({ path: `${out}/intro-${tag}-t${t}.png` });
    }
    if (!reduced) {
      await seek(page, 6000);
      await page.evaluate(() =>
        document.getAnimations().forEach((a) => {
          try {
            a.finish();
          } catch {
            a.play(); // infinite ambient loops cannot finish
          }
        }),
      );
      await page.clock.pauseAt(Date.now() + 10_000); // dismiss timer only fires on runFor below
      await page.getByRole('button', { name: 'Enter OVERBID' }).click();
      await page.waitForFunction(() => document.querySelector('dialog[data-state="entering"]'));
      for (const t of ENTER_FRAMES) {
        await page.evaluate((ms) => {
          for (const a of document.getAnimations()) {
            if (a.playState === 'finished' && a instanceof CSSAnimation && a.animationName !== 'flash') continue;
            a.pause();
            a.currentTime = ms;
          }
        }, t);
        await page.screenshot({ path: `${out}/intro-${tag}-enter${t}.png` });
      }
      await page.clock.runFor(1000);
      await page.waitForTimeout(100);
      const open = await page.locator('dialog[open]').count();
      console.log(`${tag} after enter: dialog open=${open}, focused=${await page.evaluate(() => document.activeElement?.id)}`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log('intro frames in', out);
