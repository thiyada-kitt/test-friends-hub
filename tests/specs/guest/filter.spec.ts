import { test, expect } from '@playwright/test';

test.describe('Language switch', () => {
  test('switch TH-EN', async ({ page }) => {
    await page.goto('/filter');
    await page.getByRole('button', { name: 'TH Flag TH' }).click();
    await expect(page.getByRole('heading', { name: 'All' })).toBeVisible();

    await page.getByRole('button', { name: 'EN Flag EN' }).click();
    await expect(page.locator('#app')).toContainText('ทั้งหมด');
  });
});

test.describe('Back button - filter page', () => {
  test('back button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').filter({ hasText: /^$/ }).click();

    await expect(page).toHaveURL('/filter');

    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Filter page functions', () => {
  test('filter', async ({ page }) => {
    await page.goto('/filter');
    await page.getByRole('button', { name: 'Friend' }).click();

    await expect(page.getByRole('button', { name: 'Friend', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Friend' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'ล้างตัวกรอง' })).toBeVisible();
    await expect(page.locator('section')).toContainText('หมวดหมู่รอง');

    await page.getByRole('button', { name: 'Casual Friend' }).click();
    await expect(page.getByRole('button', { name: 'Casual Friend', exact: true })).toBeVisible();
    await expect(page.getByRole('paragraph')).toBeVisible();

    await page.getByRole('button', { name: 'ล้างตัวกรอง' }).click();
    await expect(page.getByRole('heading', { name: 'ทั้งหมด' })).toBeVisible();

    await page.locator('div.grid > div:nth-child(1)').click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
  });
});
