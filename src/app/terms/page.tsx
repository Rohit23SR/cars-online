import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-blue-100">
              Last updated: December 31, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Demo Notice */}
          <Card className="mb-12 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Demo Project Notice</h3>
                  <p className="text-sm text-amber-800">
                    This is a portfolio demonstration project. While these terms are written to reflect
                    real-world standards, no actual commercial transactions are processed. This is for
                    demonstration purposes only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Introduction */}
          <div className="prose max-w-none">
            <section className="mb-12">
              <p className="text-lg text-gray-700">
                Welcome to Cars Online. By accessing and using our website and services, you agree to be
                bound by these Terms and Conditions. Please read them carefully before using our services.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  By accessing or using Cars Online's website and services, you agree to be bound by these
                  Terms and Conditions and our Privacy Policy. If you do not agree with any part of these
                  terms, you must not use our services.
                </p>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. Your continued use of the service
                  after such modifications constitutes your acceptance of the new terms.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Cars Online operates an online marketplace for buying and selling pre-owned vehicles in
                  Australia. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Vehicle listings and browsing</li>
                  <li>Online reservation and purchase system</li>
                  <li>Vehicle inspection and quality assurance</li>
                  <li>Delivery services across Australia</li>
                  <li>7-day money-back guarantee</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Account Creation</h3>
                  <p className="text-gray-700">
                    To use certain features of our service, you must create an account. You must be at least
                    18 years old and provide accurate, current, and complete information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Account Security</h3>
                  <p className="text-gray-700">
                    You are responsible for maintaining the confidentiality of your account credentials and
                    for all activities that occur under your account. Notify us immediately of any
                    unauthorized use.
                  </p>
                </div>
              </div>
            </section>

            {/* Vehicle Purchase */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">4. Vehicle Purchase Terms</h2>
              </div>

              <div className="bg-white rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Reservation Process</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>All reservations are subject to vehicle availability</li>
                    <li>Reservation payment is required to secure the vehicle</li>
                    <li>Vehicles are reserved on a first-come, first-served basis</li>
                    <li>We will confirm your reservation within 24 hours</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Pricing</h3>
                  <p className="text-gray-700">
                    All prices are displayed in Australian Dollars (AUD) and include GST. Prices are subject
                    to change without notice until reservation is confirmed. The price you pay is the price
                    displayed at the time of reservation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Payment</h3>
                  <p className="text-gray-700 mb-2">
                    We accept major credit cards, debit cards, and bank transfers. Payment is processed
                    securely through our payment providers. By providing payment information, you represent
                    and warrant that:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>You have the legal right to use the payment method</li>
                    <li>The information you provide is true and correct</li>
                    <li>You will honor all payment obligations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Delivery Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Delivery Terms</h2>
              <div className="bg-white rounded-lg p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-fit">Timeframe:</span>
                    <span>Delivery typically occurs within 7-14 days of reservation confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-fit">Cost:</span>
                    <span>Delivery is free to all addresses in Australia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-fit">Inspection:</span>
                    <span>You must inspect the vehicle upon delivery and note any issues immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-fit">Acceptance:</span>
                    <span>Signing the delivery receipt constitutes acceptance of the vehicle</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 7-Day Guarantee */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">6. 7-Day Money-Back Guarantee</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We offer a 7-day money-back guarantee from the date of delivery. If you're not satisfied
                  with your vehicle for any reason, you may return it within 7 days for a full refund,
                  subject to the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Vehicle must be returned in the same condition as delivered</li>
                  <li>No more than 200 additional kilometers may be added to the odometer</li>
                  <li>No damage or modifications to the vehicle</li>
                  <li>You must notify us within 7 days of delivery</li>
                  <li>Refund will be processed within 10 business days of receiving the vehicle</li>
                </ul>
              </div>
            </section>

            {/* Vehicle Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">7. Vehicle Information and Warranties</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We strive to provide accurate information about all vehicles. However:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Information is provided "as is" and may contain errors</li>
                  <li>We are not liable for any inaccuracies in vehicle descriptions</li>
                  <li>All vehicles are sold with a detailed inspection report</li>
                  <li>Manufacturer warranties may still apply (if applicable)</li>
                  <li>Extended warranties are available for purchase separately</li>
                </ul>
              </div>
            </section>

            {/* Limitations */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">8. Limitations of Liability</h2>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability is limited to the purchase price of the vehicle</li>
                  <li>We are not responsible for delays caused by third parties or events beyond our control</li>
                  <li>We make no warranties beyond those explicitly stated in these terms</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700">
                  All content on this website, including text, graphics, logos, images, and software, is the
                  property of Cars Online or its content suppliers and is protected by Australian and
                  international copyright laws. You may not use, reproduce, or distribute any content without
                  our express written permission.
                </p>
              </div>
            </section>

            {/* Prohibited Conduct */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">10. Prohibited Conduct</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Use our services for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Upload viruses or malicious code</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect user information without consent</li>
                  <li>Use automated systems to access our services</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700">
                  These Terms and Conditions are governed by and construed in accordance with the laws of
                  Victoria, Australia. Any disputes arising from these terms will be subject to the exclusive
                  jurisdiction of the courts of Victoria.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> legal@cars-online.com.au</li>
                  <li><strong>Phone:</strong> 1800 CARS ONLINE (1800 227 766)</li>
                  <li><strong>Address:</strong> 123 Collins Street, Melbourne VIC 3000, Australia</li>
                </ul>
              </div>
            </section>

            {/* Acceptance */}
            <section className="mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700">
                  <strong>By using Cars Online's services, you acknowledge that you have read, understood,
                  and agree to be bound by these Terms and Conditions.</strong>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
