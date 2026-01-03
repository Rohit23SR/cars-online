'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckoutStore } from '@/store/checkout-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { createReservation } from '@/actions/reservation-actions'
import { AUSTRALIAN_STATES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface CheckoutPageProps {
  params: Promise<{
    carId: string
  }>
}

// Mock car data fetching - in production, this would fetch from the database
async function getCarForCheckout(carId: string) {
  // For now, return mock data - you'd fetch from database in production
  return {
    id: carId,
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
  }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { currentStep, formData, setFormData, nextStep, previousStep, setCarId, reset } = useCheckoutStore()
  const [car, setCar] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setCarId(resolvedParams.carId)
    getCarForCheckout(resolvedParams.carId).then((data) => {
      setCar(data)
      setLoading(false)
    })
  }, [resolvedParams.carId, setCarId])

  const handleNext = () => {
    if (validateCurrentStep()) {
      nextStep()
    }
  }

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error('Please fill in all contact information')
        return false
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error('Please enter a valid email address')
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.postcode || !formData.deliveryDate) {
        toast.error('Please fill in all delivery details')
        return false
      }
    }
    return true
  }

  const handleSubmit = async () => {
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all payment details')
      return
    }

    setSubmitting(true)

    try {
      const result = await createReservation({
        carId: resolvedParams.carId,
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        email: formData.email!,
        phone: formData.phone!,
        address: formData.address!,
        city: formData.city!,
        state: formData.state!,
        postcode: formData.postcode!,
        deliveryDate: formData.deliveryDate!,
        paymentMethod: 'card',
      })

      if (result.success && result.reservation) {
        toast.success('Reservation created successfully!')
        reset()
        router.push(`/checkout/success?orderNumber=${result.reservation.orderNumber}`)
      } else {
        toast.error(result.error || 'Failed to create reservation')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Reservation</h1>
          <p className="text-gray-600">
            {car.year} {car.make} {car.model}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > step
                        ? 'bg-green-600 text-white'
                        : currentStep === step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step ? <Check className="h-5 w-5" /> : step}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">
                      {step === 1 && 'Contact'}
                      {step === 2 && 'Delivery'}
                      {step === 3 && 'Payment'}
                    </div>
                  </div>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 ${currentStep > step ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && 'Contact Information'}
                  {currentStep === 2 && 'Delivery Details'}
                  {currentStep === 3 && 'Payment & Review'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName || ''}
                          onChange={(e) => setFormData({ firstName: e.target.value })}
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName || ''}
                          onChange={(e) => setFormData({ lastName: e.target.value })}
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ email: e.target.value })}
                        placeholder="john.smith@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ phone: e.target.value })}
                        placeholder="0412 345 678"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Delivery Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ address: e.target.value })}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city || ''}
                          onChange={(e) => setFormData({ city: e.target.value })}
                          placeholder="Sydney"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state || ''} onValueChange={(value) => setFormData({ state: value })}>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {AUSTRALIAN_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode *</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode || ''}
                        onChange={(e) => setFormData({ postcode: e.target.value })}
                        placeholder="2000"
                        maxLength={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Preferred Delivery Date *</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate || ''}
                        onChange={(e) => setFormData({ deliveryDate: e.target.value })}
                        min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      />
                      <p className="text-xs text-gray-500">Delivery available 7+ days from today</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
                      <Textarea
                        id="deliveryNotes"
                        value={formData.deliveryNotes || ''}
                        onChange={(e) => setFormData({ deliveryNotes: e.target.value })}
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment & Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Demo Mode:</strong> This is a mock checkout. No real payment will be processed.
                        Use any test card details.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber || ''}
                          onChange={(e) => setFormData({ cardNumber: e.target.value })}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName || ''}
                          onChange={(e) => setFormData({ cardName: e.target.value })}
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate || ''}
                            onChange={(e) => setFormData({ expiryDate: e.target.value })}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv || ''}
                            onChange={(e) => setFormData({ cvv: e.target.value })}
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-3">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contact</span>
                          <span>
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email</span>
                          <span>{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery</span>
                          <span>
                            {formData.city}, {formData.state} {formData.postcode}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery Date</span>
                          <span>{formData.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={previousStep} disabled={submitting}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <div className="flex-1" />
                  {currentStep < 3 ? (
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Complete Reservation'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                  <Image src={car.image} alt={`${car.year} ${car.make} ${car.model}`} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {car.year} {car.make} {car.model}
                  </h3>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Price</span>
                    <span className="font-semibold">{formatPrice(car.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">{formatPrice(car.price)}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>7-Day Money Back Guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
