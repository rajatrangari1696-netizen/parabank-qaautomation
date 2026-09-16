import { APIRequestContext, expect } from '@playwright/test';

export class ParaBankAccountApi {
  private readonly baseUrl =
    'https://parabank.parasoft.com/parabank/services/bank';

  constructor(private request: APIRequestContext) {}

  async getAccount(accountNumber: string) {
    const response = await this.request.get(
      `${this.baseUrl}/accounts/${accountNumber}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    expect(response.status()).toBe(200);

    return await response.json();
  }


  async deposit(accountNumber: number, amount: number) {
  const response = await this.request.post(
    `${this.baseUrl}/deposit`,
    {
      params: {
        accountId: accountNumber,
        amount: amount.toString(),
      },
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.text();

  console.log('Deposit response:', responseBody);

  return responseBody;
}

  async getTransactions(accountNumber: string) {
    const response = await this.request.get(
      `${this.baseUrl}/accounts/${accountNumber}/transactions`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    expect(response.status()).toBe(200);

    return await response.json();
  }
async login(username: string, password: string) {
  const response = await this.request.get(
    `${this.baseUrl}/login/${username}/${password}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  expect(response.status()).toBe(200);

  return await response.json();
}

async getCustomerAccounts(customerId: number) {
  const response = await this.request.get(
    `${this.baseUrl}/customers/${customerId}/accounts`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  expect(response.status()).toBe(200);

  const accounts = await response.json();

  console.log('Customer accounts response:', accounts);

  return accounts;
}
}