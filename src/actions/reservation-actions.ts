'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export interface CreateReservationInput {
  carId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postcode: string
  deliveryDate: string
  // Mock payment info
  cardLast4?: string
}

export async function createReservation(input: CreateReservationInput) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'You must be logged in to create a reservation' }
    }

    // Check if car exists and is available
    const car = await prisma.car.findUnique({
      where: { id: input.carId },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    })

    if (!car) {
      return { success: false, error: 'Car not found' }
    }

    if (car.status !== 'AVAILABLE') {
      return { success: false, error: 'Car is no longer available' }
    }

    // Generate order number
    const orderNumber = generateOrderNumber()

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        orderNumber,
        userId: session.user.id,
        carId: input.carId,
        status: 'PENDING',
        customerName: `${input.firstName} ${input.lastName}`,
        customerEmail: input.email,
        customerPhone: input.phone,
        streetAddress: input.address,
        suburb: input.city,
        state: input.state,
        postcode: input.postcode,
        preferredInspectionDate: new Date(input.deliveryDate),
        paymentMethod: 'FULL_PAYMENT',
        carPrice: car.price,
        totalAmount: car.price,
        cardLast4: input.cardLast4,
      },
    })

    // Update car status to RESERVED
    await prisma.car.update({
      where: { id: input.carId },
      data: { status: 'RESERVED' },
    })

    // Revalidate relevant pages
    revalidatePath('/')
    revalidatePath('/cars')
    revalidatePath(`/cars/${car.slug}`)
    revalidatePath('/dashboard/reservations')

    return {
      success: true,
      reservation: {
        id: reservation.id,
        orderNumber: reservation.orderNumber,
        car: {
          make: car.make,
          model: car.model,
          year: car.year,
          image: car.images[0]?.url || null,
        },
        totalAmount: Number(reservation.totalAmount),
        deliveryDate: reservation.preferredInspectionDate?.toISOString() || new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error('Reservation error:', error)
    return { success: false, error: 'Failed to create reservation' }
  }
}

export async function getReservationByOrderNumber(orderNumber: string) {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { orderNumber },
      include: {
        car: {
          include: {
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
    })

    if (!reservation) {
      return null
    }

    return {
      id: reservation.id,
      orderNumber: reservation.orderNumber,
      status: reservation.status,
      car: {
        make: reservation.car.make,
        model: reservation.car.model,
        year: reservation.car.year,
        slug: reservation.car.slug,
        image: reservation.car.images[0]?.url || null,
      },
      customerName: reservation.customerName,
      email: reservation.customerEmail,
      phone: reservation.customerPhone,
      deliveryAddress: `${reservation.streetAddress}, ${reservation.suburb}, ${reservation.state} ${reservation.postcode}`,
      deliveryDate: reservation.preferredInspectionDate?.toISOString() || new Date().toISOString(),
      totalAmount: Number(reservation.totalAmount),
      createdAt: reservation.createdAt.toISOString(),
    }
  } catch (error) {
    console.error('Get reservation error:', error)
    return null
  }
}

/**
 * Get all reservations for current user
 */
export async function getUserReservations() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
        reservations: [],
      }
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        car: {
          include: {
            images: {
              where: { isPrimary: true },
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
      reservations: reservations.map((res) => ({
        id: res.id,
        orderNumber: res.orderNumber,
        status: res.status,
        car: {
          id: res.car.id,
          make: res.car.make,
          model: res.car.model,
          year: res.car.year,
          slug: res.car.slug,
          image: res.car.images[0]?.url || null,
        },
        totalAmount: Number(res.totalAmount),
        deliveryAddress: `${res.streetAddress}, ${res.suburb}, ${res.state} ${res.postcode}`,
        deliveryDate: res.preferredInspectionDate || res.createdAt,
        createdAt: res.createdAt,
      })),
    }
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return {
      success: false,
      error: 'Failed to fetch reservations',
      reservations: [],
    }
  }
}

/**
 * Cancel a reservation
 */
export async function cancelReservation(reservationId: string) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in',
      }
    }

    // Find reservation
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        car: true,
      },
    })

    if (!reservation) {
      return {
        success: false,
        error: 'Reservation not found',
      }
    }

    // Check ownership
    if (reservation.userId !== session.user.id) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Can only cancel pending or confirmed reservations
    if (!['PENDING', 'CONFIRMED', 'INSPECTION_SCHEDULED'].includes(reservation.status)) {
      return {
        success: false,
        error: 'This reservation cannot be cancelled',
      }
    }

    // Update reservation status
    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: 'CANCELLED',
      },
    })

    // Make car available again
    await prisma.car.update({
      where: {
        id: reservation.carId,
      },
      data: {
        status: 'AVAILABLE',
      },
    })

    revalidatePath('/dashboard/reservations')
    revalidatePath('/cars')
    revalidatePath(`/cars/${reservation.car.slug}`)

    return {
      success: true,
      message: 'Reservation cancelled successfully',
    }
  } catch (error) {
    console.error('Error cancelling reservation:', error)
    return {
      success: false,
      error: 'Failed to cancel reservation',
    }
  }
}
