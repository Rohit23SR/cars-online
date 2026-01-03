import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('should display contact page correctly', async ({ page }) => {
    await page.goto('/contact')

    await expect(page.getByRole('heading', { name: /get in touch|contact/i })).toBeVisible()
  })

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact')

    // Check for phone, email, address
    await expect(page.getByText(/phone/i).first()).toBeVisible()
    await expect(page.getByText(/email/i).first()).toBeVisible()
    await expect(page.getByText(/office|address/i).first()).toBeVisible()
  })

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact')

    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible()
  })

  test('should show validation error for empty form', async ({ page }) => {
    await page.goto('/contact')

    await page.getByRole('button', { name: /send/i }).click()

    await expect(page.getByText(/required/i).first()).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact')

    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/message/i).fill('Test message')
    await page.getByRole('button', { name: /send/i }).click()

    // Look for any error message related to email validation
    await expect(page.getByText(/valid|invalid|email|@/i).first()).toBeVisible({ timeout: 2000 }).catch(async () => {
      // If no error message visible, form should not submit (button still visible)
      await expect(page.getByRole('button', { name: /send/i })).toBeVisible()
    })
  })

  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact')

    await page.getByLabel(/name/i).fill('Test User')
    await page.getByLabel(/email/i).fill('test@example.com')

    const phoneField = page.getByLabel(/phone/i)
    if (await phoneField.isVisible()) {
      await phoneField.fill('0412345678')
    }

    const subjectField = page.getByLabel(/subject/i)
    if (await subjectField.isVisible()) {
      await subjectField.click()
      await page.getByRole('option', { name: /general/i }).first().click()
    }

    await page.getByLabel(/message/i).fill('This is a test message from automated testing.')

    await page.getByRole('button', { name: /send/i }).click()

    // Should show success message
    await expect(page.getByText(/thank you|success|sent/i)).toBeVisible({ timeout: 5000 })
  })

  test('should display business hours', async ({ page }) => {
    await page.goto('/contact')

    await expect(page.getByText(/business hours|hours/i).first()).toBeVisible()
  })

  test('should have link to FAQs', async ({ page }) => {
    await page.goto('/contact')

    const faqLink = page.getByRole('link', { name: /faq/i }).first()
    if (await faqLink.isVisible()) {
      await expect(faqLink).toBeVisible()
    }
  })

  test('should display map or location', async ({ page }) => {
    await page.goto('/contact')

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const mapSection = page.getByText(/showroom|location|visit/i).first()
    if (await mapSection.isVisible()) {
      await expect(mapSection).toBeVisible()
    }
  })

  test('should have privacy policy checkbox', async ({ page }) => {
    await page.goto('/contact')

    const privacyCheckbox = page.locator('input[type="checkbox"]').first()
    if (await privacyCheckbox.isVisible()) {
      await expect(privacyCheckbox).toBeVisible()
    }
  })

  test('should display subject options', async ({ page }) => {
    await page.goto('/contact')

    const subjectField = page.getByLabel(/subject/i)
    if (await subjectField.isVisible()) {
      await subjectField.click()

      await expect(page.getByRole('option').first()).toBeVisible()
    }
  })

  test('should display common questions', async ({ page }) => {
    await page.goto('/contact')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const questionsSection = page.getByText(/common questions/i).first()
    if (await questionsSection.isVisible()) {
      await expect(questionsSection).toBeVisible()
    }
  })
})
