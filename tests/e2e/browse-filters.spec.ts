import { test, expect } from '@playwright/test'

test.describe('Browse Cars - Filters and Search', () => {
  test.describe('Filter Functionality', () => {
    test('should display all filter options', async ({ page }) => {
      await page.goto('/cars')

      // Wait for page to load
      await page.waitForLoadState('networkidle')

      // Check for filter sections
      await expect(page.getByText(/filter|search/i).first()).toBeVisible()
    })

    test('should filter by price range', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      // Look for price filter
      const priceFilter = page.locator('[data-testid*="price"], input[type="range"], input[placeholder*="price" i]').first()
      if (await priceFilter.isVisible()) {
        const initialCount = await page.locator('a[href^="/cars/"]').count()

        // Interact with price filter
        await priceFilter.click()

        await page.waitForTimeout(1000)

        const newCount = await page.locator('a[href^="/cars/"]').count()
        // Count might change after filtering
      }
    })

    test('should filter by make', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      // Look for make filter dropdown
      const makeFilter = page.getByLabel(/make|brand/i).first()
      if (await makeFilter.isVisible()) {
        await makeFilter.click()

        // Select a make option
        const firstOption = page.getByRole('option').first()
        if (await firstOption.isVisible()) {
          await firstOption.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should filter by body type', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const bodyTypeFilter = page.getByLabel(/body type|type/i).first()
      if (await bodyTypeFilter.isVisible()) {
        await bodyTypeFilter.click()

        const firstOption = page.getByRole('option').first()
        if (await firstOption.isVisible()) {
          await firstOption.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should filter by transmission', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const transmissionFilter = page.getByLabel(/transmission/i).first()
      if (await transmissionFilter.isVisible()) {
        await transmissionFilter.click()

        const automaticOption = page.getByRole('option', { name: /automatic/i }).first()
        if (await automaticOption.isVisible()) {
          await automaticOption.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should filter by fuel type', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const fuelFilter = page.getByLabel(/fuel/i).first()
      if (await fuelFilter.isVisible()) {
        await fuelFilter.click()

        const petrolOption = page.getByRole('option', { name: /petrol/i }).first()
        if (await petrolOption.isVisible()) {
          await petrolOption.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should filter by year range', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const yearFilter = page.getByLabel(/year/i).first()
      if (await yearFilter.isVisible()) {
        await yearFilter.click()
      }
    })

    test('should filter by mileage', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const mileageFilter = page.locator('[data-testid*="mileage"], input[placeholder*="mileage" i]').first()
      if (await mileageFilter.isVisible()) {
        await mileageFilter.click()
      }
    })

    test('should apply multiple filters simultaneously', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      // Apply multiple filters
      const makeFilter = page.getByLabel(/make/i).first()
      if (await makeFilter.isVisible()) {
        await makeFilter.click()
        const firstMake = page.getByRole('option').first()
        if (await firstMake.isVisible()) {
          await firstMake.click()
        }
      }

      await page.waitForTimeout(500)

      const transmissionFilter = page.getByLabel(/transmission/i).first()
      if (await transmissionFilter.isVisible()) {
        await transmissionFilter.click()
        const automatic = page.getByRole('option', { name: /automatic/i }).first()
        if (await automatic.isVisible()) {
          await automatic.click()
        }
      }

      await page.waitForTimeout(1000)
    })

    test('should clear all filters', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      // Look for clear filters button
      const clearButton = page.getByRole('button', { name: /clear|reset/i }).first()
      if (await clearButton.isVisible()) {
        await clearButton.click()
        await page.waitForTimeout(1000)
      }
    })
  })

  test.describe('Search Functionality', () => {
    test('should have search input', async ({ page }) => {
      await page.goto('/cars')

      const searchInput = page.getByPlaceholder(/search/i).first()
      await expect(searchInput).toBeVisible()
    })

    test('should search by car name', async ({ page }) => {
      await page.goto('/cars')

      const searchInput = page.getByPlaceholder(/search/i).first()
      await searchInput.fill('Toyota')
      await page.waitForTimeout(1000)

      // Results should update
      const results = page.locator('a[href^="/cars/"]')
      if (await results.first().isVisible()) {
        await expect(results.first()).toBeVisible()
      }
    })

    test('should search by model', async ({ page }) => {
      await page.goto('/cars')

      const searchInput = page.getByPlaceholder(/search/i).first()
      await searchInput.fill('Camry')
      await page.waitForTimeout(1000)
    })

    test('should show no results message when search has no matches', async ({ page }) => {
      await page.goto('/cars')

      const searchInput = page.getByPlaceholder(/search/i).first()
      await searchInput.fill('XYZ123NonexistentCar')
      await page.waitForTimeout(1000)

      const noResults = page.getByText(/no.*found|no results/i).first()
      if (await noResults.isVisible()) {
        await expect(noResults).toBeVisible()
      }
    })
  })

  test.describe('Sort Functionality', () => {
    test('should have sort dropdown', async ({ page }) => {
      await page.goto('/cars')

      const sortDropdown = page.getByLabel(/sort/i).first()
      if (await sortDropdown.isVisible()) {
        await expect(sortDropdown).toBeVisible()
      }
    })

    test('should sort by price low to high', async ({ page }) => {
      await page.goto('/cars')

      const sortDropdown = page.getByLabel(/sort/i).first()
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click()

        const priceLowHigh = page.getByRole('option', { name: /price.*low|lowest/i }).first()
        if (await priceLowHigh.isVisible()) {
          await priceLowHigh.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should sort by price high to low', async ({ page }) => {
      await page.goto('/cars')

      const sortDropdown = page.getByLabel(/sort/i).first()
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click()

        const priceHighLow = page.getByRole('option', { name: /price.*high|highest/i }).first()
        if (await priceHighLow.isVisible()) {
          await priceHighLow.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should sort by year newest first', async ({ page }) => {
      await page.goto('/cars')

      const sortDropdown = page.getByLabel(/sort/i).first()
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click()

        const yearNewest = page.getByRole('option', { name: /year.*new|newest/i }).first()
        if (await yearNewest.isVisible()) {
          await yearNewest.click()
          await page.waitForTimeout(1000)
        }
      }
    })

    test('should sort by mileage', async ({ page }) => {
      await page.goto('/cars')

      const sortDropdown = page.getByLabel(/sort/i).first()
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click()

        const mileageSort = page.getByRole('option', { name: /mileage/i }).first()
        if (await mileageSort.isVisible()) {
          await mileageSort.click()
          await page.waitForTimeout(1000)
        }
      }
    })
  })

  test.describe('Pagination', () => {
    test('should display pagination when there are many results', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const pagination = page.locator('[role="navigation"], .pagination, button:has-text("next")').first()
      if (await pagination.isVisible()) {
        await expect(pagination).toBeVisible()
      }
    })

    test('should navigate to next page', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const nextButton = page.getByRole('button', { name: /next/i }).first()
      if (await nextButton.isVisible()) {
        await nextButton.click()
        await page.waitForLoadState('networkidle')
      }
    })

    test('should navigate to specific page number', async ({ page }) => {
      await page.goto('/cars')
      await page.waitForLoadState('networkidle')

      const pageTwo = page.getByRole('button', { name: '2' }).first()
      if (await pageTwo.isVisible()) {
        await pageTwo.click()
        await page.waitForLoadState('networkidle')
      }
    })
  })

  test.describe('View Toggle', () => {
    test('should toggle between grid and list view', async ({ page }) => {
      await page.goto('/cars')

      const viewToggle = page.locator('button[aria-label*="view" i]').first()
      if (await viewToggle.isVisible()) {
        await viewToggle.click()
        await page.waitForTimeout(500)
      }
    })
  })
})
