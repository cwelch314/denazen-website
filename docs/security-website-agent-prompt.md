# Website Agent Prompt — Security Policy Artifacts

Paste the section below (everything between the `---` lines) into your website agent. It contains three deliverables and the exact content each needs.

---

Add a security policy to the Denazen website. Three artifacts, with exact content and placement specified below.

## 1. `security.txt` at `/.well-known/security.txt`

Serve the following as plain text at the exact path `https://denazen.com/.well-known/security.txt`. This must be reachable with no redirects and `Content-Type: text/plain; charset=utf-8`. RFC 9116 compliance requires this specific path.

```
Contact: mailto:security@denazen.com
Contact: https://denazen.com/security
Expires: 2027-04-19T00:00:00.000Z
Preferred-Languages: en
Policy: https://denazen.com/security
Acknowledgments: https://denazen.com/security/acknowledgments
Canonical: https://denazen.com/.well-known/security.txt
```

**Notes on the fields:**

- `Expires` is set one year out. Before the expiration date, update this file with a new `Expires:` value at least a year in the future. Treat this as an annual reminder.
- No `Encryption:` field — Denazen is not publishing a PGP key at this time.
- The file should be served from the apex domain (`denazen.com`) regardless of what other domains the product uses (app.denazen.com, etc.). Researchers look for it at the main site.

## 2. Public security page at `/security`

Create a page at `https://denazen.com/security` with the following content. Use the site's existing typography and theme — no special visual treatment needed. This is a formal document, not a marketing page.

### Page title: Security Policy

### Page content:

---

**Security at Denazen**

Denazen is built around strong privacy and encryption guarantees. We publish our encryption architecture in detail and welcome scrutiny from the security research community.

This page describes how to report a security issue and what you can expect from us in return.

---

**Reporting a vulnerability**

If you believe you have found a security vulnerability in Denazen, please report it privately by emailing:

**security@denazen.com**

Please do not disclose the issue publicly before giving us a reasonable chance to respond. We will acknowledge your report within **72 hours** and will coordinate with you on a disclosure timeline.

For machine-readable contact and policy information, see [security.txt](/.well-known/security.txt), published per [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116.html).

---

**What to include in your report**

- A description of the issue and its potential impact
- Steps to reproduce, or a proof-of-concept
- The version of the app or the date you tested
- Any relevant environment details (platform, device)
- Your preferred contact address and whether you want public credit

The more detail you provide, the faster we can triage.

---

**What we'll do**

1. Acknowledge receipt within 72 hours.
2. Triage the report and confirm whether we consider it a vulnerability.
3. Keep you updated on progress at reasonable intervals, typically every 7–14 days.
4. Coordinate a disclosure timeline with you. Our default is to ship a fix and then publicly disclose within 90 days of the initial report. We are flexible on complex issues.
5. Credit you publicly in our acknowledgments if you want to be named, or keep your report anonymous if you prefer.

---

**Scope**

**In scope:**

- The published encryption architecture whitepaper — design-level flaws in the protocol, key hierarchy, inbox envelope, key exchange pattern, or privacy invariant.
- The Denazen mobile app published to the App Store and Google Play — cryptographic, authentication, authorization, or data-handling bugs in the shipping build.
- Denazen server endpoints — the API gateway, the inbox, the post index, friend request handling. Includes authentication bypass, authorization flaws, injection, and data-leak issues.
- Data stored in user-accessible AT Protocol records (`com.denazen.*` collections).

**Out of scope:**

- Physical attacks on devices under the user's control (an unlocked stolen device is outside our threat model).
- Social engineering of Denazen staff or users.
- Denial-of-service testing against production infrastructure. Report DoS concerns analytically, not via actual load attacks.
- Vulnerabilities in third-party services we integrate with (Bluesky PDS, AT Protocol relays, app store infrastructure). Report those to the respective vendor.
- Vulnerabilities that require an attacker to already possess your encryption password or vault key.
- Reports generated purely by automated scanners with no demonstrated impact.
- Missing security headers or cookie flags on non-sensitive marketing pages.

If you are uncertain whether a specific test is within scope, please ask first by emailing `security@denazen.com` before testing.

---

**Safe harbor**

We consider security research conducted in good faith under this policy to be:

- Authorized under our Terms of Service
- Exempt from any claim we might otherwise pursue under the Computer Fraud and Abuse Act or equivalent laws
- Exempt from any claim under relevant anti-circumvention laws

We will not pursue legal action against researchers who:

- Make a good-faith effort to comply with this policy
- Avoid privacy violations, data destruction, and service disruption
- Use only accounts they own or have explicit permission to access
- Give us a reasonable time to address the issue before public disclosure
- Do not exploit the issue beyond what is necessary to demonstrate it

---

**Bug bounty**

Denazen does not currently offer paid bug bounties. We provide public acknowledgment for valid reports and may offer other forms of recognition as the product matures. A paid bounty program is planned post-launch.

---

**Acknowledgments**

Researchers who have responsibly reported issues to Denazen are listed on our [acknowledgments page](/security/acknowledgments).

---

## 3. Acknowledgments page at `/security/acknowledgments`

Create a page at `https://denazen.com/security/acknowledgments`. Initial content:

### Page title: Security Acknowledgments

### Page content:

---

**Security Acknowledgments**

Denazen thanks the following security researchers for responsibly reporting issues.

*No reports to acknowledge yet. This list will grow as researchers contribute.*

If you have reported an issue and would like to be listed here, let us know in your report.

---

## 4. Footer link

Add a "Security" link to the site footer, in the same row as "Privacy Policy," "Terms," etc. Link target: `/security`.

## Verification checklist

After implementation, confirm:

- [ ] `https://denazen.com/.well-known/security.txt` returns HTTP 200 with `Content-Type: text/plain`
- [ ] The `security.txt` file has no redirects — some RFC 9116 parsers reject redirected responses
- [ ] The `Expires:` date is at least 6 months in the future
- [ ] `https://denazen.com/security` renders the security policy
- [ ] `https://denazen.com/security/acknowledgments` renders the acknowledgments page
- [ ] Footer contains a "Security" link pointing to `/security`
- [ ] Test the RFC 9116 file with an online validator, e.g. https://securitytxt.org/validator/ — must pass

## Reminders for future maintenance

- The `Expires:` field in `security.txt` needs to be updated every year or it will be treated as expired by parsers. Easiest: set a calendar reminder.
- When you eventually publish a PGP key, add `Encryption: https://denazen.com/pgp-key.txt` to `security.txt` and mention PGP as an option on the security page.
- The acknowledgments list should be updated as reports are received and researchers consent to being named.

---

End of website agent prompt.
