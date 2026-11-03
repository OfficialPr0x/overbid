import { expect, test } from '@playwright/test';
import { skipIntro } from './helpers';

const CHAPTERS = ['home', 'approach', 'founders', 'buyers', 'opportunities', 'trust', 'introduction'];

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => skipIntro(page));

  test('renders seven chapters in order with one h1', async ({ page }) => {
    await page.goto('/');
    const ids = await page.locator('main > section[id]').evaluateAll((els) => els.map((e) => e.id));
    expect(ids).toEqual(CHAPTERS);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('You built the empire.');
  });

  test('both conversion paths are reachable from the hero', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('#home');
    await expect(hero.getByRole('link', { name: 'List Your Business' })).toHaveAttribute('href', '/sell');
    await expect(hero.getByRole('link', { name: 'Explore Businesses' })).toHaveAttribute('href', '/businesses');
  });

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('approach dialog opens, traps focus inside, closes on Escape and restores focus', async ({ page }) => {
    await page.goto('/#approach');
    const trigger = page.getByRole('button', { name: 'See our approach' });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('opportunity chips filter the preview and announce the count', async ({ page }) => {
    await page.goto('/#opportunities');
    const section = page.locator('#opportunities');
    const chip = section.getByRole('group', { name: 'Filter by category' }).getByRole('button', { name: 'Services', exact: true });
    await chip.click();
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(section.getByRole('heading', { name: 'Recurring IT Services' })).toBeVisible();
    await expect(section.getByRole('heading', { name: 'B2B Workflow SaaS' })).toHaveCount(0);
    await expect(section.getByRole('status')).toContainText('1');
  });

  test('buyer finder submits to the marketplace with URL filters', async ({ page }) => {
    await page.goto('/#buyers');
    const form = page.getByRole('form', { name: 'Find opportunities' });
    await form.getByLabel('Industry').selectOption('services');
    await form.getByLabel('Location').selectOption('us');
    await form.getByRole('button', { name: /Explore Opportunities/ }).click();
    await expect(page).toHaveURL(/\/businesses\?.*category=services/);
    await expect(page.getByRole('heading', { name: 'Recurring IT Services' })).toBeVisible();
  });
});

test.describe('introduction form', () => {
  test.beforeEach(async ({ page }) => skipIntro(page));

  test('invalid submit shows summary and focuses the first invalid field', async ({ page }) => {
    await page.goto('/#introduction');
    const form = page.getByRole('form', { name: 'Request a private introduction' });
    await form.getByRole('button', { name: 'Request a Private Introduction' }).click();
    await expect(form.getByRole('alert')).toBeVisible();
    await expect(form.getByLabel('Full name')).toBeFocused();
    await expect(form.getByLabel('Full name')).toHaveAttribute('aria-invalid', 'true');
  });

  test('valid submit shows the demo notice and never claims success', async ({ page }) => {
    await page.goto('/#introduction');
    const form = page.getByRole('form', { name: 'Request a private introduction' });
    await form.getByLabel('Full name').fill('Test Person');
    await form.getByLabel('Work email').fill('test@example.com');
    await form.getByLabel('What are you planning?').fill('Exploring a sale of a small SaaS business next year.');
    await form.getByRole('button', { name: 'Request a Private Introduction' }).click();
    await expect(form.getByText('Demo only — your message has not been sent.')).toBeVisible();
    await expect(page.getByText(/thank you|we'll be in touch|received/i)).toHaveCount(0);
    await expect(form.getByLabel('Full name')).toHaveValue('Test Person');
  });

  test('?intent=buyer preselects the buyer path', async ({ page }) => {
    await page.goto('/?intent=buyer#introduction');
    await expect(page.getByRole('radio', { name: 'I want to buy' })).toBeChecked();
  });
});
