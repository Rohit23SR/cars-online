import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { auth } from '@/lib/auth'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Cars Online - Quality Used Cars with 7-Day Guarantee',
  description:
    'Buy and sell quality inspected used cars with confidence. 7-day money back guarantee, 3-month warranty, and free home delivery. Browse our extensive inventory today.',
  keywords: ['used cars', 'buy cars online', 'sell car', 'car marketplace', 'quality cars']
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Header user={session?.user} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          expand={true}
          richColors
          closeButton
          toastOptions={{
            className: 'rounded-xl shadow-2xl border-0',
            style: {
              padding: '16px',
              gap: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}
