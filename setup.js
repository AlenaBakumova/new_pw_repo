const { chromium } = require('@playwright/test');
require('dotenv').config();

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const signInButtonSelector = 'button.btn.btn-outline-white.header_signin';

  try {
    console.log('Переход на главную страницу...');
    await page.goto(process.env.BASE_URL);

    // Wait for the "Sign In" button to be visible
    console.log('Ожидание кнопки Sign In...');
    await page.waitForSelector(signInButtonSelector, { timeout: 30000 });

    // Клик по кнопке "Sign In"
    console.log('Клик по кнопке Sign In...');
    await page.click(signInButtonSelector);

    // Wait for the email input field
    console.log('Ожидание поля ввода email...');
    await page.waitForSelector('input[name="email"]', { timeout: 30000 });

    // Ввод тестового email
    console.log('Ввод тестового email...');
    await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL);

    // Wait for the password input field
    console.log('Ожидание поля ввода password...');
    await page.waitForSelector('input[name="password"]', { timeout: 30000 });

    // Ввод тестового пароля
    console.log('Ввод тестового пароля...');
    await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD);

    // Клик по кнопке Login
    console.log('Клик по кнопке Login...');
    await page.click('button:has-text("Login")');

    // Сохранение состояния
    console.log('Сохранение состояния...');
    await page.context().storageState({ path: 'storageState.json' });

  } catch (error) {
    console.error('Ошибка во время настройки:', error);
    throw error;
  } finally {
    await browser.close();
  }
};

