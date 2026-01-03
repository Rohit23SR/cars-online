import { Page } from '@playwright/test'

export async function signIn(page: Page, email: string, password: string) {
  await page.goto('/auth/signin')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: /sign in/i }).click()
  await page.waitForLoadState('networkidle')
}

export async function signUp(page: Page, name: string, email: string, password: string) {
  await page.goto('/auth/signup')
  await page.getByLabel(/name/i).fill(name)
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: /sign up/i }).click()
  await page.waitForLoadState('networkidle')
}

export async function signOut(page: Page) {
  const signOutButton = page.getByRole('button', { name: /sign out|logout/i }).first()
  if (await signOutButton.isVisible()) {
    await signOutButton.click()
    await page.waitForLoadState('networkidle')
  }
}

export async function isAuthenticated(page: Page): Promise<boolean> {
  await page.goto('/')
  const signInButton = page.getByRole('link', { name: /sign in/i }).first()
  return !(await signInButton.isVisible())
}
