import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../test-data/users';

test.describe('Products Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Login with reusable test data
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
  });


  test('products page is displayed', async ({ page }) => {
    // Verify products page URL
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  });


  test('six products are displayed', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Get product count
    const productCount = await productsPage.getProductCount();

    // Verify six products are displayed
    expect(productCount).toBe(6);
  });


  test('backpack is visible with correct price', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Locate backpack
    const backpack = productsPage.productsList.filter({
      hasText: 'Sauce Labs Backpack',
    });

    // Verify backpack is visible
    await expect(backpack).toBeVisible();

    // Verify backpack price
    await expect(backpack).toContainText('$29.99');
  });


  test('user can add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add backpack
    await productsPage.addProduct('Sauce Labs Backpack');

    // Verify cart badge
    await expect(productsPage.cartBadge).toHaveText('1');
  });


  test('user can remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add backpack
    await productsPage.addProduct('Sauce Labs Backpack');

    // Remove backpack
    await productsPage.removeProduct('Sauce Labs Backpack');

    // Verify cart badge is not visible
    await expect(productsPage.cartBadge).not.toBeVisible();
  });


  test('products can be sorted by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Sort products by price: low to high
    await productsPage.sortProducts('lohi');

    // Get displayed prices
    const prices = await productsPage.getProductPrices();

    // Create sorted copy
    const sortedPrices = [...prices].sort(
      (a, b) => a - b
    );

    // Verify prices are sorted correctly
    expect(prices).toEqual(sortedPrices);
  });


  test('products can be sorted by price high to low', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Sort products by price: high to low
    await productsPage.sortProducts('hilo');

    // Get displayed prices
    const prices = await productsPage.getProductPrices();

    // Create sorted copy
    const sortedPrices = [...prices].sort(
      (a, b) => b - a
    );

    // Verify prices are sorted correctly
    expect(prices).toEqual(sortedPrices);
  });


  test('products can be sorted alphabetically A to Z', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Sort products alphabetically
    await productsPage.sortProducts('az');

    // Get product names
    const productNames = await productsPage.getProductNames();

    // Create alphabetically sorted copy
    const sortedNames = [...productNames].sort();

    // Verify correct sorting
    expect(productNames).toEqual(sortedNames);
  });

});