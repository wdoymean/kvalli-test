import { test, expect } from "@playwright/test";
import { OrderDetailsPage } from "./pages/OrderDetails.page";

// Note: order 44 is pre-seeded test data (not created by this test), so there is no created resource to tear down here.
// The data set must reset order 44 to "paid" before each run.
test.describe("Order page", () => {
  test("UI-A: an order can be cancelled from its page", async ({ page }) => {
    const orderPage = new OrderDetailsPage(page);

    // Given: the paid order 44 is open
    await orderPage.open(44);
    await expect(orderPage.heading(44)).toBeVisible();
    await expect(orderPage.statusText("paid")).toBeVisible();

    // When: the user enters a reason and presses "Cancel order"
    await orderPage.cancelOrder("changed my mind");

    // Then: the confirmation is shown and the status reads cancelled
    await expect(orderPage.cancelledMessage).toBeVisible();
    await expect(orderPage.statusText("cancelled")).toBeVisible();
  });
});
