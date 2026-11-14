import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { products } from '../../data/catalog';
import { readStorage, writeStorage } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
const WishlistContext = createContext(null);
const KEY = 'jemari-ragil:wishlist:v1';
export const useWishlist = () => useContext(WishlistContext);
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = readStorage(KEY, []);
    return Array.isArray(saved) ? products.filter((product) => saved.some((item) => item?.id === product.id)) : [];
  });
  const { notify } = useToast();
  const warned = useRef(false);
  useEffect(() => {
    try { writeStorage(KEY, wishlist); }
    catch { if (!warned.current) { notify('Favorit belum bisa disimpan karena penyimpanan browser dibatasi.'); warned.current = true; } }
  }, [wishlist]);
  const addToWishlist = (product) => setWishlist((previous) => previous.some((item) => item.id === product.id) ? previous : [...previous, product]);
  const removeFromWishlist = (id) => setWishlist((previous) => previous.filter((item) => item.id !== id));
  const toggleWishlist = (product) => setWishlist((previous) => previous.some((item) => item.id === product.id) ? previous.filter((item) => item.id !== product.id) : [...previous, product]);
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);
  return <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted }}>{children}</WishlistContext.Provider>;
}
