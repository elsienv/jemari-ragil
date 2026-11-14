export function normalizeQuantity(value, stock = 99) {
  const limit = Math.max(0, Math.min(99, Math.floor(Number(stock) || 0)));
  if (limit === 0) return 0;
  return Math.max(1, Math.min(limit, Math.floor(Number(value) || 1)));
}

export function addCartItem(cart, product, quantity = 1) {
  if (!product || !product.id || product.stock <= 0) return cart;
  const current = cart.find((item) => item.id === product.id);
  const count = normalizeQuantity(
    (current?.quantity || 0) + normalizeQuantity(quantity, product.stock),
    product.stock,
  );
  return current
    ? cart.map((item) => (item.id === product.id ? { ...product, quantity: count } : item))
    : [...cart, { ...product, quantity: count }];
}

export function restoreCart(saved, catalog) {
  if (!Array.isArray(saved)) return [];
  return saved.reduce((cart, item) => {
    const product = catalog.find((entry) => entry.id === item?.id);
    return product ? addCartItem(cart, product, item.quantity) : cart;
  }, []);
}
