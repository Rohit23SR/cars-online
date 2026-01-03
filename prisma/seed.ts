import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@cars-online.com' },
    update: {},
    create: {
      email: 'admin@cars-online.com',
      name: 'Admin User',
      hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    }
  })

  console.log('✅ Created admin user:', admin.email)

  // Create demo user
  const demoPassword = await bcrypt.hash('demo123', 10)

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      hashedPassword: demoPassword,
      role: 'USER',
      phone: '0412345678',
      emailVerified: new Date()
    }
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Sample car data
  const carsData = [
    {
      slug: '2022-toyota-camry-ascent',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      variant: 'Ascent',
      vin: 'JTDBT923X70123456',
      price: 32990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.5L',
      mileage: 45000,
      color: 'Silver',
      doors: 4,
      seats: 5,
      power: '135 kW',
      torque: '235 Nm',
      fuelEconomy: '6.5L/100km',
      location: 'Sydney, NSW',
      registration: 'Valid until Dec 2025',
      description:
        'Well-maintained 2022 Toyota Camry in excellent condition. This reliable sedan features a spacious interior, smooth ride, and outstanding fuel economy. Complete service history available. Perfect for families or daily commuting.',
      features: [
        'Bluetooth',
        'Backup Camera',
        'Cruise Control',
        'Air Conditioning',
        'ABS',
        'Airbags',
        'Stability Control',
        'Power Windows',
        'Keyless Entry'
      ],
      inspectionDate: new Date('2024-12-15'),
      inspectionNotes: 'Passed all mechanical and safety inspections. No issues found.',
      images: [
        {
          url: '/images/cars/toyota-camry-2022.jpg',
          altText: '2022 Toyota Camry - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        },
        {
          url: '/images/cars/toyota-camry-2022-side.jpg',
          altText: '2022 Toyota Camry - Side View',
          isPrimary: false,
          order: 1,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-honda-civic-vti-lx',
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      variant: 'VTi-LX',
      price: 28500,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '1.8L',
      mileage: 38000,
      color: 'Blue',
      doors: 4,
      seats: 5,
      power: '104 kW',
      torque: '174 Nm',
      fuelEconomy: '6.2L/100km',
      location: 'Melbourne, VIC',
      registration: 'Valid until Aug 2025',
      description:
        'Sporty and efficient 2021 Honda Civic with low mileage. Features modern technology, comfortable interior, and excellent safety ratings. One owner, full service history.',
      features: [
        'Apple CarPlay',
        'Android Auto',
        'Lane Departure Warning',
        'Adaptive Cruise Control',
        'LED Headlights',
        'Sunroof',
        'Heated Seats',
        'Bluetooth',
        'Backup Camera'
      ],
      inspectionDate: new Date('2024-12-10'),
      images: [
        {
          url: '/images/cars/honda-civic-2021.jpg',
          altText: '2021 Honda Civic - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2023-mazda-cx-5-touring',
      make: 'Mazda',
      model: 'CX-5',
      year: 2023,
      variant: 'Touring',
      price: 42990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.5L',
      mileage: 15000,
      color: 'Red',
      doors: 5,
      seats: 5,
      power: '140 kW',
      torque: '252 Nm',
      fuelEconomy: '7.8L/100km',
      location: 'Brisbane, QLD',
      registration: 'Valid until Mar 2026',
      description:
        'Nearly new 2023 Mazda CX-5 with very low mileage. Premium SUV with exceptional build quality, advanced safety features, and stylish design. Still under manufacturer warranty.',
      features: [
        'Apple CarPlay',
        'Android Auto',
        'Leather Seats',
        'Panoramic Roof',
        '360 Camera',
        'Parking Sensors',
        'Power Tailgate',
        'Blind Spot Monitoring',
        'Navigation System',
        'Premium Sound System'
      ],
      inspectionDate: new Date('2024-12-20'),
      images: [
        {
          url: '/images/cars/mazda-cx5-2023.jpg',
          altText: '2023 Mazda CX-5 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2020-nissan-x-trail-st-l',
      make: 'Nissan',
      model: 'X-Trail',
      year: 2020,
      variant: 'ST-L',
      price: 34500,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.5L',
      mileage: 52000,
      color: 'White',
      doors: 5,
      seats: 7,
      power: '126 kW',
      torque: '233 Nm',
      fuelEconomy: '8.1L/100km',
      location: 'Perth, WA',
      description:
        'Spacious 7-seater family SUV with plenty of cargo space. Perfect for growing families. Well maintained with full service history.',
      features: [
        'Bluetooth',
        '7 Seats',
        'Reversing Camera',
        'Cruise Control',
        'Climate Control',
        'Roof Racks',
        'Parking Sensors',
        'Keyless Entry'
      ],
      images: [
        {
          url: '/images/cars/nissan-xtrail-2020.jpg',
          altText: '2020 Nissan X-Trail - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-hyundai-tucson-elite',
      make: 'Hyundai',
      model: 'Tucson',
      year: 2021,
      variant: 'Elite',
      price: 38990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L',
      mileage: 28000,
      color: 'Black',
      doors: 5,
      seats: 5,
      power: '122 kW',
      torque: '203 Nm',
      fuelEconomy: '7.3L/100km',
      location: 'Adelaide, SA',
      description:
        'Modern and feature-packed 2021 Hyundai Tucson Elite. Excellent condition with low kilometers. Comprehensive warranty remaining.',
      features: [
        'Leather Seats',
        'Sunroof',
        'Apple CarPlay',
        'Android Auto',
        'Wireless Charging',
        'LED Headlights',
        'Heated Seats',
        'Power Tailgate',
        'Blind Spot Monitoring'
      ],
      images: [
        {
          url: '/images/cars/hyundai-tucson-2021.jpg',
          altText: '2021 Hyundai Tucson - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2019-volkswagen-golf-gti',
      make: 'Volkswagen',
      model: 'Golf',
      year: 2019,
      variant: 'GTI',
      price: 35990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Hatchback',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 41000,
      color: 'Red',
      doors: 5,
      seats: 5,
      power: '169 kW',
      torque: '350 Nm',
      fuelEconomy: '6.9L/100km',
      location: 'Sydney, NSW',
      description:
        'Iconic hot hatch with thrilling performance. Well-maintained enthusiast-owned vehicle with complete service records.',
      features: [
        'Sports Seats',
        'Dual Climate Control',
        'Parking Sensors',
        'Bluetooth',
        'Keyless Entry',
        'LED Headlights',
        'Cruise Control',
        'Premium Sound System'
      ],
      images: [
        {
          url: '/images/cars/volkswagen-golf-gti-2019.jpg',
          altText: '2019 VW Golf GTI - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2022-kia-sportage-gt-line',
      make: 'Kia',
      model: 'Sportage',
      year: 2022,
      variant: 'GT-Line',
      price: 44990,
      status: 'RESERVED' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 22000,
      color: 'Grey',
      doors: 5,
      seats: 5,
      power: '132 kW',
      torque: '265 Nm',
      fuelEconomy: '7.6L/100km',
      location: 'Melbourne, VIC',
      description:
        'Stylish and feature-rich 2022 Kia Sportage GT-Line. Comprehensive 7-year warranty remaining. Excellent safety features.',
      features: [
        'Leather Seats',
        'Panoramic Roof',
        'Wireless Charging',
        '360 Camera',
        'Blind Spot Monitoring',
        'Lane Keep Assist',
        'Adaptive Cruise Control',
        'Head-Up Display'
      ],
      images: [
        {
          url: '/images/cars/kia-sportage-2022.jpg',
          altText: '2022 Kia Sportage - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2020-tesla-model-3-standard-range',
      make: 'Tesla',
      model: 'Model 3',
      year: 2020,
      variant: 'Standard Range Plus',
      price: 52990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: 35000,
      color: 'White',
      doors: 4,
      seats: 5,
      power: '225 kW',
      torque: '450 Nm',
      fuelEconomy: '0L/100km',
      location: 'Sydney, NSW',
      description:
        'Premium electric sedan with cutting-edge technology. Autopilot capable, over-the-air updates, and minimal running costs. Battery health excellent.',
      features: [
        'Autopilot',
        'Premium Sound System',
        'Glass Roof',
        'Navigation System',
        'Wireless Charging',
        'Heated Seats',
        '15-inch Touchscreen',
        'Keyless Entry',
        'Auto Headlights'
      ],
      images: [
        {
          url: '/images/cars/tesla-model3-2020.jpg',
          altText: '2020 Tesla Model 3 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-bmw-3-series-320i',
      make: 'BMW',
      model: '3 Series',
      year: 2021,
      variant: '320i',
      price: 54990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 31000,
      color: 'Black',
      doors: 4,
      seats: 5,
      power: '135 kW',
      torque: '300 Nm',
      fuelEconomy: '6.1L/100km',
      location: 'Melbourne, VIC',
      description:
        'Premium luxury sedan with exceptional build quality and driving dynamics. Loaded with features and technology. Full BMW service history.',
      features: [
        'Leather Seats',
        'Navigation System',
        'Sunroof',
        'Parking Sensors',
        'Reversing Camera',
        'Bluetooth',
        'Cruise Control',
        'LED Headlights',
        'Premium Sound System',
        'Keyless Entry'
      ],
      images: [
        {
          url: '/images/cars/bmw-3series-2021.jpg',
          altText: '2021 BMW 3 Series - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2022-ford-ranger-xlt',
      make: 'Ford',
      model: 'Ranger',
      year: 2022,
      variant: 'XLT',
      price: 58990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Ute',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      engineSize: '2.0L Bi-Turbo',
      mileage: 28000,
      color: 'Blue',
      doors: 4,
      seats: 5,
      power: '157 kW',
      torque: '500 Nm',
      fuelEconomy: '8.4L/100km',
      location: 'Brisbane, QLD',
      description:
        'Capable and comfortable dual-cab ute. Perfect for work and play. Excellent towing capacity with modern safety features.',
      features: [
        'Tow Bar',
        'Rear Camera',
        'Bluetooth',
        'Cruise Control',
        'Climate Control',
        '4WD',
        'Diff Lock',
        'Hill Descent Control',
        'Roof Racks'
      ],
      images: [
        {
          url: '/images/cars/ford-ranger-2022.jpg',
          altText: '2022 Ford Ranger - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-mitsubishi-outlander-exceed',
      make: 'Mitsubishi',
      model: 'Outlander',
      year: 2021,
      variant: 'Exceed',
      price: 36990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.4L',
      mileage: 44000,
      color: 'Silver',
      doors: 5,
      seats: 7,
      power: '124 kW',
      torque: '245 Nm',
      fuelEconomy: '8.7L/100km',
      location: 'Canberra, ACT',
      description:
        'Versatile 7-seater SUV perfect for families. Spacious interior, excellent safety features, and great value for money.',
      features: [
        '7 Seats',
        'Reversing Camera',
        'Bluetooth',
        'Cruise Control',
        'Climate Control',
        'Parking Sensors',
        'Roof Racks',
        'Apple CarPlay',
        'Android Auto'
      ],
      images: [
        {
          url: '/images/cars/mitsubishi-outlander-2021.jpg',
          altText: '2021 Mitsubishi Outlander - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2020-subaru-forester-2-5i-premium',
      make: 'Subaru',
      model: 'Forester',
      year: 2020,
      variant: '2.5i Premium',
      price: 38990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.5L',
      mileage: 48000,
      color: 'Blue',
      doors: 5,
      seats: 5,
      power: '136 kW',
      torque: '239 Nm',
      fuelEconomy: '7.4L/100km',
      location: 'Hobart, TAS',
      description:
        'Reliable AWD SUV with excellent safety credentials. Perfect for all weather conditions. Symmetrical AWD provides superior handling.',
      features: [
        'AWD',
        'EyeSight Safety',
        'X-Mode',
        'Apple CarPlay',
        'Android Auto',
        'Sunroof',
        'Heated Seats',
        'Power Tailgate',
        'Roof Rails'
      ],
      images: [
        {
          url: '/images/cars/subaru-forester-2020.jpg',
          altText: '2020 Subaru Forester - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2019-audi-a4-40-tfsi',
      make: 'Audi',
      model: 'A4',
      year: 2019,
      variant: '40 TFSI',
      price: 42990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 39000,
      color: 'Grey',
      doors: 4,
      seats: 5,
      power: '140 kW',
      torque: '320 Nm',
      fuelEconomy: '6.3L/100km',
      location: 'Melbourne, VIC',
      description:
        'Premium German sedan with sophisticated styling and cutting-edge technology. Virtual cockpit and MMI navigation system.',
      features: [
        'Virtual Cockpit',
        'MMI Navigation',
        'Leather Seats',
        'Sunroof',
        'LED Matrix Headlights',
        'Parking Sensors',
        'Reversing Camera',
        'Bluetooth',
        'Cruise Control',
        'Keyless Entry'
      ],
      images: [
        {
          url: '/images/cars/audi-a4-2019.jpg',
          altText: '2019 Audi A4 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2023-hyundai-ioniq-5-awd',
      make: 'Hyundai',
      model: 'IONIQ 5',
      year: 2023,
      variant: 'AWD',
      price: 72990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: 8000,
      color: 'Silver',
      doors: 5,
      seats: 5,
      power: '225 kW',
      torque: '605 Nm',
      fuelEconomy: '0L/100km',
      location: 'Brisbane, QLD',
      description:
        'Cutting-edge electric SUV with ultra-fast charging capability. 480km+ range. Futuristic design and premium interior.',
      features: [
        'AWD',
        'Ultra-Fast Charging',
        'Vehicle-to-Load',
        'Panoramic Roof',
        'Augmented Reality HUD',
        'Wireless Charging',
        'Premium Sound System',
        'Heated/Ventilated Seats',
        '360 Camera',
        'Highway Driving Assist'
      ],
      images: [
        {
          url: '/images/cars/hyundai-ioniq5-2023.jpg',
          altText: '2023 Hyundai IONIQ 5 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2020-mercedes-benz-c200',
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2020,
      variant: 'C200',
      price: 51990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 36000,
      color: 'Black',
      doors: 4,
      seats: 5,
      power: '135 kW',
      torque: '300 Nm',
      fuelEconomy: '6.6L/100km',
      location: 'Perth, WA',
      description:
        'Luxurious Mercedes-Benz C-Class with impeccable build quality. Premium materials and advanced driver assistance systems.',
      features: [
        'COMAND Navigation',
        'Burmester Sound',
        'Leather Seats',
        'Sunroof',
        'LED Headlights',
        'Parking Package',
        'Keyless Go',
        'Active Brake Assist',
        'Attention Assist',
        'Ambient Lighting'
      ],
      images: [
        {
          url: '/images/cars/mercedes-cclass-2020.jpg',
          altText: '2020 Mercedes-Benz C-Class - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-toyota-hilux-sr5',
      make: 'Toyota',
      model: 'Hilux',
      year: 2021,
      variant: 'SR5',
      price: 56990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Ute',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      engineSize: '2.8L Turbo Diesel',
      mileage: 45000,
      color: 'White',
      doors: 4,
      seats: 5,
      power: '150 kW',
      torque: '500 Nm',
      fuelEconomy: '8.9L/100km',
      location: 'Darwin, NT',
      description:
        'Legendary reliability and toughness. Perfect work and adventure vehicle. Excellent off-road capability with proven durability.',
      features: [
        '4WD',
        'Diff Lock',
        'Tow Bar',
        'Reversing Camera',
        'Bluetooth',
        'Cruise Control',
        'Hill Start Assist',
        'Rear Diff Lock',
        'Nudge Bar',
        'Roof Racks'
      ],
      images: [
        {
          url: '/images/cars/toyota-hilux-2021.jpg',
          altText: '2021 Toyota Hilux - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2022-volkswagen-tiguan-allspace',
      make: 'Volkswagen',
      model: 'Tiguan Allspace',
      year: 2022,
      variant: '132TSI',
      price: 46990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 26000,
      color: 'Blue',
      doors: 5,
      seats: 7,
      power: '132 kW',
      torque: '320 Nm',
      fuelEconomy: '7.8L/100km',
      location: 'Adelaide, SA',
      description:
        'Spacious 7-seater SUV with European refinement. Comfortable ride, premium interior, and advanced safety technology.',
      features: [
        '7 Seats',
        'Digital Cockpit',
        'Apple CarPlay',
        'Android Auto',
        'Panoramic Roof',
        'Adaptive Cruise Control',
        'Lane Assist',
        'Park Assist',
        'Wireless Charging',
        'LED Headlights'
      ],
      images: [
        {
          url: '/images/cars/volkswagen-tiguan-2022.jpg',
          altText: '2022 VW Tiguan Allspace - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2020-lexus-rx350-luxury',
      make: 'Lexus',
      model: 'RX',
      year: 2020,
      variant: 'RX350 Luxury',
      price: 68990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '3.5L V6',
      mileage: 32000,
      color: 'Pearl White',
      doors: 5,
      seats: 5,
      power: '220 kW',
      torque: '370 Nm',
      fuelEconomy: '9.3L/100km',
      location: 'Sydney, NSW',
      description:
        'Ultimate luxury SUV with exceptional comfort and reliability. Whisper-quiet cabin, premium Mark Levinson audio, and legendary Lexus quality.',
      features: [
        'Mark Levinson Audio',
        'Leather Seats',
        'Panoramic Roof',
        'Navigation System',
        'Wireless Charging',
        'Heated/Ventilated Seats',
        'Adaptive Cruise Control',
        'Blind Spot Monitor',
        'Head-Up Display',
        'Power Tailgate'
      ],
      images: [
        {
          url: '/images/cars/lexus-rx-2020.jpg',
          altText: '2020 Lexus RX - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-peugeot-3008-gt',
      make: 'Peugeot',
      model: '3008',
      year: 2021,
      variant: 'GT',
      price: 43990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '1.6L Turbo',
      mileage: 29000,
      color: 'Grey',
      doors: 5,
      seats: 5,
      power: '121 kW',
      torque: '240 Nm',
      fuelEconomy: '6.9L/100km',
      location: 'Melbourne, VIC',
      description:
        'Stylish French SUV with unique i-Cockpit design. Comfortable, efficient, and packed with technology. Award-winning interior.',
      features: [
        'i-Cockpit',
        'Panoramic Roof',
        'Focal Premium Audio',
        'Massaging Seats',
        'Wireless Charging',
        'Grip Control',
        'Active Safety Brake',
        'Lane Keep Assist',
        'Full LED Headlights',
        'Mirror Screen'
      ],
      images: [
        {
          url: '/images/cars/hyundai-tucson-2021.jpg',
          altText: '2021 Peugeot 3008 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2023-mazda-3-g25-astina',
      make: 'Mazda',
      model: 'Mazda3',
      year: 2023,
      variant: 'G25 Astina',
      price: 39990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.5L',
      mileage: 12000,
      color: 'Red',
      doors: 4,
      seats: 5,
      power: '139 kW',
      torque: '252 Nm',
      fuelEconomy: '6.3L/100km',
      location: 'Brisbane, QLD',
      description:
        'Premium compact sedan with upscale interior. Award-winning design, excellent driving dynamics, and impressive build quality.',
      features: [
        'Bose Premium Audio',
        'Leather Seats',
        'Sunroof',
        'Head-Up Display',
        'Apple CarPlay',
        'Android Auto',
        'Traffic Sign Recognition',
        'Adaptive LED Headlights',
        'Parking Sensors',
        '360 Camera'
      ],
      images: [
        {
          url: '/images/cars/mazda3-2023.jpg',
          altText: '2023 Mazda3 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2020-volvo-xc60-t5-inscription',
      make: 'Volvo',
      model: 'XC60',
      year: 2020,
      variant: 'T5 Inscription',
      price: 57990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 41000,
      color: 'Silver',
      doors: 5,
      seats: 5,
      power: '187 kW',
      torque: '350 Nm',
      fuelEconomy: '7.9L/100km',
      location: 'Perth, WA',
      description:
        'Swedish luxury SUV with world-leading safety features. Elegant Scandinavian design, premium materials, and exceptional comfort.',
      features: [
        'Pilot Assist',
        'Bowers & Wilkins Audio',
        'Leather Seats',
        'Panoramic Roof',
        'Air Suspension',
        '360 Camera',
        'City Safety',
        'Blind Spot Information',
        'Heated/Ventilated Seats',
        'Power Tailgate'
      ],
      images: [
        {
          url: '/images/cars/volvo-xc60-2020.jpg',
          altText: '2020 Volvo XC60 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2022-honda-hr-v-vti-lx',
      make: 'Honda',
      model: 'HR-V',
      year: 2022,
      variant: 'VTi-LX',
      price: 34990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '1.8L',
      mileage: 19000,
      color: 'Blue',
      doors: 5,
      seats: 5,
      power: '105 kW',
      torque: '172 Nm',
      fuelEconomy: '6.4L/100km',
      location: 'Canberra, ACT',
      description:
        'Compact SUV with clever interior packaging. Magic Seats provide incredible versatility. Excellent fuel economy and reliability.',
      features: [
        'Magic Seats',
        'Apple CarPlay',
        'Android Auto',
        'Reversing Camera',
        'Bluetooth',
        'Cruise Control',
        'LED Headlights',
        'Climate Control',
        'Lane Watch',
        'Honda Sensing'
      ],
      images: [
        {
          url: '/images/cars/hyundai-tucson-2021.jpg',
          altText: '2022 Honda HR-V - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2021-skoda-octavia-rs',
      make: 'Skoda',
      model: 'Octavia',
      year: 2021,
      variant: 'RS',
      price: 44990,
      status: 'AVAILABLE' as const,
      featured: false,
      bodyType: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      engineSize: '2.0L Turbo',
      mileage: 33000,
      color: 'Green',
      doors: 5,
      seats: 5,
      power: '180 kW',
      torque: '370 Nm',
      fuelEconomy: '7.1L/100km',
      location: 'Adelaide, SA',
      description:
        'High-performance sedan with practical liftback design. Excellent value, huge boot space, and impressive driving dynamics.',
      features: [
        'Sports Seats',
        'Adaptive Suspension',
        'Digital Cockpit',
        'Panoramic Roof',
        'Canton Sound System',
        'Adaptive Cruise Control',
        'Matrix LED Headlights',
        'Wireless Charging',
        'Parking Sensors',
        'Keyless Entry'
      ],
      images: [
        {
          url: '/images/cars/skoda-octavia-2021.jpg',
          altText: '2021 Skoda Octavia RS - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    },
    {
      slug: '2023-kia-ev6-gt-line',
      make: 'Kia',
      model: 'EV6',
      year: 2023,
      variant: 'GT-Line',
      price: 78990,
      status: 'AVAILABLE' as const,
      featured: true,
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: 6000,
      color: 'Black',
      doors: 5,
      seats: 5,
      power: '239 kW',
      torque: '605 Nm',
      fuelEconomy: '0L/100km',
      location: 'Sydney, NSW',
      description:
        'Award-winning electric crossover with stunning design. Ultra-fast 800V charging, 500km+ range, and cutting-edge technology.',
      features: [
        'AWD',
        'Ultra-Fast Charging',
        'Augmented Reality HUD',
        'Meridian Premium Audio',
        'Relaxation Seats',
        'Dual Panoramic Displays',
        'Vehicle-to-Load',
        'Highway Driving Assist 2',
        'Remote Smart Parking',
        'Dual Wireless Charging'
      ],
      images: [
        {
          url: '/images/cars/kia-ev6-2023.jpg',
          altText: '2023 Kia EV6 - Front View',
          isPrimary: true,
          order: 0,
          width: 800,
          height: 600
        }
      ]
    }
  ]

  // Create cars with images
  console.log('\n🚗 Creating cars...')

  for (const carData of carsData) {
    const { images, features, ...carFields } = carData

    const car = await prisma.car.upsert({
      where: { slug: carData.slug },
      update: {},
      create: {
        ...carFields,
        features: features as any,
        images: {
          create: images
        }
      }
    })

    console.log(`✅ Created: ${car.year} ${car.make} ${car.model}`)
  }

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   Users: 2 (1 admin, 1 demo)`)
  console.log(`   Cars: ${carsData.length} (featuring ${carsData.filter(c => c.featured).length} featured vehicles)`)
  console.log(`\n🔐 Login credentials:`)
  console.log(`   Admin: admin@cars-online.com / admin123`)
  console.log(`   Demo: demo@example.com / demo123`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
