import { test as baseTest, type Page, type BrowserContext } from '@playwright/test';
import { openLoginModal, loginWithEmail } from '../helpers/authHelper';


export const test = baseTest.extend<{
  loggedInPage: Page;
  loggedInContext: BrowserContext;
}>({

    loggedInPage: async ({ browser }, use) => {
    
     const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('/');
    await openLoginModal(page);
    await loginWithEmail(page, 'tester.ibotnoi@gmail.com', 'team.tester');
    
    const avatarButton = page.locator('nav img[alt="User Profile"]');
    await avatarButton.waitFor({ state: 'visible', timeout: 15000 });
    
    await use(page);
    
    await context.close();
  },
  
  loggedInContext: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('/');
    await openLoginModal(page);
    await loginWithEmail(page, 'tester.ibotnoi@gmail.com', 'team.tester');
    
    const avatarButton = page.locator('nav img[alt="User Profile"]');
    await avatarButton.waitFor({ state: 'visible', timeout: 15000 });
    
    await context.storageState({ path: 'playwright/.auth/user.json' });
    
    await use(context);
    
    await context.close();
  },
});

export { expect } from '@playwright/test';

