import { test, expect } from "@playwright/test";

test.describe("GET /api/v2/orders/:id/invoice", () => {
  test("GET /api/v2/orders/42/invoice → 200 (OK) returns the invoice of a paid order", async ({ request }) => {
    // Given: order 42 exists and is paid (same fixture data as the existing orders.spec.ts)
    const orderId = "42";

    // When: the invoice of the order is requested
    const res = await request.get(`/api/v2/orders/${orderId}/invoice`);

    // Then: the status code is 200
    expect(res.status()).toBe(200);

    // And: the response is JSON
    expect(res.headers()["content-type"]).toContain("application/json");

    // And: the body is a JSON object that belongs to the requested order
    const body = await res.json();
    expect(body).not.toBeNull();
    expect(typeof body).toBe("object");
    expect(Array.isArray(body)).toBe(false);
    expect(body).toHaveProperty("orderId");
    expect(typeof body.orderId).toBe("string");
    expect(body.orderId).toBe(orderId);
  });
});
