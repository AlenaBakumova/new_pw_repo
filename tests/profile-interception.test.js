const { test, expect } = require('@playwright/test');
require('dotenv').config(); // Load environment variables

test.describe('User registration and login', () => {
  test('login and modify profile request', async ({ page }) => {
    const Email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // Log request and response
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    // Intercept profile request and modify response
    await page.route('https://qauto2.forstudy.space/api/users/profile', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          userId: 47511,
          photoFilename: 'default-user.png',
          name: 'TEST',
          lastName: 'Undefined',
        }),
      });
    });

    // Visit the site and fill out the login form
    await page.goto('https://guest:welcome2qauto@qauto2.forstudy.space/');
    await page.click('.btn.btn-outline-white.header_signin');
    await page.fill('input#signinEmail', Email);
    await page.fill('input#signinPassword', password);
    await page.click('.modal-footer button.btn.btn-primary');

    // Click on the profile link
    await page.click('#userNavDropdown');
    await page.click('a.user-nav_link[href="/panel/profile"]');

    // Wait for the profile page to load
    await page.waitForSelector('p.profile_name');
    const profileName = await page.locator('p.profile_name').textContent();
    expect(profileName).toContain('TEST Ovchinnikova');
  });
});
