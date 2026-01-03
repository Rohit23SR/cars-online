import { test, expect } from '@playwright/test'

test.describe('Sell Car Page', () => {
  test('should display sell car form', async ({ page }) => {
    await page.goto('/sell')

    // Check page heading
    await expect(page.getByRole('heading', { name: /Sell Your Car in Minutes/i })).toBeVisible()

    // Check benefits cards
    await expect(page.getByText(/Best Market Price/i)).toBeVisible()
    await expect(page.getByText(/Quick Process/i)).toBeVisible()
    await expect(page.getByText(/Safe & Secure/i)).toBeVisible()

    // Check form heading
    await expect(page.getByRole('heading', { name: /Get Your Free Valuation/i })).toBeVisible()
  })

  test('should show validation error for empty form', async ({ page }) => {
    await page.goto('/sell')

    // Scroll to submit button
    const submitButton = page.getByRole('button', { name: /Get Free Valuation/i })
    await submitButton.scrollIntoViewIfNeeded()

    // Try to submit empty form
    await submitButton.click()

    // Should show error toast
    await expect(page.getByText(/Missing Required Fields/i)).toBeVisible()
  })

  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/sell')

    // Fill vehicle details
    await page.getByLabel(/Make \*/i).click()
    await page.getByRole('option', { name: 'Toyota' }).click()

    await page.getByLabel(/Model \*/i).fill('Camry')

    await page.getByLabel(/Year \*/i).click()
    await page.getByRole('option', { name: '2020' }).click()

    // Fill owner details
    await page.getByLabel(/First Name \*/i).fill('John')
    await page.getByLabel(/Last Name \*/i).fill('Doe')
    await page.getByLabel(/Email \*/i).fill('john.doe@example.com')
    await page.getByLabel(/Phone \*/i).fill('0412345678')

    // Scroll to and click submit
    const submitButton = page.getByRole('button', { name: /Get Free Valuation/i })
    await submitButton.scrollIntoViewIfNeeded()
    await submitButton.click()

    // Should show success toast
    await expect(page.getByText(/Valuation Request Submitted/i)).toBeVisible()
  })

  test('should fill optional fields', async ({ page }) => {
    await page.goto('/sell')

    // Fill required fields first
    await page.getByLabel(/Make \*/i).click()
    await page.getByRole('option', { name: 'Honda' }).click()

    await page.getByLabel(/Model \*/i).fill('Civic')

    await page.getByLabel(/Year \*/i).click()
    await page.getByRole('option', { name: '2019' }).click()

    // Fill optional fields
    await page.getByLabel(/Variant/i).fill('VTi-S')
    await page.getByLabel(/Mileage/i).fill('50000')
    await page.getByLabel(/Color/i).fill('Blue')

    // Fill owner details
    await page.getByLabel(/First Name \*/i).fill('Jane')
    await page.getByLabel(/Last Name \*/i).fill('Smith')
    await page.getByLabel(/Email \*/i).fill('jane.smith@example.com')
    await page.getByLabel(/Phone \*/i).fill('0423456789')

    // Check that all fields are filled
    await expect(page.getByLabel(/Variant/i)).toHaveValue('VTi-S')
    await expect(page.getByLabel(/Mileage/i)).toHaveValue('50000')
    await expect(page.getByLabel(/Color/i)).toHaveValue('Blue')
  })

  test('should display "What Happens Next" section', async ({ page }) => {
    await page.goto('/sell')

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Check steps
    await expect(page.getByText(/Submit Details/i)).toBeVisible()
    await expect(page.getByText(/Get Valuation/i)).toBeVisible()
    await expect(page.getByText(/Schedule Inspection/i)).toBeVisible()
    await expect(page.getByText(/Get Paid/i)).toBeVisible()
  })
})
