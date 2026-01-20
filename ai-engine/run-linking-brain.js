import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/knowledge-graph.ts');
const OUTPUT_FILE = path.join(__dirname, '../src/data/related-links.json');

// Mock AI Decision Logic
async function decideRelatedLinks(page, allPages) {
    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 50));

    // Simple heuristic to simulate "AI" semantic matching
    let related = [];

    // Strategy 1: Location Matching (e.g. all Makkah pages)
    const SameLocation = allPages.filter(p => p.slug !== page.slug && (p.slug.includes('makkah') && page.slug.includes('makkah')));

    // Strategy 2: Cross-Sell (Route -> Hotel)
    if (page.type === 'route') {
        const Hotels = allPages.filter(p => p.type === 'hotel');
        related.push(...Hotels.slice(0, 2));
    }

    // Strategy 3: Upsell (Hotel -> Ziyarat)
    if (page.type === 'hotel') {
        const Ziyarat = allPages.filter(p => p.type === 'ziyarat');
        related.push(...Ziyarat.slice(0, 2));
        // Also routes to this hotel
        const Routes = allPages.filter(p => p.slug.includes('jeddah') && p.type === 'route');
        related.push(...Routes.slice(0, 2));
    }

    // Strategy 4: International Authority (Country -> Main Route)
    if (page.type === 'country') {
        const MainRoutes = allPages.filter(p => p.slug.includes('jeddah-airport-to-makkah'));
        related.push(...MainRoutes);
        const Ziyarat = allPages.filter(p => p.type === 'ziyarat');
        related.push(...Ziyarat.slice(0, 1));
    }

    // Strategy 5: Ziyarat -> Main Transport
    if (page.type === 'ziyarat') {
        const Routes = allPages.filter(p => p.type === 'route');
        related.push(...Routes.slice(0, 3));
    }

    // Fill remaining with random "Same Location" high relevance links
    if (related.length < 4) {
        related.push(...SameLocation.slice(0, 4 - related.length));
    }

    // De-duplicate and Format
    const uniqueLinks = [...new Set(related.map(r => r.slug))].map(slug => {
        const p = allPages.find(x => x.slug === slug);
        return {
            title: formatTitle(p),
            url: getUrl(p)
        };
    }).slice(0, 4); // specific number requested

    return uniqueLinks;
}

function formatTitle(page) {
    if (page.type === 'route') return `${formatSlug(page.slug)} Taxi`;
    if (page.type === 'hotel') return `${formatSlug(page.slug)} Transfer`;
    if (page.type === 'country') return `${formatSlug(page.slug)}`;
    if (page.type === 'ziyarat') return `${formatSlug(page.slug)}`;
    return page.slug;
}

function formatSlug(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getUrl(page) {
    if (page.type === 'route') return `/routes/${page.slug}`;
    if (page.type === 'hotel') return `/hotels/${page.city || 'makkah'}/${page.slug}`;
    if (page.type === 'country') return `/countries/${page.slug}`;
    if (page.type === 'ziyarat') return `/ziyarat/${page.slug}`;
    return '/';
}

function extractPages(content) {
    const pages = [];

    // Very basic regex extraction for the demo to avoid TS parsing complexity
    // We look for objects with slugs and try to guess the type based on context or explicit type field

    // Extract Routes
    const routeRegex = /slug:\s*'([^']+)',[\s\S]*?type:\s*'([^']+)'/g;
    let match;
    while ((match = routeRegex.exec(content)) !== null) {
        pages.push({ slug: match[1], type: 'route', context: match[2] });
    }

    // Extract Hotels (Hotels usually have city property nearby)
    const hotelRegex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*city:\s*'([^']+)',\s*slug:\s*'([^']+)'/g;
    while ((match = hotelRegex.exec(content)) !== null) {
        pages.push({ slug: match[4], type: 'hotel', city: match[3].toLowerCase() });
    }

    // Extract Countries
    const countryRegex = /id:\s*'([^']+)',\s*country:\s*'([^']+)',\s*slug:\s*'([^']+)'/g;
    while ((match = countryRegex.exec(content)) !== null) {
        pages.push({ slug: match[3], type: 'country', country: match[2] });
    }

    // Extract Ziyarat
    const ziyaratRegex = /id:\s*'([^']+)',\s*city:\s*'([^']+)',\s*slug:\s*'([^']+)'/g;
    // Note: Ziyarat might overlap with hotel regex if not careful, but key order helps. 
    // Actually, in the file, Ziyarat is defined separately.
    // Let's use a simpler approach: Manual mock of the structure since we know it.
    // Or just look for all slugs and categorize by string content as a fallback.

    // Fallback: Scan for all slugs
    const allSlugsRegex = /slug:\s*'([^']+)'/g;
    let allMatches = [];
    while ((match = allSlugsRegex.exec(content)) !== null) {
        allMatches.push(match[1]);
    }

    // Categorize
    const refinedPages = allMatches.map(slug => {
        if (slug.includes('to-')) return { slug, type: 'route' };
        if (slug.includes('hotel') || slug.includes('clock-tower') || slug.includes('dar-al-tawhid') || slug.includes('pullman')) return { slug, type: 'hotel', city: slug.includes('madinah') ? 'madinah' : 'makkah' }; // rough heuristic
        if (slug.includes('pilgrims') || slug.includes('uk') || slug.includes('usa') || slug.includes('pakistan') || slug.includes('india')) return { slug, type: 'country' };
        if (slug.includes('ziyarat')) return { slug, type: 'ziyarat' };
        return { slug, type: 'other' };
    });

    return refinedPages;
}

async function run() {
    console.log("🧠 [Brain] Starting Link Decision Engine...");

    const tsContent = fs.readFileSync(DATA_FILE, 'utf8');
    const pages = extractPages(tsContent);

    console.log(`📊 [Brain] Analyzed ${pages.length} entities from Knowledge Graph.`);

    const linksMap = {};

    for (const page of pages) {
        console.log(`🤔 [AI] Deciding links for: ${page.slug} (${page.type})`);
        const links = await decideRelatedLinks(page, pages);
        linksMap[page.slug] = links;
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(linksMap, null, 2));
    console.log(`✅ [Brain] Injected ${Object.keys(linksMap).length * 4} smart links into the site ecosystem.`);
}

run();
