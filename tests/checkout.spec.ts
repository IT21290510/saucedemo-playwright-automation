import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';
import { checkoutData } from '../test-data/checkoutData';

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Open login page
    await loginPage.goto();

    // Login with reusable test data
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Add product to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();
  });


  test('user can proceed to checkout', async ({ page }) => {
    // Verify checkout page
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html'
    );
  });


  test('user can enter checkout information', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Enter checkout information using reusable test data
    await checkoutPage.enterCheckoutInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    // Continue to overview
    await checkoutPage.continueToOverview();

    // Verify checkout overview page
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-two.html'
    );
  });


  test('user can complete order successfully', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Enter checkout information
    await checkoutPage.enterCheckoutInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    // Continue to overview
    await checkoutPage.continueToOverview();

    // Complete order
    await checkoutPage.finishOrder();

    // Verify order confirmation
    await expect(
      checkoutPage.confirmationMessage
    ).toBeVisible();
  });


  test('missing first name shows error message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Leave first name empty
    await checkoutPage.enterCheckoutInformation(
      '',
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    // Continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      'First Name is required'
    );
  });


  test('missing last name shows error message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Leave last name empty
    await checkoutPage.enterCheckoutInformation(
      checkoutData.validCustomer.firstName,
      '',
      checkoutData.validCustomer.postalCode
    );

    // Continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Last Name is required'
    );
  });


  test('missing postal code shows error message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Leave postal code empty
    await checkoutPage.enterCheckoutInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      ''
    );

    // Continue
    await checkoutPage.continueToOverview();

    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Postal Code is required'
    );
  });
  test('checkout total is calculated correctly', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Enter checkout information
    await checkoutPage.enterCheckoutInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    // Continue to checkout overview
    await checkoutPage.continueToOverview();

    // Get subtotal, tax and total
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    // Verify total calculation
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

});