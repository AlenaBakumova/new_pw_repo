const { test, expect } = require('@playwright/test');
require('dotenv').config(); // .env

function generateRandomEmail(prefix) {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${prefix}-${randomString}@test.com`;
}

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL); // // .env baseURL 
    await page.click('button.hero-descriptor_btn.btn.btn-primary:has-text("Sign up")');
  });

  test('Positive scenario: Successful page load', async ({ page }) => {
    await expect(page).toHaveURL(`${process.env.BASE_URL}/register`);
  });

  test.describe('Field: Name', () => {
    // Name
    const nameTests = [
      { name: '', error: 'Name is required' },
      { name: 'J', error: 'Name has to be from 2 to 20 characters long' },
      { name: 'JohndoeJohnsmithson', error: 'Name has to be from 2 to 20 characters long' },
      { name: ' John', error: 'Name is invalid' },
      { name: 'John ', error: 'Name is invalid' },
      { name: 'John@Doe', error: 'Name is invalid' },
      { name: 'John123', error: 'Name is invalid' },
      { name: 'John Doe', error: 'Name is invalid' },
      { name: '   ', error: 'Name is required' },
      { name: ' JohnDoe ', error: 'Name is invalid' }
    ];

    for (const { name, error } of nameTests) {
      test(`Negative scenario: Name "${name}"`, async ({ page }) => {
        const randomEmail = generateRandomEmail('aqa');

        await page.fill('input[name="name"].ng-untouched.ng-pristine.ng-invalid', name);
        await page.fill('input[name="lastName"].form-control', 'Smith');
        await page.fill('input[name="email"]', randomEmail);
        await page.fill('input[name="password"]', 'Password123');
        await page.fill('input[name="repeatPassword"][type="password"].form-control', 'Password123');

        const registerButton = await page.locator('button.btn.btn-primary[disabled]');
        const registerButtonDisabled = await registerButton.isVisible();
        expect(registerButtonDisabled).toBe(true);

        await page.click('button.btn.btn-primary:has-text("Register")');

        await expect(page.locator(`text=${error}`)).toBeVisible();
      });
    }
  });

  test.describe('Field: Last Name', () => {
    // Last Name
    const lastNameTests = [
      { lastName: '', error: 'Last Name is required' },
      { lastName: 'J', error: 'Last Name has to be from 2 to 20 characters long' },
      { lastName: 'JohndoeJohnsmithson', error: 'Last Name has to be from 2 to 20 characters long' },
      { lastName: ' John', error: 'Last Name is invalid' },
      { lastName: 'John ', error: 'Last Name is invalid' },
      { lastName: 'John@Doe', error: 'Last Name is invalid' },
      { lastName: 'John123', error: 'Last Name is invalid' },
      { lastName: 'John Doe', error: 'Last Name is invalid' },
      { lastName: '   ', error: 'Last Name is required' },
      { lastName: ' JohnDoe ', error: 'Last Name is invalid' }
    ];

    for (const { lastName, error } of lastNameTests) {
      test(`Negative scenario: Last Name "${lastName}"`, async ({ page }) => {
        const randomName = 'John';
        const randomEmail = generateRandomEmail('aqa');

        await page.fill('input[name="name"].ng-untouched.ng-pristine.ng-invalid', randomName);
        await page.fill('input[name="lastName"].form-control', lastName);
        await page.fill('input[name="email"]', randomEmail);
        await page.fill('input[name="password"]', 'Password123');
        await page.fill('input[name="repeatPassword"][type="password"].form-control', 'Password123');

        const registerButton = await page.locator('button.btn.btn-primary[disabled]');
        const registerButtonDisabled = await registerButton.isVisible();
        expect(registerButtonDisabled).toBe(true);

        await page.click('button.btn.btn-primary:has-text("Register")');

        await expect(page.locator(`text=${error}`)).toBeVisible();

        const errorText = await page.locator(`text=${error}`);
        const errorTextColor = await errorText.evaluate((element) => window.getComputedStyle(element).color);
        expect(errorTextColor).toBe('rgb(220, 53, 69)');

        const lastNameInput = await page.locator('input[name="lastName"]');
        const lastNameInputBorderColor = await lastNameInput.evaluate((element) => window.getComputedStyle(element).borderColor);
        expect(lastNameInputBorderColor).toBe('rgb(220, 53, 69)');
      });
    }
  });

  test.describe('Field: Email', () => {
    // Email
    const emailTests = [
      { email: '', error: 'Email required' },
      { email: 'invalidemail', error: 'Email is incorrect' },
      { email: 'invalid.email@test', error: 'Email is incorrect' },
      { email: 'invalid@test.', error: 'Email is incorrect' }
    ];

    for (const { email, error } of emailTests) {
      test(`Negative scenario: Email "${email}"`, async ({ page }) => {
        const randomName = 'John';
        const randomLastName = 'Smith';

        await page.fill('input[name="name"].ng-untouched.ng-pristine.ng-invalid', randomName);
        await page.fill('input[name="lastName"].form-control', randomLastName);
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', 'Password123');
        await page.fill('input[name="repeatPassword"][type="password"].form-control', 'Password123');

        const registerButton = await page.locator('button.btn.btn-primary[disabled]');
        const registerButtonDisabled = await registerButton.isVisible();
        expect(registerButtonDisabled).toBe(true);

        await page.click('button.btn.btn-primary:has-text("Register")');

        await expect(page.locator(`text=${error}`)).toBeVisible();

        const errorText = await page.locator(`text=${error}`);
        const errorTextColor = await errorText.evaluate((element) => window.getComputedStyle(element).color);
        expect(errorTextColor).toBe('rgb(220, 53, 69)');

        const emailInput = await page.locator('input[name="email"]');
        const emailInputBorderColor = await emailInput.evaluate((element) => window.getComputedStyle(element).borderColor);
        expect(emailInputBorderColor).toBe('rgb(220, 53, 69)');
      });
    }
  });

  test.describe('Field: Password', () => {
    // Password
    const passwordTests = [
      { password: '', error: 'Password required' },
      { password: 'pass', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'Password', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'password123', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'PASSWORD123', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'Pass123', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: 'Pass!@#', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' },
      { password: '12345678', error: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' }
    ];

    for (const { password, error } of passwordTests) {
      test(`Negative scenario: Password "${password}"`, async ({ page }) => {
        const randomName = 'John';
        const randomLastName = 'Smith';
        const randomEmail = generateRandomEmail('aqa');

        await page.fill('input[name="name"].ng-untouched.ng-pristine.ng-invalid', randomName);
        await page.fill('input[name="lastName"].form-control', randomLastName);
        await page.fill('input[name="email"]', randomEmail);
        await page.fill('input[name="password"]', password);
        await page.fill('input[name="repeatPassword"][type="password"].form-control', 'Password123');

        const registerButton = await page.locator('button.btn.btn-primary[disabled]');
        const registerButtonDisabled = await registerButton.isVisible();
        expect(registerButtonDisabled).toBe(true);

        await page.click('button.btn.btn-primary:has-text("Register")');

        await expect(page.locator(`text=${error}`)).toBeVisible();

        const errorText = await page.locator(`text=${error}`);
        const errorTextColor = await errorText.evaluate((element) => window.getComputedStyle(element).color);
        expect(errorTextColor).toBe('rgb(220, 53, 69)');

        const passwordInput = await page.locator('input[name="password"]');
        const passwordInputBorderColor = await passwordInput.evaluate((element) => window.getComputedStyle(element).borderColor);
        expect(passwordInputBorderColor).toBe('rgb(220, 53, 69)');
      });
    }
  });

  test.describe('Field: Re-enter password', () => {
    // Re-enter password
    const reEnterPasswordTests = [
      { password: 'Password123', reEnterPassword: '', error: 'Re-enter password required' },
      { password: 'Password123', reEnterPassword: 'password', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Password', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Password1234', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'PASSWORD123', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Pass123', error: 'Password do not match' },
      { password: 'Password123', reEnterPassword: 'Pass!@#', error: 'Password do not match' }
    ];

    for (const { password, reEnterPassword, error } of reEnterPasswordTests) {
      test(`Negative scenario: Re-enter password "${reEnterPassword}"`, async ({ page }) => {
        const randomName = 'John';
        const randomLastName = 'Smith';
        const randomEmail = generateRandomEmail('aqa');

        await page.fill('input[name="name"].ng-untouched.ng-pristine.ng-invalid', randomName);
        await page.fill('input[name="lastName"].form-control', randomLastName);
        await page.fill('input[name="email"]', randomEmail);
        await page.fill('input[name="password"]', password);
        await page.fill('input[name="repeatPassword"][type="password"].form-control', reEnterPassword);

        const registerButton = await page.locator('button.btn.btn-primary[disabled]');
        const registerButtonDisabled = await registerButton.isVisible();
        expect(registerButtonDisabled).toBe(true);

        await page.click('button.btn.btn-primary:has-text("Register")');

        await expect(page.locator(`text=${error}`)).toBeVisible();

        const errorText = await page.locator(`text=${error}`);
        const errorTextColor = await errorText.evaluate((element) => window.getComputedStyle(element).color);
        expect(errorTextColor).toBe('rgb(220, 53, 69)');

        const reEnterPasswordInput = await page.locator('input[name="repeatPassword"]');
        const reEnterPasswordInputBorderColor = await reEnterPasswordInput.evaluate((element) => window.getComputedStyle(element).borderColor);
        expect(reEnterPasswordInputBorderColor).toBe('rgb(220, 53, 69)');
      });
    }
  });
});

