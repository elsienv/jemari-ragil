import { calculateTotals, shippingMethods } from './totals.js';
import { normalizeQuantity } from '../../cart/lib/cart.js';
import { readStorage, writeStorage } from '../../../shared/lib/storage.js';

export const checkoutStorageKey = (ownerId = 'guest') =>
  `jemari-ragil:checkout:v1:${encodeURIComponent(String(ownerId))}`;
export const ordersStorageKey = (ownerId = 'guest') =>
  `jemari-ragil:orders:v1:${encodeURIComponent(String(ownerId))}`;
export const createEmptyDraft = () => ({
  id: '',
  selectedIds: [],
  contact: { name: '', email: '', phone: '' },
  delivery: { method: 'pickup', address: '', city: '', postalCode: '', note: '' },
});

export function contactErrors(contact = {}) {
  const errors = {};
  if (!String(contact?.name || '').trim()) errors.name = 'Isi nama penerima.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(contact?.email || '').trim()))
    errors.email = 'Masukkan alamat email yang valid.';
  return errors;
}

export function deliveryErrors(delivery = {}) {
  const errors = {};
  if (!shippingMethods.some((method) => method.id === delivery?.method))
    errors.method = 'Pilih metode pengiriman.';
  if (delivery?.method !== 'pickup') {
    if (!String(delivery?.address || '').trim()) errors.address = 'Isi alamat lengkap penerima.';
    if (!String(delivery?.city || '').trim()) errors.city = 'Isi kota atau kabupaten tujuan.';
    if (!/^\d{5}$/.test(String(delivery?.postalCode || '').trim()))
      errors.postalCode = 'Kode pos harus terdiri dari 5 angka.';
  }
  return errors;
}

export function sanitizeDraft(saved) {
  const base = createEmptyDraft();
  if (!saved || typeof saved !== 'object' || !Array.isArray(saved.selectedIds)) return base;
  const text = (value, fallback = '', limit = 500) =>
    typeof value === 'string' ? value.slice(0, limit) : fallback;
  return {
    id: text(saved.id, '', 120),
    selectedIds: [
      ...new Set(
        saved.selectedIds
          .filter((id) => typeof id === 'string' || typeof id === 'number')
          .map(String),
      ),
    ].slice(0, 100),
    contact: {
      name: text(saved.contact?.name, '', 100),
      email: text(saved.contact?.email, '', 254),
      phone: text(saved.contact?.phone, '', 40),
    },
    delivery: {
      method: shippingMethods.some((method) => method.id === saved.delivery?.method)
        ? saved.delivery.method
        : 'pickup',
      address: text(saved.delivery?.address),
      city: text(saved.delivery?.city, '', 100),
      postalCode: text(saved.delivery?.postalCode, '', 5),
      note: text(saved.delivery?.note, '', 1000),
    },
  };
}

export function isValidDemoOrder(order, ownerId) {
  const amount = (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0;
  return !!(
    order &&
    order.demo === true &&
    typeof order.id === 'string' &&
    order.id.length > 0 &&
    String(order.profileId) === String(ownerId) &&
    typeof order.createdAt === 'string' &&
    !Number.isNaN(Date.parse(order.createdAt)) &&
    order.contact &&
    ['name', 'email', 'phone'].every((key) => typeof order.contact[key] === 'string') &&
    order.delivery &&
    ['method', 'address', 'city', 'postalCode', 'note'].every(
      (key) => typeof order.delivery[key] === 'string',
    ) &&
    shippingMethods.some((method) => method.id === order.delivery.method) &&
    ['cod', 'manual'].includes(order.paymentMethod) &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    order.items.every(
      (item) =>
        item &&
        ['string', 'number'].includes(typeof item.id) &&
        typeof item.title === 'string' &&
        typeof item.image === 'string' &&
        amount(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    ) &&
    order.totals &&
    amount(order.totals.subtotal) &&
    amount(order.totals.shipping) &&
    amount(order.totals.total) &&
    Number.isInteger(order.totals.itemCount) &&
    order.totals.itemCount > 0
  );
}

export function readDemoOrders(ownerId, storage) {
  const saved = readStorage(ordersStorageKey(ownerId), [], storage);
  return Array.isArray(saved) ? saved.filter((order) => isValidDemoOrder(order, ownerId)) : [];
}

export function createDemoOrder({
  ownerId = 'guest',
  draft,
  cart,
  paymentMethod,
  createdAt = new Date().toISOString(),
}) {
  const current = sanitizeDraft(draft);
  const products = Array.isArray(cart)
    ? cart.filter((product) => product && current.selectedIds.includes(String(product.id)))
    : [];
  if (!current.id || !products.length)
    throw new Error('Pilih produk dari keranjang terlebih dahulu.');
  if (Object.keys(contactErrors(current.contact)).length)
    throw new Error('Lengkapi informasi kontak terlebih dahulu.');
  if (Object.keys(deliveryErrors(current.delivery)).length)
    throw new Error('Lengkapi informasi pengiriman terlebih dahulu.');
  if (!['cod', 'manual'].includes(paymentMethod))
    throw new Error('Pilih metode pembayaran simulasi.');
  const items = products.map((product) => ({
    ...product,
    quantity: normalizeQuantity(product.quantity, product.stock ?? 99),
  }));
  const order = {
    id: current.id,
    profileId: String(ownerId),
    demo: true,
    createdAt,
    status: 'demo-created',
    paymentStatus: 'simulation',
    paymentMethod,
    contact: {
      name: current.contact.name.trim(),
      email: current.contact.email.trim(),
      phone: current.contact.phone.trim(),
    },
    delivery: { ...current.delivery },
    items,
    totals: calculateTotals(items, current.delivery.method),
  };
  if (!isValidDemoOrder(order, ownerId))
    throw new Error('Data produk belum valid. Pilih ulang produk dari koleksi.');
  return order;
}

export function saveDemoOrder(order, storage) {
  if (!isValidDemoOrder(order, order?.profileId)) throw new Error('Data pesanan belum valid.');
  const orders = readDemoOrders(order.profileId, storage);
  const existing = orders.find((item) => item.id === order.id);
  if (existing) return existing;
  writeStorage(ordersStorageKey(order.profileId), [order, ...orders], storage);
  return order;
}
