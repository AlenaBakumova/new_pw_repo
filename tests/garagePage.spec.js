
const { test } = require('@playwright/test');

test.describe('User Garage Page', () => {
  test('Verify user garage content', async ({ page, userGaragePage }) => {
    await page.goto(process.env.BASE_URL);
    await page.waitForSelector('h1:has-text("User Garage")');
    await userGaragePage.restoreState(page); 

  });
});