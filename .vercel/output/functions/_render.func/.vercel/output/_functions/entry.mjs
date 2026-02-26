!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"d464f7b191a11d8dc15194fb430678e63582c4f8"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b7196402-686d-4c92-a097-ce468200468d",e._sentryDebugIdIdentifier="sentry-dbid-b7196402-686d-4c92-a097-ce468200468d");})();}catch(e){}};import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_eSaIPAvr.mjs';
import { manifest } from './manifest_CyLaDecp.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/api/booking.astro.mjs');
const _page5 = () => import('./pages/api/test.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/countries/_slug_.astro.mjs');
const _page8 = () => import('./pages/countries.astro.mjs');
const _page9 = () => import('./pages/dashboard.astro.mjs');
const _page10 = () => import('./pages/fleet.astro.mjs');
const _page11 = () => import('./pages/hotels/_city_/_slug_.astro.mjs');
const _page12 = () => import('./pages/privacy.astro.mjs');
const _page13 = () => import('./pages/sitemap.astro.mjs');
const _page14 = () => import('./pages/sitemap-index.xml.astro.mjs');
const _page15 = () => import('./pages/terms.astro.mjs');
const _page16 = () => import('./pages/ziyarat/_slug_.astro.mjs');
const _page17 = () => import('./pages/_slug_.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/api/booking.ts", _page4],
    ["src/pages/api/test.js", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/countries/[slug].astro", _page7],
    ["src/pages/countries/index.astro", _page8],
    ["src/pages/dashboard.astro", _page9],
    ["src/pages/fleet.astro", _page10],
    ["src/pages/hotels/[city]/[slug].astro", _page11],
    ["src/pages/privacy.astro", _page12],
    ["src/pages/sitemap.astro", _page13],
    ["src/pages/sitemap-index.xml.ts", _page14],
    ["src/pages/terms.astro", _page15],
    ["src/pages/ziyarat/[slug].astro", _page16],
    ["src/pages/[slug].astro", _page17],
    ["src/pages/index.astro", _page18]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "d8bcdd6b-ecf4-447d-bda7-2f36e5885e0e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
