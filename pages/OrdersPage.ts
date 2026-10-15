import { APIRequestContext, APIResponse } from '@playwright/test';

export class OrdersPage {
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Retrieves an order by its ID.
   * @param orderId Identifier of the order
   */
  async getOrderById(orderId: string | number): Promise<APIResponse> {
    return await this.request.get(`/api/v2/orders/${orderId}`);
  }
}
