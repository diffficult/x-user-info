# X Country Flags

Violentmonkey userscript for `x.com` that appends an account-country flag after the post age in timeline tweets.

Example output:

`· 1h · 🇦🇷`

The flag tooltip uses the country name reported by X, for example `Argentina`.

Regional labels use `🇪🇺` for Europe and `🌎` for North America or South America; Unicode has no separate flags for those two Americas.

## Icon

Both userscripts embed a compact PNG icon rendered from `World-Flags-Globe.svg`, so Violentmonkey can display it without a remote URL.

## How it works

- Watches `article[data-testid="tweet"]` nodes in the timeline.
- Reads the account handle from the post's status link.
- Captures X's internal `AboutAccountQuery` request template from the profile's `About this account` panel.
- Reuses that request for other handles and reads `about_profile.account_based_in`.
- Only renders a flag when `created_country_accurate` is `true`.
- Caches results per handle for 14 days.

## Install

1. Install Violentmonkey in Firefox.
2. Create a new userscript.
3. Paste the contents of `x-country-flags.user.js`.
4. Open `https://x.com/home`.

## First-run priming

The script needs one real `AboutAccountQuery` from your current X session so it can capture the active request shape.

1. Open any profile on X.
2. Hover the `Joined ...` link to open `About this account`.
3. Return to the timeline.

After that, timeline posts should begin resolving flags automatically as they are processed.

## Automatic-bootstrap trial

`x-country-flags-autoprime.user.js` is a separate experimental version that does not require opening `About this account` first. It captures the authenticated GraphQL headers from normal timeline traffic, then invokes the current `AboutAccountQuery` ID directly.

Install it instead of the standard script while testing. Disable the standard script first so flags are not rendered twice.

## Limitations

- If X changes the internal query name, path, or payload shape, the script will stop adding flags until updated.
- If X does not mark the country as accurate, the script intentionally shows nothing.
- The automatic-bootstrap script ignores the initial timeline, looks up only newly added posters, makes at most one lookup every 3 seconds, and pauses for 30 minutes after a failed request to protect the X session from rate limits.
- The script currently targets `x.com` desktop DOM, not mobile web or third-party clients.
