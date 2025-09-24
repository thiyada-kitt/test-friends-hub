import { test, expect } from '../../fixtures/loginFixture';

test.describe.serial('Authentication popup - Google OAuth', () => {
  test('login google popup', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await page.locator('.flex.flex-col.w-full.items-center.p-4').waitFor({ state: 'visible' }) , { timeout: 40000 };
    await page.locator('div').filter({ hasText: /^FRIENDSHUBก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่$/ }).getByRole('button').click();

    const popupPromise = page.waitForEvent('popup', { timeout: 40000 });
    const popup = await popupPromise;
    const popupUrl = new URL(popup.url());
    expect(popupUrl.hostname).toBe('botnoivoice-1ff7a.firebaseapp.com');

    await popup.close();
  });

  test.describe('Authentication popup', () => {
  test('login email/password', async ({ page, login }) => {
    await login();
    const avatarButton = page.locator('nav img[alt="User Profile"]');
    await expect(avatarButton).not.toHaveClass(/hidden/, { timeout: 60000 });
    });
  });
}); 