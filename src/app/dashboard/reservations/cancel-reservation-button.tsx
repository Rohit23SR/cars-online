'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cancelReservation } from '@/actions/reservation-actions'
import { toast } from 'sonner'

interface CancelReservationButtonProps {
  reservationId: string
}

export default function CancelReservationButton({ reservationId }: CancelReservationButtonProps) {
  const [cancelling, setCancelling] = useState(false)

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this reservation? The car will become available again.')) {
      return
    }

    setCancelling(true)
    try {
      const result = await cancelReservation(reservationId)

      if (result.success) {
        toast.success(result.message || 'Reservation cancelled successfully')
      } else {
        toast.error(result.error || 'Failed to cancel reservation')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
      onClick={handleCancel}
      disabled={cancelling}
    >
      {cancelling ? 'Cancelling...' : 'Cancel Order'}
    </Button>
  )
}
