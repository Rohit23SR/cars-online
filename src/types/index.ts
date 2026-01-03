import { Car, CarImage, User, Reservation, Inquiry, Favorite } from '@prisma/client'

// Car types
export type CarWithImages = Car & {
  images: CarImage[]
}

export type CarWithPrimaryImage = Car & {
  images: CarImage[]
}

export type CarCardType = {
  id: string
  slug: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  transmission: string
  fuelType: string
  bodyType: string
  status: Car['status']
  images: { url: string; altText?: string | null }[]
  _count?: {
    favorites: number
  }
}

// Reservation types
export type ReservationWithCar = Reservation & {
  car: CarWithImages
}

export type ReservationWithDetails = Reservation & {
  car: {
    make: string
    model: string
    year: number
  }
  user: {
    name: string | null
    email: string
  }
}

// User types
export type SafeUser = Omit<User, 'hashedPassword'>

// Inquiry types
export type InquiryWithUser = Inquiry & {
  user: {
    name: string | null
    email: string
  } | null
}

// Filter types
export type CarFilters = {
  search?: string
  make?: string[]
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  bodyType?: string[]
  transmission?: string[]
  fuelType?: string[]
  maxMileage?: number
  status?: string
  page?: number
  limit?: number
  sortBy?: 'price' | 'year' | 'mileage' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

// Pagination types
export type PaginationResult<T> = {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Checkout types
export type CheckoutData = {
  carId: string
  customerDetails: {
    fullName: string
    email: string
    phone: string
    streetAddress: string
    suburb: string
    state: string
    postcode: string
    hasTradeIn: boolean
    tradeInMake?: string
    tradeInModel?: string
    tradeInYear?: number
    tradeInMileage?: number
    tradeInCondition?: string
    preferredInspectionDate: Date
  }
  financeOption: {
    paymentMethod: 'FULL_PAYMENT' | 'FINANCE'
    deposit?: number
    loanTerm?: number
    tradeInValue?: number
  }
  mockPayment: {
    cardLast4: string
  }
}

// Finance calculator types
export type FinanceCalculation = {
  loanAmount: number
  deposit: number
  loanTerm: number
  interestRate: number
  monthlyPayment: number
  weeklyPayment: number
  totalPayable: number
  totalInterest: number
}

// API Response types
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form state types
export type FormState = 'idle' | 'loading' | 'success' | 'error'
