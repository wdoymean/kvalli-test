// Page Object class...
import { expect } from '@playwright/test';

export default class TC110Page {
  async createOrder(page) {
    await page.goto('/create-order');
    return page;
  }
}