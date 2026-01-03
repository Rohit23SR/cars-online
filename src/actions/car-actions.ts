'use server'

import { prisma } from '@/lib/prisma'
import { CarWithImages, CarCardType } from '@/types'

export async function getFeaturedCars(limit = 8): Promise<CarCardType[]> {
  const cars = await prisma.car.findMany({
    where: {
      status: 'AVAILABLE',
      featured: true
    },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1
      },
      _count: {
        select: { favorites: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  })

  return cars.map(car => ({
    ...car,
    price: Number(car.price),
    _count: car._count
  }))
}

export async function getAllCars() {
  return prisma.car.findMany({
    where: { status: 'AVAILABLE' },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getCarBySlug(slug: string) {
  return prisma.car.findUnique({
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
}

export interface CarFilters {
  make?: string
  model?: string
  bodyType?: string
  fuelType?: string
  transmission?: string
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  minMileage?: number
  maxMileage?: number
  state?: string
  search?: string
}

export async function getFilteredCars(filters: CarFilters = {}) {
  const {
    make,
    model,
    bodyType,
    fuelType,
    transmission,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    state,
    search
  } = filters

  const where: any = {
    status: 'AVAILABLE'
  }

  if (make) where.make = make
  if (model) where.model = { contains: model, mode: 'insensitive' }
  if (bodyType) where.bodyType = bodyType
  if (fuelType) where.fuelType = fuelType
  if (transmission) where.transmission = transmission
  if (state) where.location = state

  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = minPrice
    if (maxPrice) where.price.lte = maxPrice
  }

  if (minYear || maxYear) {
    where.year = {}
    if (minYear) where.year.gte = minYear
    if (maxYear) where.year.lte = maxYear
  }

  if (minMileage || maxMileage) {
    where.mileage = {}
    if (minMileage) where.mileage.gte = minMileage
    if (maxMileage) where.mileage.lte = maxMileage
  }

  if (search) {
    where.OR = [
      { make: { contains: search, mode: 'insensitive' } },
      { model: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }

  const cars = await prisma.car.findMany({
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
    orderBy: { createdAt: 'desc' }
  })

  return cars.map(car => ({
    ...car,
    price: Number(car.price),
    _count: car._count
  }))
}
