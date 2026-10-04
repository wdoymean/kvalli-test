// Test specification...
import { test, expect } from '@playwright/test';
test('Declined card leaves the order in PAYMENT_FAILED', async ({ page }) => {
  await TC110Page.goto(page);
  const orderPendingPayment = await TC110Page.createOrderButton.click();
  await TC110Page.amountInput.fill('5.99');
  await TC110Page.submitButton.click();

  // Step 2: Charge a card that the gateway declines
  const chargeButton = page.getByRole('button', { name: 'Charge' }).first();
  await expect(chargeButton).toBeClickable({ timeout: 5000 });
  await chargeButton.click();

  // Expected Result checks
  await expect(page).toHaveTitle(/Payment Required/);
  const status402 = await page.getByRole('status').textContent();
  expect(status402).toContain('Payment Required');
  await expect(page.getByText(/Order Status: PAYMENT_FAILED/i)).toBeVisible({ timeout: 5000 });
});