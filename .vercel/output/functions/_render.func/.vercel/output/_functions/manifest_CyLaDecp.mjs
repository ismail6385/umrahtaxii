!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"d464f7b191a11d8dc15194fb430678e63582c4f8"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="23efb450-d48b-450c-9cca-9516743315d7",e._sentryDebugIdIdentifier="sentry-dbid-23efb450-d48b-450c-9cca-9516743315d7");})();}catch(e){}};import 'cookie';
import 'kleur/colors';
import './chunks/astro-designed-error-pages_Bnmteq1N.mjs';
import 'es-module-lexer';
import { e as decodeKey } from './chunks/astro/server_IrsiQLZO.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_B2mP-Apg.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Taxi%20KSA/ismail/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"admin/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"api/test","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test.js","pathname":"/api/test","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"countries/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/countries","isIndex":true,"type":"page","pattern":"^\\/countries$","segments":[[{"content":"countries","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/countries/index.astro","pathname":"/countries","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"fleet/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/fleet","isIndex":false,"type":"page","pattern":"^\\/fleet$","segments":[[{"content":"fleet","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fleet.astro","pathname":"/fleet","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"sitemap/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap","isIndex":false,"type":"page","pattern":"^\\/sitemap$","segments":[[{"content":"sitemap","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.astro","pathname":"/sitemap","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"sitemap-index.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sitemap-index.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap-index\\.xml$","segments":[[{"content":"sitemap-index.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap-index.xml.ts","pathname":"/sitemap-index.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.Ce9GbmoA.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.Ce9GbmoA.js"}],"styles":[],"routeData":{"route":"/api/booking","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/booking$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"booking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/booking.ts","pathname":"/api/booking","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"never"}}}],"site":"https://umrahtaxi.site","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["D:/Taxi KSA/ismail/src/pages/404.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/[slug].astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/about.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/countries/[slug].astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/countries/index.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/fleet.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/hotels/[city]/[slug].astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/sitemap.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/terms.astro",{"propagation":"none","containsHead":true}],["D:/Taxi KSA/ismail/src/pages/ziyarat/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin/login@_@astro":"pages/admin/login.astro.mjs","\u0000@astro-page:src/pages/api/test@_@js":"pages/api/test.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/countries/[slug]@_@astro":"pages/countries/_slug_.astro.mjs","\u0000@astro-page:src/pages/countries/index@_@astro":"pages/countries.astro.mjs","\u0000@astro-page:src/pages/fleet@_@astro":"pages/fleet.astro.mjs","\u0000@astro-page:src/pages/hotels/[city]/[slug]@_@astro":"pages/hotels/_city_/_slug_.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/sitemap@_@astro":"pages/sitemap.astro.mjs","\u0000@astro-page:src/pages/sitemap-index.xml@_@ts":"pages/sitemap-index.xml.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/api/booking@_@ts":"pages/api/booking.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/ziyarat/[slug]@_@astro":"pages/ziyarat/_slug_.astro.mjs","\u0000@astro-page:src/pages/[slug]@_@astro":"pages/_slug_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","D:/Taxi KSA/ismail/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_ykpULY5P.mjs","\u0000@astrojs-manifest":"manifest_CyLaDecp.mjs","D:/Taxi KSA/ismail/src/components/ShortBookingForm":"_astro/ShortBookingForm.nQIfSdoP.js","D:/Taxi KSA/ismail/src/components/BookingWidget":"_astro/BookingWidget.DCTvveHm.js","D:/Taxi KSA/ismail/src/components/BrainDashboard.jsx":"_astro/BrainDashboard.DDleDIIQ.js","D:/Taxi KSA/ismail/src/components/BookingsPanel.jsx":"_astro/BookingsPanel.DLf8LIh8.js","/astro/hoisted.js?q=0":"_astro/hoisted.vyBR-BBa.js","/astro/hoisted.js?q=1":"_astro/hoisted.CEh2tzX2.js","/astro/hoisted.js?q=2":"_astro/hoisted.DcN7ddX1.js","D:/Taxi KSA/ismail/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.CcLyVn5q.js","@astrojs/preact/client.js":"_astro/client.Bk-CEJD7.js","astro:scripts/page.js":"_astro/page.Ce9GbmoA.js","/astro/hoisted.js?q=3":"_astro/hoisted.aZMYhERv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.BsGFpg7H.css","/chunks/astro_Ck1FBLq_.mjs.map","/chunks/astro/assets-service_k95vmb8P.mjs.map","/chunks/astro/env-setup_ykpULY5P.mjs.map","/chunks/astro/server_IrsiQLZO.mjs.map","/chunks/countries_C25DjDI_.mjs.map","/chunks/ShortBookingForm_BpDa_Png.mjs.map","/chunks/noop-middleware_B2mP-Apg.mjs.map","/chunks/knowledge-graph_C9NRkQqy.mjs.map","/manifest_CyLaDecp.mjs.map","/chunks/astro-designed-error-pages_Bnmteq1N.mjs.map","/chunks/Layout_DufIozAY.mjs.map","/chunks/entrypoint_eSaIPAvr.mjs.map","/chunks/index_B4U2_89v.mjs.map","/_@astrojs-ssr-adapter.mjs.map","/_astro-internal_middleware.mjs.map","/entry.mjs.map","/pages/404.astro.mjs.map","/pages/about.astro.mjs.map","/pages/admin/login.astro.mjs.map","/pages/api/test.astro.mjs.map","/pages/contact.astro.mjs.map","/pages/countries/_slug_.astro.mjs.map","/pages/countries.astro.mjs.map","/pages/fleet.astro.mjs.map","/pages/hotels/_city_/_slug_.astro.mjs.map","/pages/privacy.astro.mjs.map","/pages/sitemap.astro.mjs.map","/pages/sitemap-index.xml.astro.mjs.map","/pages/terms.astro.mjs.map","/pages/index.astro.mjs.map","/pages/api/booking.astro.mjs.map","/pages/dashboard.astro.mjs.map","/pages/ziyarat/_slug_.astro.mjs.map","/pages/_slug_.astro.mjs.map","/renderers.mjs.map","/pages/_image.astro.mjs.map","/favicon.png","/favicon.svg","/robots.txt","/images/camry.png","/images/gmc.png","/images/hero.png","/images/hiace.png","/images/logo.png","/_astro/BookingsPanel.DLf8LIh8.js","/_astro/BookingsPanel.DLf8LIh8.js.map","/_astro/BookingWidget.DCTvveHm.js","/_astro/BookingWidget.DCTvveHm.js.map","/_astro/BrainDashboard.DDleDIIQ.js","/_astro/BrainDashboard.DDleDIIQ.js.map","/_astro/client.Bk-CEJD7.js","/_astro/client.Bk-CEJD7.js.map","/_astro/hoisted.aZMYhERv.js","/_astro/hoisted.aZMYhERv.js.map","/_astro/hoisted.CEh2tzX2.js","/_astro/hoisted.CEh2tzX2.js.map","/_astro/hoisted.DcN7ddX1.js","/_astro/hoisted.DcN7ddX1.js.map","/_astro/hoisted.vyBR-BBa.js","/_astro/hoisted.vyBR-BBa.js.map","/_astro/hooks.module.CsSOiAj3.js","/_astro/hooks.module.CsSOiAj3.js.map","/_astro/jsxRuntime.module.CuIlSVvQ.js","/_astro/jsxRuntime.module.CuIlSVvQ.js.map","/_astro/page.Ce9GbmoA.js","/_astro/page.Ce9GbmoA.js.map","/_astro/preact.module.Cd4LDe9z.js","/_astro/preact.module.Cd4LDe9z.js.map","/_astro/ShortBookingForm.nQIfSdoP.js","/_astro/ShortBookingForm.nQIfSdoP.js.map","/_astro/signals.module.CcLyVn5q.js","/_astro/signals.module.CcLyVn5q.js.map","/_astro/supabase.DLSxtwa5.js","/_astro/supabase.DLSxtwa5.js.map","/_astro/page.Ce9GbmoA.js","/404.html","/about/index.html","/admin/login/index.html","/api/test","/contact/index.html","/countries/index.html","/dashboard/index.html","/fleet/index.html","/privacy/index.html","/sitemap/index.html","/sitemap-index.xml","/terms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"30KLISBwRr5frMpxqcWUSDI4NLe2rgeCBUkk5GJUNMo=","experimentalEnvGetSecretEnabled":false});

export { manifest };
