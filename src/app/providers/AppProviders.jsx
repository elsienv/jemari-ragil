import { ToastProvider } from '../../shared/providers/ToastProvider';
import { DemoSessionProvider } from '../../features/session/providers/DemoSessionProvider';
import { CartProvider } from '../../features/cart/providers/CartProvider';
import { WishlistProvider } from '../../features/wishlist/providers/WishlistProvider';
import { CheckoutProvider } from '../../features/checkout/providers/CheckoutProvider';

export function AppProviders({ children }) {
  return (
    <ToastProvider>
      <DemoSessionProvider>
        <CartProvider>
          <WishlistProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </WishlistProvider>
        </CartProvider>
      </DemoSessionProvider>
    </ToastProvider>
  );
}
