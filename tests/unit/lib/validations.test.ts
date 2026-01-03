import { describe, it, expect } from 'vitest'
import {
  signInSchema,
  signUpSchema,
  carFormSchema,
  checkoutDetailsSchema,
  checkoutFinanceSchema,
  checkoutPaymentSchema,
  inquirySchema,
  sellCarSchema,
  contactSchema,
  profileSchema,
  passwordSchema,
} from '@/lib/validations'

describe('signInSchema', () => {
  it('should validate correct sign in data', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = signInSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid email')
    }
  })

  it('should reject password shorter than 6 characters', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
      password: '12345',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 6 characters')
    }
  })

  it('should reject missing email', () => {
    const result = signInSchema.safeParse({
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('should reject missing password', () => {
    const result = signInSchema.safeParse({
      email: 'test@example.com',
    })
    expect(result.success).toBe(false)
  })
})

describe('signUpSchema', () => {
  it('should validate correct sign up data', () => {
    const result = signUpSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('should reject name shorter than 2 characters', () => {
    const result = signUpSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('should reject password shorter than 8 characters', () => {
    const result = signUpSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass123',
      confirmPassword: 'pass123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 8 characters')
    }
  })

  it('should reject mismatched passwords', () => {
    const result = signUpSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'different123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("don't match")
    }
  })

  it('should reject invalid email format', () => {
    const result = signUpSchema.safeParse({
      name: 'John Doe',
      email: 'not-an-email',
      password: 'password123',
      confirmPassword: 'password123',
    })
    expect(result.success).toBe(false)
  })
})

describe('carFormSchema', () => {
  const validCarData = {
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 50000,
    status: 'AVAILABLE' as const,
    bodyType: 'Sedan',
    transmission: 'Automatic' as const,
    fuelType: 'Petrol' as const,
    mileage: 0,
    color: 'White',
    location: 'Sydney',
  }

  it('should validate correct car data', () => {
    const result = carFormSchema.safeParse(validCarData)
    expect(result.success).toBe(true)
  })

  it('should reject price below minimum', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      price: 500,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least $1,000')
    }
  })

  it('should reject price above maximum', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      price: 600000,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('cannot exceed $500,000')
    }
  })

  it('should reject negative mileage', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      mileage: -100,
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid VIN length', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      vin: 'SHORT',
    })
    expect(result.success).toBe(false)
  })

  it('should accept valid 17-character VIN', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      vin: '1HGBH41JXMN109186',
    })
    expect(result.success).toBe(true)
  })

  it('should accept empty VIN', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      vin: '',
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid transmission type', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      transmission: 'CVT',
    })
    expect(result.success).toBe(false)
  })

  it('should accept all valid fuel types', () => {
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'] as const
    fuelTypes.forEach((fuelType) => {
      const result = carFormSchema.safeParse({
        ...validCarData,
        fuelType,
      })
      expect(result.success).toBe(true)
    })
  })

  it('should reject description longer than 2000 characters', () => {
    const result = carFormSchema.safeParse({
      ...validCarData,
      description: 'a'.repeat(2001),
    })
    expect(result.success).toBe(false)
  })

  it('should accept optional fields as undefined', () => {
    const result = carFormSchema.safeParse(validCarData)
    expect(result.success).toBe(true)
  })
})

describe('checkoutDetailsSchema', () => {
  const validCheckoutData = {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '0412345678',
    streetAddress: '123 Main Street',
    suburb: 'Sydney',
    state: 'NSW' as const,
    postcode: '2000',
    preferredInspectionDate: new Date(Date.now() + 86400000), // Tomorrow
  }

  it('should validate correct checkout data', () => {
    const result = checkoutDetailsSchema.safeParse(validCheckoutData)
    expect(result.success).toBe(true)
  })

  it('should reject invalid Australian phone number', () => {
    const invalidPhones = ['1234567890', '555-1234', '12345']
    invalidPhones.forEach((phone) => {
      const result = checkoutDetailsSchema.safeParse({
        ...validCheckoutData,
        phone,
      })
      expect(result.success).toBe(false)
    })
  })

  it('should accept valid Australian phone formats', () => {
    const validPhones = ['0412345678', '0212345678', '+61412345678']
    validPhones.forEach((phone) => {
      const result = checkoutDetailsSchema.safeParse({
        ...validCheckoutData,
        phone,
      })
      expect(result.success).toBe(true)
    })
  })

  it('should reject invalid postcode', () => {
    const invalidPostcodes = ['123', '12345', 'ABCD', '20 00']
    invalidPostcodes.forEach((postcode) => {
      const result = checkoutDetailsSchema.safeParse({
        ...validCheckoutData,
        postcode,
      })
      expect(result.success).toBe(false)
    })
  })

  it('should accept valid 4-digit postcode', () => {
    const result = checkoutDetailsSchema.safeParse({
      ...validCheckoutData,
      postcode: '3000',
    })
    expect(result.success).toBe(true)
  })

  it('should reject past inspection date', () => {
    const result = checkoutDetailsSchema.safeParse({
      ...validCheckoutData,
      preferredInspectionDate: new Date(Date.now() - 86400000), // Yesterday
    })
    expect(result.success).toBe(false)
  })

  it('should accept trade-in details when hasTradeIn is true', () => {
    const result = checkoutDetailsSchema.safeParse({
      ...validCheckoutData,
      hasTradeIn: true,
      tradeInMake: 'Honda',
      tradeInModel: 'Civic',
      tradeInYear: 2018,
      tradeInMileage: 50000,
    })
    expect(result.success).toBe(true)
  })
})

describe('checkoutFinanceSchema', () => {
  it('should validate full payment method', () => {
    const result = checkoutFinanceSchema.safeParse({
      paymentMethod: 'FULL_PAYMENT',
    })
    expect(result.success).toBe(true)
  })

  it('should validate finance method with details', () => {
    const result = checkoutFinanceSchema.safeParse({
      paymentMethod: 'FINANCE',
      deposit: 10000,
      loanTerm: 60,
    })
    expect(result.success).toBe(true)
  })

  it('should reject negative deposit', () => {
    const result = checkoutFinanceSchema.safeParse({
      paymentMethod: 'FINANCE',
      deposit: -5000,
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid payment method', () => {
    const result = checkoutFinanceSchema.safeParse({
      paymentMethod: 'CREDIT_CARD',
    })
    expect(result.success).toBe(false)
  })
})

describe('checkoutPaymentSchema', () => {
  const validPaymentData = {
    cardNumber: '4532015112830366',
    cardExpiry: '12/25',
    cardCvc: '123',
    cardName: 'John Doe',
    billingAddress: {
      streetAddress: '123 Main St',
      suburb: 'Sydney',
      state: 'NSW' as const,
      postcode: '2000',
    },
    agreeToTerms: true,
    agreeToReturnPolicy: true,
  }

  it('should validate correct payment data', () => {
    const result = checkoutPaymentSchema.safeParse(validPaymentData)
    expect(result.success).toBe(true)
  })

  it('should reject invalid card expiry format', () => {
    const invalidFormats = ['12/2025', '13/25', '00/25', '1/25', '12-25']
    invalidFormats.forEach((cardExpiry) => {
      const result = checkoutPaymentSchema.safeParse({
        ...validPaymentData,
        cardExpiry,
      })
      expect(result.success).toBe(false)
    })
  })

  it('should accept valid card expiry formats', () => {
    const validFormats = ['01/25', '12/99', '06/30']
    validFormats.forEach((cardExpiry) => {
      const result = checkoutPaymentSchema.safeParse({
        ...validPaymentData,
        cardExpiry,
      })
      expect(result.success).toBe(true)
    })
  })

  it('should reject invalid CVC', () => {
    const invalidCvcs = ['12', '12345', 'ABC', '12a']
    invalidCvcs.forEach((cardCvc) => {
      const result = checkoutPaymentSchema.safeParse({
        ...validPaymentData,
        cardCvc,
      })
      expect(result.success).toBe(false)
    })
  })

  it('should accept 3 or 4 digit CVC', () => {
    const result1 = checkoutPaymentSchema.safeParse({
      ...validPaymentData,
      cardCvc: '123',
    })
    const result2 = checkoutPaymentSchema.safeParse({
      ...validPaymentData,
      cardCvc: '1234',
    })
    expect(result1.success).toBe(true)
    expect(result2.success).toBe(true)
  })

  it('should require terms agreement', () => {
    const result = checkoutPaymentSchema.safeParse({
      ...validPaymentData,
      agreeToTerms: false,
    })
    expect(result.success).toBe(false)
  })

  it('should require return policy agreement', () => {
    const result = checkoutPaymentSchema.safeParse({
      ...validPaymentData,
      agreeToReturnPolicy: false,
    })
    expect(result.success).toBe(false)
  })
})

describe('inquirySchema', () => {
  const validInquiry = {
    name: 'John Doe',
    email: 'john@example.com',
    type: 'GENERAL' as const,
  }

  it('should validate correct inquiry data', () => {
    const result = inquirySchema.safeParse(validInquiry)
    expect(result.success).toBe(true)
  })

  it('should accept all inquiry types', () => {
    const types = ['GENERAL', 'TEST_DRIVE', 'SELL_CAR', 'FINANCE'] as const
    types.forEach((type) => {
      const result = inquirySchema.safeParse({
        ...validInquiry,
        type,
      })
      expect(result.success).toBe(true)
    })
  })

  it('should accept optional phone number', () => {
    const result = inquirySchema.safeParse({
      ...validInquiry,
      phone: '0412345678',
    })
    expect(result.success).toBe(true)
  })

  it('should reject short message', () => {
    const result = inquirySchema.safeParse({
      ...validInquiry,
      message: 'Short',
    })
    expect(result.success).toBe(false)
  })

  it('should accept sell car details', () => {
    const result = inquirySchema.safeParse({
      ...validInquiry,
      type: 'SELL_CAR',
      sellCarMake: 'Honda',
      sellCarModel: 'Civic',
      sellCarYear: 2018,
      sellCarMileage: 50000,
    })
    expect(result.success).toBe(true)
  })
})

describe('sellCarSchema', () => {
  const validSellCar = {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '0412345678',
  }

  it('should validate correct sell car data', () => {
    const result = sellCarSchema.safeParse(validSellCar)
    expect(result.success).toBe(true)
  })

  it('should reject invalid VIN length', () => {
    const result = sellCarSchema.safeParse({
      ...validSellCar,
      vin: 'SHORT',
    })
    expect(result.success).toBe(false)
  })

  it('should accept valid 17-character VIN', () => {
    const result = sellCarSchema.safeParse({
      ...validSellCar,
      vin: '1HGBH41JXMN109186',
    })
    expect(result.success).toBe(true)
  })

  it('should accept empty VIN', () => {
    const result = sellCarSchema.safeParse({
      ...validSellCar,
      vin: '',
    })
    expect(result.success).toBe(true)
  })

  it('should reject long additional info', () => {
    const result = sellCarSchema.safeParse({
      ...validSellCar,
      additionalInfo: 'a'.repeat(1001),
    })
    expect(result.success).toBe(false)
  })

  it('should reject invalid phone format', () => {
    const result = sellCarSchema.safeParse({
      ...validSellCar,
      phone: '123456',
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema', () => {
  const validContact = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Question about services',
    message: 'I have a question about your services.',
  }

  it('should validate correct contact data', () => {
    const result = contactSchema.safeParse(validContact)
    expect(result.success).toBe(true)
  })

  it('should reject short subject', () => {
    const result = contactSchema.safeParse({
      ...validContact,
      subject: 'Hi',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short message', () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: 'Short',
    })
    expect(result.success).toBe(false)
  })

  it('should reject long message', () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: 'a'.repeat(1001),
    })
    expect(result.success).toBe(false)
  })
})

describe('profileSchema', () => {
  it('should validate correct profile data', () => {
    const result = profileSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
    })
    expect(result.success).toBe(true)
  })

  it('should accept optional phone', () => {
    const result = profileSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '0412345678',
    })
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const result = profileSchema.safeParse({
      name: 'John Doe',
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short name', () => {
    const result = profileSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
    })
    expect(result.success).toBe(false)
  })
})

describe('passwordSchema', () => {
  it('should validate correct password change data', () => {
    const result = passwordSchema.safeParse({
      currentPassword: 'oldpass123',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123',
    })
    expect(result.success).toBe(true)
  })

  it('should reject mismatched new passwords', () => {
    const result = passwordSchema.safeParse({
      currentPassword: 'oldpass123',
      newPassword: 'newpass123',
      confirmPassword: 'different123',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short current password', () => {
    const result = passwordSchema.safeParse({
      currentPassword: '12345',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123',
    })
    expect(result.success).toBe(false)
  })

  it('should reject short new password', () => {
    const result = passwordSchema.safeParse({
      currentPassword: 'oldpass123',
      newPassword: 'short',
      confirmPassword: 'short',
    })
    expect(result.success).toBe(false)
  })
})
