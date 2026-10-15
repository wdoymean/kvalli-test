import { test, expect } from '@playwright/test';
import { InvoicePage } from '../pages/InvoicePage';

test.describe('Invoice API', () => {
  test('GET /api/v2/orders/42/invoice → 200 (OK)', async ({ request }) => {
    // Given a paid order with ID "42"
    const invoicePage = new InvoicePage(request);
    const orderId = '42';

    // When sending GET /api/v2/orders/42/invoice
    const response = await invoicePage.getInvoice(orderId);

    // Then status should be 200 OK
    expect(response.status()).toBe(200);

    // And Content-Type header must be application/json
    const contentType = response.headers()['content-type'];
    expect(contentType).toBeTruthy();
    expect(contentType).toContain('application/json');

    // And response body schema and fields should match expected contract
    const body = await response.json();
    expect(body).toMatchObject({
      orderId: orderId
    });
    expect(typeof body.orderId).toBe('string');
    expect(body.orderId).toBe('42');
  });
});
