// userGaragePage.fixture.js
const { fixtures } = require('@playwright/test');
const fs = require('fs').promises;

// Путь к файлу с состоянием хранилища
const storageStatePath = 'storageState.json';

// Фикстура для страницы гаража пользователя
fixtures.defineFixture('userGaragePage', async ({}, runTest) => {
  // Загружаем состояние хранилища
  const storageState = JSON.parse(await fs.readFile(storageStatePath, 'utf-8'));

  // Запускаем тест с загруженным состоянием
  await runTest(storageState);
});
