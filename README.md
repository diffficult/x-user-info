# X Country Flags

Userscript for `x.com` that appends an account-country flag after the post age. It covers the quoting post and the quoted post. Works in Firefox with Violentmonkey and in Chromium-based browsers with Tampermonkey.

Example output:

`· 1h · 🇦🇷`

The flag tooltip uses the country name reported by X, for example `Argentina`.

Regional labels use `🇪🇺` for Europe and `🌎` for North America or South America; Unicode has no separate flags for those two Americas.

## Icon

The userscript embeds a compact PNG icon directly in its metadata, so no external icon file or remote URL is required.

## How it works

- Watches every post-age link (`a[href*="/status/"] time`) under timeline tweets, including quoted posts. Rechecks links when X changes a reused timeline anchor's `href`, so a country flag cannot remain attached to a different account. A quote whose time links to `/i/status/:id` takes the handle from the adjacent display name.
- Captures X's internal GraphQL request template — including its authorization headers — from normal timeline traffic, so no profile visit or manual priming is needed. It patches the page's own `fetch`/`XMLHttpRequest` without blocking those calls. `@inject-into auto` runs it in the page context when the site's CSP allows it (Chromium, Tampermonkey) and falls back to the content context on Firefox, where it reaches the page world through `wrappedJSObject`.
- Reuses that template to invoke `AboutAccountQuery` and reads `about_profile.account_based_in`. If X itself loads About this account, the script reuses that response and adopts the live query ID and feature flags.
- Renders a flag only when `created_country_accurate` is `true`. The marker inherits the timestamp color, does not shrink in the quote header, and its tooltip says `Account based in Argentina`.
- A failed lookup shows `?` after the age. Hover it for the reason. A GraphQL dependency failure uses the same wording X hides behind "Something went wrong" on the profile.
- Visible posts are looked up first, two at a time, 400ms apart. One account's error does not pause the others. Rate limits, auth failures, and a stale query ID still pause every lookup for 30 minutes.
- Successful countries stay cached. Silent empty results saved by 0.3.0 are looked up again. Errors are cached with a retry time, not as a permanent miss.

## Install

**[Install / Update](https://raw.githubusercontent.com/diffficult/x-user-info/main/x-country-flags-autoprime.user.js)**

1. Install Violentmonkey in Firefox or Tampermonkey in Chromium-based browsers.
2. Click the link above — the manager offers to install it, or update it if you already have a previous version installed.
3. Open `https://x.com/home`.

Flags begin resolving as soon as the script captures the first authenticated timeline request.

If flags do not appear, open the developer console on `x.com`: the script logs its effective context (`injectInto=...`). In Firefox it should report `content`; if you instead see the warning `Page-context fetch interception is unavailable`, the script could not reach the page's network layer in that browser.

## Privacy And Session Disclaimer

- No X username, account ID, cookie, token, or session value is hardcoded in the script.
- The script uses the active X session to query X's own endpoint. It captures X's normal GraphQL request metadata, including authorization headers, only in page memory; the browser attaches session cookies through `credentials: "include"`.
- Cookie headers are excluded from the captured request template. Headers, cookies, and tokens are not logged or written to Violentmonkey storage.
- Persistent storage contains `username -> country` cache entries, plus temporary lookup-error reasons. It does not contain headers, cookies, or tokens.

## Limitations

- If X changes the internal query name, path, or payload shape, flags stop until the script sees a live About this account request or the embedded query ID is updated. A stale ID shows `?` and a console warning.
- If X does not mark the country as accurate, the script shows no flag. That is not the `?` failure state.
- Accounts whose About this account panel errors on x.com also fail here. The `?` tooltip repeats X's GraphQL error. Those lookups retry after 30 minutes; they are an X-side failure, not a missing flag mapping.
- The script targets the `x.com` desktop DOM, not mobile web or third-party clients.
