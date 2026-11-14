import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from './useCheckout';
import { useToast } from '../../../shared/hooks/useToast';
import { contactErrors, deliveryErrors } from '../lib/checkout';
import { shippingMethods } from '../lib/totals';

export function usePaymentStep() {
  const { draft, selectedProducts, completeOrder, submitting } = useCheckout();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    try {
      const order = completeOrder(paymentMethod);
      if (!order) return;
      notify('Pesanan berhasil disimpan.');
      navigate('/orders', { replace: true, state: { newOrderId: order.id } });
    } catch (failure) {
      setError(failure.message || 'Pesanan belum tersimpan. Silakan coba lagi.');
    }
  };

  return {
    contact: draft.contact,
    delivery: draft.delivery,
    hasProducts: selectedProducts.length > 0,
    hasContact: !Object.keys(contactErrors(draft.contact)).length,
    hasDelivery: !Object.keys(deliveryErrors(draft.delivery)).length,
    shippingLabel: shippingMethods.find((shipping) => shipping.id === draft.delivery.method)?.label,
    paymentMethod,
    setPaymentMethod,
    error,
    submitting,
    handleSubmit,
  };
}
