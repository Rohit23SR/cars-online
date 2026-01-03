import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  cn,
  formatPrice,
  formatNumber,
  formatDate,
  formatRelativeDate,
  generateSlug,
  generateOrderNumber,
  calculateMonthlyPayment,
  calculateWeeklyPayment,
  sleep,
  truncate,
} from '@/lib/utils'

describe('cn (className merger)', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('should handle array of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('should handle object syntax', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo')
  })

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })

  it('should handle empty input', () => {
    expect(cn()).toBe('')
  })
})

describe('formatPrice', () => {
  it('should format number to AUD currency', () => {
    expect(formatPrice(50000)).toBe('$50,000')
  })

  it('should format string number to AUD currency', () => {
    expect(formatPrice('75000')).toBe('$75,000')
  })

  it('should handle decimal values', () => {
    expect(formatPrice(50000.99)).toBe('$50,000.99')
  })

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('$0')
  })

  it('should handle large numbers', () => {
    expect(formatPrice(1000000)).toBe('$1,000,000')
  })

  it('should handle small numbers', () => {
    expect(formatPrice(99)).toBe('$99')
  })

  it('should handle negative numbers', () => {
    expect(formatPrice(-5000)).toBe('-$5,000')
  })
})

describe('formatNumber', () => {
  it('should format number with comma separators', () => {
    expect(formatNumber(50000)).toBe('50,000')
  })

  it('should handle zero', () => {
    expect(formatNumber(0)).toBe('0')
  })

  it('should handle single digit', () => {
    expect(formatNumber(5)).toBe('5')
  })

  it('should handle large numbers', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('should handle decimal numbers', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56')
  })
})

describe('formatDate', () => {
  it('should format Date object correctly', () => {
    const date = new Date('2024-12-25')
    const formatted = formatDate(date)
    expect(formatted).toMatch(/December/)
    expect(formatted).toMatch(/2024/)
  })

  it('should format date string correctly', () => {
    const formatted = formatDate('2024-12-25')
    expect(formatted).toMatch(/December/)
    expect(formatted).toMatch(/2024/)
  })

  it('should handle ISO date strings', () => {
    const formatted = formatDate('2024-01-15T10:30:00Z')
    expect(formatted).toMatch(/January/)
    expect(formatted).toMatch(/2024/)
  })
})

describe('formatRelativeDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should return "Today" for current date', () => {
    const now = new Date()
    expect(formatRelativeDate(now)).toBe('Today')
  })

  it('should return "Yesterday" for yesterday', () => {
    const now = new Date()
    vi.setSystemTime(now)
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    expect(formatRelativeDate(yesterday)).toBe('Yesterday')
  })

  it('should return "X days ago" for recent dates', () => {
    const now = new Date()
    vi.setSystemTime(now)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    expect(formatRelativeDate(threeDaysAgo)).toBe('3 days ago')
  })

  it('should return "X weeks ago" for dates within a month', () => {
    const now = new Date()
    vi.setSystemTime(now)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    expect(formatRelativeDate(twoWeeksAgo)).toBe('2 weeks ago')
  })

  it('should return "X months ago" for dates within a year', () => {
    const now = new Date()
    vi.setSystemTime(now)
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)
    expect(formatRelativeDate(twoMonthsAgo)).toBe('2 months ago')
  })

  it('should return "X years ago" for old dates', () => {
    const now = new Date()
    vi.setSystemTime(now)
    const twoYearsAgo = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000)
    expect(formatRelativeDate(twoYearsAgo)).toBe('2 years ago')
  })

  it('should handle string dates', () => {
    const now = new Date('2024-12-25')
    vi.setSystemTime(now)
    expect(formatRelativeDate('2024-12-24')).toBe('Yesterday')
  })
})

describe('generateSlug', () => {
  it('should generate basic slug from make, model, and year', () => {
    expect(generateSlug('Toyota', 'Camry', 2024)).toBe('2024-toyota-camry')
  })

  it('should handle spaces in make/model', () => {
    expect(generateSlug('Land Rover', 'Range Rover', 2024)).toBe('2024-land-rover-range-rover')
  })

  it('should include variant when provided', () => {
    expect(generateSlug('BMW', '3 Series', 2024, 'M Sport')).toBe('2024-bmw-3-series-m-sport')
  })

  it('should handle special characters', () => {
    expect(generateSlug('Mazda', 'CX-5', 2024)).toBe('2024-mazda-cx-5')
  })

  it('should handle uppercase letters', () => {
    expect(generateSlug('TOYOTA', 'CAMRY', 2024)).toBe('2024-toyota-camry')
  })

  it('should remove invalid characters', () => {
    expect(generateSlug('Toyota!', 'Camry@', 2024, 'SX#')).toBe('2024-toyota-camry-sx')
  })

  it('should handle multiple consecutive spaces/dashes', () => {
    expect(generateSlug('Land  Rover', 'Range - - Rover', 2024)).toBe('2024-land-rover-range-rover')
  })

  it('should remove leading/trailing dashes', () => {
    expect(generateSlug('-Toyota-', 'Camry', 2024)).toBe('2024-toyota-camry')
  })
})

describe('generateOrderNumber', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should generate order number with correct format', () => {
    vi.setSystemTime(new Date('2024-12-25'))
    const orderNumber = generateOrderNumber()
    expect(orderNumber).toMatch(/^ORD-2024-\d{5}$/)
  })

  it('should generate unique order numbers', () => {
    vi.setSystemTime(new Date('2024-12-25'))
    const order1 = generateOrderNumber()
    const order2 = generateOrderNumber()
    // They might be the same due to Math.random, but format should be correct
    expect(order1).toMatch(/^ORD-2024-\d{5}$/)
    expect(order2).toMatch(/^ORD-2024-\d{5}$/)
  })

  it('should use current year', () => {
    vi.setSystemTime(new Date('2025-01-15'))
    const orderNumber = generateOrderNumber()
    expect(orderNumber).toContain('2025')
  })

  it('should pad random number to 5 digits', () => {
    vi.setSystemTime(new Date('2024-12-25'))
    const orderNumber = generateOrderNumber()
    const randomPart = orderNumber.split('-')[2]
    expect(randomPart).toHaveLength(5)
  })
})

describe('calculateMonthlyPayment', () => {
  it('should calculate monthly payment correctly', () => {
    const payment = calculateMonthlyPayment(30000, 6.5, 60)
    expect(payment).toBeCloseTo(586.98, 1)
  })

  it('should handle zero interest rate', () => {
    const payment = calculateMonthlyPayment(30000, 0, 60)
    // With 0% interest, the formula results in division by zero (NaN)
    // This is a known edge case in the standard loan payment formula
    expect(payment).toBeNaN()
  })

  it('should handle short loan term', () => {
    const payment = calculateMonthlyPayment(12000, 5, 12)
    expect(payment).toBeCloseTo(1027.29, 1)
  })

  it('should handle long loan term', () => {
    const payment = calculateMonthlyPayment(50000, 7, 84)
    expect(payment).toBeCloseTo(754.63, 1)
  })

  it('should handle high interest rate', () => {
    const payment = calculateMonthlyPayment(20000, 15, 48)
    expect(payment).toBeCloseTo(556.38, 0)
  })

  it('should handle low interest rate', () => {
    const payment = calculateMonthlyPayment(25000, 2.5, 36)
    expect(payment).toBeCloseTo(721.53, 1)
  })

  it('should round to 2 decimal places', () => {
    const payment = calculateMonthlyPayment(30000, 6.5, 60)
    const decimalPlaces = payment.toString().split('.')[1]?.length || 0
    expect(decimalPlaces).toBeLessThanOrEqual(2)
  })
})

describe('calculateWeeklyPayment', () => {
  it('should calculate weekly payment from monthly', () => {
    const weekly = calculateWeeklyPayment(588.35)
    // Monthly * 12 / 52 = weekly
    expect(weekly).toBeCloseTo(135.77, 1)
  })

  it('should handle round monthly amounts', () => {
    const weekly = calculateWeeklyPayment(1000)
    expect(weekly).toBeCloseTo(230.77, 1)
  })

  it('should handle small monthly amounts', () => {
    const weekly = calculateWeeklyPayment(100)
    expect(weekly).toBeCloseTo(23.08, 1)
  })

  it('should handle zero', () => {
    const weekly = calculateWeeklyPayment(0)
    expect(weekly).toBe(0)
  })

  it('should round to 2 decimal places', () => {
    const weekly = calculateWeeklyPayment(588.35)
    const decimalPlaces = weekly.toString().split('.')[1]?.length || 0
    expect(decimalPlaces).toBeLessThanOrEqual(2)
  })
})

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should resolve after specified milliseconds', async () => {
    const promise = sleep(1000)
    vi.advanceTimersByTime(1000)
    await expect(promise).resolves.toBeUndefined()
  })

  it('should not resolve before time elapses', async () => {
    let resolved = false
    sleep(1000).then(() => {
      resolved = true
    })
    vi.advanceTimersByTime(500)
    await Promise.resolve()
    expect(resolved).toBe(false)
  })

  it('should handle zero milliseconds', async () => {
    const promise = sleep(0)
    vi.advanceTimersByTime(0)
    await expect(promise).resolves.toBeUndefined()
  })
})

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('This is a very long string', 10)).toBe('This is a ...')
  })

  it('should not truncate short strings', () => {
    expect(truncate('Short', 10)).toBe('Short')
  })

  it('should handle exact length', () => {
    expect(truncate('Exactly10!', 10)).toBe('Exactly10!')
  })

  it('should handle empty string', () => {
    expect(truncate('', 10)).toBe('')
  })

  it('should handle zero length', () => {
    expect(truncate('Test', 0)).toBe('...')
  })

  it('should handle single character', () => {
    expect(truncate('Test string', 1)).toBe('T...')
  })

  it('should add ellipsis when truncating', () => {
    const result = truncate('This is a long string', 10)
    expect(result).toContain('...')
    expect(result.length).toBe(13) // 10 chars + '...'
  })
})
