// ==UserScript==
// @name         X Country Flags (Automatic Bootstrap)
// @namespace    https://x.com/
// @version      0.4.0
// @description  Fetches X account-country flags for posts and quotes in Firefox (Violentmonkey) and Chromium (Tampermonkey).
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
  const MAX_CONCURRENT = 2;
  const REQUEST_INTERVAL_MS = 400;
  const FAILURE_COOLDOWN_MS = 30 * 60 * 1000;
  const TRANSIENT_BACKOFF_MS = 60 * 1000;
  const DEPENDENCY_BACKOFF_MS = 30 * 60 * 1000;
  const UNAVAILABLE_BACKOFF_MS = 6 * 60 * 60 * 1000;
  const WRITE_DEBOUNCE_MS = 1000;
  const MARKER_ATTR = "data-x-country-flags-autoprime-marker";
  const TIME_ANCHOR = 'a[href*="/status/"] time';
  const GRAPHQL_PATH = /\/i\/api\/graphql\/[^/]+\/[^/]+/;
  const NON_USER = /^(i|intent|share|search|explore|home|settings|messages|compose|tos|privacy|notifications)$/i;
  const cache = new Map(Object.entries(readStoredCache()));
  const inflight = new Map();
  const requestQueue = [];
  const anchorsByHandle = new Map();
  const templateWaiters = [];
  const retryTimers = new Map();
  const scanRoots = new Set();
  let aboutQueryId = ABOUT_ACCOUNT_QUERY_ID;
  let aboutFeatures = null;
  let requestTemplate = null;
  let requestTimer = null;
  let writeTimer = null;
  let nextRequestAt = 0;
  let cooldownUntil = 0;
  let activeRequests = 0;
  let scanScheduled = false;
  let templateWarned = false;

  installGraphqlCapture();
  logContext();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  function start() {
    observeTimeline();
    scheduleScan(document);
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
        if (mutation.type !== "childList") {
          continue;
        }
        if (mutation.removedNodes.length && mutation.target instanceof Element) {
          for (const node of mutation.removedNodes) {
            if (!(node instanceof Element)) {
              continue;
            }
            if (node.getAttribute?.(MARKER_ATTR) != null || node.querySelector?.(`[${MARKER_ATTR}]`)) {
              scheduleScan(mutation.target.closest("article") || mutation.target);
              break;
            }
          }
        }
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) {
            scheduleScan(node);
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function scheduleScan(root) {
    if (!root) {
      return;
    }
    scanRoots.add(root);
    if (scanScheduled) {
      return;
    }
    scanScheduled = true;
    requestAnimationFrame(() => {
      scanScheduled = false;
      const roots = [...scanRoots];
      scanRoots.clear();
      for (const candidate of roots) {
        if (candidate === document || candidate.isConnected) {
          processRoot(candidate);
        }
      }
    });
  }

  function processRoot(root) {
    if (!root?.querySelectorAll) {
      return;
    }
    for (const time of root.querySelectorAll(TIME_ANCHOR)) {
      const anchor = time.closest("a");
      if (anchor) {
        processAnchor(anchor);
      }
    }
    if (root.matches?.('a[href*="/status/"]') && root.querySelector("time")) {
      processAnchor(root);
    }
  }

  function processAnchor(anchor) {
    const handle = readHandle(anchor);
    if (!handle) {
      return;
    }

    anchor.dataset.xCountryFlagsHandle = handle.key;
    anchor.dataset.xCountryFlagsScreenName = handle.screenName;
    trackAnchor(anchor, handle.key);
    const cached = usableCache(handle.key);
    const marker = markerFor(anchor);
    if (cached && marker?.getAttribute(MARKER_ATTR) === cached.status) {
      if (cached.status === "error" && cached.retryAt && !retryTimers.has(handle.key)) {
        scheduleRetry(handle.key, cached.retryAt);
      }
      return;
    }
    if (cached?.status === "hidden" && !marker) {
      return;
    }
    if (cached) {
      renderAnchor(anchor, cached);
      if (cached.status === "error" && cached.retryAt && !retryTimers.has(handle.key)) {
        scheduleRetry(handle.key, cached.retryAt);
      }
      return;
    }
    if (anchor.dataset.xCountryFlagsPending === "1") {
      return;
    }

    anchor.dataset.xCountryFlagsPending = "1";
    void fetchCountry(handle.key, handle.screenName).then((entry) => {
      delete anchor.dataset.xCountryFlagsPending;
      if (entry) {
        renderHandle(handle.key, entry);
      }
    });
  }

  function readHandle(anchor) {
    if (!anchor) {
      return null;
    }
    try {
      const path = new URL(anchor.href, location.origin).pathname;
      let screenName = path.match(/^\/([^/]+)\/status\/\d+/)?.[1] ?? null;
      if (!screenName || NON_USER.test(screenName)) {
        const profile = anchor.closest('[data-testid="User-Name"]')?.querySelector('a[href^="/"]');
        const profileName = profile
          ? new URL(profile.href, location.origin).pathname.match(/^\/([^/]+)$/)?.[1] ?? null
          : null;
        screenName = profileName && !NON_USER.test(profileName) ? profileName : null;
      }
      if (!screenName) {
        return null;
      }
      return { key: screenName.toLowerCase(), screenName };
    } catch {
      return null;
    }
  }

  function trackAnchor(anchor, key) {
    let anchors = anchorsByHandle.get(key);
    if (!anchors) {
      anchors = new Set();
      anchorsByHandle.set(key, anchors);
    }
    anchors.add(anchor);
  }

  function hasConnectedAnchor(key) {
    const anchors = anchorsByHandle.get(key);
    if (!anchors) {
      return false;
    }
    for (const anchor of anchors) {
      if (anchor.isConnected) {
        return true;
      }
    }
    return false;
  }

  function usableCache(key) {
    const entry = cache.get(key);
    if (!entry) {
      return null;
    }
    // v0.3 stored silent misses as {countryName:null, countryCode:null}. Refetch those.
    if (!entry.status && !entry.countryCode) {
      return null;
    }
    if (entry.status === "error" && (!entry.retryAt || entry.retryAt <= Date.now())) {
      return null;
    }
    if (entry.status) {
      return entry;
    }
    return {
      status: "ok",
      countryName: entry.countryName ?? null,
      countryCode: entry.countryCode ?? null,
      reason: null,
      retryAt: null,
    };
  }

  function storeCacheEntry(key, entry) {
    const existing = cache.get(key);
    if ((existing?.status === "ok" || existing?.countryCode) && entry.status !== "ok") {
      return;
    }
    if (entry.status === "error" && existing?.reason !== entry.reason) {
      console.info(`[X Country Flags] @${key}: ${entry.reason}`);
    }
    cache.set(key, entry);
    writeStoredCache();
    if (entry.status === "error" && entry.retryAt) {
      scheduleRetry(key, entry.retryAt);
    }
  }

  function scheduleRetry(key, retryAt) {
    clearTimeout(retryTimers.get(key));
    const timer = setTimeout(() => {
      retryTimers.delete(key);
      const current = cache.get(key);
      if (!current || current.status !== "error" || !hasConnectedAnchor(key)) {
        return;
      }
      cache.delete(key);
      const screenName = [...(anchorsByHandle.get(key) ?? [])]
        .find((anchor) => anchor.isConnected)
        ?.dataset.xCountryFlagsScreenName || key;
      void fetchCountry(key, screenName).then((entry) => {
        if (entry) {
          renderHandle(key, entry);
        }
      });
    }, Math.max(1000, retryAt - Date.now()));
    retryTimers.set(key, timer);
  }

  function fetchCountry(key, screenName) {
    const cached = usableCache(key);
    if (cached) {
      return Promise.resolve(cached);
    }
    if (inflight.has(key)) {
      return inflight.get(key);
    }

    const promise = waitForTemplate()
      .then(() => {
        const later = usableCache(key);
        if (later) {
          return later;
        }
        return new Promise((resolve) => {
          requestQueue.push({ key, screenName: screenName || key, resolve });
          pumpQueue();
        });
      })
      .then((entry) => {
        if (entry) {
          storeCacheEntry(key, entry);
        }
        return entry;
      })
      .finally(() => {
        inflight.delete(key);
      });
    inflight.set(key, promise);
    return promise;
  }

  function waitForTemplate() {
    if (requestTemplate) {
      return Promise.resolve();
    }
    if (!templateWarned) {
      templateWarned = true;
      setTimeout(() => {
        if (requestTemplate) {
          return;
        }
        const waiting = errorEntry(
          "No authenticated X request captured yet. Scroll the timeline, or reload if this stays.",
          15 * 1000,
        );
        for (const [key, anchors] of anchorsByHandle) {
          if (usableCache(key)) {
            continue;
          }
          for (const anchor of anchors) {
            renderAnchor(anchor, waiting);
          }
        }
      }, 15 * 1000);
    }
    return new Promise((resolve) => {
      templateWaiters.push(resolve);
    });
  }

  function pumpQueue() {
    if (requestTimer) {
      return;
    }
    const now = Date.now();
    if (now < cooldownUntil) {
      requestTimer = setTimeout(() => {
        requestTimer = null;
        pumpQueue();
      }, cooldownUntil - now);
      return;
    }
    dropDisconnectedJobs();
    if (activeRequests >= MAX_CONCURRENT || requestQueue.length === 0) {
      return;
    }
    const wait = Math.max(0, nextRequestAt - now);
    if (wait > 0) {
      requestTimer = setTimeout(() => {
        requestTimer = null;
        pumpQueue();
      }, wait);
      return;
    }

    const job = takeNextJob();
    if (!job) {
      return;
    }
    activeRequests += 1;
    nextRequestAt = Date.now() + REQUEST_INTERVAL_MS;
    void requestCountry(job.screenName)
      .then((entry) => job.resolve(entry))
      .catch((error) => job.resolve(errorEntry(`Lookup failed: ${error}`, TRANSIENT_BACKOFF_MS)))
      .finally(() => {
        activeRequests -= 1;
        pumpQueue();
      });
    pumpQueue();
  }

  function dropDisconnectedJobs() {
    for (let i = requestQueue.length - 1; i >= 0; i -= 1) {
      if (hasConnectedAnchor(requestQueue[i].key)) {
        continue;
      }
      requestQueue.splice(i, 1)[0].resolve(null);
    }
  }

  function takeNextJob() {
    if (requestQueue.length === 0) {
      return null;
    }
    let best = 0;
    let bestScore = visibilityScore(requestQueue[0].key);
    for (let i = 1; i < requestQueue.length; i += 1) {
      const score = visibilityScore(requestQueue[i].key);
      if (score > bestScore) {
        best = i;
        bestScore = score;
      }
    }
    return requestQueue.splice(best, 1)[0];
  }

  function visibilityScore(key) {
    const anchors = anchorsByHandle.get(key);
    if (!anchors) {
      return 0;
    }
    let best = 0;
    for (const anchor of anchors) {
      if (!anchor.isConnected) {
        continue;
      }
      const rect = anchor.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        return 2;
      }
      if (rect.bottom > -800 && rect.top < window.innerHeight + 800) {
        best = 1;
      }
    }
    return best;
  }

  async function requestCountry(screenName) {
    if (!requestTemplate) {
      return errorEntry("Waiting for an authenticated X request", 2000);
    }

    let response;
    try {
      const url = new URL(requestTemplate.url);
      url.pathname = `/i/api/graphql/${aboutQueryId}/AboutAccountQuery`;
      url.search = "";
      url.searchParams.set("variables", JSON.stringify({ screenName }));
      if (aboutFeatures?.features) {
        url.searchParams.set("features", aboutFeatures.features);
      }
      if (aboutFeatures?.fieldToggles) {
        url.searchParams.set("fieldToggles", aboutFeatures.fieldToggles);
      }
      response = await requestTemplate.fetch(url.toString(), {
        method: "GET",
        credentials: "include",
        headers: requestTemplate.headers,
      });
    } catch (error) {
      noteGlobalPause(2000, `network error for @${screenName}: ${error}`);
      return errorEntry(`Network error: ${error}`, TRANSIENT_BACKOFF_MS);
    }

    if (!response.ok) {
      const delay = globalStatusDelay(response.status);
      if (delay) {
        noteGlobalPause(delay, `HTTP ${response.status} for @${screenName}`);
        return errorEntry(httpReason(response.status), delay);
      }
      return errorEntry(`X returned HTTP ${response.status} for @${screenName}`, TRANSIENT_BACKOFF_MS);
    }

    let payload;
    try {
      payload = await response.json();
    } catch (error) {
      return errorEntry(`Invalid JSON from X: ${error}`, TRANSIENT_BACKOFF_MS);
    }
    return entryFromPayload(payload);
  }

  function globalStatusDelay(status) {
    if (status === 429 || status === 401 || status === 403 || status === 404) {
      return FAILURE_COOLDOWN_MS;
    }
    return 0;
  }

  function httpReason(status) {
    if (status === 429) {
      return "Rate limited by X (HTTP 429). Lookups retry after the cooldown.";
    }
    if (status === 401 || status === 403) {
      return `X rejected the session (HTTP ${status}). Reload x.com and sign in again.`;
    }
    if (status === 404) {
      return `AboutAccountQuery was not found (HTTP 404). The embedded query ID ${aboutQueryId} may be stale.`;
    }
    return `X returned HTTP ${status}`;
  }

  function noteGlobalPause(delay, reason) {
    const until = Date.now() + delay;
    if (until <= cooldownUntil) {
      return;
    }
    cooldownUntil = until;
    console.warn(`[X Country Flags] Country lookups paused for ${formatDelay(delay)}:`, reason);
  }

  function formatDelay(delay) {
    if (delay >= 60 * 1000) {
      return `${Math.round(delay / 60000)} min`;
    }
    return `${Math.max(1, Math.round(delay / 1000))} sec`;
  }

  function entryFromPayload(payload) {
    const message = graphqlMessage(payload);
    if (message && /not found|no operation named/i.test(message)) {
      noteGlobalPause(
        FAILURE_COOLDOWN_MS,
        `stale AboutAccountQuery ID (${aboutQueryId}): ${message}`,
      );
      return errorEntry(`Stale AboutAccountQuery ID ${aboutQueryId}: ${message}`, FAILURE_COOLDOWN_MS);
    }

    const result = payload?.data?.user_result_by_screen_name?.result || payload?.data?.user?.result;
    if (result?.__typename === "UserUnavailable") {
      return errorEntry(
        result.message || result.unavailable_message || result.reason || "Account unavailable",
        UNAVAILABLE_BACKOFF_MS,
      );
    }
    if (result?.about_profile) {
      return entryFromAbout(result.about_profile);
    }
    if (message) {
      const delay = /dependency|unspecified|timeout|temporarily|something went wrong|internal/i.test(message)
        ? DEPENDENCY_BACKOFF_MS
        : /suspended|unavailable|does not exist|not found/i.test(message)
          ? UNAVAILABLE_BACKOFF_MS
          : TRANSIENT_BACKOFF_MS;
      return errorEntry(message, delay);
    }
    if (!payload?.data) {
      return errorEntry("X returned no account data", TRANSIENT_BACKOFF_MS);
    }
    return hiddenEntry("X returned no account country");
  }

  function entryFromAbout(about) {
    const countryName = about.account_based_in || null;
    if (!countryName) {
      return hiddenEntry("X returned no account country");
    }
    if (about.created_country_accurate !== true) {
      return hiddenEntry(`X reports ${countryName} but did not mark it accurate`);
    }
    return {
      status: "ok",
      countryName,
      countryCode: countryNameToCode(countryName),
      reason: null,
      retryAt: null,
    };
  }

  function graphqlMessage(payload) {
    const errors = payload?.errors;
    if (!Array.isArray(errors) || errors.length === 0) {
      return null;
    }
    const aboutError = errors.find((error) => {
      const path = Array.isArray(error?.path) ? error.path.join(".") : "";
      return /about_profile|account_based_in|user_result_by_screen_name/i.test(`${error?.message || ""} ${path}`);
    });
    const chosen = aboutError || (!payload?.data ? errors[0] : null);
    if (!chosen) {
      return null;
    }
    const message = chosen.message || "Unknown GraphQL error";
    const code = chosen.extensions?.name || chosen.extensions?.code;
    return code ? `${message} (${code})` : message;
  }

  function errorEntry(reason, delay) {
    return {
      status: "error",
      countryName: null,
      countryCode: null,
      reason: String(reason),
      retryAt: Date.now() + delay,
    };
  }

  function hiddenEntry(reason) {
    return {
      status: "hidden",
      countryName: null,
      countryCode: null,
      reason,
      retryAt: null,
    };
  }

  function explainFailure(reason) {
    const text = reason || "Country lookup failed";
    if (/dependency|unspecified|something went wrong|internal/i.test(text)) {
      return `${text}. X's About this account page shows the same failure as "Something went wrong" and does not display a country.`;
    }
    return text;
  }

  function renderHandle(key, entry) {
    const anchors = anchorsByHandle.get(key);
    if (!anchors) {
      return;
    }
    for (const anchor of [...anchors]) {
      if (!anchor.isConnected) {
        anchors.delete(anchor);
        continue;
      }
      renderAnchor(anchor, entry);
    }
    if (anchors.size === 0) {
      anchorsByHandle.delete(key);
    }
  }

  function renderAnchor(anchor, entry) {
    if (!anchor.isConnected) {
      return;
    }
    delete anchor.dataset.xCountryFlagsPending;
    if (!entry || entry.status === "hidden") {
      markerFor(anchor)?.remove();
      return;
    }
    if (entry.status === "error") {
      insertMarker(anchor, "?", explainFailure(entry.reason), "error");
      return;
    }
    const flag = entry.countryCode ? countryCodeToEmoji(entry.countryCode) : null;
    const text = flag || entry.countryName;
    if (!text) {
      markerFor(anchor)?.remove();
      return;
    }
    insertMarker(anchor, text, entry.countryName ? `Account based in ${entry.countryName}` : text, "ok");
  }

  function markerFor(anchor) {
    const handle = anchor.dataset.xCountryFlagsHandle;
    if (!handle || !anchor.parentElement) {
      return null;
    }
    return anchor.parentElement.querySelector(
      `[${MARKER_ATTR}][data-x-country-flags-for="${CSS.escape(handle)}"]`,
    );
  }

  function insertMarker(anchor, text, title, kind) {
    let marker = markerFor(anchor);
    if (!marker) {
      marker = document.createElement("span");
      anchor.insertAdjacentElement("afterend", marker);
    }
    marker.setAttribute(MARKER_ATTR, kind);
    marker.dataset.xCountryFlagsFor = anchor.dataset.xCountryFlagsHandle || "";
    marker.textContent = ` \u00b7 ${text}`;
    marker.title = title;
    marker.setAttribute("aria-label", title);
    const time = anchor.querySelector("time");
    let color = "inherit";
    let fontSize = "";
    let fontFamily = "";
    try {
      if (time) {
        const style = getComputedStyle(time);
        color = style.color || color;
        fontSize = style.fontSize;
        fontFamily = style.fontFamily;
      }
    } catch {
      // Inherit if the timestamp style is unreadable across compartments.
    }
    marker.style.color = color;
    marker.style.fontFamily = fontFamily;
    marker.style.fontSize = fontSize;
    marker.style.lineHeight = "1";
    marker.style.whiteSpace = "nowrap";
    marker.style.cursor = "help";
    marker.style.unicodeBidi = "isolate";
    marker.style.flexShrink = "0";
    marker.style.minWidth = "max-content";
    marker.style.opacity = kind === "error" ? "0.8" : "1";
  }

  function installGraphqlCapture() {
    const pageWindow = getPageWindow();
    const inPageWorld = pageWindow === window;
    const wrapForPage = inPageWorld || typeof exportFunction !== "function"
      ? (fn) => fn
      : (fn) => exportFunction(fn, pageWindow);

    const originalFetch = pageWindow.fetch;
    if (typeof originalFetch === "function") {
      pageWindow.fetch = wrapForPage(function patchedFetch(input, init) {
        // Call the page fetch first. Capture must never throw or do DOM work on this stack,
        // or X's own About this account request fails with "Something went wrong".
        const pending = originalFetch.apply(pageWindow, arguments);
        try {
          const url = requestUrl(input);
          noteAboutQueryUrl(url);
          captureTemplate(url, requestHeaders(input, init));
          watchFetch(url, pending);
        } catch (error) {
          console.warn("[X Country Flags] fetch hook failed:", error);
        }
        return pending;
      });
    }

    const proto = pageWindow.XMLHttpRequest?.prototype;
    if (proto && typeof proto.open === "function") {
      const originalOpen = proto.open;
      const originalSend = proto.send;
      const originalSetRequestHeader = proto.setRequestHeader;

      proto.open = wrapForPage(function patchedOpen(method, url) {
        try {
          this.__xCountryFlagsAutoprimeUrl = String(url);
          this.__xCountryFlagsAutoprimeHeaders = {};
        } catch {
          // Expando assignment can fail across compartments; the page request still proceeds.
        }
        return originalOpen.apply(this, arguments);
      });

      proto.setRequestHeader = wrapForPage(function patchedSetRequestHeader(key, value) {
        try {
          if (this.__xCountryFlagsAutoprimeHeaders) {
            this.__xCountryFlagsAutoprimeHeaders[key] = value;
          }
        } catch {
          // Ignore header bookkeeping failures.
        }
        return originalSetRequestHeader.apply(this, arguments);
      });

      proto.send = wrapForPage(function patchedSend() {
        try {
          const xhr = this;
          const url = xhr.__xCountryFlagsAutoprimeUrl;
          const headers = xhr.__xCountryFlagsAutoprimeHeaders;
          captureTemplate(url, headers);
          noteAboutQueryUrl(url);
          if (typeof xhr.addEventListener === "function") {
            xhr.addEventListener("load", () => {
              try {
                ingestRaw(url, xhr.responseText);
              } catch {
                // Response harvesting is best-effort.
              }
            });
          }
        } catch (error) {
          console.warn("[X Country Flags] XHR hook failed:", error);
        }
        return originalSend.apply(this, arguments);
      });
    }

    function captureTemplate(rawUrl, headersLike) {
      if (requestTemplate || !rawUrl) {
        return;
      }
      let url;
      try {
        url = new URL(rawUrl, location.origin);
      } catch {
        return;
      }
      if (!GRAPHQL_PATH.test(url.pathname)) {
        return;
      }
      const headers = extractHeaderMap(headersLike);
      if (!headers.authorization) {
        return;
      }
      delete headers["content-length"];
      delete headers.cookie;
      delete headers.host;
      requestTemplate = {
        url: url.toString(),
        headers,
        fetch(input, init) {
          return originalFetch.call(pageWindow, input, init);
        },
      };
      console.info(
        `[X Country Flags] Captured timeline GraphQL request. injectInto=${getInjectContext()}`,
      );
      const waiters = templateWaiters.splice(0);
      for (const resolve of waiters) {
        resolve();
      }
      scheduleScan(document);
    }

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

  function requestUrl(input) {
    if (!input) {
      return "";
    }
    if (typeof input === "string") {
      return input;
    }
    if (typeof input.url === "string") {
      return input.url;
    }
    return "";
  }

  function requestHeaders(input, init) {
    if (init?.headers) {
      return init.headers;
    }
    if (input && typeof input === "object" && input.headers) {
      return input.headers;
    }
    return {};
  }

  function noteAboutQueryUrl(rawUrl) {
    if (!rawUrl || !/AboutAccountQuery/.test(rawUrl)) {
      return;
    }
    let url;
    try {
      url = new URL(rawUrl, location.origin);
    } catch {
      return;
    }
    const match = url.pathname.match(/\/graphql\/([^/]+)\/AboutAccountQuery$/);
    if (match?.[1] && match[1] !== aboutQueryId) {
      aboutQueryId = match[1];
      console.info(`[X Country Flags] Using AboutAccountQuery ID ${aboutQueryId}`);
    }
    const features = url.searchParams.get("features");
    const fieldToggles = url.searchParams.get("fieldToggles");
    if (features || fieldToggles) {
      aboutFeatures = { features, fieldToggles };
    }
  }

  function watchFetch(rawUrl, pending) {
    if (!rawUrl || !/AboutAccountQuery/.test(rawUrl) || !pending || typeof pending.then !== "function") {
      return;
    }
    pending.then((response) => {
      if (!response || typeof response.clone !== "function") {
        return;
      }
      response.clone().text().then((text) => ingestRaw(rawUrl, text)).catch(() => {});
    }).catch(() => {});
  }

  function ingestRaw(rawUrl, text) {
    if (!text || typeof text !== "string" || !/AboutAccountQuery/.test(rawUrl || "")) {
      return;
    }
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      return;
    }
    const screenName = screenNameFromQuery(rawUrl);
    if (!screenName) {
      return;
    }
    const key = screenName.toLowerCase();
    const entry = entryFromPayload(payload);
    storeCacheEntry(key, entry);
    renderHandle(key, entry);
  }

  function screenNameFromQuery(rawUrl) {
    try {
      const variables = new URL(rawUrl, location.origin).searchParams.get("variables");
      if (!variables) {
        return null;
      }
      const parsed = JSON.parse(variables);
      return parsed.screenName || parsed.screen_name || null;
    } catch {
      return null;
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
    const injectInto = getInjectContext();
    const bridged = window.wrappedJSObject != null || typeof exportFunction === "function";
    console.info(
      `[X Country Flags] injectInto=${injectInto} pageWorld=${window.wrappedJSObject == null} wrappedJSObject=${window.wrappedJSObject != null} exportFunction=${typeof exportFunction === "function"}`,
    );
    if (injectInto === "content" && !bridged) {
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
