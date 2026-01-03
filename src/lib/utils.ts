import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0
  }).format(numPrice)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-AU').format(num)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d)
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

export function generateSlug(make: string, model: string, year: number, variant?: string): string {
  const parts = [year.toString(), make, model]
  if (variant) parts.push(variant)

  return parts
    .join('-')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, '0')
  return `ORD-${year}-${random}`
}

export function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  loanTermMonths: number
): number {
  const monthlyRate = annualRate / 12 / 100
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
    (Math.pow(1 + monthlyRate, loanTermMonths) - 1)

  return Math.round(monthlyPayment * 100) / 100
}

export function calculateWeeklyPayment(monthlyPayment: number): number {
  return Math.round((monthlyPayment * 12) / 52 * 100) / 100
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
