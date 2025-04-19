import {homePage} from "@pages/home.page";
import { type Locator, type Page } from "@playwright/test";

export class productPage {
	readonly page: Page;
	readonly productSearchInput: Locator;
	readonly productSearchSubmitButton: Locator;
	readonly searchedProductName: Locator;
	readonly brandNameLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.productSearchInput = page.locator("#search_product");
		this.productSearchSubmitButton = page.locator("#submit_search");
		this.brandNameLink = page.getByRole('link', { name: 'Mast & Harbour' })
	}

		async goto() {
			await this.page.goto("/products");
		}

	async searchProduct(productName: string){
		await this.goto();
		await this.productSearchInput.click();
		await this.productSearchInput.fill(productName);
		await this.productSearchSubmitButton.click();
	}

	async filterBrand(){
		await this.goto();
		await this.brandNameLink.click();
	}
}