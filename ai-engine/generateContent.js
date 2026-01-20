// Mock OpenAI Content Generation
export async function generateContent(classification) {
    console.log(`📝 [Generator] Writing SEO content for [${classification.type}]: ${classification.keyword}`);

    // Simulate huge LLM processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (classification.type === 'route') {
        return {
            id: `ai-${Date.now()}`,
            originId: 'jeddah-airport',
            destinationId: 'makkah-city',
            distanceKm: 105,
            durationMins: 70,
            slug: classification.data.slug,
            description: `Auto-generated premium transfer description for ${classification.keyword}. Optimized for high CTR.`,
            startingPrice: 210,
            type: 'airport',
            mainKeyword: classification.keyword,
            availableVehicles: ["GMC Yukon", "Toyota Hiace"],
            nearbyHotels: ["Hilton", "Swissotel"],
            ziyaratStops: ["Ayesha Mosque"],
            pilgrimOrigins: ["Global"]
        };
    }

    if (classification.type === 'hotel') {
        // Return structured data for hotel
        return {
            id: `ai-hotel-${Date.now()}`,
            name: classification.data.hotelName,
            city: classification.data.city,
            slug: classification.data.slug,
            description: `Exclusive taxi services to ${classification.data.hotelName}. Door-to-door luxury.`,
            near: "City Center",
            airport: "Jeddah Airport",
            distance: "95 km",
            time: "1 hr 20 min",
            popularRoutes: ["Airport to Hotel", "Hotel to Haram"]
        };
    }

    return null;
}
