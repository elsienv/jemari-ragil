import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { formatCurrency } from '../../lib/format';
import StepIndicator from '../IndicatorItem/StepIndicator';
import './CheckoutInfo.css';

export default function CheckoutShell({ step, title, description, children }) {
  const { selectedProducts, totals, storageError } = useCheckout();
  return (
    <section className="section checkout-page">
      <div className="container">
        <Link className="checkout-back" to="/cart">← Kembali ke keranjang</Link>
        <div className="checkout-page-heading">
          <p className="eyebrow">Sedikit lagi menjadi kenangan</p>
          <h1 className="page-heading">Selesaikan pilihanmu.</h1>
          <p className="muted">Checkout demo · Tidak ada tagihan atau pengiriman sungguhan.</p>
        </div>
        <StepIndicator currentStep={step} />
        {storageError && <p className="checkout-message checkout-message-warning" role="alert">{storageError}</p>}
        <div className="checkout-layout">
          <div className="checkout-form-panel">
            <p className="eyebrow">Langkah 0{step}</p><h2>{title}</h2>
            <p className="muted checkout-description">{description}</p>
            {children}
          </div>
          <aside className="checkout-summary" aria-label="Ringkasan pesanan">
            <div className="checkout-summary-title"><h2>Pilihanmu</h2><span>{totals.itemCount} barang</span></div>
            <ul className="checkout-products">
              {selectedProducts.map((product) => (
                <li key={product.id}>
                  <div className="checkout-product-image"><img src={product.image} alt={product.title} /><span>{product.quantity}</span></div>
                  <div><h3>{product.title}</h3><p>{formatCurrency(product.price)} / barang</p></div>
                  <strong>{formatCurrency(product.price * product.quantity)}</strong>
                </li>
              ))}
            </ul>
            <dl className="checkout-totals">
              <div><dt>Subtotal</dt><dd>{formatCurrency(totals.subtotal)}</dd></div>
              <div><dt>Pengiriman simulasi</dt><dd>{totals.shipping === 0 ? 'Gratis' : formatCurrency(totals.shipping)}</dd></div>
              <div className="checkout-grand-total"><dt>Total</dt><dd>{formatCurrency(totals.total)}</dd></div>
            </dl>
            <p className="checkout-summary-note">Dibuat dengan perhatian, dipilih untuk yang berarti. Semua nominal pada checkout ini adalah simulasi.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
