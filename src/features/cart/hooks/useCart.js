import { useRequiredContext } from '../../../shared/hooks/useRequiredContext';
import { CartContext } from '../context/CartContext';

export function useCart() {
  return useRequiredContext(CartContext, 'useCart');
}
