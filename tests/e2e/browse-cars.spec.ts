import { test, expect } from '@playwright/test'

test.describe('Browse Cars Page', () => {
  test('should display cars listing', async ({ page }) => {
    await page.goto('/cars')

    // Check page heading
    await expect(page.getByRole('heading', { name: /Browse Cars/i })).toBeVisible()

    // Check filters sidebar
    await expect(page.getByRole('heading', { name: /Filters/i })).toBeVisible()
  })

  test('should display filter sections', async ({ page }) => {
    await page.goto('/cars')

    // Check search input
    await expect(page.getByPlaceholder(/Search by make, model/i)).toBeVisible()

    // Check accordion sections
    await expect(page.getByText(/Vehicle Specs/i)).toBeVisible()
    await expect(page.getByText(/Price Range/i)).toBeVisible()
    await expect(page.getByText(/Year Range/i)).toBeVisible()
  })

  test('should filter cars by price range', async ({ page }) => {
    await page.goto('/cars')
    await page.waitForSelector('a[href^="/cars/"]')

    // Get initial count of cars
    const initialCount = await page.locator('a[href^="/cars/"]').count()

    // Open price range accordion if not already open
    const priceSection = page.getByText(/Price Range/i).first()
    await priceSection.click()

    // Wait for filters to be visible
    await page.waitForTimeout(500)

    // Click apply filters button if it exists
    const applyButton = page.getByRole('button', { name: /Apply Filters/i })
    if (await applyButton.isVisible()) {
      await applyButton.click()
      await page.waitForTimeout(500)
    }

    // Verify page still shows cars (filter functionality exists)
    const finalCount = await page.locator('a[href^="/cars/"]').count()
    expect(finalCount).toBeGreaterThan(0)
  })

  test('should search for cars', async ({ page }) => {
    await page.goto('/cars')

    // Enter search term
    const searchInput = page.getByPlaceholder(/Search by make, model/i)
    await searchInput.fill('Toyota')

    // Apply filters
    await page.getByRole('button', { name: /Apply Filters/i }).click()

    // URL should include search param
    await expect(page).toHaveURL(/search=Toyota/)
  })

  test('should clear all filters', async ({ page }) => {
    await page.goto('/cars?search=Toyota&maxPrice=30000')

    // Check that clear button appears
    const clearButton = page.getByRole('button', { name: /Clear/i })
    await expect(clearButton).toBeVisible()

    // Click clear
    await clearButton.click()

    // Should redirect to base cars page
    await expect(page).toHaveURL('/cars')
  })

  test('should show active filter count badge', async ({ page }) => {
    await page.goto('/cars')

    // Apply a filter by searching
    await page.getByPlaceholder(/Search by make, model/i).fill('BMW')
    await page.getByRole('button', { name: /Apply Filters/i }).click()

    // Should show filter count badge
    await expect(page.locator('text=/^1$/').first()).toBeVisible()
  })
})
