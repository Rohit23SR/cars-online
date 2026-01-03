import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, MessageSquare } from 'lucide-react'

export default function FAQsPage() {
  const faqCategories = [
    {
      category: 'Buying a Car',
      faqs: [
        {
          question: 'How does the buying process work?',
          answer: 'Simply browse our inventory, select a car you like, and click "Reserve This Car". Complete the online checkout with your delivery details and payment information. We\'ll arrange delivery to your door within 7-14 days.',
        },
        {
          question: 'Can I test drive before buying?',
          answer: 'While we don\'t offer traditional test drives, we provide a 7-day money-back guarantee. If you\'re not completely satisfied with your car, return it within 7 days for a full refund.',
        },
        {
          question: 'What inspection do the cars undergo?',
          answer: 'Every car goes through our comprehensive 150-point inspection covering engine, transmission, brakes, suspension, electrical systems, and more. You\'ll receive a detailed inspection report with your purchase.',
        },
        {
          question: 'Are the prices negotiable?',
          answer: 'Our prices are competitively set based on market research and vehicle condition. What you see is what you pay - no hidden fees or surprise charges.',
        },
      ],
    },
    {
      category: 'Delivery & Returns',
      faqs: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery typically takes 7-14 days depending on your location. We\'ll contact you to arrange a convenient delivery time and keep you updated throughout the process.',
        },
        {
          question: 'Is delivery free?',
          answer: 'Yes! We provide free delivery to all addresses in Australia. The delivery cost is included in the purchase price.',
        },
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day money-back guarantee. If you\'re not satisfied for any reason, contact us within 7 days of delivery to arrange a return for a full refund.',
        },
        {
          question: 'What condition will my car be in when delivered?',
          answer: 'Your car will be professionally cleaned and serviced before delivery. It will arrive in the exact condition described in the listing with all documented features working properly.',
        },
      ],
    },
    {
      category: 'Payment & Finance',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. Payment is processed securely through our encrypted checkout system.',
        },
        {
          question: 'Do you offer financing options?',
          answer: 'Yes, we partner with leading Australian lenders to offer competitive financing options. Use our finance calculator to estimate your monthly payments, then apply during checkout.',
        },
        {
          question: 'When do I need to pay?',
          answer: 'Payment is required at the time of reservation to secure your vehicle. Your card won\'t be charged until we confirm the vehicle is ready for delivery.',
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees! The price you see includes delivery, a fresh service, and our 7-day guarantee. The only additional costs are registration and insurance, which you arrange separately.',
        },
      ],
    },
    {
      category: 'Selling Your Car',
      faqs: [
        {
          question: 'How do I sell my car to Cars Online?',
          answer: 'Fill out our "Sell Your Car" form with your vehicle details and photos. We\'ll provide a free valuation within 24 hours. If you accept, we\'ll arrange pickup at your convenience.',
        },
        {
          question: 'How is the valuation determined?',
          answer: 'Our valuations are based on current market data, vehicle condition, mileage, service history, and demand. We aim to offer fair, competitive prices.',
        },
        {
          question: 'How quickly can you purchase my car?',
          answer: 'Once you accept our offer, we can typically complete the purchase within 3-5 business days. Payment is made via bank transfer immediately upon vehicle pickup.',
        },
        {
          question: 'Do I need to have my car serviced first?',
          answer: 'No need! We purchase cars in any condition. While a good service history can increase the value, you don\'t need to service the car before selling to us.',
        },
      ],
    },
    {
      category: 'Vehicle Information',
      faqs: [
        {
          question: 'Do you sell new or used cars?',
          answer: 'We specialize in quality pre-owned vehicles. Each car is hand-selected and must meet our strict quality standards before being listed.',
        },
        {
          question: 'What warranty comes with the cars?',
          answer: 'All cars come with our 7-day money-back guarantee. Additionally, many vehicles are still covered by manufacturer warranty. Extended warranty options are available for purchase.',
        },
        {
          question: 'Can I see the service history?',
          answer: 'Yes! We provide complete service history and vehicle records with every purchase. You\'ll also receive a PPSR certificate to confirm there are no outstanding finance or issues.',
        },
        {
          question: 'Are the cars roadworthy?',
          answer: 'Absolutely. All vehicles pass our 150-point inspection and meet Australian road safety standards. Where required, we provide a current roadworthy certificate.',
        },
      ],
    },
    {
      category: 'Account & Support',
      faqs: [
        {
          question: 'Do I need to create an account?',
          answer: 'Yes, an account is required to reserve a car. This allows you to track your orders, save favorites, and manage your profile. Creating an account is quick and free.',
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via the contact form on our website, email us at support@cars-online.com.au, or call 1800 CARS ONLINE (1800 227 766) Monday-Friday 9am-6pm AEST.',
        },
        {
          question: 'What if I have an issue after delivery?',
          answer: 'Contact our support team immediately. If there\'s an issue not disclosed in the listing, we\'ll work with you to resolve it, including accepting a return under our 7-day guarantee.',
        },
        {
          question: 'Can I schedule a call with your team?',
          answer: 'Yes! Use the contact form to request a callback, and one of our car experts will call you at a convenient time to answer your questions.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-blue-100">
              Find answers to common questions about buying, selling, and our services
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold">{category.category}</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-white border rounded-lg px-6 last:border-b"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <Card className="max-w-4xl mx-auto mt-16 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our friendly customer support team is here to help.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/cars">Browse Cars</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
