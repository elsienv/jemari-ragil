import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import CheckoutShell from '../components/CheckoutShell';
import { usePaymentStep } from '../hooks/usePaymentStep';
import './PaymentStepPage.css';

export default function PaymentStepPage() {
  const {
    contact,
    delivery,
    hasProducts,
    hasContact,
    hasDelivery,
    shippingLabel,
    paymentMethod,
    setPaymentMethod,
    error,
    submitting,
    handleSubmit,
  } = usePaymentStep();
  if (!hasProducts) return <Navigate to="/cart" replace />;
  if (!hasContact) return <Navigate to="/checkout/info" replace />;
  if (!hasDelivery) return <Navigate to="/checkout/shipping" replace />;

  return (
    <CheckoutShell
      step={3}
      title="Satu langkah terakhir."
      description="Periksa kembali pilihanmu, lalu simpan pesanan demo. Tidak ada uang yang dipindahkan atau pesanan yang dikirim ke toko."
    >
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="payment-review">
          <div>
            <span>Kontak penerima</span>
            <Link to="/checkout/info">Ubah</Link>
            <strong>{contact.name}</strong>
            <p>{contact.email}</p>
            {contact.phone && <p>{contact.phone}</p>}
          </div>
          <div>
            <span>Pengiriman</span>
            <Link to="/checkout/shipping">Ubah</Link>
            <strong>{shippingLabel}</strong>
            {delivery.method !== 'pickup' && (
              <p>
                {delivery.address}, {delivery.city} {delivery.postalCode}
              </p>
            )}
          </div>
        </div>
        <fieldset className="payment-methods">
          <legend>Metode pembayaran simulasi</legend>
          <label className={'payment-choice' + (paymentMethod === 'cod' ? ' is-selected' : '')}>
            <input
              type="radio"
              name="payment-method"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            <span>
              <strong>Bayar saat diterima</strong>
              <small>Contoh alur COD. Tidak ada penagihan sungguhan.</small>
            </span>
            <span className="payment-demo-tag">DEMO</span>
          </label>
          <label className={'payment-choice' + (paymentMethod === 'manual' ? ' is-selected' : '')}>
            <input
              type="radio"
              name="payment-method"
              value="manual"
              checked={paymentMethod === 'manual'}
              onChange={() => setPaymentMethod('manual')}
            />
            <span>
              <strong>Transfer manual</strong>
              <small>Simulasi saja. Jangan melakukan transfer apa pun.</small>
            </span>
            <span className="payment-demo-tag">DEMO</span>
          </label>
        </fieldset>
        <div className="payment-demo-note">
          <strong>Ini ruang mencoba.</strong>
          <p>
            Pesanan hanya disimpan di browser ini untuk profil demo yang sedang digunakan. Data ini
            tidak menjadi bukti pembelian atau pembayaran.
          </p>
        </div>
        {error && (
          <p className="checkout-message checkout-message-error" role="alert">
            {error}
          </p>
        )}
        <div className="checkout-form-actions">
          <Link to="/checkout/shipping">← Pengiriman</Link>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? 'Menyimpan…' : 'Simpan pesanan demo'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </CheckoutShell>
  );
}
