import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check main heading
    await expect(page.getByRole('heading', { name: /Find Your Perfect Ride/i })).toBeVisible()

    // Check hero CTA buttons
    await expect(page.getByRole('link', { name: /Browse Cars/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Sell Your Car/i }).first()).toBeVisible()
  })

  test('should display benefits section', async ({ page }) => {
    await page.goto('/')

    // Check all three benefits
    await expect(page.getByText(/7-Day Guarantee/i).first()).toBeVisible()
    await expect(page.getByText(/Quality Inspected/i).first()).toBeVisible()
    await expect(page.getByText(/Free Delivery/i).first()).toBeVisible()
  })

  test('should display featured cars section', async ({ page }) => {
    await page.goto('/')

    // Check featured cars heading
    await expect(page.getByRole('heading', { name: /Featured Cars/i })).toBeVisible()

    // Check view all button
    await expect(page.getByRole('link', { name: /View All/i })).toBeVisible()
  })

  test('should navigate to browse cars page', async ({ page }) => {
    await page.goto('/')

    // Click browse cars button
    await page.getByRole('link', { name: /Browse Cars/i }).first().click()

    // Should be on cars page
    await expect(page).toHaveURL('/cars')
    await expect(page.getByRole('heading', { name: /Browse Cars/i })).toBeVisible()
  })

  test('should navigate to sell page', async ({ page }) => {
    await page.goto('/')

    // Click sell your car button
    await page.getByRole('link', { name: /Sell Your Car/i }).first().click()

    // Should be on sell page
    await expect(page).toHaveURL('/sell')
    await expect(page.getByRole('heading', { name: /Sell Your Car in Minutes/i })).toBeVisible()
  })
})
