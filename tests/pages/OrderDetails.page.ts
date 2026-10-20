import type { Locator, Page } from "@playwright/test";

export class OrderDetailsPage {
  readonly page: Page;
  readonly reasonInput: Locator;
  readonly cancelBtn: Locator;
  readonly cancelledMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reasonInput = page.getByLabel("Reason for cancelling");
    this.cancelBtn = page.getByRole("button", { name: "Cancel order" });
    this.cancelledMessage = page.getByText("Order cancelled. The refund is pending.");
  }

  async open(orderId: number) {
    await this.page.goto(`/orders/${orderId}`);
  }

  heading(orderId: number): Locator {
    return this.page.getByRole("heading", { name: `Order ${orderId}` });
  }

  statusText(status: string): Locator {
    return this.page.getByText(new RegExp(`Status:\\s*${status}`, "i"));
  }

  async cancelOrder(reason: string) {
    await this.reasonInput.fill(reason);
    await this.cancelBtn.click();
  }
}
