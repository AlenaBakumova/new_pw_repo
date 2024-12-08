const { test, expect } = require('@playwright/test');
require('dotenv').config(); // Load environment variables

test.describe('User Registration and Login', () => {
  test('Login and Modify Profile Response', async ({ page }) => {
    const Email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    // Log requests and responses for debugging (optional)
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    // Navigate to the website and fill in the login form
    await page.goto('https://guest:welcome2qauto@qauto2.forstudy.space/');
    
    // Login
    await page.click('.btn.btn-outline-white.header_signin');
    await page.fill('input#signinEmail', Email);
    await page.fill('input#signinPassword', password);
    await page.click('.modal-footer button.btn.btn-primary');

    // Wait for successful login
    await expect(page.locator('#userNavDropdown')).toBeVisible();

    // Intercept and mock the profile request
    await page.route('https://qauto2.forstudy.space/api/users/profile', route => {
      console.log('Intercepted profile request:', route.request().url());

      const responseJson = {
        status: 'ok',
        data: {
          userId: 47511,
          photoFilename: 'default-user.png',
          name: 'TEST',
          lastName: 'undefined',
        },
      };

      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(responseJson),
      });

      console.log('Modified profile response:', responseJson);
    });

    // Navigate to the profile page
    await page.click('#userNavDropdown');
    await page.click('a.user-nav_link[href="/panel/profile"]');

    // Wait for the profile name element and retrieve its text content
    await page.waitForSelector('p.profile_name');
    const profileName = await page.locator('p.profile_name').textContent();
    console.log('Profile Name:', profileName);
    
    // Assert that the profile name contains the expected value
    await expect(profileName.trim()).toContain('TEST undefined',{ timeout: 60000 });
  });
});




