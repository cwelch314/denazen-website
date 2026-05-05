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

const variants = [
  {
    out: 'public/images/og-default.png',
    wordmark: 'Penrose',
    headingLines: ['Social media,', 'without compromise.'],
    sub: [
      'Privacy inspired by Signal.',
      'Connection like early Facebook.',
      'Freedom of Bluesky.',
    ],
    tagline: 'The impossible triangle. Solved.',
  },
  {
    out: 'public/images/es/og-default.png',
    wordmark: 'Penrose',
    headingLines: ['Las redes sociales,', 'sin concesiones.'],
    sub: [
      'Privacidad inspirada en Signal.',
      'Conexión como Facebook en sus primeros días.',
      'Libertad de Bluesky.',
    ],
    tagline: 'El triángulo imposible. Resuelto.',
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

function buildSvg(v) {
  const wordmark = escapeXml(v.wordmark);
  const heading = v.headingLines.map(escapeXml);
  const sub = v.sub.map(escapeXml);
  const tagline = escapeXml(v.tagline);

  const TEXT_X = 500;
  const LEFT_CENTER_X = 240;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#003A6B"/>
      <stop offset="100%" stop-color="#002647"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="42%" r="40%">
      <stop offset="0%" stop-color="#2884E0" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#2884E0" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g font-family="${FONT_STACK}" fill="#FFFFFF">
    <text x="${LEFT_CENTER_X}" y="478" font-size="84" font-weight="800" letter-spacing="-2" text-anchor="middle">${wordmark}</text>

    <text x="${TEXT_X}" y="190" font-size="64" font-weight="800" letter-spacing="-1.6">${heading[0]}</text>
    <text x="${TEXT_X}" y="262" font-size="64" font-weight="800" letter-spacing="-1.6">${heading[1]}</text>

    <g fill="#ABD5FF" font-size="32" font-weight="500">
      <text x="${TEXT_X}" y="346">${sub[0]}</text>
      <text x="${TEXT_X}" y="392">${sub[1]}</text>
      <text x="${TEXT_X}" y="438">${sub[2]}</text>
    </g>

    <text x="${TEXT_X}" y="520" font-size="38" font-weight="700" font-style="italic" fill="#FFFFFF" letter-spacing="-0.4">${tagline}</text>
  </g>
</svg>`;
}

async function main() {
  const trianglePath = path.join(projectRoot, 'public/images/brand/penrose.png');
  const triangleSize = 220;
  const triangle = await sharp(trianglePath)
    .resize(triangleSize, triangleSize, { fit: 'contain' })
    .toBuffer();
  const triangleLeft = 130;
  const triangleTop = 150;

  for (const v of variants) {
    const svg = buildSvg(v);
    const outPath = path.join(projectRoot, v.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    await sharp(Buffer.from(svg))
      .composite([{ input: triangle, top: triangleTop, left: triangleLeft }])
      .png({ compressionLevel: 9 })
      .toFile(outPath);

    console.log(`wrote ${path.relative(projectRoot, outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
