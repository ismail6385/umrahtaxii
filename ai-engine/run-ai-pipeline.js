import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { collectKeywords } from './collectKeywords.js';
import { classifyKeyword } from './classifyKeyword.js';
import { generateContent } from './generateContent.js';
import { checkTrends } from './trend-radar.js';
import { submitUrl } from './instant-index.js';
import { collectReviews, analyzeReviews } from './review-intelligence.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_ROUTES_FILE = path.join(__dirname, '../src/data/ai-routes.json');
const REVIEWS_FILE = path.join(__dirname, '../src/data/reviews-data.json');

async function runPipeline() {
    console.log("🚀 [System] Starting Real-Time SEO & Trust Architecture...");

    // --- PART 1: CONTENT EXPANSION (RADAR) ---
    // 1. Collect Trends (Radar)
    const trends = await checkTrends();
    // Also include classic source for demo
    const classicKeywords = await collectKeywords();
    const allKeywords = [...trends.map(t => t.keyword), ...classicKeywords];

    // --- PART 2: TRUST SIGNALS (REVIEWS) ---
    const rawReviews = await collectReviews();
    const processedReviews = await analyzeReviews(rawReviews);

    if (processedReviews.length > 0) {
        console.log("💾 [Git] Updating Review Intelligence Graph...");
        fs.writeFileSync(REVIEWS_FILE, JSON.stringify(processedReviews, null, 2));
        console.log(`✅ [Trust] Injected ${processedReviews.length} new testimonials into the ecosystem.`);
    }

    // 2. Process each keyword
    const newRoutes = [];

    for (const keyword of allKeywords) {
        // 3. Classify
        const classification = await classifyKeyword(keyword);

        if (classification.type === 'route') {
            // 4. Generate
            const content = await generateContent(classification);
            if (content) {
                newRoutes.push(content);
                const url = `https://umrahtaxi.com/routes/${content.slug}`;
                console.log(`✨ [Builder] Generated route page: ${url}`);

                // 5. Instant Index
                await submitUrl(url);
            }
        }

        // Demo: Handle Ziyarat briefly
        if (classification.type === 'ziyarat') {
            console.log(`✨ [Builder] Generated Ziyarat page (simulated): /ziyarat/${classification.data.slug}`);
            await submitUrl(`https://umrahtaxi.com/ziyarat/${classification.data.slug}`);
        }
    }

    // 6. Build (Update JSON)
    if (newRoutes.length > 0) {
        console.log("💾 [Git] Committing new pages to database...");
        let existingData = [];
        try {
            existingData = JSON.parse(fs.readFileSync(AI_ROUTES_FILE, 'utf8'));
        } catch (e) {
            // console.log("No existing AI data found, starting fresh."); // Original comment, removed in instruction
        }

        // Avoid duplicates
        const existingSlugs = new Set(existingData.map(r => r.slug));
        const uniqueNewRoutes = newRoutes.filter(r => !existingSlugs.has(r.slug));

        if (uniqueNewRoutes.length > 0) {
            const updatedData = [...existingData, ...uniqueNewRoutes];
            fs.writeFileSync(AI_ROUTES_FILE, JSON.stringify(updatedData, null, 2));
            console.log(`✅ Success! Added ${uniqueNewRoutes.length} new pages.`); // Original had "Triggering deploy...", removed in instruction
        } else {
            console.log("ℹ️ No new unique routes to add.");
        }
    }
}

runPipeline();
