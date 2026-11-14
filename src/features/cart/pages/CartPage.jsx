import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useCartPage } from '../hooks/useCartPage';
import { formatCurrency } from '../../../shared/lib/format';
import './CartPage.css';

export default function CartPage() {
  const {
    cart,
    selectedIds,
    selectedProducts,
    totals,
    allSelected,
    toggleItem,
    toggleAllItems,
    handleCheckout,
    handleRemove,
    updateQuantity,
  } = useCartPage();

  return (
    <section className="section cart-view">
      <div className="container">
        <div className="cart-page-heading">
          <div>
            <p className="eyebrow">Yang sudah mencuri hati</p>
            <h1 className="page-heading">Keranjang pilihanmu.</h1>
            <p className="muted">Hal-hal kecil, untuk momen yang tidak kecil.</p>
          </div>
          <Link to="/store" className="cart-continue">
            Lanjut menjelajah <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        {!cart.length ? (
          <div className="empty-state cart-empty">
            <FiShoppingBag aria-hidden="true" />
            <h2>Masih ada ruang untuk kenangan.</h2>
            <p>Temukan hadiah kecil yang paling mewakili ceritamu.</p>
            <Link className="button" to="/store">
              Jelajahi koleksi <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-products-panel">
              <div className="cart-selection-bar">
                <label>
                  <input type="checkbox" checked={allSelected} onChange={toggleAllItems} />
                  Pilih semua <span>({cart.length} produk)</span>
                </label>
                <span>{selectedProducts.length} dipilih</span>
              </div>
              <ul className="cart-products-list">
                {cart.map((product) => (
                  <li className="cart-product-row" key={product.id}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(String(product.id))}
                      onChange={() => toggleItem(product.id)}
                      aria-label={'Pilih ' + product.title}
                    />
                    <Link className="cart-product-image" to={'/product/' + product.id}>
                      <img src={product.image} alt={product.title} />
                    </Link>
                    <div className="cart-product-description">
                      <span className="cart-product-category">
                        {product.categoryName || product.category || 'Dibuat dengan hati'}
                      </span>
                      <Link to={'/product/' + product.id}>
                        <h2>{product.title}</h2>
                      </Link>
                      <p>
                        {formatCurrency(product.price)} <span>/ barang</span>
                      </p>
                    </div>
                    <div className="cart-quantity-controls" aria-label={'Jumlah ' + product.title}>
                      <button
                        type="button"
                        disabled={product.quantity <= 1}
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                        aria-label={'Kurangi jumlah ' + product.title}
                      >
                        −
                      </button>
                      <span aria-live="polite">{product.quantity}</span>
                      <button
                        type="button"
                        disabled={product.quantity >= Math.min(product.stock || 99, 99)}
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        aria-label={'Tambah jumlah ' + product.title}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-product-total">
                      <strong>{formatCurrency(product.price * product.quantity)}</strong>
                      <button
                        type="button"
                        onClick={() => handleRemove(product)}
                        aria-label={'Hapus ' + product.title}
                      >
                        <FiTrash2 aria-hidden="true" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="cart-selection-note">
                Hanya produk yang dipilih yang akan masuk ke pesanan demo.
              </p>
            </div>
            <aside className="cart-order-summary">
              <p className="eyebrow">Sudah pas di hati?</p>
              <h2>Ringkasan pilihan</h2>
              <dl>
                <div>
                  <dt>Barang terpilih</dt>
                  <dd>{totals.itemCount} barang</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatCurrency(totals.subtotal)}</dd>
                </div>
                <div>
                  <dt>Pengiriman</dt>
                  <dd>Di langkah berikutnya</dd>
                </div>
                <div className="cart-summary-total">
                  <dt>Subtotal pilihan</dt>
                  <dd>{formatCurrency(totals.subtotal)}</dd>
                </div>
              </dl>
              <button
                className="button"
                onClick={handleCheckout}
                disabled={!selectedProducts.length}
              >
                Lanjut checkout <FiArrowRight aria-hidden="true" />
              </button>
              {!selectedProducts.length && (
                <p className="cart-pick-reminder">Pilih barang untuk melanjutkan.</p>
              )}
              <p className="cart-demo-note">
                Mode demo. Harga dan stok adalah contoh; tidak ada transaksi atau pengiriman
                sungguhan.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
