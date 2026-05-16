# Rhize — Terms of Service (DRAFT)

> **Status:** Draft prepared 2026-05-15 by AI assistant for legal-counsel review.
> **Do not publish without qualified legal review.** This draft is structured to
> meet the express, named requirements of the Apple App Store Review Guidelines
> (notably 1.2, 3.1.2, 5.1.1(v), and the in-app-EULA requirements that Apple
> applies when a developer chooses not to use Apple's standard EULA). It is also
> structured to be honest about what Rhize's end-to-end encryption *does and does
> not* let the operator do, so claims here match the engineering reality
> documented in the encryption architecture whitepaper.
>
> See the **Reviewer notes & open items** section at the end for assumptions
> that need confirmation before publication.

---

**Last updated:** _to be set at publication_

These Terms of Service ("Terms") are a binding agreement between you and
**Rhize, PBC** ("Rhize", "we", "us", or "our") governing your access to and use
of the Rhize mobile application, the website at rhize.social, and any related
services we offer (collectively, the "Service"). By creating an account,
installing the app, or otherwise using the Service, you agree to these Terms
and to our [Privacy Policy](https://rhize.social/privacy/). If you do not
agree, do not use the Service.

## 1. Eligibility and age

You must be at least **17 years old** to use Rhize, which is the minimum age
rating we have selected on the Apple App Store and Google Play. You must also
be of legal age to form a binding contract in your jurisdiction. By using
Rhize, you represent that you meet these requirements.

You may not use Rhize if you are barred from doing so under the laws of the
United States or any other applicable jurisdiction, including any country
subject to a U.S. Government embargo or designated by the U.S. Government as a
"terrorist supporting" country.

## 2. Your account and identity

Rhize uses **AT Protocol identity**. To use Rhize you need a Bluesky handle
(your AT Protocol identifier) and a Rhize **encryption password** that
protects your private keys. You are responsible for:

- Keeping your Bluesky credentials secure.
- Keeping your Rhize encryption password secure. **We do not store, transmit,
  or have any way to recover this password.** If you lose it, your private
  posts, direct messages, and Circle memberships become **permanently
  inaccessible**. This is by design: any recovery mechanism we offered would
  also let us read your private content, which would defeat the encryption.
- All activity that occurs under your account.

You may use Rhize on multiple devices using the same Bluesky handle, Bluesky
password, and Rhize encryption password. Signing out of a device clears the
keys from that device until you sign in again.

You agree to provide accurate information during signup and to update it if it
changes. You may not impersonate another person or misrepresent your
affiliation with any person or entity.

## 3. The two layers of Rhize

Rhize has **two distinct layers**, and the rules that apply depend on which
layer you are using:

- **Public layer (Bluesky / AT Protocol).** When you post publicly, follow
  someone publicly, or interact with the public timeline, you are publishing
  to the open Bluesky network. That content is visible to anyone, is governed
  by the rules of the AT Protocol and the policies of the Bluesky Personal
  Data Server hosting your account, and is **not encrypted**.
- **Private layer (Circles and DMs).** When you post to a Circle or send a
  direct message, the content is **end-to-end encrypted on your device
  before it leaves it**. Only the devices of the recipients you have chosen
  hold the keys to decrypt it. Rhize servers, Bluesky servers, and any
  network observer see ciphertext only. **We cannot read this content.** This
  is enforced by cryptography, not policy.

You are responsible for understanding which layer you are publishing to before
you post.

## 4. Acceptable use

You agree not to use Rhize to do, post, attempt, encourage, or facilitate any
of the following ("Prohibited Conduct"):

- Post or share **objectionable content**, defined to include content that is
  illegal, defamatory, obscene, pornographic, sexually explicit involving any
  person under 18, threatening, harassing, hateful, racist, that incites
  violence, that promotes terrorism, that promotes self-harm, or that
  otherwise violates the rights of others.
- Post or share **child sexual abuse material (CSAM)** of any kind. We
  cooperate with and report to the National Center for Missing & Exploited
  Children (NCMEC) and law enforcement to the fullest extent permitted by
  law.
- Harass, abuse, threaten, dox, stalk, or target any individual or group.
- Impersonate another person or misrepresent your identity or affiliation.
- Engage in fraud, deception, scams, or commercial spam.
- Distribute malware, exploit code, or content designed to harm devices or
  data.
- Attempt to **circumvent, weaken, defeat, or reverse-engineer** the
  encryption, authentication, or access-control mechanisms of the Service,
  except to the extent expressly permitted by our [Security
  Policy](https://rhize.social/security/).
- Scrape, bulk-extract, or systematically harvest data from the Service in
  excess of the rate limits or scopes we publish.
- Use the Service to violate any applicable law, regulation, or third party's
  rights, including intellectual property and privacy rights.
- Use the Service to operate a competing service, to train machine-learning
  models on other users' content, or to derive datasets for resale.

We reserve the right to refuse, suspend, or terminate access for any account
we reasonably believe is engaged in Prohibited Conduct, **including in cases
where we cannot read the underlying private content but can act on reports,
metadata, or external evidence** (see Section 5).

## 5. Content moderation, reporting, and blocking

Because some of Rhize's content is end-to-end encrypted, it is important to
be precise about what we can and cannot do:

### 5.1 What you can do, in every part of the app

Every Rhize user has tools to protect themselves and to flag content for our
review. From within the Rhize app you can:

- **Report any post, message, or user**, in either the public layer or the
  private layer. Reports may include the content the reporter chooses to
  attach, plus account and message metadata that the reporter's device can
  produce. A direct in-app contact path is also published at
  **report@denazen.com**.
- **Block any user.** A blocked user cannot send you direct messages, cannot
  add you to a Circle, and cannot see private content you publish to your
  Circles going forward.
- **Remove someone from a Circle.** When you do, the Circle's encryption key
  is rotated, and the removed user cannot decrypt any new posts to that
  Circle. (Posts they already decrypted before being removed remain visible
  to them, as is true of any disclosed information.)
- **Delete your own posts and messages**, subject to the inherent limits of
  any system in which recipients have already received and stored a copy.

### 5.2 What we do when we receive a report

We commit to **review reports of objectionable content within 24 hours** and,
where the report is substantiated and the content or conduct violates these
Terms or applicable law, to take **appropriate action against the user
responsible**, including warning, content removal where technically possible,
account suspension, or account termination.

For reports concerning the **public layer**, we can typically also remove or
hide the content itself, because the content is unencrypted at the protocol
level.

For reports concerning the **private layer**, we cannot read the underlying
content. We can act on what we can see — account-level enforcement, removal
of the offender from Rhize, cooperation with law enforcement, and
preservation of metadata and reporter-provided evidence — and we will. We can
also remove a user from the Service entirely, which prevents future use.

### 5.3 What we cannot do (and why)

We **cannot** decrypt private posts or direct messages on demand. We **do
not** have a backdoor, a key escrow, or a master key. This is enforced
cryptographically and is documented in our published [encryption
architecture](https://rhize.social/security/architecture/). Any provision
of these Terms that would seem to require us to do something cryptographically
impossible should be read consistent with this section.

We do not commit to proactively scanning encrypted content for prohibited
material, and we have no technical ability to do so.

## 6. Your content; license to operate the Service

You retain ownership of the content you post, send, or upload through Rhize
("Your Content"). You grant Rhize a **worldwide, royalty-free,
non-exclusive, sublicensable license** to host, store, transmit, display,
back up, and otherwise process Your Content **only as needed to operate,
deliver, and secure the Service**.

For private (end-to-end encrypted) content, this license is limited to
processing and transmitting **ciphertext** — we do not have, and this license
does not grant us, any right to access plaintext.

For public content, the license additionally permits public display and the
operation of features that depend on public visibility (search, public
timelines, federation across the AT Protocol network).

You represent and warrant that you have the rights necessary to grant this
license for everything you post, send, or upload.

## 7. Third-party services and the AT Protocol

The public layer of Rhize is delivered over the **AT Protocol** and may
involve servers and services we do not operate, including Bluesky Personal
Data Servers, AT Protocol relays, and Bluesky-operated infrastructure. Your
public activity may be subject to the terms and policies of those services.
We are not responsible for the practices of independent operators of AT
Protocol infrastructure.

## 8. Subscriptions, payments, and the App Store EULA

Rhize is currently free to use. We may in the future offer paid features or
subscriptions ("Premium"). If we do:

- All purchases made through the Apple App Store are processed by Apple under
  Apple's terms; refund and cancellation rules of the App Store apply.
- Recurring subscriptions, if offered, will auto-renew at the price and
  cadence disclosed at the time of purchase, until cancelled. You can cancel
  through your App Store account settings; cancellation takes effect at the
  end of the current billing period.
- The price and details of any subscription will be disclosed in the app
  before you complete purchase.

To the extent any provision of these Terms conflicts with the standard
end-user license agreement applicable to apps distributed through the Apple
App Store, the more restrictive provision controls with respect to that
distribution channel.

## 9. Account deletion

You may delete your Rhize account at any time. **From within the Rhize app**,
go to **Settings → Account → Delete account**, or submit a deletion request
to **delete@denazen.com** from the email address associated with your
account. Account deletion will, within a reasonable time:

- Remove your Rhize account profile and your encrypted vault material from
  Rhize's servers.
- Remove server-side ciphertext that was stored to deliver private content to
  your account.
- Cancel any active Rhize Premium subscription going forward (existing App
  Store / Google Play billing rules govern any in-period charges).

**What deletion does not do:**

- It does not delete your Bluesky / AT Protocol account, your public posts on
  Bluesky, or your Bluesky handle. Those live on your Bluesky Personal Data
  Server and must be deleted through Bluesky directly.
- It does not retrieve or delete copies of content that other users have
  already received and stored on their own devices.
- We may retain limited records as required by law, for fraud prevention,
  accounting, or to enforce these Terms — for example, evidence preserved as
  part of a moderation investigation.

## 10. Suspension and termination by Rhize

We may suspend, restrict, or terminate your account, with or without notice,
if we reasonably believe you have violated these Terms, applicable law, or
the rights of others, or if your account presents a security or legal risk
to the Service or to other users. Where practical and legal we will tell you
why. Where the violation is severe — such as CSAM, threats of violence, or
sustained harassment — we may act immediately and without prior notice.

Upon termination, the license you granted us in Section 6 ends, except as
needed to retain records permitted by Section 9.

## 11. Intellectual property; copyright complaints (DMCA)

The Rhize name, logo, and all software, designs, and content provided by us
are owned by Rhize or our licensors. These Terms do not grant you any rights
in our trademarks or our software beyond the limited right to use the
Service.

If you believe content on Rhize infringes your copyright, send a notice that
complies with **17 U.S.C. § 512(c)(3)** (the DMCA) to our designated agent:

- **Email:** dmca@denazen.com
- **Mail:** _Rhize, PBC — DMCA Agent — [STREET ADDRESS to be filled in]_

A complete notice must include: (a) your physical or electronic signature;
(b) identification of the work claimed to have been infringed; (c) the
material on Rhize that you claim is infringing, with enough detail for us to
locate it; (d) your contact information; (e) a statement that you have a
good-faith belief that the use is not authorized; and (f) a statement under
penalty of perjury that the information in your notice is accurate and that
you are authorized to act on behalf of the rights holder. We will respond to
properly submitted notices and may terminate the accounts of repeat
infringers.

For private (encrypted) content, we cannot inspect what is stored, but we
will act on properly submitted DMCA notices to the extent the reported user
or material is identifiable.

## 12. Disclaimers

THE SERVICE IS PROVIDED **"AS IS" AND "AS AVAILABLE"** WITHOUT WARRANTIES OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
TIMELY, SECURE, OR ERROR-FREE.

Rhize's encryption architecture is designed to provide strong cryptographic
guarantees. **However, no software is bug-free. No cryptographic system can
protect you from a recipient who chooses to share what you sent them, from a
device that is unlocked while in another person's hands, from a weak
encryption password chosen by you, or from any third party who has lawfully
obtained your devices and credentials.** You acknowledge these inherent
limits.

## 13. Limitation of liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, **RHIZE AND OUR OFFICERS, DIRECTORS,
EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES**, OR FOR ANY LOSS OF
PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING
OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICE, WHETHER IN
CONTRACT, TORT, OR OTHERWISE, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGES.

OUR AGGREGATE LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE
TERMS OR THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE TOTAL AMOUNTS
YOU HAVE PAID US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE
TO THE CLAIM, OR (B) **ONE HUNDRED U.S. DOLLARS (US$100)**.

Some jurisdictions do not allow the exclusion or limitation of certain
damages, so some of the above may not apply to you. In those jurisdictions,
our liability is limited to the smallest amount permitted by law.

## 14. Indemnification

You will indemnify, defend, and hold harmless Rhize, our affiliates, and our
officers, directors, employees, and agents from and against any claims,
damages, losses, liabilities, and expenses (including reasonable attorneys'
fees) arising out of or related to: (a) your use of the Service; (b) Your
Content; (c) your violation of these Terms; or (d) your violation of
applicable law or any third-party right.

## 15. Apple-specific terms

You and we acknowledge that these Terms are entered into between you and
Rhize only, **not with Apple Inc.** Apple is not responsible for the Service
or its content. To the extent these Terms conflict with the Apple Media
Services Terms and Conditions or the Licensed Application End User License
Agreement (collectively, the "Apple Terms"), the Apple Terms control as to
your use of the iOS app obtained from the App Store.

You also acknowledge:

- **License scope.** Your license to use the iOS app obtained from the App
  Store is limited to a non-transferable license to use the app on Apple-
  branded products you own or control, as permitted by the Usage Rules in
  the Apple Terms.
- **Maintenance and support.** **Rhize is solely responsible** for providing
  any maintenance and support for the iOS app. Apple has no obligation
  whatsoever to furnish any maintenance or support services with respect to
  the app.
- **Warranty.** In the event of any failure of the iOS app to conform to any
  applicable warranty, you may notify Apple, and Apple will refund the
  purchase price (if any) for the app to you. To the maximum extent
  permitted by applicable law, **Apple will have no other warranty
  obligation whatsoever** with respect to the iOS app, and any other claims,
  losses, liabilities, damages, costs, or expenses attributable to any
  failure to conform to any warranty will be **Rhize's sole responsibility**.
- **Product claims.** **Rhize, not Apple,** is responsible for addressing any
  claims by you or any third party relating to the iOS app or your
  possession or use of it, including product-liability claims, claims that
  the app fails to conform to any applicable legal or regulatory
  requirement, and claims arising under consumer-protection or similar
  legislation.
- **Intellectual property.** In the event of any third-party claim that the
  iOS app or your possession and use of it infringes that third party's
  intellectual property rights, **Rhize, not Apple,** will be solely
  responsible for the investigation, defense, settlement, and discharge of
  any such claim, to the extent required by the Apple Terms.
- **Legal compliance.** You represent and warrant that (i) you are not
  located in a country subject to a U.S. Government embargo, or that has
  been designated by the U.S. Government as a "terrorist supporting"
  country, and (ii) you are not listed on any U.S. Government list of
  prohibited or restricted parties.
- **Third-party beneficiary.** You and we acknowledge that **Apple and
  Apple's subsidiaries are third-party beneficiaries** of these Terms with
  respect to the iOS app, and that, upon your acceptance of these Terms,
  Apple will have the right (and will be deemed to have accepted the right)
  to enforce these Terms against you as a third-party beneficiary thereof.

## 16. Governing law and dispute resolution

These Terms are governed by the laws of **[STATE — to be confirmed by
counsel; commonly the developer's principal place of business, e.g.
Delaware or California]**, without regard to its conflict-of-laws rules.

You and Rhize agree to first attempt to resolve any dispute informally by
contacting **legal@denazen.com**. If we cannot resolve the dispute within
**60 days**, either party may bring a claim in the state or federal courts
located in **[COUNTY, STATE — to be confirmed by counsel]**, and you and we
each consent to the personal jurisdiction of those courts.

> **Reviewer note:** Many U.S. consumer-app developers prefer mandatory
> binding arbitration with a class-action waiver here. That choice has
> material business and PR consequences and should be made by counsel, not
> by this draft. Whichever direction is chosen must be paired with
> jurisdiction-appropriate carve-outs (e.g., small-claims-court carve-out,
> mass-arbitration handling) and the in-app acceptance flow needs to surface
> the arbitration term clearly enough to be enforceable in the relevant
> jurisdictions. **Confirm with counsel.**

Nothing in this section limits any non-waivable right you have under the
mandatory consumer-protection laws of your country or state of residence.

## 17. Changes to these Terms

We may update these Terms from time to time. We will post material changes
on this page, and where appropriate we will notify you by email or in-app
notice **before** the changes take effect. Your continued use of the Service
after the effective date of an updated version constitutes acceptance of the
updated Terms. If you do not agree, you must stop using the Service and may
delete your account under Section 9.

## 18. Miscellaneous

- **Entire agreement.** These Terms, together with the Privacy Policy and
  any product-specific terms we publish (e.g., for Premium), are the entire
  agreement between you and Rhize regarding the Service.
- **Severability.** If any provision is held unenforceable, the rest remains
  in effect.
- **No waiver.** Our failure to enforce a provision is not a waiver of our
  right to enforce it later.
- **Assignment.** You may not assign these Terms without our consent. We may
  assign them to an affiliate or in connection with a merger, acquisition,
  or sale of assets.
- **Force majeure.** Neither party is liable for delays or failures caused
  by events beyond reasonable control.

## 19. Contact

- General: **support@denazen.com**
- Legal: **legal@denazen.com**
- Privacy: **privacy@denazen.com**
- Security reports: **security@denazen.com**
- Abuse reports: **report@denazen.com**
- Copyright (DMCA): **dmca@denazen.com**
- Account deletion: **delete@denazen.com**

Mailing address: _Rhize, PBC — [STREET ADDRESS to be filled in]_

---

# Reviewer notes & open items

The following items in this draft are **assumptions** or **placeholders** that
must be confirmed before publication:

1. **Legal entity.** "Rhize, PBC" is used throughout. Confirm the actual
   incorporated name (and state of incorporation).
2. **Mailing address.** Required for the DMCA agent registration with the
   U.S. Copyright Office and for Apple's contact-info requirement.
3. **Minimum age (Section 1).** Set to **17** based on the typical App Store
   age rating for social apps with user-generated content. If you select a
   different age rating in App Store Connect, change this number to match.
   Note: COPPA in the U.S. requires special handling under 13; under-13
   users must not be permitted at all unless you build a COPPA-compliant
   flow.
4. **Account deletion path (Section 9).** I wrote "Settings → Account →
   Delete account" because Apple Guideline 5.1.1(v) requires account
   deletion to be reachable **inside the app**, not only via email. **You
   must verify the actual in-app path matches** (or update both this
   document and the app to align).
5. **Reporting and blocking (Section 5.1).** Apple Guideline 1.2 requires
   that report and block functions be present **in the app**. This draft
   asserts they are. **Verify they are shipping in the build you submit.**
   If they are not yet shipping, you cannot submit yet.
6. **Premium / subscriptions (Section 8).** Written conditionally because
   Premium is not yet live. When Premium ships, this section needs to be
   replaced with concrete pricing, billing cadence, free-trial terms, and
   any auto-renew disclosures Apple's IAP rules require.
7. **Governing law / jurisdiction (Section 16).** Placeholders. Counsel's
   call. The arbitration question is highlighted in an inline reviewer
   note in that section.
8. **Liability cap (Section 13).** I used **US$100** as a conservative
   default. Counsel may prefer a different number, or "the amounts paid in
   the prior 12 months" without an absolute floor.
9. **CSAM policy (Section 4).** Naming NCMEC reflects standard U.S.
   practice for Apple-distributed apps. Confirm with counsel that you have
   the operational pipeline (or a designated MLA / vendor) to file CyberTip
   reports when warranted, since making the commitment here without the
   pipeline behind it would be worse than not making the commitment.
10. **Security carve-out (Section 4).** Cross-references the public Security
    Policy at /security/, which already publishes a "safe harbor" clause
    for good-faith research. Keep the two documents consistent if either
    changes.

## Apple App Store Review Guideline coverage map

| Apple requirement | Where covered |
|---|---|
| **1.2 — Filtering of objectionable content** | §4 (Acceptable Use defines "objectionable content"); §5.3 (honest about why proactive filtering of E2E content is impossible — Apple has accepted this for Signal/WhatsApp/iMessage when paired with strong reporting tools) |
| **1.2 — Mechanism to report offensive content; timely response** | §5.1 (in-app report path + report@denazen.com); §5.2 (24-hour review commitment) |
| **1.2 — Ability to block abusive users** | §5.1 (block + remove-from-Circle + key rotation) |
| **1.2 — Published contact information** | §19 (full contact directory) |
| **3.1.2(a) — Auto-renewing subscription disclosures** | §8 (conditional language; needs to be tightened when Premium ships) |
| **5.1.1(v) — In-app account deletion** | §9 (in-app path + email fallback). Verify the in-app path matches reality. |
| **5.6 — Developer code of conduct, anti-spam, anti-fraud** | §4 (fraud / spam / impersonation explicit prohibitions) |
| **EULA — Apple as third-party beneficiary** | §15 |
| **EULA — Apple has no warranty / support obligation** | §15 |
| **EULA — Product / IP claims are developer's responsibility** | §15 |
| **EULA — Export / embargoed-country compliance** | §1 and §15 |
| **Privacy nutrition / privacy practices** | Cross-link to /privacy/; deletion in §9 |

## Honesty audit — claims vs. engineering reality

Claims in this draft were checked against the engineering documentation in
this repository (privacy.en.ts, faq.en.ts, security-architecture.en.ts):

| Claim in draft | Engineering source | Status |
|---|---|---|
| "We cannot read [private content]." | `privacy.en.ts`: "we cannot read it. We do not hold the decryption keys."; `faq.en.ts`: "No. We never have the keys to decrypt them. That's enforced cryptographically, not by policy." | ✅ Matches — strong claim is correct |
| Lost encryption password = permanent loss of private content | `faq.en.ts`: "Your private content becomes permanently inaccessible. This is intentional…"; `security-architecture.en.ts` §4 same | ✅ Matches |
| Removing a user from a Circle rotates the key but does not retract already-decrypted posts | `faq.en.ts`: "Posts they already downloaded before being removed can't be un-seen…"; engineering docs same | ✅ Matches |
| Multi-device, no manual key sync | `faq.en.ts`: "Rhize is multi-device by design. You don't pair devices…" | ✅ Matches |
| Public layer = unencrypted Bluesky / AT Protocol | `faq.en.ts`, `index.en.ts` | ✅ Matches |
| In-app reporting and blocking exist | **Not yet verified in code in this review pass.** The draft asserts they exist because Apple requires them. **You must verify before submitting.** | ⚠️ Verify |
| In-app account deletion exists at Settings → Account → Delete account | **Not verified in code in this review pass.** | ⚠️ Verify path |
| 24-hour response to objectionable-content reports | A commitment Rhize is making here; not currently documented elsewhere in the repo. Make sure the operational on-call / triage process can meet it. | ⚠️ Operational commitment |
