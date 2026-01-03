import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CarCard } from '@/components/car/CarCard'
import { getFeaturedCars } from '@/actions/car-actions'
import { CheckCircle, Shield, Truck, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const featuredCars = await getFeaturedCars(8)

  // Serialize non-plain objects for client components
  const serializedCars = featuredCars.map(car => ({
    ...car,
    price: car.price.toString(),
    createdAt: car.createdAt.toISOString(),
    updatedAt: car.updatedAt.toISOString(),
    inspectionDate: car.inspectionDate ? car.inspectionDate.toISOString() : null
  }))

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 text-xs md:text-sm">
              Premium Used Cars
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Find Your Perfect Ride
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-blue-100">
              Quality inspected used cars with 7-day guarantee. Buy with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base">
                <Link href="/cars">
                  Browse Cars <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 text-white hover:bg-white hover:text-blue-600 border-2 border-white/30 hover:border-white font-semibold shadow-lg hover:shadow-xl transition-all backdrop-blur-sm text-sm md:text-base">
                <Link href="/sell">Sell Your Car</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2 text-gray-900">7-Day Guarantee</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Not happy? Return it within 7 days for a full refund. No questions asked.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2 text-gray-900">Quality Inspected</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Every car undergoes rigorous inspection to ensure top quality and safety.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2 text-gray-900">Free Delivery</h3>
                <p className="text-sm md:text-base text-gray-600">
                  We deliver your car straight to your door at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 text-gray-900">Featured Cars</h2>
              <p className="text-sm md:text-base text-gray-600">Hand-picked premium vehicles for you</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl text-sm md:text-base">
              <Link href="/cars">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {serializedCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {serializedCars.map((car, index) => (
                <CarCard key={car.id} car={car} priority={index < 4} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base md:text-lg">No featured cars available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-gray-900">How It Works</h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">Buy your dream car in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-900">Browse & Choose</h3>
              <p className="text-sm md:text-base text-gray-600">
                Browse our extensive collection of quality inspected used cars and find your perfect match.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-900">Reserve Online</h3>
              <p className="text-sm md:text-base text-gray-600">
                Complete the simple online reservation process and secure your car instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-900">Get Delivered</h3>
              <p className="text-sm md:text-base text-gray-600">
                Sit back and relax. We'll deliver your car to your doorstep, free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Start browsing our collection of quality used cars today and drive home happy.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-sm md:text-base">
            <Link href="/cars">
              Browse All Cars <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
