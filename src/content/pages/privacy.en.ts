export default {
  meta: {
    title: 'Rhize',
    description:
      "Rhize's privacy policy: what we collect, what we don't, and how end-to-end encryption limits what we could even see.",
  },
  heading: 'Privacy Policy',
  lastUpdatedLabel: 'Last updated: ',
  lastUpdatedDate: '2026-05-15',
  lastUpdatedText: 'May 15, 2026',
  sections: [
    {
      heading: 'About this policy',
      paragraphs: [
        "Rhize is a privacy-first social app that lets people communicate more authentically through a public social layer and a private, end-to-end encrypted layer. Rhize is built as a client for the Bluesky / AT Protocol network. That means some activity in Rhize happens on public or third-party social infrastructure that Rhize does not own or control.",
        "This Privacy Policy explains what information Rhize collects, what we do not collect, how encryption works, how public Bluesky / AT Protocol content is handled, and what choices you have.",
        "Rhize is operated by Denazen, Inc. You can contact us at privacy@denazen.com.",
      ],
    },
    {
      heading: '1. Our privacy commitments',
      paragraphs: [
        "Rhize is designed around a simple principle: your private social life should not become our business model.",
      ],
      list: [
        { body: 'We do not sell your personal information.' },
        { body: 'We do not use your private content for advertising.' },
        { body: 'We cannot read your end-to-end encrypted private posts or messages.' },
        { body: 'We do not build advertising profiles from your activity.' },
        { body: 'We collect only the information we reasonably need to operate, secure, improve, and support the app.' },
      ],
    },
    {
      heading: '2. Rhize and Bluesky / AT Protocol',
      paragraphs: [
        "Rhize is a client for Bluesky and the AT Protocol. When you use Rhize to view, create, like, reply to, repost, follow, or otherwise interact with public Bluesky / AT Protocol content, that activity may be processed, stored, moderated, displayed, indexed, or otherwise handled by Bluesky, AT Protocol services, your personal data server, AppView services, relays, and other third-party infrastructure.",
        "Rhize does not control Bluesky's public-content policies, moderation rules, server logs, data-retention practices, account rules, or network-level visibility.",
        "Public posts and public interactions should be treated as public. Even if you use Rhize to create or view them, public Bluesky / AT Protocol activity may be visible outside Rhize.",
      ],
    },
    {
      heading: '3. End-to-end encrypted private content',
      paragraphs: [
        "Rhize includes private features that are designed to use end-to-end encryption. This means that the content of your private Rhize posts, private messages, and other encrypted private communications is encrypted on your device before it is stored or transmitted.",
        "Rhize does not have the keys needed to read your encrypted private content. Your encryption password is processed only on your device and is never transmitted to Rhize servers in any form that lets us reconstruct it. The master key that decrypts your private content is stored on our servers only in a form that is itself encrypted by a key derived from your password — without your password, we cannot decrypt it.",
        "Because of this:",
      ],
      list: [
        { body: 'Rhize cannot read your encrypted private posts or messages.' },
        {
          body: 'Rhize cannot recover encrypted private content if you lose access to the keys or credentials needed to decrypt it. Account reset is destructive — it generates new keys, and content encrypted under the prior keys becomes permanently unreadable.',
        },
        {
          body: 'Rhize cannot provide plaintext copies of encrypted private content in response to support requests, law-enforcement requests, or any other request.',
        },
        {
          body: 'Rhize cannot review the plaintext of encrypted private content for moderation purposes. For private content we can act only on user-submitted reports, screenshots voluntarily provided by users, account-level abuse signals, and non-content metadata.',
        },
      ],
      trailingParagraphs: [
        "Some metadata related to encrypted content is visible to Rhize, to Bluesky / AT Protocol infrastructure, or to other network participants. This includes: the existence of a post or message, the timestamp it was created, the account identifiers (DID and handle) involved, the relationships between accounts (follows, friend connections), the record type, and the ciphertext and any associated encrypted blob references. Other clients on the AT Protocol network may observe the same public metadata.",
        "End-to-end encryption protects the content of private communications. It does not make all metadata invisible.",
      ],
    },
    {
      heading: '4a. Information we collect — Account and profile information',
      paragraphs: [
        "Rhize is designed to collect as little information as practical. We may process information associated with your Bluesky / AT Protocol account, such as:",
      ],
      list: [
        { body: 'Your handle.' },
        { body: 'Your decentralized identifier (DID).' },
        { body: 'Your display name.' },
        { body: 'Your profile image.' },
        { body: 'Your public profile description.' },
        { body: 'Your public follows, followers, posts, replies, likes, reposts, and other public AT Protocol activity.' },
        { body: 'Authentication tokens or session information needed to connect your account to Rhize.' },
      ],
      trailingParagraphs: [
        "Some of this information is public or available through Bluesky / AT Protocol infrastructure. We use it to provide the app experience.",
      ],
    },
    {
      heading: '4b. Information we collect — Private-network information',
      paragraphs: [
        "To provide Rhize's private features, we process limited information such as:",
      ],
      list: [
        { body: 'Your Rhize private-network relationships.' },
        { body: 'Circle membership or sharing relationships.' },
        {
          body: 'Encrypted key material (stored on your AT Protocol personal data server, encrypted with a key derived from your password).',
        },
        { body: 'Encrypted content keys (stored on your AT Protocol personal data server, encrypted).' },
        { body: 'Encrypted private records (stored on your AT Protocol personal data server, encrypted).' },
        {
          body: "Encrypted private messages (relayed through Rhize's encrypted-inbox infrastructure as ciphertext only).",
        },
        { body: 'Non-content metadata needed to sync, route, display, secure, or manage private features.' },
      ],
      trailingParagraphs: [
        "Rhize does not have the keys necessary to read any of this encrypted material and does not use it to read encrypted private content.",
      ],
    },
    {
      heading: '4c. Information we collect — Technical and diagnostic information',
      paragraphs: ["We collect limited technical information to operate and improve Rhize, such as:"],
      list: [
        { body: 'App version.' },
        { body: 'Device type.' },
        { body: 'Operating system version.' },
        {
          body: 'Unhandled JavaScript exception reports (stack traces and error messages, with handles, DIDs, and URIs scrubbed before transmission).',
        },
        { body: 'Performance and timing diagnostics (for example, login duration, feed-load duration).' },
        {
          body: 'Feature-error events (for example, a private post failing to encrypt, with a bounded error code — not the content).',
        },
        { body: 'Approximate timestamps.' },
        { body: 'Server request metadata needed to operate the service.' },
      ],
      trailingParagraphs: [
        "We use this information to fix bugs, prevent abuse, improve reliability, and understand whether the app is working.",
      ],
    },
    {
      heading: '4d. Information we collect — Minimal analytics',
      paragraphs: [
        "Rhize collects limited, anonymous analytics about app usage. We use PostHog as our analytics provider, configured so that:",
      ],
      list: [
        { body: 'User profiles are never created (no identify, no alias, anonymous person profiles disabled).' },
        { body: 'IP geolocation is disabled.' },
        { body: 'Session replay is disabled.' },
        { body: 'Automatic screen-view and touch capture are disabled.' },
        {
          body: 'A filter scrubs handles, DIDs, AT Protocol URIs, and email addresses from every event property and exception message before transmission.',
        },
      ],
      trailingParagraphs: [
        'The events we send include things like: whether onboarding was completed, whether an invite code was redeemed, whether account creation or login succeeded or failed, whether certain features are used, anonymous aggregate counts of app actions, and unhandled-exception trends.',
        "We do not use analytics to read private content. We do not use analytics to create advertising profiles. We do not sell analytics data. We do not link analytics events to your Bluesky handle, DID, or any other personal identifier.",
      ],
    },
    {
      heading: '4e. Information we collect — Feedback and support information',
      paragraphs: [
        "If you contact us, submit feedback, report a problem, or participate in testing, we may collect information you choose to provide, such as:",
      ],
      list: [
        { body: 'Your email address.' },
        { body: 'Your name or handle.' },
        { body: 'Your message to us.' },
        { body: 'Screenshots or logs you choose to send.' },
        { body: 'Information needed to investigate your request.' },
        { body: 'App version and device information related to the issue.' },
      ],
      trailingParagraphs: ["Please do not send us sensitive personal information unless it is necessary for your request."],
    },
    {
      heading: '4f. Information we collect — Payment or subscription information',
      paragraphs: [
        "If Rhize offers paid features, subscriptions, or in-app purchases, payments may be processed by Apple, Google, or another payment provider. Rhize does not receive your full payment card number from Apple or Google.",
        "We may receive limited purchase-related information, such as subscription status, product purchased, renewal status, transaction identifiers, and entitlement information needed to provide paid features.",
      ],
    },
    {
      heading: '5. Information we do not collect',
      paragraphs: ["Rhize does not collect:"],
      list: [
        { body: 'The plaintext content of your end-to-end encrypted private posts or messages.' },
        { body: 'Your private encryption password or recovery secret in any form that Rhize can decrypt.' },
        { body: 'Precise GPS location (Rhize does not request location permission and does not include a location SDK).' },
        { body: 'Your contacts (Rhize does not request contacts permission and does not include a contacts SDK).' },
        {
          body: 'Microphone, video, or arbitrary-file access (Rhize includes only an image picker, used on-demand when you choose to attach an image to a post or feedback message).',
        },
        {
          body: 'Advertising identifiers for cross-app tracking (Rhize does not request the iOS App Tracking Transparency prompt and does not include any advertising or attribution SDK).',
        },
        { body: 'Sensitive personal information for advertising.' },
        {
          body: "Biometric information (Rhize does not use Face ID, Touch ID, or any biometric authentication API; device-level passcode is used only via the operating system's standard secure key store).",
        },
      ],
      trailingParagraphs: [
        "If a future version of Rhize adds a feature requiring additional permissions or data, we will explain that at the time and update this policy as needed.",
      ],
    },
    {
      heading: '6. How we use information',
      paragraphs: ["We use the information described above to:"],
      list: [
        { body: 'Provide and operate Rhize.' },
        { body: 'Connect to Bluesky / AT Protocol services.' },
        { body: 'Authenticate users.' },
        { body: 'Display public social content.' },
        { body: 'Enable end-to-end encrypted private features.' },
        { body: 'Sync encrypted private content and metadata.' },
        { body: 'Manage invite codes, onboarding, and account access.' },
        { body: 'Prevent spam, abuse, fraud, and security incidents.' },
        { body: 'Debug crashes and performance issues.' },
        { body: 'Respond to support requests and user reports.' },
        { body: 'Improve app reliability and usability.' },
        { body: 'Comply with legal obligations.' },
        { body: 'Enforce our Terms of Service and community rules.' },
      ],
      trailingParagraphs: ["We do not use your private encrypted content for advertising or profiling."],
    },
    {
      heading: '7a. How we share information — With Bluesky / AT Protocol infrastructure',
      paragraphs: [
        "Because Rhize is a Bluesky / AT Protocol client, public account activity and public content may be sent to or retrieved from Bluesky, AT Protocol personal data servers, relays, AppView services, or related infrastructure.",
        "Encrypted private records may also be stored or transmitted through AT Protocol infrastructure in encrypted form. Rhize does not control how third-party AT Protocol infrastructure logs, retains, indexes, or processes network-level metadata.",
      ],
    },
    {
      heading: '7b. How we share information — With service providers',
      paragraphs: [
        "We use service providers to help operate Rhize. These providers are allowed to process information only as needed to provide services to us, subject to appropriate confidentiality and security obligations.",
        "Current production service providers:",
      ],
      list: [
        {
          label: 'Supabase:',
          body: ' stores account metadata, encrypted master keys (ciphertext only), and the encrypted inbox used to relay key-management messages and encrypted DMs. Supabase receives ciphertext and non-content metadata only; it does not receive plaintext private content or unencrypted keys.',
        },
        {
          label: 'PostHog:',
          body: ' anonymous app analytics and unhandled-exception reporting, configured to never identify users, with IP geolocation disabled, session replay disabled, and screen/touch autocapture disabled. PostHog does not act as a separate crash-reporting provider; it captures JavaScript exceptions only.',
        },
        {
          label: 'Apple App Store / TestFlight:',
          body: ' distribution and, if Rhize offers paid features, in-app purchase processing.',
        },
        {
          label: 'Google Play (if Rhize is published to Android):',
          body: ' distribution and, if applicable, in-app purchase processing.',
        },
      ],
      trailingParagraphs: [
        "Public posts, public interactions, and account identity are handled by Bluesky / AT Protocol infrastructure (your personal data server, relays, AppView services) — see the previous section.",
        "Rhize does not currently use a separate crash-reporting service (Sentry, Bugsnag, etc.), a customer-relationship-management platform, a separate email-sending provider, a dedicated cloud hosting provider beyond the ones listed, or any advertising or attribution SDK.",
      ],
    },
    {
      heading: '7c. How we share information — For legal, safety, or security reasons',
      paragraphs: ["We may disclose information if we believe it is reasonably necessary to:"],
      list: [
        { body: 'Comply with law, legal process, or valid government requests.' },
        { body: 'Protect the rights, safety, and security of users, Rhize, or others.' },
        { body: 'Investigate fraud, abuse, spam, security incidents, or violations of our terms.' },
        { body: 'Protect against legal liability.' },
      ],
      trailingParagraphs: [
        "Because Rhize cannot decrypt end-to-end encrypted private content, we may be unable to provide plaintext private content even if legally requested.",
      ],
    },
    {
      heading: '7d. How we share information — Business transfers',
      paragraphs: [
        "If Rhize is involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, information may be transferred as part of that transaction. If that happens, we will take reasonable steps to ensure this policy continues to apply or that users receive notice of material changes.",
        "We do not sell your personal information.",
      ],
    },
    {
      heading: '8. Public content and moderation',
      paragraphs: [
        "Rhize includes user-generated content. Public Bluesky / AT Protocol content is subject to Bluesky's rules, AT Protocol infrastructure, applicable moderation services, labeling systems, and user controls.",
        "Rhize provides the following safeguards in-app:",
      ],
      list: [
        {
          label: 'Report.',
          body: ' A "Report" action on any post submits a report to Bluesky / AT Protocol moderation with one of several reason categories (spam, community-guidelines violation, misleading, unwanted sexual content, harassment, or other).',
        },
        {
          label: 'Block.',
          body: ' A "Block" action prevents the blocked user from interacting with your account and is propagated to Bluesky / AT Protocol — your block applies across compatible AT Protocol clients.',
        },
        {
          label: 'Mute.',
          body: " A \"Mute\" action hides a user's posts in your Rhize feed. Rhize's mute is currently device-local — it does not propagate to your other devices or to other AT Protocol clients.",
        },
        {
          label: 'Mature-content filtering.',
          body: ' Posts labeled by Bluesky moderation as explicit content (categories including pornography, nudity, sexual content, graphic media, gore, and similar) are always hidden in Rhize. Rhize does not provide a user-facing override for these categories.',
        },
      ],
      trailingParagraphs: [
        "Because Rhize is a client for third-party public social infrastructure, moderation actions on public content (including reports, blocks, and labels) are processed by Bluesky / AT Protocol services rather than Rhize directly.",
        "For encrypted private content, Rhize cannot review the underlying content because we cannot read it. We can still act on user-submitted reports, screenshots voluntarily provided by users, account-level abuse signals, and non-content metadata.",
        "To report abuse, use the in-app Report action on the relevant post or account, or contact us at safety@denazen.com.",
      ],
    },
    {
      heading: '9. Children and age limits',
      paragraphs: [
        "Rhize is not intended for children under 13. We do not knowingly collect personal information from children under 13.",
        "Rhize uses Bluesky / AT Protocol account creation for sign-up. Bluesky enforces its own age-verification requirements during account creation, and Rhize does not independently collect a birthdate or run a separate age check at the time you connect your account to Rhize.",
        "Because Rhize includes social features and user-generated content, we may require users to meet a higher minimum age, such as 16 or 18, depending on launch decisions, jurisdiction, App Store rating, and applicable law. If a higher minimum age applies at the App Store rating level, it is enforced by the App Store's age-rating gate at install time.",
        "If you believe a child has provided us personal information, contact us at privacy@denazen.com, and we will take appropriate steps.",
      ],
    },
    {
      heading: '10. Data retention',
      paragraphs: [
        "We keep information only as long as reasonably necessary for the purposes described in this policy, including to provide Rhize, maintain security, comply with law, resolve disputes, enforce agreements, and improve the app.",
        "Different types of information may be retained for different periods:",
      ],
      list: [
        { body: 'Account connection information is retained while your account is connected to Rhize.' },
        {
          body: 'Encrypted private records may remain available as long as needed to provide private features or until deleted according to product functionality and underlying protocol behavior.',
        },
        { body: 'Support messages may be retained as long as needed to respond and maintain business records.' },
        { body: 'Security logs may be retained for a limited period to detect and prevent abuse.' },
        { body: 'Aggregated analytics may be retained longer if they do not identify individual users.' },
      ],
      trailingParagraphs: [
        "Public Bluesky / AT Protocol content and metadata may continue to exist outside Rhize even if you stop using Rhize. Deleting content through Rhize may depend on Bluesky / AT Protocol capabilities, your personal data server, relays, caches, third-party clients, and other infrastructure we do not control.",
      ],
    },
    {
      heading: '11. Your choices and controls',
      paragraphs: ["Depending on the feature and applicable law, you may be able to:"],
      list: [
        { body: 'Access, update, or delete certain Rhize account information.' },
        { body: 'Disconnect Rhize from your Bluesky / AT Protocol account.' },
        { body: 'Delete certain Rhize-created content.' },
        { body: 'Block or mute users.' },
        { body: 'Report content or accounts.' },
        { body: 'Opt out of optional analytics where available.' },
        { body: 'Request deletion of information Rhize controls.' },
        { body: 'Contact us about privacy questions or requests.' },
      ],
      trailingParagraphs: [
        "To make a privacy request, contact privacy@denazen.com.",
        "We may need to verify your request before acting on it. Some information may not be fully deletable if we need to retain it for legal, security, fraud-prevention, or legitimate operational reasons.",
      ],
    },
    {
      heading: '12. Security',
      paragraphs: ["We use technical and organizational measures designed to protect information we process. These include:"],
      list: [
        {
          body: 'End-to-end encryption of private posts and direct messages, performed on your device before transmission, using an authenticated-encryption cipher (XChaCha20-Poly1305 with associated data binding).',
        },
        {
          body: "Device-local storage of encryption keys in the operating system's secure key store (Keychain on iOS, Keystore on Android), with cloud-sync of those secure-store items disabled at the OS level.",
        },
        { body: 'Password-derived key derivation using Argon2id, with a per-account random salt.' },
        {
          body: "Exclusion of the app's local data sandbox from iCloud Backup and Google Drive Backup so that key material and decrypted content do not leave the device through device-backup channels.",
        },
        {
          body: "A server-side data boundary in which Rhize's servers (Supabase) receive ciphertext and non-content metadata only — never plaintext private content or unencrypted keys.",
        },
      ],
      trailingParagraphs: [
        "No system is perfectly secure. You are responsible for protecting your device, account credentials, recovery information, and any password or secret used to access encrypted private content.",
        "If you lose access to your encryption password and your recovery password, Rhize cannot restore your encrypted private content. Account reset generates a new key set and permanently makes content encrypted under the prior keys unreadable.",
      ],
    },
    {
      heading: '13. International users',
      paragraphs: [
        "Rhize is operated from the United States. If you use Rhize from outside the United States, your information may be processed in countries that may have different data-protection laws than where you live.",
        "Where required, we will use appropriate safeguards for international transfers of personal information.",
      ],
    },
    {
      heading: '14. Legal rights by region',
      paragraphs: [
        "Depending on where you live, you may have rights to access, correct, delete, export, restrict, or object to certain uses of your personal information.",
        "Residents of certain U.S. states, the European Economic Area, the United Kingdom, Canada, and other jurisdictions may have additional privacy rights.",
        "To exercise privacy rights, contact us at privacy@denazen.com.",
        "We do not discriminate against users for exercising privacy rights.",
      ],
    },
    {
      heading: '15. California privacy notice',
      paragraphs: [
        "If you are a California resident, California law may give you rights regarding personal information, including the right to know, delete, correct, and opt out of certain sharing or sales.",
        "Rhize does not sell personal information. Rhize does not share personal information for cross-context behavioral advertising.",
        "Categories of personal information we may collect include:",
      ],
      list: [
        { body: 'Identifiers, such as handle, DID, email address if provided, and account identifiers.' },
        { body: 'Internet or network activity, such as app interactions, diagnostics, and security logs.' },
        { body: 'User-generated content, including public posts and encrypted private records.' },
        { body: 'Commercial information, if you purchase paid features.' },
        {
          body: 'Inferences, only in limited operational or aggregate analytics contexts, not for advertising profiles.',
        },
      ],
      trailingParagraphs: ["We use this information for the purposes described in this policy."],
    },
    {
      heading: '16. Changes to this policy',
      paragraphs: [
        "We may update this Privacy Policy from time to time. If we make material changes, we will take reasonable steps to notify users, such as by updating the effective date, posting notice in the app, or sending an email if appropriate.",
        "Your continued use of Rhize after an updated policy becomes effective means you accept the updated policy, to the extent permitted by law.",
      ],
    },
    {
      heading: '17. Contact us',
      paragraphs: [
        "For privacy questions or requests, contact Denazen, Inc. at ",
      ],
      contactEmail: 'privacy@denazen.com',
      trailingParagraphs: [
        'Safety / reporting: safety@denazen.com',
        'Support: support@denazen.com',
        'Mailing address: 328 Mount Union Ave, Philomath OR, 97370',
      ],
    },
  ],
};
