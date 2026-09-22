import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  // Locators
  readonly productsList: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsList = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // Get the number of products displayed on the page
  async getProductCount() {
    // Wait until at least one product is visible
    await this.productsList.first().waitFor({ state: 'visible' });

    // Return the total number of products
    return await this.productsList.count();
  }

  // Add a product to cart
  async addProduct(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  // Remove a product from cart
  async removeProduct(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product.getByRole('button', { name: 'Remove' }).click();
  }

  // Open shopping cart
  async openCart() {
    await this.cartLink.click();
  }
}