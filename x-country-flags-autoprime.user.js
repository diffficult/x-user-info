// ==UserScript==
// @name         X Country Flags (Automatic Bootstrap)
// @namespace    https://x.com/
// @version      0.3.0
// @description  Fetches X account-country flags in Firefox (Violentmonkey) and Chromium (Tampermonkey) without opening a profile.
// @updateURL     https://forge.ikelos.xyz/5320/x-user-info/raw/branch/main/x-country-flags-autoprime.user.js
// @downloadURL   https://forge.ikelos.xyz/5320/x-user-info/raw/branch/main/x-country-flags-autoprime.user.js
// @icon         data:image/png;base64,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
// @match        https://x.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_info
// @inject-into  auto
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const ABOUT_ACCOUNT_QUERY_ID = "TzOG2twZEfhr9KmClvVVqA";
  const CACHE_KEY = "x-country-flags-autoprime-cache-v1";
  const REQUEST_INTERVAL_MS = 3 * 1000;
  const FAILURE_COOLDOWN_MS = 30 * 60 * 1000;
  const TRANSIENT_BACKOFF_MS = 60 * 1000;
  const WRITE_DEBOUNCE_MS = 1000;
  const MARKER_ATTR = "data-x-country-flags-autoprime-marker";
  const GRAPHQL_PATH = /\/i\/api\/graphql\/[^/]+\/[^/]+/;
  const cache = new Map(Object.entries(readStoredCache()));
  const inflight = new Map();
  const requestQueue = [];
  const pendingArticles = new Set();
  let requestTemplate = null;
  let requestTimer = null;
  let writeTimer = null;
  let nextRequestAt = 0;
  let cooldownUntil = 0;

  installGraphqlCapture();
  logContext();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  function start() {
    observeTimeline();
    processTweets(document);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        flushStoredCache();
      }
    });
  }

  function readStoredCache() {
    try {
      return GM_getValue(CACHE_KEY, {});
    } catch {
      return {};
    }
  }

  function writeStoredCache() {
    if (writeTimer) {
      return;
    }
    writeTimer = setTimeout(() => {
      writeTimer = null;
      try {
        GM_setValue(CACHE_KEY, Object.fromEntries(cache));
      } catch {
        // The in-memory cache still avoids duplicate requests in this tab.
      }
    }, WRITE_DEBOUNCE_MS);
  }

  function flushStoredCache() {
    if (!writeTimer) {
      return;
    }
    clearTimeout(writeTimer);
    writeTimer = null;
    try {
      GM_setValue(CACHE_KEY, Object.fromEntries(cache));
    } catch {
      // The in-memory cache still avoids duplicate requests in this tab.
    }
  }

  function observeTimeline() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) {
            continue;
          }

          if (node.matches?.('article[data-testid="tweet"]')) {
            processTweet(node);
          }
          processTweets(node);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function processTweets(root) {
    for (const article of root.querySelectorAll?.('article[data-testid="tweet"]') ?? []) {
      processTweet(article);
    }
  }

  function processTweet(article) {
    const timestampAnchor = article.querySelector('a[href*="/status/"] > time')?.closest("a");
    const screenName = getScreenName(timestampAnchor);
    if (!timestampAnchor || !screenName) {
      return;
    }

    article.dataset.xCountryFlagsAutoprimeHandle = screenName;
    const cached = readCacheEntry(screenName);
    if (cached) {
      if (cached.countryCode) {
        insertFlag(timestampAnchor, cached.countryCode, cached.countryName);
      }
      return;
    }

    pendingArticles.add(article);
    void fetchCountry(screenName).then((entry) => {
      if (entry?.countryCode) {
        renderPendingArticles(screenName, entry.countryCode, entry.countryName);
      } else {
        clearPendingArticles(screenName);
      }
    });
  }

  function getScreenName(anchor) {
    if (!anchor) {
      return null;
    }

    const match = new URL(anchor.href, location.origin).pathname.match(/^\/([^/]+)\/status\/\d+/);
    return match?.[1]?.toLowerCase() ?? null;
  }

  function readCacheEntry(screenName) {
    return cache.get(screenName) ?? null;
  }

  function storeCacheEntry(screenName, entry) {
    cache.set(screenName, entry);
    writeStoredCache();
  }

  async function fetchCountry(screenName) {
    const cached = readCacheEntry(screenName);
    if (cached) {
      return cached;
    }
    if (inflight.has(screenName)) {
      return inflight.get(screenName);
    }
    if (!requestTemplate) {
      return null;
    }

    const promise = new Promise((resolve) => {
      requestQueue.push({ screenName, resolve });
      scheduleQueuedRequest();
    });
    inflight.set(screenName, promise);
    try {
      const entry = await promise;
      if (entry) {
        storeCacheEntry(screenName, entry);
      }
      return entry;
    } finally {
      inflight.delete(screenName);
    }
  }

  function scheduleQueuedRequest() {
    if (requestTimer || requestQueue.length === 0) {
      return;
    }

    const delay = Math.max(0, nextRequestAt - Date.now(), cooldownUntil - Date.now());
    requestTimer = setTimeout(async () => {
      requestTimer = null;
      const job = requestQueue.shift();
      if (!job) {
        return;
      }

      const entry = await requestCountry(job.screenName);
      nextRequestAt = Date.now() + REQUEST_INTERVAL_MS;
      job.resolve(entry);
      prunePendingArticles();
      scheduleQueuedRequest();
    }, delay);
  }

  async function requestCountry(screenName) {
    let response;
    try {
      const url = new URL(requestTemplate.url);
      url.pathname = `/i/api/graphql/${ABOUT_ACCOUNT_QUERY_ID}/AboutAccountQuery`;
      url.search = "";
      url.searchParams.set("variables", JSON.stringify({ screenName }));

      response = await requestTemplate.fetch(url.toString(), {
        method: "GET",
        credentials: "include",
        headers: requestTemplate.headers,
      });
    } catch (error) {
      pauseRequests(TRANSIENT_BACKOFF_MS, `network error for @${screenName}: ${error}`);
      return null;
    }

    if (!response.ok) {
      pauseRequests(
        backoffForStatus(response.status),
        `request failed (HTTP ${response.status}) for @${screenName}`,
      );
      return null;
    }

    let payload;
    try {
      payload = await response.json();
    } catch (error) {
      pauseRequests(TRANSIENT_BACKOFF_MS, `invalid JSON response for @${screenName}: ${error}`);
      return null;
    }

    if (!payload?.data) {
      const message = payload?.errors?.[0]?.message ?? "unknown GraphQL error";
      const staleQuery = /not found|no operation named/i.test(message);
      pauseRequests(
        staleQuery ? FAILURE_COOLDOWN_MS : TRANSIENT_BACKOFF_MS,
        staleQuery
          ? `stale AboutAccountQuery ID (${ABOUT_ACCOUNT_QUERY_ID}): ${message}`
          : `GraphQL error for @${screenName}: ${message}`,
      );
      return null;
    }

    const aboutProfile = payload.data.user_result_by_screen_name?.result?.about_profile;
    const countryName = aboutProfile?.account_based_in ?? null;
    const countryCode = aboutProfile?.created_country_accurate
      ? countryNameToCode(countryName)
      : null;
    return { countryName, countryCode };
  }

  function backoffForStatus(status) {
    if (status === 429 || status === 401 || status === 403 || status === 404) {
      return FAILURE_COOLDOWN_MS;
    }
    return TRANSIENT_BACKOFF_MS;
  }

  function pauseRequests(delay, reason) {
    cooldownUntil = Date.now() + delay;
    console.warn(
      `[X Country Flags] Country lookups paused for ${Math.round(delay / 60000)} min:`,
      reason,
    );
  }

  function renderPendingArticles(screenName, countryCode, countryName) {
    for (const article of [...pendingArticles]) {
      if (article.dataset.xCountryFlagsAutoprimeHandle !== screenName) {
        continue;
      }
      if (!article.isConnected) {
        pendingArticles.delete(article);
        continue;
      }
      const anchor = article.querySelector('a[href*="/status/"] > time')?.closest("a");
      if (anchor) {
        insertFlag(anchor, countryCode, countryName);
      }
      pendingArticles.delete(article);
    }
  }

  function clearPendingArticles(screenName) {
    for (const article of [...pendingArticles]) {
      if (article.dataset.xCountryFlagsAutoprimeHandle === screenName) {
        pendingArticles.delete(article);
      }
    }
  }

  function prunePendingArticles() {
    for (const article of [...pendingArticles]) {
      if (!article.isConnected) {
        pendingArticles.delete(article);
      }
    }
  }

  function insertFlag(anchor, countryCode, countryName) {
    const flag = countryCodeToEmoji(countryCode);
    if (!flag) {
      return;
    }
    const existing = anchor.parentElement?.querySelector(`[${MARKER_ATTR}]`);
    if (existing) {
      existing.textContent = ` \u00b7 ${flag}`;
      existing.title = countryName;
      return;
    }

    const marker = document.createElement("span");
    marker.setAttribute(MARKER_ATTR, "true");
    marker.textContent = ` \u00b7 ${flag}`;
    marker.title = countryName;
    marker.style.whiteSpace = "pre";
    marker.style.cursor = "help";
    anchor.insertAdjacentElement("afterend", marker);
  }

  function installGraphqlCapture() {
    const pageWindow = getPageWindow();
    const inPageWorld = pageWindow === window;

    // In Firefox content context the patched hooks must be exported into the page world
    // (exportFunction); everywhere else a plain assignment is enough.
    const wrapForPage = inPageWorld || typeof exportFunction !== "function"
      ? (fn) => fn
      : (fn) => exportFunction(fn, pageWindow);

    const originalFetch = pageWindow.fetch;
    if (typeof originalFetch === "function") {
      pageWindow.fetch = wrapForPage(function patchedFetch(input, init) {
        const request = input && typeof input === "object" && input.url ? input : null;
        captureTemplate(
          request ? request.url : String(input),
          init?.headers || request?.headers || {},
        );
        return originalFetch.apply(this, arguments);
      });
    }

    const proto = pageWindow.XMLHttpRequest?.prototype;
    if (proto && typeof proto.open === "function") {
      const originalOpen = proto.open;
      const originalSend = proto.send;
      const originalSetRequestHeader = proto.setRequestHeader;

      proto.open = wrapForPage(function patchedOpen(method, url) {
        this.__xCountryFlagsAutoprimeUrl = url;
        this.__xCountryFlagsAutoprimeHeaders = {};
        return originalOpen.apply(this, arguments);
      });

      proto.setRequestHeader = wrapForPage(function patchedSetRequestHeader(key, value) {
        if (this.__xCountryFlagsAutoprimeHeaders) {
          this.__xCountryFlagsAutoprimeHeaders[key] = value;
        }
        return originalSetRequestHeader.apply(this, arguments);
      });

      proto.send = wrapForPage(function patchedSend() {
        captureTemplate(this.__xCountryFlagsAutoprimeUrl, this.__xCountryFlagsAutoprimeHeaders);
        return originalSend.apply(this, arguments);
      });
    }

    function captureTemplate(rawUrl, headersLike) {
      if (requestTemplate) {
        return;
      }
      if (!rawUrl) {
        return;
      }

      const url = new URL(rawUrl, location.origin);
      if (!GRAPHQL_PATH.test(url.pathname)) {
        return;
      }

      const headers = extractHeaderMap(headersLike);
      if (!headers.authorization) {
        return;
      }

      delete headers["content-length"];
      delete headers["cookie"];
      delete headers["host"];
      requestTemplate = {
        url: url.toString(),
        headers,
        fetch: function (...args) {
          return originalFetch.apply(pageWindow, args);
        },
      };
      console.info(
        `[X Country Flags] Captured timeline GraphQL request. injectInto=${getInjectContext()}`,
      );
      processTweets(document);
    }

    // Flatten headers to a plain lowercase-key map; works with page-world Headers
    // (Xray-wrapped), content-world Headers, and plain objects.
    function extractHeaderMap(headersLike) {
      const out = {};
      try {
        if (!headersLike) {
          return out;
        }
        if (typeof headersLike.forEach === "function") {
          headersLike.forEach((value, key) => {
            out[String(key).toLowerCase()] = String(value);
          });
          return out;
        }
        const headers = headersLike instanceof Headers ? headersLike : new Headers(headersLike);
        headers.forEach((value, key) => {
          out[key] = value;
        });
        return out;
      } catch {
        return out;
      }
    }
  }

  function getPageWindow() {
    // Firefox content context exposes the page world through wrappedJSObject.
    // In page-context injection (Violentmonkey auto/page, Tampermonkey) window is already the page.
    return window.wrappedJSObject || window;
  }

  function getInjectContext() {
    if (typeof GM_info === "object" && GM_info?.injectInto) {
      return GM_info.injectInto;
    }
    return "n/a";
  }

  function logContext() {
    const canPatchPage =
      window.wrappedJSObject != null || typeof exportFunction === "function";
    console.info(
      `[X Country Flags] injectInto=${getInjectContext()} pageWorld=${window.wrappedJSObject == null} wrappedJSObject=${window.wrappedJSObject != null} exportFunction=${typeof exportFunction === "function"}`,
    );
    if (!canPatchPage) {
      console.warn(
        "[X Country Flags] Page-context fetch interception is unavailable here; flags will not resolve.",
      );
    }
  }

  function countryNameToCode(name) {
    return COUNTRY_CODES[normalizeName(name)] ?? null;
  }

  function normalizeName(name) {
    return String(name ?? "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-zA-Z0-9 ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function countryCodeToEmoji(code) {
    if (code === "AMERICAS") {
      return "\u{1F30E}";
    }

    if (!/^[A-Z]{2}$/i.test(code)) {
      return null;
    }
    return String.fromCodePoint(...code.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0)));
  }

  const COUNTRY_CODES = Object.fromEntries(`
AF|Afghanistan
AL|Albania
DZ|Algeria
AD|Andorra
AO|Angola
AG|Antigua and Barbuda
AR|Argentina
AM|Armenia
AU|Australia
AT|Austria
AZ|Azerbaijan
BS|Bahamas
BH|Bahrain
BD|Bangladesh
BB|Barbados
BY|Belarus
BE|Belgium
BZ|Belize
BJ|Benin
BT|Bhutan
BO|Bolivia
BA|Bosnia and Herzegovina
BW|Botswana
BR|Brazil
BN|Brunei
BG|Bulgaria
BF|Burkina Faso
BI|Burundi
CV|Cabo Verde
KH|Cambodia
CM|Cameroon
CA|Canada
CF|Central African Republic
TD|Chad
CL|Chile
CN|China
CO|Colombia
KM|Comoros
CG|Congo
CD|Democratic Republic of the Congo
CR|Costa Rica
CI|Cote d Ivoire
HR|Croatia
CU|Cuba
CY|Cyprus
CZ|Czechia
DK|Denmark
DJ|Djibouti
DM|Dominica
DO|Dominican Republic
EC|Ecuador
EG|Egypt
SV|El Salvador
GQ|Equatorial Guinea
ER|Eritrea
EE|Estonia
SZ|Eswatini
ET|Ethiopia
FJ|Fiji
FI|Finland
FR|France
GA|Gabon
GM|Gambia
GE|Georgia
DE|Germany
GH|Ghana
GR|Greece
GD|Grenada
GT|Guatemala
GN|Guinea
GW|Guinea Bissau
GY|Guyana
HT|Haiti
HN|Honduras
HU|Hungary
IS|Iceland
IN|India
ID|Indonesia
IR|Iran
IQ|Iraq
IE|Ireland
IL|Israel
IT|Italy
JM|Jamaica
JP|Japan
JO|Jordan
KZ|Kazakhstan
KE|Kenya
KI|Kiribati
XK|Kosovo
KW|Kuwait
KG|Kyrgyzstan
LA|Laos
LV|Latvia
LB|Lebanon
LS|Lesotho
LR|Liberia
LY|Libya
LI|Liechtenstein
LT|Lithuania
LU|Luxembourg
MG|Madagascar
MW|Malawi
MY|Malaysia
MV|Maldives
ML|Mali
MT|Malta
MH|Marshall Islands
MR|Mauritania
MU|Mauritius
MX|Mexico
FM|Micronesia
MD|Moldova
MC|Monaco
MN|Mongolia
ME|Montenegro
MA|Morocco
MZ|Mozambique
MM|Myanmar
NA|Namibia
NR|Nauru
NP|Nepal
NL|Netherlands
NZ|New Zealand
NI|Nicaragua
NE|Niger
NG|Nigeria
KP|North Korea
MK|North Macedonia
NO|Norway
OM|Oman
PK|Pakistan
PW|Palau
PS|Palestine
PA|Panama
PG|Papua New Guinea
PY|Paraguay
PE|Peru
PH|Philippines
PL|Poland
PT|Portugal
QA|Qatar
RO|Romania
RU|Russia
RW|Rwanda
KN|Saint Kitts and Nevis
LC|Saint Lucia
VC|Saint Vincent and the Grenadines
WS|Samoa
SM|San Marino
ST|Sao Tome and Principe
SA|Saudi Arabia
SN|Senegal
RS|Serbia
SC|Seychelles
SL|Sierra Leone
SG|Singapore
SK|Slovakia
SI|Slovenia
SB|Solomon Islands
SO|Somalia
ZA|South Africa
KR|South Korea
SS|South Sudan
ES|Spain
LK|Sri Lanka
SD|Sudan
SR|Suriname
SE|Sweden
CH|Switzerland
SY|Syria
TW|Taiwan
TJ|Tajikistan
TZ|Tanzania
TH|Thailand
TL|Timor Leste
TG|Togo
TO|Tonga
TT|Trinidad and Tobago
TN|Tunisia
TR|Turkey
TM|Turkmenistan
TV|Tuvalu
UG|Uganda
UA|Ukraine
AE|United Arab Emirates
GB|United Kingdom
US|United States
UY|Uruguay
UZ|Uzbekistan
VU|Vanuatu
VA|Vatican City
VE|Venezuela
VN|Vietnam
YE|Yemen
ZM|Zambia
ZW|Zimbabwe`
    .trim()
    .split("\n")
    .map((line) => {
      const [code, country] = line.split("|");
      return [normalizeName(country), code];
    }));

  Object.assign(COUNTRY_CODES, {
    britain: "GB",
    burma: "MM",
    "cape verde": "CV",
    "czech republic": "CZ",
    drc: "CD",
    england: "GB",
    europe: "EU",
    "ivory coast": "CI",
    macedonia: "MK",
    "north america": "AMERICAS",
    "republic of the congo": "CG",
    scotland: "GB",
    "south america": "AMERICAS",
    swaziland: "SZ",
    "timor leste": "TL",
    uk: "GB",
    usa: "US",
    "united states of america": "US",
    vatican: "VA",
    wales: "GB",
  });
})();
