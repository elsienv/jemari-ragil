import test from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../src/shared/lib/assets.js';

test('aset lokal tetap tersedia pada root development', () => {
  assert.equal(assetUrl('/images/buket.jpeg'), '/images/buket.jpeg');
  assert.equal(assetUrl('brand-mark.svg', '/'), '/brand-mark.svg');
});
test('aset GitHub Pages memakai subpath repository tepat satu kali', () => {
  assert.equal(assetUrl('/images/buket.jpeg', '/jemari-ragil/'), '/jemari-ragil/images/buket.jpeg');
  assert.equal(assetUrl('images/buket.jpeg', '/jemari-ragil'), '/jemari-ragil/images/buket.jpeg');
});
