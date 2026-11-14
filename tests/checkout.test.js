import test from 'node:test';
import assert from 'node:assert/strict';
import {
  contactErrors, createDemoOrder, createEmptyDraft, deliveryErrors,
  ordersStorageKey, readDemoOrders, sanitizeDraft, saveDemoOrder,
} from '../src/lib/checkout.js';

const product = { id: 1, title: 'Buket Foto', image: '/images/buket.jpg', price: 35000, stock: 5, quantity: 2 };
const other = { id: 2, title: 'Polaroid', image: '/images/polaroid.jpg', price: 1000, stock: 20, quantity: 3 };
function validDraft() {
  return { ...createEmptyDraft(), id: 'JR-DEMO-TEST', selectedIds: ['1'],
    contact: { name: ' Ana ', email: ' ana@example.com ', phone: '' },
    delivery: { method: 'local', address: 'Jalan Contoh 1', city: 'Salatiga', postalCode: '50700', note: '' },
  };
}
const build = (overrides = {}) => createDemoOrder({ ownerId: 'demo-ana', draft: validDraft(), cart: [product, other], paymentMethod: 'manual', createdAt: '2026-01-01T00:00:00.000Z', ...overrides });
function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('kontak menolak nama kosong dan email invalid, termasuk data draft rusak', () => {
  assert.ok(contactErrors({ name: '  ', email: 'ana' }).name);
  assert.ok(contactErrors({ name: 'Ana', email: 'ana@' }).email);
  assert.ok(contactErrors(null).email);
  assert.deepEqual(contactErrors({ name: 'Ana', email: ' ana@example.com ' }), {});
});

test('alamat wajib hanya untuk pengiriman dan kode pos harus lima angka', () => {
  assert.deepEqual(deliveryErrors({ method: 'pickup' }), {});
  assert.ok(deliveryErrors({ method: 'local' }).address);
  assert.ok(deliveryErrors({ ...validDraft().delivery, postalCode: '507' }).postalCode);
  assert.deepEqual(deliveryErrors({ ...validDraft().delivery, method: 'national' }), {});
  assert.ok(deliveryErrors({ ...validDraft().delivery, method: 'unknown' }).method);
});

test('pemulihan draft menolak shape rusak, menormalkan ID, dan membatasi panjang input', () => {
  assert.deepEqual(sanitizeDraft(null), createEmptyDraft());
  const restored = sanitizeDraft({ id: 123, selectedIds: [1, '1', null, {}, '2'], contact: { name: 'A'.repeat(150), email: 7 }, delivery: { method: 'broken', note: 'B'.repeat(1500) } });
  assert.deepEqual(restored.selectedIds, ['1', '2']);
  assert.equal(restored.id, '');
  assert.equal(restored.contact.name.length, 100);
  assert.equal(restored.contact.email, '');
  assert.equal(restored.delivery.method, 'pickup');
  assert.equal(restored.delivery.note.length, 1000);
});

test('pesanan hanya memuat pilihan checkout, total ongkir tepat, dan snapshot barang terpisah', () => {
  const cart = [{ ...product }, { ...other }];
  const order = build({ cart });
  assert.deepEqual(order.items.map((item) => item.id), [1]);
  assert.deepEqual(order.totals, { subtotal: 70000, shipping: 15000, total: 85000, itemCount: 2 });
  assert.equal(order.contact.name, 'Ana');
  assert.equal(order.contact.email, 'ana@example.com');
  assert.equal(order.profileId, 'demo-ana');
  assert.equal(order.demo, true);
  assert.equal(order.paymentStatus, 'simulation');
  cart[0].price = 1;
  assert.equal(order.items[0].price, 35000);
  assert.equal(order.totals.total, 85000);
});

test('checkout langsung tanpa pilihan atau data lengkap tidak dapat membuat pesanan', () => {
  assert.throws(() => build({ cart: [] }), /Pilih produk/);
  assert.throws(() => build({ draft: { ...validDraft(), contact: {} } }), /informasi kontak/);
  assert.throws(() => build({ draft: { ...validDraft(), delivery: { method: 'national' } } }), /informasi pengiriman/);
  assert.throws(() => build({ paymentMethod: 'credit-card' }), /pembayaran simulasi/);
});

test('riwayat mengabaikan null dan order rusak, mengisolasi profil, serta mencegah ID duplikat', () => {
  const storage = memoryStorage();
  const order = build();
  storage.setItem(ordersStorageKey('demo-ana'), JSON.stringify([null, {}, { ...order, items: [null] }, { ...order, contact: { ...order.contact, phone: {} } }]));
  assert.deepEqual(readDemoOrders('demo-ana', storage), []);
  saveDemoOrder(order, storage);
  saveDemoOrder(order, storage);
  assert.equal(readDemoOrders('demo-ana', storage).length, 1);
  assert.deepEqual(readDemoOrders('demo-budi', storage), []);
  assert.notEqual(ordersStorageKey('demo-ana'), ordersStorageKey('guest'));
  assert.doesNotThrow(() => saveDemoOrder({ ...order, id: 'JR-DEMO-SECOND' }, storage));
  assert.equal(readDemoOrders('demo-ana', storage).length, 2);
});

test('penyimpanan gagal tidak memberi hasil sukses atau mengubah riwayat yang sudah ada', () => {
  const saved = JSON.stringify([build()]);
  const storage = { getItem: () => saved, setItem: () => { throw new Error('Storage unavailable'); } };
  assert.throws(() => saveDemoOrder({ ...build(), id: 'JR-DEMO-NEW' }, storage), /Storage unavailable/);
  assert.equal(readDemoOrders('demo-ana', storage).length, 1);
});
