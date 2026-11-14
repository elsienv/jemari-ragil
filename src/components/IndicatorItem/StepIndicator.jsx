import React from 'react';
import { useNavigate } from 'react-router-dom';
import { contactErrors, deliveryErrors, useCheckout } from '../../context/CheckoutContext';
import './StepIndicator.css';

export default function StepIndicator({ currentStep }) {
  const navigate = useNavigate();
  const { draft, selectedProducts } = useCheckout();
  const hasProducts = selectedProducts.length > 0;
  const hasContact = !Object.keys(contactErrors(draft.contact)).length;
  const hasDelivery = !Object.keys(deliveryErrors(draft.delivery)).length;
  const steps = [
    { label: 'Kontak', number: 1, path: '/checkout/info', enabled: hasProducts },
    { label: 'Pengiriman', number: 2, path: '/checkout/shipping', enabled: hasProducts && hasContact },
    { label: 'Pembayaran', number: 3, path: '/checkout/payment', enabled: hasProducts && hasContact && hasDelivery },
  ];
  return (
    <nav className="checkout-steps" aria-label="Tahap checkout">
      <ol>{steps.map((step) => (
        <li key={step.number} className={currentStep === step.number ? 'is-current' : currentStep > step.number ? 'is-complete' : ''}>
          <button type="button" onClick={() => navigate(step.path)} disabled={!step.enabled} aria-current={currentStep === step.number ? 'step' : undefined}>
            <span className="checkout-step-number" aria-hidden="true">{currentStep > step.number ? '✓' : '0' + step.number}</span>
            <span>{step.label}</span>
          </button>
        </li>
      ))}</ol>
    </nav>
  );
}
