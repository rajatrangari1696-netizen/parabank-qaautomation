import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator('#customer\\.firstName');
    this.lastName = page.locator('#customer\\.lastName');
    this.address = page.locator('#customer\\.address\\.street');
    this.city = page.locator('#customer\\.address\\.city');
    this.state = page.locator('#customer\\.address\\.state');
    this.zipCode = page.locator('#customer\\.address\\.zipCode');
    this.phone = page.locator('#customer\\.phoneNumber');
    this.ssn = page.locator('#customer\\.ssn');
    this.username = page.locator('#customer\\.username');
    this.password = page.locator('#customer\\.password');
    this.confirmPassword = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'REGISTER' });
  }

  async registerUser(username: string, password: string) {
    await this.firstName.fill('Rajat');
    await this.lastName.fill('TestUser');
    await this.address.fill('123 Test Street');
    await this.city.fill('Nagpur');
    await this.state.fill('Maharashtra');
    await this.zipCode.fill('440001');
    await this.phone.fill('9999999999');
    await this.ssn.fill('123456789');

    await this.username.fill(username);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);

    await this.registerButton.click();
  }
}