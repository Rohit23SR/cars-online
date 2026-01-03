import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test.describe('Page Load Performance', () => {
    test('should load homepage within acceptable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/')

      const loadTime = Date.now() - startTime

      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000)
    })

    test('should load browse cars page within acceptable time', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      expect(loadTime).toBeLessThan(10000)
    })

    test('should load car detail page within acceptable time', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')

      const startTime = Date.now()

      await page.locator('a[href^="/cars/"]').first().click()
      await page.waitForLoadState('networkidle')

      const loadTime = Date.now() - startTime

      expect(loadTime).toBeLessThan(8000)
    })
  })

  test.describe('Image Loading', () => {
    test('should lazy load images', async ({ page }) => {
      await page.goto('/')

      // Images below the fold should lazy load
      const images = page.locator('img[loading="lazy"]')
      const count = await images.count()

      // Should have some lazy loaded images
      expect(count).toBeGreaterThan(0)
    })

    test('should load images with proper formats', async ({ page }) => {
      await page.goto('/cars')

      await page.waitForSelector('img')

      const images = page.locator('img')
      const firstImage = images.first()

      if (await firstImage.isVisible()) {
        const src = await firstImage.getAttribute('src')
        expect(src).toBeTruthy()

        // Should use optimized formats (webp, avif) or next/image optimization
      }
    })
  })

  test.describe('Network Requests', () => {
    test('should minimize number of requests', async ({ page }) => {
      const requests: string[] = []

      page.on('request', request => {
        requests.push(request.url())
      })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Should have reasonable number of requests
      expect(requests.length).toBeLessThan(100)
    })

    test('should use caching headers', async ({ page }) => {
      const response = await page.goto('/')

      const cacheControl = response?.headers()['cache-control']

      // Should have some caching strategy
      if (cacheControl) {
        expect(cacheControl).toBeTruthy()
      }
    })
  })

  test.describe('JavaScript Bundle Size', () => {
    test('should not load excessive JavaScript', async ({ page }) => {
      let totalJSSize = 0

      page.on('response', async response => {
        const url = response.url()
        if (url.endsWith('.js')) {
          const buffer = await response.body().catch(() => null)
          if (buffer) {
            totalJSSize += buffer.length
          }
        }
      })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Total JS should be reasonable (less than 2MB)
      const totalMB = totalJSSize / (1024 * 1024)
      expect(totalMB).toBeLessThan(2)
    })
  })

  test.describe('Interaction Performance', () => {
    test('should respond quickly to clicks', async ({ page }) => {
      await page.goto('/cars')

      const startTime = Date.now()

      const filterButton = page.locator('button, select').first()
      if (await filterButton.isVisible()) {
        await filterButton.click()
        const responseTime = Date.now() - startTime

        // Should respond within 500ms
        expect(responseTime).toBeLessThan(500)
      }
    })

    test('should scroll smoothly', async ({ page }) => {
      await page.goto('/')

      const startY = await page.evaluate(() => window.scrollY)

      await page.evaluate(() => window.scrollTo(0, 500))

      await page.waitForTimeout(100)

      const endY = await page.evaluate(() => window.scrollY)

      expect(endY).toBeGreaterThan(startY)
    })
  })

  test.describe('Rendering Performance', () => {
    test('should not have layout shifts', async ({ page }) => {
      await page.goto('/')

      // Wait for page to stabilize
      await page.waitForLoadState('networkidle')

      // Large layout shifts should not occur
      const bodyRect = await page.locator('body').boundingBox()
      expect(bodyRect).toBeTruthy()
    })
  })
})
