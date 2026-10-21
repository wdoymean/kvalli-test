import { test, expect } from "@playwright/test";

test.describe("GET /api/v2/orders/{id}", () => {
  test("GET /api/v2/orders/42 → 200 (OK): оплаченный заказ читается по id", async ({ request }) => {
    test.info().annotations.push({ type: "priority", description: "P2" });

    // Given: order 42 exists in status "paid" and belongs to "ada"
    const orderId = "42";

    // When: the order is requested by its id
    const res = await test.step("Когда клиент отправляет GET /api/v2/orders/42", async () => {
      return request.get(`/api/v2/orders/${orderId}`);
    });

    // Then: status code is 200
    await test.step("Тогда ответ имеет статус 200", async () => {
      expect(res.status()).toBe(200);
    });

    // Then: Content-Type is JSON
    await test.step("И заголовок Content-Type равен application/json", async () => {
      expect(res.headers()["content-type"]).toContain("application/json");
    });

    const body = await res.json();

    // Then: body matches the expected schema (keys and types)
    await test.step("И структура тела соответствует схеме заказа", async () => {
      expect(Object.keys(body).sort()).toEqual(["id", "owner", "status"]);
      expect(typeof body.id).toBe("string");
      expect(typeof body.status).toBe("string");
      expect(typeof body.owner).toBe("string");
    });

    // Then: body values describe the paid order of ada
    await test.step("И тело содержит оплаченный заказ 42 пользователя ada", async () => {
      expect(body).toEqual({ id: "42", status: "paid", owner: "ada" });
    });
  });
});
