import { useNavigate } from 'react-router-dom';
import { useCheckout } from './useCheckout';
import { contactErrors, deliveryErrors } from '../lib/checkout';

export function useCheckoutSteps() {
  const navigate = useNavigate();
  const { draft, selectedProducts } = useCheckout();
  const hasProducts = selectedProducts.length > 0;
  const hasContact = !Object.keys(contactErrors(draft.contact)).length;
  const hasDelivery = !Object.keys(deliveryErrors(draft.delivery)).length;
  const steps = [
    { label: 'Kontak', number: 1, path: '/checkout/info', enabled: hasProducts },
    {
      label: 'Pengiriman',
      number: 2,
      path: '/checkout/shipping',
      enabled: hasProducts && hasContact,
    },
    {
      label: 'Pembayaran',
      number: 3,
      path: '/checkout/payment',
      enabled: hasProducts && hasContact && hasDelivery,
    },
  ];

  return { steps, navigateToStep: (path) => navigate(path) };
}
