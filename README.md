# ParaBank QA Automation Framework

Playwright + TypeScript automation framework created for the Senior QA Automation Engineer assignment.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API testing
- Page Object Model
- Custom Playwright Reporter

## Project Structure

```text
ImmverseAI_QA_Assignment/
├── api/
│   ├── ParaBankAccountApi.ts
│   ├── ParaBankAdminApi.ts
│   └── ParaBankRegistrationApi.ts
├── pages/
│   ├── AccountsOverviewPage.ts
│   ├── FindTransactionsPage.ts
│   ├── OpenAccountPage.ts
│   ├── RegisterPage.ts
│   ├── RequestLoanPage.ts
│   └── TransferFundsPage.ts
├── reporter/
│   └── CustomReporter.ts
├── tests/
│   └── parabank.spec.ts
├── types/
│   └── Transaction.ts
├── utils/
│   └── testData.ts
├── DECISIONS.md
├── README.md
├── package.json
├── package-lock.json
└── playwright.config.ts
## Installation

Install the project dependencies:

```bash
npm install
npx playwright install

## Running Tests

Run the complete test suite:

```bash
npm test
```

Run the tests with the browser visible:

npm run test:headed

## Test Scenarios
### Scenario A - Loan Workflow
1. Clean the ParaBank database through the admin API.
2. Configure the Loan Provider Web Service through the admin API.
3. Register a dynamically generated user through the UI.
4. Open a new Checking account.
5. Apply for a loan.
6. Verify that the loan is approved.
7. Extract the Loan Account Number.
8. Retrieve the loan account details through the API.
9. Verify that the approved loan amount is deposited into the loan account.
10. Verify that the loan account balance is $1,000.

### Scenario B - Transfer Validation
1. Transfer $150.00.
2. Transfer $25.50.
3. Transfer $8.99.
4. Open Find Transactions.
5. Parse the transaction amounts and identify transfer-out transactions.
6. Calculate the total transfer deduction.
7. Verify that the total deduction is $184.49.

### Scenario C - API Transaction Flow
1. Clean the ParaBank database.
2. Register a new user through the registration endpoint.
3. Authenticate the newly created user through the REST API.
4. Retrieve the customer's account.
5. Deposit test funds.
6. Retrieve the transaction history.
7. Validate the transaction response structure.

## API Usage
The framework uses API operations for environment preparation and test-data management where appropriate.

Examples include:

- Cleaning the database

- Configuring the loan provider

- Registering users headlessly

- Retrieving customer and account information

- Depositing test funds

- Retrieving transaction history

UI automation is used for customer workflows that are explicitly required to be validated through the ParaBank application.

## Custom Reporting
The framework uses a custom Playwright reporter instead of the default HTML reporter or Allure.

The reporter displays:

- Test execution summary

- Test name

- Test status

- Test duration

- Error details for failed tests

## Headless Execution
The test suite runs in headless mode by default.

Run the complete test suite:

npm test

Run tests with the browser visible:

npm run test:headed

## Architecture
The framework follows a Page Object Model (POM) structure to keep page interactions separate from test scenarios.

- pages/ — UI page objects and user interactions

- api/ — REST API clients for backend operations

- tests/ — test scenarios and assertions

- types/ — TypeScript interfaces for API response structures

- utils/ — reusable test-data utilities

- reporter/ — custom test reporter

## Engineering Decisions
Detailed engineering decisions covering database state management, API vs UI responsibilities, currency precision, transaction response validation, dynamic test data, and synchronization are documented in DECISIONS.md.


