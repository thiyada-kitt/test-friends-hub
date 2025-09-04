# test-friends-hub
Playwright-based test automation project for Friends Hub web application

This project aims to ensure the functionality and reliability of the Friends Hub platform through end-to-end automated tests using Playwright and TypeScript.

---

## Features
- Automated E2E tests for critical user flows
- Utilizes Playwright for browser automation  
- Written in TypeScript for type safety and better maintainability  
- Supports cross-browser testing
- Generates detailed **Allure reports** with screenshots and videos for failed tests
- Supports environments staging via `.env` files

---

## Getting Started

### Prerequisites
- Node.js
- npm or yarn package manager

### Installation
1. Clone the repository  
```bash
git clone https://github.com/thiyada-kitt/test-friends-hub.git
cd test-friends-hub
```
2. Install dependencies
```bash
npm install
npm install --save-dev allure-commandline
# or
yarn install
```
3. Create .env file
```bash
BASE_URL=https://example.com/
```

4. Run tests
```bash
npx playwright test
```
---

### Usage

Run all tests (headless mode)
> npx playwright test

Run a specific test file (headed mode)
> npx playwright test tests/file.spec.ts --headed

Show last test report
> npx playwright show-report

Run tests with headed mode
> npx playwright test --headed

Run tests with UI mode
> npx playwright test --ui

Generate code from browser actions
> npx playwright codegen <url>

Generate Allure report
> npx allure generate allure-results --clean -o allure-report

Open Allure report
> npx allure open allure-report

---

This project is for internal use only, please follow company guidelines.


Recommended to run full E2E and regression tests on staging environment, not production.
