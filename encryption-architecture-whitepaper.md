# Denazen Encryption Architecture

A technical whitepaper describing the end-to-end encryption model used by Denazen, a privacy-focused Bluesky client. This document is written for a technical audience (security engineers, cryptographers, interested developers) and is intended to be the source material for a public-facing web page.

All statements below assume the following MITM mitigations are in place:

1. **Separate encryption password** — already implemented: the vault key hierarchy is derived from an encryption password that is never sent to Bluesky, Supabase, or any other server.
2. **Out-of-band key verification (optional)** — planned: safety numbers / QR code verification of a contact's ML-KEM-768 public key at first contact, closing the Trust-On-First-Use (TOFU) gap against a compromised PDS operator.
3. **Confirmed-sender inbox** — planned: inbox messages are authenticated against a sender identity proof, so a PDS operator cannot silently rewrite a friend's public key and impersonate them in future exchanges.

With those three mitigations combined, Denazen targets a **zero-trust content model**: no server, infrastructure provider, or Denazen developer can read plaintext content or key material, and no network attacker — including a compromised PDS — can substitute keys undetected.

---

## 1. Threat model

### 1.1 Assets protected

| Asset | Protection |
|-------|------------|
| Post text and images (private mode) | Confidentiality + integrity |
| Direct messages | Confidentiality + integrity |
| Circle membership (who can read a post) | Confidentiality from non-members |
| Contact graph (who DMs whom) | Obscured from the inbox server |
| Encryption keys at rest (on device and server) | Confidentiality + integrity |
| Encryption keys in transit (key exchange) | Confidentiality + post-quantum resistance |

### 1.2 Adversaries considered

| Adversary | Capability | Outcome under Denazen |
|-----------|------------|-----------------------|
| Passive network observer | TLS interception | Sees only ciphertext and TLS-protected traffic |
| Bluesky PDS operator | Full read/write on user's repo | Sees ciphertext blobs, key URIs, and metadata only; cannot derive decryption keys; cannot substitute a contact's public key without detection (with mitigation 2 above) |
| Bluesky AppView / Relay | Full social graph visibility | Sees post metadata and follow graph; sees no content and no keys |
| Supabase / server-side DB | Full DB read | Sees ciphertext payloads, DIDs, metadata only |
| Compromised server-side Edge Function | Short-term access to requests | Sees transient Bluesky session tokens for identity verification only; no long-lived secrets |
| Denazen developer with DB access | Metadata + server ciphertext | Cannot derive plaintext — same position as Supabase |
| Lost or stolen device (locked) | Physical access to SecureStore | Cannot read key material without device unlock + encryption password |
| Future quantum adversary | Shor's algorithm on classical key exchange | ML-KEM-768 (post-quantum KEM) is used for all key exchange |

### 1.3 Non-goals / explicit limits

- **No perfect forward secrecy for long-lived keys.** Circle keys and messaging keys persist until rotated; compromise of a current messaging key exposes past DMs encrypted with that key. Rotation is available but not automatic per-message.
- **No protection from a compromised device.** If an attacker has the device unlocked AND the user's encryption password, they read everything. This is the standard baseline for end-to-end systems.
- **Metadata is partially leaked.** Post counts, timing, and social graph (follows) remain visible to Bluesky. The inbox (for DMs and key shares) is designed to hide sender identity and message type from the server, but the user's follow graph on Bluesky is still public.

---

## 2. Cryptographic primitives

All crypto libraries are either **vendored locally** (source copied into `vendor/`) or **pinned to exact versions** to prevent silent algorithm drift.

| Purpose | Primitive | Library |
|---------|-----------|---------|
| Password-based key derivation | Argon2id | libsodium (via `react-native-libsodium` native / `libsodium-wrappers-sumo` WASM on web) |
| Authenticated symmetric encryption (key material, DMs, inbox) | XSalsa20-Poly1305 (`crypto_secretbox`) | libsodium |
| Bulk content encryption (`.zen` files, images) | AES-CBC-128 / AES-CBC-256 with PKCS7 | `react-native-quick-crypto` (native OpenSSL) |
| Post-quantum key exchange | ML-KEM-768 (Kyber) | `@noble/post-quantum` (pure JS, audited by Cure53, vendored) |
| Hashing | SHA-256, SHA-3 | `@noble/hashes` (vendored) |
| Secure random | CSPRNG | `expo-crypto` + `react-native-get-random-values` |

Notes:

- AES-CBC is used only for bulk content where the enclosing post-record provides integrity at the AT Protocol layer and decryption is gated by possession of the content key. All key material and all messages are authenticated via XSalsa20-Poly1305.
- ML-KEM-768 targets NIST Level 3 post-quantum security. It is used *only* for key encapsulation; derived shared secrets are used once to wrap long-lived symmetric keys and are then discarded.

---

## 3. Key hierarchy

Denazen uses a **four-tier vault hierarchy** for key-at-rest protection and a separate family of **content / exchange keys** for messaging and posts.

### 3.1 Vault hierarchy (at rest)

```
Encryption password
     │ Argon2id + per-user salt
     ▼
PDK (Password-Derived Key, 32 bytes)       ── session-only, SecureStore
     │ XSalsa20-Poly1305
     ▼
Master Key (32 bytes, random)              ── long-lived
     │ Encrypted with PDK → stored in Supabase as EMK
     │ Plaintext copy in SecureStore after unlock
     │ XSalsa20-Poly1305
     ▼
Vault Key (32 bytes, random)               ── long-lived, per account
     │ Encrypted with Master Key → stored on the PDS as EVK
     │ Plaintext copy in SecureStore after unlock
     ▼
Per-record encrypted key material:
   - Circle keys      (com.denazen.mykeys)
   - Friend keys      (com.denazen.friendkeys)
   - Messaging keys   (com.denazen.messagingkeys)
   - Kyber secret key (com.denazen.security)
```

**Why two hops (PDK → Master → Vault) instead of one?**

- The **Master Key** lives in Supabase (encrypted by the PDK); the **EVK** lives on the Bluesky PDS (encrypted by the Master Key).
- To mount an offline brute-force attack against the encryption password, an attacker needs **both** (a) the EMK from Supabase and (b) the EVK + Argon2 salt/params from the PDS. No single server, and no single breached operator, holds enough material to run the attack.
- Password changes rewrap the Master Key with a new PDK but leave the Vault Key (and therefore all per-record encryption) untouched — no re-encryption storm.

### 3.2 Content and exchange keys

| Key | Lifetime | Purpose | Wrapped by |
|-----|----------|---------|------------|
| Shared secret (ML-KEM-768) | Ephemeral | Wrap the messaging key during key exchange only | n/a — derived once by encapsulate/decapsulate |
| Messaging key (AES-256) | Per contact, long-lived | Encrypt DMs, circle-key shares, friend-key payloads | Shared secret (during exchange); vault key (at rest) |
| Circle key (AES-128 / 256) | Per circle, long-lived | Wrap per-post content keys | Messaging key (when shared); vault key (at rest) |
| Content key (AES-128) | One per post | Encrypt the `.zen` file attachments of a single post | Circle key |

Rules enforced throughout the codebase:

- Shared secrets are never used to encrypt content — only to wrap the messaging key.
- Circle keys are never sent unwrapped; they are always delivered inside a messaging-key-encrypted payload.
- The Vault Key never leaves the device in plaintext; only the PDK-wrapped form (EMK) reaches Supabase.

---

## 4. Unlock flow

```
User submits Bluesky password → BskyAgent login (ATProto session).
   ▼
User submits encryption password.
   ▼
Derive PDK = Argon2id(encryption_password, salt).
   ▼
Fetch EMK from Supabase (profiles.encrypted_master_key).
   ▼
Master Key = decrypt(EMK, PDK, XSalsa20-Poly1305).
   MAC failure → "wrong encryption password" (not "no account").
   ▼
Fetch EVK from PDS (com.denazen.security).
   ▼
Vault Key = decrypt(EVK, Master Key).
   ▼
Store {PDK, Master, Vault} in SecureStore for session.
```

**First-time setup** is fail-closed in three phases:

1. Generate Master Key, Vault Key, EMK, EVK in memory — no I/O yet.
2. Single Supabase RPC (`upsert_profile`) creates the profile row and stores the EMK atomically. On failure: nothing has been written to the PDS, so retry regenerates cleanly.
3. PDS write: store EVK + Argon2 params under `com.denazen.security/self`. On failure: the only orphan is the EMK in Supabase, which a clean retry replaces.

At no step is a plaintext key transmitted anywhere.

---

## 5. Posting: two-tier content encryption

Every encrypted post uses **two tiers** of keys so that compromising one post never exposes others.

```
           ┌──────────────────────────────┐
           │   Circle key (AES-256)       │  ── shared with circle members
           └──────────────┬───────────────┘
                          │ wraps
                          ▼
           ┌──────────────────────────────┐
           │ Content key (AES-128, random)│  ── one per post
           └──────────────┬───────────────┘
                          │ encrypts
                          ▼
  ┌──────────────┬────────────┬───────────────┐
  │ _text.zen    │ image_0.zen│ image_N.zen   │
  └──────────────┴────────────┴───────────────┘
```

### 5.1 Compose

1. User writes text and/or selects images.
2. App generates a fresh **content key** (16 random bytes, AES-128).
3. In parallel (`Promise.all`):
   - Encrypt post text with the content key → `_text.zen`.
   - For each image: resize to ≤1440 px longest side, re-encode JPEG q=0.9, iteratively lower quality if over 40 MB, then encrypt with the content key → `image_<i>.zen`.
4. Encrypt the content key itself with the selected **circle key** to produce the **content-key record** payload.

### 5.2 Publish

The post submit handler enforces the **privacy invariant** (detailed in §9) with submit-time checks:

1. Write content-key record to the author's PDS at `com.denazen.contentkeys/<rkey>`. Payload includes the encrypted content key and a reference to the circle key used. If this write fails, the post is **blocked** — never downgraded to plaintext.
2. Upload all `.zen` blobs to the PDS. These are opaque binary blobs to Bluesky; the AppView indexes them only as file attachments.
3. Publish the `app.bsky.feed.post` record with:
   - `text`: empty (the real text lives in `_text.zen`).
   - `com.denazen.app: true` — Denazen marker.
   - `com.denazen.mykey`: AT URI of the circle key used.
   - `com.denazen.contentkey`: AT URI of the content-key record.
   - Document embeds for the `.zen` files.
4. Patch the content-key record with the final post URI (bidirectional linkage, for deletion cleanup).

### 5.3 `.zen` file format

```json
{
  "version": 1,
  "type": "encrypted-image" | "encrypted-text",
  "format": "jpg" | "txt",
  "iv": "<hex>",
  "data": "<base64 ciphertext>",
  "encryptedAt": "<iso>"
}
```

Ciphertext is AES-CBC with PKCS7. The IV is fresh random per file.

### 5.4 Private post index

For feed generation, Supabase keeps a **metadata-only index** (`private_post_index`): `{post_uri, key_uri, author_did, indexed_at}`. A DB trigger enforces that `key_uri` starts with `at://<author_did>/` to prevent feed poisoning. Row-level rate limiting caps authors at 50 indexed posts per hour. This index lets a circle member quickly enumerate posts encrypted for them without walking every contact's repo.

---

## 6. Replies and quotes

**Replies** reuse the parent post's content key:

- If the parent is encrypted, the reply's `_text.zen` is encrypted with the **same content key** the parent used, and the reply's post record points its `com.denazen.contentkey` at the parent's content-key record.
- This preserves access control: anyone with the parent's circle key automatically reads all replies without separate key exchange.
- When a reply is deleted, the content-key record is **not** deleted (the parent still uses it).

**Encrypted quotes** embed the quote reference *inside* the encrypted text:

```
User's message text
---QUOTE---
{"uri":"at://did:plc:xxx/app.bsky.feed.post/yyy","cid":"bafyrei..."}
```

No `app.bsky.embed.record` is attached to the public post record, so observers cannot see what is being quoted. After decryption, the client splits on `---QUOTE---` and fetches the referenced post via `getPostThread()`.

---

## 7. Reading: decryption pipeline

```
Post with .zen files loads in feed
   ▼
Parse com.denazen.mykey (circle key URI)
       com.denazen.contentkey (content-key record URI)
   ▼
Check decryption cache {postUri, documentIndex} ── HIT → display
   ▼
┌─── Step 1: resolve circle key (on device only) ───┐
│  - Own post: keyService.getKeyByUri()             │
│  - Friend's post: friendKeysService               │
│                    .findKeyByOriginalUri()        │
└───────────────────────────────────────────────────┘
   ▼
┌─── Step 2: fetch & decrypt content key ───────────┐
│  - Fetch content-key record (cached)              │
│  - AES-decrypt with circle key                    │
│  - Result: AES-128 content key                    │
│  - On failure: return null (NEVER fall back       │
│    to circle key as content key)                  │
└───────────────────────────────────────────────────┘
   ▼
┌─── Step 3: fetch & decrypt .zen files ────────────┐
│  Streaming mode: download + decrypt concurrently  │
│  Traditional mode: download → parse → decrypt     │
│  With yield points to keep the UI thread alive    │
└───────────────────────────────────────────────────┘
   ▼
Cache data URI → render → clean up temp files
```

Key properties:

- **Plaintext never persists.** Data URIs live in component memory only; nothing is written to AsyncStorage, SQLite, or the filesystem outside ephemeral temp files that are deleted immediately after decryption.
- **Content keys are cached** for the duration of a feed session to avoid refetching on every image of a multi-image post, but the cache holds ciphertext-derived material only and is cleared on logout.
- **Strict two-tier discipline.** If the content-key record exists but fetch/decrypt fails, decryption fails. The code never "falls back" to decrypting the `.zen` file with the circle key directly — that would produce garbage and mask real errors.

---

## 8. Key exchange and the encrypted inbox

### 8.1 ML-KEM-768 exchange pattern

Every first contact (friend request) and every subsequent circle-key share follows the canonical pattern:

```
Sender                                Recipient
------                                ---------
Fetch recipient Kyber pubkey
  (com.denazen.security on PDS)
ml_kem768.encapsulate(pk)
  → (cipherText, sharedSecret)
Encrypt messaging_key with shared_secret
Optionally encrypt circle_key with shared_secret
Deliver {cipherText, encrypted payload}
                                      ml_kem768.decapsulate(cipherText, sk)
                                        → sharedSecret
                                      Decrypt messaging_key and circle_key
                                      Validate messaging_key (64 hex chars)
                                      Store keys under the vault
```

The shared secret is **used once and discarded.** All future communication with that contact uses the now-established messaging key.

### 8.2 The encrypted inbox (server design)

Friend requests and key shares flow through a **metadata-minimal inbox** on Supabase rather than through Bluesky DMs or the sender's public PDS. The server design is deliberately structured so that a full Supabase breach reveals essentially nothing about the social graph:

Table `inbox_messages`:

| Column | Seen by server | Content |
|--------|----------------|---------|
| `message_id` | Yes | Random UUID |
| `owner_id` | Yes | Recipient's profile ID |
| `read` | Yes | Boolean |
| `priority` | Yes | Client-set integer (routing hint) |
| `encrypted_payload` | **Opaque** | `{ cipherText, encryptedData }` — ML-KEM ciphertext + XSalsa20-Poly1305 AEAD blob |
| `encryption_info` | Yes | Algorithm tag, e.g. `{ "v": 1, "method": "ml-kem-768+xsalsa20" }` |
| `sender_token_hash` | Yes | SHA-256 of a sender-only random token |
| `created_at`, `expires_at` | Yes | Timestamps; expiry capped at 31 days |

The server **does not know**:

- Who sent the message. There is no sender column — only a hash of a random sender token.
- What type of message it is. The `type` discriminator (`friend_request`, `key_share`, `friend_request_accepted`, `key_share_accepted`) is **inside** the encrypted payload.
- What the content is. It is encrypted under a shared secret derived from the recipient's Kyber key.
- Whether two inbox rows are related. There is no thread/conversation identifier on the server.

The server **does know**:

- Which user owns each inbox (required for delivery and RLS).
- Timing and message counts.
- That the sender possessed a valid Bluesky session when writing — see §8.3.

### 8.3 Write gateway (`api` Edge Function)

All inbox writes go through a single Edge Function that performs **PDS session verification**:

1. Client sends request with `Authorization: Bearer <bluesky-accessJwt>` and `X-PDS-URL`.
2. Edge Function calls `com.atproto.server.getSession` on the user's PDS to validate the JWT.
3. The DID returned by the PDS — not a client claim — is used for all subsequent operations.
4. Writes are rate-limited by this verified DID (30 sends/hour; 100-message mailbox cap per recipient).

This eliminates the old "anon key + client-supplied user ID" trust model. A malicious client cannot impersonate another user in the inbox.

### 8.4 Sender deletion tokens

When sending, the client:

1. Generates 32 random bytes (raw token).
2. Sends `SHA-256(raw_token)` as `sender_token_hash`.
3. Stores `{message_id, raw_token}` locally for 30 days.

To delete a sent message (e.g. after rejection), the client presents the raw token; the server re-hashes and deletes only if the hashes match. The server learns nothing about the sender from the hash and cannot forge deletions.

### 8.5 Confirmed-sender inbox (planned)

The MITM mitigations assumed at the top of this document include a **confirmed-sender** extension: before a recipient accepts a friend request or key share, the client verifies that the inbox payload's claimed sender identity corresponds to a public-key binding the recipient has seen before (TOFU) or has out-of-band verified. Combined with §8.6, this prevents a compromised PDS from silently substituting a contact's key and impersonating them in future inbox messages.

### 8.6 Out-of-band key verification (planned)

Safety numbers / QR-code verification of a contact's ML-KEM-768 public key at first contact. Denazen already stores a **TOFU pubkey-hash fingerprint** on the messaging-key record (`contactPubkeyHash`) so repeat contacts detect key substitution; OOB verification is the first-contact equivalent.

---

## 9. The privacy invariant

Denazen operates under a single, non-negotiable invariant:

> **A user who intends to create a private post MUST NEVER produce a public one — under any circumstance.**

This is implemented as a fail-closed discriminated union enforced at submit time:

```ts
type ComposeState =
  | { mode: 'public' /* ... */ }
  | { mode: 'private', keyId: string, encryptionReady: true, /* ... */ }
```

The submit handler:

1. **Snapshots** all encryption parameters into immutable local constants before any async work.
2. Validates the snapshot: if mode is `'private'` and any of `{keyId, encryption key hex, content key}` is missing, **throws and blocks** submission.
3. Passes the snapshot — never live React state — into the background upload pipeline.

`blueskyService.createPost()` independently validates: if any encryption parameter is present, **all** must be, else it throws. There is no code path that "recovers" by sending a plaintext post, no null-coalescing to public, no retry that silently downgrades privacy.

The same fail-closed discipline extends to:

- Circle-key shares (never sent unwrapped).
- Messaging keys in friend requests (must be encrypted under the Kyber-derived shared secret).
- Rotation events (rotated keys are re-sent only to retained members, wrapped under their messaging keys).
- Circle member list integrity (the `sharedWith` list is updated **before** a key is transmitted; if that write fails, the key is not sent).

---

## 10. Rotation

### 10.1 Messaging-key rotation

A user may rotate the messaging key they share with any contact:

1. Generate a new AES-256 messaging key.
2. Send it to the contact via the inbox, encrypted with the **current** messaging key.
3. Store the new key as "pending" on the sender side; wait for a `KeyUriConfirmation` message indicating the recipient has stored it.
4. On confirmation, promote the new key to default and deactivate the old one.

Rotation is rate-limited with a 10-minute cooldown per contact. Old keys remain available for decrypting past messages but are never used to encrypt new ones.

### 10.2 Circle-key rotation

When a user removes a member from a circle, they **rotate the circle key**:

1. Generate a new circle key.
2. Update the `sharedWith` list (removing the unshared member) **before** any key distribution.
3. Re-share the new circle key with each retained member via inbox (wrapped under that member's messaging key).
4. Send a `friendKeyRotateOut` notice to removed members, who delete the old key on receipt.
5. Future posts use the new key; prior posts remain readable by whoever had the old key at the time they were posted.

This is intentionally **not forward-secret for prior posts** — historical content stays decryptable by the members who legitimately had access when it was written.

### 10.3 Kyber key rotation

Users can rotate their ML-KEM-768 key pair from Settings. The new public key is written to `com.denazen.security`; the old security record is automatically backed up under a timestamped rkey. Contacts who previously performed a key exchange will need to re-exchange (or the future TOFU-verification step §8.5 will detect the mismatch).

---

## 11. Storage boundaries

| Store | What's stored | What's NEVER stored |
|-------|---------------|---------------------|
| Bluesky PDS | Ciphertext `.zen` blobs, encrypted key records (`com.denazen.*`), EVK, Kyber public key | Plaintext content, plaintext keys, encryption password |
| Bluesky AppView / Relay | Post metadata, follow graph | Content, keys |
| Supabase `public` schema | Profile rows (DID + EMK), post-index metadata, inbox rows (opaque ciphertext), invites | Plaintext content, plaintext keys, passwords, vault keys |
| Supabase `internal` schema | Telemetry events, feedback submissions | PII, content (telemetry filter drops DIDs, URIs, handles, raw errors) |
| Edge Functions (in transit) | Bluesky accessJwt (transient, for PDS verification) | Long-lived secrets, content, keys |
| Device SecureStore | PDK, Master Key, Vault Key, per-account sessions | — (this is the trust root) |
| AsyncStorage | Encrypted key cache files (ciphertext only), preferences, processed-notification IDs | Plaintext keys, plaintext content |

The two Supabase schemas are layered so `internal` is **not** exposed via PostgREST and is unreachable from any client with the anon key.

---

## 12. Telemetry and privacy

Telemetry is anonymous by construction:

- No `identify()` or `alias()` calls to PostHog; `personProfiles: 'never'`.
- Property names that could carry user-identifiable data are listed in a `PII_PROPERTIES` allowlist; a `before_send` hook drops them as a last line of defense.
- Error strings are mapped to a bounded vocabulary (`network_timeout`, `auth_rejected`, etc.) at the call site — raw `Error.message` or API response bodies are never captured.
- Session replay is off. Screen-name and touch autocapture are off. GeoIP is disabled.

---

## 13. Verification story

The claim "no server can decrypt" rests on the following testable facts, each verifiable from the codebase:

1. **No plaintext key ever crosses a network boundary.** The Vault Key is generated on device; leaves only as the EVK (wrapped under the Master Key) to the PDS and never reaches Supabase. The Master Key leaves only as the EMK (wrapped under the PDK) to Supabase.
2. **No plaintext content ever crosses a network boundary.** Posts are encrypted in `ComposeScreen` before any upload; `.zen` blobs are opaque to Bluesky; DMs and inbox messages are sealed under the recipient's Kyber key.
3. **Edge Functions see no secrets.** The `api` Edge Function handles session tokens only long enough to call `getSession` on the user's PDS, and it has no access to vault, messaging, or circle keys.
4. **Fail-closed discipline.** The privacy invariant (§9) makes it structurally impossible for a private-intended post to become public without an explicit code change.
5. **Vendored crypto libraries.** All cryptographic primitives are either pinned or copied into `vendor/`; library updates require a deliberate PR.
6. **Independent key-at-rest layer.** The vault hierarchy (§3) means compromising any single server (Bluesky **or** Supabase) does not yield an offline brute-force target — an attacker needs material from both.

---

## 14. Summary

- **Four-tier vault** (password → PDK → Master Key → Vault Key) splits key-at-rest material across two servers so no single breach enables offline attack.
- **Two-tier content encryption** (circle key → content key → `.zen` files) isolates the blast radius of any single compromised post to itself.
- **Post-quantum key exchange** (ML-KEM-768) protects all first-contact handshakes against future quantum adversaries.
- **Metadata-minimal inbox** (`inbox_messages`) hides sender identity, message type, and relationships from the server that stores it.
- **PDS session verification** at the single write gateway ensures callers are who they claim to be before any server-side mutation.
- **Fail-closed privacy invariant** prevents silent downgrade from private to public at every layer.
- **No plaintext ever touches a server.** The only trust root is the user's device plus a password that no Denazen server has ever seen.

With the separate encryption password (already shipped), out-of-band key verification (planned), and confirmed-sender inbox (planned) in place, Denazen achieves a **zero-trust content model**: even a fully compromised Bluesky PDS and a fully compromised Supabase cannot, individually or together, read a single word of a user's private content.
