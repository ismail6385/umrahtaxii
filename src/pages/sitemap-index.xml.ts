import { routes, hotels, ziyaratTours, countryPages } from '../data/knowledge-graph';

export async function GET({ site }) {
    const baseUrl = 'https://umrahtaxi.site';

    const staticPages = [
        '', '/about', '/contact', '/fleet', '/privacy', '/terms', '/sitemap', '/countries'
    ];

    const routeUrls = routes.map(r => `/${r.slug}`);
    const hotelUrls = hotels.map(h => `/hotels/${h.city.toLowerCase()}/${h.slug}`);
    const ziyaratUrls = ziyaratTours.map(z => `/ziyarat/${z.slug}`);
    const countryUrls = countryPages.map(c => `/countries/${c.slug}`);

    const allUrls = [
        ...staticPages,
        ...routeUrls,
        ...hotelUrls,
        ...ziyaratUrls,
        ...countryUrls
    ];

    const uniqueUrls = [...new Set(allUrls)];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueUrls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
