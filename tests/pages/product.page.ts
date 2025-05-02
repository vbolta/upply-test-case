import {HomePage} from "@pages/home.page";
import { type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productSearchInput: Locator;
  readonly productSearchSubmitButton: Locator;
  readonly searchedProductName: Locator;
  readonly brandNameLink: Locator;
  readonly productDetailsLink: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSearchInput = page.locator("#search_product");
    this.productSearchSubmitButton = page.locator("#submit_search");
    this.brandNameLink = page.getByRole("link", { name: "Mast & Harbour" });
    this.productDetailsLink = page
      .getByRole("link", { name: "View Product" })
      .first();
    this.quantityInput = page.locator("#quantity");
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.addToCartModal = page.locator("#cartModal").and(page.locator(".show"));
  }

  async goto() {
    await this.page.goto("/products");
  }

  async searchProduct(productName: string) {
    await this.goto();
    await this.productSearchInput.click();
    await this.productSearchInput.fill(productName);
    await this.productSearchSubmitButton.click();
  }

  async filterBrand() {
    await this.goto();
    await this.brandNameLink.click();
  }

  async addToCart() {
    await this.productDetailsLink.click();
    await this.quantityInput.click();
    await this.quantityInput.fill("3");
    await this.addToCartButton.click();
    await this.addToCartModal.waitFor();
  }
}
