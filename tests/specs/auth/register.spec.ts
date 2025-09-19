import { test, expect } from '@playwright/test';
import { openRegisterForm, fillRegisterForm } from '../../helpers/registerHelper';

test.describe.parallel('Register UI flow', () => {

  test('open login modal', async ({ page }) => {
    await page.goto('/');
    const loginButton = page.getByRole('button', { name: 'เข้าสู่ระบบ' });
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const loginModal = page.locator('.flex.flex-col.w-full.items-center.p-4');
    await loginModal.waitFor({ state: 'visible' });
  });

  test('open register form', async ({ page }) => {
    await openRegisterForm(page);
  });

  test('fill register form', async ({ page }) => {
    await openRegisterForm(page);
    await fillRegisterForm(page, 'testemail@gmail.com', '123456');

    // ตรวจสอบว่า UI ของ login / register ยัง visible
    const loginForm = page.locator('.flex.flex-col.w-full.items-center.p-4');
    await loginForm.waitFor({ state: 'visible' });
    await expect(page.getByText('ยืนยันรหัสผ่าน')).toBeVisible();
  });

  test('google popup', async ({ page }) => {
    await openRegisterForm(page);

    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'สร้างบัญชีด้วย Google' }).click();
    const popup = await popupPromise;

    const popupUrl = new URL(popup.url());
    expect(popupUrl.hostname).toContain('firebaseapp.com');

    await popup.close();
  });

});
