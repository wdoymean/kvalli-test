import { test, expect } from "@playwright/test";

test("cancelling a shipped order is refused with 409", async ({ request }) => {
  const res = await request.post("/api/v2/orders/7/cancel", { data: { reason: "too late" } });
  expect(res.status()).toBe(409);
});
