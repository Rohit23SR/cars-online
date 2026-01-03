import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Car,
  Truck,
  CheckCircle,
  Shield,
  Calendar,
  CreditCard,
  Home,
  FileText,
  Clock,
  Award,
  HeadphonesIcon,
  Sparkles
} from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              Simple Process
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Cars Online Works
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Buy your dream car in just a few simple steps. No dealership pressure, no hidden fees.
            </p>
          </div>
        </div>
      </div>

      {/* Main Process - Buying */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Buying a Car</h2>
            <p className="text-gray-600 text-lg">
              From browsing to delivery, we make it easy and transparent
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold">Browse & Search</h3>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Explore our extensive collection of quality-inspected used cars. Use our advanced filters
                  to find exactly what you're looking for - by make, model, price, year, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Detailed photos and specifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Complete vehicle history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Transparent pricing</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-8 flex items-center justify-center">
                    <Search className="h-32 w-32 text-blue-600" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 flex items-center justify-center">
                    <FileText className="h-32 w-32 text-green-600" />
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold">Review Details</h3>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  View comprehensive details about each vehicle including full inspection reports,
                  maintenance history, and high-resolution photos from every angle.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Professional inspection report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Service history records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>360-degree photo gallery</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold">Reserve Online</h3>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Found the perfect car? Reserve it online with our simple 3-step checkout process.
                  No need to visit a dealership or deal with pushy salespeople.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Secure online payment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Instant confirmation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Choose your delivery date</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-8 flex items-center justify-center">
                    <CreditCard className="h-32 w-32 text-purple-600" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-8 flex items-center justify-center">
                    <Truck className="h-32 w-32 text-orange-600" />
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold">Free Delivery</h3>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We'll deliver your car straight to your door at no extra cost. Our professional
                  delivery team will ensure your vehicle arrives in perfect condition.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Contactless delivery available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Delivery tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>7-day money-back guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Cars Online?</h2>
              <p className="text-gray-600 text-lg">
                We're revolutionizing the way you buy cars
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                  <p className="text-gray-600 text-sm">
                    Every car is professionally inspected and comes with a comprehensive warranty.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">7-Day Returns</h3>
                  <p className="text-gray-600 text-sm">
                    Not satisfied? Return your car within 7 days for a full refund, no questions asked.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
                  <p className="text-gray-600 text-sm">
                    We deliver anywhere in Australia at no extra cost to you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
                  <p className="text-gray-600 text-sm">
                    No haggling, no hidden fees. Our prices are transparent and competitive.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Save Time</h3>
                  <p className="text-gray-600 text-sm">
                    Buy from the comfort of your home. No dealership visits required.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
                  <p className="text-gray-600 text-sm">
                    Our team is here to help you every step of the way.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Selling Process */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Selling Your Car</h2>
            <p className="text-gray-600 text-lg">
              Get the best price for your car with minimal hassle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Get a Quote</h3>
                <p className="text-gray-600 text-sm">
                  Fill out our simple form with your car details and get an instant online valuation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Schedule Inspection</h3>
                <p className="text-gray-600 text-sm">
                  Book a free inspection at your convenience. We come to you!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Get Paid</h3>
                <p className="text-gray-600 text-sm">
                  Accept our offer and receive payment instantly. We handle all the paperwork.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/sell">
                <Sparkles className="h-5 w-5 mr-2" />
                Sell Your Car Now
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our collection of quality used cars and find your perfect match today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/cars">
                <Car className="h-5 w-5 mr-2" />
                Browse Cars
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
