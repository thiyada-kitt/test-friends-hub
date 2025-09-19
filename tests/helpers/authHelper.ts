import { Page, expect } from '@playwright/test';

export async function openLoginModal(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.locator('.flex.flex-col.w-full.items-center.p-4').waitFor({ state: 'visible' });
}

export async function loginWithEmail(page: Page, email: string, password: string) {
  await page.getByRole('textbox', { name: 'อีเมลของคุณ' }).fill(email);
  await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill(password);
  await page.locator('div').filter({ hasText: /^รหัสผ่าน \*$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).nth(1).click();

  const avatar = page.locator('nav img[alt="User Profile"]');
  await expect(avatar).not.toHaveClass(/hidden/, { timeout: 20000 });
}


export async function getUserAvatar(page: Page) {
  return page.locator('nav img[alt="User Profile"]');
}
