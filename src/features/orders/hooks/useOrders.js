import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDemoSession } from '../../session/hooks/useDemoSession';
import { ordersStorageKey, readDemoOrders } from '../../checkout/lib/checkout';
import { shippingMethods } from '../../checkout/lib/totals';
import { formatCurrency, formatDate } from '../../../shared/lib/format';

function formatOrder(order) {
  const method = shippingMethods.find((shipping) => shipping.id === order.delivery?.method);
  return {
    ...order,
    displayId: order.id.replace(/^JR-DEMO-/, 'JR-'),
    dateLabel: formatDate(order.createdAt),
    shippingLabel: method?.label || 'Pengambilan',
    deliveryLabel: method?.label || 'Ambil di toko',
    paymentLabel: order.paymentMethod === 'manual' ? 'Transfer bank' : 'Bayar saat diterima (COD)',
    items: order.items.map((item) => ({
      ...item,
      productPath: '/product/' + item.id,
      priceLabel: formatCurrency(item.price),
      lineTotalLabel: formatCurrency(item.price * item.quantity),
    })),
    subtotalLabel: formatCurrency(order.totals.subtotal),
    shippingPriceLabel: order.totals.shipping ? formatCurrency(order.totals.shipping) : 'Gratis',
    totalLabel: formatCurrency(order.totals.total),
  };
}

export function useOrders() {
  const { profile } = useDemoSession();
  const ownerId = String(profile?.id || 'guest');
  const [storedOrders, setStoredOrders] = useState(() => readDemoOrders(ownerId));
  const [showConfirmation, setShowConfirmation] = useState(true);
  const location = useLocation();
  const newOrderId = location.state?.newOrderId;

  useEffect(() => {
    const updateOrders = () => setStoredOrders(readDemoOrders(ownerId));
    const handleStorage = (event) => {
      if (!event.key || event.key === ordersStorageKey(ownerId)) updateOrders();
    };
    updateOrders();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [ownerId]);

  return {
    profileName: profile?.name || 'tamu',
    orders: storedOrders.map(formatOrder),
    showConfirmation: Boolean(
      showConfirmation && newOrderId && storedOrders.some((order) => order.id === newOrderId),
    ),
    dismissConfirmation: () => setShowConfirmation(false),
  };
}
