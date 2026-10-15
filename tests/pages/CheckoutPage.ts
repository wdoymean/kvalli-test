export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.submitBtn = page.getByTestId("complete-order-btn");
  }

  async completePurchase() {
    await this.submitBtn.click();
  }
}
