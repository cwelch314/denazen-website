# Security Changelog

A dated record of material changes to Denazen's public-facing security documents — the [Security Policy](/security/), the [encryption architecture whitepaper](/security/architecture/), and the [RFC 9116 security.txt](/.well-known/security.txt). Entries are newest first.

This page exists so a reviewer who has read Denazen's security docs before can quickly see what has changed since.

---

## 2026-04-19

### Zero-trust scope made explicit (whitepaper §1.4, new)

Added a new subsection that states precisely what Denazen's "zero-trust content model" does and does not cover. Reviewers will ask, "you say zero-trust, but how can that be true when Bluesky operates the PDS?" — this subsection answers preemptively. Content confidentiality, key-material confidentiality, the fail-closed privacy invariant, and (once OOB verification ships) MITM resistance are in scope. Metadata, availability, Bluesky-layer plaintext posts, first-contact-before-OOB, and user-chosen password entropy are not. The three remaining trust roots are enumerated.

### Auto-re-login disclosed (whitepaper §4.4, new)

Added a new subsection disclosing that the encryption password is stored in the device's secure storage (iOS Keychain / Android Keystore) by default so the app can silently re-authenticate after session-token expiry. Controlled by a user-facing **"Keep me signed in"** setting, on by default. Closes the audit finding that the previous whitepaper was silent about at-rest persistence during normal active use — which could read as misleading by omission. Turning the setting off requires re-entering the encryption password on every launch.

### Out-of-band verification moved from shipped to planned (whitepaper §8 rework)

The previous draft described opt-in safety-number / QR-code verification as a shipping feature. The shipping app does not yet expose that UI — only TOFU fingerprinting (automatic, §8.4) is implemented. To make the public claim match the implementation:

- §8.5 "Out-of-band key verification (opt-in)" **removed entirely** from the architecture page.
- §8.4 rewritten as the authoritative TOFU description (no longer references the missing §8.5).
- §8.6 renumbered to §8.5 ("Sender-side deletion tokens"); §8.7 to §8.6 ("Push notifications"). Content unchanged.
- §1 intro bullet 2 rewritten to describe TOFU rather than OOB.
- §10.3 (Kyber key rotation) no longer says OOB confirms the new key; instead it points at Future work.
- §16 (Future work) gains **"Out-of-band contact verification"** as the new first bullet. The section now lists four items instead of three.
- §18 (Summary) closing bullet updated to reflect that confirmed-sender authentication is TOFU-based and OOB is planned.

Credibility matters more than roadmap optimism: claiming a feature that doesn't exist is worse than flagging it honestly as planned.

### Security changelog published (this page, new)

A dated companion to the architecture whitepaper, so reviewers can see at a glance what has changed since the last time they looked. Linked from both [/security/](/security/) and [/security/architecture/](/security/architecture/).

---

*For the current whitepaper, see [encryption architecture](/security/architecture/). For how to report a vulnerability, see the [Security Policy](/security/).*
