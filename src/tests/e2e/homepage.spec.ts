import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/ua');
    await expect(page).toHaveTitle(/Чудодієво/);
  });

  test('should display the hero section', async ({ page }) => {
    await page.goto('/ua');
    await expect(page.locator('h1')).toContainText('Чудодієво');
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/ua');
    
    // Click on Rooms navigation
    await page.click('text=Номери');
    await expect(page).toHaveURL(/\/ua\/rooms/);
  });

  test('should display booking form', async ({ page }) => {
    await page.goto('/ua');
    await expect(page.locator('text=Знайдіть свій ідеальний відпочинок')).toBeVisible();
  });
});
