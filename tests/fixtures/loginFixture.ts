import { test as base } from '@playwright/test';
import { openLoginModal, loginWithEmail } from '../helpers/authHelper';

type LoginFixtures = {
  login: () => Promise<void>;
};

export const test = base.extend<LoginFixtures>({
  login: async ({ page }, use) => {
    await openLoginModal(page);
    await loginWithEmail(page, 'tester.ibotnoi@gmail.com', 'team.tester');
    await use(async () => {});
  },
});

export { expect } from '@playwright/test';

// สร้างบัญชีทดสอบสำหรับรันเทสต์
//  EMAIL_AUTH: { email: 'tester.ibotnoi@gmail.com', password: 'team.tester'},
//  GOOGLE_AUTH: { email: 'test.ibotnoi@gmail.com', password: 'team.tester'}