import { expect, test } from '@playwright/test';

test.describe('first-visit intro', () => {
  test('shows once per session, Enter dismisses and focuses the h1', async ({ page }) => {
    await page.goto('/');
    const gate = page.getByRole('dialog', { name: /./ });
    await expect(gate).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(gate).toBeHidden();
    await expect(page.locator('h1')).toBeFocused();
    await page.reload();
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toHaveCount(0);
  });

  test('Escape skips the intro', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toHaveCount(0);
  });

  test('deep links bypass the intro', async ({ page }) => {
    await page.goto('/#buyers');
    await expect(page.locator('#buyers h2')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toHaveCount(0);
  });

  test('reduced motion bypasses the intro', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toHaveCount(0);
    await ctx.close();
  });

  test('footer replay shows the intro again', async ({ page }) => {
    await page.goto('/#introduction');
    await page.getByRole('button', { name: /replay intro/i }).click();
    await expect(page.getByRole('button', { name: 'Enter OVERBID' })).toBeVisible();
  });
});
