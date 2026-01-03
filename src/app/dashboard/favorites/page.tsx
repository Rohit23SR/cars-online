import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Car, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { getUserFavorites } from '@/actions/favorite-actions'
import RemoveFavoriteButton from './remove-favorite-button'

export default async function FavoritesPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard/favorites')
  }

  // Fetch real favorites from database
  const favoritesResult = await getUserFavorites()
  const favorites = favoritesResult.success ? favoritesResult.favorites : []

  const formatPrice = (price: any) => {
    const numPrice = typeof price === 'number' ? price : Number(price)
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(numPrice)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-AU').format(num)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
            My Favorites
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'car' : 'cars'} saved for later
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <Heart className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Start adding cars to your favorites to keep track of the ones you like!
              </p>
              <Button asChild className="text-sm md:text-base">
                <Link href="/cars">
                  <Car className="mr-2 h-4 w-4" />
                  Browse Cars
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <Link href={`/cars/${favorite.car.slug}`} className="relative md:w-80 h-64 md:h-auto bg-gray-100 flex-shrink-0">
                    {favorite.car.image ? (
                      <Image
                        src={favorite.car.image}
                        alt={`${favorite.car.year} ${favorite.car.make} ${favorite.car.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    {favorite.car.status !== 'AVAILABLE' && (
                      <Badge className="absolute top-3 left-3 bg-red-500 border-0 shadow-lg">
                        {favorite.car.status}
                      </Badge>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex-1 flex flex-col md:flex-row">
                    {/* Details */}
                    <div className="flex-1 p-4 md:p-6">
                      <Link href={`/cars/${favorite.car.slug}`} className="group/title">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 group-hover/title:text-blue-600 transition-colors">
                          {favorite.car.year} {favorite.car.make} {favorite.car.model}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">{formatNumber(favorite.car.mileage)} km</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">{favorite.car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <span className="font-semibold text-gray-900">{favorite.car.fuelType}</span>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-gray-500 flex items-center gap-2">
                        <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500 fill-red-500" />
                        Added {favorite.createdAt.toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="p-4 md:p-6 flex flex-col justify-between md:w-64 bg-gradient-to-br from-gray-50 to-white">
                      <div className="mb-3 md:mb-4">
                        <p className="text-xs md:text-sm font-medium text-gray-500 mb-1 md:mb-2">Price</p>
                        <p className="text-2xl md:text-3xl font-bold text-blue-600">
                          {formatPrice(favorite.car.price)}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {favorite.car.status === 'AVAILABLE' ? (
                          <>
                            <Button asChild className="w-full rounded-xl h-11 font-semibold shadow-md hover:shadow-lg transition-all">
                              <Link href={`/cars/${favorite.car.slug}`}>
                                View Details
                              </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full rounded-xl h-11 font-semibold border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all">
                              <Link href={`/checkout/${favorite.carId}`}>
                                Reserve Now
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <Button asChild className="w-full rounded-xl h-11 font-semibold">
                            <Link href={`/cars/${favorite.car.slug}`}>
                              View Details
                            </Link>
                          </Button>
                        )}
                        <RemoveFavoriteButton carId={favorite.carId} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Browse More */}
        {favorites.length > 0 && (
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/cars">
                <Car className="mr-2 h-5 w-5" />
                Browse More Cars
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
