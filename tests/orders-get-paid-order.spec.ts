import { test, expect } from "@playwright/test";

test.describe("GET /api/v2/order/{id}", () => {
  test("GET /api/v2/order/42 → 200 (OK): a paid order can be read", async ({ request }) => {
    let res: Awaited<ReturnType<typeof request.get>>;

    await test.step("Given a paid order with id 42 exists", async () => {
      // Order 42 is pre-seeded test data; this read-only test creates nothing, so no cleanup is needed.
    });

    await test.step("When the client sends GET /api/v2/order/42", async () => {
      res = await request.get("/api/v2/order/42");
    });

    await test.step("Then the response status is 200 and Content-Type is application/json", async () => {
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toMatch(/application\/json/);
    });

    await test.step("And the body matches the expected schema", async () => {
      const body = await res.json();
      expect(typeof body.id).toBe("string");
      expect(typeof body.status).toBe("string");
      expect(typeof body.owner).toBe("string");
    });

    await test.step("And the body contains the paid order data", async () => {
      const body = await res.json();
      expect(body).toMatchObject({ id: "42", status: "paid", owner: "ada" });
    });
  });
});