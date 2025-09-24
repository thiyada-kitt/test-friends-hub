import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { openLoginModal, loginWithEmail } from './tests/helpers/authHelper';

dotenv.config();
const BASE_URL = process.env.BASE_URL;

const EMAIL = process.env.EMAIL_AUTH || 'tester.ibotnoi@gmail.com';
const PASSWORD = process.env.PASSWORD_AUTH || 'team.tester';

async function globalSetup(config: FullConfig) {
  const storageStatePath = path.resolve(__dirname, 'playwright/.auth/storageState.json');
  const authDir = path.dirname(storageStatePath);

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`${BASE_URL}/`);
  
  await openLoginModal(page); 
  await loginWithEmail(page, EMAIL, PASSWORD);

  await page.context().storageState({ path: storageStatePath });
  await browser.close();

  console.log(`✅ Saved login state to: ${storageStatePath}`);
}

export default globalSetup;
