export async function collectReviews() {
    console.log("🌟 [Reviews] Scanning feedback channels (WhatsApp, Maps, Email)...");

    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 600));

    // Mock Raw Reviews
    const rawReviews = [
        {
            source: "WhatsApp",
            user: "Ahmed Al-Sayed",
            text: "The driver waited for us at Jeddah Airport even though flight was delayed. Smooth ride to Hilton Makkah.",
            date: "2024-01-14"
        },
        {
            source: "Google Maps",
            user: "Sarah Jenkins",
            text: "Excellent service for our family from UK. Ziyarat in Madinah was very informative.",
            date: "2024-01-13"
        },
        {
            source: "Email",
            user: "Mohammad Raza",
            text: "Best price for Makkah to Madinah taxi. Car was clean and AC was strong.",
            date: "2024-01-12"
        },
        {
            source: "Trustpilot",
            user: "Fatima K.",
            text: "Very safe for ladies traveling alone. Highly recommend for Ziyarat.",
            date: "2024-01-10"
        }
    ];

    console.log(`💬 [Reviews] Found ${rawReviews.length} new signals.`);
    return rawReviews;
}

export async function analyzeReviews(reviews) {
    console.log("🧠 [Sentiment] Analyzing review context and sentiment...");

    return reviews.map(r => {
        let context = {
            tags: [],
            sentiment: 'positive', // simplifying for demo
            rating: 5
        };

        const lower = r.text.toLowerCase();

        // Extract Context
        if (lower.includes('jeddah') && lower.includes('makkah')) context.tags.push('jeddah-airport-to-makkah');
        if (lower.includes('hilton')) context.tags.push('hilton-makkah');
        if (lower.includes('madinah') && lower.includes('ziyarat')) context.tags.push('madinah-ziyarat-tour');
        if (lower.includes('makkah') && lower.includes('madinah')) context.tags.push('makkah-to-madinah');
        if (lower.includes('uk')) context.tags.push('uk-umrah-taxi');

        return {
            ...r,
            ...context
        };
    });
}
