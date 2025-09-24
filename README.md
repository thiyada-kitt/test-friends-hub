# test-friends-hub
<p align="left">
  <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1670605274484/_kNzNQsQO.png" alt="Playwright Logo" width="75" height="75" style="margin-right:10px;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" alt="TypeScript Logo" width="50" height="50" style="margin-right:10px;">
</p>

Playwright-based test automation project for Friends Hub web application


This project aims to ensure the functionality and reliability of the Friends Hub platform through end-to-end automated tests using Playwright and TypeScript.

---

## Features
- Automated E2E tests for critical user flows
- Utilizes Playwright for browser automation  
- Written in TypeScript for type safety and better maintainability  
- Supports cross-browser testing
- Generates detailed **Allure reports** with screenshots and videos for failed tests
- Supports staging environments via `.env` configuration files 


### Suggested Additions

   **Current Scope:**
   - This project currently covers UI E2E tests for selected stable features only.  
    
   **Future Enhancements:** 
   - API tests may be added in the future to provide more reliable and comprehensive testing.  
   - The project may be migrated to GitLab to enable CI/CD integration for fully automated test execution on each deployment.
   - Tagging and grouping of tests may be added to run selected test groups and reduce execution time as the site scales.
   - Expand Test Coverage: Include registration, payments, and key negative/edge cases for better validation.
   - Convert to POM structure in the future

   > Recommended to run full E2E and regression tests on staging environment, not production.
  
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
# and
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

### Commands

Run all tests (headless mode)
```bash
npx playwright test
```
Run a specific test file (headed mode)
```bash
npx playwright test tests/file.spec.ts --headed
```
Show last test report
```bash
npx playwright show-report
```
Run tests with headed mode
```bash
npx playwright test --headed
```
Run tests with UI mode
```bash
npx playwright test --ui
```
Generate code from browser actions
```bash
npx playwright codegen https://example.com/
```
Generate Allure report
```bash
npx allure generate allure-results --clean -o allure-report
```
Open Allure report
```bash
npx allure open allure-report
```
Delete file report
```bash
find allure-results playwright-report test-results -type f -delete
find playwright-report allure-results -type f -delete
```
---


**⚠️  Proprietary / Internal Use Only**
> Do not distribute without permission.