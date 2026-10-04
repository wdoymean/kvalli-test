import { test, expect } from '@playwright/test';
import { TC110Page } from '../pages/TC110Page';

test('Declined card leaves the order in PAYMENT_FAILED', async ({ page }) => {
  const tc110Page = new TC110Page(page);
  await tc110Page.goto();
  await tc110Page.createOrderButton.click();
  await tc110Page.amountInput.fill('5.99');
  await tc110Page.submitButton.click();

  // Step 2: Charge a card that the gateway declines
  const chargeButton = page.getByRole('button', { name: 'Charge' }).first();
  await expect(chargeButton).toBeEnabled({ timeout: 5000 });
  await chargeButton.click();

  // Expected Result checks
  await expect(page).toHaveTitle(/Payment Required/);
  const status402 = await page.getByRole('status').textContent();
  expect(status402).toContain('Payment Required');
  await expect(page.getByText(/Order Status: PAYMENT_FAILED/i)).toBeVisible({ timeout: 5000 });
});