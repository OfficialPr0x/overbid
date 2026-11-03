import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { skipIntro } from './helpers';

const ROUTES = ['/', '/businesses', '/businesses/sample-b2b-workflow-saas', '/sell', '/saved', '/about', '/privacy', '/terms'];

for (const route of ROUTES) {
  test(`axe: ${route} has no serious or critical violations`, async ({ page }) => {
    await skipIntro(page);
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
}

test('mobile menu: opens as dialog, Escape closes and restores focus', async ({ page }) => {
  await skipIntro(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();
  await expect(page.locator('header button[aria-haspopup="dialog"]')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('skip link moves focus to main content', async ({ page }) => {
  await skipIntro(page);
  await page.goto('/businesses');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: /skip to/i });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main/);
});
