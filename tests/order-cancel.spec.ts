import { test, expect } from "@playwright/test";

test("TC-729 an order can be cancelled from its page", async ({ page }) => {
  await page.goto("/orders/44");
  await page.getByLabel("Reason for cancelling").fill("changed my mind");
  await page.getByRole("button", { name: "Cancel order" }).click();
  await expect(page.getByTestId("order-status")).toHaveText("cancelled");
  await expect(page.getByRole("status")).toContainText("Order cancelled");
});
