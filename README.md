# upply-test-case

The project is written with TypeScript and Playwright for the automation part.

### Project setup

```
# If you don't have pnpm installed
npm install -g pnpm

# Install dependencies
pnpm install

# Launch tests
pnpm tests
```

### Project configuration

- Project configuration can be found in the `playwright.config.ts` file at the project's root. This file is automatically generated during installation. I've modified the configuration by changing the `baseUrl` for a direct redirection to the testing platform. Additionally, I've adapted the `testIdAttribute` to align with the `data-qa` attribute, which is present on some locators. Utilizing these data-test attributes make the test more maintainable.
- Since the project is using TypeScript, I also added a `tsconfig.json` file in order to define relative paths we can use for this project.
- I've also added the [Prettier library](https://prettier.io/) in order to have a cleaner code.

### Project structure

Tests can be found on the `tests` directory which is composed by:

- A dedicated `helper` directory contains the `helper.ts` file, with the fake data required for testing. I used the [Faker library](https://fakerjs.dev/) in order to generate random data for users and credit card information.
- Following the `Page Object Model`, a dedicated `pages` directory organizes the page-specific elements and interactions. Within this directory, you'll find separate files representing the key user flows covered by the test cases, such as login/sign-up, product interactions, and the checkout process. Additionally, a specific page object handles the initial cookies modal that appears at the start of a test. Each of these files contains the necessary locators and methods to implement our test scenarios.
- The `testCase.spec.ts` file contains all the test cases for this exercise. Given the interdependency of these tests, they are consolidated into a single file and executed using Playwright's [serial mode](https://playwright.dev/docs/test-retries#serial-mode) to ensure the correct order of execution. When it comes to expects, my focus was on verifying the presence of specific text elements that indicate successful actions within the application.

The CI/CD pipeline configuration for GitHub Actions is located under `.github/workflows/playwright.yml`. Playwright can generate this file when you install it, I've changed it a bit for the `on: push` trigger to specifically target the `main` branch. Additionally, I've adjusted the test execution command to `pnpm tests`.
