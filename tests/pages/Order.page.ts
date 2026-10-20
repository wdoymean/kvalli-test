import type { Locator, Page } from "@playwright/test";

export class OrderPage {
  readonly page: Page;
  readonly orderId: number;
  readonly heading: Locator;
  readonly downloadInvoiceBtn: Locator;
  readonly invoiceReadyMessage: Locator;

  constructor(page: Page, orderId: number) {
    this.page = page;
    this.orderId = orderId;
    this.heading = page.getByRole("heading", { name: `Order ${orderId}`, exact: true });
    this.downloadInvoiceBtn = page.getByRole("button", { name: "Download invoice" });
    this.invoiceReadyMessage = page.getByText(`Invoice for order ${orderId} is ready.`, { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(`/orders/${this.orderId}`);
  }

  async downloadInvoice(): Promise<void> {
    await this.downloadInvoiceBtn.click();
  }
}
