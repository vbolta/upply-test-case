import {HomePage} from "@pages/home.page";
import { type Locator, type Page } from "@playwright/test";

export class CheckOutPage {
  readonly page: Page;
  readonly proceedCheckoutButton: Locator;
  readonly placeOrderButton: Locator;
  readonly nameOnCardTextbox: Locator;
  readonly cardNumberTextbox: Locator;
  readonly cardCVCTextbox: Locator;
  readonly expiryMonthTextbox: Locator;
  readonly expiryYearTextbox: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedCheckoutButton = page.getByText("Proceed To Checkout");
    this.placeOrderButton = page.locator("[href='/payment']");
    this.nameOnCardTextbox = page.getByTestId("name-on-card");
    this.cardNumberTextbox = page.getByTestId("card-number");
    this.cardCVCTextbox = page.getByTestId("cvc");
    this.expiryMonthTextbox = page.getByTestId("expiry-month");
    this.expiryYearTextbox = page.getByTestId("expiry-year");
    this.payButton = page.getByTestId("pay-button");
  }

  async goto() {
    await this.page.goto("/view_cart");
  }

  async finalizeCheckout({
    firstName,
    lastName,
    creditCardNumber,
    creditCardCVC,
    expiryMonth,
    expiryYear,
  }: {
    firstName: string;
    lastName: string;
    creditCardNumber: string;
    creditCardCVC: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.goto();
    await this.proceedCheckoutButton.click();
    await this.placeOrderButton.click();
    await this.nameOnCardTextbox.click();
    await this.nameOnCardTextbox.fill(`${firstName} ${lastName}`);
    await this.cardNumberTextbox.click();
    await this.cardNumberTextbox.fill(creditCardNumber);
    await this.cardCVCTextbox.click();
    await this.cardCVCTextbox.fill(creditCardCVC);
    await this.expiryMonthTextbox.click();
    await this.expiryMonthTextbox.fill(expiryMonth);
    await this.expiryYearTextbox.click();
    await this.expiryYearTextbox.fill(expiryYear);
    await this.payButton.click();
  }
}
