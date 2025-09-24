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

  test('should display welcome message', async () => {
    await expect(page.locator('#app')).toContainText(
      'ก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่'
    );
    await page.waitForTimeout(2000);
  });

  test('logo navigation', async () => {
    await page
      .locator('div')
      .filter({ hasText: /^All Botsดูทั้งหมด$/ })
      .getByRole('button')
      .click();
    await expect(page).toHaveURL('/trend');

    await page.getByRole('link', { name: 'AI' }).click();
    await expect(page).toHaveURL('/');
    await page.waitForTimeout(2000);
  });

  test.describe('Language switch', () => {
    test('switch TH → EN → TH', async () => {
      await page.getByRole('button', { name: 'TH Flag TH' }).click();
      await expect(
        page.getByRole('heading', { name: 'Step into a New World!' })
      ).toBeVisible();

      await page.getByRole('button', { name: 'EN Flag EN' }).click();
      await expect(page.locator('#app')).toContainText(
        'ก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่'
      );
      await page.waitForTimeout(2000);
    });
  });

  test('click point button', async () => {
    const pointButton = page.locator(
      '#app > main > nav > div.flex.w-full.items-center.justify-between.px-4.sm\\:px-9.overflow-x-auto > div.flex.items-center.gap-3 > a > button'
    );

    await pointButton.click();
    await expect(page).toHaveURL('/point');
    await page.waitForTimeout(2000);
  });

  test.describe('Bot creation', () => {
    test('click create bot on banner', async () => {
      await page.goto('/');
      await page.getByText('สร้างเลย').click();
      await expect(page).toHaveURL('/create-bot');
      await page.waitForTimeout(2000);
    });
  });

  test.describe('Search and Filter', () => {
    test('click filter button', async () => {
      await page.goto('/');
      await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
      await expect(page).toHaveURL('/filter');
      await page.waitForTimeout(2000);
    });

    test('search bot', async () => {
      await page.goto('/');
      const searchBox = page.getByRole('textbox', { name: 'ค้นหาบอท' });
      await searchBox.click();
      await searchBox.type('cat', { delay: 500 });

      await expect(page.locator('#app')).toContainText('result');
      await page.waitForTimeout(2000);

      // await page
      //   .locator('div')
      //   .filter({ hasText: /^Rigby Cat3 conversations$/ })
      //   .first()
      //   .click();
      // await expect(page).toHaveURL(/\/chat/);
    });
  });

  test('open bot and start chat (normal + Just_me)', async () => {
    await page.goto('/');
    await page.getByText('Hello Kitty40MiscellaneousCustom Assistant').click();

    await expect(page.locator('#app')).toContainText('เริ่มแชท');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'เริ่มแชท' }).click();
    await expect(page).toHaveURL(/\/chat/);

    await page.goto('/');
    await page.getByText('Hello Kitty40MiscellaneousCustom Assistant').click();

    await expect(page.locator('#app')).toContainText('เริ่มแชท');
    await page.getByRole('button', { name: 'Just_me' }).click();

    const chatButton = page.getByRole('button', { name: 'Chat with Hello Kitty' });
    await expect(chatButton).toBeVisible();
    await page.waitForTimeout(2000);

    const popupPromise = page.waitForEvent('popup');
    await chatButton.click();

    const popup = await popupPromise;
    await expect(popup).toHaveURL(/\/chat/);
  });

  test.describe('Explore section', () => {
    test('view all - all bots', async () => {
      await page.goto('/');
      await page
        .locator('div')
        .filter({ hasText: /^All Botsดูทั้งหมด$/ })
        .getByRole('button')
        .click();
      await expect(page).toHaveURL('/trend');
      await page.waitForTimeout(2000);
    });

    test('view all - for you', async () => {
      await page.goto('/');
      await page
        .locator('div')
        .filter({ hasText: /^For Youดูทั้งหมด$/ })
        .getByRole('button')
        .click();
      await expect(page).toHaveURL('/cateforyou');
      await page.waitForTimeout(2000);
    });

    test('view all - popular bots', async () => {
      await page.goto('/');
      await page
        .locator('div')
        .filter({ hasText: /^Popular Botsดูทั้งหมด$/ })
        .getByRole('button')
        .click();
      await expect(page).toHaveURL('/popular?sortBy=rating');
      await page.waitForTimeout(2000);
    });
  });

  test('click promotion banner get point', async () => {
    await page.goto('/');
    await page.getByRole('button', { name: 'รับพอยท์' }).click();
    await expect(page).toHaveURL('/point');
    await page.waitForTimeout(2000);
  });

  test('click chat now button', async () => {
    await page.goto('/');
    await page.getByRole('button', { name: 'แชทเลย' }).click();
    await expect(page).toHaveURL(/\/chat/);
    await page.waitForTimeout(2000);
  });

  test.describe('Main menu navigation', () => {
    test('navigate to แก้ไขโปรไฟล์', async () => {
      const avatarButton = page.getByRole('button', { name: 'User avatar' });

      await avatarButton.click();
      await page.getByRole('button', { name: 'แก้ไขโปรไฟล์' }).click();
      await expect(page).toHaveURL('/profileedit');
      await page.waitForTimeout(2000);
    });

    test('navigate to สร้างเพื่อนใหม่', async () => {
      const avatarButton = page.getByRole('button', { name: 'User avatar' });

      await avatarButton.click();
      await page.getByRole('button', { name: 'สร้างเพื่อนใหม่' }).click();
      await expect(page).toHaveURL('/create-bot');
      await page.waitForTimeout(2000);
    });

    test('navigate to แชท', async () => {
      const avatarButton = page.getByRole('button', { name: 'User avatar' });

      await avatarButton.click();
      await page.getByRole('button', { name: 'แชท' }).click();
      await expect(page).toHaveURL('/chat');
      await page.waitForTimeout(2000);
    });

    test('navigate to บอทของฉัน', async () => {
      const avatarButton = page.getByRole('button', { name: 'User avatar' });

      await avatarButton.click();
      await page.getByRole('button', { name: 'บอทของฉัน' }).click();
      await expect(page).toHaveURL('/profile');
      await page.waitForTimeout(2000);
    });

    test('navigate to พอยท์', async () => {
      const avatarButton = page.getByRole('button', { name: 'User avatar' });

      await avatarButton.click();
      await page.getByRole('button', { name: 'พอยท์', exact: true }).click();
      await expect(page).toHaveURL('/point');
      await page.waitForTimeout(2000);
    });
    
    test('navigate to ออกจากระบบ', async () => {
      const avatarButton = page.getByRole('button', { name: 'User avatar' });

      await avatarButton.click(); 
      await page.getByRole('button', { name: 'ออกจากระบบ' }).click();

      await expect(page).toHaveURL('/');
    });

  });
});
