import { Page, Locator } from '@playwright/test';

// Page Object Model (POM) class for the SauceDemo Products page
export class ProductsPage {

  // Store the Playwright Page object
  // This allows us to interact with the browser page
  readonly page: Page;


  // -----------------------------
  // Locators
  // -----------------------------

  // Locator for all products displayed on the products page
  readonly productsList: Locator;

  // Locator for the shopping cart link/icon
  readonly cartLink: Locator;

  // Locator for the shopping cart item count badge
  readonly cartBadge: Locator;


  // Constructor receives the Playwright Page object
  // and initializes all the locators
  constructor(page: Page) {

    // Store the Page object
    this.page = page;

    // Locate all products using the inventory item class
    this.productsList = page.locator('.inventory_item');

    // Locate the shopping cart link
    this.cartLink = page.locator('.shopping_cart_link');

    // Locate the cart badge that displays the number of items
    this.cartBadge = page.locator('.shopping_cart_badge');
  }


  // -----------------------------
  // Product Actions
  // -----------------------------

  // Get the total number of products displayed on the page
  async getProductCount() {

    // Count the number of product elements
    return await this.productsList.count();
  }


  // Add a specific product to the shopping cart
  // productName is used to identify which product to add
  async addProduct(productName: string) {

    // Find the product container that contains the given product name
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    // Find the "Add to cart" button inside that product
    // and click it
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }


  // Remove a specific product from the shopping cart
  // productName is used to identify which product to remove
  async removeProduct(productName: string) {

    // Find the product container that contains the given product name
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    // Find the "Remove" button inside that product
    // and click it
    await product.getByRole('button', { name: 'Remove' }).click();
  }


  // Open the shopping cart
  async openCart() {

    // Click the shopping cart link
    await this.cartLink.click();
  }
}