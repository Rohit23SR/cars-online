import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Car,
  Shield,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle,
  Target
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Cars Sold', value: '10,000+', icon: Car },
    { label: 'Happy Customers', value: '8,500+', icon: Users },
    { label: 'Years in Business', value: '5+', icon: Clock },
    { label: 'Customer Satisfaction', value: '98%', icon: Award },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every car comes with a detailed inspection report and complete history. No hidden fees, no surprises.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'All vehicles undergo rigorous 150-point inspections. We only list cars we\'d drive ourselves.',
    },
    {
      icon: Target,
      title: 'Customer First',
      description: '7-day money-back guarantee and dedicated support team. Your satisfaction is our priority.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Using technology to make car buying simple, transparent, and enjoyable from start to finish.',
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      description: 'Former automotive executive with 15 years of industry experience.',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      description: 'Logistics expert ensuring smooth delivery across Australia.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Chief Technology Officer',
      description: 'Building the platform that makes car buying effortless.',
    },
    {
      name: 'David Thompson',
      role: 'Customer Success Lead',
      description: 'Dedicated to ensuring every customer has a great experience.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              About Cars Online
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing Car Buying in Australia
            </h1>
            <p className="text-xl text-blue-100">
              We're on a mission to make buying and selling cars simple, transparent, and trustworthy.
              No dealerships, no pressure - just quality cars delivered to your door.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>

          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              Cars Online was born from a simple frustration: buying a car shouldn't be complicated,
              stressful, or require spending hours at dealerships. In 2020, our founder Sarah Johnson
              set out to change that.
            </p>

            <p>
              After years working in the automotive industry, Sarah saw firsthand how traditional car
              buying created anxiety for customers. The pushy sales tactics, hidden fees, and lack of
              transparency left people feeling overwhelmed and uncertain.
            </p>

            <p>
              We built Cars Online to be different. By moving the entire process online and focusing
              on transparency, quality, and customer service, we've helped thousands of Australians
              find their perfect car without the stress.
            </p>

            <p>
              Today, we're proud to offer a curated selection of quality pre-owned vehicles, each
              thoroughly inspected and delivered right to your door. With our 7-day money-back
              guarantee, you can buy with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do, from selecting vehicles to serving our customers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to making your car buying experience exceptional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our curated selection of quality pre-owned vehicles and experience
            the stress-free way to buy a car.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/cars">Browse Cars</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
