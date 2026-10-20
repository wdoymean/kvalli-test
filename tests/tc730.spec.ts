import { test, expect } from "@playwright/test";
import { OrderPage } from "./pages/order.page";

// Note: the test cancels the pre-seeded paid order 44. No resource is created,
// and the repository exposes no API to restore an order, so there is nothing to tear down here.
// The environment must re-seed order 44 as "paid" before each run.

test.describe("Order cancellation", () => {
  test("UI-F: an order can be cancelled from its page", async ({ page }) => {
    const orderPage = new OrderPage(page);

    // Given the paid order 44 is open
    await orderPage.goto(44);
    await expect(orderPage.heading(44)).toBeVisible();
    await expect(orderPage.statusText("paid")).toBeVisible();

    // When the user enters a reason and cancels the order
    await orderPage.cancelOrder("changed my mind");

    // Then the confirmation is shown and the status is cancelled
    await expect(orderPage.cancelledMessage).toBeVisible();
    await expect(orderPage.statusText("cancelled")).toBeVisible();
  });
});
