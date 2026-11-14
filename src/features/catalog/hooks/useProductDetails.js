import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/catalog';
import { useCart } from '../../cart/hooks/useCart';
import { useWishlist } from '../../wishlist/hooks/useWishlist';
import { useToast } from '../../../shared/hooks/useToast';

export function useProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { cart, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { notify } = useToast();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const saved = product ? isWishlisted(product.id) : false;
  const cartQuantity = product ? cart.find((item) => item.id === product.id)?.quantity || 0 : 0;
  const remaining = product ? Math.max(0, Math.min(product.stock, 99) - cartQuantity) : 0;
  const selectedQuantity = Math.max(1, Math.min(Number(quantity) || 1, remaining || 1));
  const related = product
    ? products
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 3)
    : [];

  function addProduct(event) {
    event.preventDefault();
    if (!product || remaining < 1) return;
    addToCart(product, selectedQuantity);
    setQuantity(1);
    notify(`${selectedQuantity} ${product.title} ditambahkan ke keranjang.`);
  }

  function saveProduct() {
    if (!product) return;
    toggleWishlist(product);
    notify(
      saved ? `${product.title} dihapus dari favorit.` : `${product.title} disimpan ke favorit.`,
    );
  }

  function decreaseQuantity() {
    setQuantity(Math.max(1, selectedQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity(Math.min(remaining, selectedQuantity + 1));
  }

  function changeQuantity(value) {
    setQuantity(
      value === '' ? '' : Math.max(1, Math.min(remaining || 1, Math.floor(Number(value) || 1))),
    );
  }

  function commitQuantity() {
    setQuantity(selectedQuantity);
  }

  return {
    product,
    saved,
    cartQuantity,
    remaining,
    selectedQuantity,
    quantity,
    related,
    addProduct,
    saveProduct,
    decreaseQuantity,
    increaseQuantity,
    changeQuantity,
    commitQuantity,
  };
}
