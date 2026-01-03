import { test, expect } from '@playwright/test'

test.describe('Typography Consistency', () => {
  test.describe('Mobile Typography (375px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
    })

    test('homepage should have mobile-appropriate font sizes', async ({ page }) => {
      await page.goto('/')

      // H1 - Main heading
      const h1 = page.locator('h1').first()
      const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(h1Size).toBeGreaterThanOrEqual(24)
      expect(h1Size).toBeLessThanOrEqual(36)

      // Body text
      const p = page.locator('p').first()
      const pSize = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(pSize).toBeGreaterThanOrEqual(14)
      expect(pSize).toBeLessThanOrEqual(16)
    })

    test('browse page should have mobile-appropriate font sizes', async ({ page }) => {
      await page.goto('/cars')

      const h1 = page.locator('h1').first()
      if (await h1.isVisible()) {
        const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
        expect(h1Size).toBeGreaterThanOrEqual(24)
        expect(h1Size).toBeLessThanOrEqual(36)
      }
    })

    test('contact page should have mobile-appropriate font sizes', async ({ page }) => {
      await page.goto('/contact')

      const h1 = page.locator('h1').first()
      const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(h1Size).toBeGreaterThanOrEqual(24)
      expect(h1Size).toBeLessThanOrEqual(36)

      const p = page.locator('p').first()
      const pSize = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(pSize).toBeGreaterThanOrEqual(14)
      expect(pSize).toBeLessThanOrEqual(16)
    })

    test('about page should have mobile-appropriate font sizes', async ({ page }) => {
      await page.goto('/about')

      const h1 = page.locator('h1').first()
      if (await h1.isVisible()) {
        const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
        expect(h1Size).toBeGreaterThanOrEqual(24)
        expect(h1Size).toBeLessThanOrEqual(36)
      }
    })

    test('FAQs page should have mobile-appropriate font sizes', async ({ page }) => {
      await page.goto('/faqs')

      const h1 = page.locator('h1').first()
      const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(h1Size).toBeGreaterThanOrEqual(24)
      expect(h1Size).toBeLessThanOrEqual(36)
    })
  })

  test.describe('Tablet Typography (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
    })

    test('homepage should have tablet-appropriate font sizes', async ({ page }) => {
      await page.goto('/')

      // H1 should be larger on tablet
      const h1 = page.locator('h1').first()
      const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(h1Size).toBeGreaterThanOrEqual(36)
      expect(h1Size).toBeLessThanOrEqual(52)

      // Body text should be 16px
      const p = page.locator('p').first()
      const pSize = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(pSize).toBe(16)
    })

    test('all pages should have 16px body text on tablet', async ({ page }) => {
      const pages = ['/', '/cars', '/contact', '/about', '/faqs']

      for (const pagePath of pages) {
        await page.goto(pagePath)

        const p = page.locator('p').first()
        if (await p.isVisible()) {
          const pSize = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          expect(pSize).toBe(16)
        }
      }
    })
  })

  test.describe('Desktop Typography (1920px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
    })

    test('homepage should have desktop-appropriate font sizes', async ({ page }) => {
      await page.goto('/')

      // H1 should be largest on desktop
      const h1 = page.locator('h1').first()
      const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(h1Size).toBeGreaterThanOrEqual(40)
      expect(h1Size).toBeLessThanOrEqual(60)

      // Body text should be 16px
      const p = page.locator('p').first()
      const pSize = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
      expect(pSize).toBe(16)
    })

    test('should maintain proper heading hierarchy', async ({ page }) => {
      await page.goto('/')

      const h1 = page.locator('h1').first()
      const h2 = page.locator('h2').first()
      const h3 = page.locator('h3').first()

      const h1Size = await h1.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))

      if (await h2.isVisible()) {
        const h2Size = await h2.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
        expect(h1Size).toBeGreaterThan(h2Size)

        if (await h3.isVisible()) {
          const h3Size = await h3.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          expect(h2Size).toBeGreaterThan(h3Size)
        }
      }
    })
  })

  test.describe('Font Size Consistency', () => {
    test('should have consistent body text across all pages - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const pages = ['/', '/cars', '/contact', '/about', '/faqs', '/how-it-works']
      const sizes: number[] = []

      for (const pagePath of pages) {
        await page.goto(pagePath)

        const p = page.locator('p').first()
        if (await p.isVisible()) {
          const size = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          sizes.push(size)
        }
      }

      // All sizes should be the same (14px on mobile)
      const firstSize = sizes[0]
      sizes.forEach(size => {
        expect(size).toBe(firstSize)
      })
    })

    test('should have consistent body text across all pages - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })

      const pages = ['/', '/cars', '/contact', '/about', '/faqs', '/how-it-works']
      const sizes: number[] = []

      for (const pagePath of pages) {
        await page.goto(pagePath)

        const p = page.locator('p').first()
        if (await p.isVisible()) {
          const size = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          sizes.push(size)
        }
      }

      // All sizes should be 16px on desktop
      sizes.forEach(size => {
        expect(size).toBe(16)
      })
    })
  })

  test.describe('Readability Standards', () => {
    test('should meet minimum font size for accessibility - mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      // Check all paragraphs
      const paragraphs = page.locator('p')
      const count = await paragraphs.count()

      for (let i = 0; i < Math.min(count, 10); i++) {
        const p = paragraphs.nth(i)
        if (await p.isVisible()) {
          const size = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          // Minimum 14px for mobile
          expect(size).toBeGreaterThanOrEqual(14)
        }
      }
    })

    test('should meet minimum font size for accessibility - desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.goto('/')

      // Check all paragraphs
      const paragraphs = page.locator('p')
      const count = await paragraphs.count()

      for (let i = 0; i < Math.min(count, 10); i++) {
        const p = paragraphs.nth(i)
        if (await p.isVisible()) {
          const size = await p.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          // 16px for desktop
          expect(size).toBeGreaterThanOrEqual(16)
        }
      }
    })

    test('should have good line height for readability', async ({ page }) => {
      await page.goto('/')

      const p = page.locator('p').first()
      const lineHeight = await p.evaluate(el => {
        const lh = window.getComputedStyle(el).lineHeight
        const fs = parseFloat(window.getComputedStyle(el).fontSize)
        return parseFloat(lh) / fs
      })

      // Line height should be at least 1.4 for readability
      expect(lineHeight).toBeGreaterThanOrEqual(1.4)
    })
  })

  test.describe('Button and Link Text Sizes', () => {
    test('buttons should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const button = page.getByRole('link', { name: /browse cars/i }).first()
      const fontSize = await button.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))

      // Button text should be at least 14px on mobile
      expect(fontSize).toBeGreaterThanOrEqual(14)
    })

    test('navigation links should have readable text', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const navLinks = page.locator('nav a')
      if (await navLinks.count() > 0) {
        const firstLink = navLinks.first()
        if (await firstLink.isVisible()) {
          const fontSize = await firstLink.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          expect(fontSize).toBeGreaterThanOrEqual(14)
        }
      }
    })
  })

  test.describe('Card Text Sizes', () => {
    test('car cards should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/cars')

      await page.waitForSelector('a[href^="/cars/"]')

      const cardText = page.locator('a[href^="/cars/"] p, a[href^="/cars/"] span').first()
      if (await cardText.isVisible()) {
        const fontSize = await cardText.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
        expect(fontSize).toBeGreaterThanOrEqual(14)
      }
    })
  })

  test.describe('Form Input Text Sizes', () => {
    test('form inputs should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/contact')

      const input = page.getByLabel(/email/i)
      const fontSize = await input.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))

      // Input text should be at least 16px on mobile to prevent zoom
      expect(fontSize).toBeGreaterThanOrEqual(16)
    })

    test('form inputs should be 16px to prevent iOS zoom', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/contact')

      const inputs = page.locator('input[type="text"], input[type="email"], textarea')
      const count = await inputs.count()

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i)
        if (await input.isVisible()) {
          const fontSize = await input.evaluate(el => parseInt(window.getComputedStyle(el).fontSize))
          // Must be at least 16px to prevent iOS auto-zoom on focus
          expect(fontSize).toBeGreaterThanOrEqual(16)
        }
      }
    })
  })
})
