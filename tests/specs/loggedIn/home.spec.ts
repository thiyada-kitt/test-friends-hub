// import { test, expect } from '../../fixtures/loggedInFixture';

// test.describe('Home page after login', () => {
//   // --- Welcome message ---
//   test('should display welcome message', async ({ loggedInPage }) => {
//     await expect(loggedInPage.locator('#app')).toContainText(
//       'ก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่'
//     );
//   });

//   // --- Logo / navigation ---
//   test('logo navigation', async ({ loggedInPage }) => {
//     await loggedInPage
//       .locator('div')
//       .filter({ hasText: /^All Botsดูทั้งหมด$/ })
//       .getByRole('button')
//       .click();
//     await expect(loggedInPage).toHaveURL('/trend');

//     await loggedInPage.getByRole('link', { name: 'AI' }).click();
//     await expect(loggedInPage).toHaveURL('/');
//   });

//   // --- Language switch ---
//   test.describe('Language switch', () => {
//     test('switch TH-EN', async ({ loggedInPage }) => {
//       await loggedInPage.getByRole('button', { name: 'TH Flag TH' }).click();
//       await expect(
//         loggedInPage.getByRole('heading', { name: 'Step into a New World!' })
//       ).toBeVisible();

//       await loggedInPage.getByRole('button', { name: 'EN Flag EN' }).click();
//       await expect(loggedInPage.locator('#app')).toContainText(
//         'ก้าวสู่โลกใหม่!กับเพื่อน AI มากมายที่นี่'
//       );
//     });
//   });

//   // --- Bot card interactions ---
//   test.describe('Bot card interactions', () => {
//     const getAvatarButton = (page: any) => page.locator('nav img[alt="User Profile"]');
//     const avatarButton = getAvatarButton;

//     test('click card bot and start chat', async ({ loggedInPage }) => {
//       await loggedInPage.locator('.absolute.inset-0.bg-black').first().click();
//       await loggedInPage.getByRole('button', { name: 'เริ่มแชท' }).click();
//       await expect(loggedInPage).toHaveURL(/\/chat/);
//       await expect(avatarButton(loggedInPage)).not.toHaveClass(/hidden/);
//     });

//     test('close card bot', async ({ loggedInPage }) => {
//       await loggedInPage.locator('.absolute.inset-0.bg-black').first().click();
//       await loggedInPage.locator('.absolute.top-4').click();
//       await expect(
//         loggedInPage.locator('.fixed.inset-0.bg-black')
//       ).toHaveCount(0);
//     });
//   });

//   // --- Bot creation ---
//   test('click create bot on banner', async ({ loggedInPage }) => {
//     await loggedInPage.getByText('สร้างเลย').click();
//     await expect(loggedInPage).toHaveURL(/\/create-bot/);
//   });

//   // --- Search and Filter ---
//   test.describe('Search and Filter', () => {
//     test('click filter button', async ({ loggedInPage }) => {
//       await loggedInPage.getByRole('button').filter({ hasText: /^$/ }).click();
//       await expect(loggedInPage).toHaveURL('/filter');
//     });

//     test('search bot', async ({ loggedInPage }) => {
//       const searchBox = loggedInPage.getByRole('textbox', { name: 'ค้นหาบอท' });
//       await searchBox.fill('cat');
//       await expect(loggedInPage.locator('#app')).toContainText('result');

//       const botCard = loggedInPage.getByText('Cat Laugh', { exact: false }).first();
//       await botCard.waitFor({ state: 'visible' });
//       await botCard.click();
//       await expect(loggedInPage).toHaveURL(/\/chat/);
//     });
//   });

//   // --- Explore section ---
//   test.describe('Explore section', () => {
//     const exploreItems = [
//       { text: 'All Botsดูทั้งหมด', url: '/trend' },
//       { text: 'For Youดูทั้งหมด', url: '/cateforyou' },
//       { text: 'Popular Botsดูทั้งหมด', url: '/popular?sortBy=rating' },
//     ];

//     for (const item of exploreItems) {
//       test(`explore view all - ${item.text}`, async ({ loggedInPage }) => {
//         await loggedInPage
//           .locator('div')
//           .filter({ hasText: new RegExp(`^${item.text}$`) })
//           .getByRole('button')
//           .click();
//         await expect(loggedInPage).toHaveURL(item.url);
//       });
//     }
//   });

//   // --- Promotion banner ---
//   test('click promotion banner get point', async ({ loggedInPage }) => {
//     await loggedInPage.getByRole('button', { name: 'รับพอยท์' }).click();
//     await expect(loggedInPage).toHaveURL('/point');
//   });

//   // --- Main menu navigation ---
//   test('navigate through main menu', async ({ loggedInPage }) => {
//     const menu = [
//       { button: 'พอยท์', url: '/point' },
//       { button: 'แก้ไขโปรไฟล์', url: '/profile' },
//       { button: 'สร้างเพื่อนใหม่', url: '/create-bot' },
//       { button: 'แชท', url: '/chat' },
//       { button: 'บอทของฉัน', url: '/profile' },
//       { button: 'พอยท์', url: '/point' },
//     ];

//     const avatarButton = loggedInPage.locator('nav img[alt="User Profile"]');

//     for (const item of menu) {
//       await loggedInPage.getByRole('button', { name: item.button, exact: true }).click();
//       await expect(loggedInPage).toHaveURL(item.url);
//       await expect(avatarButton).not.toHaveClass(/hidden/, { timeout: 15000 });
//     }

//     await loggedInPage.getByRole('button', { name: 'ออกจากระบบ' }).click();
//     await expect(loggedInPage.getByRole('button', { name: 'Login' })).toBeVisible();
//   });
// });
