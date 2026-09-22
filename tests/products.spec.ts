import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

// Group all product-related test cases together
test.describe('Products Tests', () => {

  // This code runs before every test in this test suite
  // It logs in using a valid user before testing the products page
  test.beforeEach(async ({ page }) => {

    // Create an object of the LoginPage class
    const loginPage = new LoginPage(page);

    // Open the SauceDemo login page
    await loginPage.goto();

    // Login using valid username and password
    await loginPage.login('standard_user', 'secret_sauce');
  });


  // Test 1: Verify that the products page is displayed after login
  test('products page is displayed after login', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Verify that the user is redirected to the inventory/products page
    await expect(page).toHaveURL(/inventory/);

    // Verify that at least one product is visible on the page
    await expect(productsPage.productsList.first()).toBeVisible();
  });


  // Test 2: Verify that six products are displayed
  test('six products are displayed', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Get the number of products displayed on the products page
    const productCount = await productsPage.getProductCount();

    // Verify that exactly six products are displayed
    expect(productCount).toBe(6);
  });


  // Test 3: Verify that the Sauce Labs Backpack can be viewed
  test('user can view Sauce Labs Backpack', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Find the inventory item that contains the text
    // "Sauce Labs Backpack"
    const backpack = page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' });

    // Verify that the Sauce Labs Backpack is visible
    await expect(backpack).toBeVisible();

    // Verify that the Backpack has the correct price
    await expect(backpack).toContainText('$29.99');
  });


  // Test 4: Verify that a user can add a product to the cart
  test('user can add a product to cart', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // Add the Sauce Labs Backpack to the shopping cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Verify that the shopping cart badge shows 1 item
    await expect(productsPage.cartBadge).toHaveText('1');
  });


  // Test 5: Verify that a user can remove a product from the products page
  test('user can remove a product from products page', async ({ page }) => {

    // Create an object of the ProductsPage class
    const productsPage = new ProductsPage(page);

    // First, add the Sauce Labs Backpack to the cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Remove the Sauce Labs Backpack from the cart
    await productsPage.removeProduct('Sauce Labs Backpack');

    // Verify that the cart badge is no longer visible
    // because there are no products in the cart
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

});