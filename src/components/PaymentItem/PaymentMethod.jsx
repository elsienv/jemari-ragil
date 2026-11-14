import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CheckoutShell from '../CheckoutItem/CheckoutShell';
import { contactErrors, deliveryErrors, useCheckout } from '../../context/CheckoutContext';
import { useToast } from '../../context/ToastContext';
import { shippingMethods } from '../../lib/shop';
import './PaymentMethod.css';

export default function PaymentMethod() {
  const { draft, selectedProducts, completeOrder, submitting } = useCheckout();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [error, setError] = useState('');
  if (!selectedProducts.length) return <Navigate to="/cart" replace />;
  if (Object.keys(contactErrors(draft.contact)).length) return <Navigate to="/checkout/info" replace />;
  if (Object.keys(deliveryErrors(draft.delivery)).length) return <Navigate to="/checkout/shipping" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    try {
      const order = completeOrder(paymentMethod);
      if (!order) return;
      notify('Pesanan demo berhasil disimpan.');
      navigate('/orders', { replace: true, state: { newOrderId: order.id } });
    } catch (failure) {
      setError(failure.message || 'Pesanan belum tersimpan. Silakan coba lagi.');
    }
  };
  const method = shippingMethods.find((shipping) => shipping.id === draft.delivery.method);

  return (
    <CheckoutShell step={3} title="Satu langkah terakhir." description="Periksa kembali pilihanmu, lalu simpan pesanan demo. Tidak ada uang yang dipindahkan atau pesanan yang dikirim ke toko.">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="payment-review">
          <div><span>Kontak penerima</span><Link to="/checkout/info">Ubah</Link><strong>{draft.contact.name}</strong><p>{draft.contact.email}</p>{draft.contact.phone && <p>{draft.contact.phone}</p>}</div>
          <div><span>Pengiriman</span><Link to="/checkout/shipping">Ubah</Link><strong>{method?.label}</strong>{draft.delivery.method !== 'pickup' && <p>{draft.delivery.address}, {draft.delivery.city} {draft.delivery.postalCode}</p>}</div>
        </div>
        <fieldset className="payment-methods">
          <legend>Metode pembayaran simulasi</legend>
          <label className={'payment-choice' + (paymentMethod === 'cod' ? ' is-selected' : '')}>
            <input type="radio" name="payment-method" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
            <span><strong>Bayar saat diterima</strong><small>Contoh alur COD. Tidak ada penagihan sungguhan.</small></span>
            <span className="payment-demo-tag">DEMO</span>
          </label>
          <label className={'payment-choice' + (paymentMethod === 'manual' ? ' is-selected' : '')}>
            <input type="radio" name="payment-method" value="manual" checked={paymentMethod === 'manual'} onChange={() => setPaymentMethod('manual')} />
            <span><strong>Transfer manual</strong><small>Simulasi saja. Jangan melakukan transfer apa pun.</small></span>
            <span className="payment-demo-tag">DEMO</span>
          </label>
        </fieldset>
        <div className="payment-demo-note"><strong>Ini ruang mencoba.</strong><p>Pesanan hanya disimpan di browser ini untuk profil demo yang sedang digunakan. Data ini tidak menjadi bukti pembelian atau pembayaran.</p></div>
        {error && <p className="checkout-message checkout-message-error" role="alert">{error}</p>}
        <div className="checkout-form-actions"><Link to="/checkout/shipping">← Pengiriman</Link><button className="button" type="submit" disabled={submitting}>{submitting ? 'Menyimpan…' : 'Simpan pesanan demo'} <span aria-hidden="true">→</span></button></div>
      </form>
    </CheckoutShell>
  );
}
