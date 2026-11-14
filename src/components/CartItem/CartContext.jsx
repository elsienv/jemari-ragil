import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { products } from '../../data/catalog';
import { addCartItem, normalizeQuantity, restoreCart } from '../../lib/shop';
import { readStorage, writeStorage } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';

const CartContext = createContext(null);
const KEY = 'jemari-ragil:cart:v1';
export const useCart = () => useContext(CartContext);
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => restoreCart(readStorage(KEY, []), products));
  const { notify } = useToast();
  const warned = useRef(false);
  useEffect(() => {
    try { writeStorage(KEY, cart); }
    catch { if (!warned.current) { notify('Keranjang belum bisa disimpan. Izinkan penyimpanan browser agar tetap ada setelah dimuat ulang.'); warned.current = true; } }
  }, [cart]);
  const addToCart = (product, quantity = 1) => {
    const current = products.find((entry) => entry.id === product.id);
    if (current) setCart((previous) => addCartItem(previous, current, quantity));
  };
  const updateQuantity = (id, quantity) => setCart((previous) => previous.map((item) => item.id === id ? { ...item, quantity: normalizeQuantity(quantity, item.stock) } : item));
  const removeFromCart = (id) => setCart((previous) => previous.filter((item) => item.id !== id));
  const removeItems = (ids) => setCart((previous) => previous.filter((item) => !ids.includes(item.id)));
  const clearCart = () => setCart([]);
  return <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, removeItems, clearCart }}>{children}</CartContext.Provider>;
}
export default CartContext;
