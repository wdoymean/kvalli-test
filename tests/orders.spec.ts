import { test, expect } from "@playwright/test";

test("a paid order can be read", async ({ request }) => {
  const res = await request.get("/api/v2/orders/42");
  expect(res.status()).toBe(200);
});

test("cancelling a paid order returns cancelled", async ({ request }) => {
  const res = await request.post("/api/v2/orders/42/cancel", { data: { reason: "changed my mind" } });
  expect(res.status()).toBe(200);
  expect((await res.json()).status).toBe("cancelled");
});
