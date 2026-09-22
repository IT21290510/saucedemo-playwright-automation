import { Page, Locator } from '@playwright/test';

// Page Object Model (POM) class for the SauceDemo Cart page
export class CartPage {

  // Store the Playwright Page object
  // This allows us to interact with the browser page
  readonly page: Page;


  // -----------------------------
  // Locators
  // -----------------------------

  // Locator for all items currently displayed in the shopping cart
  readonly cartItems: Locator;

  // Locator for the Checkout button
  readonly checkoutButton: Locator;

  // Locator for the Continue Shopping button
  readonly continueShoppingButton: Locator;


  // Constructor receives the Playwright Page object
  // and initializes all the locators
  constructor(page: Page) {

    // Store the Page object
    this.page = page;

    // Locate all products inside the shopping cart
    this.cartItems = page.locator('.cart_item');

    // Locate the Checkout button using its accessible role and name
    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });

    // Locate the Continue Shopping button
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }


  // -----------------------------
  // Cart Actions
  // -----------------------------

  // Get the total number of products currently in the cart
  async getCartItemCount() {

    // Count the cart item elements
    return await this.cartItems.count();
  }


  // Get a specific product from the cart
  // The productName parameter is used to identify the product
  getProduct(productName: string) {

    // Find the cart item that contains the specified product name
    return this.cartItems.filter({ hasText: productName });
  }


  // Remove a specific product from the cart
  async removeProduct(productName: string) {

    // Find the product in the cart
    const product = this.getProduct(productName);

    // Find the Remove button inside that product
    // and click it
    await product.getByRole('button', { name: 'Remove' }).click();
  }


  // Continue shopping and return to the Products page
  async continueShopping() {

    // Click the Continue Shopping button
    await this.continueShoppingButton.click();
  }


  // Go to the Checkout page
  async checkout() {

    // Click the Checkout button
    await this.checkoutButton.click();
  }
}
