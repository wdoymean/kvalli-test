import { test, expect } from "@playwright/test";

test.describe("GET /api/v2/orders/:id", () => {
  test("GET /api/v2/order/42 → 200 (OK) returns a paid order", async ({ request }) => {
    // Given: order 42 exists, is paid and is owned by ada
    const orderId = "42";

    // When: the order is requested by id
    const res = await request.get(`/api/v2/orders/${orderId}`);

    // Then: the status code is 200
    expect(res.status()).toBe(200);

    // And: the response is JSON
    expect(res.headers()["content-type"]).toContain("application/json");

    // And: the body matches the expected schema structure
    const body = await res.json();
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        status: expect.any(String),
        owner: expect.any(String),
      })
    );

    // And: the body has the expected values
    expect(body.id).toBe(orderId);
    expect(body.status).toBe("paid");
    expect(body.owner).toBe("ada");
  });
});