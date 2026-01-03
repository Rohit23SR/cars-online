'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatNumber } from '@/lib/utils'
import { Heart } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { CarCardType } from '@/types'

const FavoriteButton = dynamic(() => import('./FavoriteButton'), {
  ssr: false,
  loading: () => (
    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-gray-400" disabled>
      <Heart className="h-5 w-5" />
    </button>
  )
})

interface CarCardProps {
  car: CarCardType
  priority?: boolean
}

export function CarCard({ car, priority = false }: CarCardProps) {
  const primaryImage = car.images[0]
  const imageUrl = primaryImage?.url || '/placeholder-car.jpg'

  return (
    <div className="car-card group relative h-full rounded-2xl bg-white transition-all duration-500 hover:-translate-y-1">
      <Link href={`/cars/${car.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-50">
          <Image
            src={imageUrl}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {car.status !== 'AVAILABLE' && (
            <Badge className="absolute top-3 left-3 bg-red-500 border-0 shadow-lg backdrop-blur-sm">
              {car.status}
            </Badge>
          )}
          {/* Favorite button in top-right */}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton carId={car.id} />
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-1 text-gray-900 tracking-tight">
            {car.year} {car.make} {car.model}
          </h3>

          <div className="flex items-baseline gap-2 mb-4">
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {formatPrice(Number(car.price))}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 mb-4">
            <span className="font-medium">{formatNumber(car.mileage)} km</span>
            <span className="text-gray-300">•</span>
            <span className="font-medium">{car.transmission}</span>
            <span className="text-gray-300">•</span>
            <span className="font-medium">{car.fuelType}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50 font-medium">
              ✓ 7-Day Guarantee
            </Badge>
            {car._count && car._count.favorites > 0 && (
              <div className="flex items-center gap-1 text-gray-400">
                <Heart className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{car._count.favorites}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
