import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from './useCheckout';
import { contactErrors } from '../lib/checkout';

export function useContactStep() {
  const { draft, selectedProducts, updateContact } = useCheckout();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = contactErrors(draft.contact);
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) navigate('/checkout/shipping');
  };
  const field = (name, value) => {
    updateContact({ [name]: value });
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  return {
    contact: draft.contact,
    hasProducts: selectedProducts.length > 0,
    errors,
    handleSubmit,
    field,
  };
}
