// Cloudflare Pages Function — serves Android's App Links assertion
// file. Each subdomain returns its build variant's package name and
// signing-cert SHA-256 fingerprint. Android verifies on install (or
// when an `intent-filter` with `autoVerify="true"` is encountered) and
// refuses to dispatch verified intents to apps that fail the check.
//
// To get each fingerprint:
//   eas credentials --platform android --profile <variant>
// Then in the interactive UI:
//   "Keystore: Manage everything needed to build your project"
//     → "Show keystore credentials"
//     → "SHA-256 Certificate Fingerprint"
// Copy each one into the appropriate slot below.
//
// EAS-managed keystores are stable across builds for the same variant;
// fingerprints only change if the keystore is regenerated, which is a
// manual destructive action that requires all users to reinstall.
//
// Routing:
//   GET https://dev.denazen.com/.well-known/assetlinks.json
//     → package: com.denazen.app.dev,  fingerprint: <DEV>
//   GET https://beta.denazen.com/.well-known/assetlinks.json
//     → package: com.denazen.app.beta, fingerprint: <BETA>
//   GET https://denazen.com/.well-known/assetlinks.json
//     → package: com.denazen.app,      fingerprint: <PROD>
//
//   Any other host: 404. (Strict — Android refuses to verify if the
//   response is wrong for the host.)
//
// Android spec requirements:
//   - HTTPS only.
//   - No redirects (Android refuses to follow them).
//   - Content-Type `application/json`.
//
// IMPORTANT: keep `public/.well-known/assetlinks.json` nonexistent —
// static files would shadow this function.

interface VariantConfig {
  package: string;
  fingerprint: string; // 64 hex chars, colon-separated every 2 chars
}

const VARIANTS: Record<string, VariantConfig> = {
  'dev.denazen.com':  { package: 'com.denazen.app.dev',  fingerprint: 'F3:B7:AE:03:FB:5A:DA:75:18:B4:E5:DB:50:FD:0F:5A:F6:B8:B3:51:8B:15:47:C7:55:E4:97:20:B3:87:F7:2A' },
  'beta.denazen.com': { package: 'com.denazen.app.beta', fingerprint: '04:5E:85:66:6E:A3:30:41:28:54:96:88:A3:FF:23:58:CA:D2:FC:32:A9:0B:D0:C4:40:5E:E2:63:FA:55:E8:A9' },
  'denazen.com':      { package: 'com.denazen.app',      fingerprint: '<SHA256_PROD>' },
};

export const onRequestGet: PagesFunction = ({ request }) => {
  const host = new URL(request.url).hostname.toLowerCase();
  const variant = VARIANTS[host];
  if (!variant) {
    return new Response('Not Found', { status: 404 });
  }

  // Hard guard against accidental deploy with placeholders. Android
  // would silently mark verification failed and we'd never know until
  // we try to sign in and fall through to the browser-asks-OS path.
  if (variant.fingerprint.startsWith('<SHA256_')) {
    return new Response(
      `assetlinks.json: fingerprint placeholder for ${host} not replaced. ` +
      'See functions/.well-known/assetlinks.json.ts.',
      { status: 503, headers: { 'Content-Type': 'text/plain' } }
    );
  }

  const body = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: variant.package,
        sha256_cert_fingerprints: [variant.fingerprint],
      },
    },
  ];

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
