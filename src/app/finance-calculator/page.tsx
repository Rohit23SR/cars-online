'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  DollarSign,
  Calendar,
  Percent,
  TrendingDown,
  Info
} from 'lucide-react'

export default function FinanceCalculatorPage() {
  const [carPrice, setCarPrice] = useState('35000')
  const [deposit, setDeposit] = useState('7000')
  const [loanTerm, setLoanTerm] = useState('60')
  const [interestRate, setInterestRate] = useState('7.5')

  const calculateLoan = () => {
    const price = parseFloat(carPrice) || 0
    const down = parseFloat(deposit) || 0
    const months = parseInt(loanTerm) || 60
    const rate = parseFloat(interestRate) || 7.5

    const loanAmount = price - down
    const monthlyRate = rate / 100 / 12
    const monthlyPayment =
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - loanAmount

    return {
      loanAmount,
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    }
  }

  const results = calculateLoan()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatCurrencyDecimal = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              Finance Calculator
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Car Loan Calculator
            </h1>
            <p className="text-xl text-blue-100">
              Estimate your monthly payments and see what you can afford
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    Loan Details
                  </CardTitle>
                  <CardDescription>
                    Enter your loan information to calculate monthly payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="carPrice">
                      Car Price
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="carPrice"
                        type="number"
                        value={carPrice}
                        onChange={(e) => setCarPrice(e.target.value)}
                        className="pl-10"
                        placeholder="35000"
                      />
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="1000"
                      value={carPrice}
                      onChange={(e) => setCarPrice(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$10,000</span>
                      <span>$100,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deposit">
                      Deposit / Trade-In Value
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="deposit"
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        className="pl-10"
                        placeholder="7000"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={carPrice}
                      step="500"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$0</span>
                      <span>{formatCurrency(parseFloat(carPrice) || 0)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">
                      Loan Term (months)
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="loanTerm"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="pl-10"
                        placeholder="60"
                      />
                    </div>
                    <div className="flex gap-2">
                      {[12, 24, 36, 48, 60, 72].map((months) => (
                        <Button
                          key={months}
                          variant={loanTerm === months.toString() ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setLoanTerm(months.toString())}
                          className="flex-1"
                        >
                          {months}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">
                      Interest Rate (% per year)
                    </Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="pl-10"
                        placeholder="7.5"
                      />
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>3%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardContent className="p-8">
                  <div className="text-center">
                    <p className="text-blue-100 mb-2">Estimated Monthly Payment</p>
                    <div className="text-5xl font-bold mb-6">
                      {formatCurrencyDecimal(results.monthlyPayment)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-blue-100 mb-1">Loan Amount</p>
                        <p className="font-semibold">{formatCurrency(results.loanAmount)}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-blue-100 mb-1">Loan Term</p>
                        <p className="font-semibold">{loanTerm} months</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Loan Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Car Price</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(carPrice) || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Deposit</span>
                    <span className="font-semibold text-green-600">
                      - {formatCurrency(parseFloat(deposit) || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Loan Amount</span>
                    <span className="font-bold">{formatCurrency(results.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-medium">Total Amount Payable</span>
                    <span className="font-bold text-lg">{formatCurrency(results.totalPayment)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-1">Important Note</p>
                      <p>
                        This calculator provides estimates only. Actual rates and terms may vary based
                        on your credit history, lender, and other factors. Contact us for personalized
                        finance options.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Tips for Getting the Best Car Loan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <TrendingDown className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Larger Deposit</h3>
                  <p className="text-gray-600 text-sm">
                    A larger deposit reduces your loan amount and can help you qualify for better interest rates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Shorter Term</h3>
                  <p className="text-gray-600 text-sm">
                    While monthly payments are higher, shorter loan terms mean less total interest paid.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Percent className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Shop Around</h3>
                  <p className="text-gray-600 text-sm">
                    Compare rates from multiple lenders. Even a small difference in interest rate can save thousands.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
