import { test, expect, chromium } from "@playwright/test";
import { userDetails } from "tests/helper/userDetails";
import { loginPage } from "tests/pages/login.page";

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

// test.beforeEach(async({page}) => {
//   const login = new loginPage(page);
//   await login.goto();
// })

test("Register User", async ({ page }) => {
  const login = new loginPage(page);
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

test("Login", async ({ page }) => {
  const login = new loginPage(page);
  await login.login({ email, password });
  await expect(
    page.getByText(`Logged in as ${firstName} ${lastName}`),
  ).toBeVisible();
});

// await page.goto('https://www.automationexercise.com/account_created');
// await page.getByRole('link', { name: ' Signup / Login' }).click();
// await page.getByRole('link', { name: ' Products' }).click();
// await page.getByRole('textbox', { name: 'Search Product' }).click();
// await page.getByRole('textbox', { name: 'Search Product' }).fill('T-Shirt');
// await page.getByRole('button', { name: '' }).click();
// await page.getByRole('link', { name: '(3) Mast & Harbour' }).click();
// await page.locator('div:nth-child(5) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn').click();
// await page.getByRole('link', { name: 'View Cart' }).click();
// await page.getByRole('button', { name: '1' }).click();
// await page.getByRole('button', { name: '1' }).click();
// await page.getByRole('cell', { name: '' }).locator('a').click();
// await page.getByRole('link', { name: ' Products' }).click();
// await page.getByRole('textbox', { name: 'Search Product' }).click();
// await page.getByRole('textbox', { name: 'Search Product' }).fill('T-Shirt');
// await page.getByRole('button', { name: '' }).click();
// await page.getByRole('link', { name: '(3) Mast & Harbour' }).click();
// await page.getByRole('link', { name: ' View Product' }).nth(2).click();
// await page.locator('#quantity').click();
// await page.locator('#quantity').fill('3');
// await page.getByRole('button', { name: ' Add to cart' }).click();
// await page.getByRole('link', { name: 'View Cart' }).click();
// await page.getByText('Proceed To Checkout').click();
// await page.getByRole('link', { name: 'Place Order' }).click();
// await page.getByTestId('name-on-card').click();
// await page.getByTestId('card-number').click();
// await page.getByTestId('cvc').click();
// await page.getByTestId('expiry-month').click();
// await page.getByTestId('expiry-year').click();
// await page.getByTestId('pay-button').click();
