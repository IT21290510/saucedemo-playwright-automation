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

  // Checkout price information
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

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

    // Locate checkout price information
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
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

  // Get subtotal amount
  async getSubtotal() {
    const text = await this.subtotal.textContent();

    return Number(
      text?.replace('Item total: $', '')
    );
  }

  // Get tax amount
  async getTax() {
    const text = await this.tax.textContent();

    return Number(
      text?.replace('Tax: $', '')
    );
  }

  // Get total amount
  async getTotal() {
    const text = await this.total.textContent();

    return Number(
      text?.replace('Total: $', '')
    );
  }
}