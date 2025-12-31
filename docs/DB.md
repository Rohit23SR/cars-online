# Database Schema - Cars Online

## Database Technology

**Choice**: PostgreSQL (via Supabase)

**Rationale**:
- ✅ Relational data (cars, users, orders have clear relationships)
- ✅ ACID compliance (important for reservations/orders)
- ✅ Full-text search capabilities
- ✅ JSON support for flexible fields (car features)
- ✅ Excellent with Prisma ORM
- ✅ Free tier on Supabase (500MB)
- ✅ Built-in auth, storage, real-time

**ORM**: Prisma

**Reasons**:
- Type-safe queries
- Auto-generated TypeScript types
- Excellent DX with migrations
- Schema-first approach
- Industry standard

---

## Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    User     │────────<│   Favorite   │>────────│     Car     │
└─────────────┘         └──────────────┘         └─────────────┘
      │                                                  │
      │                                                  │
      │                                                  │
      ▼                                                  ▼
┌─────────────┐                                  ┌─────────────┐
│   Account   │                                  │  CarImage   │
└─────────────┘                                  └─────────────┘
      │                                                  │
      │                                                  │
      ▼                                                  ▼
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Session   │         │ Reservation  │────────>│     Car     │
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               │
                               ▼
                        ┌─────────────┐
                        │    User     │
                        └─────────────┘

┌─────────────┐
│   Inquiry   │────────>│    User     │
└─────────────┘         └─────────────┘
```

---

## Core Tables

### 1. Users Table

**Purpose**: Store user accounts (buyers, admins)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  phone         String?
  image         String?
  role          UserRole  @default(USER)

  // Timestamps
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  favorites     Favorite[]
  reservations  Reservation[]
  inquiries     Inquiry[]

  @@map("users")
}

enum UserRole {
  USER
  ADMIN
}
```

**Indexes**:
```prisma
@@index([email])
@@index([role])
```

**Notes**:
- Compatible with NextAuth.js/Auth.js
- `cuid()` for secure, sortable IDs
- Soft role system (USER/ADMIN)
- Phone optional but useful for contact

---

### 2. Account Table (NextAuth)

**Purpose**: OAuth provider accounts

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}
```

**Indexes**:
```prisma
@@index([userId])
```

---

### 3. Session Table (NextAuth)

**Purpose**: User sessions

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

---

### 4. VerificationToken (NextAuth)

**Purpose**: Email verification tokens

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

---

### 5. Car Table

**Purpose**: Core car inventory

```prisma
model Car {
  id          String   @id @default(cuid())
  slug        String   @unique

  // Basic Info
  make        String
  model       String
  year        Int
  variant     String?
  vin         String?  @unique
  price       Decimal  @db.Decimal(10, 2)

  // Status
  status      CarStatus @default(AVAILABLE)
  featured    Boolean   @default(false)

  // Specifications
  bodyType    String
  transmission String
  fuelType    String
  engineSize  String?
  mileage     Int
  color       String
  doors       Int?
  seats       Int?

  // Performance
  power       String?  // e.g., "135 kW"
  torque      String?  // e.g., "235 Nm"
  fuelEconomy String?  // e.g., "6.5L/100km"

  // Location & Registration
  location    String   // e.g., "Sydney, NSW"
  registration String?  // e.g., "Valid until Dec 2024"

  // Description
  description String?  @db.Text

  // Features (JSON array)
  features    Json?    // ["Bluetooth", "Backup Camera", ...]

  // Inspection
  inspectionDate DateTime?
  inspectionNotes String? @db.Text

  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  images      CarImage[]
  favorites   Favorite[]
  reservations Reservation[]

  @@map("cars")
}

enum CarStatus {
  AVAILABLE
  RESERVED
  SOLD
  DRAFT
}
```

**Indexes**:
```prisma
@@index([slug])
@@index([status])
@@index([make])
@@index([price])
@@index([year])
@@index([bodyType])
@@index([createdAt])
@@index([featured])
@@fulltext([make, model, variant])  // Full-text search
```

**Notes**:
- `slug` for SEO-friendly URLs (e.g., "2022-toyota-camry-ascent")
- `Decimal` for price (no floating point errors)
- `Json` for features (flexible, can add/remove features easily)
- Full-text index for search
- Multiple indexes for filter queries

---

### 6. CarImage Table

**Purpose**: Car photos (one-to-many)

```prisma
model CarImage {
  id        String   @id @default(cuid())
  carId     String
  url       String
  altText   String?
  isPrimary Boolean  @default(false)
  order     Int      @default(0)

  // Metadata
  width     Int?
  height    Int?
  size      Int?     // bytes

  // Timestamps
  createdAt DateTime @default(now())

  // Relations
  car       Car      @relation(fields: [carId], references: [id], onDelete: Cascade)

  @@map("car_images")
}
```

**Indexes**:
```prisma
@@index([carId])
@@index([isPrimary])
@@index([order])
```

**Notes**:
- `isPrimary` for thumbnail/hero image
- `order` for gallery sequence
- Cascade delete (if car deleted, images deleted)
- Store Cloudinary/Supabase URLs

---

### 7. Favorite Table

**Purpose**: User wishlists (many-to-many)

```prisma
model Favorite {
  id        String   @id @default(cuid())
  userId    String
  carId     String

  // Timestamps
  createdAt DateTime @default(now())

  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  car       Car      @relation(fields: [carId], references: [id], onDelete: Cascade)

  @@unique([userId, carId])  // Prevent duplicate favorites
  @@map("favorites")
}
```

**Indexes**:
```prisma
@@index([userId])
@@index([carId])
```

---

### 8. Reservation Table

**Purpose**: Mock orders/reservations

```prisma
model Reservation {
  id              String   @id @default(cuid())
  orderNumber     String   @unique  // e.g., "ORD-2024-00123"

  // User
  userId          String

  // Car
  carId           String

  // Customer Info (denormalized for historical data)
  customerName    String
  customerEmail   String
  customerPhone   String

  // Delivery Address
  streetAddress   String
  suburb          String
  state           String
  postcode        String

  // Finance Details
  paymentMethod   PaymentMethod
  carPrice        Decimal  @db.Decimal(10, 2)
  deposit         Decimal? @db.Decimal(10, 2)
  loanTerm        Int?     // months
  tradeInValue    Decimal? @db.Decimal(10, 2)
  totalAmount     Decimal  @db.Decimal(10, 2)

  // Trade-In (optional)
  tradeInMake     String?
  tradeInModel    String?
  tradeInYear     Int?
  tradeInMileage  Int?
  tradeInCondition String?

  // Inspection
  preferredInspectionDate DateTime?

  // Mock Payment Info
  cardLast4       String?

  // Status
  status          ReservationStatus @default(PENDING)

  // Admin Notes
  adminNotes      String?  @db.Text

  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  user            User     @relation(fields: [userId], references: [id])
  car             Car      @relation(fields: [carId], references: [id])

  @@map("reservations")
}

enum PaymentMethod {
  FULL_PAYMENT
  FINANCE
}

enum ReservationStatus {
  PENDING
  CONFIRMED
  INSPECTION_SCHEDULED
  COMPLETED
  CANCELLED
}
```

**Indexes**:
```prisma
@@index([orderNumber])
@@index([userId])
@@index([carId])
@@index([status])
@@index([createdAt])
```

**Notes**:
- `orderNumber` human-readable (auto-generated)
- Denormalized customer data (preserve even if user deleted)
- Complete financial snapshot
- Status workflow tracking
- Admin notes for internal use

---

### 9. Inquiry Table

**Purpose**: General inquiries, test drives, sell car requests

```prisma
model Inquiry {
  id          String      @id @default(cuid())
  type        InquiryType

  // User (optional - can be anonymous)
  userId      String?

  // Contact Info
  name        String
  email       String
  phone       String?

  // Related Car (for test drives)
  carId       String?

  // Sell Your Car Data
  sellCarMake  String?
  sellCarModel String?
  sellCarYear  Int?
  sellCarMileage Int?
  estimatedValue Decimal? @db.Decimal(10, 2)

  // Message
  message     String?     @db.Text

  // Status
  status      InquiryStatus @default(NEW)

  // Admin Response
  adminNotes  String?     @db.Text

  // Timestamps
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  // Relations
  user        User?       @relation(fields: [userId], references: [id])

  @@map("inquiries")
}

enum InquiryType {
  GENERAL
  TEST_DRIVE
  SELL_CAR
  FINANCE
}

enum InquiryStatus {
  NEW
  CONTACTED
  RESOLVED
  CLOSED
}
```

**Indexes**:
```prisma
@@index([type])
@@index([status])
@@index([createdAt])
@@index([userId])
```

---

## Seed Data Structure

### Default Admin User
```typescript
{
  email: "admin@cars-online.com",
  name: "Admin User",
  role: "ADMIN",
  password: "hashed_password_here"
}
```

### Sample Cars (10-15 cars)

**Data to include**:
```typescript
{
  make: "Toyota",
  model: "Camry",
  year: 2022,
  variant: "Ascent",
  price: 32990,
  status: "AVAILABLE",
  featured: true,
  bodyType: "Sedan",
  transmission: "Automatic",
  fuelType: "Petrol",
  mileage: 45000,
  color: "Silver",
  doors: 4,
  seats: 5,
  description: "Well-maintained 2022 Toyota Camry...",
  features: [
    "Bluetooth",
    "Backup Camera",
    "Cruise Control",
    "Air Conditioning",
    "ABS",
    "Airbags"
  ],
  location: "Sydney, NSW",
  images: [
    { url: "...", isPrimary: true, order: 0 },
    { url: "...", isPrimary: false, order: 1 }
  ]
}
```

**Car variety**:
- 5 Sedans (Toyota, Honda, Mazda)
- 3 SUVs (Nissan, Hyundai, Kia)
- 2 Hatchbacks (Volkswagen, Toyota)
- 2 Luxury (BMW, Mercedes)
- 1 Electric (Tesla)

**Price range**: $15,000 - $75,000

---

## Database Constraints

### Business Rules

1. **Car Status Transitions**:
   ```
   DRAFT → AVAILABLE → RESERVED → SOLD
   Can revert: RESERVED → AVAILABLE (if cancelled)
   ```

2. **Reservation Business Logic**:
   - Only one active reservation per car at a time
   - User can have multiple active reservations
   - Car must be AVAILABLE to reserve

3. **Image Constraints**:
   - Max 12 images per car
   - At least 1 image required
   - Exactly 1 primary image

4. **Price Validation**:
   - Min: $1,000
   - Max: $500,000
   - Must be positive

5. **Year Validation**:
   - Min: 1980
   - Max: Current year + 1

---

## Performance Optimizations

### 1. Indexes Strategy

**Read-heavy indexes** (car browsing):
```prisma
// Composite index for common filter combinations
@@index([status, make, price])
@@index([status, bodyType, price])
@@index([status, year, price])
```

**Sort indexes**:
```prisma
@@index([createdAt(sort: Desc)])  // Newest first
@@index([price(sort: Asc)])       // Price low-high
@@index([mileage(sort: Asc)])     // Lowest mileage
```

### 2. Query Optimization Patterns

**Pagination**:
```typescript
// Cursor-based (better performance)
await prisma.car.findMany({
  take: 20,
  skip: 1,
  cursor: { id: lastCarId }
})
```

**Selective fields**:
```typescript
// Don't fetch description for card views
await prisma.car.findMany({
  select: {
    id: true,
    make: true,
    model: true,
    price: true,
    images: { where: { isPrimary: true } }
  }
})
```

**Aggregations**:
```typescript
// For filters (count by make)
await prisma.car.groupBy({
  by: ['make'],
  _count: { make: true },
  where: { status: 'AVAILABLE' }
})
```

### 3. Caching Strategy

**Cache candidates**:
- Homepage featured cars (10 min)
- Makes/models list (1 hour)
- Car count by filters (5 min)

**Implementation**: Next.js unstable_cache or Redis

---

## Migration Strategy

### Initial Migration

```bash
npx prisma migrate dev --name init
```

### Future Migrations

Example: Adding views counter
```prisma
model Car {
  // ... existing fields
  viewCount   Int      @default(0)
}
```

```bash
npx prisma migrate dev --name add_view_counter
```

---

## Backup Strategy

**Supabase Free Tier**:
- Point-in-time recovery (7 days)
- Manual exports via SQL

**Best Practice**:
```bash
# Weekly backup script
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

---

## Database Queries Reference

### Common Queries

**1. Get available cars with filters**:
```typescript
const cars = await prisma.car.findMany({
  where: {
    status: 'AVAILABLE',
    make: { in: ['Toyota', 'Honda'] },
    price: { gte: 20000, lte: 50000 },
    year: { gte: 2020 }
  },
  include: {
    images: { where: { isPrimary: true } }
  },
  orderBy: { createdAt: 'desc' },
  take: 20
})
```

**2. Get car with all relations**:
```typescript
const car = await prisma.car.findUnique({
  where: { slug: 'xxx' },
  include: {
    images: { orderBy: { order: 'asc' } },
    _count: { select: { favorites: true } }
  }
})
```

**3. Create reservation (transaction)**:
```typescript
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
      userId,
      carId,
      // ... other fields
    }
  })
})
```

**4. Toggle favorite**:
```typescript
// Check if exists
const existing = await prisma.favorite.findUnique({
  where: { userId_carId: { userId, carId } }
})

if (existing) {
  // Remove
  await prisma.favorite.delete({ where: { id: existing.id } })
} else {
  // Add
  await prisma.favorite.create({ data: { userId, carId } })
}
```

**5. Search cars (full-text)**:
```typescript
const results = await prisma.car.findMany({
  where: {
    OR: [
      { make: { contains: searchTerm, mode: 'insensitive' } },
      { model: { contains: searchTerm, mode: 'insensitive' } },
      { variant: { contains: searchTerm, mode: 'insensitive' } }
    ],
    status: 'AVAILABLE'
  }
})
```

---

## Security Considerations

### 1. Row Level Security (RLS)

**Implement in application layer**:
```typescript
// Only admins can modify cars
if (user.role !== 'ADMIN') {
  throw new Error('Unauthorized')
}

// Users can only see their own reservations
const reservations = await prisma.reservation.findMany({
  where: { userId: session.user.id }
})
```

### 2. Data Sanitization

```typescript
// Prevent XSS in descriptions
import DOMPurify from 'isomorphic-dompurify'

const cleanDescription = DOMPurify.sanitize(userInput)
```

### 3. Rate Limiting

```typescript
// Prevent abuse of favorites, inquiries
// Implement with upstash/ratelimit or middleware
```

---

## Conclusion

This database design provides:
- ✅ Normalized structure (no data duplication)
- ✅ Proper relationships (foreign keys, cascade)
- ✅ Flexible for future changes
- ✅ Optimized for read-heavy workload
- ✅ Compatible with NextAuth
- ✅ Type-safe with Prisma
- ✅ Scalable to 10,000+ cars
- ✅ Free tier friendly (< 500MB initial data)
