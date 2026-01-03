'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

interface UpdateProfileInput {
  name?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  postcode?: string
}

/**
 * Update user profile information
 */
export async function updateProfile(data: UpdateProfileInput) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to update your profile',
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        postcode: data.postcode,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        postcode: true,
      },
    })

    // Revalidate pages
    revalidatePath('/dashboard/settings')
    revalidatePath('/dashboard')

    return {
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    return {
      success: false,
      error: 'Failed to update profile',
    }
  }
}

interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

/**
 * Change user password
 */
export async function changePassword(data: ChangePasswordInput) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
      }
    }

    // Get user with hashed password
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        hashedPassword: true,
      },
    })

    if (!user || !user.hashedPassword) {
      return {
        success: false,
        error: 'User not found or using OAuth login',
      }
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.hashedPassword
    )

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Current password is incorrect',
      }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(data.newPassword, 12)

    // Update password
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
      },
    })

    return {
      success: true,
      message: 'Password updated successfully',
    }
  } catch (error) {
    console.error('Error changing password:', error)
    return {
      success: false,
      error: 'Failed to change password',
    }
  }
}

/**
 * Get user profile
 */
export async function getUserProfile() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
        user: null,
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        postcode: true,
        image: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        user: null,
      }
    }

    return {
      success: true,
      user,
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return {
      success: false,
      error: 'Failed to fetch profile',
      user: null,
    }
  }
}

/**
 * Get user statistics (for dashboard)
 */
export async function getUserStats() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
        stats: null,
      }
    }

    // Get all stats in parallel
    const [favoritesCount, reservationsCount, activeReservationsCount] = await Promise.all([
      // Count favorites
      prisma.favorite.count({
        where: {
          userId: session.user.id,
        },
      }),

      // Count all reservations
      prisma.reservation.count({
        where: {
          userId: session.user.id,
        },
      }),

      // Count active reservations (not completed or cancelled)
      prisma.reservation.count({
        where: {
          userId: session.user.id,
          status: {
            in: ['PENDING', 'CONFIRMED', 'INSPECTION_SCHEDULED'],
          },
        },
      }),
    ])

    return {
      success: true,
      stats: {
        favorites: favoritesCount,
        reservations: reservationsCount,
        activeReservations: activeReservationsCount,
        // For demo purposes, we'll use a mock value for viewed cars
        viewedCars: Math.floor(Math.random() * 20) + 5,
      },
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return {
      success: false,
      error: 'Failed to fetch statistics',
      stats: null,
    }
  }
}

/**
 * Get recent activity for dashboard
 */
export async function getRecentActivity() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
        activities: [],
      }
    }

    // Get recent favorites
    const recentFavorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        car: {
          select: {
            year: true,
            make: true,
            model: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    })

    // Get recent reservations
    const recentReservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        car: {
          select: {
            year: true,
            make: true,
            model: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    })

    // Combine and sort activities
    const activities = [
      ...recentFavorites.map((fav) => ({
        type: 'favorite' as const,
        car: `${fav.car.year} ${fav.car.make} ${fav.car.model}`,
        date: fav.createdAt,
      })),
      ...recentReservations.map((res) => ({
        type: 'reservation' as const,
        car: `${res.car.year} ${res.car.make} ${res.car.model}`,
        date: res.createdAt,
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10)

    return {
      success: true,
      activities: activities.map((activity) => ({
        ...activity,
        date: formatRelativeDate(activity.date),
      })),
    }
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return {
      success: false,
      error: 'Failed to fetch activity',
      activities: [],
    }
  }
}

/**
 * Helper function to format relative dates
 */
function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}
