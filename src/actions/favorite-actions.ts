'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Add a car to user's favorites
 */
export async function addToFavorites(carId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to add favorites',
      }
    }

    // Check if car exists
    const car = await prisma.car.findUnique({
      where: { id: carId },
      select: { id: true, make: true, model: true, year: true },
    })

    if (!car) {
      return {
        success: false,
        error: 'Car not found',
      }
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId: session.user.id,
          carId: carId,
        },
      },
    })

    if (existing) {
      return {
        success: false,
        error: 'Car is already in your favorites',
      }
    }

    // Create favorite
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        carId: carId,
      },
    })

    // Revalidate relevant pages
    revalidatePath('/dashboard/favorites')
    revalidatePath('/cars')
    revalidatePath(`/cars/${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}`)

    return {
      success: true,
      message: `${car.year} ${car.make} ${car.model} added to favorites`,
    }
  } catch (error) {
    console.error('Error adding to favorites:', error)
    return {
      success: false,
      error: 'Failed to add to favorites',
    }
  }
}

/**
 * Remove a car from user's favorites
 */
export async function removeFromFavorites(carId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
      }
    }

    // Find and delete favorite
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId: session.user.id,
          carId: carId,
        },
      },
      include: {
        car: {
          select: {
            make: true,
            model: true,
            year: true,
          },
        },
      },
    })

    if (!favorite) {
      return {
        success: false,
        error: 'Favorite not found',
      }
    }

    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    })

    // Revalidate relevant pages
    revalidatePath('/dashboard/favorites')
    revalidatePath('/cars')

    return {
      success: true,
      message: `${favorite.car.year} ${favorite.car.make} ${favorite.car.model} removed from favorites`,
    }
  } catch (error) {
    console.error('Error removing from favorites:', error)
    return {
      success: false,
      error: 'Failed to remove from favorites',
    }
  }
}

/**
 * Toggle favorite status for a car
 */
export async function toggleFavorite(carId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
        isFavorited: false,
      }
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId: session.user.id,
          carId: carId,
        },
      },
    })

    if (existing) {
      // Remove favorite
      const result = await removeFromFavorites(carId)
      return {
        ...result,
        isFavorited: false,
      }
    } else {
      // Add favorite
      const result = await addToFavorites(carId)
      return {
        ...result,
        isFavorited: true,
      }
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return {
      success: false,
      error: 'Failed to toggle favorite',
      isFavorited: false,
    }
  }
}

/**
 * Get all favorites for current user
 */
export async function getUserFavorites() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
        favorites: [],
      }
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        car: {
          include: {
            images: {
              where: {
                isPrimary: true,
              },
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      success: true,
      favorites: favorites.map((fav) => ({
        id: fav.id,
        carId: fav.car.id,
        car: {
          ...fav.car,
          // Use primary image or fallback to first image
          image: fav.car.images[0]?.url || null,
        },
        createdAt: fav.createdAt,
      })),
    }
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return {
      success: false,
      error: 'Failed to fetch favorites',
      favorites: [],
    }
  }
}

/**
 * Check if a car is favorited by current user
 */
export async function isCarFavorited(carId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: true,
        isFavorited: false,
      }
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_carId: {
          userId: session.user.id,
          carId: carId,
        },
      },
    })

    return {
      success: true,
      isFavorited: !!favorite,
    }
  } catch (error) {
    console.error('Error checking favorite status:', error)
    return {
      success: false,
      error: 'Failed to check favorite status',
      isFavorited: false,
    }
  }
}

/**
 * Get favorites count for current user
 */
export async function getFavoritesCount() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: true,
        count: 0,
      }
    }

    const count = await prisma.favorite.count({
      where: {
        userId: session.user.id,
      },
    })

    return {
      success: true,
      count,
    }
  } catch (error) {
    console.error('Error counting favorites:', error)
    return {
      success: false,
      error: 'Failed to count favorites',
      count: 0,
    }
  }
}
