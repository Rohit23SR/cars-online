import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getReservationByOrderNumber } from '@/actions/reservation-actions'
import { formatPrice, formatDate } from '@/lib/utils'
import { CheckCircle, Download, Home, Car, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface SuccessPageProps {
  searchParams: Promise<{
    orderNumber?: string
  }>
}

async function ReservationDetails({ orderNumber }: { orderNumber: string }) {
  const reservation = await getReservationByOrderNumber(orderNumber)

  if (!reservation) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Reservation Confirmed!</h1>
        <p className="text-lg text-gray-600">Thank you for your reservation</p>
      </div>

      {/* Order Number */}
      <Card className="border-2 border-green-500 bg-green-50">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Order Number</p>
          <p className="text-2xl font-bold text-green-700">{reservation.orderNumber}</p>
          <p className="text-xs text-gray-500 mt-2">
            Save this number for your records. A confirmation email has been sent to {reservation.email}
          </p>
        </CardContent>
      </Card>

      {/* Car Details */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
          <div className="flex gap-4">
            {reservation.car.image && (
              <div className="relative w-32 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={reservation.car.image}
                  alt={`${reservation.car.year} ${reservation.car.make} ${reservation.car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {reservation.car.year} {reservation.car.make} {reservation.car.model}
              </h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{formatPrice(reservation.totalAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="font-medium">{reservation.deliveryAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery Date</p>
              <p className="font-medium">{formatDate(reservation.deliveryDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact Number</p>
              <p className="font-medium">{reservation.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Confirmation Email</h3>
                <p className="text-sm text-gray-600">
                  You'll receive a confirmation email with all the details of your reservation.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Final Inspection</h3>
                <p className="text-sm text-gray-600">
                  Your vehicle will undergo a final quality inspection before delivery.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Delivery Coordination</h3>
                <p className="text-sm text-gray-600">
                  Our team will contact you 48 hours before delivery to confirm the details.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                4
              </div>
              <div>
                <h3 className="font-semibold">Enjoy Your New Car!</h3>
                <p className="text-sm text-gray-600">
                  Your vehicle will be delivered to your door. Don't forget - you have a 7-day money-back guarantee!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/cars">
            <Car className="h-4 w-4 mr-2" />
            Browse More Cars
          </Link>
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-gray-700 mb-4">
            If you have any questions about your reservation, please don't hesitate to contact us.
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    </div>
  )
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const orderNumber = params.orderNumber

  if (!orderNumber) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Suspense fallback={<LoadingSkeleton />}>
          <ReservationDetails orderNumber={orderNumber} />
        </Suspense>
      </div>
    </div>
  )
}
