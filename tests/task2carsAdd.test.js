const { test, expect, Playwright } = require('@playwright/test');

test.describe('API Tests for Car Creation', () => {
  let apiRequest;
  let loggedInCookie;

  test.beforeAll(async () => {
    const browser = await Playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto(process.env.BASE_URL_UI);
    await page.fill('input[name="email"]', process.env.USERNAME);
    await page.fill('input[name="password"]', process.env.PASSWORD);
    await page.click('button[type="submit"]');
    
    const cookies = await context.cookies();
    loggedInCookie = cookies.find(cookie => cookie.name === 'your_login_cookie_name');

 
    await browser.close();

    // Инициализируем APIRequestContext
    apiRequest = new Playwright.APIRequest({
      baseURL: process.env.BASE_URL_API,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${loggedInCookie.name}=${loggedInCookie.value}`, 
      },
      httpCredentials: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });
  });

  test('Позитивный сценарий: Создание автомобиля и проверка отображения пробега', async ({ page }) => {
    const response = await apiRequest.post('/cars', {
      data: {
        carBrandId: 2,
        carModelId: 8,
        mileage: 6,
      },
    });
    expect(response.ok()).toBe(201); 

  
    await page.goto('https://qauto2.forstudy.space/panel/garage');
    const mileageText = await page.locator('#editing-view-port').innerText();
    expect(mileageText).toContain('6');
  });

  test('Негативный сценарий: Создание автомобиля с некорректным пробегом mileage: -6', async ({ page }) => {
    const response = await apiRequest.post('/cars', {
      data: {
        carBrandId: 2,
        carModelId: 8,
        mileage: -6,
      },
    });
    expect(response.status()).toBe(405); 

    
    await page.goto('https://qauto2.forstudy.space/panel/garage');
    const mileageTextAfterError = await page.locator('#editing-view-port').innerText();
    expect(mileageTextAfterError).not.toContain('-6');
  });

  test('Негативный сценарий: Создание автомобиля без данных в теле запроса', async ({ page }) => {
    const response = await apiRequest.post('/cars', {});

    expect(response.status()).toBe(405); 

    
    await page.goto('https://qauto2.forstudy.space/panel/garage');
    const mileageElements = await page.locator('.mileage').elements();
    expect(mileageElements.length).toBe(1);
  });
});
