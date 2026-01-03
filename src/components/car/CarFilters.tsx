'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CAR_MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSION_TYPES, AUSTRALIAN_STATES, PRICE_RANGES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { X, Search, Car, Box, Fuel, Settings, MapPin, DollarSign, Calendar, SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'

export function CarFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [make, setMake] = useState(searchParams.get('make') || 'all')
  const [bodyType, setBodyType] = useState(searchParams.get('bodyType') || 'all')
  const [fuelType, setFuelType] = useState(searchParams.get('fuelType') || 'all')
  const [transmission, setTransmission] = useState(searchParams.get('transmission') || 'all')
  const [state, setState] = useState(searchParams.get('state') || 'all')
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 200000
  ])
  const [yearRange, setYearRange] = useState([
    Number(searchParams.get('minYear')) || 2000,
    Number(searchParams.get('maxYear')) || new Date().getFullYear()
  ])

  const currentYear = new Date().getFullYear()

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (search) params.set('search', search)
    if (make && make !== 'all') params.set('make', make)
    if (bodyType && bodyType !== 'all') params.set('bodyType', bodyType)
    if (fuelType && fuelType !== 'all') params.set('fuelType', fuelType)
    if (transmission && transmission !== 'all') params.set('transmission', transmission)
    if (state && state !== 'all') params.set('state', state)
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString())
    if (priceRange[1] < 200000) params.set('maxPrice', priceRange[1].toString())
    if (yearRange[0] > 2000) params.set('minYear', yearRange[0].toString())
    if (yearRange[1] < currentYear) params.set('maxYear', yearRange[1].toString())

    router.push(`/cars?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setMake('all')
    setBodyType('all')
    setFuelType('all')
    setTransmission('all')
    setState('all')
    setPriceRange([0, 200000])
    setYearRange([2000, currentYear])
    router.push('/cars')
  }

  const hasActiveFilters = search || (make && make !== 'all') || (bodyType && bodyType !== 'all') ||
    (fuelType && fuelType !== 'all') || (transmission && transmission !== 'all') || (state && state !== 'all') ||
    priceRange[0] > 0 || priceRange[1] < 200000 || yearRange[0] > 2000 || yearRange[1] < currentYear

  const activeFilterCount = [
    search,
    make !== 'all' ? make : null,
    bodyType !== 'all' ? bodyType : null,
    fuelType !== 'all' ? fuelType : null,
    transmission !== 'all' ? transmission : null,
    state !== 'all' ? state : null,
    priceRange[0] > 0 || priceRange[1] < 200000 ? 'price' : null,
    yearRange[0] > 2000 || yearRange[1] < currentYear ? 'year' : null,
  ].filter(Boolean).length

  return (
    <div className="bg-white p-6 rounded-2xl space-y-4 border-0 shadow-lg">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Filters</h2>
            {activeFilterCount > 0 && (
              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 font-semibold px-2.5 border-0">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500">Refine your search to find the perfect car</p>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-semibold">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            id="search"
            placeholder="Search by make, model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            className={`pl-10 pr-8 h-10 !py-2.5 leading-normal caret-gray-900 text-gray-900 ${search ? 'border-blue-300 ring-1 ring-blue-100' : ''}`}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="state" className="text-sm font-semibold">
          Location
        </Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger id="state" className={state !== 'all' ? 'border-blue-300 ring-1 ring-blue-100' : ''}>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <SelectValue placeholder="All States" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {AUSTRALIAN_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Accordion Filters */}
      <Accordion type="multiple" defaultValue={[]} className="space-y-3">
        {/* Vehicle Specs */}
        <AccordionItem value="specs" className="border-0 bg-gray-50 rounded-xl px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline py-1.5">
            <div className="flex items-center gap-2 font-semibold">
              <Car className="h-4 w-4 text-blue-600" />
              Vehicle Specs
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4 pt-0">
            {/* Make */}
            <div className="space-y-1.5">
              <Label htmlFor="make" className="text-sm font-medium">Make</Label>
              <Select value={make} onValueChange={setMake}>
                <SelectTrigger id="make" className={make !== 'all' ? 'border-blue-300 ring-1 ring-blue-100' : ''}>
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {CAR_MAKES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Body Type */}
            <div className="space-y-2">
              <Label htmlFor="bodyType" className="text-sm font-medium flex items-center gap-2">
                <Box className="h-3.5 w-3.5 text-gray-500" />
                Body Type
              </Label>
              <Select value={bodyType} onValueChange={setBodyType}>
                <SelectTrigger id="bodyType" className={bodyType !== 'all' ? 'border-blue-300 ring-1 ring-blue-100' : ''}>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {BODY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <Label htmlFor="fuelType" className="text-sm font-medium flex items-center gap-2">
                <Fuel className="h-3.5 w-3.5 text-gray-500" />
                Fuel Type
              </Label>
              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger id="fuelType" className={fuelType !== 'all' ? 'border-blue-300 ring-1 ring-blue-100' : ''}>
                  <SelectValue placeholder="All Fuel Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuel Types</SelectItem>
                  {FUEL_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <Label htmlFor="transmission" className="text-sm font-medium flex items-center gap-2">
                <Settings className="h-3.5 w-3.5 text-gray-500" />
                Transmission
              </Label>
              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger id="transmission" className={transmission !== 'all' ? 'border-blue-300 ring-1 ring-blue-100' : ''}>
                  <SelectValue placeholder="All Transmissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transmissions</SelectItem>
                  {TRANSMISSION_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-0 bg-gray-50 rounded-xl px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline py-2">
            <div className="flex items-center gap-2 font-semibold">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Price Range
              {(priceRange[0] > 0 || priceRange[1] < 200000) && (
                <Badge variant="secondary" className="ml-auto mr-2 bg-blue-100 text-blue-700 text-xs border-0 font-semibold">
                  Active
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600">
                  {formatPrice(priceRange[0])}
                </span>
                <span className="text-xs text-gray-400">to</span>
                <span className="text-sm font-semibold text-blue-600">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
              <Slider
                min={0}
                max={200000}
                step={5000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>$0</span>
                <span>$200k</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Year Range */}
        <AccordionItem value="year" className="border-0 bg-gray-50 rounded-xl px-4 shadow-sm">
          <AccordionTrigger className="hover:no-underline py-2">
            <div className="flex items-center gap-2 font-semibold">
              <Calendar className="h-4 w-4 text-blue-600" />
              Year Range
              {(yearRange[0] > 2000 || yearRange[1] < currentYear) && (
                <Badge variant="secondary" className="ml-auto mr-2 bg-blue-100 text-blue-700 text-xs border-0 font-semibold">
                  Active
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600">
                  {yearRange[0]}
                </span>
                <span className="text-xs text-gray-400">to</span>
                <span className="text-sm font-semibold text-blue-600">
                  {yearRange[1]}
                </span>
              </div>
              <Slider
                min={2000}
                max={currentYear}
                step={1}
                value={yearRange}
                onValueChange={setYearRange}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>2000</span>
                <span>{currentYear}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Apply Button */}
      <Button onClick={applyFilters} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all rounded-xl h-12 font-semibold">
        Apply Filters
      </Button>
    </div>
  )
}
