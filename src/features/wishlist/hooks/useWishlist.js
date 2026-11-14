import { useRequiredContext } from '../../../shared/hooks/useRequiredContext';
import { WishlistContext } from '../context/WishlistContext';

export function useWishlist() {
  return useRequiredContext(WishlistContext, 'useWishlist');
}
