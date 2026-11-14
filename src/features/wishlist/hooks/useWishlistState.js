import { useEffect, useRef, useState } from 'react';
import { products } from '../../catalog/data/catalog';
import { readStorage, writeStorage } from '../../../shared/lib/storage';
import { useToast } from '../../../shared/hooks/useToast';

const KEY = 'jemari-ragil:wishlist:v1';

export function useWishlistState() {
  const [wishlist, setWishlist] = useState(() => {
    const saved = readStorage(KEY, []);
    return Array.isArray(saved)
      ? products.filter((product) => saved.some((item) => item?.id === product.id))
      : [];
  });
  const { notify } = useToast();
  const warned = useRef(false);

  useEffect(() => {
    try {
      writeStorage(KEY, wishlist);
    } catch {
      if (!warned.current) {
        notify('Favorit belum bisa disimpan karena penyimpanan browser dibatasi.');
        warned.current = true;
      }
    }
  }, [wishlist, notify]);

  const addToWishlist = (product) =>
    setWishlist((previous) =>
      previous.some((item) => item.id === product.id) ? previous : [...previous, product],
    );
  const removeFromWishlist = (id) =>
    setWishlist((previous) => previous.filter((item) => item.id !== id));
  const toggleWishlist = (product) =>
    setWishlist((previous) =>
      previous.some((item) => item.id === product.id)
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product],
    );
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted };
}
