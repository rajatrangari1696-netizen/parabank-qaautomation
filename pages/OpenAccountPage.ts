import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly accountType: Locator;
  readonly fromAccount: Locator;
  readonly openAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountType = page.locator('#type');
    this.fromAccount = page.locator('#fromAccountId');
    this.openAccountButton = page.getByRole('button', {
      name: 'OPEN NEW ACCOUNT',
    });
  }

  async openCheckingAccount(accountNumber: string) {
    await this.accountType.selectOption('0');
    await this.fromAccount.selectOption(accountNumber);
    await this.openAccountButton.click();

await this.page.locator('#newAccountId').waitFor();
return await this.page.locator('#newAccountId').innerText();
  }
}