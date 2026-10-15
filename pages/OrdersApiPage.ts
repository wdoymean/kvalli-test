import { APIRequestContext, APIResponse } from '@playwright/test';

export interface OrderResponse {
  id: string;
  status: string;
  owner: string;
}

export class OrdersApiPage {
  private readonly request: APIRequestContext;
  private readonly basePath: string = '/api/v2/orders';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getOrderById(orderId: string): Promise<APIResponse> {
    return this.request.get(`${this.basePath}/${orderId}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
