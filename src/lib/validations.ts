import * as z from 'zod'
import { AUSTRALIAN_STATES, MIN_YEAR, MAX_YEAR } from './constants'

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// Car form schema (admin)
export const carFormSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(MIN_YEAR).max(MAX_YEAR),
  variant: z.string().optional(),
  vin: z.string().length(17).optional().or(z.literal('')),
  price: z.number().min(1000, 'Price must be at least $1,000').max(500000, 'Price cannot exceed $500,000'),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'DRAFT']),
  featured: z.boolean().default(false),

  // Specifications
  bodyType: z.string().min(1, 'Body type is required'),
  transmission: z.enum(['Automatic', 'Manual']),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
  engineSize: z.string().optional(),
  mileage: z.number().min(0, 'Mileage cannot be negative'),
  color: z.string().min(1, 'Color is required'),
  doors: z.number().min(2).max(5).optional(),
  seats: z.number().min(2).max(9).optional(),

  // Performance
  power: z.string().optional(),
  torque: z.string().optional(),
  fuelEconomy: z.string().optional(),

  // Location
  location: z.string().min(1, 'Location is required'),
  registration: z.string().optional(),

  // Description
  description: z.string().max(2000, 'Description cannot exceed 2000 characters').optional(),

  // Features
  features: z.array(z.string()).optional(),

  // Inspection
  inspectionDate: z.date().optional(),
  inspectionNotes: z.string().optional()
})

// Checkout schemas
export const checkoutDetailsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/, 'Must be a valid Australian phone number'),

  // Delivery Address
  streetAddress: z.string().min(5, 'Street address is required'),
  suburb: z.string().min(2, 'Suburb is required'),
  state: z.enum(AUSTRALIAN_STATES),
  postcode: z.string().regex(/^[0-9]{4}$/, 'Postcode must be 4 digits'),

  // Trade-in (optional)
  hasTradeIn: z.boolean().default(false),
  tradeInMake: z.string().optional(),
  tradeInModel: z.string().optional(),
  tradeInYear: z.number().min(MIN_YEAR).max(MAX_YEAR).optional(),
  tradeInMileage: z.number().min(0).optional(),
  tradeInCondition: z.string().optional(),

  // Inspection
  preferredInspectionDate: z.date().min(new Date(), 'Inspection date must be in the future')
})

export const checkoutFinanceSchema = z.object({
  paymentMethod: z.enum(['FULL_PAYMENT', 'FINANCE']),
  deposit: z.number().min(0).optional(),
  loanTerm: z.number().optional()
})

export const checkoutPaymentSchema = z.object({
  cardNumber: z.string().min(13).max(19),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Must be in MM/YY format'),
  cardCvc: z.string().regex(/^[0-9]{3,4}$/, 'Must be 3 or 4 digits'),
  cardName: z.string().min(2),
  billingAddress: z.object({
    streetAddress: z.string().min(5),
    suburb: z.string().min(2),
    state: z.enum(AUSTRALIAN_STATES),
    postcode: z.string().regex(/^[0-9]{4}$/)
  }),
  sameAsDelivery: z.boolean().default(true),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions'
  }),
  agreeToReturnPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the return policy'
  })
})

// Inquiry schemas
export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/).optional(),
  type: z.enum(['GENERAL', 'TEST_DRIVE', 'SELL_CAR', 'FINANCE']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000).optional(),

  // For sell car inquiries
  sellCarMake: z.string().optional(),
  sellCarModel: z.string().optional(),
  sellCarYear: z.number().min(MIN_YEAR).max(MAX_YEAR).optional(),
  sellCarMileage: z.number().min(0).optional(),

  // Related car (for test drives)
  carId: z.string().optional()
})

// Sell car form schema
export const sellCarSchema = z.object({
  // Car Details (required)
  make: z.string().min(1, 'Please select a make'),
  model: z.string().min(1, 'Model is required'),
  year: z.string().min(4, 'Please select a year'),

  // Car Details (optional)
  variant: z.string().optional(),
  mileage: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  color: z.string().optional(),
  vin: z.string().length(17, 'VIN must be exactly 17 characters').optional().or(z.literal('')),
  registration: z.string().optional(),

  // Owner Details (required)
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/, 'Must be a valid Australian phone number (e.g., 0412 345 678)'),

  // Owner Details (optional)
  state: z.string().optional(),

  // Additional Info (optional)
  condition: z.string().optional(),
  serviceHistory: z.string().optional(),
  additionalInfo: z.string().max(1000, 'Additional information cannot exceed 1000 characters').optional()
})

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000)
})

// Profile settings schema
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/).optional()
})

// Password change schema
export const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})
