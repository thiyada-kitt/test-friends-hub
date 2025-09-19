import { test, expect } from '@playwright/test';

test.describe('Home navigation', () => {
  test('logo navigation', async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^All Botsดูทั้งหมด$/ }).getByRole('button').click();
    await expect(page).toHaveURL('/trend');

    await page.getByRole('link', { name: 'AI' }).click();
    await expect(page).toHaveURL('/'); 
  });2

  test('click card bot on homepage', async ({ page }) => {
    await page.goto('/');
    await page.locator('.absolute.inset-0.bg-black').first().click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
  });
});

test.describe('Language switch', () => {
  test('switch TH-EN', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'TH Flag TH' }).click();
    await expect(page.getByRole('heading', { name: 'Step into a New World!' })).toBeVisible();

    await page.getByRole('button', { name: 'EN Flag EN' }).click();
    await expect(page.locator('#app')).toContainText('ก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่');
  });
});

test.describe('Authentication popup', () => {
  test('click login button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
    await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).first().click();
    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();

    await page.getByRole('button', { name: 'TH Flag TH' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
    await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).first().click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});

test.describe('Bot creation', () => {
  test('click create bot on banner', async ({ page }) => {
    await page.goto('/');
    await page.getByText('สร้างเลย').click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
  });
});

test.describe('Search and Filter', () => {
  test('click filter button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page).toHaveURL('/filter');
  });

  test('search bot', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'ค้นหาบอท' }).click();
    await page.getByRole('textbox', { name: 'ค้นหาบอท' }).fill('cat');
    await expect(page.locator('#app')).toContainText('result');

    await page.getByText('Cat Laugh', { exact: false }).first().waitFor({ state: 'visible' });
    await page.getByText('Cat Laugh', { exact: false }).first().click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
  });
});

test.describe('Explore section', () => {
  test('explore view all - all bots', async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^All Botsดูทั้งหมด$/ }).getByRole('button').click();
    await expect(page).toHaveURL('/trend');
  });

  test('explore view all - for you', async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^For Youดูทั้งหมด$/ }).getByRole('button').click();
    await expect(page).toHaveURL('/cateforyou');
  });

  test('explore view all - popular bots', async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /^Popular Botsดูทั้งหมด$/ }).getByRole('button').click();
    await expect(page).toHaveURL('/popular?sortBy=rating');
  });
});

test.describe('Promotion banner', () => {
  test('click promotion banner get point', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'รับพอยท์' }).click();
    await expect(page.locator('.flex.flex-col.w-full.items-center.p-4')).toBeVisible();
  });
});
