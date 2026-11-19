const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");

const source = readFileSync(new URL("../x-country-flags-autoprime.user.js", `file://${__filename}`), "utf8");

function load({ bridge = "unsafeWindow" } = {}) {
  const messages = [];
  const requests = [];
  const scans = [];
  let observer;
  class Element {}
  class HTMLAnchorElement extends Element {}
  const page = {
    Object,
    Headers,
    fetch: async (url, init) => {
      requests.push({ url, init });
      return new Response(JSON.stringify({
        data: { user_result_by_screen_name: { result: {
          about_profile: { account_based_in: "Argentina", created_country_accurate: true },
        } } },
      }));
    },
    XMLHttpRequest: function () {},
  };
  page.XMLHttpRequest.prototype = {
    open() {},
    send() {},
    setRequestHeader() {},
  };
  const sandbox = { fetch: async () => { throw new Error("Sandbox fetch must not be used"); } };
  const context = {
    window: bridge === "page" ? page : sandbox,
    document: {
      readyState: "loading",
      documentElement: {},
      addEventListener() {},
      querySelectorAll() { return []; },
    },
    location: { origin: "https://x.com" },
    GM_getValue: () => ({}),
    GM_setValue() {},
    GM_info: { injectInto: bridge === "wrappedJSObject" ? "content" : "n/a" },
    console: { info: (...args) => messages.push(args.join(" ")), warn: (...args) => messages.push(args.join(" ")) },
    URL, Headers, Response, Element, HTMLAnchorElement,
    setTimeout: () => 1,
    clearTimeout() {},
    requestAnimationFrame: (callback) => scans.push(callback),
    MutationObserver: class {
      constructor(callback) { observer = { callback }; }
      observe(target, options) { observer.options = options; }
    },
  };
  if (bridge === "unsafeWindow") context.unsafeWindow = page;
  if (bridge === "wrappedJSObject") {
    sandbox.wrappedJSObject = page;
    context.exportFunction = (fn) => fn;
  }
  vm.createContext(context);
  vm.runInContext(source.replace(/\}\)\(\);\s*$/, `
    globalThis.testApi = {
      getPageWindow, requestCountry, observeTimeline, renderAnchor,
      selector: TIME_ANCHOR,
      processRoot,
      processAnchor: (callback) => { processAnchor = callback; },
    };
  })();`), context);
  return { api: context.testApi, context, page, sandbox, requests, messages, scans, get observer() { return observer; } };
}

for (const bridge of ["unsafeWindow", "wrappedJSObject", "page"]) {
  for (const prefix of ["/i/api/graphql", "/graphql"]) {
    test(`captures and reuses ${prefix} page requests through ${bridge}`, async () => {
      const { api, page, requests, sandbox, messages } = load({ bridge });
      assert.equal(api.getPageWindow(), page);
      await page.fetch(`https://x.com${prefix}/example/HomeTimeline`, {
        headers: { authorization: "Bearer test", "x-csrf-token": "test-csrf" },
      });
      const entry = await api.requestCountry("example");
      assert.equal(entry.status, "ok");
      assert.equal(entry.countryCode, "AR");
      assert.match(requests[1].url, /\/AboutAccountQuery\?/);
      assert.equal(new URL(requests[1].url).pathname, `${prefix}/TzOG2twZEfhr9KmClvVVqA/AboutAccountQuery`);
      assert.equal(JSON.parse(new URL(requests[1].url).searchParams.get("variables")).screenName, "example");
      const headers = new Headers(requests[1].init.headers);
      assert.equal(headers.get("authorization"), "Bearer test");
      assert.equal(requests[1].init.credentials, "include");
      assert.ok(messages.some((message) => message.includes("Captured timeline GraphQL request")));
      assert.ok(messages.some((message) => message.includes(`pageAccess=${bridge === "page" ? "window" : bridge}`)));
      if (bridge !== "page") assert.notEqual(page.fetch, sandbox.fetch);
    });
  }
}

test("scans legacy and redesigned timestamp anchors, including the root itself", () => {
  const { api } = load();
  const processed = [];
  api.processAnchor((anchor) => processed.push(anchor));
  const legacy = { name: "legacy" };
  const redesigned = { name: "redesigned" };
  const root = {
    querySelectorAll(selector) {
      assert.equal(selector, 'a[href*="/status/"]:has(time), a[href*="/status/"][data-base-ui-tooltip-trigger]');
      return [legacy, redesigned];
    },
    matches: (selector) => selector === api.selector,
  };
  api.processRoot(root);
  assert.deepEqual(processed, [legacy, redesigned, root]);
});

test("rechecks redesigned timestamps when X reuses links or adds the tooltip attribute", () => {
  const loaded = load();
  loaded.api.observeTimeline();
  assert.deepEqual(Array.from(loaded.observer.options.attributeFilter), ["href", "data-base-ui-tooltip-trigger"]);
  const anchor = new loaded.context.HTMLAnchorElement();
  anchor.isConnected = true;
  anchor.matches = (selector) => selector === loaded.api.selector;
  anchor.querySelectorAll = () => [];
  const processed = [];
  loaded.api.processAnchor((candidate) => processed.push(candidate));
  loaded.observer.callback([{ type: "attributes", target: anchor }]);
  loaded.scans.shift()();
  assert.deepEqual(processed, [anchor]);
});

test("a DOM-only context no longer falsely claims to be the page world", () => {
  const { messages } = load({ bridge: "none" });
  assert.ok(messages.some((message) => message.includes("pageAccess=window")));
  assert.ok(messages.every((message) => !message.includes("pageWorld=true")));
});
