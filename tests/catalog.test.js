import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { products, categories } from '../src/features/catalog/data/catalog.js';
import { articles } from '../src/features/stories/data/articles.js';

test('semua produk punya ID unik, kategori valid, harga rupiah, dan aset lokal yang tersedia', () => {
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  for (const product of products) {
    assert.ok(categories.some((category) => category.id === product.category));
    assert.ok(Number.isInteger(product.price) && product.price > 0);
    assert.ok(Number.isInteger(product.stock) && product.stock >= 0);
    assert.ok(existsSync(new URL('../public' + product.image, import.meta.url)), product.image);
  }
});
test('gambar kategori dan artikel tersedia tanpa layanan eksternal', () => {
  for (const item of [...categories, ...articles]) {
    assert.ok(item.image.startsWith('/images/'));
    assert.ok(existsSync(new URL('../public' + item.image, import.meta.url)), item.image);
  }
  assert.equal(new Set(articles.map((article) => article.slug)).size, articles.length);
});
