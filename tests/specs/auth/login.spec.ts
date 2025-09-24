import { test, expect } from '../../fixtures/loginFixture';

test.describe.serial('Authentication popup - Google OAuth', () => {
  test('login google popup', async ({ page }) => {
    await page.goto('/');

    // รอ modal 
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await page.locator('.flex.flex-col.w-full.items-center.p-4')
      .waitFor({ state: 'visible', timeout: 40000 });

    const popupPromise = page.waitForEvent('popup', { timeout: 60000 });

    const googleBtn = page.locator('div')
      .filter({ hasText: /^FRIENDSHUBก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่$/ })
      .getByRole('button');

    await expect(googleBtn).toBeVisible({ timeout: 10000 });
    await googleBtn.click();

    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded', { timeout: 60000 });

    await expect.poll(async () => new URL(popup.url()).hostname, {
      timeout: 15000,
      message: 'Popup hostname should resolve to firebase',
    }).toBe('botnoivoice-1ff7a.firebaseapp.com');

    await popup.close();
  });

  test.describe('Authentication popup', () => {
    test('login email/password', async ({ page, login }) => {
      await login();
      await expect(page.getByRole('heading', { name: 'ล่าสุด' })).toBeVisible();
    });
  });
});
