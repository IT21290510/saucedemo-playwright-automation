import { test, expect } from '@playwright/test';

// Test 1: Verify that a valid user can log in successfully
test('valid user can login successfully', async ({ page }) => {
    // Open the SauceDemo login page
    await page.goto('https://www.saucedemo.com/');

    // Enter a valid username
    await page.getByPlaceholder('Username').fill('standard_user');

    // Enter the valid password
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the user is redirected to the inventory page
    await expect(page).toHaveURL(/inventory/);

    // Verify that the Products heading is visible
    // This confirms that the login was successful
    await expect(page.getByText('Products')).toBeVisible();
});


// Test 2: Verify that a user cannot log in with an invalid password
test('user cannot login with invalid password', async ({ page }) => {
    // Open the SauceDemo login page
    await page.goto('https://www.saucedemo.com/');

    // Enter a valid username
    await page.getByPlaceholder('Username').fill('standard_user');

    // Enter an incorrect password
    await page.getByPlaceholder('Password').fill('wrongpassword');

    // Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the appropriate error message is displayed
    await expect(
        page.getByText('Username and password do not match')
    ).toBeVisible();
});


// Test 3: Verify that login is prevented when credentials are empty
test('user cannot login with empty credentials', async ({ page }) => {
    // Open the SauceDemo login page
    await page.goto('https://www.saucedemo.com/');

    // Click Login without entering username or password
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the username required validation message is displayed
    await expect(
        page.getByText('Username is required')
    ).toBeVisible();
});
