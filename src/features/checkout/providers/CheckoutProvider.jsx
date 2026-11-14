import { CheckoutContext } from '../context/CheckoutContext';
import { useCheckoutState } from '../hooks/useCheckoutState';
import { useDemoSession } from '../../session/hooks/useDemoSession';

function CheckoutSession({ ownerId, children }) {
  const checkout = useCheckoutState(ownerId);
  return <CheckoutContext.Provider value={checkout}>{children}</CheckoutContext.Provider>;
}

export function CheckoutProvider({ children }) {
  const { profile } = useDemoSession();
  const ownerId = String(profile?.id || 'guest');
  return (
    <CheckoutSession key={ownerId} ownerId={ownerId}>
      {children}
    </CheckoutSession>
  );
}
