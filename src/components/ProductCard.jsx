import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartItem/CartContext';
import { useWishlist } from './WishlistItem/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../lib/format';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { notify } = useToast();
  const saved = isWishlisted(product.id);
  const inCart = cart.find(item => item.id === product.id)?.quantity || 0;
  const available = Math.min(product.stock, 99) > inCart;

  function addProduct() {
    if (!available) return;
    addToCart(product, 1);
    notify(`${product.title} ditambahkan ke keranjang.`);
  }

  function toggleSaved() {
    toggleWishlist(product);
    notify(saved ? `${product.title} dihapus dari favorit.` : `${product.title} disimpan ke favorit.`);
  }

  return (
    <article className="jr-product-card">
      <div className="jr-product-visual">
        <Link to={`/product/${product.id}`} className="jr-product-image-link" aria-label={`Lihat ${product.title}`}>
          <img src={product.image} alt={product.title} loading="lazy" width="480" height="560" />
        </Link>
        {product.tag && <span className="jr-product-tag">{product.tag}</span>}
        <button type="button" className={`jr-product-save${saved ? ' is-saved' : ''}`} aria-label={`${saved ? 'Hapus' : 'Simpan'} ${product.title} ${saved ? 'dari' : 'ke'} favorit`} aria-pressed={saved} onClick={toggleSaved}>
          <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M20.6 4.9a5.5 5.5 0 0 0-7.8 0L12 5.7l-.8-.8a5.5 5.5 0 0 0-7.8 7.8L12 21l8.6-8.3a5.5 5.5 0 0 0 0-7.8Z" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
        </button>
        {product.stock <= 0 && <span className="jr-product-sold-out">Sedang habis</span>}
      </div>
      <div className="jr-product-info">
        <p className="jr-product-category">{product.categoryName}</p>
        <h3><Link to={`/product/${product.id}`}>{product.title}</Link></h3>
        <div className="jr-product-bottom"><span className="jr-product-price">{formatCurrency(product.price)}</span><button type="button" className="jr-product-add" onClick={addProduct} disabled={!available} aria-label={available ? `Tambahkan ${product.title} ke keranjang` : product.stock <= 0 ? `${product.title} sedang habis` : `Batas jumlah ${product.title} di keranjang tercapai`} title={!available && product.stock > 0 ? 'Batas jumlah di keranjang tercapai' : undefined}><span aria-hidden="true">＋</span><span>{product.stock <= 0 ? 'Habis' : 'Tambah'}</span></button></div>
      </div>
    </article>
  );
}
