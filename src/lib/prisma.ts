import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
  connectionString: string | undefined
}

const currentConnectionString = process.env.DATABASE_URL

if (!globalForPrisma.pool || globalForPrisma.connectionString !== currentConnectionString) {
  if (globalForPrisma.pool) {
    globalForPrisma.pool.end()
  }
  globalForPrisma.pool = new Pool({ connectionString: currentConnectionString })
  globalForPrisma.connectionString = currentConnectionString
  if (globalForPrisma.prisma) {
    globalForPrisma.prisma.$disconnect()
    globalForPrisma.prisma = undefined
  }
}

const pool = globalForPrisma.pool
const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
