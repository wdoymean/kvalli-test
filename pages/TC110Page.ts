// Page Object class...
import { Page } from '@playwright/test';
class TC110Page {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static goto(page: Page): Promise<void> {
    return page.goto('/create-order');
  }

  createOrderButton = this.page.getByRole('button', { name: 'Create Order' }).first();
  amountInput = this.page.getByPlaceholder('Enter amount').first();
  submitButton = this.page.getByLabel('Submit').first();
}