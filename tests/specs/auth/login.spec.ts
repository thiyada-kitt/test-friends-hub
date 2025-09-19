import { test, expect } from '../../fixtures/loginFixture';

test.describe.parallel('Authentication popup', () => {
  test('login email/password', async ({ page, login }) => {
    await login();
    const avatarButton = page.locator('nav img[alt="User Profile"]');
    await expect(avatarButton).not.toHaveClass(/hidden/, { timeout: 15000 });
    
    // await avatarButton.click({ force: true });

    // const logoutButton = page.getByRole('button', { name: 'ออกจากระบบ' });
    // await expect(logoutButton).toBeVisible({ timeout: 60000 });
    // await logoutButton.click();
  });
});

test.describe.serial('Authentication popup - Google OAuth', () => {
  test('login google popup', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await page.locator('.flex.flex-col.w-full.items-center.p-4').waitFor({ state: 'visible' });

    const popupPromise = page.waitForEvent('popup', { timeout: 30000 });
    await page.locator('div')
      .filter({ hasText: /^FRIENDSHUBก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่$/ })
      .getByRole('button')
      .click();
    
    const popup = await popupPromise;
    const popupUrl = new URL(popup.url());
    expect(popupUrl.hostname).toBe('botnoivoice-1ff7a.firebaseapp.com');

    await popup.close();
  });
}); 