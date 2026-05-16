// Regenerates the Open Graph images so they parallel the hero copy. The
// homepage uses public/images/og-default.png (with its Spanish variant at
// public/images/es/og-default.png); /bsky uses public/images/og-bsky.png
// (es/og-bsky.png).
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
    heading: 'A private, encrypted space for your real relationships',
    tagline: 'Where real connection takes root',
  },
  {
    out: 'public/images/es/og-default.png',
    wordmark: 'Rhize',
    heading: 'Un espacio privado y cifrado para tus relaciones reales',
    tagline: 'Donde la conexión real echa raíces',
  },
  {
    out: 'public/images/og-bsky.png',
    wordmark: 'Rhize',
    heading: 'Add a private, encrypted layer to Bluesky',
    tagline: 'Where real connection takes root',
  },
  {
    out: 'public/images/es/og-bsky.png',
    wordmark: 'Rhize',
    heading: 'Añade una capa privada y cifrada a Bluesky',
    tagline: 'Donde la conexión real echa raíces',
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

const LOGO_SIZE = 140;

function buildSvg(v) {
  const wordmark = escapeXml(v.wordmark);
  const HEADING_FONT_SIZE = 52;
  const TAGLINE_FONT_SIZE = 42;
  const headingLines = wrapText(v.heading, { maxWidth: 1040, fontSize: HEADING_FONT_SIZE, maxLines: 3 }).map(escapeXml);
  const taglineLines = wrapText(v.tagline, { maxWidth: 1040, fontSize: TAGLINE_FONT_SIZE, maxLines: 2 }).map(escapeXml);

  // Brand mark + wordmark sit on a band along the top edge.
  const PAD_X = 80;
  const LOGO_X = PAD_X;
  const LOGO_Y = 70;
  const WORDMARK_FONT_SIZE = 76;
  const WORDMARK_X = LOGO_X + LOGO_SIZE + 28;
  // Position the wordmark baseline near the vertical center of the brand mark.
  const WORDMARK_Y = LOGO_Y + LOGO_SIZE / 2 + WORDMARK_FONT_SIZE / 2 - 10;

  // Heading + accent rule + tagline are centered as a single block beneath
  // the brand band, biased slightly upward so the bottom of the canvas
  // doesn't feel crowded.
  const HEADING_LINE_GAP = 62;
  const RULE_GAP_ABOVE = 44;
  const RULE_HEIGHT = 3;
  const RULE_WIDTH = 120;
  const TAGLINE_GAP_ABOVE = 50;
  const TAGLINE_LINE_GAP = 50;

  const headingBlockHeight = (headingLines.length - 1) * HEADING_LINE_GAP + HEADING_FONT_SIZE;
  const taglineBlockHeight = (taglineLines.length - 1) * TAGLINE_LINE_GAP + TAGLINE_FONT_SIZE;
  const totalHeight =
    headingBlockHeight + RULE_GAP_ABOVE + RULE_HEIGHT + TAGLINE_GAP_ABOVE + taglineBlockHeight;
  const brandBandBottom = LOGO_Y + LOGO_SIZE;
  // Center the block in the remaining canvas below the brand band, with a
  // small upward bias for balance.
  const blockTop = Math.max(
    brandBandBottom + 70,
    Math.round((H - brandBandBottom - totalHeight) / 2) + brandBandBottom - 10,
  );

  const HEADING_X = PAD_X;
  const HEADING_BASELINE_1 = blockTop + HEADING_FONT_SIZE - 4;
  const RULE_Y = blockTop + headingBlockHeight + RULE_GAP_ABOVE;
  const TAGLINE_X = PAD_X;
  const TAGLINE_BASELINE_1 = RULE_Y + RULE_HEIGHT + TAGLINE_GAP_ABOVE + TAGLINE_FONT_SIZE - 8;

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
  </defs>

  <!-- Full-canvas white background with soft brand glows -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgLight)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#glowTop)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#glowBottom)"/>

  <!-- Brand wordmark -->
  <g font-family="${SERIF_STACK}">
    <text x="${WORDMARK_X}" y="${WORDMARK_Y}"
          font-size="${WORDMARK_FONT_SIZE}" font-weight="700" letter-spacing="-1.5"
          fill="#1F7A2C">${wordmark}</text>
  </g>

  <!-- Heading in deep forest green -->
  <text font-family="${FONT_STACK}" fill="#0F4D1A"
        font-size="${HEADING_FONT_SIZE}" font-weight="800" letter-spacing="-1.4">${headingTspans}</text>

  <!-- Short accent rule between heading and tagline -->
  <rect x="${PAD_X}" y="${RULE_Y}" width="${RULE_WIDTH}" height="${RULE_HEIGHT}" rx="1.5"
        fill="#2EAB42" fill-opacity="0.85"/>

  <!-- Tagline in muted gray -->
  <text font-family="${FONT_STACK}" fill="#495057"
        font-size="${TAGLINE_FONT_SIZE}" font-weight="500" font-style="italic"
        letter-spacing="-0.4">${taglineTspans}</text>
</svg>`;
}

async function main() {
  const markPath = path.join(projectRoot, 'public/images/brand/rhize-mark.png');

  const mark = await sharp(markPath)
    .resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  for (const v of variants) {
    const svg = buildSvg(v);
    const outPath = path.join(projectRoot, v.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    await sharp(Buffer.from(svg))
      .composite([{ input: mark, top: 70, left: 80 }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);

    console.log(`wrote ${path.relative(projectRoot, outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
