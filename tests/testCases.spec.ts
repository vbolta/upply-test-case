import { creditCardDetails, userDetails } from "@helper/helper";
import {test, expect, type Page} from "@fixture";
import {CheckOutPage} from "@pages/checkout.page";
import {LoginPage} from "@pages/login.page";
import {ProductPage} from "@pages/product.page";

test.describe.configure({ mode: "serial" });

const {
  firstName,
  lastName,
  email,
  password,
  address,
  state,
  city,
  zipcode,
  phoneNumber,
} = userDetails;

const { creditCardNumber, creditCardCVC, expiryMonth, expiryYear } =
  creditCardDetails;

let page: Page, login: LoginPage, product: ProductPage, checkOut: CheckOutPage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new LoginPage(page);
  product = new ProductPage(page);
  checkOut = new CheckOutPage(page);
});

test.afterAll(async () => {
  await page.close();
});

test("Sign Up - Register New User", async () => {
  await login.signup({ firstName, lastName, email });
  await login.fillAccountInformation(
    firstName,
    lastName,
    password,
    address,
    state,
    city,
    zipcode,
    phoneNumber,
  );
  await expect(page.getByText("Account Created!")).toBeVisible();
});

// Opening a new page for this scenario in order to directly start without being logged in
test("Login - Connect with New User", async ({ page , login}) => {
  await login.login({ email, password });
  await expect(
    page.getByText(`Logged in as ${firstName} ${lastName}`),
  ).toBeVisible();
});

test("Product - Search for Product", async () => {
  const productName = "T-Shirt";
  await product.searchProduct(productName);
  // Make sure you find at least one product matching the product name searched
  await expect(
    page
      .locator(".productinfo")
      .getByRole("paragraph")
      .filter({ hasText: productName })
      .first(),
  ).toBeVisible();
});

test("Product - Filter by Brand", async () => {
  await product.filterBrand();
  await expect(
    page.getByRole("heading", { name: "Brand - Mast & Harbour Products" }),
  ).toBeVisible();
});

test("Product - Add Product to Cart", async () => {
  await product.addToCart();
  await expect(
    page.getByText("Your product has been added to cart."),
  ).toBeVisible();
});

test("Cart - Finalize Checkout", async () => {
  await checkOut.finalizeCheckout({
    firstName,
    lastName,
    creditCardNumber,
    creditCardCVC,
    expiryMonth,
    expiryYear,
  });
  await expect(
    page.getByText("Congratulations! Your order has been confirmed!"),
  ).toBeVisible();
});