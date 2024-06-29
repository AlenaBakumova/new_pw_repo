class RegistrationPage {
    constructor(page) {
      this.page = page;
      this.nameInput = page.locator('input[name="name"]');
      this.lastNameInput = page.locator('input[name="lastName"]');
      this.emailInput = page.locator('input[name="email"]');
      this.passwordInput = page.locator('input[name="password"]');
      this.repeatPasswordInput = page.locator('input[name="repeatPassword"]');
      this.registerButton = page.locator('button.btn.btn-primary:has-text("Register")');
    }
  
    async goto() {
      await this.page.goto('/');
      await this.page.click('button.hero-descriptor_btn.btn.btn-primary:has-text("Sign up")');
    }
  
    async fillRegistrationForm(name, lastName, email, password, repeatPassword) {
      await this.nameInput.fill(name);
      await this.lastNameInput.fill(lastName);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.repeatPasswordInput.fill(repeatPassword);
    }
  
    async submitForm() {
      await this.registerButton.click();
    }
  
    async getErrorText(error) {
      return this.page.locator(`text=${error}`).isVisible();
    }
  
    async isRegisterButtonDisabled() {
      const registerButton = await this.page.locator('button.btn.btn-primary[disabled]');
      return registerButton.isVisible();
    }
  
    async getInputBorderColor(inputLocator) {
      return inputLocator.evaluate((element) => window.getComputedStyle(element).borderColor);
    }
  
    async getErrorTextColor(error) {
      const errorText = await this.page.locator(`text=${error}`);
      return errorText.evaluate((element) => window.getComputedStyle(element).color);
    }
  }
  
  module.exports = { RegistrationPage };
  