import { Page, Locator } from '@playwright/test';

// Page Object Model (POM) class for the SauceDemo Login page
export class LoginPage {

  // Store the Playwright Page object
  // This allows us to interact with the browser page
  readonly page: Page;

  // -----------------------------
  // Locators
  // -----------------------------

  // Locator for the Username input field
  readonly usernameInput: Locator;

  // Locator for the Password input field
  readonly passwordInput: Locator;

  // Locator for the Login button
  readonly loginButton: Locator;

  // Locator for the login error message
  readonly errorMessage: Locator;


  // Constructor receives the Playwright Page object
  // and initializes all the locators
  constructor(page: Page) {

    // Store the Page object so we can use it throughout this class
    this.page = page;

    // Locate the Username input using its placeholder text
    this.usernameInput = page.getByPlaceholder('Username');

    // Locate the Password input using its placeholder text
    this.passwordInput = page.getByPlaceholder('Password');

    // Locate the Login button using its accessible role and name
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Locate the error message using SauceDemo's data-test attribute
    this.errorMessage = page.locator('[data-test="error"]');
  }


  // -----------------------------
  // Page Actions
  // -----------------------------

  // Navigate to the SauceDemo login page
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }


  // Perform the login action
  // Receives username and password as parameters
  async login(username: string, password: string) {

    // Enter the username into the username field
    await this.usernameInput.fill(username);

    // Enter the password into the password field
    await this.passwordInput.fill(password);

    // Click the Login button
    await this.loginButton.click();
  }


  // -----------------------------
  // Error Message
  // -----------------------------

  // Get the text of the login error message
  async getErrorMessage() {

    // Return the error message text
    return await this.errorMessage.textContent();
  }
}