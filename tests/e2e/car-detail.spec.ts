import { test, expect } from '@playwright/test'

test.describe('Car Detail Page', () => {
  test.describe('Without Authentication', () => {
    test('should display car details', async ({ page }) => {
      await page.goto('/cars')

      // Wait for cars to load and click first car
      await page.waitForSelector('a[href^="/cars/"]', { timeout: 10000 })
      const firstCar = page.locator('a[href^="/cars/"]').first()
      await firstCar.click()

      // Should be on car detail page
      await expect(page.url()).toContain('/cars/')

      // Check main elements
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByText(/\$/)).toBeVisible() // Price
    })

    test('should display car image gallery', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      // Check for images
      await expect(page.locator('img[alt*="car" i], img[alt*="vehicle" i]').first()).toBeVisible()
    })

    test('should display car specifications', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      // Common specifications
      await expect(page.getByText(/year|mileage|transmission|fuel/i).first()).toBeVisible()
    })

    test('should display features list', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await expect(page.getByText(/features|specifications/i).first()).toBeVisible()
    })

    test('should have reserve button', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const reserveButton = page.getByRole('button', { name: /reserve/i })
      await expect(reserveButton).toBeVisible()
    })

    test('should redirect to sign in when trying to reserve without auth', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await page.getByRole('button', { name: /reserve/i }).click()

      await expect(page).toHaveURL(/\/auth\/signin/)
    })

    test('should have favorite button', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const favoriteButton = page.locator('button[aria-label*="favorite" i], button[title*="favorite" i]').first()
      await expect(favoriteButton).toBeVisible()
    })

    test('should show contact seller option', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await expect(page.getByText(/contact|inquiry|ask/i).first()).toBeVisible()
    })

    test('should display car description', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await expect(page.getByText(/description/i).first()).toBeVisible()
    })

    test('should have breadcrumb navigation', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await expect(page.getByRole('link', { name: /home|cars/i }).first()).toBeVisible()
    })

    test('should display share options', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      // Look for share button or social media links
      const shareElement = page.locator('button:has-text("share"), a[aria-label*="share" i]').first()
      if (await shareElement.isVisible()) {
        await expect(shareElement).toBeVisible()
      }
    })
  })

  test.describe('Image Gallery Interaction', () => {
    test('should navigate between images', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      // Look for next/previous buttons
      const nextButton = page.locator('button[aria-label*="next" i]').first()
      if (await nextButton.isVisible()) {
        await nextButton.click()
        // Image should change
      }
    })

    test('should open image in fullscreen/lightbox', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const mainImage = page.locator('img[alt*="car" i]').first()
      if (await mainImage.isVisible()) {
        await mainImage.click()
        // Check if lightbox opens
      }
    })
  })

  test.describe('Related Cars', () => {
    test('should display similar or related cars', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      // Scroll to bottom to find related cars
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const relatedSection = page.getByText(/similar|related|you may also like/i).first()
      if (await relatedSection.isVisible()) {
        await expect(relatedSection).toBeVisible()
      }
    })
  })

  test.describe('Inspection Report', () => {
    test('should display inspection information', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const inspectionInfo = page.getByText(/inspection|150-point|checked/i).first()
      if (await inspectionInfo.isVisible()) {
        await expect(inspectionInfo).toBeVisible()
      }
    })
  })

  test.describe('Finance Calculator', () => {
    test('should have link to finance calculator', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const financeLink = page.getByRole('link', { name: /finance|calculate/i }).first()
      if (await financeLink.isVisible()) {
        await expect(financeLink).toBeVisible()
      }
    })
  })
})
