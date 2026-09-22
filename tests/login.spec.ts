import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Group all login-related test cases together
test.describe('Login Tests', () => {

  // Test 1: Verify that a valid user can log in successfully
  test('valid user can login successfully', async ({ page }) => {

    // Create an object of the LoginPage class
    // This allows us to use the methods and locators from LoginPage
    const loginPage = new LoginPage(page);

    // Open the SauceDemo login page
    await loginPage.goto();

    // Enter valid username and password and click the Login button
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify that the user is successfully redirected
    // to the inventory/products page
    await expect(page).toHaveURL(/inventory/);
  });


  // Test 2: Verify that login fails when an incorrect password is used
  test('user cannot login with invalid password', async ({ page }) => {

    // Create an object of the LoginPage class
    const loginPage = new LoginPage(page);

    // Open the login page
    await loginPage.goto();

    // Enter a valid username with an incorrect password
    await loginPage.login('standard_user', 'wrong_password');

    // Verify that the login error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
  });


  // Test 3: Verify that login fails when username and password are empty
  test('user cannot login with empty credentials', async ({ page }) => {

    // Create an object of the LoginPage class
    const loginPage = new LoginPage(page);

    // Open the login page
    await loginPage.goto();

    // Click the Login button without entering username or password
    await loginPage.login('', '');

    // Verify that an error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
  });


  // Test 4: Verify that a locked-out user cannot log in
  test('locked out user cannot login', async ({ page }) => {

    // Create an object of the LoginPage class
    const loginPage = new LoginPage(page);

    // Open the login page
    await loginPage.goto();

    // Try to log in using the locked-out username
    // with the correct password
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Verify that the login error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
  });

});