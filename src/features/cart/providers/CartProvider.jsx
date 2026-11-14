import { CartContext } from '../context/CartContext';
import { useCartState } from '../hooks/useCartState';

export function CartProvider({ children }) {
  const value = useCartState();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
