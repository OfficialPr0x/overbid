import type { Page } from '@playwright/test';

/** Mark the first-visit intro as seen so tests start on the homepage itself. */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    try {
      window.sessionStorage.setItem('overbid.intro.seen.v1', '1');
    } catch {
      /* storage disabled in this test */
    }
  });
}
