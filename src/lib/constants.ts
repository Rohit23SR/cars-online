// Car makes and models
export const CAR_MAKES = [
  'Toyota',
  'Honda',
  'Mazda',
  'Nissan',
  'Hyundai',
  'Kia',
  'Ford',
  'Holden',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Subaru',
  'Mitsubishi',
  'Tesla'
] as const

export const CAR_MODELS: Record<string, string[]> = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Hilux', 'LandCruiser', 'Yaris', 'Prado'],
  Honda: ['Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz', 'Odyssey'],
  Mazda: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5'],
  Nissan: ['Navara', 'X-Trail', 'Qashqai', 'Patrol', 'Pathfinder'],
  Hyundai: ['i30', 'Tucson', 'Santa Fe', 'Kona', 'Elantra'],
  Kia: ['Cerato', 'Sportage', 'Sorento', 'Seltos', 'Carnival'],
  Ford: ['Ranger', 'Everest', 'Focus', 'Mustang', 'Escape'],
  Volkswagen: ['Golf', 'Polo', 'Tiguan', 'Passat', 'Amarok'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'X1'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X']
}

// Body types
export const BODY_TYPES = [
  'Sedan',
  'SUV',
  'Hatchback',
  'Wagon',
  'Coupe',
  'Convertible',
  'Ute',
  'Van'
] as const

// Transmission types
export const TRANSMISSION_TYPES = ['Automatic', 'Manual'] as const

// Fuel types
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'] as const

// Australian states
export const AUSTRALIAN_STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'] as const

// Car features
export const CAR_FEATURES = [
  // Safety
  'ABS',
  'Airbags',
  'Stability Control',
  'Traction Control',
  'Brake Assist',
  'Lane Departure Warning',
  'Blind Spot Monitoring',
  'Rear Cross Traffic Alert',
  'Automatic Emergency Braking',
  'Adaptive Cruise Control',

  // Comfort
  'Air Conditioning',
  'Climate Control',
  'Heated Seats',
  'Ventilated Seats',
  'Power Windows',
  'Power Seats',
  'Leather Seats',
  'Sunroof',
  'Panoramic Roof',

  // Technology
  'Bluetooth',
  'Apple CarPlay',
  'Android Auto',
  'Navigation System',
  'Reversing Camera',
  'Parking Sensors',
  '360 Camera',
  'Head-Up Display',
  'Wireless Charging',
  'Premium Sound System',

  // Convenience
  'Cruise Control',
  'Keyless Entry',
  'Push Button Start',
  'Auto Headlights',
  'Rain Sensing Wipers',
  'Power Tailgate',
  'Roof Racks',
  'Tow Bar'
] as const

// Price ranges for filters
export const PRICE_RANGES = [
  { label: 'Under $20,000', min: 0, max: 20000 },
  { label: '$20,000 - $30,000', min: 20000, max: 30000 },
  { label: '$30,000 - $40,000', min: 30000, max: 40000 },
  { label: '$40,000 - $50,000', min: 40000, max: 50000 },
  { label: '$50,000 - $75,000', min: 50000, max: 75000 },
  { label: 'Over $75,000', min: 75000, max: 999999 }
] as const

// Year range
export const CURRENT_YEAR = new Date().getFullYear()
export const MIN_YEAR = 1990
export const MAX_YEAR = CURRENT_YEAR + 1

// Pagination
export const ITEMS_PER_PAGE = 20
export const ADMIN_ITEMS_PER_PAGE = 25

// Finance
export const DEFAULT_INTEREST_RATE = 7.5
export const LOAN_TERMS = [36, 48, 60] as const
export const MIN_DEPOSIT = 3000

// Image upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const MAX_IMAGES_PER_CAR = 12

// Routes
export const PUBLIC_ROUTES = ['/', '/cars', '/about', '/how-it-works', '/contact', '/sell']
export const AUTH_ROUTES = ['/auth/signin', '/auth/signup', '/auth/error']
export const PROTECTED_ROUTES = ['/dashboard', '/checkout']
export const ADMIN_ROUTES = ['/admin']
