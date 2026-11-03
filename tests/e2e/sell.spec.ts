import { expect, test } from '@playwright/test';

test('listing wizard validates, retains values on Back, and never publishes', async ({ page }) => {
  await page.goto('/sell');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('Please fix the highlighted fields to continue.')).toBeVisible();
  await expect(page.getByLabel('Category')).toBeFocused();

  await page.getByLabel('Category').selectOption('SaaS');
  await page.getByLabel('Listing title').fill('Vertical SaaS for clinics');
  await page.getByLabel('General location').selectOption('Canada');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('heading', { name: 'Step 2 of 4: Financials' })).toBeFocused();

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('Listing title')).toHaveValue('Vertical SaaS for clinics');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByLabel('Financial period').fill('FY2025');
  await page.getByLabel(/Annual revenue/).fill('900000');
  await page.getByLabel(/Asking price/).fill('2000000');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByText('Withhold my identity').click();
  await page.getByText('Approve each access request').click();
  await page.getByRole('button', { name: 'Review draft' }).click();

  await expect(page.getByText('Demo draft — not published')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Publish listing' })).toBeDisabled();

  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: /Export draft/ }).click();
  expect((await download).suggestedFilename()).toBe('overbid-demo-draft.json');
});
