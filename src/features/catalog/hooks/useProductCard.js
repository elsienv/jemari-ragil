import { useCart } from '../../cart/hooks/useCart';
import { useWishlist } from '../../wishlist/hooks/useWishlist';
import { useToast } from '../../../shared/hooks/useToast';

export function useProductCard(product) {
  const { cart, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { notify } = useToast();
  const saved = isWishlisted(product.id);
  const inCart = cart.find((item) => item.id === product.id)?.quantity || 0;
  const available = Math.min(product.stock, 99) > inCart;

  function addProduct() {
    if (!available) return;
    addToCart(product, 1);
    notify(`${product.title} ditambahkan ke keranjang.`);
  }

  function toggleSaved() {
    toggleWishlist(product);
    notify(
      saved ? `${product.title} dihapus dari favorit.` : `${product.title} disimpan ke favorit.`,
    );
  }

  return { saved, available, addProduct, toggleSaved };
}
