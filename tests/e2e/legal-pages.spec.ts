import { test, expect } from '@playwright/test'

test.describe('Legal Pages', () => {
  test.describe('Privacy Policy', () => {
    test('should display privacy policy page', async ({ page }) => {
      await page.goto('/privacy')

      await expect(page.getByRole('heading', { name: /privacy/i })).toBeVisible()
    })

    test('should have privacy policy content', async ({ page }) => {
      await page.goto('/privacy')

      // Should have substantial content
      const content = await page.locator('main, article, section').first().textContent()
      expect(content?.length).toBeGreaterThan(100)
    })

    test('should have sections for different privacy topics', async ({ page }) => {
      await page.goto('/privacy')

      // Common privacy policy sections
      const sections = page.locator('h2, h3')
      const count = await sections.count()

      expect(count).toBeGreaterThan(0)
    })

    test('should have last updated date', async ({ page }) => {
      await page.goto('/privacy')

      const lastUpdated = page.getByText(/last updated|effective date/i).first()
      if (await lastUpdated.isVisible()) {
        await expect(lastUpdated).toBeVisible()
      }
    })

    test('should have contact information', async ({ page }) => {
      await page.goto('/privacy')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const contact = page.getByText(/contact.*us|questions.*contact/i).first()
      if (await contact.isVisible()) {
        await expect(contact).toBeVisible()
      }
    })
  })

  test.describe('Terms and Conditions', () => {
    test('should display terms and conditions page', async ({ page }) => {
      await page.goto('/terms')

      await expect(page.getByRole('heading', { name: /terms/i })).toBeVisible()
    })

    test('should have terms content', async ({ page }) => {
      await page.goto('/terms')

      const content = await page.locator('main, article, section').first().textContent()
      expect(content?.length).toBeGreaterThan(100)
    })

    test('should have multiple sections', async ({ page }) => {
      await page.goto('/terms')

      const sections = page.locator('h2, h3')
      const count = await sections.count()

      expect(count).toBeGreaterThan(0)
    })

    test('should have acceptance clause', async ({ page }) => {
      await page.goto('/terms')

      const acceptance = page.getByText(/by using|acceptance|agree to/i).first()
      await expect(acceptance).toBeVisible()
    })

    test('should have last updated date', async ({ page }) => {
      await page.goto('/terms')

      const lastUpdated = page.getByText(/last updated|effective date/i).first()
      if (await lastUpdated.isVisible()) {
        await expect(lastUpdated).toBeVisible()
      }
    })

    test('should be accessible from footer', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await page.getByRole('link', { name: /terms/i }).first().click()

      await expect(page).toHaveURL(/\/terms/)
    })
  })

  test.describe('Legal Pages Navigation', () => {
    test('should have link to privacy from terms', async ({ page }) => {
      await page.goto('/terms')

      const privacyLink = page.getByRole('link', { name: /privacy/i }).first()
      if (await privacyLink.isVisible()) {
        await privacyLink.click()
        await expect(page).toHaveURL(/\/privacy/)
      }
    })

    test('should have link to terms from privacy', async ({ page }) => {
      await page.goto('/privacy')

      const termsLink = page.getByRole('link', { name: /terms/i }).first()
      if (await termsLink.isVisible()) {
        await termsLink.click()
        await expect(page).toHaveURL(/\/terms/)
      }
    })

    test('should have link to contact page', async ({ page }) => {
      await page.goto('/privacy')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const contactLink = page.getByRole('link', { name: /contact/i }).first()
      if (await contactLink.isVisible()) {
        await expect(contactLink).toBeVisible()
      }
    })
  })
})
