// Test specification...
import { expect } from '@playwright/test';

export default async function tc110() {
  const page = await global.page;
  await page.goto('/create-order');
  const orderPage = new TC110Page(page);
  const order = await orderPage.createOrder();
  await page.click('[data-testid=