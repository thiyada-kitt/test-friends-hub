import { Page, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config();
const BASE_URL = process.env.BASE_URL;

export async function openLoginModal(page: Page) {
  await page.goto(`${BASE_URL}/`);
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.locator('.flex.flex-col.w-full.items-center.p-4').waitFor({ state: 'visible', timeout: 20000 });
}

export async function loginWithEmail(page: Page, email: string, password: string) {
  const emailInput = page.getByRole('textbox', { name: 'อีเมลของคุณ' });
  await emailInput.waitFor({ state: 'visible', timeout: 20000 });
  await emailInput.fill(email);

  const passwordInput = page.getByRole('textbox', { name: 'รหัสผ่าน' });
  await passwordInput.waitFor({ state: 'visible', timeout: 20000 });
  await passwordInput.fill(password);

  // คลิกปุ่ม login
  await page.locator('div')
    .filter({ hasText: /^รหัสผ่าน \*$/ })
    .getByRole('button')
    .click();

  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).nth(1).click();

  // รอ avatar ปรากฏว่า login สำเร็จ
  const avatar = page.locator('nav img[alt="User Profile"]');
  await expect(avatar).not.toHaveClass(/hidden/, { timeout: 60000 });
}

export async function getUserAvatar(page: Page) {
  return page.locator('nav img[alt="User Profile"]');
}
