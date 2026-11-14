import React from 'react';
import { Navigate } from 'react-router-dom';
import CheckoutShell from '../components/CheckoutShell';
import { useContactStep } from '../hooks/useContactStep';

export default function ContactStepPage() {
  const { contact, hasProducts, errors, handleSubmit, field } = useContactStep();
  if (!hasProducts) return <Navigate to="/cart" replace />;

  return (
    <CheckoutShell
      step={1}
      title="Untuk siapa kenangan ini?"
      description="Isi kontak penerima untuk mencoba alur pemesanan. Gunakan data contoh; ini bukan transaksi sungguhan."
    >
      <form onSubmit={handleSubmit} noValidate className="checkout-form">
        <div className="form-field">
          <label htmlFor="checkout-name">
            Nama penerima <span aria-hidden="true">*</span>
          </label>
          <input
            id="checkout-name"
            autoComplete="name"
            value={contact.name}
            onChange={(event) => field('name', event.target.value)}
            placeholder="Nama lengkap penerima"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'checkout-name-error' : undefined}
          />
          {errors.name && (
            <span id="checkout-name-error" className="checkout-field-error">
              {errors.name}
            </span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="checkout-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            value={contact.email}
            onChange={(event) => field('email', event.target.value)}
            placeholder="nama@contoh.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'checkout-email-error' : undefined}
          />
          {errors.email && (
            <span id="checkout-email-error" className="checkout-field-error">
              {errors.email}
            </span>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="checkout-phone">
            Nomor telepon <span className="muted">(opsional)</span>
          </label>
          <input
            id="checkout-phone"
            type="tel"
            autoComplete="tel"
            value={contact.phone}
            onChange={(event) => field('phone', event.target.value)}
            placeholder="08xx xxxx xxxx"
          />
        </div>
        <div className="checkout-form-actions">
          <button type="submit" className="button">
            Lanjut ke pengiriman <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="checkout-privacy">
          Draft disimpan sementara di tab ini agar tetap tersedia ketika halaman dimuat ulang.
        </p>
      </form>
    </CheckoutShell>
  );
}
