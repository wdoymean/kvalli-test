export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.submitBtn = page.getByRole("button", { name: "Submit Order" });
  }

  async completePurchase() {
    await this.submitBtn.click();
  }
}
