import { expect, test } from '@playwright/test';

test.describe('marketplace', () => {
  test('filters live in the URL and survive back/forward', async ({ page }) => {
    await page.goto('/businesses');
    await expect(page.getByRole('status')).toContainText('3 of 3');
    await page.getByLabel('Industry').selectOption('ecommerce');
    await expect(page).toHaveURL(/category=ecommerce/);
    await expect(page.getByRole('status')).toContainText('1 of 3');
    await page.goBack();
    await expect(page).not.toHaveURL(/category=/);
    await expect(page.getByRole('status')).toContainText('3 of 3');
    await page.goForward();
    await expect(page.getByLabel('Industry')).toHaveValue('ecommerce');
  });

  test('search is debounced into the URL and empty state can reset', async ({ page }) => {
    await page.goto('/businesses');
    await page.getByLabel('Search').fill('zzzz-no-match');
    await expect(page).toHaveURL(/q=zzzz-no-match/);
    await expect(page.getByText('No sample listings match these filters.')).toBeVisible();
    await page.getByRole('button', { name: 'Reset all filters' }).click();
    await expect(page.getByRole('status')).toContainText('3 of 3');
    await expect(page.getByLabel('Search')).toHaveValue('');
  });

  test('invalid URL values are ignored', async ({ page }) => {
    await page.goto('/businesses?category=crypto&location=mars&min=abc');
    await expect(page.getByRole('status')).toContainText('3 of 3');
  });

  test('bookmarks persist on this device and appear on /saved', async ({ page }) => {
    await page.goto('/businesses');
    const save = page.getByRole('button', { name: 'Save B2B Workflow SaaS' });
    await save.click();
    await expect(save).toHaveAttribute('aria-pressed', 'true');
    await page.goto('/saved');
    await expect(page.getByRole('heading', { name: 'B2B Workflow SaaS' })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { name: 'B2B Workflow SaaS' })).toBeVisible();
  });

  test('bookmarks degrade to memory when storage is blocked', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('blocked', 'SecurityError');
        },
      });
    });
    await page.goto('/businesses');
    await expect(page.getByText(/Storage is unavailable/)).toBeVisible();
    const save = page.getByRole('button', { name: 'Save B2B Workflow SaaS' });
    await save.click();
    await expect(save).toHaveAttribute('aria-pressed', 'true');
  });

  test('detail page labels data honestly and simulates the information request', async ({ page }) => {
    await page.goto('/businesses/sample-b2b-workflow-saas');
    await expect(page.locator('h1')).toHaveText('B2B Workflow SaaS');
    await expect(page.getByText(/illustrative, not verified/)).toBeVisible();
    const trigger = page.getByRole('button', { name: /information/i }).first();
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Information request — simulation' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Close simulation' }).click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('unknown listing returns 404', async ({ page }) => {
    const res = await page.goto('/businesses/does-not-exist');
    expect(res?.status()).toBe(404);
  });
});
