import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly amount: Locator;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly transferButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.amount = page.locator('#amount');
    this.fromAccount = page.locator('#fromAccountId');
    this.toAccount = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', {
      name: 'TRANSFER',
    });
  }

  async transfer(
    amount: number,
    fromAccount: string,
    toAccount: string
  ) {
    await this.amount.fill(amount.toString());
    await this.fromAccount.selectOption(fromAccount);

    await this.toAccount.waitFor({ state: 'visible' });
    await this.toAccount.selectOption(toAccount);

    await this.transferButton.click();
  }

  async goToTransferFunds() {
    await this.page.goto('/parabank/transfer.htm');

    await this.transferButton.waitFor({
      state: 'visible',
    });
  }
}