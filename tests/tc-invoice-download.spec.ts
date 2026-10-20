import { test, expect } from "@playwright/test";
import { OrderPage } from "./pages/Order.page";

test.describe("Order invoice", () => {
  test("the invoice of a paid order can be downloaded from its page", async ({ page }) => {
    const orderId = 42;
    const orderPage = new OrderPage(page, orderId);

    await test.step("Given the page of the paid order 42 is open", async () => {
      await orderPage.goto();
      await expect(orderPage.heading).toBeVisible();
    });

    await test.step("When the user presses the \"Download invoice\" button", async () => {
      await orderPage.downloadInvoice();
    });

    await test.step("Then the message that the invoice is ready is shown", async () => {
      await expect(orderPage.invoiceReadyMessage).toBeVisible();
    });
  });
});
