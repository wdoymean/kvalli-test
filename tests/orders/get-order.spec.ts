import { test, expect } from '@playwright/test';
import { OrdersApiPage } from '../../pages/OrdersApiPage';

test.describe('GET /api/v2/orders/:id', () => {
  let ordersApiPage: OrdersApiPage;

  test.beforeEach(async ({ request }) => {
    ordersApiPage = new OrdersApiPage(request);
  });

  test('GET /api/v2/orders/42 → 200 (OK) - a paid order can be read', async () => {
    // Given a valid order identifier
    const orderId = '42';

    // When the order details are requested
    const response = await ordersApiPage.getOrderById(orderId);

    // Then the response status is 200 OK
    expect(response.status()).toBe(200);

    // And Content-Type header is application/json
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');

    // And response body matches expected schema and values
    const body = await response.json();
    expect(body).toEqual({
      id: '42',
      status: 'paid',
      owner: 'ada',
    });
  });
});
