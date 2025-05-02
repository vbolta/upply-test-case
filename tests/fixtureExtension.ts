import { CheckOutPage } from "@pages/checkout.page";
import { HomePage } from "@pages/home.page";
import { LoginPage } from "@pages/login.page";
import { ProductPage } from "@pages/product.page";
import { test as base } from "@playwright/test";

type Pages = {
  home: HomePage;
  login: LoginPage;
  product: ProductPage;
  checkOut: CheckOutPage;
};

export const test = base.extend<Pages>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  checkOut: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  },
});

export { expect, type Page } from "@playwright/test";