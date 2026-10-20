import { Page, Locator, expect } from '@playwright/test';

export class TC730Page {
  readonly page: Page;
  readonly submitBtn: Locator;
  readonly resultBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitBtn = page.getByRole('button', { name: /submit|save|confirm/i });
    this.resultBadge = page.getByTestId('status-result-badge');
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async executeScenarioAction() {
    await expect(this.submitBtn).toBeVisible({ timeout: 5000 });
    await this.submitBtn.click();
  }

  async verifyExpectedOutcome() {
    await expect(this.resultBadge).toBeVisible();
  }

  async cleanup() {
    await this.page.context().clearCookies();
  }
}