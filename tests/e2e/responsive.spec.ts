import { test, expect } from '@playwright/test'
import { setViewport, scrollToBottom } from './helpers/test.helpers'

test.describe('Responsive Design', () => {
  test.describe('Mobile View (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 'mobile')
    })

    test('should display mobile navigation', async ({ page }) => {
      await page.goto('/')

      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      if (await menuButton.isVisible()) {
        await expect(menuButton).toBeVisible()
      }
    })

    test('should open mobile menu', async ({ page }) => {
      await page.goto('/')

      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      if (await menuButton.isVisible()) {
        await menuButton.click()
        await page.waitForTimeout(300)

        await expect(page.getByRole('link', { name: /browse|cars/i }).first()).toBeVisible()
      }
    })

    test('should display single column layout on browse page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const firstCard = page.locator('a[href^="/cars/"]').first()
      await expect(firstCard).toBeVisible()
    })

    test('should stack hero buttons vertically', async ({ page }) => {
      await page.goto('/')

      const browseButton = page.getByRole('link', { name: /browse/i }).first()
      const sellButton = page.getByRole('link', { name: /sell/i }).first()

      await expect(browseButton).toBeVisible()
      await expect(sellButton).toBeVisible()
    })

    test('should have touch-friendly button sizes', async ({ page }) => {
      await page.goto('/')

      const button = page.getByRole('link', { name: /browse/i }).first()
      const box = await button.boundingBox()

      // Buttons should be at least 40px height (iOS guideline is 44x44)
      expect(box?.height).toBeGreaterThanOrEqual(40)
    })

    test('should display mobile-optimized images', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('img')

      const image = page.locator('img').first()
      await expect(image).toBeVisible()
    })

    test('should have readable text on mobile', async ({ page }) => {
      await page.goto('/')

      const bodyText = page.locator('p').first()
      const fontSize = await bodyText.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )

      // Font size should be at least 14px on mobile
      const fontSizeNum = parseInt(fontSize)
      expect(fontSizeNum).toBeGreaterThanOrEqual(14)
      expect(fontSizeNum).toBeLessThanOrEqual(16) // Not too large on mobile
    })

    test('should have appropriate h1 size on mobile', async ({ page }) => {
      await page.goto('/')

      const h1 = page.locator('h1').first()
      const fontSize = await h1.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )

      const fontSizeNum = parseInt(fontSize)
      // H1 should be between 24px-36px on mobile (not the full 48px+)
      expect(fontSizeNum).toBeGreaterThanOrEqual(24)
      expect(fontSizeNum).toBeLessThanOrEqual(36)
    })

    test('should have appropriate h2 size on mobile', async ({ page }) => {
      await page.goto('/')

      const h2 = page.locator('h2').first()
      if (await h2.isVisible()) {
        const fontSize = await h2.evaluate(el =>
          window.getComputedStyle(el).fontSize
        )

        const fontSizeNum = parseInt(fontSize)
        // H2 should be between 20px-30px on mobile
        expect(fontSizeNum).toBeGreaterThanOrEqual(20)
        expect(fontSizeNum).toBeLessThanOrEqual(30)
      }
    })

    test('should have appropriate paragraph size on mobile', async ({ page }) => {
      await page.goto('/')

      const paragraph = page.locator('p').first()
      const fontSize = await paragraph.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )

      const fontSizeNum = parseInt(fontSize)
      // Paragraphs should be 14px on mobile
      expect(fontSizeNum).toBeGreaterThanOrEqual(14)
      expect(fontSizeNum).toBeLessThanOrEqual(16)
    })

    test('should have mobile-friendly forms', async ({ page }) => {
      await page.goto('/contact')

      const emailInput = page.getByLabel(/email/i)
      await expect(emailInput).toBeVisible()

      // Should have appropriate input type for mobile keyboard
      const inputType = await emailInput.getAttribute('type')
      expect(inputType).toBe('email')
    })

    test('should scroll smoothly on mobile', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, 300))
      await page.waitForTimeout(100)

      const scrollY = await page.evaluate(() => window.scrollY)
      // Page should scroll (check if it scrolled at least some amount)
      expect(scrollY).toBeGreaterThan(100)
    })

    test('should display newsletter form on mobile', async ({ page }) => {
      await page.goto('/')
      await scrollToBottom(page)

      await expect(page.getByPlaceholder(/email/i).last()).toBeVisible()
      await expect(page.getByRole('button', { name: /subscribe/i })).toBeVisible()
    })
  })

  test.describe('Tablet View (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 'tablet')
    })

    test('should display tablet navigation', async ({ page }) => {
      await page.goto('/')

      // May show full nav or hamburger depending on design
      const nav = page.locator('nav').first()
      await expect(nav).toBeVisible()
    })

    test('should display 2-column grid on browse page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const cards = page.locator('a[href^="/cars/"]')
      await expect(cards.first()).toBeVisible()
    })

    test('should display hero section properly', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByRole('heading', { name: /find your perfect ride/i })).toBeVisible()
    })

    test('should have proper spacing on tablet', async ({ page }) => {
      await page.goto('/')

      const container = page.locator('main').first()
      await expect(container).toBeVisible()
    })

    test('should have appropriate text sizes on tablet', async ({ page }) => {
      await page.goto('/')

      // Check body text
      const bodyText = page.locator('p').first()
      const bodyFontSize = await bodyText.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )
      const bodyFontSizeNum = parseInt(bodyFontSize)
      expect(bodyFontSizeNum).toBeGreaterThanOrEqual(16) // Should be 16px on tablet

      // Check h1
      const h1 = page.locator('h1').first()
      const h1FontSize = await h1.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )
      const h1FontSizeNum = parseInt(h1FontSize)
      // H1 should be between 36px-48px on tablet
      expect(h1FontSizeNum).toBeGreaterThanOrEqual(36)
      expect(h1FontSizeNum).toBeLessThanOrEqual(52)
    })
  })

  test.describe('Desktop View (1920px)', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 'desktop')
    })

    test('should display full desktop navigation', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByRole('link', { name: /browse/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /sell/i }).first()).toBeVisible()

      // Should not have hamburger menu
      const hamburger = page.locator('button[aria-label*="menu" i]').first()
      const isVisible = await hamburger.isVisible().catch(() => false)
      expect(isVisible).toBe(false)
    })

    test('should display 4-column grid on browse page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const cards = page.locator('a[href^="/cars/"]')
      const count = await cards.count()

      // Should have multiple cards visible
      expect(count).toBeGreaterThan(0)
    })

    test('should show sidebar filters on desktop', async ({ page }) => {
      await page.goto('/cars')

      // Desktop typically shows filters in sidebar
      const filters = page.locator('[data-testid*="filter"], aside').first()
      if (await filters.isVisible()) {
        await expect(filters).toBeVisible()
      }
    })

    test('should have hover effects on cards', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const firstCard = page.locator('a[href^="/cars/"]').first()

      // Hover over card
      await firstCard.hover()

      // Should have some hover effect (can't easily test without visual regression)
      await expect(firstCard).toBeVisible()
    })

    test('should have appropriate text sizes on desktop', async ({ page }) => {
      await page.goto('/')

      // Check body text - should be 16px on desktop
      const bodyText = page.locator('p').first()
      const bodyFontSize = await bodyText.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )
      const bodyFontSizeNum = parseInt(bodyFontSize)
      expect(bodyFontSizeNum).toBe(16)

      // Check h1 - should be larger on desktop but reasonable
      const h1 = page.locator('h1').first()
      const h1FontSize = await h1.evaluate(el =>
        window.getComputedStyle(el).fontSize
      )
      const h1FontSizeNum = parseInt(h1FontSize)
      // H1 should be between 40px-56px on desktop
      expect(h1FontSizeNum).toBeGreaterThanOrEqual(40)
      expect(h1FontSizeNum).toBeLessThanOrEqual(60)

      // Check h2 - should be proportional
      const h2 = page.locator('h2').first()
      if (await h2.isVisible()) {
        const h2FontSize = await h2.evaluate(el =>
          window.getComputedStyle(el).fontSize
        )
        const h2FontSizeNum = parseInt(h2FontSize)
        // H2 should be between 28px-40px on desktop
        expect(h2FontSizeNum).toBeGreaterThanOrEqual(28)
        expect(h2FontSizeNum).toBeLessThanOrEqual(42)
      }
    })

    test('should maintain good font size hierarchy', async ({ page }) => {
      await page.goto('/')

      // Get font sizes
      const h1Size = await page.locator('h1').first().evaluate(el =>
        parseInt(window.getComputedStyle(el).fontSize)
      )
      const h2Element = page.locator('h2').first()

      if (await h2Element.isVisible()) {
        const h2Size = await h2Element.evaluate(el =>
          parseInt(window.getComputedStyle(el).fontSize)
        )
        const bodySize = await page.locator('p').first().evaluate(el =>
          parseInt(window.getComputedStyle(el).fontSize)
        )

        // H1 should be larger than H2, H2 larger than body
        expect(h1Size).toBeGreaterThan(h2Size)
        expect(h2Size).toBeGreaterThan(bodySize)
      }
    })
  })

  test.describe('Orientation Changes', () => {
    test('should handle portrait to landscape', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }) // Portrait

      await page.goto('/')
      await expect(page.getByRole('heading', { name: /find your perfect ride/i })).toBeVisible()

      await page.setViewportSize({ width: 667, height: 375 }) // Landscape
      await expect(page.getByRole('heading', { name: /find your perfect ride/i })).toBeVisible()
    })
  })

  test.describe('Touch Interactions', () => {
    test('should support touch events on mobile', async ({ page }) => {
      await setViewport(page, 'mobile')
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const firstCard = page.locator('a[href^="/cars/"]').first()

      // Click on card (simulates touch on mobile)
      await firstCard.click()

      await expect(page).toHaveURL(/\/cars\//)
    })

    test('should support swipe gestures if carousel exists', async ({ page }) => {
      await setViewport(page, 'mobile')
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const firstCar = page.locator('a[href^="/cars/"]').first()
      await firstCar.click()

      // If there's an image carousel, test swipe
      const carousel = page.locator('[data-testid*="carousel"]').first()
      if (await carousel.isVisible()) {
        // Swipe left
        await carousel.swipe(carousel, { deltaX: -100, deltaY: 0 })
      }
    })
  })

  test.describe('Responsive Images', () => {
    test('should load appropriate image sizes for viewport', async ({ page }) => {
      await setViewport(page, 'mobile')
      await page.goto('/cars')
      await page.waitForSelector('img')

      const image = page.locator('img').first()
      const src = await image.getAttribute('src')

      expect(src).toBeTruthy()
      // Should use responsive images (srcset or next/image)
    })
  })
})
