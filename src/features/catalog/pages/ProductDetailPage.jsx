import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../shared/lib/format';
import ProductCard from '../components/ProductCard';
import { useProductDetails } from '../hooks/useProductDetails';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const {
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
  } = useProductDetails();

  if (!product)
    return (
      <section className="container section empty-state">
        <p className="eyebrow">Karya tidak ditemukan</p>
        <h1>Mungkin ada pilihan lain untukmu.</h1>
        <p>Produk ini belum tersedia di koleksi kami.</p>
        <Link className="button" to="/store">
          Jelajahi koleksi
        </Link>
      </section>
    );

  return (
    <div className="detail-page">
      <nav className="container detail-breadcrumb" aria-label="Jejak halaman">
        <Link to="/">Beranda</Link>
        <span aria-hidden="true">/</span>
        <Link to="/store">Koleksi</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>
      <section className="container detail-layout" aria-labelledby="product-title">
        <div className="detail-image">
          <img src={product.image} alt={product.title} width="800" height="900" />
          {product.tag && <span>{product.tag}</span>}
        </div>
        <div className="detail-content">
          <Link
            to={`/store?category=${encodeURIComponent(product.category)}`}
            className="eyebrow detail-category"
          >
            {product.categoryName}
          </Link>
          <h1 id="product-title">{product.title}</h1>
          <p className="detail-price">{formatCurrency(product.price)}</p>
          {product.rating > 0 ? (
            <p className="detail-rating">
              <span aria-hidden="true">★</span> {Number(product.rating).toFixed(1)}{' '}
              <span className="muted">/ 5 · {product.reviewsCount} ulasan</span>
            </p>
          ) : (
            <p className="detail-rating muted">Belum ada ulasan.</p>
          )}
          <p className="detail-description">{product.description}</p>
          <div className="detail-stock">
            <span
              className={product.stock > 0 ? 'stock-dot' : 'stock-dot is-empty'}
              aria-hidden="true"
            />
            {product.stock > 0 ? `${product.stock} tersedia` : 'Sedang habis'}
            {cartQuantity > 0 && <span> · {cartQuantity} di keranjangmu</span>}
          </div>
          <form className="detail-order-form" onSubmit={addProduct}>
            <label htmlFor="product-quantity" className="detail-quantity-label">
              Jumlah
            </label>
            <div className="detail-purchase-row">
              <div className="detail-quantity-control">
                <button
                  type="button"
                  aria-label="Kurangi jumlah"
                  onClick={decreaseQuantity}
                  disabled={remaining === 0 || selectedQuantity <= 1}
                >
                  −
                </button>
                <input
                  id="product-quantity"
                  type="number"
                  min="1"
                  max={remaining || 1}
                  step="1"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(event) => changeQuantity(event.target.value)}
                  onBlur={commitQuantity}
                  disabled={remaining === 0}
                />
                <button
                  type="button"
                  aria-label="Tambah jumlah"
                  onClick={increaseQuantity}
                  disabled={remaining === 0 || selectedQuantity >= remaining}
                >
                  +
                </button>
              </div>
              <button type="submit" className="button detail-add-button" disabled={remaining === 0}>
                {product.stock <= 0
                  ? 'Sedang habis'
                  : remaining === 0
                    ? 'Batas jumlah sudah tercapai'
                    : 'Tambahkan ke keranjang'}
                <span aria-hidden="true"> ↗</span>
              </button>
            </div>
          </form>
          <button
            type="button"
            className="detail-wishlist"
            aria-pressed={saved}
            onClick={saveProduct}
          >
            <span aria-hidden="true">{saved ? '♥' : '♡'}</span>
            {saved ? 'Tersimpan di favorit' : 'Simpan untuk nanti'}
          </button>
          <div className="detail-notes">
            <p>
              <span aria-hidden="true">✧</span> Sentuhan personal untuk momen istimewa.
            </p>
            <p>
              <span aria-hidden="true">↗</span> Lengkapi dengan kartu ucapan untuk pesan yang lebih
              personal.
            </p>
          </div>
          <details className="detail-disclosure">
            <summary>Tentang koleksi ini</summary>
            <p>
              Koleksi Jemari Ragil hadir untuk merayakan kelulusan, ulang tahun, dan momen
              sehari-hari. Padukan pilihanmu dengan foto atau kartu ucapan untuk menyampaikan pesan
              yang terasa dekat.
            </p>
          </details>
        </div>
      </section>
      {related.length > 0 && (
        <section className="container section detail-related" aria-labelledby="related-title">
          <div className="detail-related-heading">
            <div>
              <p className="eyebrow">Saling melengkapi</p>
              <h2 className="section-heading" id="related-title">
                Mungkin kamu juga suka.
              </h2>
            </div>
            <Link
              className="button-quiet"
              to={`/store?category=${encodeURIComponent(product.category)}`}
            >
              Lihat kategori <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="detail-related-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
