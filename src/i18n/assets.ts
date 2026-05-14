import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { defaultLang, type Lang } from './config';

const publicDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'public',
);

const assetHashCache = new Map<string, string>();

// Returns a short content hash for a file under public/. Used to bust social
// scraper caches (Facebook, LinkedIn, iMessage, Slack, Discord, etc.) whenever
// the underlying bytes change, by appending it as a ?v=… query string.
export function publicAssetVersion(assetPath: string): string {
  const cached = assetHashCache.get(assetPath);
  if (cached !== undefined) return cached;

  const relative = assetPath.replace(/^\//, '');
  const fsPath = path.join(publicDir, relative);
  let hash = '';
  try {
    const buf = fs.readFileSync(fsPath);
    hash = createHash('sha1').update(buf).digest('hex').slice(0, 8);
  } catch {
    // Asset isn't on disk — fall through to no version string.
  }
  assetHashCache.set(assetPath, hash);
  return hash;
}

export function localizeAsset(assetPath: string, lang: Lang): string {
  if (lang === defaultLang) return assetPath;
  if (/^(https?:)?\/\//.test(assetPath)) return assetPath;
  if (assetPath.startsWith('data:')) return assetPath;

  const localizedPath = insertLocaleSegment(assetPath, lang);
  const relative = localizedPath.replace(/^\//, '');
  const fsPath = path.join(publicDir, relative);
  try {
    if (fs.existsSync(fsPath)) return localizedPath;
  } catch {
    // ignore — fall through to default
  }
  return assetPath;
}

function insertLocaleSegment(assetPath: string, lang: Lang): string {
  const lastSlash = assetPath.lastIndexOf('/');
  if (lastSlash === -1) return `${lang}/${assetPath}`;
  return `${assetPath.slice(0, lastSlash)}/${lang}${assetPath.slice(lastSlash)}`;
}
