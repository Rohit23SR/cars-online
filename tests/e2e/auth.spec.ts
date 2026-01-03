import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.describe('Sign In Page', () => {
    test('should display sign in form', async ({ page }) => {
      await page.goto('/auth/signin')

      await expect(page.getByRole('heading', { name: /Sign In/i })).toBeVisible()
      await expect(page.getByLabel(/Email/i)).toBeVisible()
      await expect(page.getByLabel(/Password/i)).toBeVisible()
      await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible()
    })

    test('should show validation errors for empty form', async ({ page }) => {
      await page.goto('/auth/signin')

      await page.getByRole('button', { name: /Sign In/i }).click()

      // Check for error messages
      await expect(page.getByText(/required/i)).toBeVisible()
    })

    test('should show error for invalid email format', async ({ page }) => {
      await page.goto('/auth/signin')

      await page.getByLabel(/Email/i).fill('invalid-email')
      await page.getByLabel(/Password/i).fill('password123')
      await page.getByRole('button', { name: /Sign In/i }).click()

      await expect(page.getByText(/valid email/i)).toBeVisible()
    })

    test('should have link to sign up page', async ({ page }) => {
      await page.goto('/auth/signin')

      const signUpLink = page.getByRole('link', { name: /Sign Up/i })
      await expect(signUpLink).toBeVisible()

      await signUpLink.click()
      await expect(page).toHaveURL(/\/auth\/signup/)
    })

    test('should have social login options', async ({ page }) => {
      await page.goto('/auth/signin')

      await expect(page.getByRole('button', { name: /Google/i })).toBeVisible()
    })

    test('should show/hide password when toggle clicked', async ({ page }) => {
      await page.goto('/auth/signin')

      const passwordInput = page.getByLabel(/Password/i)
      await expect(passwordInput).toHaveAttribute('type', 'password')

      // Click show/hide button if it exists
      const toggleButton = page.locator('button[type="button"]').filter({ hasText: /show|hide/i }).first()
      if (await toggleButton.isVisible()) {
        await toggleButton.click()
        await expect(passwordInput).toHaveAttribute('type', 'text')
      }
    })
  })

  test.describe('Sign Up Page', () => {
    test('should display sign up form', async ({ page }) => {
      await page.goto('/auth/signup')

      await expect(page.getByRole('heading', { name: /Sign Up/i })).toBeVisible()
      await expect(page.getByLabel(/Name/i)).toBeVisible()
      await expect(page.getByLabel(/Email/i)).toBeVisible()
      await expect(page.getByLabel(/Password/i)).toBeVisible()
      await expect(page.getByRole('button', { name: /Sign Up/i })).toBeVisible()
    })

    test('should show validation errors for empty form', async ({ page }) => {
      await page.goto('/auth/signup')

      await page.getByRole('button', { name: /Sign Up/i }).click()

      await expect(page.getByText(/required/i).first()).toBeVisible()
    })

    test('should validate password strength', async ({ page }) => {
      await page.goto('/auth/signup')

      await page.getByLabel(/Name/i).fill('Test User')
      await page.getByLabel(/Email/i).fill('test@example.com')
      await page.getByLabel(/Password/i).fill('weak')
      await page.getByRole('button', { name: /Sign Up/i }).click()

      // Should show password strength error
      await expect(page.getByText(/at least/i)).toBeVisible()
    })

    test('should have link to sign in page', async ({ page }) => {
      await page.goto('/auth/signup')

      const signInLink = page.getByRole('link', { name: /Sign In/i })
      await expect(signInLink).toBeVisible()

      await signInLink.click()
      await expect(page).toHaveURL(/\/auth\/signin/)
    })

    test('should have terms and privacy policy links', async ({ page }) => {
      await page.goto('/auth/signup')

      await expect(page.getByRole('link', { name: /Terms/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /Privacy/i })).toBeVisible()
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect to sign in when accessing dashboard without auth', async ({ page }) => {
      await page.goto('/dashboard')

      await expect(page).toHaveURL(/\/auth\/signin/)
    })

    test('should redirect to sign in when accessing favorites without auth', async ({ page }) => {
      await page.goto('/dashboard/favorites')

      await expect(page).toHaveURL(/\/auth\/signin/)
    })

    test('should redirect to sign in when accessing checkout without auth', async ({ page }) => {
      await page.goto('/checkout')

      await expect(page).toHaveURL(/\/auth\/signin/)
    })
  })
})
