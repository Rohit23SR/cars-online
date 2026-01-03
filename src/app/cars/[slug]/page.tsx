import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCarBySlug } from '@/actions/car-actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatPrice, formatNumber, formatDate } from '@/lib/utils'
import FavoriteButton from '@/components/car/FavoriteButton'
import { ImageLightbox } from '@/components/car/ImageLightbox'
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  MapPin,
  Shield,
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react'

interface CarDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params
  const car = await getCarBySlug(slug)

  if (!car) {
    notFound()
  }

  const features = car.features as string[] || []
  const primaryImage = car.images.find(img => img.isPrimary) || car.images[0]
  const galleryImages = car.images.filter(img => !img.isPrimary)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 text-gray-900">
                {car.year} {car.make} {car.model}
              </h1>
              {car.variant && (
                <p className="text-base md:text-lg lg:text-xl text-gray-600">{car.variant}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 md:mt-3 text-xs md:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{car.location}</span>
                </div>
                {car._count && car._count.favorites > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{car._count.favorites} favorites</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
                {formatPrice(Number(car.price))}
              </div>
              {car.status !== 'AVAILABLE' && (
                <Badge className="mt-2 bg-red-500 text-xs md:text-sm">{car.status}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageLightbox images={car.images} />

            {/* Key Specs */}
            <Card>
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">Key Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Gauge className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="text-xs md:text-sm text-gray-500">Mileage</div>
                      <div className="text-sm md:text-base font-semibold text-gray-900">{formatNumber(car.mileage)} km</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Transmission</div>
                      <div className="font-semibold text-gray-900">{car.transmission}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Fuel className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Fuel Type</div>
                      <div className="font-semibold text-gray-900">{car.fuelType}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Palette className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Color</div>
                      <div className="font-semibold text-gray-900">{car.color}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="font-semibold text-gray-900">{car.year}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Body Type</div>
                      <div className="font-semibold text-gray-900">{car.bodyType}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specs">Full Specs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <p className="text-gray-700 whitespace-pre-line">
                      {car.description || 'No description available.'}
                    </p>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6">
                    {features.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-3">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-gray-900">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No features listed.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="specs" className="mt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Engine Size</span>
                        <span className="font-semibold text-gray-900">{car.engineSize || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Power</span>
                        <span className="font-semibold text-gray-900">{car.power || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Torque</span>
                        <span className="font-semibold text-gray-900">{car.torque || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Fuel Economy</span>
                        <span className="font-semibold text-gray-900">{car.fuelEconomy || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Doors</span>
                        <span className="font-semibold text-gray-900">{car.doors}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Seats</span>
                        <span className="font-semibold text-gray-900">{car.seats}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">VIN</span>
                        <span className="font-semibold font-mono text-sm text-gray-900">{car.vin}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Registration</span>
                        <span className="font-semibold text-gray-900">{car.registration || 'N/A'}</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Inspection */}
            {car.inspectionDate && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Inspection Report</h2>
                  <div className="flex items-center gap-2 text-green-600 mb-3">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Quality Inspected</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Inspection Date: {formatDate(car.inspectionDate)}</p>
                    {car.inspectionNotes && (
                      <p className="mt-2">{car.inspectionNotes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Price</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(Number(car.price))}
                    </div>
                  </div>

                  <Button asChild className="w-full" size="lg">
                    <Link href={`/checkout/${car.id}`}>
                      Reserve This Car
                    </Link>
                  </Button>

                  <div className="flex gap-2">
                    <FavoriteButton carId={car.id} variant="default" size="default" className="flex-1" />
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>7-Day Money Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Quality Inspected</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about this car? Our team is here to help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
