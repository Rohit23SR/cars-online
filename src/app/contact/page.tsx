'use client'

import { useState } from 'react'
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
import { toast } from 'sonner'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  HeadphonesIcon
} from 'lucide-react'

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      toast.success('Thank you! We\'ll get back to you within 24 hours.')
      setSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              We're Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100">
              Have a question? Need assistance? Our friendly team is ready to help you.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">1800 CARS ONLINE</p>
                      <p className="text-gray-600">(1800 227 766)</p>
                      <p className="text-xs text-gray-500 mt-1">Mon-Fri: 9am-6pm AEST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">support@cars-online.com.au</p>
                      <p className="text-xs text-gray-500 mt-1">24-48 hour response time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Office</p>
                      <p className="text-gray-600">123 Collins Street</p>
                      <p className="text-gray-600">Melbourne VIC 3000</p>
                      <p className="text-gray-600">Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                      <p className="text-gray-600">Saturday: 10am - 4pm</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <HeadphonesIcon className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Quick Support</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Most questions can be answered in our FAQ section or How It Works page.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                    Send Us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="0412 345 678"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subject} onValueChange={(value) => updateField('subject', value)}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="buying">Buying a Car</SelectItem>
                          <SelectItem value="selling">Selling a Car</SelectItem>
                          <SelectItem value="reservation">Existing Reservation</SelectItem>
                          <SelectItem value="delivery">Delivery Question</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="mt-1"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-600">
                        I agree to the privacy policy and consent to Cars Online contacting me about my inquiry.
                      </label>
                    </div>

                    <Button type="submit" size="lg" disabled={submitting}>
                      {submitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Common Questions */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Common Questions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">How long does delivery take?</h3>
                  <p className="text-gray-600 text-sm">
                    Delivery typically takes 7-14 days from the date of reservation, depending on your location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Can I return my car?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes! We offer a 7-day money-back guarantee. If you're not satisfied, return the car for a full refund.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">How do I sell my car?</h3>
                  <p className="text-gray-600 text-sm">
                    Simply fill out our online form with your car's details. We'll provide a valuation within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Are the cars inspected?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, every car undergoes a comprehensive inspection and comes with a detailed report.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600 text-sm">
                    We accept credit cards, debit cards, and bank transfers for your convenience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Can I test drive before buying?</h3>
                  <p className="text-gray-600 text-sm">
                    Our 7-day guarantee allows you to test drive your car after delivery with full return rights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Placeholder) */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Visit Our Showroom</h2>
            <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Map Location</p>
                <p className="text-gray-500 text-sm">123 Collins Street, Melbourne VIC 3000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
