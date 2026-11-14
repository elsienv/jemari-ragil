import { WishlistContext } from '../context/WishlistContext';
import { useWishlistState } from '../hooks/useWishlistState';

export function WishlistProvider({ children }) {
  const value = useWishlistState();
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
