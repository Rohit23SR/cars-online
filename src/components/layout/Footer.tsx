'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Successfully subscribed!', {
        description: 'You will receive the latest car listings and special offers.'
      })
      setEmail('')
    } else {
      toast.error('Please enter your email', {
        description: 'Email address is required to subscribe.'
      })
    }
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/contact' }
    ],
    shop: [
      { name: 'Browse Cars', href: '/cars' },
      { name: 'Sell Your Car', href: '/sell' },
      { name: 'Finance Calculator', href: '/finance-calculator' },
      { name: 'Warranty', href: '/faqs' }
    ],
    support: [
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping & Delivery', href: '/how-it-works' },
      { name: 'Returns Policy', href: '/faqs' },
      { name: 'Terms of Service', href: '/terms' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Cookie Policy', href: '/privacy' }
    ]
  }

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t pt-8">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-gray-900">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Get the latest car listings and special offers delivered to your inbox.
            </p>
            <form className="mt-4 flex gap-x-2" onSubmit={handleSubscribe} suppressHydrationWarning>
              <input
                type="email"
                name="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-text"
                suppressHydrationWarning
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 cursor-pointer"
                suppressHydrationWarning
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-x-6">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Cars Online
            </Link>
            <p className="text-sm text-gray-600">
              © {currentYear} Cars Online. All rights reserved.
            </p>
          </div>

          <div className="flex gap-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Demo notice */}
        <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-center text-sm text-blue-800">
            This is a demo project created for portfolio purposes. No real transactions are processed.
          </p>
        </div>
      </div>
    </footer>
  )
}
