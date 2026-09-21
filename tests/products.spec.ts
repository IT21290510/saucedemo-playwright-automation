// Import Playwright's test function and expect assertion
import { test, expect } from '@playwright/test';


// ---------------------------------------------------------
// BEFORE EACH TEST
// ---------------------------------------------------------

test.beforeEach(async ({ page }) => {

    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Enter valid username
    await page.getByPlaceholder('Username').fill('standard_user');

    // Enter valid password
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait until the Products heading is visible
    // This also confirms that login was successful
    await expect(
        page.getByText('Products')
    ).toBeVisible();
});


// ---------------------------------------------------------
// TEST 1: Products Page
// ---------------------------------------------------------

test('user can view the products page', async ({ page }) => {

    // Verify that the Products heading is displayed
    await expect(
        page.getByText('Products')
    ).toBeVisible();

    // Verify that the inventory container exists
    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();
});


// ---------------------------------------------------------
// TEST 2: Product List
// ---------------------------------------------------------

test('products are displayed on the products page', async ({ page }) => {

    // Locate all product cards
    const products = page.locator('.inventory_item');

    // Verify that products are displayed
    // SauceDemo currently has multiple products
    await expect(products).toHaveCount(6);
});


// ---------------------------------------------------------
// TEST 3: View Product Details
// ---------------------------------------------------------

test('user can view product details', async ({ page }) => {

    // Click the Sauce Labs Backpack product
    await page.getByText('Sauce Labs Backpack').click();

    // Verify that the product name is visible
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    // Verify that the product price is displayed
    await expect(
        page.getByText('$29.99')
    ).toBeVisible();
});


// ---------------------------------------------------------
// TEST 4: Add Product to Cart
// ---------------------------------------------------------

test('user can add a product to cart', async ({ page }) => {

    // Find the specific product card
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Click Add to cart inside the Backpack product card
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Verify that the shopping cart badge shows 1
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');
});


// ---------------------------------------------------------
// TEST 5: Remove Product From Cart
// ---------------------------------------------------------

test('user can remove a product from the products page', async ({ page }) => {

    // Find the Backpack product
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Add the Backpack to the cart
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Verify that the cart contains one item
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Click Remove for the Backpack
    await backpack
        .getByRole('button', { name: 'Remove' })
        .click();

    // Verify that the cart badge is no longer visible
    await expect(
        page.locator('.shopping_cart_badge')
    ).not.toBeVisible();
});