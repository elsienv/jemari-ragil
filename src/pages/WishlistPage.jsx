import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import { useWishlist } from '../components/WishlistItem/WishlistContext';
import ProductCard from '../components/ProductCard';
import './WishlistPage.css';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  return (
    <section className="section wishlist-view">
      <div className="container">
        <div className="wishlist-page-heading"><div><p className="eyebrow">Disimpan untuk nanti</p><h1 className="page-heading">Yang dekat di hati.</h1><p className="muted">Kumpulkan hal-hal kecil yang ingin menjadi bagian ceritamu.</p></div><span className="wishlist-count">{wishlist.length} pilihan tersimpan</span></div>
        {wishlist.length ? (
          <><div className="wishlist-products-grid">{wishlist.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="wishlist-bottom-link"><Link className="button-secondary" to="/store">Temukan pilihan lainnya <FiArrowRight aria-hidden="true" /></Link></div></>
        ) : (
          <div className="empty-state wishlist-empty"><FiHeart aria-hidden="true" /><h2>Belum ada yang disimpan.</h2><p>Ketuk hati pada produk favoritmu. Pilihanmu akan menunggu di sini.</p><Link className="button" to="/store">Jelajahi koleksi <FiArrowRight aria-hidden="true" /></Link></div>
        )}
      </div>
    </section>
  );
}
