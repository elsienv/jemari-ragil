import { normalizeQuantity } from '../../cart/lib/cart.js';

export const shippingMethods = [
  {
    id: 'pickup',
    label: 'Ambil sendiri',
    price: 0,
    description: 'Pengambilan langsung di Salatiga, tanpa biaya pengiriman.',
  },
  {
    id: 'local',
    label: 'Pengiriman lokal',
    price: 15000,
    description: 'Pilihan pengiriman untuk alamat dalam kota.',
  },
  {
    id: 'national',
    label: 'Pengiriman luar kota',
    price: 30000,
    description: 'Pilihan pengiriman untuk alamat di luar kota.',
  },
];

export function calculateTotals(items = [], shippingMethod = 'pickup') {
  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Math.max(0, Number(item.price) || 0) * normalizeQuantity(item.quantity, item.stock ?? 99),
    0,
  );
  const itemCount = items.reduce(
    (sum, item) => sum + normalizeQuantity(item.quantity, item.stock ?? 99),
    0,
  );
  const shipping =
    itemCount > 0 ? shippingMethods.find((method) => method.id === shippingMethod)?.price || 0 : 0;
  return { subtotal, shipping, total: subtotal + shipping, itemCount };
}
