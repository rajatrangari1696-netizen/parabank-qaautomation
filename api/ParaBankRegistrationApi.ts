import { APIRequestContext, expect } from '@playwright/test';

export class ParaBankRegistrationApi {
  private readonly baseUrl =
    'https://parabank.parasoft.com/parabank';

  constructor(private request: APIRequestContext) {}

  async registerUser(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) {
    // Establish a session first
    const registerPage = await this.request.get(
      `${this.baseUrl}/register.htm`
    );

    expect(registerPage.status()).toBe(200);

    const response = await this.request.post(
      `${this.baseUrl}/register.htm`,
      {
        form: {
          'customer.firstName': firstName,
          'customer.lastName': lastName,
          'customer.address.street': '123 Test Street',
          'customer.address.city': 'Nagpur',
          'customer.address.state': 'Maharashtra',
          'customer.address.zipCode': '440001',
          'customer.phoneNumber': '9999999999',
          'customer.ssn': '123456789',
          'customer.username': username,
          'customer.password': password,
          repeatedPassword: password,
        },
      }
    );

    console.log('Registration status:', response.status());
    console.log('Registration URL:', response.url());

    const responseBody = await response.text();

    console.log('Registration response:', responseBody);

    expect(response.ok()).toBeTruthy();

    return responseBody;
  }
}