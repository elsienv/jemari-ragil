import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import CheckoutShell from '../components/CheckoutShell';
import { useShippingStep } from '../hooks/useShippingStep';
import { shippingMethods } from '../lib/totals';
import { formatCurrency } from '../../../shared/lib/format';
import './ShippingStepPage.css';

export default function ShippingStepPage() {
  const { delivery, hasProducts, hasContact, errors, handleSubmit, field } = useShippingStep();
  if (!hasProducts) return <Navigate to="/cart" replace />;
  if (!hasContact) return <Navigate to="/checkout/info" replace />;

  return (
    <CheckoutShell
      step={2}
      title="Antar ke mana?"
      description="Pilih pengambilan di toko atau pengiriman ke alamat penerima."
    >
      <form onSubmit={handleSubmit} noValidate className="checkout-form">
        <fieldset className="delivery-methods">
          <legend className="sr-only">Metode pengiriman</legend>
          {shippingMethods.map((method) => (
            <label
              className={'delivery-choice' + (delivery.method === method.id ? ' is-selected' : '')}
              key={method.id}
            >
              <input
                type="radio"
                name="shipping-method"
                value={method.id}
                checked={delivery.method === method.id}
                onChange={() => field('method', method.id)}
              />
              <span>
                <strong>{method.label}</strong>
                <small>{method.description}</small>
              </span>
              <b>{method.price === 0 ? 'Gratis' : formatCurrency(method.price)}</b>
            </label>
          ))}
        </fieldset>
        {errors.method && (
          <p className="checkout-field-error" role="alert">
            {errors.method}
          </p>
        )}
        {delivery.method === 'pickup' ? (
          <div className="delivery-pickup-note">
            <span aria-hidden="true">⌂</span>
            <div>
              <h3>Ambil sendiri di Salatiga</h3>
              <p>Pengambilan langsung di Salatiga tanpa biaya pengiriman.</p>
            </div>
          </div>
        ) : (
          <div className="delivery-address-fields">
            <h3>Alamat penerima</h3>
            <div className="form-field">
              <label htmlFor="shipping-address">
                Alamat lengkap <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="shipping-address"
                autoComplete="street-address"
                rows={3}
                value={delivery.address}
                onChange={(event) => field('address', event.target.value)}
                placeholder="Jalan, nomor rumah, kelurahan, dan kecamatan"
                required
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'shipping-address-error' : undefined}
              />
              {errors.address && (
                <span id="shipping-address-error" className="checkout-field-error">
                  {errors.address}
                </span>
              )}
            </div>
            <div className="checkout-field-row">
              <div className="form-field">
                <label htmlFor="shipping-city">
                  Kota / kabupaten <span aria-hidden="true">*</span>
                </label>
                <input
                  id="shipping-city"
                  autoComplete="address-level2"
                  value={delivery.city}
                  onChange={(event) => field('city', event.target.value)}
                  placeholder="Contoh: Salatiga"
                  required
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'shipping-city-error' : undefined}
                />
                {errors.city && (
                  <span id="shipping-city-error" className="checkout-field-error">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="shipping-postal">
                  Kode pos <span aria-hidden="true">*</span>
                </label>
                <input
                  id="shipping-postal"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={delivery.postalCode}
                  onChange={(event) => field('postalCode', event.target.value)}
                  placeholder="50700"
                  required
                  aria-invalid={!!errors.postalCode}
                  aria-describedby={errors.postalCode ? 'shipping-postal-error' : undefined}
                />
                {errors.postalCode && (
                  <span id="shipping-postal-error" className="checkout-field-error">
                    {errors.postalCode}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="form-field">
          <label htmlFor="shipping-note">
            Catatan pesanan <span className="muted">(opsional)</span>
          </label>
          <textarea
            id="shipping-note"
            rows={3}
            value={delivery.note}
            onChange={(event) => field('note', event.target.value)}
            placeholder="Ada pesan khusus untuk pilihanmu?"
          />
        </div>
        <div className="checkout-form-actions">
          <Link to="/checkout/info">← Informasi kontak</Link>
          <button className="button" type="submit">
            Lanjut ke pembayaran →
          </button>
        </div>
      </form>
    </CheckoutShell>
  );
}
