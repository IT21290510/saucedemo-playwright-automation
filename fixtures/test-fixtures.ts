import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../test-data/users';

// Define custom fixtures
type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

// Extend Playwright's built-in test with our custom fixtures
export const test = base.extend<Fixtures>({
  // LoginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Provide LoginPage to the test
    await use(loginPage);
  },

  // ProductsPage fixture
  productsPage: async ({ page, loginPage }, use) => {
    // Login before using ProductsPage
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    const productsPage = new ProductsPage(page);

    // Provide ProductsPage to the test
    await use(productsPage);
  },
});

// Export Playwright's expect
export { expect };