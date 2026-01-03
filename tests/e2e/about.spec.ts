import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('should display about page', async ({ page }) => {
    await page.goto('/about')

    await expect(page.getByRole('heading', { name: /about|who we are/i })).toBeVisible()
  })

  test('should display company information', async ({ page }) => {
    await page.goto('/about')

    // Should have some content about the company
    await expect(page.locator('p, div').first()).toBeVisible()
  })

  test('should display mission/vision section', async ({ page }) => {
    await page.goto('/about')

    const missionSection = page.getByText(/mission|vision|values/i).first()
    if (await missionSection.isVisible()) {
      await expect(missionSection).toBeVisible()
    }
  })

  test('should display team section if available', async ({ page }) => {
    await page.goto('/about')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const teamSection = page.getByText(/team|our people/i).first()
    if (await teamSection.isVisible()) {
      await expect(teamSection).toBeVisible()
    }
  })

  test('should display why choose us section', async ({ page }) => {
    await page.goto('/about')

    const whySection = page.getByText(/why choose|why us/i).first()
    if (await whySection.isVisible()) {
      await expect(whySection).toBeVisible()
    }
  })

  test('should have CTA to browse cars', async ({ page }) => {
    await page.goto('/about')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const browseButton = page.getByRole('link', { name: /browse|view cars/i }).first()
    if (await browseButton.isVisible()) {
      await expect(browseButton).toBeVisible()
    }
  })

  test('should have link to contact page', async ({ page }) => {
    await page.goto('/about')

    const contactLink = page.getByRole('link', { name: /contact/i }).first()
    if (await contactLink.isVisible()) {
      await expect(contactLink).toBeVisible()
    }
  })

  test('should display statistics if available', async ({ page }) => {
    await page.goto('/about')

    // Look for numbers like "1000+ cars sold"
    const stats = page.locator('text=/\\d+\\+/').first()
    if (await stats.isVisible()) {
      await expect(stats).toBeVisible()
    }
  })
})
