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
    const productsPage = new ProductsPage(page);

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
    const backpack = page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' });

    // Verify backpack is visible
    await expect(backpack).toBeVisible();

    // Verify backpack price
    await expect(backpack).toContainText('$29.99');
  });


  test('user can add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Verify cart badge
    await expect(productsPage.cartBadge).toHaveText('1');
  });


  test('user can remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Remove backpack
    await productsPage.removeProduct('Sauce Labs Backpack');

    // Verify cart badge is not visible
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

});