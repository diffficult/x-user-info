# X Country Flags

Violentmonkey userscript for `x.com` that appends an account-country flag after the post age in timeline tweets.

Example output:

`· 1h · 🇦🇷`

The flag tooltip uses the country name reported by X, for example `Argentina`.

Regional labels use `🇪🇺` for Europe and `🌎` for North America or South America; Unicode has no separate flags for those two Americas.

## Icon

The userscript embeds a compact PNG icon directly in its metadata, so no external icon file or remote URL is required.

## How it works

- Watches `article[data-testid="tweet"]` nodes in the timeline.
- Reads the account handle from the post's status link.
- Captures X's internal GraphQL request template — including its authorization headers — from normal timeline traffic, so no profile visit or manual priming is needed.
- Reuses that template to invoke the current `AboutAccountQuery` operation and reads `about_profile.account_based_in`.
- Only renders a flag when `created_country_accurate` is `true`.
- Caches each handle's result permanently in Violentmonkey storage, so it is queried at most once unless the script cache is cleared.

## Install

**[Install / Update](https://forge.ikelos.xyz/5320/x-user-info/raw/branch/main/x-country-flags-autoprime.user.js)**

1. Install Violentmonkey in Firefox.
2. Click the link above — Violentmonkey offers to install it, or update it if you already have a previous version installed.
3. Open `https://x.com/home`.

Flags begin resolving as soon as the script captures the first authenticated timeline request.

## Privacy And Session Disclaimer

- No X username, account ID, cookie, token, or session value is hardcoded in the script.
- The script uses the active X session to query X's own endpoint. It captures X's normal GraphQL request metadata, including authorization headers, only in page memory; the browser attaches session cookies through `credentials: "include"`.
- Cookie headers are excluded from the captured request template. Headers, cookies, and tokens are not logged or written to Violentmonkey storage.
- Persistent storage contains only `username -> country name / flag` cache entries.

## Limitations

- If X changes the internal query name, path, or payload shape, the script will stop adding flags until updated; the script logs a clear warning when the embedded `AboutAccountQuery` ID goes stale.
- If X does not mark the country as accurate, the script intentionally shows nothing.
- The script looks up each uncached poster at most once, makes at most one lookup every 3 seconds, and backs off after failures: ~1 minute for transient errors, 30 minutes for rate limits, auth failures, or a stale query ID.
- The script currently targets `x.com` desktop DOM, not mobile web or third-party clients.
