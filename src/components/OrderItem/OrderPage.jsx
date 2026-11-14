import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiPackage } from 'react-icons/fi';
import { useDemoSession } from '../../context/DemoSessionContext';
import { ordersStorageKey, readDemoOrders } from '../../lib/checkout';
import { formatCurrency, formatDate } from '../../lib/format';
import { shippingMethods } from '../../lib/shop';
import './OrderPage.css';

export default function OrderPage() {
  const { profile } = useDemoSession();
  const ownerId = String(profile?.id || 'guest');
  const [orders, setOrders] = useState(() => readDemoOrders(ownerId));
  const [showConfirmation, setShowConfirmation] = useState(true);
  const location = useLocation();
  const newOrderId = location.state?.newOrderId;

  useEffect(() => {
    const updateOrders = () => setOrders(readDemoOrders(ownerId));
    const handleStorage = (event) => { if (!event.key || event.key === ordersStorageKey(ownerId)) updateOrders(); };
    updateOrders();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [ownerId]);

  return (
    <section className="section orders-view">
      <div className="container">
        <div className="orders-page-heading"><div><p className="eyebrow">Pilihan yang sudah menemukan tempat</p><h1 className="page-heading">Catatan pesananmu.</h1><p className="muted">Riwayat simulasi untuk {profile?.name || 'tamu'}, tersimpan di browser ini.</p></div><Link to="/store" className="orders-continue">Kembali ke koleksi <FiArrowRight aria-hidden="true" /></Link></div>
        {showConfirmation && newOrderId && orders.some((order) => order.id === newOrderId) && (
          <div className="order-saved-banner" role="status"><FiCheck aria-hidden="true" /><div><strong>Pesanan demo berhasil disimpan.</strong><p>Tidak ada pembayaran atau pengiriman sungguhan. Terima kasih sudah mencoba alurnya.</p></div><button type="button" aria-label="Tutup pemberitahuan" onClick={() => setShowConfirmation(false)}>×</button></div>
        )}
        <p className="orders-demo-disclaimer">MODE DEMO <span>Pesanan ini hanya catatan simulasi, bukan bukti pembelian atau pembayaran.</span></p>
        {!orders.length ? (
          <div className="empty-state orders-empty"><FiPackage aria-hidden="true" /><h2>Ceritanya belum dimulai.</h2><p>Selesaikan checkout demo untuk melihat catatan pilihanmu di sini.</p><Link className="button" to="/store">Temukan pilihanmu <FiArrowRight aria-hidden="true" /></Link></div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const method = shippingMethods.find((shipping) => shipping.id === order.delivery?.method);
              return (
                <article className="order-record" key={order.id}>
                  <header className="order-record-heading"><div><span className="order-record-number">{order.id}</span><p>{formatDate(order.createdAt)}</p></div><span className="order-record-status">Simulasi tersimpan</span></header>
                  <ul className="order-record-products">
                    {order.items.map((item) => (
                      <li key={item.id}><Link to={'/product/' + item.id}><img src={item.image} alt={item.title} /></Link><div><Link to={'/product/' + item.id}><h2>{item.title}</h2></Link><p>{item.quantity} × {formatCurrency(item.price)}</p></div><strong>{formatCurrency(item.price * item.quantity)}</strong></li>
                    ))}
                  </ul>
                  <div className="order-record-footer"><div><span>{order.paymentMethod === 'manual' ? 'Transfer manual' : 'Bayar saat diterima'} · Simulasi</span><p>{method?.label || 'Pengambilan'}</p></div><div><span>Total termasuk pengiriman</span><strong>{formatCurrency(order.totals.total)}</strong></div></div>
                  <details className="order-record-details"><summary>Lihat rincian pesanan</summary><div className="order-details-grid"><div><h3>Penerima</h3><p>{order.contact?.name}</p><p>{order.contact?.email}</p>{order.contact?.phone && <p>{order.contact.phone}</p>}</div><div><h3>Pengiriman</h3><p>{method?.label || 'Ambil di toko'}</p>{order.delivery?.method !== 'pickup' && <p>{order.delivery?.address}, {order.delivery?.city} {order.delivery?.postalCode}</p>}{order.delivery?.note && <p>Catatan: {order.delivery.note}</p>}</div><dl><div><dt>Subtotal</dt><dd>{formatCurrency(order.totals.subtotal)}</dd></div><div><dt>Pengiriman simulasi</dt><dd>{order.totals.shipping ? formatCurrency(order.totals.shipping) : 'Gratis'}</dd></div><div><dt>Total</dt><dd>{formatCurrency(order.totals.total)}</dd></div></dl></div></details>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
