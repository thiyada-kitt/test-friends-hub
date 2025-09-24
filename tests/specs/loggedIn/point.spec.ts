import { test, expect, BrowserContext, Page } from '@playwright/test';
import { openLoginModal, loginWithEmail } from '../../helpers/authHelper';

test.describe.serial('Home page after login', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await openLoginModal(page);
    await loginWithEmail(page, 'tester.ibotnoi@gmail.com', 'team.tester');
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('navigate to พอยท์ page', async () => {
    await page.getByRole('button', { name: 'User avatar' }).click();
    await page.getByRole('button', { name: 'พอยท์', exact: true }).click();
    await expect(page).toHaveURL('/point');
  });

  test('switch TH → EN → TH', async () => {
    await page.getByRole('button', { name: 'TH Flag TH' }).click();
    await expect(page.locator('h1')).toContainText('Purchase Points');

    await page.getByRole('button', { name: 'EN Flag EN' }).click();
    await expect(page.locator('h1')).toContainText('ซื้อพอยท์');
  });

  test('custom point purchase', async () => {
    await page.getByRole('spinbutton').fill('2000');
    await page.getByRole('button', { name: 'บาท' }).click();

    await expect(page.getByRole('heading', { name: 'ชำระเงิน' })).toBeVisible();
    await page.getByRole('button', { name: 'ยืนยันการซื้อ' }).click();

    await page.waitForURL(/stripe\.com/);

    // // กรอกข้อมูลบน Stripe
    // await page.getByRole('textbox', { name: 'อีเมล' }).fill('test@gmail.com');
    // await page.getByTestId('hosted-payment-submit-button').click();

    // // ถ้ามี iframe PromptPay
    // const frame = page.frameLocator('iframe[title="Checkout PromptPay"]');
    // try {
    //   await frame.getByRole('button', { name: 'จำลองการสแกน' }).click();
    // } catch {
    //   // ไม่มี iframe ก็ข้าม
    // }

    // // authorize payment ถ้า redirect ไปหน้าต่อ
    // try {
    //   const authorizeBtn = page.getByRole('button', { name: 'Authorize Test Payment' });
    //   await authorizeBtn.click();
    // } catch {}

    // // กลับหน้า friendhub
    // await page.goto('https://friendhub-staging.ibotnoi.com/');
    // await expect(page).toHaveURL('https://friendhub-staging.ibotnoi.com/');
  });

  test('buy 349 บาท package', async () => {
    await page.goto('/point');
    await page.getByText('349 บาทซื้อ').click();
    await page.getByRole('button', { name: 'ยืนยันการซื้อ' }).click();

    await page.waitForURL(/stripe\.com/);

    // await page.getByRole('textbox', { name: 'อีเมล' }).fill('test@gmail.com');
    // await page.getByTestId('hosted-payment-submit-button').click();

    // const frame = page.frameLocator('iframe[title="Checkout PromptPay"]');
    // try {
    //   await frame.getByRole('button', { name: 'จำลองการสแกน' }).click();
    // } catch {}

    // try {
    //   const authorizeBtn = page.getByRole('button', { name: 'Authorize Test Payment' });
    //   await authorizeBtn.click();
    // } catch {}

    // await page.goto('https://friendhub-staging.ibotnoi.com/');
    // await expect(page).toHaveURL('https://friendhub-staging.ibotnoi.com/');
  });
});
