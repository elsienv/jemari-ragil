export const shippingMethods = [
  { id: 'pickup', label: 'Ambil sendiri', price: 0, description: 'Simulasi pengambilan langsung. Tanpa biaya pengiriman.' },
  { id: 'local', label: 'Pengiriman lokal', price: 15000, description: 'Biaya tetap contoh untuk pengiriman lokal.' },
  { id: 'national', label: 'Pengiriman luar kota', price: 30000, description: 'Biaya tetap contoh untuk pengiriman antarkota.' },
];

export function normalizeQuantity(value, stock = 99) {
  const limit = Math.max(0, Math.min(99, Math.floor(Number(stock) || 0)));
  if (limit === 0) return 0;
  return Math.max(1, Math.min(limit, Math.floor(Number(value) || 1)));
}

export function addCartItem(cart, product, quantity = 1) {
  if (!product || !product.id || product.stock <= 0) return cart;
  const current = cart.find((item) => item.id === product.id);
  const count = normalizeQuantity((current?.quantity || 0) + normalizeQuantity(quantity, product.stock), product.stock);
  return current
    ? cart.map((item) => item.id === product.id ? { ...product, quantity: count } : item)
    : [...cart, { ...product, quantity: count }];
}

export function restoreCart(saved, catalog) {
  if (!Array.isArray(saved)) return [];
  return saved.reduce((cart, item) => {
    const product = catalog.find((entry) => entry.id === item?.id);
    return product ? addCartItem(cart, product, item.quantity) : cart;
  }, []);
}

export function calculateTotals(items = [], shippingMethod = 'pickup') {
  const subtotal = items.reduce((sum, item) => sum + Math.max(0, Number(item.price) || 0) * normalizeQuantity(item.quantity, item.stock ?? 99), 0);
  const itemCount = items.reduce((sum, item) => sum + normalizeQuantity(item.quantity, item.stock ?? 99), 0);
  const shipping = itemCount > 0 ? (shippingMethods.find((method) => method.id === shippingMethod)?.price || 0) : 0;
  return { subtotal, shipping, total: subtotal + shipping, itemCount };
}

export function filterProducts(products, { query = '', category = '', minPrice = '', maxPrice = '', inStock = false, sort = 'featured' } = {}) {
  const search = String(query).trim().toLocaleLowerCase('id');
  const hasMin = minPrice !== '' && minPrice != null && Number.isFinite(Number(minPrice));
  const hasMax = maxPrice !== '' && maxPrice != null && Number.isFinite(Number(maxPrice));
  const result = products.filter((product) => (!search || `${product.title} ${product.categoryName} ${product.description}`.toLocaleLowerCase('id').includes(search))
    && (!category || category === 'all' || product.category === category)
    && (!hasMin || product.price >= Number(minPrice))
    && (!hasMax || product.price <= Number(maxPrice))
    && (!inStock || product.stock > 0));
  const comparisons = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.title.localeCompare(b.title, 'id'),
    rating: (a, b) => b.rating - a.rating,
    featured: (a, b) => Number(b.featured) - Number(a.featured),
  };
  return result.sort(comparisons[sort] || comparisons.featured);
}
