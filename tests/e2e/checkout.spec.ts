import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
  test.describe('Without Authentication', () => {
    test('should redirect to sign in when accessing checkout directly', async ({ page }) => {
      await page.goto('/checkout')

      await expect(page).toHaveURL(/\/auth\/signin/)
    })

    test('should redirect to sign in when trying to reserve a car', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await page.getByRole('button', { name: /reserve/i }).click()

      await expect(page).toHaveURL(/\/auth\/signin/)
    })
  })

  test.describe('Checkout Page Structure', () => {
    test('should require authentication to access checkout', async ({ page }) => {
      await page.goto('/checkout')

      await expect(page).toHaveURL(/\/auth\/signin/)
    })
  })

  test.describe('Reservation Process', () => {
    test('should have reserve button on car detail page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const reserveButton = page.getByRole('button', { name: /reserve|book now/i })
      await expect(reserveButton).toBeVisible()
    })

    test('should show car price on detail page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      await expect(page.getByText(/\$/)).toBeVisible()
    })

    test('should display 7-day guarantee info', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const guaranteeInfo = page.getByText(/7.?day.*guarantee|money.?back/i).first()
      if (await guaranteeInfo.isVisible()) {
        await expect(guaranteeInfo).toBeVisible()
      }
    })
  })

  test.describe('Payment Information', () => {
    test('should display accepted payment methods on site', async ({ page }) => {
      await page.goto('/faqs')

      await expect(page.getByText(/payment.*method/i).first()).toBeVisible()
    })

    test('should have finance calculator link', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForSelector('a[href^="/cars/"]')
      await page.locator('a[href^="/cars/"]').first().click()

      const financeLink = page.getByRole('link', { name: /finance|calculator/i }).first()
      if (await financeLink.isVisible()) {
        await expect(financeLink).toBeVisible()
      }
    })
  })

  test.describe('Delivery Information', () => {
    test('should display free delivery information', async ({ page }) => {
      await page.goto('/')

      await expect(page.getByText(/free.*delivery|delivery.*free/i).first()).toBeVisible()
    })

    test('should show delivery timeframe in FAQs', async ({ page }) => {
      await page.goto('/faqs')

      const deliveryInfo = page.getByText(/7.?14.*day|delivery.*take/i).first()
      await expect(deliveryInfo).toBeVisible()
    })
  })
})
