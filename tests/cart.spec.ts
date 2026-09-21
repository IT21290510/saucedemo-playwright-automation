// Import Playwright's test function and expect assertion
import { test, expect } from '@playwright/test';


// ---------------------------------------------------------
// BEFORE EACH TEST
// ---------------------------------------------------------

test.beforeEach(async ({ page }) => {

    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Login with a valid user
    await page.getByPlaceholder('Username').fill('standard_user');

    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login
    await expect(
        page.getByText('Products')
    ).toBeVisible();
});


// ---------------------------------------------------------
// TEST 1: Add Product and Open Cart
// ---------------------------------------------------------

test('user can add a product and view it in the cart', async ({ page }) => {

    // Find the Backpack product
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Add Backpack to the cart
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Open the shopping cart
    await page.locator('.shopping_cart_link').click();

    // Verify that Backpack is displayed in the cart
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();
});


// ---------------------------------------------------------
// TEST 2: Verify Product Price
// ---------------------------------------------------------

test('cart displays the correct product price', async ({ page }) => {

    // Find Backpack
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Add Backpack to cart
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Locate the price displayed in the cart
    const price = page.locator('.inventory_item_price');

    // Verify the price
    await expect(price).toHaveText('$29.99');
});


// ---------------------------------------------------------
// TEST 3: Remove Product From Cart
// ---------------------------------------------------------

test('user can remove a product from the cart', async ({ page }) => {

    // Find Backpack
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Add Backpack
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Verify Backpack exists
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    // Click Remove
    await page.getByRole('button', { name: 'Remove' }).click();

    // Verify Backpack is no longer displayed
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).not.toBeVisible();
});


// ---------------------------------------------------------
// TEST 4: Continue Shopping
// ---------------------------------------------------------

test('user can continue shopping from the cart', async ({ page }) => {

    // Find Backpack
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Add Backpack
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Click Continue Shopping
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // Verify user returned to the products page
    await expect(
        page.getByText('Products')
    ).toBeVisible();
});


// ---------------------------------------------------------
// TEST 5: Checkout Button
// ---------------------------------------------------------

test('user can proceed to checkout', async ({ page }) => {

    // Find Backpack
    const backpack = page
        .locator('.inventory_item')
        .filter({
            hasText: 'Sauce Labs Backpack'
        });

    // Add Backpack
    await backpack
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Click Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Verify that the checkout page is displayed
    await expect(
        page.getByText('Checkout: Your Information')
    ).toBeVisible();
});