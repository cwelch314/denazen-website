# Denazen — Comprehensive Overview

## 1. Core Concept

Denazen is a privacy-focused social media app built on top of the Bluesky / AT Protocol ecosystem. It introduces a dual-layer experience:

- **Public Layer**: Standard Bluesky content (open, discoverable)
- **Private Layer**: End-to-end encrypted (E2EE) content shared only with selected people

### Core Idea
> *Public when you want. Private when it matters.*

Denazen enables users to participate in public social media while maintaining truly private spaces with trusted groups.

---

## 2. Value Proposition

### Primary Value
Denazen solves a major problem in modern social media:

> People want to share — but not with everyone.

### Key Benefits

- **True privacy**: End-to-end encryption ensures only intended recipients can see content
- **Control over audience**: Users define exactly who sees what
- **No platform access**: Even Denazen cannot read private content
- **Contextual sharing**: Users can respond to public content privately
- **Reduced social pressure**: No need to perform for a broad audience

---

## 3. Product Differentiation

### Compared to Traditional Social Media

| Feature | Traditional Apps | Denazen |
|--------|----------------|--------|
| Audience control | Broad / fuzzy | Precise (circles) |
| Privacy | Platform-readable | End-to-end encrypted |
| Content sharing | One-to-many | Contextual + segmented |
| Trust model | Platform trust | Cryptographic trust |

### Compared to Messaging Apps (e.g., Signal)

| Feature | Messaging Apps | Denazen |
|--------|---------------|--------|
| Public content | ❌ | ✅ |
| Private groups | ✅ | ✅ |
| Social discovery | ❌ | ✅ |
| Identity layer | Phone-based | AT Protocol |

### Unique Position

Denazen sits between:
- Instagram / Twitter (public broadcasting)
- Signal / WhatsApp (private messaging)

> **Denazen = Public social + Private networks in one system**

---

## 4. Key Features

### 4.1 Dual Feed System

- **Public Feed**
  - Standard Bluesky content
  - Discovery and engagement

- **Private Feed**
  - Fully encrypted posts
  - Visible only to selected circles

---

### 4.2 Circles (Core Feature)

- Users create **multiple private circles**
- Each circle has its own audience
- Circles are:
  - One-directional (not mutual “friends”)
  - Fully controlled by the creator
  - Revocable (via key rotation)

#### Mental Model
- Not “friends”
- Not “followers”
- Instead: **“Who I choose to share this with”**

---

### 4.3 End-to-End Encryption (E2EE)

#### Key Characteristics

- Encryption happens **on device**
- Content is never readable by:
  - Denazen
  - Bluesky servers
- Uses:
  - AES-256 for content encryption
  - Public/private key cryptography for key sharing
  - Argon2id for password-derived keys

#### Architecture Summary

- Each post has a **content key**
- Each circle has a **friend key**
- Content key is encrypted with friend key
- Friend key is encrypted with each recipient’s public key

---

### 4.4 Private Interactions on Public Content

- Users can:
  - Share a public post privately
  - Discuss it in a circle
- Enables:
  - Commentary without broadcasting opinions
  - Safer social interaction

---

## 5. Messaging & Positioning

### Core Messaging Themes

#### 1. Privacy Without Compromise
- “End-to-end encrypted”
- “Not even we can see your posts”

#### 2. Control Over Sharing
- “Not everything is for everyone”
- “Choose exactly who sees what”

#### 3. Dual Social Experience
- “Public when you want. Private when it matters.”
- “Your private network nested in public social media”

---

### Onboarding Messaging (Refined)

**Screen 1**
> Public when you want.  
> Private when it matters.

**Screen 2**
> No one else can see this.  
> Not even us.  
>  
> End-to-end encrypted

**Screen 3**
> Not everything is for everyone.  
>  
> Put people into private circles.  
> Each one has its own space.

---

### Tone & Style

- Minimalistic
- Trust-building
- Not overly technical
- Avoids jargon like “keys”
- Focus on **human benefit**, not crypto details

---

## 6. Target Users

### Primary Audience

- People who:
  - Want to share more honestly
  - Don’t trust big tech platforms
  - Feel constrained by public posting
  - Maintain multiple social contexts

### Secondary Audience

- Privacy-conscious users
- Early adopters (Bluesky users)
- Creators who want layered audiences

---

## 7. Key Insights Driving Product

### 1. Most users don’t want full public exposure
People self-censor due to:
- Social pressure
- Professional risk
- Audience mismatch

### 2. Messaging apps are too fragmented
- Private sharing exists, but disconnected from social content

### 3. Trust must be provable
- “We respect your privacy” is not enough
- Must be enforced cryptographically

---

## 8. Growth Strategy (Planned)

### Alpha Phase

- 30–50 users
- Invite-based
- Each user gets limited invites

### Beta Phase

- Expand via controlled invites
- Possibly:
  - 3–15 invites per user
  - Multi-use codes

### Key Growth Mechanics

- Network-driven adoption
- Private circles create lock-in
- Invite scarcity increases desirability

---

## 9. Monetization Strategy

### Freemium Model

**Free Tier**
- Limited number of circles (e.g., 1)
- Basic functionality

**Premium Tier**
- More circles
- Larger circle sizes
- Advanced features

---

## 10. UX Principles

### Simplicity Over Complexity
- Hide crypto details
- Use intuitive language

### Emotional Resonance
- Focus on:
  - Trust
  - Safety
  - Authentic sharing

### Minimal UI

- Clean onboarding
- Avoid clutter
- Strong visual identity (fox + lock icon concept)

---

## 11. Branding Direction

### Core Identity

- Privacy-first
- Calm, controlled, intentional sharing
- Not loud or performative

### Tagline Options

- “Public when you want. Private when it matters.”
- “Public social media. Private circles.”
- “Your private network in public social media”

---

## 12. Risks & Challenges

### User Understanding
- Must clearly explain:
  - Why this matters
  - How it’s different

### Adoption Barrier
- Most users don’t have Bluesky accounts

### Performance
- Client-side decryption at scale

### Trust vs Complexity
- Must prove privacy without overwhelming users

---

## 13. Long-Term Vision

Denazen aims to redefine social media by:

- Making **privacy the default option**
- Allowing users to:
  - Share freely
  - Without broadcasting to everyone
- Bridging:
  - Public discourse
  - Private conversation

> The goal is not just a safer social network —  
> but a more *natural* one.

---

## Summary (One Sentence)

**Denazen is a social platform where users can participate publicly, but share privately with full control and true end-to-end encryption.**
