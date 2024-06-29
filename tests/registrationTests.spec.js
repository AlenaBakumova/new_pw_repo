// tests/registrationTests.js
const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registrationPage');
const { nameTests, lastNameTests, emailTests, passwordTests, reEnterPasswordTests } = require('../test-data/registrationData');

function generateRandomEmail(prefix) {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${prefix}-${randomString}@test.com`;
}

test.describe('User Registration', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('Positive scenario: Successful page load', async ({ page }) => {
    await expect(page).toHaveURL('https://qauto2.forstudy.space/register');
  });

  test.describe('Field: Name', () => {
    for (const { name, error } of nameTests) {
      test(`Negative scenario: Name "${name}"`, async () => {
        const randomEmail = generateRandomEmail('aqa');

        await registrationPage.fillRegistrationForm(name, 'Smith', randomEmail, 'Password123', 'Password123');

        const registerButtonDisabled = await registrationPage.isRegisterButtonDisabled();
        expect(registerButtonDisabled).toBe(true);

        await registrationPage.submitForm();

        const errorVisible = await registrationPage.getErrorText(error);
        expect(errorVisible).toBe(true);
      });
    }
  });

  test.describe('Field: Last Name', () => {
    for (const { lastName, error } of lastNameTests) {
      test(`Negative scenario: Last Name "${lastName}"`, async () => {
        const randomName = 'John';
        const randomEmail = generateRandomEmail('aqa');

        await registrationPage.fillRegistrationForm(randomName, lastName, randomEmail, 'Password123', 'Password123');

        const registerButtonDisabled = await registrationPage.isRegisterButtonDisabled();
        expect(registerButtonDisabled).toBe(true);

        await registrationPage.submitForm();

        const errorVisible = await registrationPage.getErrorText(error);
        expect(errorVisible).toBe(true);

        const errorTextColor = await registrationPage.getErrorTextColor(error);
        expect(errorTextColor).toBe('rgb(220, 53, 69)');

        const lastNameInputBorderColor = await registrationPage.getInputBorderColor(registrationPage.lastNameInput);
        expect(lastNameInputBorderColor).toBe('rgb(220, 53, 69)');
      });
    }
  });

  test.describe('Field: Email', () => {
    for (const { email, error } of emailTests) {
      test(`Negative scenario: Email "${email}"`, async () => {
        const randomName = 'John';
        const randomLastName = 'Smith';

        await registrationPage.fillRegistrationForm(randomName, randomLastName, email, 'Password123', 'Password123');

        const registerButtonDisabled = await registrationPage.isRegisterButtonDisabled();
        expect(registerButtonDisabled).toBe(true);

        await registrationPage.submitForm();

        const errorVisible = await registrationPage.getErrorText(error);
        expect(errorVisible).toBe(true);

        const errorTextColor = await registrationPage.getErrorTextColor(error);
        expect(errorTextColor).toBe('rgb(220, 53, 69)');

        const emailInputBorderColor = await registrationPage.getInputBorderColor(registrationPage.emailInput);
        expect(emailInputBorderColor).toBe('rgb(220, 53, 69)');
      });
    }
  });

  test.describe('Field: Password', () => {
    for (const { password, error } of passwordTests) {
      test(`Negative scenario: Password "${password}"`, async () => {
        const randomName = 'John';
        const randomLastName = 'Smith';
        const randomEmail = generateRandomEmail('aqa');

        await registrationPage.fillRegistrationForm(randomName, randomLastName, randomEmail, password, 'Password123');

        const registerButtonDisabled = await registrationPage.isRegisterButtonDisabled();
        expect(registerButtonDisabled).toBe(true);

        await registrationPage.submitForm();

        const errorVisible = await registrationPage.getErrorText(error);
        expect(errorVisible).toBe(true);
      });
    }
  });

  test.describe('Field: Re-enter password', () => {
    for (const { password, reEnterPassword, error } of reEnterPasswordTests) {
      test(`Negative scenario: Re-enter password "${reEnterPassword}"`, async () => {
        const randomName = 'John';
        const randomLastName = 'Smith';
        const randomEmail = generateRandomEmail('aqa');

        await registrationPage.fillRegistrationForm(randomName, randomLastName, randomEmail, password, reEnterPassword);

        const registerButtonDisabled = await registrationPage.isRegisterButtonDisabled();
        expect(registerButtonDisabled).toBe(true);

        await registrationPage.submitForm();

        const errorVisible = await registrationPage.getErrorText(error);
        expect(errorVisible).toBe(true);
      });
    }
  });
});

