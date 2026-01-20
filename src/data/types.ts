export interface Location {
    id: string;
    name: string;
    type: 'airport' | 'city' | 'hotel' | 'landmark';
    city?: string; // Parent city
    slug: string;
}

export interface Vehicle {
    id: string;
    name: string;
    type: 'sedan' | 'suv' | 'van' | 'bus';
    capacity_pax: number;
    capacity_luggage: number;
    image: string;
    features: string[];
}

export interface Route {
    id: string;
    originId: string;
    destinationId: string;
    distanceKm: number;
    durationMins: number;
    slug: string;
    description: string;
    startingPrice: number;
    type: 'intercity' | 'airport' | 'ziyarat';
    // New SEO fields
    mainKeyword: string;
    availableVehicles: string[];
    nearbyHotels: string[];
    ziyaratStops: string[];
    pilgrimOrigins: string[];
}

export interface Hotel {
    id: string;
    name: string;
    city: 'Makkah' | 'Madinah' | 'Taif';
    slug: string;
    description: string;
    // New SEO Fields
    near: string;
    airport: string;
    distance: string;
    time: string;
    popularRoutes: string[];
}

export interface CountryPage {
    id: string;
    country: string;
    slug: string;
    title: string;
    description: string;
    currency: string;
    // New SEO Fields
    language: string;
    mainRoute: string;
    secondaryRoute: string;
    airports: string[];
    pilgrims: string;
}

export interface ZiyaratTour {
    id: string;
    city: 'Makkah' | 'Madinah';
    slug: string;
    name: string;
    durationHours: number;
    spots: string[];
    price: number;
    description: string;
    // New SEO Fields
    idealFor: string;
    vehicleTypes: string[];
}
