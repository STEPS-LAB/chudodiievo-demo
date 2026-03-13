import { test, expect } from '@playwright/test';

test.describe('Rooms Page', () => {
  test('should load rooms page', async ({ page }) => {
    await page.goto('/ua/rooms');
    await expect(page.locator('h1')).toContainText('Номери');
  });

  test('should display room cards', async ({ page }) => {
    await page.goto('/ua/rooms');
    await expect(page.locator('[class*="luxury-card"]')).toHaveCount({ min: 3 });
  });

  test('should navigate to room detail page', async ({ page }) => {
    await page.goto('/ua/rooms');
    await page.click('text=Озерний Будинок');
    await expect(page).toHaveURL(/\/ua\/rooms\/lake-house/);
  });
});

test.describe('Room Detail Page', () => {
  test('should display room information', async ({ page }) => {
    await page.goto('/ua/rooms/lake-house');
    await expect(page.locator('h1')).toContainText('Озерний Будинок');
  });

  test('should display amenities section', async ({ page }) => {
    await page.goto('/ua/rooms/lake-house');
    await expect(page.locator('text=Зручності')).toBeVisible();
  });
});
