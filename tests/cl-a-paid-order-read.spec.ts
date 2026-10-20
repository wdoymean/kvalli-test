import { test, expect } from "@playwright/test";
import type { APIResponse } from "@playwright/test";

test.describe("CL-A: read a paid order", () => {
  test(
    "GET /api/v2/orders/42 → 200 (OK): a paid order can be read",
    { annotation: { type: "priority", description: "high" } },
    async ({ request }) => {
      let res: APIResponse;

      await test.step("Given a paid order with id 42 exists", async () => {
        // Pre-seeded order; this test is read-only, so there is nothing to clean up.
      });

      await test.step("When the client sends GET /api/v2/orders/42", async () => {
        res = await request.get("/api/v2/orders/42");
      });

      await test.step("Then the response status is 200", async () => {
        expect(res.status()).toBe(200);
      });

      await test.step("And the Content-Type header is application/json", async () => {
        expect(res.headers()["content-type"]).toContain("application/json");
      });

      await test.step("And the body matches the expected schema", async () => {
        const body = await res.json();
        expect(typeof body.id).toBe("string");
        expect(typeof body.status).toBe("string");
        expect(typeof body.owner).toBe("string");
      });

      await test.step("And the body contains the paid order data", async () => {
        expect(await res.json()).toMatchObject({
          id: "42",
          status: "paid",
          owner: "ada",
        });
      });
    }
  );
});
