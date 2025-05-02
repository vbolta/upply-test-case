import { type Locator, type Page } from "@playwright/test";
import { HomePage } from "@pages/home.page";
export class LoginPage extends HomePage {
  readonly page: Page;
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
  readonly loginEmailTextbox: Locator;
  readonly loginPasswordTextbox: Locator;
  readonly loginButton: Locator;
  readonly productLink: Locator;
  account: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
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
    this.loginEmailTextbox = page.getByTestId("login-email");
    this.loginPasswordTextbox = page.getByTestId("login-password");
    this.loginButton = page.getByTestId("login-button");
    this.productLink = page.locator("[href='/products']");
    this.account = page.getByText("Account Created!");
  }

  async goto() {
    await this.page.goto("/login");
    // An improvement would be to directly add the cookies needed instead of clicking on the button
    const home = new HomePage(this.page);
    if (!process.env.CI) await home.cookiesConsentButton.click();
  }

  async signup({
    firstName,
    lastName,
    email,
  }: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    await this.goto();
    await this.signUpNameTextbox.click();
    await this.signUpNameTextbox.fill(`${firstName} ${lastName}`);
    await this.signUpEmailTextbox.click();
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
    await this.passwordTextbox.click();
    await this.passwordTextbox.fill(password);
    await this.firstNameTextbox.click();
    await this.firstNameTextbox.fill(firstName);
    await this.lastNameTextbox.click();
    await this.lastNameTextbox.fill(lastName);
    await this.addressTextbox.click();
    await this.addressTextbox.fill(address);
    await this.stateTextbox.click();
    await this.stateTextbox.fill(state);
    await this.cityTextbox.click();
    await this.cityTextbox.fill(city);
    await this.zipcodeTextbox.click();
    await this.zipcodeTextbox.fill(zipcode);
    await this.mobileNumberTextbox.click();
    await this.mobileNumberTextbox.fill(phoneNumber);
    await this.createAccountButton.click();
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.goto();
    await this.loginEmailTextbox.click();
    await this.loginEmailTextbox.fill(email);
    await this.loginPasswordTextbox.click();
    await this.loginPasswordTextbox.fill(password);
    await this.loginButton.click();
  }
}
