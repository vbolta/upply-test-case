import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly cookiesConsentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookiesConsentButton = page.getByRole("button", { name: "Consent" });
  }

  async cookiesConsent() {
    await this.cookiesConsentButton.click();
  }
}
