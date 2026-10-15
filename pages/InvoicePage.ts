import { APIRequestContext, APIResponse } from '@playwright/test';

export interface InvoiceResponse {
  orderId: string;
  invoiceId?: string;
  amount?: number;
  currency?: string;
  status?: string;
  [key: string]: unknown;
}

export class InvoicePage {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Retrieves the invoice for a specified order ID
   * @param orderId ID of the paid order
   */
  async getInvoice(orderId: string | number): Promise<APIResponse> {
    return this.request.get(`/api/v2/orders/${orderId}/invoice`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }
}
