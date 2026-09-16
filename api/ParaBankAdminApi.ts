import { APIRequestContext, expect } from '@playwright/test';

export class ParaBankAdminApi {
  private readonly baseUrl =
    'https://parabank.parasoft.com/parabank/services/bank';

  constructor(private request: APIRequestContext) {}

  async cleanDatabase() {
    const response = await this.request.post(
      `${this.baseUrl}/cleanDB`
    );

    expect(response.status()).toBe(204);
  }

  async setLoanProviderToWebService() {
    const response = await this.request.post(
      `${this.baseUrl}/setParameter/loanProvider/ws`
    );

    expect(response.status()).toBe(204);
  }

  async prepareEnvironment() {
    await this.cleanDatabase();
    await this.setLoanProviderToWebService();
  }
}