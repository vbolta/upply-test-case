import { test, expect } from "@playwright/test";
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

test("Register User", async ({ page }) => {
  const login = new loginPage(page);
  await login.newUserSignup(firstName, lastName, email);
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

// test("Login", async ({ page }) => {

// await page.getByRole('link', { name: ' Signup / Login' }).click();
// await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
// await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('tess');
// await page.getByRole('textbox', { name: 'Password' }).click();
// await page.getByRole('textbox', { name: 'Password' }).fill('testt');
// await page.getByRole('button', { name: 'Login' }).click();

// })
