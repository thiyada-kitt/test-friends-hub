import { Page, expect } from '@playwright/test';

export async function openLoginModal(page: Page) {
  await page.goto('/',);

  const loginButton = page.getByRole('button', { name: 'เข้าสู่ระบบ' });
  await expect(loginButton).toBeVisible({ timeout: 60000 });
  await expect(loginButton).toBeEnabled({ timeout: 60000 });
  await loginButton.click();

  const loginModal = page.locator('.flex.flex-col.w-full.items-center.p-4');
  await expect(loginModal).toBeVisible({ timeout: 60000 });
}

export async function openRegisterForm(page: Page) {
  await openLoginModal(page);

  const registerButton = page.getByRole('button', { name: 'สร้างบัญชีใหม่' });
  await expect(registerButton).toBeVisible({ timeout: 60000 });
  await expect(registerButton).toBeEnabled({ timeout: 60000 });

  await registerButton.click();

  const registerModal = page.locator('.flex.flex-col.w-full.items-center.p-4');
  await expect(registerModal).toBeVisible({ timeout: 60000 });
  await expect(page.getByText('ยืนยันรหัสผ่าน')).toBeVisible({ timeout: 60000 });
}

export async function fillRegisterForm(page: Page, email: string, password: string) {
  const emailField = page.getByRole('textbox', { name: 'กรอกอีเมล' });
  const passwordField = page.getByRole('textbox', { name: 'กรอกรหัสผ่าน', exact: true });
  const confirmField = page.getByRole('textbox', { name: 'กรอกรหัสผ่านอีกครั้ง' });

  await expect(emailField).toBeVisible({ timeout: 6000 });
  await expect(passwordField).toBeVisible({ timeout: 6000 });
  await expect(confirmField).toBeVisible({ timeout: 6000 });

  await emailField.fill(email);
  await passwordField.fill(password);
  await page.locator('div').filter({ hasText: /^รหัสผ่าน$/ }).getByRole('button').click();

  await confirmField.fill(password);
  await page.locator('div').filter({ hasText: /^ยืนยันรหัสผ่าน$/ }).getByRole('button').click();
}