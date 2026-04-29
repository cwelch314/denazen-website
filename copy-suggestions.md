# Home page copy — pillar alignment proposal

The hero now promises three things:

1. **Connection** like early Facebook
2. **Privacy** inspired by Signal
3. **Freedom** of Bluesky

Below the fold each section should own exactly one pillar so the page reads as
a clean three-act argument instead of three sections that each gesture at all
three ideas. The current copy mixes pillars (e.g. the "Connection" section
talks about ads/tracking and algorithms; the "Privacy" closer says "real
connection requires trust"; the "Freedom" list mentions tracking and ads).

Below the fold, current order is **Privacy → Connection → Freedom → Values.**
Section order is unchanged in this proposal — only copy changes.

---

## 1. Privacy section — "Privacy inspired by Signal"

Stay strictly on cryptography and who can/can't see your stuff. No language
about connection, trust as a feeling, algorithms, or ads.

**Heading:** Private means private.

**Paragraphs:**
- Posts you share with a circle are end-to-end encrypted before they leave
  your device. Only the people in that circle can read them.
- Not advertisers. Not AI. Not governments. *No one else.* Not even us — the
  keys live on your devices, and we have no way to decrypt your content.

**Closer:** Cryptography, not policy. The math is the promise.

*(Image stays: Private Network screen.)*

---

## 2. Connection section ("What Penrose Is") — "Connection like early Facebook"

Strip the privacy and freedom asides. Stay on the feeling of social media when
it was about the people in your life, and how the product brings that back.

**Heading:** Remember when social was social?

**Paragraphs:**
- Social media started as a way to keep up with the people in your life — the
  people you'd actually call. Your sister. Your roommate from college. Your
  closest friends.
- Somewhere along the way, the feed stopped being them. It became strangers,
  performers, and ads — whatever an algorithm decided would keep you scrolling.

**Resolution:** Penrose puts the people back at the center.

**List:**
- Build circles for the people who matter — close friends, family, your book club
- A chronological feed of the people you actually chose to follow
- Share moments meant for a few, not posts engineered for reach
- Less performance. More presence.

*(Image stays: private feed with a couple's trip post shared to Family circle.)*

---

## 3. Freedom section — "Freedom of Bluesky"

Stay on portability, openness, and the AT Protocol network. Drop the
"behavioral tracking" and "no ads" bullets — those belong to Privacy and
Values respectively.

**Heading:** Your account, your network, your rules.

**Intro:** Penrose is built on the AT Protocol — the open social network
behind Bluesky and 40+ million people. Your identity, your followers, and
your posts don't belong to a platform. They belong to you.

**List:**
- Bring your existing Bluesky handle, or start fresh in the app
- Take your followers, posts, and identity to any AT Protocol app
- Choose your own algorithms — or skip them entirely
- An open network you can leave at any time, with everything intact

**Closing:**
- You choose what matters. You choose how to experience it.
- If we ever stop being the right home for you, your network comes with you.

**Bsky note (unchanged):** Current Bluesky users can log in with their
existing account, or you can create one in the app.

*(Image stays: circles management screen.)*

---

## 4. Values section — unchanged

This section is the "why we're built this way" close — PBC structure,
reciprocity, free with premium. It's a fourth theme (mission), not a fourth
take on the three pillars, so it doesn't need a pillar-alignment rewrite.

---

## Notes on what got moved or cut

- "Because real connection requires trust" — removed from Privacy. It was
  the bridge that pulled connection language into the privacy section.
- "Penrose brings back real connection **and adds in privacy and user
  control**" — trimmed. The new resolution stays on connection.
- "Share privately with trusted circles" bullet — removed from Connection.
  Privacy is its own section; the connection section can talk about circles
  without invoking encryption.
- "No engagement traps or behavioral tracking" / "And no ads" — removed
  from Freedom. Tracking is a Privacy concern; ads belong in Values (the
  business-model story) and the hero's `waitlistNote`.
- "No algorithm forcing content on you" — folded into the new Connection
  section as "chronological feed" and into Freedom as "choose your own
  algorithms." Connection cares that strangers aren't shoved at you;
  Freedom cares that you can pick the ranking.

## Spanish

Once you sign off on the English, I'll mirror every change in `index.es.ts`
in the same commit per `CLAUDE.md`.
