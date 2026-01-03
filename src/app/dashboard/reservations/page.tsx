import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Package, Calendar, MapPin, Download, Eye } from 'lucide-react'
import Image from 'next/image'
import { getUserReservations } from '@/actions/reservation-actions'
import CancelReservationButton from './cancel-reservation-button'

export default async function ReservationsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard/reservations')
  }

  // Fetch real reservations from database
  const reservationsResult = await getUserReservations()
  const reservations = reservationsResult.success ? reservationsResult.reservations : []

  const formatPrice = (price: any) => {
    const numPrice = typeof price === 'number' ? price : Number(price)
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(numPrice)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: 'Pending', className: 'bg-yellow-500' },
      CONFIRMED: { label: 'Confirmed', className: 'bg-blue-500' },
      IN_TRANSIT: { label: 'In Transit', className: 'bg-purple-500' },
      DELIVERED: { label: 'Delivered', className: 'bg-green-500' },
      COMPLETED: { label: 'Completed', className: 'bg-gray-500' },
      CANCELLED: { label: 'Cancelled', className: 'bg-red-500' },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING

    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            My Reservations
          </h1>
          <p className="text-gray-600">
            Track your car purchases and deliveries
          </p>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No reservations yet</h3>
              <p className="text-gray-600 mb-6">
                When you reserve a car, it will appear here so you can track your order.
              </p>
              <Button asChild>
                <Link href="/cars">Browse Cars</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600">Order Number</p>
                        <p className="font-mono font-semibold">{reservation.orderNumber}</p>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Placed on {formatDate(reservation.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/cars/${reservation.car.slug}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Car
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Car Info */}
                    <div className="flex gap-4">
                      <div className="relative w-24 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {reservation.car.image ? (
                          <Image
                            src={reservation.car.image}
                            alt={`${reservation.car.year} ${reservation.car.make} ${reservation.car.model}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="h-8 w-8 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          {reservation.car.year} {reservation.car.make} {reservation.car.model}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatPrice(reservation.totalAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div>
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                          <p className="text-sm">{reservation.deliveryAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Delivery Date</p>
                          <p className="text-sm font-medium">{formatDate(reservation.deliveryDate)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col justify-between">
                      {reservation.status === 'PENDING' && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500">25%</span>
                          </div>
                          <p className="text-xs text-gray-600">
                            Your order is being processed. We'll contact you soon!
                          </p>
                        </div>
                      )}

                      {reservation.status === 'COMPLETED' && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-green-800 font-medium">
                            ✓ Delivered on {formatDate(reservation.deliveryDate)}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href="/contact">Contact Support</Link>
                        </Button>
                        {['PENDING', 'CONFIRMED', 'INSPECTION_SCHEDULED'].includes(reservation.status) && (
                          <CancelReservationButton reservationId={reservation.id} />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        {reservations.length > 0 && (
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                If you have any questions about your reservation or delivery, our support team is here to help.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
