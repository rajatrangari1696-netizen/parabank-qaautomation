import { Page, Locator, expect } from '@playwright/test';

export class RequestLoanPage {
  readonly page: Page;
  readonly loanAmount: Locator;
  readonly downPayment: Locator;
  readonly fromAccount: Locator;
  readonly applyButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loanAmount = page.locator('#amount');
    this.downPayment = page.locator('#downPayment');
    this.fromAccount = page.locator('#fromAccountId');
    this.applyButton = page.getByRole('button', {
      name: 'APPLY NOW',
    });
  }

  async applyForLoan(accountNumber: string): Promise<string> {
    await this.loanAmount.fill('1000');
    await this.downPayment.fill('100');
    await this.fromAccount.selectOption(accountNumber);
    await this.applyButton.click();

    await expect(
      this.page.getByText('Loan Request Processed')
    ).toBeVisible();

    await expect(
      this.page.getByText('Status: Approved')
    ).toBeVisible();

    const loanAccountNumber = await this.page
      .locator('#newAccountId')
      .innerText();

    return loanAccountNumber.trim();
  }
}