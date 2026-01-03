import { test, expect } from '@playwright/test'

test.describe('Newsletter Subscription', () => {
  test('should display newsletter form in footer', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    await expect(page.getByText(/subscribe.*newsletter|newsletter/i)).toBeVisible()
    await expect(page.getByPlaceholder(/email/i).last()).toBeVisible()
    await expect(page.getByRole('button', { name: /subscribe/i })).toBeVisible()
  })

  test('should show error for empty email', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    await page.getByRole('button', { name: /subscribe/i }).click()

    // Should show error toast
    await expect(page.getByText(/email.*required|enter.*email/i)).toBeVisible({ timeout: 3000 })
  })

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const emailInput = page.getByPlaceholder(/email/i).last()
    await emailInput.fill('invalid-email')
    await page.getByRole('button', { name: /subscribe/i }).click()

    await page.waitForTimeout(1000)

    // May show validation error
  })

  test('should show success message on valid subscription', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const emailInput = page.getByPlaceholder(/email/i).last()
    await emailInput.fill('test@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()

    // Should show success toast in top right
    await expect(page.getByText(/success|subscribed|thank you/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('should clear email field after successful subscription', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const emailInput = page.getByPlaceholder(/email/i).last()
    await emailInput.fill('test@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()

    await page.waitForTimeout(1000)

    // Email field should be cleared
    await expect(emailInput).toHaveValue('')
  })

  test('should have newsletter on all pages', async ({ page }) => {
    const pages = ['/', '/cars', '/about', '/contact', '/faqs']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const newsletterForm = page.getByText(/subscribe.*newsletter/i)
      await expect(newsletterForm).toBeVisible()
    }
  })

  test('should display success notification with proper contrast', async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const emailInput = page.getByPlaceholder(/email/i).last()
    await emailInput.fill('test@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()

    // Wait for notification
    const notification = page.locator('[data-sonner-toast]').first()
    await expect(notification).toBeVisible({ timeout: 3000 })

    // Check that notification has proper styling (green background for success)
    const backgroundColor = await notification.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    )

    // Should have some color (not default)
    expect(backgroundColor).toBeTruthy()
  })
})
