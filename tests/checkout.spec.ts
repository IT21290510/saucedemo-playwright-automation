import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open SauceDemo login page
    await loginPage.goto();

    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user can proceed to checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add a product to the cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open the cart
    await productsPage.openCart();

    // Click checkout
    await cartPage.checkout();

    // Verify checkout page is displayed
    await expect(page).toHaveURL(/checkout-step-one/);

    // Verify checkout form is visible
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
  });

  test('user can enter checkout information', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();

    // Enter customer information
    await checkoutPage.enterCheckoutInformation(
      'Weenali',
      'Ranatunge',
      '60000'
    );

    // Verify entered values
    await expect(checkoutPage.firstNameInput).toHaveValue('Weenali');
    await expect(checkoutPage.lastNameInput).toHaveValue('Ranatunge');
    await expect(checkoutPage.postalCodeInput).toHaveValue('60000');
  });

  test('user can complete an order successfully', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();

    // Enter checkout information
    await checkoutPage.enterCheckoutInformation(
      'Weenali',
      'Ranatunge',
      '60000'
    );

    // Continue to checkout overview
    await checkoutPage.continueToOverview();

    // Verify checkout overview page
    await expect(page).toHaveURL(/checkout-step-two/);

    // Finish the order
    await checkoutPage.finishOrder();

    // Verify successful order confirmation
    await expect(checkoutPage.confirmationMessage).toBeVisible();
  });

  test('checkout cannot continue without first name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();

    // Enter only last name and postal code
    await checkoutPage.enterCheckoutInformation(
      '',
      'Ranatunge',
      '60000'
    );

    // Try to continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(
      page.locator('[data-test="error"]')
    ).toBeVisible();
  });

  test('checkout cannot continue without last name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();

    // Enter only first name and postal code
    await checkoutPage.enterCheckoutInformation(
      'Weenali',
      '',
      '60000'
    );

    // Try to continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(
      page.locator('[data-test="error"]')
    ).toBeVisible();
  });

  test('checkout cannot continue without postal code', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add product to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();

    // Enter first name and last name without postal code
    await checkoutPage.enterCheckoutInformation(
      'Weenali',
      'Ranatunge',
      ''
    );

    // Try to continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(
      page.locator('[data-test="error"]')
    ).toBeVisible();
  });
});