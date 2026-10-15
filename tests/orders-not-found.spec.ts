import { test, expect } from '@playwright/test';
import { OrdersPage } from '../pages/OrdersPage';

test.describe('Orders API - Negative Scenarios', () => {
  test('GET /api/v2/orders/999 → 404 (Not Found)', async ({ request }) => {
    // Given an unknown order ID
    const unknownOrderId = 999;
    const ordersPage = new OrdersPage(request);

    // When sending a GET request for the unknown order
    const response = await ordersPage.getOrderById(unknownOrderId);

    // Then the response status should be 404 (Not Found)
    expect(response.status()).toBe(404);

    // And Content-Type header must contain application/json
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    // And response body must match expected error payload
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      error: 'ORDER_NOT_FOUND'
    });
  });
});
