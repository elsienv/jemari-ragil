import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiPackage } from 'react-icons/fi';
import { useOrders } from '../hooks/useOrders';
import './OrdersPage.css';

export default function OrdersPage() {
  const { profileName, orders, showConfirmation, dismissConfirmation } = useOrders();

  return (
    <section className="section orders-view">
      <div className="container">
        <div className="orders-page-heading">
          <div>
            <p className="eyebrow">Pilihan yang sudah menemukan tempat</p>
            <h1 className="page-heading">Catatan pesananmu.</h1>
            <p className="muted">Riwayat simulasi untuk {profileName}, tersimpan di browser ini.</p>
          </div>
          <Link to="/store" className="orders-continue">
            Kembali ke koleksi <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        {showConfirmation && (
          <div className="order-saved-banner" role="status">
            <FiCheck aria-hidden="true" />
            <div>
              <strong>Pesanan demo berhasil disimpan.</strong>
              <p>
                Tidak ada pembayaran atau pengiriman sungguhan. Terima kasih sudah mencoba alurnya.
              </p>
            </div>
            <button type="button" aria-label="Tutup pemberitahuan" onClick={dismissConfirmation}>
              ×
            </button>
          </div>
        )}
        <p className="orders-demo-disclaimer">
          MODE DEMO{' '}
          <span>Pesanan ini hanya catatan simulasi, bukan bukti pembelian atau pembayaran.</span>
        </p>
        {!orders.length ? (
          <div className="empty-state orders-empty">
            <FiPackage aria-hidden="true" />
            <h2>Ceritanya belum dimulai.</h2>
            <p>Selesaikan checkout demo untuk melihat catatan pilihanmu di sini.</p>
            <Link className="button" to="/store">
              Temukan pilihanmu <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-record" key={order.id}>
                <header className="order-record-heading">
                  <div>
                    <span className="order-record-number">{order.id}</span>
                    <p>{order.dateLabel}</p>
                  </div>
                  <span className="order-record-status">Simulasi tersimpan</span>
                </header>
                <ul className="order-record-products">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <Link to={item.productPath}>
                        <img src={item.image} alt={item.title} />
                      </Link>
                      <div>
                        <Link to={item.productPath}>
                          <h2>{item.title}</h2>
                        </Link>
                        <p>
                          {item.quantity} × {item.priceLabel}
                        </p>
                      </div>
                      <strong>{item.lineTotalLabel}</strong>
                    </li>
                  ))}
                </ul>
                <div className="order-record-footer">
                  <div>
                    <span>{order.paymentLabel} · Simulasi</span>
                    <p>{order.shippingLabel}</p>
                  </div>
                  <div>
                    <span>Total termasuk pengiriman</span>
                    <strong>{order.totalLabel}</strong>
                  </div>
                </div>
                <details className="order-record-details">
                  <summary>Lihat rincian pesanan</summary>
                  <div className="order-details-grid">
                    <div>
                      <h3>Penerima</h3>
                      <p>{order.contact?.name}</p>
                      <p>{order.contact?.email}</p>
                      {order.contact?.phone && <p>{order.contact.phone}</p>}
                    </div>
                    <div>
                      <h3>Pengiriman</h3>
                      <p>{order.deliveryLabel}</p>
                      {order.delivery?.method !== 'pickup' && (
                        <p>
                          {order.delivery?.address}, {order.delivery?.city}{' '}
                          {order.delivery?.postalCode}
                        </p>
                      )}
                      {order.delivery?.note && <p>Catatan: {order.delivery.note}</p>}
                    </div>
                    <dl>
                      <div>
                        <dt>Subtotal</dt>
                        <dd>{order.subtotalLabel}</dd>
                      </div>
                      <div>
                        <dt>Pengiriman simulasi</dt>
                        <dd>{order.shippingPriceLabel}</dd>
                      </div>
                      <div>
                        <dt>Total</dt>
                        <dd>{order.totalLabel}</dd>
                      </div>
                    </dl>
                  </div>
                </details>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
