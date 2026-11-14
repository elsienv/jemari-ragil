import test from 'node:test';
import assert from 'node:assert/strict';
import { addCartItem, calculateTotals, filterProducts, normalizeQuantity, restoreCart } from '../src/lib/shop.js';

const a = { id: 1, title: 'Buket Foto', description: 'Hadiah personal', category: 'bouquet', categoryName: 'Buket', price: 35000, stock: 3, featured: true, rating: 0 };
const b = { id: 2, title: 'Polaroid', description: 'Cetak foto', category: 'photo', categoryName: 'Cetak foto', price: 900, stock: 100, featured: false, rating: 0 };
const soldOut = { ...a, id: 3, stock: 0 };
test('menambahkan ulang produk menggabungkan jumlah dan membatasi stok', () => {
  const cart = addCartItem(addCartItem([], a, 2), a, 20);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);
  assert.deepEqual(addCartItem(cart, soldOut), cart);
});
test('pemulihan cart menolak produk hilang dan harga manipulasi dari penyimpanan', () => {
  const restored = restoreCart([{ id: 1, quantity: 200, price: 1 }, { id: 999, quantity: 3 }, { id: 3, quantity: 4 }], [a, b, soldOut]);
  assert.equal(restored.length, 1);
  assert.equal(restored[0].price, 35000);
  assert.equal(restored[0].quantity, 3);
  assert.deepEqual(restoreCart({ invalid: true }, [a]), []);
});
test('subtotal dan ongkir dihitung tanpa kehilangan nominal ribuan rupiah', () => {
  assert.deepEqual(calculateTotals([{ ...a, quantity: 2 }, { ...b, quantity: 10 }], 'local'), {
    subtotal: 79000, shipping: 15000, total: 94000, itemCount: 12,
  });
  assert.equal(calculateTotals([{ ...a, quantity: 1 }], 'national').total, 65000);
  assert.equal(calculateTotals([], 'national').total, 0);
});
test('filter gabungan, rentang harga, stok, dan pencarian tidak mengubah katalog asli', () => {
  const catalog = [a, b, soldOut];
  assert.deepEqual(filterProducts(catalog, { query: ' FOTO ', category: 'photo', minPrice: '0', maxPrice: '1000', inStock: true }).map((p) => p.id), [2]);
  assert.deepEqual(filterProducts(catalog, { sort: 'price-asc', inStock: true }).map((p) => p.id), [2, 1]);
  assert.deepEqual(catalog.map((p) => p.id), [1, 2, 3]);
  assert.deepEqual(filterProducts(catalog, { query: 'tidak ada' }), []);
});
test('jumlah tidak dapat negatif, pecahan, tak hingga, atau melebihi stok', () => {
  assert.equal(normalizeQuantity(-4, 5), 1);
  assert.equal(normalizeQuantity(2.9, 5), 2);
  assert.equal(normalizeQuantity(500, 5), 5);
  assert.equal(normalizeQuantity(Infinity, 5), 5);
  assert.equal(normalizeQuantity(1, 0), 0);
});
