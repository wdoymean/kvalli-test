import { expect, type Locator, type Page } from "@playwright/test";

export class OrderPage {
  readonly page: Page;
  readonly reasonInput: Locator;
  readonly cancelBtn: Locator;
  readonly cancelledMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reasonInput = page.getByLabel("Reason for cancelling");
    this.cancelBtn = page.getByRole("button", { name: "Cancel the order" });
    this.cancelledMessage = page.getByText("Order cancelled. The refund is pending.");
  }

  async goto(orderId: number): Promise<void> {
    await this.page.goto(`/orders/${orderId}`);
  }

  heading(orderId: number): Locator {
    return this.page.getByRole("heading", { name: `Order ${orderId}` });
  }

  statusText(status: string): Locator {
    return this.page.getByText(new RegExp(`Status:\\s*${status}`));
  }

  async cancelOrder(reason: string): Promise<void> {
    await this.reasonInput.fill(reason);
    await expect(this.cancelBtn).toBeEnabled();
    await this.cancelBtn.click();
  }
}
