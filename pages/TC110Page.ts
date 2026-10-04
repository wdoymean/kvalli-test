import { Locator, Page } from '@playwright/test';

export class TC110Page {
  readonly page: Page;
  readonly createOrderButton: Locator;
  readonly amountInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createOrderButton = this.page.getByRole('button', { name: 'Create Order' }).first();
    this.amountInput = this.page.getByPlaceholder('Enter amount').first();
    this.submitButton = this.page.getByLabel('Submit').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/create-order');
  }
}