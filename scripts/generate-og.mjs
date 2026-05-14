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
  const headingLines = wrapText(v.heading, { maxWidth: 880, fontSize: 70, maxLines: 2 }).map(escapeXml);
  const sub = v.sub.map(escapeXml);
  const taglineLines = wrapText(v.tagline, { maxWidth: 980, fontSize: 26, maxLines: 2 }).map(escapeXml);

  // Layout constants
  const PAD_X = 80;
  const LOGO_SIZE = 88;
  const LOGO_X = PAD_X;
  const LOGO_Y = 60;
  const WORDMARK_X = LOGO_X + LOGO_SIZE + 20;
  const WORDMARK_Y = LOGO_Y + LOGO_SIZE / 2 + 20;

  // Top (white) band holds the brand row and the heading.
  // Bottom (green) band holds the three pillars and the tagline.
  const BAND_SPLIT_Y = 330;

  // Heading positioning inside the white band
  const HEADING_X = PAD_X;
  const HEADING_BASELINE_1 = headingLines.length === 1 ? 260 : 230;
  const HEADING_LINE_GAP = 78;

  // Three pillars sit just under the band split
  const SUB_X = PAD_X;
  const SUB_BASELINE_1 = BAND_SPLIT_Y + 70;
  const SUB_GAP = 44;

  // Tagline near bottom of green band
  const TAGLINE_X = PAD_X;
  const TAGLINE_BASELINE_1 = 555;
  const TAGLINE_LINE_GAP = 32;

  const headingTspans = headingLines
    .map((line, i) => `<tspan x="${HEADING_X}" y="${HEADING_BASELINE_1 + i * HEADING_LINE_GAP}">${line}</tspan>`)
    .join('');

  const taglineTspans = taglineLines
    .map((line, i) => `<tspan x="${TAGLINE_X}" y="${TAGLINE_BASELINE_1 + i * TAGLINE_LINE_GAP}">${line}</tspan>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Soft cream/mint wash for the upper band -->
    <linearGradient id="bgLight" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F4FBF5"/>
    </linearGradient>

    <!-- Warm leaf-light tint for the white band, evoking sun through canopy -->
    <radialGradient id="glowLight" cx="86%" cy="20%" r="58%">
      <stop offset="0%" stop-color="#2EAB42" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#2EAB42" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#2EAB42" stop-opacity="0"/>
    </radialGradient>

    <!-- Deep forest gradient for the lower band -->
    <linearGradient id="bgDark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F4D1A"/>
      <stop offset="55%" stop-color="#0A3B14"/>
      <stop offset="100%" stop-color="#06230C"/>
    </linearGradient>

    <!-- Subtle counter-glow in the green band for depth -->
    <radialGradient id="glowDark" cx="0%" cy="105%" r="60%">
      <stop offset="0%" stop-color="#1F7A2C" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#1F7A2C" stop-opacity="0"/>
    </radialGradient>

    <!-- Accent pillar bullet -->
    <radialGradient id="dot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#A8DDB3"/>
      <stop offset="100%" stop-color="#2EAB42"/>
    </radialGradient>
  </defs>

  <!-- White upper band -->
  <rect x="0" y="0" width="${W}" height="${BAND_SPLIT_Y}" fill="url(#bgLight)"/>
  <rect x="0" y="0" width="${W}" height="${BAND_SPLIT_Y}" fill="url(#glowLight)"/>

  <!-- Green lower band -->
  <rect x="0" y="${BAND_SPLIT_Y}" width="${W}" height="${H - BAND_SPLIT_Y}" fill="url(#bgDark)"/>
  <rect x="0" y="${BAND_SPLIT_Y}" width="${W}" height="${H - BAND_SPLIT_Y}" fill="url(#glowDark)"/>

  <!-- Thin accent rule along the band seam -->
  <rect x="0" y="${BAND_SPLIT_Y - 2}" width="${W}" height="2" fill="#2EAB42" fill-opacity="0.55"/>

  <!-- Brand wordmark on the white band -->
  <g font-family="${SERIF_STACK}">
    <text x="${WORDMARK_X}" y="${WORDMARK_Y}"
          font-size="48" font-weight="700" letter-spacing="-1"
          fill="#1F7A2C">${wordmark}</text>
  </g>

  <!-- Heading on the white band, in deep forest green -->
  <text font-family="${FONT_STACK}" fill="#0F4D1A"
        font-size="70" font-weight="800" letter-spacing="-2.4">${headingTspans}</text>

  <!-- Three pillars on the green band -->
  <g font-family="${FONT_STACK}" font-size="30" font-weight="500" fill="#D6F1DB">
    <circle cx="${SUB_X + 7}" cy="${SUB_BASELINE_1 - 10}" r="6" fill="url(#dot)"/>
    <text x="${SUB_X + 28}" y="${SUB_BASELINE_1}">${sub[0]}</text>

    <circle cx="${SUB_X + 7}" cy="${SUB_BASELINE_1 + SUB_GAP - 10}" r="6" fill="url(#dot)"/>
    <text x="${SUB_X + 28}" y="${SUB_BASELINE_1 + SUB_GAP}">${sub[1]}</text>

    <circle cx="${SUB_X + 7}" cy="${SUB_BASELINE_1 + SUB_GAP * 2 - 10}" r="6" fill="url(#dot)"/>
    <text x="${SUB_X + 28}" y="${SUB_BASELINE_1 + SUB_GAP * 2}">${sub[2]}</text>
  </g>

  <!-- Tagline on the green band -->
  <text font-family="${FONT_STACK}" fill="#FFFFFF"
        font-size="26" font-weight="500" font-style="italic"
        opacity="0.92" letter-spacing="-0.2">${taglineTspans}</text>
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
