import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, Database, Mail, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
                    This is a portfolio demonstration project. While this privacy policy is written to reflect
                    real-world standards, no actual personal data is collected or processed beyond what's necessary
                    for the demo functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Introduction */}
          <div className="prose max-w-none">
            <section className="mb-12">
              <p className="text-lg text-gray-700">
                Cars Online ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website
                and use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>

              <div className="space-y-6 bg-white rounded-lg p-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                  <p className="text-gray-700 mb-2">We may collect personal information that you provide to us, including:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and delivery addresses</li>
                    <li>Payment information (processed securely by our payment providers)</li>
                    <li>Vehicle preferences and browsing history on our site</li>
                    <li>Communications with our customer service team</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Automatically Collected Information</h3>
                  <p className="text-gray-700 mb-2">When you visit our website, we automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages viewed and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Process your vehicle purchases and reservations</li>
                  <li>Arrange delivery of vehicles to your specified address</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Detect and prevent fraud and security issues</li>
                  <li>Comply with legal obligations</li>
                  <li>Personalize your experience on our platform</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">We may share your information with:</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Providers</h3>
                    <p className="text-gray-700">
                      Third-party companies that help us operate our business, such as payment processors,
                      delivery services, email providers, and analytics services.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Business Transfers</h3>
                    <p className="text-gray-700">
                      In connection with any merger, sale of company assets, financing, or acquisition of
                      all or a portion of our business.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Legal Requirements</h3>
                    <p className="text-gray-700">
                      When required by law or to protect our rights, property, or safety, or that of our
                      users or others.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">With Your Consent</h3>
                    <p className="text-gray-700">
                      We may share your information for any other purpose with your consent.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Data Security</h2>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. However,
                  no method of transmission over the internet or electronic storage is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold">Your Privacy Rights</h2>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing your personal information</li>
                  <li>Request transfer of your personal information</li>
                  <li>Withdraw consent at any time (where processing is based on consent)</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us at privacy@cars-online.com.au
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website.
                  Cookies are small data files stored on your device.
                </p>
                <p className="text-gray-700 mb-4">You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700">
                  Our services are not directed to individuals under 18 years of age. We do not knowingly
                  collect personal information from children. If you become aware that a child has provided
                  us with personal information, please contact us.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by
                  posting the new Privacy Policy on this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> privacy@cars-online.com.au</li>
                  <li><strong>Phone:</strong> 1800 CARS ONLINE (1800 227 766)</li>
                  <li><strong>Address:</strong> 123 Collins Street, Melbourne VIC 3000, Australia</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
