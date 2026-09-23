import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login Tests', () => {

  test('valid user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Login with valid credentials
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Verify successful login
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  });


  test('invalid password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Login with invalid credentials
    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password
    );

    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();

    expect(errorMessage).toContain(
      'Username and password do not match'
    );
  });


  test('empty credentials show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Click login without entering credentials
    await loginPage.login('', '');

    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();

    expect(errorMessage).toContain(
      'Username is required'
    );
  });


  test('locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Login using locked-out user
    await loginPage.login(
      users.lockedOutUser.username,
      users.lockedOutUser.password
    );

    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();

    expect(errorMessage).toContain(
      'Sorry, this user has been locked out.'
    );
  });


  test('user can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Login with valid credentials
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Open navigation menu
    await page.getByRole('button', { name: 'Open Menu' }).click();

    // Click logout
    await page.getByText('Logout').click();

    // Verify user is redirected to login page
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/'
    );
  });

});