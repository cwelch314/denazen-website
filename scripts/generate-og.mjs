// Regenerates the Open Graph image at public/images/og-default.png (and the
// Spanish variant at public/images/es/og-default.png) so they parallel the
// hero copy on the homepage.
//
// Run with: node scripts/generate-og.mjs

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), '..');

const W = 1200;
const H = 630;

const FONT_STACK = "'Inter', 'Helvetica Neue', 'Liberation Sans', 'DejaVu Sans', sans-serif";
const SERIF_STACK = "'Manrope', 'Inter', 'Helvetica Neue', sans-serif";

const variants = [
  {
    out: 'public/images/og-default.png',
    wordmark: 'Rhize',
    heading: 'Where real connection takes root',
    sub: [
      'Privacy inspired by Signal.',
      'Connection like early Facebook.',
      'Freedom and choice of Bluesky.',
    ],
    tagline: 'Share with the people you trust — privately, authentically, securely.',
  },
  {
    out: 'public/images/es/og-default.png',
    wordmark: 'Rhize',
    heading: 'Donde la conexión real echa raíces',
    sub: [
      'Privacidad inspirada en Signal.',
      'Conexión como en los primeros días de Facebook.',
      'Libertad y elección de Bluesky.',
    ],
    tagline: 'Comparte con las personas en las que confías — de forma privada, auténtica y segura.',
  },
];

function escapeXml(s) {
  return s.replace(/[<>&'"]/g, (ch) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[ch]));
}

// Greedy word-wrap that returns at most `maxLines` lines, each with a visual
// width below `maxWidth` (approximated from character count × avgCharWidth).
function wrapText(text, { maxWidth, fontSize, avgCharRatio = 0.55, maxLines = 3 }) {
  const approxCharWidth = fontSize * avgCharRatio;
  const maxChars = Math.floor(maxWidth / approxCharWidth);
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  // If there are leftover words, append them to the last line so nothing is dropped.
  const consumed = lines.join(' ').split(/\s+/).length;
  if (consumed < words.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1]} ${words.slice(consumed).join(' ')}`;
  }
  return lines.slice(0, maxLines);
}

function buildSvg(v) {
  const wordmark = escapeXml(v.wordmark);
  const headingLines = wrapText(v.heading, { maxWidth: 980, fontSize: 60, maxLines: 2 }).map(escapeXml);
  const sub = v.sub.map(escapeXml);
  const taglineLines = wrapText(v.tagline, { maxWidth: 1040, fontSize: 30, maxLines: 2 }).map(escapeXml);

  // Layout constants
  const PAD_X = 80;
  const LOGO_SIZE = 88;
  const LOGO_X = PAD_X;
  const LOGO_Y = 60;
  const WORDMARK_X = LOGO_X + LOGO_SIZE + 20;
  const WORDMARK_Y = LOGO_Y + LOGO_SIZE / 2 + 20;

  // Heading positioning
  const HEADING_X = PAD_X;
  const HEADING_BASELINE_1 = headingLines.length === 1 ? 250 : 230;
  const HEADING_LINE_GAP = 68;

  // Thin accent rule sits between the heading and the pillars
  const RULE_Y = headingLines.length === 1 ? 290 : 332;
  const RULE_WIDTH = 120;

  // Three pillars under the heading
  const SUB_X = PAD_X;
  const SUB_BASELINE_1 = headingLines.length === 1 ? 360 : 400;
  const SUB_GAP = 50;

  // Tagline near bottom of canvas
  const TAGLINE_X = PAD_X;
  const TAGLINE_BASELINE_1 = 568;
  const TAGLINE_LINE_GAP = 36;

  const headingTspans = headingLines
    .map((line, i) => `<tspan x="${HEADING_X}" y="${HEADING_BASELINE_1 + i * HEADING_LINE_GAP}">${line}</tspan>`)
    .join('');

  const taglineTspans = taglineLines
    .map((line, i) => `<tspan x="${TAGLINE_X}" y="${TAGLINE_BASELINE_1 + i * TAGLINE_LINE_GAP}">${line}</tspan>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Soft cream/mint wash across the full canvas -->
    <linearGradient id="bgLight" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F4FBF5"/>
    </linearGradient>

    <!-- Warm leaf-light tint at top right, evoking sun through canopy -->
    <radialGradient id="glowTop" cx="92%" cy="6%" r="62%">
      <stop offset="0%" stop-color="#2EAB42" stop-opacity="0.14"/>
      <stop offset="60%" stop-color="#2EAB42" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#2EAB42" stop-opacity="0"/>
    </radialGradient>

    <!-- Counter-glow at bottom left for depth -->
    <radialGradient id="glowBottom" cx="0%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#1F7A2C" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#1F7A2C" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#1F7A2C" stop-opacity="0"/>
    </radialGradient>

    <!-- Accent pillar bullet -->
    <radialGradient id="dot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#A8DDB3"/>
      <stop offset="100%" stop-color="#2EAB42"/>
    </radialGradient>
  </defs>

  <!-- Full-canvas white background with soft brand glows -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgLight)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#glowTop)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#glowBottom)"/>

  <!-- Brand wordmark -->
  <g font-family="${SERIF_STACK}">
    <text x="${WORDMARK_X}" y="${WORDMARK_Y}"
          font-size="48" font-weight="700" letter-spacing="-1"
          fill="#1F7A2C">${wordmark}</text>
  </g>

  <!-- Heading in deep forest green -->
  <text font-family="${FONT_STACK}" fill="#0F4D1A"
        font-size="60" font-weight="800" letter-spacing="-2">${headingTspans}</text>

  <!-- Short accent rule between heading and pillars -->
  <rect x="${PAD_X}" y="${RULE_Y}" width="${RULE_WIDTH}" height="3" rx="1.5"
        fill="#2EAB42" fill-opacity="0.85"/>

  <!-- Three pillars in body text gray -->
  <g font-family="${FONT_STACK}" font-size="34" font-weight="500" fill="#212529">
    <circle cx="${SUB_X + 8}" cy="${SUB_BASELINE_1 - 12}" r="7" fill="url(#dot)"/>
    <text x="${SUB_X + 32}" y="${SUB_BASELINE_1}">${sub[0]}</text>

    <circle cx="${SUB_X + 8}" cy="${SUB_BASELINE_1 + SUB_GAP - 12}" r="7" fill="url(#dot)"/>
    <text x="${SUB_X + 32}" y="${SUB_BASELINE_1 + SUB_GAP}">${sub[1]}</text>

    <circle cx="${SUB_X + 8}" cy="${SUB_BASELINE_1 + SUB_GAP * 2 - 12}" r="7" fill="url(#dot)"/>
    <text x="${SUB_X + 32}" y="${SUB_BASELINE_1 + SUB_GAP * 2}">${sub[2]}</text>
  </g>

  <!-- Tagline in muted gray -->
  <text font-family="${FONT_STACK}" fill="#495057"
        font-size="30" font-weight="500" font-style="italic"
        letter-spacing="-0.2">${taglineTspans}</text>
</svg>`;
}

async function main() {
  const markPath = path.join(projectRoot, 'public/images/brand/rhize-mark.png');

  // Small brand mark next to the wordmark on the white band.
  const markSize = 88;
  const mark = await sharp(markPath)
    .resize(markSize, markSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  for (const v of variants) {
    const svg = buildSvg(v);
    const outPath = path.join(projectRoot, v.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    await sharp(Buffer.from(svg))
      .composite([{ input: mark, top: 60, left: 80 }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);

    console.log(`wrote ${path.relative(projectRoot, outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
