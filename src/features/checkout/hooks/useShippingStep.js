import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from './useCheckout';
import { contactErrors, deliveryErrors } from '../lib/checkout';

export function useShippingStep() {
  const { draft, selectedProducts, updateDelivery } = useCheckout();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const field = (name, value) => {
    const nextValue = name === 'postalCode' ? value.replace(/[^0-9]/g, '') : value;
    updateDelivery({ [name]: nextValue });
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: '' }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = deliveryErrors(draft.delivery);
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) navigate('/checkout/payment');
  };

  return {
    delivery: draft.delivery,
    hasProducts: selectedProducts.length > 0,
    hasContact: !Object.keys(contactErrors(draft.contact)).length,
    errors,
    handleSubmit,
    field,
  };
}
