import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  // Locators
  readonly productsList: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Product locators
    this.productsList = page.locator('.inventory_item');

    // Cart locators
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');

    // Product sorting dropdown
    this.sortDropdown = page.locator('.product_sort_container');
  }

  // Get the number of products displayed on the page
  async getProductCount() {
    // Wait until at least one product is visible
    await this.productsList.first().waitFor({ state: 'visible' });

    // Return total number of products
    return await this.productsList.count();
  }

  // Add a product to cart
  async addProduct(productName: string) {
    const product = this.productsList.filter({
      hasText: productName,
    });

    await product.getByRole('button', {
      name: 'Add to cart',
    }).click();
  }

  // Remove a product from cart
  async removeProduct(productName: string) {
    const product = this.productsList.filter({
      hasText: productName,
    });

    await product.getByRole('button', {
      name: 'Remove',
    }).click();
  }

  // Open shopping cart
  async openCart() {
    await this.cartLink.click();
  }

  // Sort products
  async sortProducts(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  // Get product names displayed on the page
  async getProductNames() {
    return await this.productsList
      .locator('.inventory_item_name')
      .allTextContents();
  }

  // Get product prices displayed on the page
  async getProductPrices() {
    const prices = await this.productsList
      .locator('.inventory_item_price')
      .allTextContents();

    return prices.map((price) =>
      Number(price.replace('$', ''))
    );
  }
}