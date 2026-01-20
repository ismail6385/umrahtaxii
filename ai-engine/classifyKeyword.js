// Mock OpenAI Classification
export async function classifyKeyword(keyword) {
    console.log(`🧠 [Classifier] Analyzing: "${keyword}"...`);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const lower = keyword.toLowerCase();

    if (lower.includes('hotel') || lower.includes('hilton') || lower.includes('ritz')) {
        return {
            type: 'hotel',
            keyword: keyword,
            data: {
                hotelName: lower.includes('hilton') ? "Hilton Makkah" : "Ritz Carlton",
                city: lower.includes('makkah') ? "Makkah" : "Jeddah",
                slug: lower.replace(/ /g, '-').toLowerCase()
            }
        };
    }

    if (lower.includes('ziyarat')) {
        return {
            type: 'ziyarat',
            keyword: keyword,
            data: {
                city: lower.includes('madinah') ? "Madinah" : "Makkah",
                slug: lower.replace(/ /g, '-').toLowerCase()
            }
        };
    }

    // Specific Route: Airport + Hotel
    if ((lower.includes('airport') && (lower.includes('hotel') || lower.includes('pullman') || lower.includes('hilton'))) || lower.includes('to')) {
        const origin = lower.includes('jeddah') ? 'jeddah-airport' : (lower.includes('madinah') ? 'madinah-airport' : 'jeddah-airport');
        // Simple extraction logic for demo
        let destination = 'makkah-city';
        if (lower.includes('pullman')) destination = 'pullman-zamzam';
        if (lower.includes('hilton')) destination = 'hilton-makkah';

        return {
            type: 'route',
            keyword: keyword,
            data: {
                origin,
                destination,
                slug: lower.replace(/ /g, '-').toLowerCase()
            }
        };
    }

    if (lower.includes('pilgrims') || lower.includes('uk') || lower.includes('usa')) {
        const country = lower.includes('uk') ? "United Kingdom" : (lower.includes('usa') ? "USA" : "Global");
        return {
            type: 'country',
            keyword: keyword,
            data: {
                country,
                slug: `${country.toLowerCase()}-umrah-taxi`.replace(/ /g, '-')
            }
        };
    }

    return { type: 'unknown', keyword };
}
