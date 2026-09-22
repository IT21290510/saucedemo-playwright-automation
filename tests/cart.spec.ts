import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

// Group all cart-related test cases together
test.describe('Cart Tests', () => {

  // This code runs before every test in this test suite
  // It logs in with a valid user before starting each cart test
  test.beforeEach(async ({ page }) => {

    // Create an object of the LoginPage class
    const loginPage = new LoginPage(page);

    // Open the SauceDemo login page
    await loginPage.goto();

    // Login using valid username and password
    await loginPage.login('standard_user', 'secret_sauce');
  });


  // Test 1: Verify that a user can add a product and view it in the cart
  test('user can add product and view it in cart', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Create an object of the CartPage class
    const cartPage = new CartPage(page);

    // Add the Sauce Labs Backpack to the shopping cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open the shopping cart
    await productsPage.openCart();

    // Verify that the user is on the cart page
    await expect(page).toHaveURL(/cart/);

    // Verify that the Sauce Labs Backpack is displayed in the cart
    await expect(
      cartPage.getProduct('Sauce Labs Backpack')
    ).toBeVisible();
  });


  // Test 2: Verify that the correct product price is displayed in the cart
  test('user can verify product price in cart', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Create an object of the CartPage class
    const cartPage = new CartPage(page);

    // Add the Sauce Labs Backpack to the shopping cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open the shopping cart
    await productsPage.openCart();

    // Find the Sauce Labs Backpack inside the cart
    const product = cartPage.getProduct('Sauce Labs Backpack');

    // Verify that the product price is $29.99
    await expect(product).toContainText('$29.99');
  });


  // Test 3: Verify that a user can remove a product from the cart
  test('user can remove product from cart', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Create an object of the CartPage class
    const cartPage = new CartPage(page);

    // Add the Sauce Labs Backpack to the shopping cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open the shopping cart
    await productsPage.openCart();

    // Remove the Sauce Labs Backpack from the cart
    await cartPage.removeProduct('Sauce Labs Backpack');

    // Verify that the cart contains zero products
    await expect(cartPage.cartItems).toHaveCount(0);
  });


  // Test 4: Verify that a user can continue shopping from the cart
  test('user can continue shopping from cart', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Create an object of the CartPage class
    const cartPage = new CartPage(page);

    // Add the Sauce Labs Backpack to the shopping cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open the shopping cart
    await productsPage.openCart();

    // Click the "Continue Shopping" button
    // This should take the user back to the products page
    await cartPage.continueShopping();

    // Verify that the user has returned to the products page
    await expect(page).toHaveURL(/inventory/);
  });


  // Test 5: Verify that a user can proceed to checkout
  test('user can proceed to checkout', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Create an object of the CartPage class
    const cartPage = new CartPage(page);

    // Add the Sauce Labs Backpack to the shopping cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open the shopping cart
    await productsPage.openCart();

    // Click the Checkout button
    await cartPage.checkout();

    // Verify that the user is redirected to the checkout information page
    await expect(page).toHaveURL(/checkout-step-one/);
  });

});