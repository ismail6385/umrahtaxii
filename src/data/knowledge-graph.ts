import type { Location, Vehicle, Route, Hotel, CountryPage, ZiyaratTour } from './types';

// Data
export const ziyaratTours: ZiyaratTour[] = [
  {
    id: 'makkah-ziyarat',
    city: 'Makkah',
    slug: 'makkah-ziyarat-tour',
    name: 'Makkah Holy Sites Ziyarat',
    durationHours: 4,
    price: 300,
    spots: ['Masjid Aisha', 'Jabal Al-Noor (Cave of Hira)', 'Jabal Thawr', 'Mina', 'Arafat', 'Muzdalifah', 'Jannat al-Mualla'],
    description: 'Visit the historical and holy sites of Makkah with our knowledgeable drivers.',
    idealFor: 'Umrah and Hajj pilgrims, Families, Groups',
    vehicleTypes: ['Toyota Camry', 'Toyota Hiace', 'GMC Yukon', 'Hyundai Staria']
  },
  {
    id: 'madinah-ziyarat',
    city: 'Madinah',
    slug: 'madinah-ziyarat-tour',
    name: 'Madinah Holy Sites Ziyarat',
    durationHours: 4,
    price: 300,
    spots: ['Masjid Quba', 'Masjid Al-Qiblatayn', 'Mount Uhud', 'Site of Battle of Trench', 'Jannat al-Baqi', 'Seven Mosques'],
    description: 'Spiritual tour of the holy sites in Madinah including the first Mosque of Islam.',
    idealFor: 'Umrah pilgrims, Ziyarat lovers, History enthusiasts',
    vehicleTypes: ['Toyota Camry', 'Toyota Hiace', 'GMC Yukon', 'Hyundai Staria']
  }
];

export const locations: Record<string, Location> = {
  'jeddah-airport': {
    id: 'jeddah-airport',
    name: 'King Abdulaziz International Airport (JED)',
    type: 'airport',
    city: 'Jeddah',
    slug: 'jeddah-airport'
  },
  'makkah-city': {
    id: 'makkah-city',
    name: 'Makkah',
    type: 'city',
    city: 'Makkah',
    slug: 'makkah'
  },
  'madinah-city': {
    id: 'madinah-city',
    name: 'Madinah',
    type: 'city',
    city: 'Madinah',
    slug: 'madinah'
  },
  'taif-city': {
    id: 'taif-city',
    name: 'Taif',
    type: 'city',
    city: 'Taif',
    slug: 'taif'
  },
  'jeddah-city': {
    id: 'jeddah-city',
    name: 'Jeddah City',
    type: 'city',
    city: 'Jeddah',
    slug: 'jeddah'
  }
};

export const vehicles: Vehicle[] = [
  {
    id: 'camry',
    name: 'Toyota Camry 2024',
    type: 'sedan',
    capacity_pax: 4,
    capacity_luggage: 2,
    image: '/images/camry.png',
    features: ['Air Conditioning', 'Comfortable Seating', 'USB Charging', 'Best for Small Families']
  },
  {
    id: 'gmc',
    name: 'GMC Yukon XL',
    type: 'suv',
    capacity_pax: 7,
    capacity_luggage: 5,
    image: '/images/gmc.png',
    features: ['Luxury Interior', 'Extra Luggage Space', 'Privacy Tint', 'WiFi Available', 'VIP Transfer']
  },
  {
    id: 'staria',
    name: 'Hyundai Staria',
    type: 'van',
    capacity_pax: 7,
    capacity_luggage: 6,
    image: '/images/hiace.png',
    features: ['Modern Design', 'Spacious Legroom', 'Perfect for Groups']
  },
  {
    id: 'starex',
    name: 'Hyundai Starex',
    type: 'van',
    capacity_pax: 7,
    capacity_luggage: 5,
    image: '/images/hiace.png',
    features: ['Reliable & Durable', 'Comfortable Ride', 'Ideal for Families']
  },
  {
    id: 'hiace',
    name: 'Toyota Hiace',
    type: 'van',
    capacity_pax: 11,
    capacity_luggage: 10,
    image: '/images/hiace.png',
    features: ['Group Travel', 'Spacious', 'AC Vents for all rows', 'Best Value']
  },
  {
    id: 'coaster',
    name: 'Toyota Coaster',
    type: 'bus',
    capacity_pax: 17,
    capacity_luggage: 15,
    image: '/images/hiace.png',
    features: ['Large Group Transport', 'AC Coach', 'Comfortable Seating', 'Perfect for Umrah Groups']
  }
];

import aiRoutesData from './ai-routes.json';

// ... existing code ...

export const routes: Route[] = [
  ...aiRoutesData as Route[],
  {
    id: 'jed-makkah',
    originId: 'jeddah-airport',
    destinationId: 'makkah-city',
    distanceKm: 100,
    durationMins: 75,
    slug: 'jeddah-airport-to-makkah-taxi',
    description: 'The most popular route for Umrah pilgrims. Direct luxury transfer from Jeddah Airport (JED) to your hotel in Makkah. Meet & Greet included.',
    startingPrice: 200,
    type: 'airport',
    mainKeyword: 'Jeddah Airport to Makkah Taxi',
    availableVehicles: ['Toyota Camry', 'Toyota Hiace', 'GMC Yukon', 'Hyundai Staria'],
    nearbyHotels: ['Fairmont Makkah Clock Tower', 'Swissôtel Makkah', 'Dar Al Tawhid InterContinental'],
    ziyaratStops: ['Masjid Aisha', 'Jabal Al-Noor', 'Mina'],
    pilgrimOrigins: ['Pakistan', 'India', 'UK', 'USA', 'Indonesia']
  },
  {
    id: 'makkah-jed',
    originId: 'makkah-city',
    destinationId: 'jeddah-airport',
    distanceKm: 100,
    durationMins: 75,
    slug: 'makkah-to-jeddah-airport-taxi',
    description: 'Reliable return transfer from your Makkah hotel to Jeddah Airport (JED). Arrive on time for your flight with our punctual service.',
    startingPrice: 200,
    type: 'airport',
    mainKeyword: 'Makkah to Jeddah Airport Taxi',
    availableVehicles: ['Toyota Camry', 'Toyota Hiace', 'GMC Yukon', 'Hyundai Staria'],
    nearbyHotels: ['Jeddah Airport Hotels', 'Radisson Blu Jeddah'],
    ziyaratStops: ['Jiddah Corniche', 'Red Sea Mall'],
    pilgrimOrigins: ['International']
  },
  {
    id: 'makkah-madinah',
    originId: 'makkah-city',
    destinationId: 'madinah-city',
    distanceKm: 450,
    durationMins: 270,
    slug: 'makkah-to-madinah-taxi',
    description: 'Scenic journey between the two Holy Cities. Comfortable long-distance travel on the Haramain route with optional rest stops.',
    startingPrice: 400,
    type: 'intercity',
    mainKeyword: 'Makkah to Madinah Taxi Service',
    availableVehicles: ['GMC Yukon', 'Toyota Hiace', 'Hyundai Staria'],
    nearbyHotels: ['Pullman Zamzam Madinah', 'Anwar Al Madinah', 'Hilton Madinah'],
    ziyaratStops: ['Masjid Quba', 'Mount Uhud', 'Masjid Al-Qiblatayn'],
    pilgrimOrigins: ['UK', 'USA', 'Malaysia', 'Pakistan', 'Turkey']
  },
  {
    id: 'madinah-jed',
    originId: 'madinah-city',
    destinationId: 'jeddah-airport',
    distanceKm: 400,
    durationMins: 240,
    slug: 'madinah-to-jeddah-airport-taxi',
    description: 'Direct transfer from Madinah to Jeddah Airport. Avoid the hassle of buses with our private car service.',
    startingPrice: 450,
    type: 'airport',
    mainKeyword: 'Madinah to Jeddah Airport Taxi',
    availableVehicles: ['Toyota Camry', 'GMC Yukon', 'Toyota Coaster'],
    nearbyHotels: ['Ritz Carlton Jeddah', 'Waldorf Astoria Jeddah', 'Jeddah Airport Hotels'],
    ziyaratStops: ['Seven Mosques', 'Date Market', 'Ghars Well'],
    pilgrimOrigins: ['India', 'Egypt', 'Bangladesh', 'UK', 'Canada']
  },
  {
    id: 'makkah-taif',
    originId: 'makkah-city',
    destinationId: 'taif-city',
    distanceKm: 88,
    durationMins: 90,
    slug: 'makkah-to-taif-taxi',
    description: 'VIP transfer from Makkah to Taif (City of Roses). Enjoy the scenic mountain drive with professional chauffeur service.',
    startingPrice: 300,
    type: 'intercity',
    mainKeyword: 'Makkah to Taif Taxi',
    availableVehicles: ['GMC Yukon', 'Toyota Camry', 'Hyundai Staria'],
    nearbyHotels: ['InterContinental Taif', 'Taif Rose Hotel', 'Shubra Palace Hotel'],
    ziyaratStops: ['Taif Rose Garden', 'Shubra Palace', 'Al Rudaf Park'],
    pilgrimOrigins: ['UAE', 'Qatar', 'Kuwait', 'Saudi Domestic', 'Bahrain']
  },
  {
    id: 'jeddah-taif',
    originId: 'jeddah-city',
    destinationId: 'taif-city',
    distanceKm: 167,
    durationMins: 120,
    slug: 'jeddah-to-taif-taxi',
    description: 'Comfortable VIP chauffeur service from Jeddah to the beautiful highlands of Taif. Perfect for families and groups.',
    startingPrice: 350,
    type: 'intercity',
    mainKeyword: 'Jeddah to Taif Taxi',
    availableVehicles: ['GMC Yukon', 'Toyota Hiace', 'Hyundai Staria'],
    nearbyHotels: ['InterContinental Taif', 'Taif Rose Hotel'],
    ziyaratStops: ['Taif Rose Garden', 'Al Hada Mountain', 'Shubra Palace'],
    pilgrimOrigins: ['International Travelers', 'UAE', 'Qatar', 'Kuwait']
  }
];

export const hotels: Hotel[] = [
  // Makkah
  {
    id: 'hilton-makkah',
    name: 'Hilton Makkah Convention Hotel',
    city: 'Makkah',
    slug: 'hilton-makkah',
    description: 'Luxury transfer to Hilton Makkah, steps away from the Haram.',
    near: 'Masjid al-Haram',
    airport: 'Jeddah Airport',
    distance: '87 km',
    time: '1 hour 30 minutes',
    popularRoutes: [
      'Jeddah Airport to Hilton Makkah',
      'Hilton Makkah to Madinah',
      'Hilton Makkah to Makkah Ziyarat'
    ]
  },
  {
    id: 'clock-tower',
    name: 'Makkah Clock Royal Tower',
    city: 'Makkah',
    slug: 'clock-tower',
    description: 'Premium chauffeur service to the iconic Clock Tower.',
    near: 'Masjid al-Haram',
    airport: 'Jeddah Airport',
    distance: '85 km',
    time: '1 hour 25 minutes',
    popularRoutes: [
      'Jeddah Airport to Clock Tower Makkah',
      'Clock Tower to Madinah',
      'Clock Tower to Taif'
    ]
  },
  {
    id: 'dar-al-tawhid',
    name: 'Dar Al Tawhid InterContinental',
    city: 'Makkah',
    slug: 'dar-al-tawhid',
    description: 'VIP transport to Dar Al Tawhid, directly facing the Holy Kaaba.',
    near: 'King Fahd Gate',
    airport: 'Jeddah Airport',
    distance: '86 km',
    time: '1 hour 30 minutes',
    popularRoutes: [
      'Jeddah Airport to Dar Al Tawhid',
      'Dar Al Tawhid to Madinah',
      'Dar Al Tawhid to Jeddah City'
    ]
  },
  // Madinah
  {
    id: 'pullman-zamzam',
    name: 'Pullman Zamzam Madinah',
    city: 'Madinah',
    slug: 'pullman-zamzam',
    description: 'Comfortable ride to Pullman Zamzam, near the Prophet\'s Mosque.',
    near: 'Masjid An-Nabawi',
    airport: 'Madinah Airport',
    distance: '20 km',
    time: '25 minutes',
    popularRoutes: [
      'Madinah Airport to Pullman Zamzam',
      'Pullman Zamzam to Makkah',
      'Pullman Zamzam to Madinah Ziyarat'
    ]
  },
  {
    id: 'taiba-front',
    name: 'Taiba Front Hotel',
    city: 'Madinah',
    slug: 'taiba-front',
    description: 'Direct taxi to Taiba Front Hotel in Madinah.',
    near: 'Masjid An-Nabawi',
    airport: 'Madinah Airport',
    distance: '18 km',
    time: '20 minutes',
    popularRoutes: [
      'Madinah Airport to Taiba Front',
      'Taiba Front to Makkah',
      'Taiba Front to Uhud Mountain'
    ]
  },
  {
    id: 'intercontinental-taif',
    name: 'InterContinental Taif',
    city: 'Taif',
    slug: 'intercontinental-taif',
    description: 'Luxury transfer to InterContinental Taif in the City of Roses.',
    near: 'King Abdullah Park',
    airport: 'Jeddah Airport',
    distance: '160 km',
    time: '2 hours',
    popularRoutes: [
      'Jeddah Airport to Taif',
      'Makkah to Taif'
    ]
  }
];

export { countryPages } from './countries';
