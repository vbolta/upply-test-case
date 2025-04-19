import { test, expect, type Page } from "@playwright/test";
import { userDetails } from "@helper/helper";
import { loginPage } from "@pages/login.page";
import {productPage} from "@pages/product.page";

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

test.describe.configure({ mode: 'serial' });

let page: Page, login: loginPage, product: productPage;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  login = new loginPage(page);
  product = new productPage(page);
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
test("Login - Connect with New User", async ({ page }) => {
  login = new loginPage(page);
  await login.login({ email, password });
  await expect(
    page.getByText(`Logged in as ${firstName} ${lastName}`),
  ).toBeVisible();
});

test("Product - Search for Product", async () => {
  const productName = "T-Shirt";
  await product.searchProduct(productName);
  // Make sure you find at least one product matching the product name searched
  await expect(page.locator('.productinfo').getByRole("paragraph").filter({ hasText: productName }).first()).toBeVisible();
});

test("Product - Filter by Brand", async () => {
  await product.filterBrand();
  // Make sure you find at least one product matching the product name searched
  await expect(page.getByRole('heading', { name: 'Brand - Mast & Harbour Products' })).toBeVisible();
});

test("Product - Add Product to Cart", async () => {
  await product.addToCart();
  await expect(page.getByText('Your product has been added to cart.')).toBeVisible();
});

// await page.getByRole('link', { name: 'View Cart' }).click();
// await page.getByText('Proceed To Checkout').click();
// await page.getByRole('link', { name: 'Place Order' }).click();
// await page.getByTestId('name-on-card').click();
// await page.getByTestId('card-number').click();
// await page.getByTestId('cvc').click();
// await page.getByTestId('expiry-month').click();
// await page.getByTestId('expiry-year').click();
// await page.getByTestId('pay-button').click();
