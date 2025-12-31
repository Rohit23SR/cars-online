# Deployment & Configuration - Cars Online

## Deployment Strategy

**Platform**: Vercel (Recommended)
**Database**: Supabase
**Storage**: Cloudinary
**Domain**: Custom domain (optional)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Internet                       │
└───────────────────┬─────────────────────────────┘
                    │
         ┌──────────▼──────────┐
         │   Vercel CDN        │
         │   (Edge Network)    │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────────────┐
         │   Next.js App               │
         │   (Serverless Functions)    │
         │                             │
         │   - Pages (SSR/SSG)         │
         │   - API Routes              │
         │   - Server Actions          │
         └─────┬──────────┬────────────┘
               │          │
      ┌────────▼───┐   ┌──▼─────────────┐
      │ Supabase   │   │  Cloudinary    │
      │ PostgreSQL │   │  Image Storage │
      │ Auth       │   └────────────────┘
      │ Storage    │
      └────────────┘
```

---

## Environment Setup

### Development Environment

**Required Software**:
```
Node.js:    20.x LTS
npm/pnpm:   Latest
Git:        Latest
VS Code:    Recommended
```

**VS Code Extensions**:
```
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- TypeScript
```

### Environment Variables

**File**: `.env.local` (Never commit!)

```bash
# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth (Auth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Resend - Optional)
RESEND_API_KEY="re_xxxxxxxxxxxx"

# Rate Limiting (Upstash - Optional)
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# Cron Jobs
CRON_SECRET="random-secret-for-cron-endpoints"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**File**: `.env.example` (Safe to commit)

```bash
# Copy this file to .env.local and fill in your values

# Database
DATABASE_URL=
DIRECT_URL=

# Auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# OAuth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional Services
RESEND_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CRON_SECRET=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Service Setup

### 1. Supabase Setup

**Steps**:

1. **Create Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Choose region (closest to users)
   - Set database password (save it!)
   - Wait 2-3 minutes for provisioning

2. **Get Connection Strings**
   ```
   Settings > Database > Connection String

   - Connection Pooling (Recommended for Vercel):
     DATABASE_URL=postgresql://postgres.xxx:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

   - Direct Connection (For migrations):
     DIRECT_URL=postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
   ```

3. **Enable Extensions** (Optional but recommended)
   ```sql
   -- Run in SQL Editor
   create extension if not exists "uuid-ossp";
   create extension if not exists "pg_trgm"; -- For full-text search
   ```

4. **Storage Bucket** (If not using Cloudinary)
   ```
   Storage > New Bucket
   Name: car-images
   Public: Yes
   ```

5. **Row Level Security** (Optional - for extra security)
   ```sql
   -- Example: Users can only see their own reservations
   create policy "Users can view own reservations"
   on reservations for select
   using (auth.uid() = user_id);
   ```

**Free Tier Limits**:
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- Unlimited API requests
- Perfect for portfolio project!

---

### 2. Cloudinary Setup

**Steps**:

1. **Create Account**
   - Go to https://cloudinary.com
   - Sign up (free tier)
   - Complete verification

2. **Get Credentials**
   ```
   Dashboard > Account Details

   Cloud Name: your-cloud-name
   API Key: 123456789012345
   API Secret: AbCdEfGhIjKlMnOpQrStUvWx
   ```

3. **Create Upload Preset** (Optional)
   ```
   Settings > Upload > Upload Presets

   Name: cars-online
   Folder: cars
   Format: auto
   Quality: auto:good
   ```

4. **Configure Transformations**
   ```
   Common URLs:
   - Thumbnail: w_400,h_300,c_fill
   - Medium: w_800,h_600,c_fill
   - Large: w_1200,h_900,c_fill
   - WebP: f_auto (automatic format)
   ```

**Free Tier Limits**:
- 25 GB storage
- 25 GB bandwidth/month
- Plenty for portfolio!

---

### 3. Vercel Setup

**Steps**:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Link Project**
   ```bash
   vercel link
   ```

3. **Add Environment Variables**
   ```bash
   # Via CLI
   vercel env add DATABASE_URL
   vercel env add NEXTAUTH_SECRET
   # ... etc

   # Or via Dashboard
   Project Settings > Environment Variables
   ```

4. **Deploy**
   ```bash
   # Development
   vercel dev

   # Production
   vercel --prod

   # Or via Git (auto-deploy)
   git push origin main
   ```

**Free Tier Limits**:
- 100 GB bandwidth
- 6000 build minutes
- Serverless function: 10s timeout
- 12 concurrent builds
- Great for portfolio!

---

### 4. NextAuth (Auth.js) Setup

**Generate Secret**:
```bash
openssl rand -base64 32
```

**Google OAuth** (Optional but recommended):

1. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com
   - Create new project
   - Enable "Google+ API"

2. **Create OAuth Credentials**
   ```
   APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client ID

   Application type: Web application
   Name: Cars Online

   Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://your-domain.com/api/auth/callback/google
   ```

3. **Copy Credentials**
   ```
   Client ID: xxxx.apps.googleusercontent.com
   Client Secret: GOCSPX-xxxx
   ```

---

## Project Configuration Files

### 1. package.json

```json
{
  "name": "cars-online",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "prepare": "husky install"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@prisma/client": "^5.20.0",
    "@auth/prisma-adapter": "^2.5.0",
    "next-auth": "^5.0.0-beta.22",
    "bcryptjs": "^2.4.3",
    "zod": "^3.23.8",
    "react-hook-form": "@hookform/resolvers": "^3.9.0",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "framer-motion": "^11.11.7",
    "lucide-react": "^0.454.0",
    "recharts": "^2.13.3",
    "sonner": "^1.7.1",
    "zustand": "^5.0.1",
    "cloudinary": "^2.5.1",
    "react-dropzone": "^14.3.5",
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "@types/node": "^22.9.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/bcryptjs": "^2.4.6",
    "prisma": "^5.20.0",
    "tailwindcss": "^3.4.14",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.8",
    "@tailwindcss/typography": "^0.5.15",
    "tsx": "^4.19.2"
  }
}
```

---

### 2. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      }
    ]
  },

  // Enable experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

---

### 3. tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)']
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
}

export default config
```

---

### 4. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### 5. .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

---

### 6. .prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

### 7. .gitignore

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
prisma/migrations
```

---

## Database Setup

### 1. Initialize Prisma

```bash
# Install Prisma
npm install -D prisma
npm install @prisma/client

# Initialize
npx prisma init
```

### 2. Update schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ... (copy schema from DB.md)
```

### 3. Create Migration

```bash
# Development
npx prisma migrate dev --name init

# Production (via Vercel)
npx prisma migrate deploy
```

### 4. Generate Client

```bash
npx prisma generate
```

### 5. Seed Database

**File**: `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cars-online.com' },
    update: {},
    create: {
      email: 'admin@cars-online.com',
      name: 'Admin User',
      hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('Created admin:', admin)

  // Seed cars
  const cars = [
    {
      slug: '2022-toyota-camry-ascent',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      variant: 'Ascent',
      price: 32990,
      status: 'AVAILABLE',
      featured: true,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: 45000,
      color: 'Silver',
      doors: 4,
      seats: 5,
      location: 'Sydney, NSW',
      description: 'Well-maintained 2022 Toyota Camry in excellent condition.',
      features: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'Air Conditioning']
    },
    // Add more cars...
  ]

  for (const carData of cars) {
    await prisma.car.create({
      data: carData
    })
  }

  console.log('Seeded', cars.length, 'cars')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

**Run Seed**:
```bash
npx tsx prisma/seed.ts
```

---

## Deployment Process

### Initial Deployment

**1. Prepare Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/cars-online.git
git push -u origin main
```

**2. Deploy to Vercel**

**Option A: Via Dashboard**
```
1. Go to vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select repository
5. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
6. Add environment variables
7. Click "Deploy"
```

**Option B: Via CLI**
```bash
vercel --prod
```

**3. Run Migrations**
```bash
# In Vercel project settings, add build command:
npx prisma generate && npx prisma migrate deploy && next build
```

**4. Verify Deployment**
```
- Visit: https://your-project.vercel.app
- Test: Sign in, browse cars, create reservation
- Check: Logs in Vercel dashboard
```

---

### Continuous Deployment

**GitHub Integration (Automatic)**:
```
main branch → Production
dev branch → Preview (optional)
feature/* → Preview (optional)
```

**Deploy Workflow**:
```bash
# 1. Make changes locally
git checkout -b feature/new-feature

# 2. Test locally
npm run dev
npm run build

# 3. Commit and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 4. Create PR on GitHub
# Vercel automatically creates preview deployment

# 5. Merge to main
# Vercel automatically deploys to production
```

---

## Domain Configuration

### 1. Purchase Domain (Optional)

**Recommended Registrars**:
- Namecheap
- Cloudflare
- Google Domains

### 2. Configure DNS

**In Vercel**:
```
Project Settings > Domains > Add
Domain: cars-online.com

Vercel provides:
A Record: 76.76.21.21
CNAME: cname.vercel-dns.com
```

**In Domain Registrar**:
```
Add A Record:
Name: @
Value: 76.76.21.21

Add CNAME:
Name: www
Value: cname.vercel-dns.com
```

**Wait 24-48 hours for propagation**

---

## Performance Optimization

### 1. Vercel Edge Config

**Enable Edge Runtime** (for API routes):
```typescript
// app/api/cars/route.ts
export const runtime = 'edge'
```

### 2. Image Optimization

**Cloudinary Auto-format**:
```typescript
const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`
```

**Next.js Image Component**:
```tsx
<Image
  src={url}
  alt={alt}
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### 3. Caching Strategy

**Route Segment Config**:
```typescript
// app/cars/page.tsx
export const revalidate = 300 // 5 minutes
export const dynamic = 'force-static'
```

### 4. Bundle Analysis

**Add Script**:
```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

**Install Plugin**:
```bash
npm install @next/bundle-analyzer
```

**Configure**:
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
```

---

## Monitoring & Analytics

### 1. Vercel Analytics

**Enable in Dashboard**:
```
Project Settings > Analytics > Enable
```

**Add to Layout**:
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Error Tracking (Sentry - Optional)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### 3. Logging

**Vercel Logs**:
```
Dashboard > Project > Logs

Filter by:
- Function
- Status
- Time range
```

**Custom Logging**:
```typescript
// lib/logger.ts
export function log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  const timestamp = new Date().toISOString()
  console[level](`[${timestamp}] ${message}`, data)

  // In production, send to logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry, LogRocket, etc.
  }
}
```

---

## Backup Strategy

### 1. Database Backups

**Supabase (Automatic)**:
- Free tier: Daily backups (7 days retention)
- Point-in-time recovery

**Manual Backup**:
```bash
# Export schema
npx prisma db pull

# Export data
pg_dump $DATABASE_URL > backup.sql
```

### 2. Code Backups

**GitHub** (Primary):
- All code version controlled
- Push regularly

**Local Backups**:
```bash
git bundle create backup.bundle --all
```

---

## Security Checklist

**Before Going Live**:

- [ ] All environment variables in Vercel (not in code)
- [ ] NEXTAUTH_SECRET is strong (32+ characters)
- [ ] Database credentials are secure
- [ ] API keys are not exposed to client
- [ ] CORS configured properly
- [ ] Rate limiting enabled (if using Upstash)
- [ ] Input validation with Zod on all forms
- [ ] SQL injection protection (Prisma does this)
- [ ] XSS protection (sanitize user input)
- [ ] CSRF protection (NextAuth handles)
- [ ] HTTPS only (Vercel enforces)
- [ ] Security headers configured (next.config.js)
- [ ] Admin routes protected (middleware)
- [ ] File upload size limits
- [ ] Proper error handling (no stack traces in production)

---

## Cost Breakdown

### Free Tier (Portfolio/Demo)

```
Vercel:       $0/month
  - 100 GB bandwidth
  - 6000 build minutes
  - Serverless functions

Supabase:     $0/month
  - 500 MB database
  - 1 GB file storage
  - 2 GB bandwidth

Cloudinary:   $0/month
  - 25 GB storage
  - 25 GB bandwidth

Domain:       $12/year (optional)
  - .com domain

Total:        $0-1/month (domain only)
```

### Paid Tier (Production - if project grows)

```
Vercel Pro:   $20/month
  - 1 TB bandwidth
  - Unlimited build minutes
  - 60s function timeout

Supabase Pro: $25/month
  - 8 GB database
  - 100 GB storage
  - 250 GB bandwidth

Cloudinary:   $0 (free tier sufficient)

Domain:       $12/year

Total:        ~$45/month + domain
```

**Recommendation**: Start with free tier, upgrade only when needed.

---

## Maintenance

### Weekly Tasks

- [ ] Check Vercel logs for errors
- [ ] Monitor database size (Supabase dashboard)
- [ ] Check image storage usage (Cloudinary)
- [ ] Review analytics (traffic, performance)

### Monthly Tasks

- [ ] Update dependencies (`npm outdated`)
- [ ] Review security alerts (GitHub Dependabot)
- [ ] Backup database manually
- [ ] Check Vercel bandwidth usage

### As Needed

- [ ] Add new features
- [ ] Fix bugs
- [ ] Optimize performance
- [ ] Update content (cars, testimonials)

---

## Troubleshooting

### Common Issues

**1. Build Fails on Vercel**
```
Error: Prisma Client not generated

Fix:
- Add to package.json:
  "postinstall": "prisma generate"
```

**2. Database Connection Fails**
```
Error: Can't reach database server

Fix:
- Check DATABASE_URL in Vercel env vars
- Ensure Supabase project is active
- Use connection pooling URL for Vercel
```

**3. Images Not Loading**
```
Error: Invalid src prop

Fix:
- Add hostname to next.config.js remotePatterns
- Check Cloudinary cloud name
- Verify image URLs
```

**4. Auth Not Working**
```
Error: Invalid callback URL

Fix:
- Update NEXTAUTH_URL to production URL
- Add callback URL in Google OAuth settings
- Clear browser cache/cookies
```

**5. Server Actions Failing**
```
Error: Unauthorized

Fix:
- Check auth() session
- Verify middleware protecting routes
- Ensure user has correct role
```

---

## Deployment Checklist

**Before First Deploy**:

- [ ] All code committed to Git
- [ ] .env.local not in repository
- [ ] .env.example created with all vars
- [ ] Database schema finalized
- [ ] Seed data ready
- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Type checking passes
- [ ] ESLint passes

**Vercel Setup**:

- [ ] Project created in Vercel
- [ ] GitHub repository connected
- [ ] All environment variables added
- [ ] Build command configured
- [ ] Auto-deploy enabled

**Post-Deploy**:

- [ ] Visit production URL
- [ ] Test sign in/sign up
- [ ] Test car browsing
- [ ] Test admin panel
- [ ] Test checkout flow
- [ ] Check all images load
- [ ] Test on mobile device
- [ ] Run Lighthouse audit
- [ ] Check console for errors
- [ ] Verify analytics tracking

---

## Quick Start Commands

```bash
# Clone repository
git clone https://github.com/username/cars-online.git
cd cars-online

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your values

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Run development server
npm run dev

# Open browser
# http://localhost:3000

# Admin credentials (from seed):
# Email: admin@cars-online.com
# Password: admin123
```

---

## Resources

**Documentation**:
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- Tailwind: https://tailwindcss.com/docs
- Shadcn/ui: https://ui.shadcn.com

**Services**:
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Cloudinary: https://cloudinary.com/documentation

**Community**:
- Next.js Discord: https://nextjs.org/discord
- Prisma Slack: https://slack.prisma.io

---

## Conclusion

This deployment configuration provides:
- ✅ Free tier deployment (perfect for portfolio)
- ✅ Production-ready setup
- ✅ Scalable architecture
- ✅ Easy maintenance
- ✅ Professional infrastructure
- ✅ CI/CD pipeline
- ✅ Monitoring & analytics
- ✅ Secure by default
- ✅ Fast global performance
- ✅ Simple to upgrade when needed

**Total Setup Time**: 2-3 hours
**Monthly Cost**: $0 (free tier) or $45 (production tier)
**Perfect for**: Portfolio, freelancing showcase, MVP
