import { Page } from '@playwright/test'

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
}

export async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0))
}

export async function waitForToast(page: Page, type?: 'success' | 'error' | 'warning' | 'info') {
  const toast = page.locator('[data-sonner-toast]').first()
  await toast.waitFor({ state: 'visible', timeout: 5000 })
  return toast
}

export async function closeToast(page: Page) {
  const closeButton = page.locator('[data-sonner-toast] button[aria-label*="close" i]').first()
  if (await closeButton.isVisible()) {
    await closeButton.click()
  }
}

export async function fillContactForm(
  page: Page,
  data: {
    name: string
    email: string
    phone?: string
    subject?: string
    message: string
  }
) {
  await page.getByLabel(/name/i).fill(data.name)
  await page.getByLabel(/email/i).fill(data.email)

  if (data.phone) {
    const phoneField = page.getByLabel(/phone/i)
    if (await phoneField.isVisible()) {
      await phoneField.fill(data.phone)
    }
  }

  if (data.subject) {
    const subjectField = page.getByLabel(/subject/i)
    if (await subjectField.isVisible()) {
      await subjectField.click()
      await page.getByRole('option', { name: new RegExp(data.subject, 'i') }).first().click()
    }
  }

  await page.getByLabel(/message/i).fill(data.message)
}

export async function getCardsCount(page: Page): Promise<number> {
  const cards = page.locator('a[href^="/cars/"]')
  return await cards.count()
}

export async function clickFirstCar(page: Page) {
  await page.waitForSelector('a[href^="/cars/"]')
  await page.locator('a[href^="/cars/"]').first().click()
  await page.waitForLoadState('networkidle')
}

export async function toggleFavorite(page: Page) {
  const favoriteButton = page.locator('button[aria-label*="favorite" i]').first()
  await favoriteButton.click()
  await page.waitForTimeout(500)
}

export async function applyFilters(
  page: Page,
  filters: {
    search?: string
    make?: string
    bodyType?: string
    transmission?: string
    fuelType?: string
  }
) {
  if (filters.search) {
    const searchInput = page.getByPlaceholder(/search/i).first()
    await searchInput.fill(filters.search)
    await page.waitForTimeout(500)
  }

  if (filters.make) {
    const makeFilter = page.getByLabel(/make/i).first()
    if (await makeFilter.isVisible()) {
      await makeFilter.click()
      await page.getByRole('option', { name: new RegExp(filters.make, 'i') }).first().click()
      await page.waitForTimeout(500)
    }
  }

  if (filters.bodyType) {
    const bodyTypeFilter = page.getByLabel(/body type/i).first()
    if (await bodyTypeFilter.isVisible()) {
      await bodyTypeFilter.click()
      await page.getByRole('option', { name: new RegExp(filters.bodyType, 'i') }).first().click()
      await page.waitForTimeout(500)
    }
  }

  if (filters.transmission) {
    const transmissionFilter = page.getByLabel(/transmission/i).first()
    if (await transmissionFilter.isVisible()) {
      await transmissionFilter.click()
      await page.getByRole('option', { name: new RegExp(filters.transmission, 'i') }).first().click()
      await page.waitForTimeout(500)
    }
  }

  if (filters.fuelType) {
    const fuelFilter = page.getByLabel(/fuel/i).first()
    if (await fuelFilter.isVisible()) {
      await fuelFilter.click()
      await page.getByRole('option', { name: new RegExp(filters.fuelType, 'i') }).first().click()
      await page.waitForTimeout(500)
    }
  }
}

export async function clearFilters(page: Page) {
  const clearButton = page.getByRole('button', { name: /clear|reset/i }).first()
  if (await clearButton.isVisible()) {
    await clearButton.click()
    await page.waitForTimeout(500)
  }
}

export async function subscribeToNewsletter(page: Page, email: string) {
  await scrollToBottom(page)
  const emailInput = page.getByPlaceholder(/email/i).last()
  await emailInput.fill(email)
  await page.getByRole('button', { name: /subscribe/i }).click()
}

export async function setViewport(page: Page, device: 'mobile' | 'tablet' | 'desktop') {
  const viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 }
  }

  await page.setViewportSize(viewports[device])
}

export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true })
}

export async function getComputedStyle(page: Page, selector: string, property: string): Promise<string> {
  return await page.locator(selector).first().evaluate((el, prop) =>
    window.getComputedStyle(el).getPropertyValue(prop),
    property
  )
}
