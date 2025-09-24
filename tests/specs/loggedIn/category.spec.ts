import { test, expect, BrowserContext, Page } from '@playwright/test';
import { openLoginModal, loginWithEmail } from '../../helpers/authHelper';

test.describe.serial('Home page after login', () => {
  let context: BrowserContext;
  let page: Page;

  // --- Login ครั้งเดียวก่อนทุก test ---
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await openLoginModal(page);
    await loginWithEmail(page, 'tester.ibotnoi@gmail.com', 'team.tester');
  });

  test.afterAll(async () => {
    await context.close();
  });

  // --- Helper function สำหรับคลิกการ์ดและเริ่มแชท ---
  const clickFirstBotAndStartChat = async () => {
    // รอการ์ดปรากฏและคลิก
    await page.locator('.absolute.inset-0.bg-black').first().click();

    // คลิกปุ่มเริ่มแชท
    const startChatButton = page.getByRole('button', { name: 'เริ่มแชท' });
    await expect(startChatButton).toBeVisible();
    await startChatButton.click();

    // ตรวจสอบว่าเข้าหน้า chat
    await expect(page).toHaveURL(/\/chat/);
  };

  // --- All Bots ---
  test.describe('View All - All Bots', () => {
    test('access view all - all bots', async () => {
      await page.goto('/');
      await page
        .locator('div')
        .filter({ hasText: /^All Botsดูทั้งหมด$/ })
        .getByRole('button')
        .click();

      await expect(page).toHaveURL('/trend');

      await clickFirstBotAndStartChat();
    });
  });

  // --- For You ---
  test.describe('View All - For You', () => {
    test('access view all - for you', async () => {
      await page.goto('/');
      await page
        .locator('div')
        .filter({ hasText: /^For Youดูทั้งหมด$/ })
        .getByRole('button')
        .click();

      await expect(page).toHaveURL('/cateforyou');

      await clickFirstBotAndStartChat();
    });
  });

  // --- Popular Bots ---
  test.describe('View All - Popular Bots', () => {
    test('access view all - popular bots', async () => {
      await page.goto('/');
      await page
        .locator('div')
        .filter({ hasText: /^Popular Botsดูทั้งหมด$/ })
        .getByRole('button')
        .click();

      await expect(page).toHaveURL('/popular?sortBy=rating');

      await clickFirstBotAndStartChat();
    });
  });
});
