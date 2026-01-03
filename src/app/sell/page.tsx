'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sellCarSchema } from '@/lib/validations'
import * as z from 'zod'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CAR_MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSION_TYPES, AUSTRALIAN_STATES } from '@/lib/constants'
import { toast } from 'sonner'
import {
  DollarSign,
  Clock,
  Shield,
  CheckCircle,
  Upload,
  Car,
  Sparkles,
  AlertCircle,
  X,
  Image as ImageIcon
} from 'lucide-react'
import Image from 'next/image'

type SellCarFormData = z.infer<typeof sellCarSchema>

export default function SellPage() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SellCarFormData>({
    resolver: zodResolver(sellCarSchema),
    defaultValues: {
      make: '',
      model: '',
      year: '',
      variant: '',
      mileage: '',
      transmission: '',
      fuelType: '',
      bodyType: '',
      color: '',
      vin: '',
      registration: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: '',
      condition: '',
      serviceHistory: '',
      additionalInfo: ''
    }
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 35 }, (_, i) => (currentYear - i).toString())

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)

    // Convert files to base64 for preview (in production, upload to cloud storage)
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image Too Large', {
          description: `${file.name} exceeds 5MB limit`,
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })

    setUploading(false)
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: SellCarFormData) => {
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Valuation Request Submitted!', {
      description: `We'll contact you at ${data.email} within 24 hours with a competitive offer for your ${data.year} ${data.make} ${data.model}.`,
      duration: 6000,
    })

    // Reset form
    reset()
    setImages([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-0">
              Quick & Easy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sell Your Car in Minutes
            </h1>
            <p className="text-xl text-green-100">
              Get a free instant valuation and sell your car hassle-free. No hidden fees, no pushy negotiations.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="container mx-auto px-4 -mt-16 mb-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Best Market Price</h3>
              <p className="text-sm text-gray-600">
                Get top dollar for your car with our competitive pricing
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Quick Process</h3>
              <p className="text-sm text-gray-600">
                Get your valuation within 24 hours, payment in 48 hours
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm text-gray-600">
                We handle all paperwork and ensure a smooth transaction
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Form */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Get Your Free Valuation</CardTitle>
              <p className="text-gray-600">
                Fill in the details below and we'll get back to you with a competitive offer. Fields marked with <span className="text-red-500">*</span> are required.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Car Details Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Car className="h-5 w-5 text-green-600" />
                    Vehicle Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Make */}
                    <div className="space-y-2">
                      <Label htmlFor="make" className="text-sm font-semibold text-gray-700">
                        Make <span className="text-red-500">*</span>
                      </Label>
                      <Select value={watch('make')} onValueChange={(value) => setValue('make', value, { shouldValidate: true })}>
                        <SelectTrigger id="make" className={errors.make ? 'border-red-500 focus-visible:ring-red-500' : ''}>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          {CAR_MAKES.map((make) => (
                            <SelectItem key={make} value={make}>
                              {make}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.make && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.make.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Model */}
                    <div className="space-y-2">
                      <Label htmlFor="model" className="text-sm font-semibold text-gray-700">
                        Model <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="model"
                        placeholder="e.g., Camry"
                        className={errors.model ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('model')}
                      />
                      {errors.model && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.model.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Year */}
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-sm font-semibold text-gray-700">
                        Year <span className="text-red-500">*</span>
                      </Label>
                      <Select value={watch('year')} onValueChange={(value) => setValue('year', value, { shouldValidate: true })}>
                        <SelectTrigger id="year" className={errors.year ? 'border-red-500 focus-visible:ring-red-500' : ''}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.year && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.year.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Variant */}
                    <div className="space-y-2">
                      <Label htmlFor="variant" className="text-sm font-semibold text-gray-700">Variant</Label>
                      <Input
                        id="variant"
                        placeholder="e.g., Ascent Sport"
                        {...register('variant')}
                      />
                    </div>

                    {/* Mileage */}
                    <div className="space-y-2">
                      <Label htmlFor="mileage" className="text-sm font-semibold text-gray-700">Mileage (km)</Label>
                      <Input
                        id="mileage"
                        type="number"
                        placeholder="e.g., 45000"
                        {...register('mileage')}
                      />
                    </div>

                    {/* Transmission */}
                    <div className="space-y-2">
                      <Label htmlFor="transmission" className="text-sm font-semibold text-gray-700">Transmission</Label>
                      <Select value={watch('transmission')} onValueChange={(value) => setValue('transmission', value)}>
                        <SelectTrigger id="transmission">
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          {TRANSMISSION_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fuel Type */}
                    <div className="space-y-2">
                      <Label htmlFor="fuelType" className="text-sm font-semibold text-gray-700">Fuel Type</Label>
                      <Select value={watch('fuelType')} onValueChange={(value) => setValue('fuelType', value)}>
                        <SelectTrigger id="fuelType">
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {FUEL_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Body Type */}
                    <div className="space-y-2">
                      <Label htmlFor="bodyType" className="text-sm font-semibold text-gray-700">Body Type</Label>
                      <Select value={watch('bodyType')} onValueChange={(value) => setValue('bodyType', value)}>
                        <SelectTrigger id="bodyType">
                          <SelectValue placeholder="Select body type" />
                        </SelectTrigger>
                        <SelectContent>
                          {BODY_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Color */}
                    <div className="space-y-2">
                      <Label htmlFor="color" className="text-sm font-semibold text-gray-700">Color</Label>
                      <Input
                        id="color"
                        placeholder="e.g., White"
                        {...register('color')}
                      />
                    </div>

                    {/* VIN */}
                    <div className="space-y-2">
                      <Label htmlFor="vin" className="text-sm font-semibold text-gray-700">VIN Number</Label>
                      <Input
                        id="vin"
                        placeholder="17-digit VIN"
                        maxLength={17}
                        className={errors.vin ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('vin')}
                      />
                      {errors.vin && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.vin.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Registration */}
                    <div className="space-y-2">
                      <Label htmlFor="registration" className="text-sm font-semibold text-gray-700">Registration</Label>
                      <Input
                        id="registration"
                        placeholder="e.g., ABC123"
                        {...register('registration')}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-green-600" />
                    Vehicle Photos
                  </h3>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      <label htmlFor="images" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Click to upload vehicle photos
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB each (optional)
                        </p>
                      </label>
                    </div>

                    {/* Image Previews */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={image}
                                alt={`Vehicle photo ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Owner Details Section */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Your Contact Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className={errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('firstName')}
                      />
                      {errors.firstName && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.firstName.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        className={errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('lastName')}
                      />
                      {errors.lastName && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.lastName.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.smith@example.com"
                        className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('email')}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.email.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0412 345 678"
                        className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.phone.message}</span>
                        </div>
                      )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-semibold text-gray-700">State</Label>
                      <Select value={watch('state')} onValueChange={(value) => setValue('state', value)}>
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
                </div>

                {/* Additional Information */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    {/* Condition */}
                    <div className="space-y-2">
                      <Label htmlFor="condition" className="text-sm font-semibold text-gray-700">Vehicle Condition</Label>
                      <Select value={watch('condition')} onValueChange={(value) => setValue('condition', value)}>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Service History */}
                    <div className="space-y-2">
                      <Label htmlFor="serviceHistory" className="text-sm font-semibold text-gray-700">Service History</Label>
                      <Select value={watch('serviceHistory')} onValueChange={(value) => setValue('serviceHistory', value)}>
                        <SelectTrigger id="serviceHistory">
                          <SelectValue placeholder="Select service history" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Service History</SelectItem>
                          <SelectItem value="partial">Partial Service History</SelectItem>
                          <SelectItem value="none">No Service History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo" className="text-sm font-semibold text-gray-700">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Tell us about any modifications, damage, or special features..."
                        rows={4}
                        className={errors.additionalInfo ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        {...register('additionalInfo')}
                      />
                      {errors.additionalInfo && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.additionalInfo.message}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Get Free Valuation
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By submitting this form, you agree to our terms and privacy policy. We'll contact you within 24 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">What Happens Next?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">Submit Details</h3>
                <p className="text-sm text-gray-600">
                  Fill out the form with your car's information
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">Get Valuation</h3>
                <p className="text-sm text-gray-600">
                  Receive a competitive offer within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">Schedule Inspection</h3>
                <p className="text-sm text-gray-600">
                  Book a free inspection at your convenience
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  4
                </div>
                <h3 className="font-semibold mb-2">Get Paid</h3>
                <p className="text-sm text-gray-600">
                  Accept the offer and receive instant payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
