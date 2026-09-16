import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { ParaBankAdminApi } from '../api/ParaBankAdminApi';
import { generateUserData, getTodayDate } from '../utils/testData';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { RequestLoanPage } from '../pages/RequestLoanPage';
import { ParaBankAccountApi } from '../api/ParaBankAccountApi';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { FindTransactionsPage } from '../pages/FindTransactionsPage';
import { ParaBankRegistrationApi } from '../api/ParaBankRegistrationApi';

test('Register a new ParaBank user', async ({ page, request }) => {
  const user = generateUserData();

  console.log('Test username:', user.username);
  console.log('Test password:', user.password);

  // API precondition
  const adminApi = new ParaBankAdminApi(request);
  await adminApi.prepareEnvironment();

  // UI flow
  const registerPage = new RegisterPage(page);
  const accountsPage = new AccountsOverviewPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const loanPage = new RequestLoanPage(page);
  const transferPage = new TransferFundsPage(page);
  const findTransactionsPage = new FindTransactionsPage(page);


  await page.goto('/parabank/index.htm');

  await page.getByRole('link', { name: 'Register' }).click();

  await registerPage.registerUser(user.username, user.password);

  await expect(
    page.getByText('Your account was created successfully')
  ).toBeVisible();
  await page.getByRole('link', { name: 'Accounts Overview' }).click();
  const existingAccountNumber =
  await accountsPage.getFirstAccountNumber();
  console.log('Existing account:', existingAccountNumber);
  await page.locator('#leftPanel')
  .getByRole('link', { name: 'Open New Account' })
  .click();
const newAccountNumber =
  await openAccountPage.openCheckingAccount(existingAccountNumber);
  console.log('New Checking account:', newAccountNumber);
  await page.getByRole('link', { name: 'Request Loan' }).click();
  const loanAccountNumber =
  await loanPage.applyForLoan(existingAccountNumber);

console.log('Loan account:', loanAccountNumber);
const accountApi = new ParaBankAccountApi(request);

const loanAccount =
  await accountApi.getAccount(loanAccountNumber);

console.log('Loan account balance:', loanAccount.balance);

expect(loanAccount.balance).toBe(1000);
await page.getByRole('link', { name: 'Transfer Funds' }).click();

await transferPage.transfer(
  150,
  existingAccountNumber,
  newAccountNumber
);

await transferPage.goToTransferFunds();

await transferPage.transfer(
  25.50,
  existingAccountNumber,
  newAccountNumber
);

await transferPage.goToTransferFunds();

await transferPage.transfer(
  8.99,
  existingAccountNumber,
  newAccountNumber
);

console.log('Transfers completed: 150, 25.50, 8.99');

await page.getByRole('link', { name: 'Find Transactions' }).click();

await findTransactionsPage.findTransactionsByDate(
  existingAccountNumber,
  getTodayDate()
);

const transferDebits =
  await findTransactionsPage.getTransferDebitAmounts([
    150,
    25.50,
    8.99
  ]);

console.log('Scenario B transfer debits:', transferDebits);

const totalTransfers = transferDebits.reduce(
  (sum, amount) => sum + amount,
  0
);

console.log('Total transfer deductions:', totalTransfers);
expect(totalTransfers).toBe(184.49);
});
test('Scenario C - API transaction flow', async ({ request }) => {
  const registrationApi = new ParaBankRegistrationApi(request);
  const accountApi = new ParaBankAccountApi(request);
  const adminApi = new ParaBankAdminApi(request);

  await adminApi.prepareEnvironment();

  const user = generateUserData();

  await registrationApi.registerUser(
    user.firstName,
    user.lastName,
    user.username,
    user.password
  );

  console.log('API user:', user.username);

  const customer = await accountApi.login(
    user.username,
    user.password
  );

  console.log('Customer ID:', customer.id);

  const accounts = await accountApi.getCustomerAccounts(
    customer.id
  );

  const account = accounts[0];

  console.log('API account:', account.id);

  await accountApi.deposit(account.id, 500);

  const transactions =
    await accountApi.getTransactions(account.id);

  console.log('Transactions:', transactions);

  expect(Array.isArray(transactions)).toBeTruthy();

for (const transaction of transactions) {

expect(transaction).toEqual(
expect.objectContaining({
id: expect.any(Number),
accountId: expect.any(Number),
type: expect.any(String),
date: expect.any(Number),
amount: expect.any(Number),
description: expect.any(String),
})
);

}
});