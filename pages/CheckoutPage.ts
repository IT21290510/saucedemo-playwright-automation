import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Checkout form locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  // Checkout buttons
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  // Order confirmation
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locate checkout form fields
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

    // Locate checkout buttons
    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });

    this.cancelButton = page.getByRole('button', {
      name: 'Cancel',
    });

    this.finishButton = page.getByRole('button', {
      name: 'Finish',
    });

    // Locate order confirmation message
    this.confirmationMessage = page.getByText(
      'Thank you for your order!'
    );
  }

  // Enter customer checkout information
  async enterCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Continue to checkout overview
  async continueToOverview() {
    await this.continueButton.click();
  }

  // Cancel checkout
  async cancelCheckout() {
    await this.cancelButton.click();
  }

  // Complete the order
  async finishOrder() {
    await this.finishButton.click();
  }
}