# Website Update Queue

A running list of changes to the public-facing whitepaper and security pages that need to be reflected on `denazen.com`. Each entry is self-contained so this document can be handed directly to the website agent without additional context.

**How to use this file:**

- New whitepaper / security-doc changes are appended to the **Pending** section below, newest first.
- The website agent reads each pending entry, updates the site, then moves the entry to **Completed** with a date.
- Each entry specifies: the affected public pages, what changed in the source, and the exact replacement text (or diff) to apply.
- Source of truth for technical claims: [docs/encryption-architecture-whitepaper.md](encryption-architecture-whitepaper.md). If the website and the whitepaper disagree, the whitepaper wins.

**Related documents:**

- [docs/encryption-architecture-whitepaper.md](encryption-architecture-whitepaper.md) — the full technical whitepaper.
- [docs/encryption-architecture-whitepaper-diff.md](encryption-architecture-whitepaper-diff.md) — original internal-to-public adaptation notes (one-time).
- [docs/security-website-agent-prompt.md](security-website-agent-prompt.md) — the prompt for the responsible-disclosure artifacts (`security.txt`, `/security` page). One-time.
- [SECURITY.md](../SECURITY.md) — canonical policy text mirrored to the public security page.

---

## Pending

*(Newest first. Move completed entries to the "Completed" section below with a date.)*

*No pending entries.*

<!--
Entry template:

## YYYY-MM-DD — <one-line summary>

**Affects:** which public page(s) — e.g., /security/architecture, /security, /, etc.

**Source change:** brief description of what changed in the whitepaper or doc, with the commit hash.

**Action for the website agent:**
1. Concrete step 1 with old/new text if applicable.
2. Concrete step 2.

**Verification:**
- What the public page should say after the change.
- Any cross-references that also need updating.
-->

---

## Completed

*(Moved here once the website has been updated. Keep entries for historical reference.)*

### Applied 2026-04-19

## 2026-04-19 — Batch application of all pending entries + publish a changelog page

**Affects:** `/security/architecture/` (four distinct section-level edits described in the individual entries below) AND a new `/security/changelog/` page (or `/security/what-s-new/`, `/security/releases/` — whatever URL slug matches site convention).

**Why a batch entry:** the three entries below this one were authored independently but are small, related, and should be applied in a single website deploy so reviewers don't see the site in an inconsistent state. This top entry is the drop-in prompt the website agent should act on first; the individual entries below are still authoritative for their details.

**Action for the website agent — do all of the following in one pass:**

1. **Apply the three whitepaper edits** described in the entries below this one:
   - Add §1.4 "What zero-trust covers — and what it does not"
   - Add §4.4 "Auto-re-login and the encryption password at rest"
   - Move out-of-band verification from §8.5 (shipped) to §16 (planned): delete §8.5 entirely, renumber §8.6→§8.5 and §8.7→§8.6, update §1 intro bullet 2, §8.4, §10.3, §18 cross-references

2. **Create a new public changelog page** at `/security/changelog/` (or the equivalent URL slug). Render the content from `docs/public-changelog.md` verbatim. The changelog is a technical-audience companion to the architecture page — it tells reviewers what has changed and when. Link to it from:
   - A footer link on the /security/ landing page
   - A short "Changelog" link in the header of `/security/architecture/` (near the top, so a returning reader can jump straight to "what's new")

3. **On the /security/architecture/ page**, add a small callout at the very top referring readers to the changelog for "recent improvements". One line, not a hero. Example:

   > *Last revised 2026-04-19. See the [security changelog](/security/changelog/) for a summary of recent improvements.*

4. **Homepage / marketing "zero-trust" language**, if any hero bullet uses the phrase without qualification: add a subtle link to `/security/architecture#1-4`. Or leave the hero unchanged and trust that readers who want precision will click through to architecture.

**Verification after applying:**

- /security/architecture/ renders the three new/edited sections (§1.4, §4.4, §8.4 rewrite, §8.5 deleted, §8.6 formerly §8.7, §16 expanded, §18 summary bullet updated).
- /security/changelog/ exists and renders the contents of `docs/public-changelog.md`.
- Navigation: a reader landing on /security/ can reach /security/changelog/ in one click.
- A reader who bookmarked an older `/security/architecture#8-5-out-of-band-key-verification` link does not hit a broken page. Either 301-redirect it to `/security/architecture#16-future-work` or let the absent anchor fall through to the section heading.

**Why the changelog page matters:**

Security-aware reviewers want to see that a product is *actively maintained*. A static whitepaper looks stagnant; a dated changelog demonstrates that concerns are heard and addressed. It also makes it easy to point at "here's what has changed since the last time you looked at Denazen" in response to specific critiques.

---

## 2026-04-19 — Add §1.4 "What zero-trust covers and does not cover"

**Affects:** `/security/architecture/` — the public whitepaper. Optionally: the homepage hero / features section if it uses "zero-trust" language without scope.

**Source change:** New subsection §1.4 added at the end of §1 (Threat model). Summary: the whitepaper's "zero-trust" claim is precise about *what* is zero-trust (content confidentiality, key confidentiality, MITM resistance once OOB ships, fail-closed privacy invariant, forged-acceptance rejection) and what is not (metadata timing, availability, Bluesky-layer plaintext-post integrity, first-contact-before-OOB, user-chosen password equivalence). Also clarifies that neither the Bluesky PDS nor the Denazen server is a trust root — the trust root collapses to device + encryption password + OOB attestation once OOB ships.

**Why:** reviewers will ask "you say zero-trust but how can that be true when Bluesky operates the PDS?" — this section answers that preemptively and precisely. It also corrects an implicit over-broad read where a visitor might assume "zero-trust" = "zero trust in everything."

**Action for the website agent:**

1. Insert a new subsection **§1.4 "What zero-trust covers — and what it does not"** at the end of §1 Threat model, after the existing §1.3 Non-goals.

2. Render the body verbatim from the whitepaper. Preserve the two sub-headings ("What IS zero-trust" and "What is NOT zero-trust"), the bullet lists, the closing "three trust roots" numbered list, and the final paragraph.

3. **Update §18 Summary's closing bullet** (the one starting "No plaintext ever touches a server"). Old text:

   > **No plaintext ever touches a server.** The only trust root is the user's device plus a password that no Denazen server has ever seen.

   Replace with:

   > **No plaintext ever touches a server.** The only trust root for content confidentiality is the user's device, the user's encryption password, and (once OOB verification ships) the user's own out-of-band attestation of contact fingerprints. Neither the Bluesky PDS nor the Denazen server is trusted for confidentiality. See §1.4 for a precise statement of what "zero-trust" does and does not cover.

4. **Homepage/marketing pages** (if any use "zero-trust" in a hero claim): keep the language, but either (a) add a small link "what we mean by zero-trust →" pointing to `/security/architecture#1-4` anchor, or (b) include a one-line qualifier like "for content and keys". The nuance belongs on the architecture page, not the hero; but the link keeps marketing copy defensible.

**Verification after applying:**

- Rendered page has a visible §1.4 between §1.3 and §2.
- The "What IS zero-trust" and "What is NOT zero-trust" bulleted lists render correctly. Each bullet has bold-lead ("**Content confidentiality.**" etc.).
- The three-item "trust root" numbered list under "What this means for the trust-root picture" renders as an ordered list.
- §18's closing bullet points at §1.4.
- If `/security/architecture#1-4` anchor doesn't resolve automatically, add an explicit `id="1-4"` to the subsection heading.

**Tone note for any summary blurb on a landing page:**

Frame this as a strength, not a retreat. "We're precise about what our zero-trust guarantee covers" reads better than "here's where zero-trust doesn't apply." The substance is unchanged either way, but the framing matters for a general-audience reader.

---

## 2026-04-19 — Move out-of-band verification from shipping to planned (Future work)

**Affects:** `/security/architecture/`, and anywhere else on the site that currently claims Denazen ships opt-in safety-number / QR-code verification (the `/security/` landing, any feature-comparison section, the §1 hero bullets, etc.).

**Source change:** Audit finding HIGH-1. Out-of-band contact verification was claimed as a shipping, opt-in feature in the whitepaper but has no user-facing UI. TOFU fingerprinting (automatic) is implemented; the manual safety-number / QR-code flow is not. The whitepaper has been amended to:

- Remove §8.5 "Out-of-band key verification (opt-in)" entirely.
- Renumber §8.6 → §8.5 ("Sender-side deletion tokens") and §8.7 → §8.6 ("Push notifications").
- Add "Out-of-band contact verification" as a new bullet in §16 Future work (now four bullets instead of three).
- Rewrite the §1 intro second bullet to describe TOFU rather than OOB.
- Rewrite §8.4 to be the single authoritative description of TOFU-based confirmed-sender authentication.
- Update §10.3 (Kyber key rotation) and §18 (Summary) cross-references.

**Action for the website agent:**

1. **Replace the §1 intro bullet about OOB verification** with the new TOFU bullet. Old text (remove):

   > **Out-of-band key verification (opt-in).** Users can confirm a contact's post-quantum public key via safety numbers or QR code, closing the Trust-On-First-Use (TOFU) gap against a compromised PDS operator. This mirrors Signal's safety-number model: available for users who need it, not required by default.

   New text (paste in its place):

   > **Trust-On-First-Use (TOFU) key binding.** A contact's post-quantum public key is fingerprinted and bound on the first exchange. All subsequent exchanges are checked against the bound fingerprint; a PDS operator who later substitutes the key is detected. First-contact verification via safety numbers / QR code is planned to close the residual first-exchange window — see the Future Work section.

2. **Delete the entire §8.5 "Out-of-band key verification (opt-in)" section** from the architecture page.

3. **Rewrite §8.4 "Confirmed-sender authentication"** with the new text (the old §8.4 referenced §8.5 and implied OOB was available):

   > When the recipient's client accepts a friend request or key share, it computes a fingerprint of the sender's ML-KEM-1024 public key and binds it to the local messaging-key record. All subsequent exchanges — DMs, key shares, rotation messages — are checked against the stored fingerprint. If the sender's public key later differs from the bound fingerprint, the message is rejected as a possible key substitution.
   >
   > This is **Trust-On-First-Use**: the first key seen for a contact is trusted; substitution on any subsequent exchange is detected. TOFU does not defend against a PDS operator who substitutes a key *before* the first binding — that residual window is closed by out-of-band verification, which is planned (see Future Work).
   >
   > On the sender side, a separate check validates that incoming acceptances correspond to outgoing requests the user actually sent, so an attacker cannot inject a forged "acceptance from Bob" that Alice never solicited.

4. **Renumber** the remaining §8 subsections: the section that was §8.6 becomes §8.5 ("Sender-side deletion tokens"), and §8.7 becomes §8.6 ("Push notifications"). Content is unchanged; only headings shift.

5. **In §10.3 (Kyber key rotation)**, update the trailing sentence. Old:

   > Contacts who previously performed a key exchange will need to re-exchange, and out-of-band verification (§8.5) confirms the new key.

   New:

   > Contacts who previously performed a key exchange will need to re-exchange, which triggers a new TOFU binding on their end (§8.4). Out-of-band verification of the new key is planned (see Future Work) for users who want to confirm the rotation was not a PDS-operator substitution.

6. **In §16 Future work**, the intro changes from "Three items" to "Four items" and a new first bullet is added:

   > **Out-of-band contact verification.** Safety-number / QR-code UI for users to manually confirm a contact's ML-KEM-1024 public key before Trust-On-First-Use binds (§8.4). TOFU detects key substitution on any subsequent exchange; OOB verification closes the residual first-contact window against a PDS operator who might substitute a key before the first binding. Planned for a near-term release; mirrors Signal's safety-number model when it ships.

7. **In §18 Summary**, replace the OOB bullet. Old:

   > **Confirmed-sender authentication** and **out-of-band key verification** close the first-contact MITM window against a compromised PDS.

   New:

   > **Confirmed-sender authentication via TOFU fingerprinting** detects any post-first-contact key substitution by a compromised PDS. First-contact out-of-band verification is planned (see Future Work).

**Verification:**

- Searches on the rendered page for "safety number", "QR code", "out-of-band", "opt-in" should match ONLY in the Future Work section (plus any unrelated mentions of out-of-band abuse-reporting channels in the moderation section, which are fine).
- §1 intro should list exactly three properties; bullet 2 should talk about TOFU, not OOB.
- §8 should have six subsections (§8.1–§8.6), not seven.
- §16 Future work should have four bullets.
- Internal anchors / permalinks to §8.5, §8.6, §8.7 must be updated or forwarded — the content those IDs used to point to has shifted.

**Why this matters:**

The old text claimed a security feature that does not exist in the shipping app. That's a credibility risk if a security reviewer compares the whitepaper to the published app. This change makes the public claim match the implementation.

---

## 2026-04-19 — Add §4.4 "Auto-re-login and the encryption password at rest"

**Affects:** `/security/architecture/` (or wherever the public whitepaper is rendered).

**Source change:** New subsection §4.4 added to `docs/encryption-architecture-whitepaper.md` disclosing that the encryption password is stored in device SecureStore by default under a user-facing "Keep me signed in" setting. Closes audit finding HIGH-2. Previously the whitepaper described sign-out clearing keys (true) but was silent about at-rest persistence during normal active use (misleading by omission).

**Action for the website agent:**

1. Insert a new subsection in §4 (Unlock flow), between §4.3 (Devices) and §5 (Posting). Title: **"Auto-re-login and the encryption password at rest"**.

2. Render the body from the paragraph below. The text is the same verbatim as the whitepaper — paste it literally, preserving paragraph breaks and the four-point bullet list.

---

By default, Denazen stores the encryption password alongside the Bluesky password in the device's secure storage (iOS Keychain / Android Keystore) so the app can silently re-authenticate when session tokens expire — users who open the app daily would otherwise be prompted to re-enter both passwords on every expiry. This is controlled by a user-facing setting (**"Keep me signed in"**), on by default; turning it off requires re-entering the encryption password on every launch.

A deliberate UX / threat-model tradeoff lives here:

- **What the server sees:** still nothing. The encryption password never leaves the device. The "no plaintext ever touches a server" guarantee is unaffected.
- **What an attacker with an unlocked, malware-resistant device sees:** the password is hardware-protected (Keychain / Keystore class) — the same class of protection the vault key itself enjoys. Extracting it requires a compromised OS.
- **What an attacker with a rooted / jailbroken device sees:** an opportunity. SecureStore's guarantees are weaker on a compromised OS. A user who cares about this threat should turn off "Keep me signed in."
- **What explicit sign-out does:** clears the cached password, the PDK, the Master Key, and the Vault Key from the device. App-close (without explicit sign-out) does not — the password persists so the next launch can re-derive.

The post-quantum and zero-trust claims throughout this whitepaper are about what servers hold, not about the device itself. A compromised device is explicitly out of scope (§1.3). "Keep me signed in" is the knob users can turn if their device-level threat model is stricter than the default.

---

**Verification:**

- New subsection appears between §4.3 and §5 with heading "Auto-re-login and the encryption password at rest".
- The four-bullet list is intact.
- Cross-reference to §1.3 resolves (a link or same-page anchor to the non-goals section).
- No other section needs changing — existing §4.3 prose about sign-out is already accurate.

**Optional UI polish:**

Consider a callout / aside treatment on the four-bullet list — it's the kind of content readers will quote in reviews, and the "still nothing / hardware-protected / rooted risk / explicit sign-out" structure reads cleanly as a table or cards.
