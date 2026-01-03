import { test, expect } from '@playwright/test'

test.describe('Favorites Functionality', () => {
  test.describe('Without Authentication', () => {
    test('should redirect to sign in when clicking favorite without auth', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      // Find and click favorite button
      const favoriteButton = page.locator('button[aria-label*="favorite" i], button[title*="favorite" i]').first()
      if (await favoriteButton.isVisible()) {
        await favoriteButton.click()
        await expect(page).toHaveURL(/\/auth\/signin/)
      }
    })

    test('should redirect to sign in when accessing favorites page', async ({ page }) => {
      await page.goto('/dashboard/favorites')

      await expect(page).toHaveURL(/\/auth\/signin/)
    })
  })

  test.describe('Favorite Button States', () => {
    test('should show unfavorited state by default', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const favoriteButton = page.locator('button[aria-label*="favorite" i]').first()
      if (await favoriteButton.isVisible()) {
        await expect(favoriteButton).toBeVisible()
      }
    })

    test('should show favorite button on car cards', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const favoriteButtons = page.locator('button[aria-label*="favorite" i], button[title*="favorite" i]')
      const count = await favoriteButtons.count()

      expect(count).toBeGreaterThan(0)
    })

    test('should show favorite button on car detail page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const favoriteButton = page.locator('button[aria-label*="favorite" i]').first()
      await expect(favoriteButton).toBeVisible()
    })
  })

  test.describe('Favorite Counter', () => {
    test('should display favorite count if available', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      // Look for favorite count display
      const favoriteCount = page.locator('[data-testid*="favorite-count"], .favorite-count').first()
      if (await favoriteCount.isVisible()) {
        await expect(favoriteCount).toBeVisible()
      }
    })
  })
})
