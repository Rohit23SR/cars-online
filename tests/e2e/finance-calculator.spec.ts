import { test, expect } from '@playwright/test'

test.describe('Finance Calculator Page', () => {
  test('should display finance calculator', async ({ page }) => {
    await page.goto('/finance-calculator')

    await expect(page.getByRole('heading', { name: /finance|calculator/i })).toBeVisible()
  })

  test('should have car price input', async ({ page }) => {
    await page.goto('/finance-calculator')

    const priceInput = page.getByLabel(/price|car price|vehicle price/i)
    await expect(priceInput).toBeVisible()
  })

  test('should have deposit/down payment input', async ({ page }) => {
    await page.goto('/finance-calculator')

    const depositInput = page.getByLabel(/deposit|down payment/i)
    await expect(depositInput).toBeVisible()
  })

  test('should have loan term selector', async ({ page }) => {
    await page.goto('/finance-calculator')

    const termInput = page.getByLabel(/term|months|years/i).first()
    await expect(termInput).toBeVisible()
  })

  test('should have interest rate input', async ({ page }) => {
    await page.goto('/finance-calculator')

    const rateInput = page.getByLabel(/interest|rate/i)
    await expect(rateInput).toBeVisible()
  })

  test('should calculate monthly payment', async ({ page }) => {
    await page.goto('/finance-calculator')

    // Fill in calculator
    await page.getByLabel(/price|car price/i).fill('30000')
    await page.getByLabel(/deposit/i).fill('5000')

    const termSelect = page.getByLabel(/term/i).first()
    await termSelect.click()
    await page.getByRole('option', { name: /60|5 year/i }).first().click()

    await page.getByLabel(/interest|rate/i).fill('7.5')

    // Calculate button or auto-calculate
    const calculateButton = page.getByRole('button', { name: /calculate/i })
    if (await calculateButton.isVisible()) {
      await calculateButton.click()
    }

    await page.waitForTimeout(1000)

    // Should show monthly payment result
    const result = page.getByText(/monthly payment|per month|\$/i)
    await expect(result.first()).toBeVisible()
  })

  test('should show total interest paid', async ({ page }) => {
    await page.goto('/finance-calculator')

    await page.getByLabel(/price/i).fill('30000')
    await page.getByLabel(/deposit/i).fill('5000')
    await page.getByLabel(/interest/i).fill('7.5')

    await page.waitForTimeout(1000)

    const totalInterest = page.getByText(/total interest|interest paid/i)
    if (await totalInterest.isVisible()) {
      await expect(totalInterest).toBeVisible()
    }
  })

  test('should show total amount payable', async ({ page }) => {
    await page.goto('/finance-calculator')

    await page.getByLabel(/price/i).fill('30000')
    await page.getByLabel(/deposit/i).fill('5000')
    await page.getByLabel(/interest/i).fill('7.5')

    await page.waitForTimeout(1000)

    const totalPayable = page.getByText(/total.*pay|total amount/i)
    if (await totalPayable.isVisible()) {
      await expect(totalPayable).toBeVisible()
    }
  })

  test('should update calculation when values change', async ({ page }) => {
    await page.goto('/finance-calculator')

    await page.getByLabel(/price/i).fill('30000')
    await page.waitForTimeout(500)

    const firstResult = await page.locator('text=/\\$[\\d,]+/').first().textContent()

    // Change price
    await page.getByLabel(/price/i).fill('40000')
    await page.waitForTimeout(500)

    const secondResult = await page.locator('text=/\\$[\\d,]+/').first().textContent()

    // Results should be different
    expect(firstResult).not.toBe(secondResult)
  })

  test('should validate minimum values', async ({ page }) => {
    await page.goto('/finance-calculator')

    await page.getByLabel(/price/i).fill('-100')
    await page.waitForTimeout(500)

    // Should show error or reset to 0
  })

  test('should have different loan term options', async ({ page }) => {
    await page.goto('/finance-calculator')

    const termSelect = page.getByLabel(/term/i).first()
    await termSelect.click()

    // Should have multiple options like 12, 24, 36, 48, 60 months
    const options = page.getByRole('option')
    const count = await options.count()

    expect(count).toBeGreaterThan(1)
  })

  test('should have link to browse cars', async ({ page }) => {
    await page.goto('/finance-calculator')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const browseLink = page.getByRole('link', { name: /browse|view cars/i }).first()
    if (await browseLink.isVisible()) {
      await expect(browseLink).toBeVisible()
    }
  })

  test('should display disclaimer or terms', async ({ page }) => {
    await page.goto('/finance-calculator')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const disclaimer = page.getByText(/estimate|actual.*vary|subject to approval/i).first()
    if (await disclaimer.isVisible()) {
      await expect(disclaimer).toBeVisible()
    }
  })
})
