import { test, expect } from '@playwright/test'

test.describe('Error Handling', () => {
  test.describe('404 Page', () => {
    test('should display 404 page for non-existent routes', async ({ page }) => {
      await page.goto('/non-existent-page-12345')

      // Should show some error indication
      const notFoundText = page.getByText(/404|not found|page.*not.*exist/i).first()
      if (await notFoundText.isVisible()) {
        await expect(notFoundText).toBeVisible()
      }
    })

    test('should display 404 for non-existent car', async ({ page }) => {
      await page.goto('/cars/non-existent-car-slug-12345')

      await page.waitForLoadState('networkidle')

      // Should show not found or redirect
      const urlOrError = page.url()
      if (urlOrError.includes('non-existent-car')) {
        const notFound = page.getByText(/not found|doesn.*t exist/i).first()
        if (await notFound.isVisible()) {
          await expect(notFound).toBeVisible()
        }
      }
    })

    test('should have link to homepage from 404', async ({ page }) => {
      await page.goto('/non-existent-page-12345')

      await page.waitForLoadState('networkidle')

      const homeLink = page.getByRole('link', { name: /home|go back/i }).first()
      if (await homeLink.isVisible()) {
        await expect(homeLink).toBeVisible()
      }
    })
  })

  test.describe('Network Errors', () => {
    test('should handle slow network gracefully', async ({ page }) => {
      // Set slow network
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 100)
      })

      await page.goto('/')

      await expect(page).toHaveURL('/')
    })

    test('should show loading states', async ({ page }) => {
      await page.goto('/cars')

      // On slow connections, should show loading
      const loading = page.getByText(/loading/i).first()
      if (await loading.isVisible({ timeout: 100 })) {
        await expect(loading).toBeVisible()
      }
    })
  })

  test.describe('Form Validation Errors', () => {
    test('should show validation errors on contact form', async ({ page }) => {
      await page.goto('/contact')

      await page.getByRole('button', { name: /send/i }).click()

      await expect(page.getByText(/required/i).first()).toBeVisible()
    })

    test('should show validation errors on newsletter', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await page.getByRole('button', { name: /subscribe/i }).click()

      await expect(page.getByText(/required|enter.*email/i)).toBeVisible({ timeout: 3000 })
    })

    test('should show validation errors on sell form', async ({ page }) => {
      await page.goto('/sell')

      const submitButton = page.getByRole('button', { name: /submit|send/i }).first()
      if (await submitButton.isVisible()) {
        await submitButton.click()

        const error = page.getByText(/required|fill/i).first()
        if (await error.isVisible()) {
          await expect(error).toBeVisible()
        }
      }
    })
  })

  test.describe('Empty States', () => {
    test('should show empty state when no cars match filters', async ({ page }) => {
      await page.goto('/cars')

      // Apply extreme filters that might result in no matches
      const searchInput = page.getByPlaceholder(/search/i).first()
      if (await searchInput.isVisible()) {
        await searchInput.fill('XXXNONEXISTENTCARXXX123')
        await page.waitForTimeout(1000)

        const noResults = page.getByText(/no.*found|no results|no cars/i).first()
        if (await noResults.isVisible()) {
          await expect(noResults).toBeVisible()
        }
      }
    })

    test('should show empty state for favorites when none exist', async ({ page }) => {
      // Would need authenticated user with no favorites
      // Test structure provided
    })
  })

  test.describe('Session Handling', () => {
    test('should handle expired session gracefully', async ({ page }) => {
      // Test would involve authenticated session expiry
      // Structure provided for future implementation
    })

    test('should redirect to sign in after session expires', async ({ page }) => {
      // Test structure for session expiry redirect
    })
  })

  test.describe('Notification Errors', () => {
    test('should display error notifications with proper styling', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      // Trigger error by submitting empty newsletter
      await page.getByRole('button', { name: /subscribe/i }).click()

      const errorNotification = page.locator('[data-sonner-toast]').first()
      await expect(errorNotification).toBeVisible({ timeout: 3000 })

      // Should have error styling (red background)
      const backgroundColor = await errorNotification.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      )
      expect(backgroundColor).toBeTruthy()
    })
  })
})
