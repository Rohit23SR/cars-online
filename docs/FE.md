# Frontend Architecture - Cars Online

## Tech Stack

```
Framework:     Next.js 15 (App Router)
Language:      TypeScript 5.3+
Styling:       Tailwind CSS 3.4
Components:    Shadcn/ui
Icons:         Lucide React
Forms:         React Hook Form + Zod
State:         Zustand (client) + React Context
Animation:     Framer Motion
Charts:        Recharts
Image Upload:  react-dropzone
Date Picker:   react-day-picker
Rich Text:     Tiptap (admin)
Utilities:     clsx, tailwind-merge
```

---

## Project Structure

```
cars-online/
├── src/
│   ├── app/                          # App Router pages
│   │   ├── (auth)/                   # Auth group
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Auth layout
│   │   │
│   │   ├── (main)/                   # Public pages group
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── cars/
│   │   │   │   ├── page.tsx          # Browse cars
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx      # Car detail
│   │   │   │   └── loading.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── how-it-works/
│   │   │   │   └── page.tsx
│   │   │   ├── sell/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Main layout
│   │   │
│   │   ├── (dashboard)/              # User dashboard group
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # Overview
│   │   │   │   ├── favorites/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── reservations/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx            # Dashboard layout
│   │   │
│   │   ├── (admin)/                  # Admin group
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx          # Admin dashboard
│   │   │   │   ├── cars/
│   │   │   │   │   ├── page.tsx      # Cars list
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx  # Add car
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── edit/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── reservations/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── inquiries/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── analytics/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx            # Admin layout
│   │   │
│   │   ├── checkout/                 # Checkout flow
│   │   │   ├── details/
│   │   │   │   └── page.tsx
│   │   │   ├── finance/
│   │   │   │   └── page.tsx
│   │   │   ├── payment/
│   │   │   │   └── page.tsx
│   │   │   ├── success/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── cars/
│   │   │   │   └── route.ts
│   │   │   ├── reservations/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── not-found.tsx             # 404 page
│   │   └── error.tsx                 # Error boundary
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── checkbox.tsx
│   │   │   └── radio-group.tsx
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── car/                      # Car-specific components
│   │   │   ├── CarCard.tsx
│   │   │   ├── CarGrid.tsx
│   │   │   ├── CarFilters.tsx
│   │   │   ├── CarImageGallery.tsx
│   │   │   ├── CarSpecsTable.tsx
│   │   │   ├── FavoriteButton.tsx
│   │   │   └── StatusBadge.tsx
│   │   │
│   │   ├── forms/                    # Form components
│   │   │   ├── CarForm.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── InquiryForm.tsx
│   │   │   ├── SellCarForm.tsx
│   │   │   └── ImageUploader.tsx
│   │   │
│   │   ├── checkout/                 # Checkout components
│   │   │   ├── CheckoutProgress.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   ├── FinanceCalculator.tsx
│   │   │   └── DemoModeBanner.tsx
│   │   │
│   │   ├── admin/                    # Admin components
│   │   │   ├── DataTable.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ReservationModal.tsx
│   │   │   └── ActivityFeed.tsx
│   │   │
│   │   ├── shared/                   # Shared components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── BackButton.tsx
│   │   │
│   │   └── providers/                # Context providers
│   │       ├── SessionProvider.tsx
│   │       ├── ToastProvider.tsx
│   │       └── ThemeProvider.tsx
│   │
│   ├── lib/                          # Utilities
│   │   ├── prisma.ts                 # Prisma client
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── utils.ts                  # Utility functions
│   │   ├── constants.ts              # App constants
│   │   └── validations.ts            # Zod schemas
│   │
│   ├── hooks/                        # Custom hooks
│   │   ├── use-toast.ts
│   │   ├── use-debounce.ts
│   │   ├── use-media-query.ts
│   │   ├── use-favorites.ts
│   │   └── use-checkout.ts
│   │
│   ├── store/                        # Zustand stores
│   │   ├── checkout-store.ts
│   │   ├── filter-store.ts
│   │   └── ui-store.ts
│   │
│   ├── actions/                      # Server actions
│   │   ├── car-actions.ts
│   │   ├── reservation-actions.ts
│   │   ├── favorite-actions.ts
│   │   └── inquiry-actions.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts
│   │   ├── car.ts
│   │   ├── user.ts
│   │   └── reservation.ts
│   │
│   └── data/                         # Static data
│       ├── makes.ts                  # Car makes/models
│       ├── features.ts               # Available features
│       └── testimonials.ts           # Homepage testimonials
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── hero.jpg
│   │   ├── logo.svg
│   │   └── placeholder-car.jpg
│   ├── icons/
│   └── fonts/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Component Architecture

### Design Principles

1. **Composition over Inheritance**
2. **Server Components by default** (Client only when needed)
3. **Co-location** (components near where they're used)
4. **Single Responsibility** (one job per component)
5. **Prop drilling max 2 levels** (use context beyond that)

---

## Core Components

### 1. CarCard Component

**Purpose**: Display car in grid/list views

**File**: `src/components/car/CarCard.tsx`

```typescript
interface CarCardProps {
  car: {
    id: string
    slug: string
    make: string
    model: string
    year: number
    price: number
    mileage: number
    transmission: string
    fuelType: string
    status: CarStatus
    images: { url: string; altText?: string }[]
  }
  variant?: 'default' | 'featured'
  showFavorite?: boolean
  isFavorited?: boolean
  onFavoriteToggle?: (carId: string) => void
}

// Features:
// - Optimized image loading
// - Hover animations
// - Status badge overlay
// - Favorite button (client component)
// - Responsive layout
// - Click to navigate to detail page
```

**Usage**:
```tsx
<CarCard
  car={car}
  variant="featured"
  showFavorite={true}
  isFavorited={favorites.includes(car.id)}
  onFavoriteToggle={handleToggle}
/>
```

---

### 2. CarFilters Component

**Purpose**: Filter sidebar on browse page

**File**: `src/components/car/CarFilters.tsx`

```typescript
interface CarFiltersProps {
  onFilterChange: (filters: CarFilters) => void
  initialFilters?: CarFilters
  availableMakes: string[]
  priceRange: { min: number; max: number }
}

// Features:
// - Multi-select dropdowns
// - Price range slider
// - Checkboxes for body type, transmission, fuel
// - Clear all button
// - Filter count badge
// - Mobile: renders in drawer/modal
// - URL sync (updates search params)
```

**State Management**:
```typescript
// Uses Zustand store for complex filter state
import { useFilterStore } from '@/store/filter-store'

const filters = useFilterStore((state) => state.filters)
const setFilters = useFilterStore((state) => state.setFilters)
```

---

### 3. CarImageGallery Component

**Purpose**: Lightbox gallery on car detail page

**File**: `src/components/car/CarImageGallery.tsx`

```typescript
interface CarImageGalleryProps {
  images: {
    url: string
    altText?: string
    isPrimary: boolean
  }[]
}

// Features:
// - Main image + thumbnail strip
// - Click to open lightbox
// - Keyboard navigation (arrows, ESC)
// - Swipe gestures (mobile)
// - Pinch to zoom
// - Framer Motion animations
```

**Libraries**:
```typescript
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
```

---

### 4. CheckoutProgress Component

**Purpose**: Multi-step progress indicator

**File**: `src/components/checkout/CheckoutProgress.tsx`

```typescript
interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3 | 4
  steps: {
    number: number
    label: string
    href: string
  }[]
}

// Features:
// - Visual progress bar
// - Step numbers with checkmarks
// - Active/completed/upcoming states
// - Click previous steps to go back
// - Responsive (compact on mobile)
```

**Styling**:
```tsx
// Completed: green checkmark
// Active: blue circle with number
// Upcoming: gray circle with number
// Connecting lines show progress
```

---

### 5. FinanceCalculator Component

**Purpose**: Interactive loan calculator

**File**: `src/components/checkout/FinanceCalculator.tsx`

```typescript
interface FinanceCalculatorProps {
  carPrice: number
  onCalculate?: (result: FinanceResult) => void
}

interface FinanceResult {
  monthlyPayment: number
  weeklyPayment: number
  totalPayable: number
  totalInterest: number
}

// Features:
// - Deposit slider
// - Loan term tabs (36/48/60 months)
// - Interest rate input
// - Real-time calculation
// - Formatted currency display
// - Shareable calculation (URL params)
```

**Formula**:
```typescript
// Monthly payment calculation
const monthlyRate = annualRate / 12 / 100
const numPayments = loanTerm
const monthlyPayment =
  (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
  (Math.pow(1 + monthlyRate, numPayments) - 1)
```

---

### 6. DataTable Component (Admin)

**Purpose**: Reusable table with sorting, filtering, pagination

**File**: `src/components/admin/DataTable.tsx`

```typescript
interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  searchKey?: keyof T
  pageSize?: number
  onRowClick?: (row: T) => void
}

// Features:
// - Sortable columns
// - Search/filter
// - Pagination
// - Row selection (checkboxes)
// - Bulk actions
// - Loading states
// - Empty state
```

**Using TanStack Table**:
```typescript
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
```

---

## Client vs Server Components

### Server Components (Default)

```
✅ Car listings page (data fetching)
✅ Car detail page (static content)
✅ Homepage (featured cars)
✅ Admin tables (data fetching)
✅ Layouts (static structure)
```

**Why**:
- No JavaScript to client
- Direct database access
- Better SEO
- Faster initial load

### Client Components

```
'use client'

✅ Favorite button (interactivity)
✅ Car filters (state management)
✅ Image gallery (user interaction)
✅ Forms (user input)
✅ Checkout wizard (multi-step state)
✅ Modals/Dialogs (open/close state)
✅ Toast notifications
```

**Why**:
- Need useState, useEffect
- Event handlers
- Browser APIs
- Animation libraries

### Hybrid Pattern

```tsx
// Server Component (page.tsx)
export default async function CarDetailPage({ params }) {
  const car = await getCar(params.slug) // Server-side fetch

  return (
    <div>
      {/* Server-rendered content */}
      <CarSpecs car={car} />

      {/* Client-side interactivity */}
      <FavoriteButton carId={car.id} />
      <CarImageGallery images={car.images} />
    </div>
  )
}
```

---

## State Management Strategy

### 1. Server State (Data Fetching)

**Use Server Components + Server Actions**

```tsx
// app/cars/page.tsx (Server Component)
export default async function CarsPage({ searchParams }) {
  const cars = await prisma.car.findMany({
    where: buildFilters(searchParams),
    include: { images: true }
  })

  return <CarGrid cars={cars} />
}
```

**Mutations with Server Actions**:
```tsx
// actions/favorite-actions.ts
'use server'

export async function toggleFavorite(carId: string) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  // Check if exists
  const existing = await prisma.favorite.findUnique({
    where: { userId_carId: { userId: session.user.id, carId } }
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
    return { favorited: false }
  } else {
    await prisma.favorite.create({ data: { userId: session.user.id, carId } })
    return { favorited: true }
  }
}
```

### 2. Client State (UI State)

**Zustand for Complex State**:

**Checkout Store**:
```typescript
// store/checkout-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CheckoutState {
  carId: string | null
  step: number
  customerDetails: CustomerDetails | null
  financeOption: FinanceOption | null

  setCarId: (id: string) => void
  setStep: (step: number) => void
  setCustomerDetails: (details: CustomerDetails) => void
  setFinanceOption: (option: FinanceOption) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      carId: null,
      step: 1,
      customerDetails: null,
      financeOption: null,

      setCarId: (carId) => set({ carId }),
      setStep: (step) => set({ step }),
      setCustomerDetails: (details) => set({ customerDetails: details }),
      setFinanceOption: (option) => set({ financeOption: option }),
      reset: () => set({
        carId: null,
        step: 1,
        customerDetails: null,
        financeOption: null
      })
    }),
    { name: 'checkout-storage' }
  )
)
```

**Filter Store**:
```typescript
// store/filter-store.ts
interface FilterState {
  filters: CarFilters
  setFilters: (filters: Partial<CarFilters>) => void
  clearFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  clearFilters: () => set({ filters: defaultFilters })
}))
```

### 3. Form State

**React Hook Form + Zod**:

```typescript
// components/forms/CheckoutForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  streetAddress: z.string().min(5),
  suburb: z.string().min(2),
  state: z.string().min(2),
  postcode: z.string().regex(/^[0-9]{4}$/)
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: ''
      // ...
    }
  })

  const onSubmit = async (data: CheckoutFormData) => {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  )
}
```

---

## Custom Hooks

### 1. useDebounce

```typescript
// hooks/use-debounce.ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

**Usage**:
```tsx
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

useEffect(() => {
  // Only fire search after 500ms of no typing
  searchCars(debouncedSearch)
}, [debouncedSearch])
```

### 2. useMediaQuery

```typescript
// hooks/use-media-query.ts
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}
```

**Usage**:
```tsx
const isMobile = useMediaQuery('(max-width: 768px)')

return (
  <>
    {isMobile ? <MobileNav /> : <DesktopNav />}
  </>
)
```

### 3. useFavorites

```typescript
// hooks/use-favorites.ts
import { useOptimistic, useTransition } from 'react'
import { toggleFavorite } from '@/actions/favorite-actions'

export function useFavorites(initialFavorites: string[]) {
  const [isPending, startTransition] = useTransition()
  const [optimisticFavorites, setOptimisticFavorites] = useOptimistic(
    initialFavorites,
    (state, carId: string) => {
      const isFavorited = state.includes(carId)
      return isFavorited
        ? state.filter(id => id !== carId)
        : [...state, carId]
    }
  )

  const toggle = (carId: string) => {
    startTransition(async () => {
      setOptimisticFavorites(carId)
      await toggleFavorite(carId)
    })
  }

  return {
    favorites: optimisticFavorites,
    toggle,
    isPending
  }
}
```

**Usage**:
```tsx
const { favorites, toggle, isPending } = useFavorites(userFavorites)

<FavoriteButton
  isFavorited={favorites.includes(car.id)}
  onClick={() => toggle(car.id)}
  disabled={isPending}
/>
```

---

## Styling Patterns

### Tailwind + CN Utility

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage**:
```tsx
<Button
  className={cn(
    'px-4 py-2',
    variant === 'primary' && 'bg-blue-500 text-white',
    variant === 'secondary' && 'bg-gray-200 text-gray-800',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click Me
</Button>
```

### Component Variants (CVA)

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
        destructive: 'bg-red-600 text-white hover:bg-red-700'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

---

## Animation Patterns

### Framer Motion Examples

**Card Hover**:
```tsx
<motion.div
  whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
  transition={{ duration: 0.2 }}
>
  <CarCard car={car} />
</motion.div>
```

**Stagger Children**:
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {cars.map(car => (
    <motion.div
      key={car.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <CarCard car={car} />
    </motion.div>
  ))}
</motion.div>
```

**Page Transitions**:
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image'

<Image
  src={car.images[0].url}
  alt={car.images[0].altText || `${car.year} ${car.make} ${car.model}`}
  width={800}
  height={600}
  className="rounded-lg"
  priority={isPriority}
  placeholder="blur"
  blurDataURL={blurPlaceholder}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Cloudinary Integration**:
```typescript
// lib/cloudinary.ts
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number
  } = {}
) {
  const { width = 800, height = 600, quality = 80 } = options

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill,q_${quality},f_auto/${publicId}`
}
```

---

## Form Validation Schemas

### Zod Schemas

```typescript
// lib/validations.ts
import * as z from 'zod'

// Checkout schema
export const checkoutDetailsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Must be 10 digits'),
  streetAddress: z.string().min(5, 'Address too short'),
  suburb: z.string().min(2),
  state: z.enum(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']),
  postcode: z.string().regex(/^[0-9]{4}$/, 'Must be 4 digits'),

  // Trade-in (optional)
  hasTradeIn: z.boolean().default(false),
  tradeInMake: z.string().optional(),
  tradeInModel: z.string().optional(),
  tradeInYear: z.number().min(1980).max(new Date().getFullYear()).optional(),
  tradeInMileage: z.number().positive().optional(),

  preferredInspectionDate: z.date().min(new Date())
})

// Car form schema (admin)
export const carFormSchema = z.object({
  make: z.string().min(1, 'Required'),
  model: z.string().min(1, 'Required'),
  year: z.number().min(1980).max(new Date().getFullYear() + 1),
  variant: z.string().optional(),
  vin: z.string().length(17).optional(),
  price: z.number().min(1000).max(500000),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'DRAFT']),
  bodyType: z.string(),
  transmission: z.enum(['Automatic', 'Manual']),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
  mileage: z.number().min(0),
  color: z.string(),
  doors: z.number().min(2).max(5).optional(),
  seats: z.number().min(2).max(9).optional(),
  description: z.string().max(2000).optional(),
  features: z.array(z.string()).optional()
})

// Inquiry schema
export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/).optional(),
  type: z.enum(['GENERAL', 'TEST_DRIVE', 'SELL_CAR', 'FINANCE']),
  message: z.string().min(10).max(1000).optional(),

  // For sell car
  sellCarMake: z.string().optional(),
  sellCarModel: z.string().optional(),
  sellCarYear: z.number().optional(),
  sellCarMileage: z.number().optional()
})
```

---

## Error Handling

### Error Boundary

```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### Toast Notifications

```typescript
// hooks/use-toast.ts (from shadcn)
import { toast } from 'sonner'

// Usage
toast.success('Car added to favorites')
toast.error('Failed to add to favorites')
toast.loading('Processing...')
toast.promise(
  saveReservation(),
  {
    loading: 'Creating reservation...',
    success: 'Reservation confirmed!',
    error: 'Failed to create reservation'
  }
)
```

---

## Performance Optimizations

### Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic'

const CarImageGallery = dynamic(
  () => import('@/components/car/CarImageGallery'),
  { loading: () => <Skeleton className="h-96" /> }
)

const AdminChart = dynamic(
  () => import('@/components/admin/Charts'),
  { ssr: false }  // Client-only component
)
```

### Memoization

```tsx
import { memo, useMemo } from 'react'

// Memo expensive calculations
const expensiveCalculation = useMemo(() => {
  return calculateFinance(price, deposit, term)
}, [price, deposit, term])

// Memo components
export const CarCard = memo(function CarCard({ car }: CarCardProps) {
  // Component implementation
})
```

### Virtual Scrolling

```tsx
// For long lists (100+ items)
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualCarList({ cars }: { cars: Car[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: cars.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,  // Estimated row height
    overscan: 5
  })

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            <CarCard car={cars[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Accessibility

### Keyboard Navigation

```tsx
// Escape key to close modals
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [onClose])

// Arrow keys for gallery
useEffect(() => {
  const handleArrows = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') previousImage()
    if (e.key === 'ArrowRight') nextImage()
  }

  document.addEventListener('keydown', handleArrows)
  return () => document.removeEventListener('keydown', handleArrows)
}, [currentIndex])
```

### ARIA Labels

```tsx
<button
  aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
  onClick={onToggle}
>
  <Heart fill={isFavorited ? 'red' : 'none'} />
</button>

<nav aria-label="Breadcrumb">
  <ol>
    <li><Link href="/">Home</Link></li>
    <li><Link href="/cars">Cars</Link></li>
    <li aria-current="page">{car.name}</li>
  </ol>
</nav>
```

---

## Testing Strategy

### Component Tests (Vitest + Testing Library)

```typescript
// __tests__/CarCard.test.tsx
import { render, screen } from '@testing-library/react'
import { CarCard } from '@/components/car/CarCard'

describe('CarCard', () => {
  const mockCar = {
    id: '1',
    slug: 'test-car',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 30000,
    // ...
  }

  it('renders car details correctly', () => {
    render(<CarCard car={mockCar} />)

    expect(screen.getByText('2022 Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('$30,000')).toBeInTheDocument()
  })

  it('shows favorite button when enabled', () => {
    render(<CarCard car={mockCar} showFavorite />)

    expect(screen.getByLabelText(/favorite/i)).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright)

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  // Navigate to car detail
  await page.goto('/cars/2022-toyota-camry')

  // Click reserve button
  await page.click('text=Reserve This Car')

  // Fill checkout form
  await page.fill('[name="fullName"]', 'John Doe')
  await page.fill('[name="email"]', 'john@example.com')
  // ...

  // Submit
  await page.click('text=Continue to Payment')

  // Verify success
  await expect(page.locator('text=Reservation Confirmed')).toBeVisible()
})
```

---

## Conclusion

This frontend architecture provides:
- ✅ Modern Next.js 15 App Router patterns
- ✅ Type-safe with TypeScript
- ✅ Component-driven architecture
- ✅ Server-first approach (performance)
- ✅ Client interactivity where needed
- ✅ Accessible and responsive
- ✅ Scalable folder structure
- ✅ Best-in-class DX (Developer Experience)

---

# Frontend Agent Guide


## Responsibilities

The Frontend Agent handles all React/Next.js client-side code, UI components, and user interactions.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Component Library**: Radix UI
- **State Management**: Zustand, React Hooks
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion

## Key Areas

### 1. Components (`/src/components`)

#### UI Components (`/src/components/ui`)
- Shadcn components (Button, Input, Select, etc.)
- Base components used throughout the app
- Maintained via `npx shadcn add <component>`

#### Feature Components
- `CarCard.tsx` - Car listing card with image, details, favorite button
- `CarFilters.tsx` - Advanced filter sidebar with accordions
- `FavoriteButton.tsx` - Toggle favorite functionality
- `Header.tsx` - Navigation header with auth menu
- `Footer.tsx` - Site footer

### 2. Pages (`/src/app`)

- `/page.tsx` - Homepage with hero, features, featured cars
- `/cars/page.tsx` - Browse cars with filters
- `/cars/[slug]/page.tsx` - Individual car detail page
- `/sell/page.tsx` - Sell car form
- `/dashboard/*` - User dashboard pages

### 3. Client Components

Components marked with `'use client'`:
- Interactive forms
- State management
- Event handlers
- Browser APIs
- Zustand stores

## Common Tasks

### Adding a New Component

```typescript
// 1. Create component file
// /src/components/feature/MyComponent.tsx

'use client' // If needs interactivity

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  const [state, setState] = useState('')

  return (
    <div className="rounded-2xl bg-white p-6" style={{ boxShadow: 'var(--card-shadow)' }}>
      {/* Component content */}
    </div>
  )
}
```

### Form Handling Pattern

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Required'),
})

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    // Call server action
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
}
```

## Styling Guidelines

### Use Design System

```tsx
// Good - Uses design tokens
<div className="rounded-2xl bg-white" style={{ boxShadow: 'var(--card-shadow)' }}>

// Bad - Hard-coded values
<div className="rounded-lg bg-white shadow-md">
```

### Modern Card Pattern

```tsx
<div className="car-card group relative h-full rounded-2xl bg-white transition-all duration-500 hover:-translate-y-1">
  {/* Card content */}
</div>
```

### Gradient Patterns

```tsx
// Gradient text
<h2 className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">

// Gradient background
<div className="bg-gradient-to-br from-green-600 to-green-800">
```

## Testing with Playwright

After making changes, run tests:

```bash
npm run test:e2e
```

### Writing Tests for New Components

```typescript
// tests/e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test'

test('should render my component', async ({ page }) => {
  await page.goto('/my-page')
  await expect(page.getByRole('heading', { name: /My Component/i })).toBeVisible()
})
```

## Performance Tips

1. **Use Server Components by default** - Only add `'use client'` when necessary
2. **Lazy load heavy components** - Use `next/dynamic`
3. **Optimize images** - Use `next/image` with proper sizes
4. **Minimize client JS** - Keep client bundles small

## Common Patterns

### Loading States

```tsx
{isLoading ? (
  <CarCardSkeleton />
) : (
  <CarCard car={car} />
)}
```

### Error Handling

```tsx
import { toast } from 'sonner'

toast.error('Error Title', {
  description: 'Detailed error message',
  duration: 4000,
})
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

## File Structure

```
src/
├── components/
│   ├── ui/              # Base UI components
│   ├── layout/          # Header, Footer
│   ├── car/            # Car-specific components
│   └── dashboard/      # Dashboard components
├── app/
│   ├── page.tsx        # Homepage
│   ├── cars/           # Car pages
│   ├── sell/           # Sell page
│   └── dashboard/      # Dashboard pages
└── lib/
    └── utils.ts        # Utility functions
```
