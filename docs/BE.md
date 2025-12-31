# Backend Architecture - Cars Online

## Architecture Overview

**Approach**: Full-stack Next.js (Monolithic)

**Why This Architecture**:
- ✅ Single codebase (easier to maintain)
- ✅ Server Components for data fetching
- ✅ Server Actions for mutations
- ✅ API Routes for external integrations
- ✅ Edge runtime where applicable
- ✅ Free tier friendly (serverless)

---

## Backend Components

```
Backend Layer:
├── Server Components (Data Fetching)
├── Server Actions (Mutations)
├── API Routes (REST endpoints)
├── Middleware (Auth, CORS)
├── Database (Prisma + PostgreSQL)
└── File Storage (Cloudinary/Supabase)
```

---

## Database Layer

### Prisma Client Setup

**File**: `src/lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Why This Pattern**:
- Prevents multiple Prisma instances in development
- Hot reload safe
- Proper logging per environment

---

## Authentication

### NextAuth.js v5 (Auth.js) Setup

**File**: `src/lib/auth.ts`

```typescript
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'USER' | 'ADMIN'
      }
      return session
    }
  }
})
```

**API Route**: `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
```

**Type Extension**: `src/types/next-auth.d.ts`

```typescript
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'USER' | 'ADMIN'
    } & DefaultSession['user']
  }

  interface User {
    role: 'USER' | 'ADMIN'
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    role: 'USER' | 'ADMIN'
  }
}
```

---

## Server Actions

### 1. Car Actions

**File**: `src/actions/car-actions.ts`

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { carFormSchema } from '@/lib/validations'
import { z } from 'zod'

// Get all cars with filters
export async function getCars(params: {
  make?: string[]
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  bodyType?: string[]
  transmission?: string[]
  fuelType?: string[]
  maxMileage?: number
  search?: string
  status?: string
  page?: number
  limit?: number
  sortBy?: 'price' | 'year' | 'mileage' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}) {
  const {
    make,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    bodyType,
    transmission,
    fuelType,
    maxMileage,
    search,
    status = 'AVAILABLE',
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params

  const where = {
    status,
    ...(make && make.length > 0 && { make: { in: make } }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(minYear && { year: { gte: minYear } }),
    ...(maxYear && { year: { lte: maxYear } }),
    ...(bodyType && bodyType.length > 0 && { bodyType: { in: bodyType } }),
    ...(transmission && transmission.length > 0 && { transmission: { in: transmission } }),
    ...(fuelType && fuelType.length > 0 && { fuelType: { in: fuelType } }),
    ...(maxMileage && { mileage: { lte: maxMileage } }),
    ...(search && {
      OR: [
        { make: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { variant: { contains: search, mode: 'insensitive' } }
      ]
    })
  }

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where,
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        },
        _count: {
          select: { favorites: true }
        }
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.car.count({ where })
  ])

  return {
    cars,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}

// Get single car by slug
export async function getCarBySlug(slug: string) {
  const car = await prisma.car.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: 'asc' }
      },
      _count: {
        select: { favorites: true }
      }
    }
  })

  if (!car) {
    throw new Error('Car not found')
  }

  return car
}

// Create car (admin only)
export async function createCar(data: z.infer<typeof carFormSchema>) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const validated = carFormSchema.parse(data)

  // Generate slug
  const slug = `${validated.year}-${validated.make}-${validated.model}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  const car = await prisma.car.create({
    data: {
      ...validated,
      slug
    }
  })

  revalidatePath('/cars')
  revalidatePath('/admin/cars')

  return car
}

// Update car (admin only)
export async function updateCar(id: string, data: z.infer<typeof carFormSchema>) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const validated = carFormSchema.parse(data)

  const car = await prisma.car.update({
    where: { id },
    data: validated
  })

  revalidatePath(`/cars/${car.slug}`)
  revalidatePath('/cars')
  revalidatePath('/admin/cars')

  return car
}

// Delete car (admin only)
export async function deleteCar(id: string) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  await prisma.car.delete({
    where: { id }
  })

  revalidatePath('/cars')
  revalidatePath('/admin/cars')
}

// Get featured cars (homepage)
export async function getFeaturedCars(limit = 8) {
  return prisma.car.findMany({
    where: {
      status: 'AVAILABLE',
      featured: true
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  })
}

// Get similar cars
export async function getSimilarCars(carId: string, limit = 4) {
  const car = await prisma.car.findUnique({
    where: { id: carId },
    select: { make: true, price: true, bodyType: true }
  })

  if (!car) return []

  return prisma.car.findMany({
    where: {
      id: { not: carId },
      status: 'AVAILABLE',
      OR: [
        { make: car.make },
        {
          price: {
            gte: car.price * 0.8,
            lte: car.price * 1.2
          }
        },
        { bodyType: car.bodyType }
      ]
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1
      }
    },
    take: limit
  })
}

// Get available makes (for filters)
export async function getAvailableMakes() {
  const makes = await prisma.car.groupBy({
    by: ['make'],
    where: { status: 'AVAILABLE' },
    _count: { make: true }
  })

  return makes.map(m => ({
    make: m.make,
    count: m._count.make
  }))
}

// Increment view count
export async function incrementViewCount(carId: string) {
  await prisma.car.update({
    where: { id: carId },
    data: { viewCount: { increment: 1 } }
  })
}
```

---

### 2. Favorite Actions

**File**: `src/actions/favorite-actions.ts`

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Toggle favorite
export async function toggleFavorite(carId: string) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  // Check if already favorited
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_carId: { userId, carId }
    }
  })

  if (existing) {
    // Remove favorite
    await prisma.favorite.delete({
      where: { id: existing.id }
    })

    revalidatePath('/dashboard/favorites')
    revalidatePath(`/cars/${carId}`)

    return { favorited: false }
  } else {
    // Add favorite
    await prisma.favorite.create({
      data: { userId, carId }
    })

    revalidatePath('/dashboard/favorites')
    revalidatePath(`/cars/${carId}`)

    return { favorited: true }
  }
}

// Get user favorites
export async function getUserFavorites() {
  const session = await auth()

  if (!session?.user) {
    return []
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      car: {
        include: {
          images: {
            where: { isPrimary: true },
            take: 1
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return favorites.map(f => f.car)
}

// Get favorite IDs (for quick lookup)
export async function getFavoriteIds() {
  const session = await auth()

  if (!session?.user) {
    return []
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { carId: true }
  })

  return favorites.map(f => f.carId)
}
```

---

### 3. Reservation Actions

**File**: `src/actions/reservation-actions.ts`

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { checkoutDetailsSchema } from '@/lib/validations'
import { z } from 'zod'

// Generate order number
function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 99999).toString().padStart(5, '0')
  return `ORD-${year}-${random}`
}

// Create reservation
export async function createReservation(data: {
  carId: string
  customerDetails: z.infer<typeof checkoutDetailsSchema>
  financeOption: {
    paymentMethod: 'FULL_PAYMENT' | 'FINANCE'
    deposit?: number
    loanTerm?: number
    tradeInValue?: number
  }
  mockPayment: {
    cardLast4: string
  }
}) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const { carId, customerDetails, financeOption, mockPayment } = data

  // Validate car is available
  const car = await prisma.car.findUnique({
    where: { id: carId }
  })

  if (!car || car.status !== 'AVAILABLE') {
    throw new Error('Car is not available')
  }

  // Calculate total
  const carPrice = Number(car.price)
  const deposit = financeOption.deposit || 0
  const tradeInValue = financeOption.tradeInValue || 0
  const totalAmount = financeOption.paymentMethod === 'FULL_PAYMENT'
    ? carPrice - tradeInValue
    : deposit

  // Create reservation in transaction
  const reservation = await prisma.$transaction(async (tx) => {
    // Update car status
    await tx.car.update({
      where: { id: carId },
      data: { status: 'RESERVED' }
    })

    // Create reservation
    return tx.reservation.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        carId,

        // Customer info
        customerName: customerDetails.fullName,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,

        // Address
        streetAddress: customerDetails.streetAddress,
        suburb: customerDetails.suburb,
        state: customerDetails.state,
        postcode: customerDetails.postcode,

        // Finance
        paymentMethod: financeOption.paymentMethod,
        carPrice,
        deposit: financeOption.deposit,
        loanTerm: financeOption.loanTerm,
        tradeInValue: financeOption.tradeInValue,
        totalAmount,

        // Trade-in
        tradeInMake: customerDetails.tradeInMake,
        tradeInModel: customerDetails.tradeInModel,
        tradeInYear: customerDetails.tradeInYear,
        tradeInMileage: customerDetails.tradeInMileage,

        // Other
        preferredInspectionDate: customerDetails.preferredInspectionDate,
        cardLast4: mockPayment.cardLast4,

        status: 'PENDING'
      }
    })
  })

  revalidatePath('/dashboard/reservations')
  revalidatePath('/admin/reservations')
  revalidatePath(`/cars/${car.slug}`)

  return reservation
}

// Get user reservations
export async function getUserReservations() {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  return prisma.reservation.findMany({
    where: { userId: session.user.id },
    include: {
      car: {
        include: {
          images: {
            where: { isPrimary: true },
            take: 1
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

// Get reservation by ID
export async function getReservation(id: string) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: {
      car: {
        include: {
          images: true
        }
      }
    }
  })

  if (!reservation) {
    throw new Error('Reservation not found')
  }

  // Check ownership (or admin)
  if (reservation.userId !== session.user.id && session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  return reservation
}

// Cancel reservation
export async function cancelReservation(id: string) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id }
  })

  if (!reservation) {
    throw new Error('Reservation not found')
  }

  // Check ownership
  if (reservation.userId !== session.user.id && session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  // Update in transaction
  await prisma.$transaction(async (tx) => {
    // Update reservation status
    await tx.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' }
    })

    // Update car status back to available
    await tx.car.update({
      where: { id: reservation.carId },
      data: { status: 'AVAILABLE' }
    })
  })

  revalidatePath('/dashboard/reservations')
  revalidatePath('/admin/reservations')
}

// Update reservation status (admin only)
export async function updateReservationStatus(
  id: string,
  status: 'PENDING' | 'CONFIRMED' | 'INSPECTION_SCHEDULED' | 'COMPLETED' | 'CANCELLED',
  adminNotes?: string
) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  await prisma.reservation.update({
    where: { id },
    data: {
      status,
      ...(adminNotes && { adminNotes })
    }
  })

  revalidatePath('/admin/reservations')
}

// Get all reservations (admin only)
export async function getAllReservations(filters?: {
  status?: string
  search?: string
  page?: number
  limit?: number
}) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const { status, search, page = 1, limit = 20 } = filters || {}

  const where = {
    ...(status && { status }),
    ...(search && {
      OR: [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } }
      ]
    })
  }

  const [reservations, total] = await Promise.all([
    prisma.reservation.findMany({
      where,
      include: {
        car: {
          select: {
            make: true,
            model: true,
            year: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.reservation.count({ where })
  ])

  return {
    reservations,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}
```

---

### 4. Inquiry Actions

**File**: `src/actions/inquiry-actions.ts`

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { inquirySchema } from '@/lib/validations'
import { z } from 'zod'

// Create inquiry
export async function createInquiry(data: z.infer<typeof inquirySchema>) {
  const session = await auth()

  const validated = inquirySchema.parse(data)

  // Estimate value for sell car inquiries
  let estimatedValue: number | null = null
  if (validated.type === 'SELL_CAR' && validated.sellCarYear) {
    // Simple mock valuation (in production, use external API)
    const age = new Date().getFullYear() - validated.sellCarYear
    const baseValue = 30000
    const depreciation = age * 2000
    estimatedValue = Math.max(baseValue - depreciation, 5000)
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      ...validated,
      userId: session?.user?.id,
      estimatedValue,
      status: 'NEW'
    }
  })

  revalidatePath('/admin/inquiries')

  return inquiry
}

// Get all inquiries (admin only)
export async function getAllInquiries(filters?: {
  type?: string
  status?: string
  page?: number
  limit?: number
}) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  const { type, status, page = 1, limit = 20 } = filters || {}

  const where = {
    ...(type && { type }),
    ...(status && { status })
  }

  const [inquiries, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.inquiry.count({ where })
  ])

  return {
    inquiries,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}

// Update inquiry status (admin only)
export async function updateInquiryStatus(
  id: string,
  status: 'NEW' | 'CONTACTED' | 'RESOLVED' | 'CLOSED',
  adminNotes?: string
) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  await prisma.inquiry.update({
    where: { id },
    data: {
      status,
      ...(adminNotes && { adminNotes })
    }
  })

  revalidatePath('/admin/inquiries')
}
```

---

## API Routes

### 1. Image Upload API

**File**: `src/app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'cars-online',
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        .end(buffer)
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
```

---

### 2. Analytics API (Admin)

**File**: `src/app/api/analytics/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Aggregate stats
    const [
      totalCars,
      availableCars,
      reservedCars,
      soldCars,
      activeReservations,
      totalUsers,
      recentReservations
    ] = await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { status: 'AVAILABLE' } }),
      prisma.car.count({ where: { status: 'RESERVED' } }),
      prisma.car.count({ where: { status: 'SOLD' } }),
      prisma.reservation.count({ where: { status: { in: ['PENDING', 'CONFIRMED'] } } }),
      prisma.user.count(),
      prisma.reservation.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          car: { select: { make: true, model: true, year: true } },
          user: { select: { name: true } }
        }
      })
    ])

    // Reservations by month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const reservationsByMonth = await prisma.reservation.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: sixMonthsAgo }
      },
      _count: { id: true }
    })

    // Top selling makes
    const topMakes = await prisma.car.groupBy({
      by: ['make'],
      where: { status: 'SOLD' },
      _count: { make: true },
      orderBy: { _count: { make: 'desc' } },
      take: 5
    })

    return NextResponse.json({
      stats: {
        totalCars,
        availableCars,
        reservedCars,
        soldCars,
        activeReservations,
        totalUsers
      },
      recentReservations,
      reservationsByMonth,
      topMakes
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
```

---

## Middleware

**File**: `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await auth()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Protect checkout routes
  if (request.nextUrl.pathname.startsWith('/checkout')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/checkout/:path*']
}
```

---

## Data Caching Strategy

### Next.js Cache Patterns

**1. Page-level caching**:
```typescript
// app/cars/page.tsx
export const revalidate = 300 // Revalidate every 5 minutes

export default async function CarsPage() {
  const cars = await getCars({ status: 'AVAILABLE' })
  return <CarGrid cars={cars} />
}
```

**2. Component-level caching**:
```typescript
import { unstable_cache } from 'next/cache'

export const getFeaturedCars = unstable_cache(
  async () => {
    return prisma.car.findMany({
      where: { featured: true, status: 'AVAILABLE' },
      take: 8
    })
  },
  ['featured-cars'],
  { revalidate: 600, tags: ['cars'] }
)
```

**3. On-demand revalidation**:
```typescript
import { revalidateTag } from 'next/cache'

export async function createCar(data) {
  // ... create car
  revalidateTag('cars')
}
```

---

## Rate Limiting

**File**: `src/lib/rate-limit.ts`

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create rate limiter (only if Upstash configured)
export const ratelimit = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true
    })
  : null

// Usage in API routes
export async function checkRateLimit(identifier: string) {
  if (!ratelimit) return { success: true }

  const { success, limit, reset, remaining } = await ratelimit.limit(identifier)

  return { success, limit, reset, remaining }
}
```

**Usage**:
```typescript
// API route
export async function POST(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const { success } = await checkRateLimit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  // ... handle request
}
```

---

## Error Handling

### Custom Error Classes

**File**: `src/lib/errors.ts`

```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404, 'NOT_FOUND')
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400, 'VALIDATION_ERROR')
  }
}
```

### Error Handler Utility

```typescript
// lib/error-handler.ts
import { NextResponse } from 'next/server'
import { AppError } from './errors'
import { ZodError } from 'zod'

export function handleError(error: unknown) {
  console.error('Error:', error)

  // Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.errors
      },
      { status: 400 }
    )
  }

  // Custom app errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code
      },
      { status: error.statusCode }
    )
  }

  // Prisma errors
  if (error?.constructor?.name === 'PrismaClientKnownRequestError') {
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    )
  }

  // Generic error
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
```

---

## Email Service (Optional)

**File**: `src/lib/email.ts`

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReservationConfirmation(data: {
  to: string
  orderNumber: string
  carName: string
  totalAmount: number
}) {
  try {
    await resend.emails.send({
      from: 'Cars Online <noreply@cars-online.com>',
      to: data.to,
      subject: `Reservation Confirmed - ${data.orderNumber}`,
      html: `
        <h1>Reservation Confirmed!</h1>
        <p>Thank you for your reservation.</p>
        <p><strong>Order Number:</strong> ${data.orderNumber}</p>
        <p><strong>Car:</strong> ${data.carName}</p>
        <p><strong>Total:</strong> $${data.totalAmount.toLocaleString()}</p>
        <p>We'll contact you within 24 hours to schedule your inspection.</p>
      `
    })
  } catch (error) {
    console.error('Email error:', error)
    // Don't throw - email failures shouldn't break the flow
  }
}

export async function sendAdminNotification(type: string, data: any) {
  try {
    await resend.emails.send({
      from: 'Cars Online <noreply@cars-online.com>',
      to: 'admin@cars-online.com',
      subject: `New ${type}`,
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
    })
  } catch (error) {
    console.error('Email error:', error)
  }
}
```

---

## Background Jobs (Optional)

### Using Vercel Cron Jobs

**File**: `src/app/api/cron/cleanup/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Run daily to clean up expired reservations
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find pending reservations older than 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const expiredReservations = await prisma.reservation.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lt: sevenDaysAgo }
      }
    })

    // Cancel them and free up cars
    for (const reservation of expiredReservations) {
      await prisma.$transaction([
        prisma.reservation.update({
          where: { id: reservation.id },
          data: { status: 'CANCELLED' }
        }),
        prisma.car.update({
          where: { id: reservation.carId },
          data: { status: 'AVAILABLE' }
        })
      ])
    }

    return NextResponse.json({
      success: true,
      cleaned: expiredReservations.length
    })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
  }
}
```

**Vercel Config**: `vercel.json`
```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 0 * * *"
    }
  ]
}
```

---

## Security Best Practices

### 1. Input Validation
```typescript
// Always validate with Zod before DB operations
const validated = schema.parse(data)
```

### 2. SQL Injection Prevention
```typescript
// Prisma automatically prevents SQL injection
// Never use raw queries unless absolutely necessary
```

### 3. XSS Prevention
```typescript
// Sanitize user input for display
import DOMPurify from 'isomorphic-dompurify'
const clean = DOMPurify.sanitize(userInput)
```

### 4. CSRF Protection
```typescript
// NextAuth handles CSRF tokens automatically
// For custom forms, use next-csrf
```

### 5. Environment Variables
```typescript
// Never expose secrets to client
// Use NEXT_PUBLIC_ prefix only for public vars
```

---

## Testing

### Unit Tests (Server Actions)

```typescript
// __tests__/actions/car-actions.test.ts
import { describe, it, expect, vi } from 'vitest'
import { getCars } from '@/actions/car-actions'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    car: {
      findMany: vi.fn(),
      count: vi.fn()
    }
  }
}))

describe('getCars', () => {
  it('returns cars with pagination', async () => {
    const mockCars = [{ id: '1', make: 'Toyota' }]

    vi.mocked(prisma.car.findMany).mockResolvedValue(mockCars)
    vi.mocked(prisma.car.count).mockResolvedValue(1)

    const result = await getCars({ page: 1, limit: 20 })

    expect(result.cars).toEqual(mockCars)
    expect(result.pagination.total).toBe(1)
  })
})
```

### Integration Tests (API Routes)

```typescript
// __tests__/api/upload.test.ts
import { POST } from '@/app/api/upload/route'
import { auth } from '@/lib/auth'

vi.mock('@/lib/auth')

describe('POST /api/upload', () => {
  it('rejects unauthorized users', async () => {
    vi.mocked(auth).mockResolvedValue(null)

    const formData = new FormData()
    const request = new Request('http://localhost/api/upload', {
      method: 'POST',
      body: formData
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
  })
})
```

---

## Conclusion

This backend architecture provides:
- ✅ Modern Next.js 15 patterns (Server Actions + API Routes)
- ✅ Type-safe with Prisma
- ✅ Secure authentication
- ✅ Proper authorization (RBAC)
- ✅ Input validation
- ✅ Error handling
- ✅ Caching strategy
- ✅ Rate limiting
- ✅ Scalable structure
- ✅ Production-ready
