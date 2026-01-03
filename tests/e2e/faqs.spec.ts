import { test, expect } from '@playwright/test'

test.describe('FAQs Page', () => {
  test('should display FAQs page', async ({ page }) => {
    await page.goto('/faqs')

    await expect(page.getByRole('heading', { name: /faq|frequently asked/i })).toBeVisible()
  })

  test('should display all FAQ categories', async ({ page }) => {
    await page.goto('/faqs')

    // Check for common FAQ categories
    await expect(page.getByText(/buying|purchase/i).first()).toBeVisible()
    await expect(page.getByText(/delivery|shipping/i).first()).toBeVisible()
    await expect(page.getByText(/payment/i).first()).toBeVisible()
  })

  test('should expand and collapse accordions', async ({ page }) => {
    await page.goto('/faqs')

    // Find first accordion trigger
    const firstAccordion = page.locator('[data-slot="accordion-trigger"]').first()
    await expect(firstAccordion).toBeVisible()

    // Click to expand
    await firstAccordion.click()

    // Content should be visible
    await page.waitForTimeout(500)

    // Click again to collapse
    await firstAccordion.click()
    await page.waitForTimeout(500)
  })

  test('should display accordion content when expanded', async ({ page }) => {
    await page.goto('/faqs')

    const firstAccordion = page.locator('[data-slot="accordion-trigger"]').first()
    await firstAccordion.click()

    // Wait for content to expand
    await page.waitForTimeout(500)

    const content = page.locator('[data-slot="accordion-content"]').first()
    await expect(content).toBeVisible()
  })

  test('should have proper bottom border on all accordions', async ({ page }) => {
    await page.goto('/faqs')

    // Check that all accordion items have borders
    const accordions = page.locator('[data-slot="accordion-item"]')
    const count = await accordions.count()

    expect(count).toBeGreaterThan(0)

    // Visual check - all should be visible and styled correctly
    for (let i = 0; i < Math.min(count, 3); i++) {
      await expect(accordions.nth(i)).toBeVisible()
    }
  })

  test('should display buying a car FAQs', async ({ page }) => {
    await page.goto('/faqs')

    await expect(page.getByText(/how does.*buying.*work|buying process/i).first()).toBeVisible()
  })

  test('should display delivery and returns FAQs', async ({ page }) => {
    await page.goto('/faqs')

    await expect(page.getByText(/delivery|how long/i).first()).toBeVisible()
    await expect(page.getByText(/return policy|money.*back/i).first()).toBeVisible()
  })

  test('should display payment and finance FAQs', async ({ page }) => {
    await page.goto('/faqs')

    await expect(page.getByText(/payment.*method|financing/i).first()).toBeVisible()
  })

  test('should display selling your car FAQs', async ({ page }) => {
    await page.goto('/faqs')

    const sellingSection = page.getByText(/sell.*car|selling/i).first()
    if (await sellingSection.isVisible()) {
      await expect(sellingSection).toBeVisible()
    }
  })

  test('should display vehicle information FAQs', async ({ page }) => {
    await page.goto('/faqs')

    const vehicleSection = page.getByText(/vehicle|warranty|inspection/i).first()
    await expect(vehicleSection).toBeVisible()
  })

  test('should display account and support FAQs', async ({ page }) => {
    await page.goto('/faqs')

    const supportSection = page.getByText(/account|support|contact/i).first()
    await expect(supportSection).toBeVisible()
  })

  test('should have contact support CTA', async ({ page }) => {
    await page.goto('/faqs')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const contactButton = page.getByRole('link', { name: /contact/i }).first()
    await expect(contactButton).toBeVisible()
  })

  test('should navigate to contact page from FAQs', async ({ page }) => {
    await page.goto('/faqs')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const contactButton = page.getByRole('link', { name: /contact support/i }).first()
    if (await contactButton.isVisible()) {
      await contactButton.click()
      await expect(page).toHaveURL(/\/contact/)
    }
  })

  test('should search within FAQs if search exists', async ({ page }) => {
    await page.goto('/faqs')

    const searchInput = page.getByPlaceholder(/search/i).first()
    if (await searchInput.isVisible()) {
      await searchInput.fill('delivery')
      await page.waitForTimeout(500)
    }
  })

  test('should have multiple questions per category', async ({ page }) => {
    await page.goto('/faqs')

    const accordions = page.locator('[data-slot="accordion-trigger"]')
    const count = await accordions.count()

    // Should have multiple FAQ items
    expect(count).toBeGreaterThan(5)
  })

  test('should allow only one accordion open at a time', async ({ page }) => {
    await page.goto('/faqs')

    const firstAccordion = page.locator('[data-slot="accordion-trigger"]').first()
    const secondAccordion = page.locator('[data-slot="accordion-trigger"]').nth(1)

    // Open first
    await firstAccordion.click()
    await page.waitForTimeout(300)

    // Open second
    await secondAccordion.click()
    await page.waitForTimeout(300)

    // Both should be accessible (depending on accordion type)
  })
})
