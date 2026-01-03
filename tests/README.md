# Testing Suite - Cars Online

## Quick Start

### Unit Tests (Vitest)
```bash
# Run in watch mode
npm run test

# Run once
npm run test:run

# Open UI
npm run test:ui

# Generate coverage
npm run test:coverage
```

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run in UI mode (recommended)
npm run test:e2e:ui

# Run with browser visible
npm run test:e2e:headed

# View report
npm run test:e2e:report
```

### Run Specific Test File
```bash
# Unit tests
npx vitest run tests/unit/lib/utils.test.ts

# E2E tests
npx playwright test tests/e2e/auth.spec.ts
```

## Test Organization

```
tests/
├── unit/                             # Unit tests (Vitest)
│   ├── lib/
│   │   ├── utils.test.ts            # Utility functions (63 tests)
│   │   └── validations.test.ts      # Zod schemas (62 tests)
│   ├── store/
│   │   └── checkout-store.test.ts   # Zustand store (32 tests)
│   └── components/
│       └── ui/
│           └── button.test.tsx      # Button component (47 tests)
├── e2e/                              # E2E tests (Playwright)
│   ├── helpers/
│   │   ├── auth.helpers.ts          # Authentication utilities
│   │   └── test.helpers.ts          # Common test utilities
│   ├── about.spec.ts                # About page tests
│   ├── accessibility.spec.ts        # Accessibility & a11y tests
│   ├── auth.spec.ts                 # Authentication flow tests
│   ├── browse-cars.spec.ts          # Main browse page tests
│   ├── browse-filters.spec.ts       # Filters & search tests
│   ├── car-detail.spec.ts           # Car detail page tests
│   ├── checkout.spec.ts             # Checkout flow tests
│   ├── contact.spec.ts              # Contact page tests
│   ├── dashboard.spec.ts            # Dashboard tests
│   ├── error-handling.spec.ts       # Error scenarios
│   ├── faqs.spec.ts                 # FAQs page tests
│   ├── favorites.spec.ts            # Favorites functionality
│   ├── finance-calculator.spec.ts   # Finance calculator tests
│   ├── homepage.spec.ts             # Homepage tests
│   ├── how-it-works.spec.ts         # How it works page
│   ├── legal-pages.spec.ts          # Privacy & Terms tests
│   ├── navigation.spec.ts           # Header/Footer navigation
│   ├── newsletter.spec.ts           # Newsletter subscription
│   ├── performance.spec.ts          # Performance metrics
│   ├── responsive.spec.ts           # Responsive design tests
│   └── sell-car.spec.ts             # Sell car page tests
└── TEST_COVERAGE.md                 # Detailed coverage docs
```

## Test Coverage

### Unit Tests (204 tests - All Passing ✅)

**Utilities (`lib/utils.test.ts` - 63 tests)**
- Class name merging (cn function)
- Price formatting (AUD currency)
- Number formatting
- Date formatting (absolute and relative)
- Slug generation
- Order number generation
- Loan payment calculations
- String truncation

**Validations (`lib/validations.test.ts` - 62 tests)**
- Sign in/up schemas
- Car form validation
- Checkout schemas (details, finance, payment)
- Inquiry and contact forms
- Sell car form
- Profile and password schemas

**Store (`store/checkout-store.test.ts` - 32 tests)**
- Checkout flow state management
- Form data persistence
- Step navigation
- Reset functionality

**Components (`components/ui/button.test.tsx` - 47 tests)**
- Button variants (default, destructive, outline, etc.)
- Button sizes (sm, default, lg, icon)
- Accessibility features
- User interactions
- Form integration

### E2E Tests (200+ tests)

**Pages Tested (100%)**
- [x] Homepage
- [x] Browse Cars
- [x] Car Detail
- [x] Contact
- [x] About
- [x] How It Works
- [x] FAQs
- [x] Finance Calculator
- [x] Sell Car
- [x] Sign In / Sign Up
- [x] Dashboard (with auth redirects)
- [x] Privacy Policy
- [x] Terms & Conditions

**Features Tested**
- [x] Authentication flows
- [x] Car filtering & search
- [x] Favorites (add/remove)
- [x] Newsletter subscription
- [x] Contact form
- [x] Finance calculator
- [x] Navigation (header/footer)
- [x] Responsive design (mobile/tablet/desktop)
- [x] Accessibility (keyboard, screen readers)
- [x] Error handling
- [x] Performance metrics

### ✅ User Flows Tested
- [x] Guest browsing flow
- [x] Sign up flow
- [x] Sign in flow
- [x] Browse → Filter → View detail
- [x] Try to favorite (redirect to sign in)
- [x] Newsletter subscription
- [x] Contact form submission
- [x] Finance calculation
- [x] Mobile navigation

## Test Statistics

### Unit Tests
- **Test Files**: 4
- **Test Cases**: 204 (all passing)
- **Coverage**: Utilities, validations, stores, UI components
- **Framework**: Vitest + Testing Library

### E2E Tests
- **Test Files**: 22
- **Test Cases**: 200+
- **Test Helpers**: 15+ utility functions
- **Devices Tested**: Mobile (375px), Tablet (768px), Desktop (1920px)
- **Browsers**: Chromium (expandable to Firefox, Safari)
- **Framework**: Playwright

### Total
- **Test Files**: 26
- **Test Cases**: 404+
- **Code Coverage**: Comprehensive (unit + E2E)

## Key Features

### 1. Comprehensive Coverage
Every page, component, and user flow is tested with multiple scenarios including:
- Happy paths
- Error cases
- Edge cases
- Responsive breakpoints
- Accessibility requirements

### 2. Helper Functions
Reusable utilities for common operations:
```typescript
// Authentication
await signIn(page, 'user@example.com', 'password')
await signUp(page, 'Name', 'email@test.com', 'SecurePass123')

// Test utilities
await scrollToBottom(page)
await clickFirstCar(page)
await applyFilters(page, { make: 'Toyota', transmission: 'Automatic' })
await subscribeToNewsletter(page, 'test@example.com')
await setViewport(page, 'mobile')
```

### 3. Best Practices
- Role-based selectors (ARIA-compliant)
- Proper waiting strategies
- DRY principle (Don't Repeat Yourself)
- Isolated tests (no dependencies)
- Clear, descriptive test names
- AAA pattern (Arrange, Act, Assert)

### 4. CI/CD Ready
- Automatic retries on failure
- Screenshot on failure
- Trace on first retry
- HTML reports
- Parallel execution
- Optimized for CI environments

## Common Commands

### Debug Single Test
```bash
npx playwright test auth.spec.ts --debug
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests with Grep
```bash
npx playwright test --grep "sign in"
npx playwright test --grep "mobile"
```

### Update Snapshots (if using visual regression)
```bash
npx playwright test --update-snapshots
```

### Codegen (Record Tests)
```bash
npx playwright codegen http://localhost:3000
```

## Writing New Tests

### Template
```typescript
import { test, expect } from '@playwright/test'
import { yourHelper } from './helpers/test.helpers'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Arrange
    await page.goto('/your-page')

    // Act
    await page.getByRole('button', { name: /click me/i }).click()

    // Assert
    await expect(page.getByText(/success/i)).toBeVisible()
  })
})
```

### Best Practices for New Tests
1. Use role-based selectors: `getByRole`, `getByLabel`, `getByText`
2. Add `.first()` when multiple elements might match
3. Use meaningful test names that describe what is being tested
4. Test user flows, not implementation details
5. Keep tests independent and isolated
6. Use helper functions for common operations
7. Add proper waits (avoid arbitrary timeouts)
8. Test both happy paths and error cases

## Troubleshooting

### Tests Failing?
1. Make sure dev server is running (`npm run dev`)
2. Check if database has seed data (`npm run db:seed`)
3. Clear browser data: `npx playwright test --headed --debug`
4. Check screenshots in `test-results/` folder
5. View detailed report: `npm run test:e2e:report`

### Slow Tests?
1. Run in parallel: Tests already configured for parallel execution
2. Use `--shard` for distributed testing
3. Skip heavy tests in development: `test.skip()`

### Flaky Tests?
1. Increase timeout: `test.setTimeout(60000)`
2. Add proper waits: `await page.waitForLoadState('networkidle')`
3. Use `toBeVisible({ timeout: 10000 })` for specific elements
4. Check for race conditions

## CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run db:push
      - run: npm run db:seed
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Test Coverage Details](./TEST_COVERAGE.md)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Accessibility Testing](https://playwright.dev/docs/accessibility-testing)

## Contributing

When adding new features to the application:
1. Write tests FIRST (TDD approach recommended)
2. Cover happy path + error cases
3. Test accessibility
4. Test on mobile viewport
5. Add to TEST_COVERAGE.md
6. Run full test suite before committing

## Support

For issues or questions:
1. Check existing tests for examples
2. Review TEST_COVERAGE.md for comprehensive docs
3. Use `--debug` mode to troubleshoot
4. Check test reports for detailed failure info

---

**Happy Testing! 🎭**
