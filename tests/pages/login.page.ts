import { type Locator, type Page } from "@playwright/test";

export class loginPage {
  readonly page: Page;
  readonly cookiesConsentButton: Locator;
  readonly signUpLoginLink: Locator;
  readonly signUpNameTextbox: Locator;
  readonly signUpEmailTextbox: Locator;
  readonly signUpButton: Locator;
  readonly genderRadioOption1: Locator;
  readonly passwordTextbox: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly addressTextbox: Locator;
  readonly stateTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipcodeTextbox: Locator;
  readonly mobileNumberTextbox: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookiesConsentButton = page.getByRole("button", { name: "Consent" });
    this.signUpLoginLink = page.locator('[href="/login"]');
    this.signUpNameTextbox = page.getByTestId("signup-name");
    this.signUpEmailTextbox = page.getByTestId("signup-email");
    this.signUpButton = page.getByTestId("signup-button");
    this.genderRadioOption1 = page.locator("#id_gender1");
    this.passwordTextbox = page.getByTestId("password");
    this.firstNameTextbox = page.getByTestId("first_name");
    this.lastNameTextbox = page.getByTestId("last_name");
    this.addressTextbox = page.getByTestId("address");
    this.stateTextbox = page.getByTestId("state");
    this.cityTextbox = page.getByTestId("city");
    this.zipcodeTextbox = page.getByTestId("zipcode");
    this.mobileNumberTextbox = page.getByTestId("mobile_number");
    this.createAccountButton = page.getByTestId("create-account");
  }

  async goto() {
    await this.page.goto("https://www.automationexercise.com/");
  }

  async newUserSignup(firstName: string, lastName: string, email: string) {
    await this.goto();
    await this.cookiesConsentButton.click();
    await this.signUpLoginLink.click();
    await this.signUpNameTextbox.fill(`${firstName} ${lastName}`);
    await this.signUpEmailTextbox.fill(email);
    await this.signUpButton.click();
  }

  async fillAccountInformation(
    firstName: string,
    lastName: string,
    password: string,
    address: string,
    state: string,
    city: string,
    zipcode: string,
    phoneNumber: string,
  ) {
    await this.genderRadioOption1.click();
    await this.passwordTextbox.fill(password);
    await this.firstNameTextbox.fill(firstName);
    await this.lastNameTextbox.fill(lastName);
    await this.addressTextbox.fill(address);
    await this.stateTextbox.fill(state);
    await this.cityTextbox.fill(city);
    await this.zipcodeTextbox.fill(zipcode);
    await this.mobileNumberTextbox.fill(phoneNumber);
    await this.createAccountButton.click();
  }
}
