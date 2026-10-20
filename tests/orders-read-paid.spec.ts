import { test, expect } from "@playwright/test";

test.describe("Orders API: read", () => {
  test("GET /api/v2/order/42 → 200 (OK): a paid order can be read", async ({ request }) => {
    const response = await test.step("Given order 42 exists and is paid, when I send GET /api/v2/order/42", async () => {
      return request.get("/api/v2/order/42");
    });

    await test.step("Then the response status is 200 and the Content-Type is application/json", async () => {
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");
    });

    const body = await response.json();

    await test.step("And the body matches the order schema (id, status, owner are strings, no extra fields)", async () => {
      expect(body).toEqual({
        id: expect.any(String),
        status: expect.any(String),
        owner: expect.any(String),
      });
    });

    await test.step("And the body describes the paid order owned by ada", async () => {
      expect(body).toMatchObject({ id: "42", status: "paid", owner: "ada" });
    });

    await test.step("And repeating the read returns the same order (GET is idempotent)", async () => {
      const repeat = await request.get("/api/v2/order/42");
      expect(repeat.status()).toBe(200);
      expect(await repeat.json()).toEqual(body);
    });
  });
});