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

### Usage

Run all tests (headless mode)
```bash
npx playwright test
```
Run a specific test file (headed mode)
```bash
npx playwright show-report
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
---

```bash
Project structure

  tests/
  - เก็บ ไฟล์ test spec โดยตรง
  - เป็นไฟล์ที่ Playwright รันจริง ๆ
  
  pages/ (Page Object Model, POM)
  - เก็บ class ที่แทนหน้าเว็บแต่ละหน้า
  - รวม selector และ action ของหน้านั้น ๆ ไว้ ไม่ต้องเขียนซ้ำทุก test
  - ทำให้ test อ่านง่ายขึ้น
  
  fixtures/
  - เก็บข้อมูล หรือ environment setup
  - เช่น test data, mock users, tokens, db connections, config
  - ใช้สร้าง custom fixtures ให้ Playwright (เช่น login session, other session)
  
  helpers/
  - เก็บฟังก์ชันทั่วไป ที่ใช้ซ้ำในหลาย test
  - เช่น ฟังก์ชันจัดการ date, generate random data, validate responses, API call
  - ลดการเขียนโค้ดซ้ำ และทำให้ test อ่านง่ายขึ้น
```


**This project is for internal use only, please follow company guidelines.**
> Recommended to run full E2E and regression tests on staging environment, not production.
