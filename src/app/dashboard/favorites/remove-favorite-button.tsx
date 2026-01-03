'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { removeFromFavorites } from '@/actions/favorite-actions'
import { toast } from 'sonner'

interface RemoveFavoriteButtonProps {
  carId: string
}

export default function RemoveFavoriteButton({ carId }: RemoveFavoriteButtonProps) {
  const [removing, setRemoving] = useState(false)

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove this car from your favorites?')) {
      return
    }

    setRemoving(true)
    try {
      const result = await removeFromFavorites(carId)

      if (result.success) {
        toast.success(result.message || 'Removed from favorites')
      } else {
        toast.error(result.error || 'Failed to remove from favorites')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setRemoving(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl h-11 font-semibold transition-all"
      onClick={handleRemove}
      disabled={removing}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {removing ? 'Removing...' : 'Remove'}
    </Button>
  )
}
