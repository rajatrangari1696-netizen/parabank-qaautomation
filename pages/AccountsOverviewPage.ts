import { Page, Locator } from '@playwright/test';

export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountLinks = page.locator('table#accountTable tbody tr td a');
  }

  async getFirstAccountNumber(): Promise<string> {
    return (await this.accountLinks.first().textContent())!.trim();
  }
}