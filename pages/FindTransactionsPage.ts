import { Page, Locator } from '@playwright/test';

export class FindTransactionsPage {
  readonly page: Page;
  readonly accountSelect: Locator;
  readonly transactionDate: Locator;
  readonly findByDateButton: Locator;
  readonly transactionTable: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountSelect = page.locator('#accountId');
    this.transactionDate = page.locator('#transactionDate');
    this.findByDateButton = page.locator('#findByDate');
    this.transactionTable = page.locator('#transactionTable');
  }

  async findTransactionsByDate(
    accountNumber: string,
    date: string
  ) {
    await this.accountSelect.selectOption(accountNumber);
    await this.transactionDate.fill(date);
    await this.findByDateButton.click();

    await this.transactionTable.waitFor({
      state: 'visible',
    });
  }

  async getTransferDebitAmounts(
  expectedAmounts: number[]
): Promise<number[]> {
    const rows = this.page.locator(
      '#transactionTable tbody tr'
    );

    const amounts: number[] = [];
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const transactionText = await rows
        .nth(i)
        .locator('td')
        .nth(1)
        .innerText();

      if (transactionText.includes('Funds Transfer Sent')) {
        const debitText = await rows
          .nth(i)
          .locator('td')
          .nth(2)
          .innerText();

        const amount = Number(
          debitText
            .replace('$', '')
            .replace(',', '')
            .trim()
        );

        if (expectedAmounts.includes(amount)) {
  amounts.push(amount);
}
      }
    }

    return amounts;
  }
}