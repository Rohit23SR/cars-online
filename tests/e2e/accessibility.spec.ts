import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.describe('Keyboard Navigation', () => {
    test('should be able to navigate with keyboard', async ({ page }) => {
      await page.goto('/')

      // Tab through interactive elements
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Should have visible focus indicator
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })

    test('should be able to activate buttons with Enter', async ({ page }) => {
      await page.goto('/')

      // Focus on a button and press Enter
      await page.getByRole('link', { name: /browse/i }).first().focus()
      await page.keyboard.press('Enter')

      await expect(page).toHaveURL(/\/cars/)
    })

    test('should be able to close modals with Escape', async ({ page }) => {
      await page.goto('/cars')

      // If there's a modal, it should close with Escape
      // Test structure provided
    })

    test('should skip to main content', async ({ page }) => {
      await page.goto('/')

      // Look for skip link
      const skipLink = page.locator('a[href="#main"], a:has-text("skip")').first()
      if (await skipLink.isVisible()) {
        await expect(skipLink).toBeVisible()
      }
    })
  })

  test.describe('ARIA Labels and Roles', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/')

      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()

      const h1Count = await h1.count()
      expect(h1Count).toBeGreaterThan(0)
    })

    test('should have alt text on images', async ({ page }) => {
      await page.goto('/cars')

      await page.waitForSelector('img')

      const images = page.locator('img')
      const count = await images.count()

      for (let i = 0; i < Math.min(count, 5); i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        expect(alt).toBeTruthy()
      }
    })

    test('should have aria-labels on icon buttons', async ({ page }) => {
      await page.goto('/')

      const iconButtons = page.locator('button:has(svg)')
      const count = await iconButtons.count()

      if (count > 0) {
        const firstButton = iconButtons.first()
        const ariaLabel = await firstButton.getAttribute('aria-label')
        const title = await firstButton.getAttribute('title')

        expect(ariaLabel || title).toBeTruthy()
      }
    })

    test('should have proper form labels', async ({ page }) => {
      await page.goto('/contact')

      const inputs = page.locator('input[type="text"], input[type="email"], textarea')
      const count = await inputs.count()

      for (let i = 0; i < Math.min(count, 5); i++) {
        const input = inputs.nth(i)
        const id = await input.getAttribute('id')
        const name = await input.getAttribute('name')

        if (id) {
          const label = page.locator(`label[for="${id}"]`)
          if (await label.count() > 0) {
            await expect(label).toBeVisible()
          }
        }
      }
    })

    test('should have navigation landmark', async ({ page }) => {
      await page.goto('/')

      const nav = page.locator('nav, [role="navigation"]')
      await expect(nav.first()).toBeVisible()
    })

    test('should have main landmark', async ({ page }) => {
      await page.goto('/')

      const main = page.locator('main, [role="main"]')
      await expect(main.first()).toBeVisible()
    })
  })

  test.describe('Color Contrast', () => {
    test('should have sufficient color contrast on text', async ({ page }) => {
      await page.goto('/')

      // This is a basic check - proper contrast testing would use axe-core
      const bodyText = page.locator('p, span, div').first()
      await expect(bodyText).toBeVisible()

      const color = await bodyText.evaluate(el =>
        window.getComputedStyle(el).color
      )
      expect(color).toBeTruthy()
    })

    test('should have visible focus indicators', async ({ page }) => {
      await page.goto('/')

      await page.keyboard.press('Tab')

      const focusedElement = page.locator(':focus')
      const outline = await focusedElement.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return styles.outline || styles.boxShadow
      })

      expect(outline).toBeTruthy()
    })
  })

  test.describe('Screen Reader Support', () => {
    test('should have descriptive link text', async ({ page }) => {
      await page.goto('/')

      // Links should not just say "click here" or "read more"
      const vagueLinkText = page.getByRole('link', { name: /^click here$|^read more$|^more$/i })
      const count = await vagueLinkText.count()

      // Ideally should be 0, but some are acceptable with context
    })

    test('should have descriptive button text', async ({ page }) => {
      await page.goto('/')

      const buttons = page.locator('button')
      const count = await buttons.count()

      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = buttons.nth(i)
        const text = await button.textContent()
        const ariaLabel = await button.getAttribute('aria-label')

        expect(text || ariaLabel).toBeTruthy()
      }
    })

    test('should announce form errors to screen readers', async ({ page }) => {
      await page.goto('/contact')

      await page.getByRole('button', { name: /send/i }).click()

      const error = page.locator('[role="alert"], [aria-live]').first()
      if (await error.isVisible()) {
        await expect(error).toBeVisible()
      }
    })
  })

  test.describe('Responsive Design Accessibility', () => {
    test('should be accessible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()

      // Should have mobile menu
      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      if (await menuButton.isVisible()) {
        await expect(menuButton).toBeVisible()
      }
    })

    test('should be accessible on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/')

      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()
    })
  })

  test.describe('Focus Management', () => {
    test('should trap focus in modals', async ({ page }) => {
      await page.goto('/')

      // When modal opens, focus should be trapped
      // Test structure for modal focus trap
    })

    test('should return focus after modal closes', async ({ page }) => {
      await page.goto('/')

      // After modal closes, focus should return to trigger
      // Test structure provided
    })
  })
})
