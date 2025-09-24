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

  const clickFirstBotAndStartChat = async () => {
    await page.locator('.absolute.inset-0.bg-black').first().click();

    const startChatButton = page.getByRole('button', { name: 'เริ่มแชท' });
    await expect(startChatButton).toBeVisible();
    await startChatButton.click();

    await expect(page).toHaveURL(/\/chat/);
  };

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
