import { Suspense } from 'react'
import { CarCard } from '@/components/car/CarCard'
import { CarCardSkeleton } from '@/components/car/CarCardSkeleton'
import { CarFilters } from '@/components/car/CarFilters'
import { getFilteredCars, type CarFilters as Filters } from '@/actions/car-actions'

interface SearchParams {
  search?: string
  make?: string
  bodyType?: string
  fuelType?: string
  transmission?: string
  state?: string
  minPrice?: string
  maxPrice?: string
  minYear?: string
  maxYear?: string
}

interface CarsPageProps {
  searchParams: Promise<SearchParams>
}

async function CarsList({ filters }: { filters: Filters }) {
  const cars = await getFilteredCars(filters)

  if (cars.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-base md:text-lg text-gray-500">No cars found matching your criteria.</p>
        <p className="text-xs md:text-sm text-gray-400 mt-2">Try adjusting your filters</p>
      </div>
    )
  }

  // Serialize non-plain objects for client components
  const serializedCars = cars.map(car => ({
    ...car,
    price: car.price.toString(),
    createdAt: car.createdAt.toISOString(),
    updatedAt: car.updatedAt.toISOString(),
    inspectionDate: car.inspectionDate ? car.inspectionDate.toISOString() : null
  }))

  return (
    <>
      {serializedCars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </>
  )
}

function CarsSkeleton() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </>
  )
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams

  const filters: Filters = {
    search: params.search,
    make: params.make,
    bodyType: params.bodyType,
    fuelType: params.fuelType,
    transmission: params.transmission,
    state: params.state,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minYear: params.minYear ? Number(params.minYear) : undefined,
    maxYear: params.maxYear ? Number(params.maxYear) : undefined,
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 text-gray-900">Browse Cars</h1>
        <p className="text-sm md:text-base text-gray-600">Find your perfect car from our collection</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4">
            <CarFilters />
          </div>
        </aside>

        {/* Cars Grid */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Suspense fallback={<CarsSkeleton />}>
              <CarsList filters={filters} />
            </Suspense>
          </div>
        </main>
      </div>
      </div>
    </div>
  )
}
