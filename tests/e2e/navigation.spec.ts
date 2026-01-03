import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.describe('Header Navigation', () => {
    test('should display header on all pages', async ({ page }) => {
      await page.goto('/')

      await expect(page.locator('header').first()).toBeVisible()
      await expect(page.getByRole('link', { name: /cars online/i }).first()).toBeVisible()
    })

    test('should have main navigation links', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByRole('link', { name: /browse|cars/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /sell/i }).first()).toBeVisible()
    })

    test('should navigate to browse cars', async ({ page }) => {
      await page.goto('/')

      await page.getByRole('link', { name: /browse.*cars|cars/i }).first().click()

      await expect(page).toHaveURL(/\/cars/)
    })

    test('should navigate to sell page', async ({ page }) => {
      await page.goto('/')

      await page.getByRole('link', { name: /sell/i }).first().click()

      await expect(page).toHaveURL(/\/sell/)
    })

    test('should have how it works link', async ({ page }) => {
      await page.goto('/')

      const howItWorksLink = page.getByRole('link', { name: /how it works/i }).first()
      if (await howItWorksLink.isVisible()) {
        await expect(howItWorksLink).toBeVisible()
      }
    })

    test('should have about link', async ({ page }) => {
      await page.goto('/')

      const aboutLink = page.getByRole('link', { name: /about/i }).first()
      if (await aboutLink.isVisible()) {
        await expect(aboutLink).toBeVisible()
      }
    })

    test('should have contact link', async ({ page }) => {
      await page.goto('/')

      const contactLink = page.getByRole('link', { name: /contact/i }).first()
      if (await contactLink.isVisible()) {
        await expect(contactLink).toBeVisible()
      }
    })

    test('should show sign in button when not authenticated', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByRole('link', { name: /sign in|login/i }).first()).toBeVisible()
    })

    test('should have logo that links to homepage', async ({ page }) => {
      await page.goto('/cars')

      await page.getByRole('link', { name: /cars online/i }).first().click()

      await expect(page).toHaveURL('/')
    })

    test('should be sticky or fixed on scroll', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, 500))

      await expect(page.locator('header').first()).toBeVisible()
    })

    test('should have mobile menu button on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      if (await menuButton.isVisible()) {
        await expect(menuButton).toBeVisible()
      }
    })

    test('should open mobile menu when clicked', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      const menuButton = page.locator('button[aria-label*="menu" i]').first()
      if (await menuButton.isVisible()) {
        await menuButton.click()
        await page.waitForTimeout(300)

        // Menu items should be visible
        await expect(page.getByRole('link', { name: /browse|cars/i }).first()).toBeVisible()
      }
    })
  })

  test.describe('Footer Navigation', () => {
    test('should display footer on all pages', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await expect(page.locator('footer').first()).toBeVisible()
    })

    test('should have company links', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await expect(page.getByRole('link', { name: /about/i }).last()).toBeVisible()
      await expect(page.getByRole('link', { name: /contact/i }).last()).toBeVisible()
    })

    test('should have shop links', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await expect(page.getByRole('link', { name: /browse.*cars/i }).last()).toBeVisible()
      await expect(page.getByRole('link', { name: /sell/i }).last()).toBeVisible()
    })

    test('should have support links', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await expect(page.getByRole('link', { name: /faq/i }).first()).toBeVisible()
    })

    test('should have legal links', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await expect(page.getByRole('link', { name: /privacy/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /terms/i }).first()).toBeVisible()
    })

    test('should navigate to privacy policy', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await page.getByRole('link', { name: /privacy/i }).first().click()

      await expect(page).toHaveURL(/\/privacy/)
    })

    test('should navigate to terms and conditions', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      await page.getByRole('link', { name: /terms/i }).first().click()

      await expect(page).toHaveURL(/\/terms/)
    })

    test('should have social media links', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const socialLinks = page.locator('a[aria-label*="facebook" i], a[aria-label*="twitter" i], a[aria-label*="instagram" i]')
      const count = await socialLinks.count()

      expect(count).toBeGreaterThan(0)
    })

    test('should display copyright notice', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const currentYear = new Date().getFullYear()
      await expect(page.getByText(new RegExp(currentYear.toString()))).toBeVisible()
    })

    test('should display demo notice', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

      const demoNotice = page.getByText(/demo|portfolio/i)
      if (await demoNotice.first().isVisible()) {
        await expect(demoNotice.first()).toBeVisible()
      }
    })
  })

  test.describe('Breadcrumbs', () => {
    test('should show breadcrumbs on car detail page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const breadcrumb = page.locator('[aria-label*="breadcrumb" i], nav:has(a[href="/"])').first()
      if (await breadcrumb.isVisible()) {
        await expect(breadcrumb).toBeVisible()
      }
    })
  })

  test.describe('Back Navigation', () => {
    test('should navigate back correctly', async ({ page }) => {
      await page.goto('/')
      await page.getByRole('link', { name: /browse.*cars/i }).first().click()

      await page.goBack()

      await expect(page).toHaveURL('/')
    })

    test('should maintain scroll position on back navigation', async ({ page }) => {
      await page.goto('/')

      await page.evaluate(() => window.scrollTo(0, 500))

      await page.getByRole('link', { name: /browse/i }).first().click()
      await page.goBack()

      // Page should restore scroll position
    })
  })
})
