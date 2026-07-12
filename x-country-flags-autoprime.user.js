// ==UserScript==
// @name         X Country Flags (Automatic Bootstrap)
// @namespace    https://x.com/
// @version      0.1.0
// @description  Trial version that fetches X account-country flags without opening a profile.
// @match        https://x.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @inject-into  page
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const ABOUT_ACCOUNT_QUERY_ID = "TzOG2twZEfhr9KmClvVVqA";
  const CACHE_KEY = "x-country-flags-autoprime-cache-v1";
  const CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000;
  const MARKER_ATTR = "data-x-country-flags-autoprime-marker";
  const GRAPHQL_PATH = /\/i\/api\/graphql\/[^/]+\/[^/]+/;
  const cache = new Map(Object.entries(readStoredCache()));
  const inflight = new Map();
  const pendingArticles = new Set();
  let requestTemplate = null;

  installGraphqlCapture();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  function start() {
    observeTimeline();
    processTweets(document);
  }

  function readStoredCache() {
    try {
      return GM_getValue(CACHE_KEY, {});
    } catch {
      return {};
    }
  }

  function writeStoredCache() {
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
    const entry = cache.get(screenName);
    if (!entry) {
      return null;
    }
    if (Date.now() - entry.checkedAt > CACHE_TTL_MS) {
      cache.delete(screenName);
      writeStoredCache();
      return null;
    }
    return entry;
  }

  function storeCacheEntry(screenName, entry) {
    cache.set(screenName, { ...entry, checkedAt: Date.now() });
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

    const promise = requestCountry(screenName);
    inflight.set(screenName, promise);
    try {
      const entry = await promise;
      storeCacheEntry(screenName, entry);
      return entry;
    } finally {
      inflight.delete(screenName);
    }
  }

  async function requestCountry(screenName) {
    try {
      const url = new URL(requestTemplate.url);
      url.pathname = `/i/api/graphql/${ABOUT_ACCOUNT_QUERY_ID}/AboutAccountQuery`;
      url.searchParams.set("variables", JSON.stringify({ screenName }));

      const response = await requestTemplate.fetch(url.toString(), {
        method: "GET",
        credentials: "include",
        headers: requestTemplate.headers,
      });
      if (!response.ok) {
        console.warn("[X Country Flags] AboutAccountQuery failed:", response.status);
        return emptyEntry();
      }

      const payload = await response.json();
      const aboutProfile = payload?.data?.user_result_by_screen_name?.result?.about_profile;
      const countryName = aboutProfile?.account_based_in ?? null;
      const countryCode = aboutProfile?.created_country_accurate
        ? countryNameToCode(countryName)
        : null;
      return { countryName, countryCode };
    } catch (error) {
      console.warn("[X Country Flags] AboutAccountQuery failed:", error);
      return emptyEntry();
    }
  }

  function emptyEntry() {
    return { countryName: null, countryCode: null };
  }

  function renderPendingArticles(screenName, countryCode, countryName) {
    for (const article of [...pendingArticles]) {
      if (article.dataset.xCountryFlagsAutoprimeHandle !== screenName) {
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
    const originalFetch = window.fetch;
    window.fetch = function patchedFetch(input, init) {
      const request = input instanceof Request ? input : null;
      captureTemplate(
        request ? request.url : String(input),
        init?.headers || request?.headers || {},
      );
      return originalFetch.apply(this, arguments);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

    XMLHttpRequest.prototype.open = function patchedOpen(method, url) {
      this.__xCountryFlagsAutoprimeUrl = url;
      this.__xCountryFlagsAutoprimeHeaders = {};
      return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.setRequestHeader = function patchedSetRequestHeader(key, value) {
      if (this.__xCountryFlagsAutoprimeHeaders) {
        this.__xCountryFlagsAutoprimeHeaders[key] = value;
      }
      return originalSetRequestHeader.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function patchedSend() {
      captureTemplate(this.__xCountryFlagsAutoprimeUrl, this.__xCountryFlagsAutoprimeHeaders);
      return originalSend.apply(this, arguments);
    };

    function captureTemplate(rawUrl, headersLike) {
      if (requestTemplate) {
        return;
      }

      const url = new URL(rawUrl, location.origin);
      if (!GRAPHQL_PATH.test(url.pathname)) {
        return;
      }

      const headers = new Headers(headersLike || {});
      if (!headers.has("authorization")) {
        return;
      }

      headers.delete("content-length");
      headers.delete("cookie");
      headers.delete("host");
      requestTemplate = {
        url: url.toString(),
        headers,
        fetch: originalFetch,
      };
      console.info("[X Country Flags] Captured timeline GraphQL request.");
      processTweets(document);
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
