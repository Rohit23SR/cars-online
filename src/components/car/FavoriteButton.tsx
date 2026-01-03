'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleFavorite, isCarFavorited } from '@/actions/favorite-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface FavoriteButtonProps {
  carId: string
  initialIsFavorited?: boolean
  variant?: 'default' | 'icon'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function FavoriteButton({
  carId,
  initialIsFavorited = false,
  variant = 'icon',
  size = 'icon',
  className = '',
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check favorite status on mount
  useEffect(() => {
    const checkStatus = async () => {
      const result = await isCarFavorited(carId)
      if (result.success) {
        setIsFavorited(result.isFavorited)
      }
    }
    checkStatus()
  }, [carId])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)
    try {
      const result = await toggleFavorite(carId)

      if (result.success) {
        setIsFavorited(result.isFavorited)
        toast.success('message' in result && result.message ? result.message : (result.isFavorited ? 'Added to favorites' : 'Removed from favorites'))
        router.refresh()
      } else {
        // If not logged in, redirect to sign in
        if (result.error?.includes('logged in')) {
          toast.error('Please sign in to add favorites')
          router.push('/auth/signin?callbackUrl=' + window.location.pathname)
        } else {
          toast.error(result.error || 'Failed to update favorites')
        }
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size={size}
        className={`${className} ${isFavorited ? 'text-red-600 hover:text-red-700' : 'text-gray-400 hover:text-red-600'}`}
        onClick={handleToggle}
        disabled={loading}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
      </Button>
    )
  }

  return (
    <Button
      variant={variant === 'default' ? 'outline' : 'ghost'}
      size={size}
      className={className}
      onClick={handleToggle}
      disabled={loading}
    >
      <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-current text-red-600' : ''}`} />
      {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  )
}
