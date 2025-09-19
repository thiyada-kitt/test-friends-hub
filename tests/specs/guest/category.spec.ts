import { test, expect } from '@playwright/test';

test.describe('View All - All Bots', () => {
  test('navigation view all - all bots', async ({ page }) => {
    await page.goto('/');
    await page
      .locator('div')
      .filter({ hasText: /^All Botsดูทั้งหมด$/ })
      .getByRole('button')
      .click();

    await expect(page).toHaveURL('/trend');

    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page).toHaveURL('/');
  });

  test('access view all - all bots', async ({ page }) => {
    await page.goto('/trend');

    await page.locator('.absolute.inset-0.bg-black').first().click();
    await expect(
      page.locator('.flex.flex-col.w-full.items-center.p-4')
    ).toBeVisible();
  });
});

test.describe('View All - For You', () => {
  test('navigation view all - for you', async ({ page }) => {
    await page.goto('/');
    await page
      .locator('div')
      .filter({ hasText: /^For Youดูทั้งหมด$/ })
      .getByRole('button')
      .click();

    await expect(page).toHaveURL('/cateforyou');

    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page).toHaveURL('/');
  });

  test('access view all - for you', async ({ page }) => {
    await page.goto('/cateforyou');

    await page.locator('.absolute.inset-0.bg-black').first().click();
    await expect(
      page.locator('.flex.flex-col.w-full.items-center.p-4')
    ).toBeVisible();
  });
});

test.describe('View All - Popular Bots', () => {
  test('navigation view all - popular bots', async ({ page }) => {
    await page.goto('/');
    await page
      .locator('div')
      .filter({ hasText: /^Popular Botsดูทั้งหมด$/ })
      .getByRole('button')
      .click();

    await expect(page).toHaveURL('/popular?sortBy=rating');

    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page).toHaveURL('/');
  });

  test('access view all - popular bots', async ({ page }) => {
    await page.goto('/cateforyou');

    await page.locator('.absolute.inset-0.bg-black').first().click();
    await expect(
      page.locator('.flex.flex-col.w-full.items-center.p-4')
    ).toBeVisible();
  });
});
