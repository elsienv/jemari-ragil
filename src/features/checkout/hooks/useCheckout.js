import { CheckoutContext } from '../context/CheckoutContext';
import { useRequiredContext } from '../../../shared/hooks/useRequiredContext';

export function useCheckout() {
  return useRequiredContext(CheckoutContext, 'useCheckout');
}
