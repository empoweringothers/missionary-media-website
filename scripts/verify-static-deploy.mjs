import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// This compares every served file, not just a version label or the homepage.
const root = fileURLToPath(new URL('../public/', import.meta.url));
const target = new URL(process.argv[2] ?? 'http://localhost:8793');
assert(['https:', 'http:'].includes(target.protocol), 'HTTP(S) URL required');
assert(!target.username && !target.password, 'Do not include credentials in the URL');
assert(target.pathname === '/' && !target.search && !target.hash, 'Use an origin URL');
const origin = target.origin;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const files = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), `Symlink must not be deployed: ${entry.name}`);
    assert(!entry.name.startsWith('.'), `Hidden file must not be deployed: ${entry.name}`);
    const full = join(directory, entry.name);
    if (entry.isDirectory()) await collect(full);
    else if (entry.isFile() && !['_headers', '_redirects', '.assetsignore'].includes(entry.name)) files.push(full);
  }
}
await collect(root);
assert(files.length > 0, 'No public files found');
let checked = 0;
let homepageHash;
for (const file of files.sort()) {
  const relative = file.slice(root.length).split(sep).join('/');
  assert(resolve(file).startsWith(root), 'File escaped public directory');
  const path = relative.split('/').map(encodeURIComponent).join('/');
  const response = await fetch(`${origin}/${path}`, { signal: AbortSignal.timeout(30000), redirect: 'follow' });
  assert.equal(new URL(response.url).origin, origin, `Unexpected redirect: ${relative}`);
  assert.equal(response.status, 200, `HTTP failure: ${relative}`);
  const expected = hash(await readFile(file));
  assert.equal(hash(Buffer.from(await response.arrayBuffer())), expected, `Byte mismatch: ${relative}`);
  if (relative === 'index.html') homepageHash = expected;
  checked++;
}
for (const path of ['/archive/2026-08-31-live-before-coaching-homepage/index.html', '/.git/config', '/CLOUDFLARE.md', '/not-a-real-missionary-media-route-404-check']) {
  const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 404, `Non-public path must return 404: ${path}`);
}
const homepage = await fetch(`${origin}/`, { signal: AbortSignal.timeout(30000) });
assert.equal(homepage.status, 200, 'Homepage must return 200');
assert.equal(hash(Buffer.from(await homepage.arrayBuffer())), homepageHash, 'Root homepage mismatch');
for (const [name, value] of Object.entries({
  'referrer-policy': 'no-referrer',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'cache-control': 'no-cache',
})) assert.equal(homepage.headers.get(name), value, `Unexpected header: ${name}`);
assert(homepage.headers.get('content-security-policy-report-only')?.includes("default-src 'self'"), 'Report-only CSP missing');
let canonicalRedirects = 'not applicable to this origin';
if (origin === 'https://missionarymedia.io') {
  assert.equal(homepage.headers.get('server'), 'cloudflare', 'Production must be served by Cloudflare');
  for (const source of ['http://missionarymedia.io', 'http://www.missionarymedia.io', 'https://www.missionarymedia.io']) {
    for (const path of ['/', '/academy/?migration_check=path%20and%20query']) {
      const response = await fetch(`${source}${path}`, { signal: AbortSignal.timeout(30000), redirect: 'manual' });
      assert.equal(response.status, 301, `Canonical redirect required: ${source}${path}`);
      assert.equal(response.headers.get('location'), `${origin}${path}`, `Redirect must preserve path/query: ${source}${path}`);
      assert.equal(response.headers.get('server'), 'cloudflare', `Redirect must be served by Cloudflare: ${source}`);
    }
  }
  canonicalRedirects = '6 passed; HTTPS apex with path and query preserved';
}
console.log(JSON.stringify({ origin, filesCompared: checked, mismatches: 0, privateAndMissingRoutes: '404', headers: 'passed; CSP is report-only', canonicalRedirects, homepageSha256: homepageHash }, null, 2));
