import { useEffect, useRef, useState } from 'react';
import { products } from '../../catalog/data/catalog';
import { readStorage, writeStorage } from '../../../shared/lib/storage';
import { useToast } from '../../../shared/hooks/useToast';
import { addCartItem, normalizeQuantity, restoreCart } from '../lib/cart';

const KEY = 'jemari-ragil:cart:v1';

export function useCartState() {
  const [cart, setCart] = useState(() => restoreCart(readStorage(KEY, []), products));
  const { notify } = useToast();
  const warned = useRef(false);

  useEffect(() => {
    try {
      writeStorage(KEY, cart);
    } catch {
      if (!warned.current) {
        notify(
          'Keranjang belum bisa disimpan. Izinkan penyimpanan browser agar tetap ada setelah dimuat ulang.',
        );
        warned.current = true;
      }
    }
  }, [cart, notify]);

  const addToCart = (product, quantity = 1) => {
    const current = products.find((entry) => entry.id === product.id);
    if (current) setCart((previous) => addCartItem(previous, current, quantity));
  };
  const updateQuantity = (id, quantity) =>
    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity: normalizeQuantity(quantity, item.stock) } : item,
      ),
    );
  const removeFromCart = (id) => setCart((previous) => previous.filter((item) => item.id !== id));
  const removeItems = (ids) =>
    setCart((previous) => previous.filter((item) => !ids.includes(item.id)));
  const clearCart = () => setCart([]);

  return { cart, addToCart, updateQuantity, removeFromCart, removeItems, clearCart };
}
