import React from 'react';
import { useCheckoutSteps } from '../hooks/useCheckoutSteps';
import './StepIndicator.css';

export default function StepIndicator({ currentStep }) {
  const { steps, navigateToStep } = useCheckoutSteps();

  return (
    <nav className="checkout-steps" aria-label="Tahap checkout">
      <ol>
        {steps.map((step) => (
          <li
            key={step.number}
            className={
              currentStep === step.number
                ? 'is-current'
                : currentStep > step.number
                  ? 'is-complete'
                  : ''
            }
          >
            <button
              type="button"
              onClick={() => navigateToStep(step.path)}
              disabled={!step.enabled}
              aria-current={currentStep === step.number ? 'step' : undefined}
            >
              <span className="checkout-step-number" aria-hidden="true">
                {currentStep > step.number ? '✓' : '0' + step.number}
              </span>
              <span>{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
