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

  test.describe('Search and Filter', () => {
    test('click filter button', async () => {
      await page.goto('/');
      await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
      await expect(page).toHaveURL('/filter');
    });

    test('click back button', async () => {
      await page.goto('/');
      await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
      await expect(page).toHaveURL('/filter');
    });

    test('select cate and start chat', async () => {
      // --- เลือก category ---
      await page.getByRole('button', { name: 'Friend' }).click();
      await expect(page.getByRole('heading', { name: 'Friend' })).toBeVisible();
      await page.getByRole('button', { name: 'Casual Friend' }).click();

      // --- ล้างตัวกรอง ---
      await page.getByRole('button', { name: 'ล้างตัวกรอง' }).click();
      await expect(page.getByRole('heading', { name: 'ทั้งหมด' })).toBeVisible();
      await page.waitForTimeout(2000);

      // --- คลิกการ์ดตัวแรกโดยไม่เปิดแท็บใหม่ ---
      await page.evaluate(() => {
        const card = document.querySelector('div.grid > div:nth-child(1)') as HTMLElement;
        if (card) card.click();
      });

      // --- รอปุ่มเริ่มแชท ---
      const startChatButton = page.getByRole('button', { name: 'เริ่มแชท' });
      await expect(startChatButton).toBeVisible();
      await page.waitForTimeout(2000);

      // --- คลิกเริ่มแชทและตรวจสอบ URL ---
      await startChatButton.click();
      await expect(page).toHaveURL(/\/chat/);
      await page.waitForTimeout(2000);

    });
  });
});
