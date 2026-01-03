# Cars Online

A modern, full-stack car marketplace built with Next.js 16, featuring quality inspected used cars with a 7-day guarantee.

## 🌐 Live Demo

**Production URL:** [https://https://cars-online.vercel.app/](https://https://cars-online.vercel.app/)

## Testing

Comprehensive testing suite with E2E and unit tests:

```bash
# Unit Tests (Vitest)
npm run test              # Run in watch mode
npm run test:run          # Run once
npm run test:ui           # Open Vitest UI
npm run test:coverage     # Generate coverage report

# E2E Tests (Playwright)
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Run in UI mode
npm run test:e2e:headed   # Run with browser visible
npm run test:e2e:report   # View test report
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and auth secrets

# Generate Prisma Client
npm run db:generate

# Push database schema
npm run db:push

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
cars-online/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Base UI components (Shadcn)
│   │   ├── car/         # Car-specific components
│   │   └── layout/      # Layout components
│   ├── actions/         # Server Actions
│   ├── lib/             # Utilities, auth, database
│   ├── store/           # Zustand state stores
│   └── types/           # TypeScript types
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
├── tests/
│   ├── unit/            # Unit tests (Vitest)
│   └── e2e/             # E2E tests (Playwright)
└── public/              # Static assets
```

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI, Shadcn
- **State**: Zustand, React Hooks
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with Next.js Server Actions
- **Database**: PostgreSQL with Prisma 7
- **Auth**: NextAuth v5 (Auth.js)
- **Validation**: Zod schemas
- **API**: Next.js API Routes

### Testing
- **Unit Tests**: Vitest + Testing Library
- **E2E Tests**: Playwright
- **Type Safety**: TypeScript 5

### Deployment
- **Platform**: Vercel
- **Database**: Neon/Supabase PostgreSQL
- **CDN**: Vercel Edge Network

## Design System

Modern, accessible design system with:
- Borderless cards with soft shadows
- Responsive typography (mobile-first)
- Smooth animations and transitions
- Mobile, tablet, and desktop layouts
- WCAG AA compliant colors
- Form inputs optimized for iOS (16px minimum to prevent zoom)

## Key Features

### For Buyers
- Browse quality inspected cars
- Advanced filtering (make, model, price, year, etc.)
- Detailed car pages with multiple images
- Favorite cars for later
- 7-day money-back guarantee
- Free home delivery

### For Sellers
- Simple valuation form
- Quick response (24 hours)
- Competitive pricing
- Free inspection
- Secure payment

### Admin Dashboard
- Manage car listings
- Track inquiries
- User management
- Analytics

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Testing
npm run test             # Run unit tests (watch mode)
npm run test:run         # Run unit tests once
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests in UI mode

# Code Quality
npm run lint             # Run ESLint
```

## Deployment

This project is configured for **Vercel deployment**:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

The deployment is optimized for:
- Edge runtime where possible
- Automatic image optimization
- Static page generation
- Incremental Static Regeneration

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## Development Workflow

1. **Write code** - Implement features or fix bugs
2. **Write tests** - Add unit and E2E tests
3. **Run tests** - Verify functionality
4. **Iterate** - Fix any test failures
5. **Commit** - Push to repository
6. **Deploy** - Automatic deployment via Vercel

### Example Workflow

```bash
# 1. Make changes
# Edit component files

# 2. Run unit tests
npm run test

# 3. Run E2E tests
npm run test:e2e

# 4. If tests pass, commit
git add .
git commit -m "feat: add new feature"

# 5. Push to deploy
git push origin main
```

## 📄 License

This project is private and proprietary.
