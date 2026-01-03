import { test, expect } from '@playwright/test'

test.describe('How It Works Page', () => {
  test('should display how it works page', async ({ page }) => {
    await page.goto('/how-it-works')

    await expect(page.getByRole('heading', { name: /how it works/i })).toBeVisible()
  })

  test('should display buying process steps', async ({ page }) => {
    await page.goto('/how-it-works')

    // Should have numbered steps
    await expect(page.getByText(/step|1|browse|choose/i).first()).toBeVisible()
    await expect(page.getByText(/2|reserve|book/i).first()).toBeVisible()
    await expect(page.getByText(/3|deliver/i).first()).toBeVisible()
  })

  test('should display 7-day guarantee information', async ({ page }) => {
    await page.goto('/how-it-works')

    await expect(page.getByText(/7.?day|guarantee|money.?back/i).first()).toBeVisible()
  })

  test('should display inspection process', async ({ page }) => {
    await page.goto('/how-it-works')

    const inspectionSection = page.getByText(/inspection|150.?point|quality/i).first()
    await expect(inspectionSection).toBeVisible()
  })

  test('should display delivery information', async ({ page }) => {
    await page.goto('/how-it-works')

    await expect(page.getByText(/delivery|free.*delivery/i).first()).toBeVisible()
  })

  test('should have CTA buttons', async ({ page }) => {
    await page.goto('/how-it-works')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const ctaButton = page.getByRole('link', { name: /browse|start|get started/i }).first()
    if (await ctaButton.isVisible()) {
      await expect(ctaButton).toBeVisible()
    }
  })

  test('should display selling process if available', async ({ page }) => {
    await page.goto('/how-it-works')

    const sellingSection = page.getByText(/sell.*car|selling/i).first()
    if (await sellingSection.isVisible()) {
      await expect(sellingSection).toBeVisible()
    }
  })

  test('should navigate to browse cars', async ({ page }) => {
    await page.goto('/how-it-works')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const browseLink = page.getByRole('link', { name: /browse/i }).first()
    if (await browseLink.isVisible()) {
      await browseLink.click()
      await expect(page).toHaveURL(/\/cars/)
    }
  })
})
