import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('Cart Tests', () => {

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


  test('user can add and view product in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Verify cart contains backpack
    await expect(
      cartPage.getProduct('Sauce Labs Backpack')
    ).toBeVisible();
  });


  test('product price is displayed correctly in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Get backpack from cart
    const backpack = cartPage.getProduct(
      'Sauce Labs Backpack'
    );

    // Verify price
    await expect(backpack).toContainText('$29.99');
  });


  test('user can remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Remove backpack
    await cartPage.removeProduct('Sauce Labs Backpack');

    // Verify cart is empty
    expect(await cartPage.getCartItemCount()).toBe(0);
  });


  test('user can continue shopping from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Continue shopping
    await cartPage.continueShopping();

    // Verify user is back on products page
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  });


  test('user can proceed to checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add backpack to cart
    await productsPage.addProduct('Sauce Labs Backpack');

    // Open cart
    await productsPage.openCart();

    // Proceed to checkout
    await cartPage.checkout();

    // Verify checkout page
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html'
    );
  });


    test('user can add multiple products to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add first product
    await productsPage.addProduct('Sauce Labs Backpack');

    // Add second product
    await productsPage.addProduct('Sauce Labs Bike Light');

    // Verify cart badge shows two products
    await expect(productsPage.cartBadge).toHaveText('2');

    // Open cart
    await productsPage.openCart();

    // Verify both products are displayed
    await expect(
      cartPage.getProduct('Sauce Labs Backpack')
    ).toBeVisible();

    await expect(
      cartPage.getProduct('Sauce Labs Bike Light')
    ).toBeVisible();

    // Verify cart contains two items
    expect(await cartPage.getCartItemCount()).toBe(2);
  });


  test('user can remove one product while keeping another product', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add two products
    await productsPage.addProduct('Sauce Labs Backpack');
    await productsPage.addProduct('Sauce Labs Bike Light');

    // Open cart
    await productsPage.openCart();

    // Remove backpack
    await cartPage.removeProduct('Sauce Labs Backpack');

    // Verify backpack is removed
    await expect(
      cartPage.getProduct('Sauce Labs Backpack')
    ).not.toBeVisible();

    // Verify bike light remains
    await expect(
      cartPage.getProduct('Sauce Labs Bike Light')
    ).toBeVisible();

    // Verify one item remains
    expect(await cartPage.getCartItemCount()).toBe(1);
  });


});