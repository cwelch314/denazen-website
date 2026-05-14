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
  const taglineLines = wrapText(v.tagline, { maxWidth: 980, fontSize: 28, maxLines: 2 }).map(escapeXml);

  // Layout constants
  const PAD_X = 80;
  const LOGO_SIZE = 96;
  const LOGO_X = PAD_X;
  const LOGO_Y = 70;
  const WORDMARK_X = LOGO_X + LOGO_SIZE + 22;
  const WORDMARK_Y = LOGO_Y + LOGO_SIZE / 2 + 22;

  // Heading positioning (vertically centered block)
  const HEADING_X = PAD_X;
  const HEADING_BASELINE_1 = headingLines.length === 1 ? 260 : 240;
  const HEADING_LINE_GAP = 78;

  // Sub-lines (three brand pillars) start under the heading block
  const SUB_X = PAD_X;
  const SUB_BASELINE_1 = HEADING_BASELINE_1 + (headingLines.length === 1 ? 0 : HEADING_LINE_GAP) + 60;
  const SUB_GAP = 44;

  // Tagline near bottom
  const TAGLINE_X = PAD_X;
  const TAGLINE_BASELINE_1 = 540;
  const TAGLINE_LINE_GAP = 34;

  const headingTspans = headingLines
    .map((line, i) => `<tspan x="${HEADING_X}" y="${HEADING_BASELINE_1 + i * HEADING_LINE_GAP}">${line}</tspan>`)
    .join('');

  const taglineTspans = taglineLines
    .map((line, i) => `<tspan x="${TAGLINE_X}" y="${TAGLINE_BASELINE_1 + i * TAGLINE_LINE_GAP}">${line}</tspan>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Deep forest gradient anchored in the brand palette -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F4D1A"/>
      <stop offset="55%" stop-color="#0A3B14"/>
      <stop offset="100%" stop-color="#06230C"/>
    </linearGradient>

    <!-- Warm leaf-light glow from upper-right, evoking sun through canopy -->
    <radialGradient id="glow1" cx="82%" cy="18%" r="55%">
      <stop offset="0%" stop-color="#7BD389" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="#2EAB42" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#2EAB42" stop-opacity="0"/>
    </radialGradient>

    <!-- Subtle cool counter-glow in lower-left for depth -->
    <radialGradient id="glow2" cx="0%" cy="105%" r="65%">
      <stop offset="0%" stop-color="#1F7A2C" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#1F7A2C" stop-opacity="0"/>
    </radialGradient>

    <!-- Accent pillar bullet -->
    <radialGradient id="dot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#A8DDB3"/>
      <stop offset="100%" stop-color="#2EAB42"/>
    </radialGradient>
  </defs>

  <!-- Base layers -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- Faint hairline frame for a polished, premium feel -->
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="20" ry="20"
        fill="none" stroke="#A8DDB3" stroke-opacity="0.10" stroke-width="1"/>

  <!-- Brand row: logo + wordmark -->
  <g font-family="${SERIF_STACK}">
    <text x="${WORDMARK_X}" y="${WORDMARK_Y}"
          font-size="52" font-weight="700" letter-spacing="-1"
          fill="#A8DDB3">${wordmark}</text>
  </g>

  <!-- Decorative left rule under the brand row -->
  <line x1="${PAD_X}" y1="${LOGO_Y + LOGO_SIZE + 30}"
        x2="${PAD_X + 72}" y2="${LOGO_Y + LOGO_SIZE + 30}"
        stroke="#2EAB42" stroke-width="3" stroke-linecap="round"/>

  <!-- Heading: hero h1 echo -->
  <text font-family="${FONT_STACK}" fill="#FFFFFF"
        font-size="70" font-weight="800" letter-spacing="-2.4"
        style="line-height: 1.05;">${headingTspans}</text>

  <!-- Three pillars (mirror the hero rotator lines) -->
  <g font-family="${FONT_STACK}" font-size="30" font-weight="500" fill="#D6F1DB">
    <circle cx="${SUB_X + 7}" cy="${SUB_BASELINE_1 - 10}" r="6" fill="url(#dot)"/>
    <text x="${SUB_X + 28}" y="${SUB_BASELINE_1}">${sub[0]}</text>

    <circle cx="${SUB_X + 7}" cy="${SUB_BASELINE_1 + SUB_GAP - 10}" r="6" fill="url(#dot)"/>
    <text x="${SUB_X + 28}" y="${SUB_BASELINE_1 + SUB_GAP}">${sub[1]}</text>

    <circle cx="${SUB_X + 7}" cy="${SUB_BASELINE_1 + SUB_GAP * 2 - 10}" r="6" fill="url(#dot)"/>
    <text x="${SUB_X + 28}" y="${SUB_BASELINE_1 + SUB_GAP * 2}">${sub[2]}</text>
  </g>

  <!-- Tagline -->
  <text font-family="${FONT_STACK}" fill="#FFFFFF"
        font-size="28" font-weight="500" font-style="italic"
        opacity="0.92" letter-spacing="-0.2">${taglineTspans}</text>
</svg>`;
}

async function main() {
  const markPath = path.join(projectRoot, 'public/images/brand/rhize-mark.png');

  // Small brand mark next to the wordmark.
  const markSize = 96;
  const mark = await sharp(markPath)
    .resize(markSize, markSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Large, faded mark anchored to the right as a decorative accent.
  const accentSize = 520;
  const accentMark = await sharp(markPath)
    .resize(accentSize, accentSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    // Drop the alpha way down so it reads as a subtle watermark over the gradient.
    .composite([{
      input: Buffer.from([255, 255, 255, 45]),
      raw: { width: 1, height: 1, channels: 4 },
      tile: true,
      blend: 'dest-in',
    }])
    .toBuffer();

  for (const v of variants) {
    const svg = buildSvg(v);
    const outPath = path.join(projectRoot, v.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    await sharp(Buffer.from(svg))
      .composite([
        { input: accentMark, top: 60, left: W - accentSize - 20 },
        { input: mark, top: 70, left: 80 },
      ])
      .png({ compressionLevel: 9 })
      .toFile(outPath);

    console.log(`wrote ${path.relative(projectRoot, outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
