// Cloudflare Pages Function — serves Apple's Universal Links assertion
// file. Mirrors the per-host pattern used by
// oauth-client-metadata.json.ts: each subdomain returns its build
// variant's app ID, so iOS only routes verified URLs to the matching
// app.
//
// Why this exists: Universal Links lets the OS dispatch HTTPS URLs
// directly to the app (skipping the browser entirely), removing the
// "browser politely tries to hand off to the app" failure mode that
// was hitting Android — the same mechanism solves both platforms.
// See `denazen` repo: docs/plan-app-links-redirect.md.
//
// Routing:
//   GET https://dev.denazen.com/.well-known/apple-app-site-association
//     → appID: <TEAM>.com.denazen.app.dev, paths: /oauth-callback*
//
//   GET https://beta.denazen.com/.well-known/apple-app-site-association
//     → appID: <TEAM>.com.denazen.app.beta, paths: /oauth-callback*
//
//   GET https://denazen.com/.well-known/apple-app-site-association
//     → appID: <TEAM>.com.denazen.app, paths: /oauth-callback*
//
//   Any other host: 404. (Strict — unlike oauth-client-metadata which
//   falls back to prod, AASA must not return a wrong appID for an
//   unknown host. iOS would silently de-verify the link.)
//
// Apple spec requirements:
//   - URL is exactly /.well-known/apple-app-site-association — note
//     NO `.json` extension. The file name here is just `*.ts`; Pages
//     Functions serve it at the path matching the file name minus
//     `.ts`, so this resolves to the correct URL.
//   - Content-Type MUST be `application/json` (no charset).
//   - No redirects allowed; iOS refuses to follow them when fetching.
//
// IMPORTANT: keep `public/.well-known/apple-app-site-association`
// nonexistent. Static files take priority over functions in Pages —
// any static fallback there will silently shadow this function.

const APPLE_TEAM_ID = 'VFLFW8A42B';

interface VariantConfig {
  appID: string; // format: TEAMID.bundleID
}

const VARIANTS: Record<string, VariantConfig> = {
  'dev.denazen.com':  { appID: `${APPLE_TEAM_ID}.com.denazen.app.dev`  },
  'beta.denazen.com': { appID: `${APPLE_TEAM_ID}.com.denazen.app.beta` },
  'denazen.com':      { appID: `${APPLE_TEAM_ID}.com.denazen.app`      },
};

export const onRequestGet: PagesFunction = ({ request }) => {
  // Hard guard against accidental deploy with the placeholder still in.
  // Universal Links verification will silently de-verify the link if it
  // ever sees a malformed / placeholder appID, so failing loudly here
  // protects against shipping a broken assertion file unnoticed.
  if (APPLE_TEAM_ID === '<TEAM_ID>') {
    return new Response(
      'apple-app-site-association: APPLE_TEAM_ID placeholder not replaced. ' +
      'See functions/.well-known/apple-app-site-association.ts.',
      { status: 503, headers: { 'Content-Type': 'text/plain' } }
    );
  }

  const host = new URL(request.url).hostname.toLowerCase();
  const variant = VARIANTS[host];
  if (!variant) {
    return new Response('Not Found', { status: 404 });
  }

  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appID: variant.appID,
          paths: ['/oauth-callback', '/oauth-callback/*'],
        },
      ],
    },
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
