# Engineering Decisions

## 1. Test Data and Database State

ParaBank is a stateful application and tests can affect shared account data.

The framework uses the ParaBank admin API to clean the database before scenarios that require a known initial state.

This prevents previously created users, accounts, transactions, and balances from affecting test results.

Tests are configured to run with a single worker to avoid concurrent database-reset operations against the shared ParaBank environment.

---

## 2. API vs UI Responsibilities

API operations are used where they provide reliable and efficient environment or data management.

Examples:
- Cleaning the database
- Configuring the loan provider
- Registering a test user headlessly
- Retrieving customer/account information
- Depositing test funds
- Retrieving transaction history

UI automation is used for the customer workflows that are explicitly required to be validated through the application interface.

This keeps UI tests focused on user-facing behavior while avoiding unnecessary UI steps for test-data setup and verification.

---

## 3. Currency Precision

Currency values are parsed from the application as numeric values after removing currency symbols and separators.

The transfer amounts used in Scenario B are:

- $150.00
- $25.50
- $8.99

The expected total deduction is:

$150.00 + $25.50 + $8.99 = $184.49

For larger financial calculations, integer cents or a decimal library would be preferable to avoid floating-point precision issues.

---

## 4. Transaction Response Validation

Scenario C retrieves transaction history through the REST API.

The response is validated against the expected TypeScript transaction structure:

- `id`
- `accountId`
- `type`
- `date`
- `amount`
- `description`

The test also verifies that the API response is an array before validating transaction data.

---

## 5. Dynamic Test Data

Usernames are generated using the current timestamp.

This prevents username collisions between test executions and allows the suite to be executed repeatedly without hard-coded user credentials.

---

## 6. Synchronization

The framework does not use static waits such as `waitForTimeout()`.

Playwright locator-based waits and element state checks are used instead so that tests synchronize with actual application state.

This reduces unnecessary execution time and improves test stability.