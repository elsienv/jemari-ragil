import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../checkout/hooks/useCheckout';
import { calculateTotals } from '../../checkout/lib/totals';
import { useToast } from '../../../shared/hooks/useToast';
import { useCart } from './useCart';

export function useCartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { draft, startCheckout } = useCheckout();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState(() =>
    draft.selectedIds.length
      ? draft.selectedIds.filter((id) => cart.some((product) => String(product.id) === String(id)))
      : cart.map((product) => String(product.id)),
  );
  const selectedProducts = cart.filter((product) => selectedIds.includes(String(product.id)));
  const totals = calculateTotals(selectedProducts);
  const allSelected = cart.length > 0 && selectedProducts.length === cart.length;

  useEffect(() => {
    setSelectedIds((previous) =>
      previous.filter((id) => cart.some((product) => String(product.id) === id)),
    );
  }, [cart]);

  const toggleItem = (id) =>
    setSelectedIds((previous) =>
      previous.includes(String(id))
        ? previous.filter((value) => value !== String(id))
        : [...previous, String(id)],
    );
  const toggleAllItems = () =>
    setSelectedIds(allSelected ? [] : cart.map((product) => String(product.id)));
  const handleCheckout = () => {
    if (!selectedProducts.length) {
      notify('Pilih setidaknya satu barang untuk checkout.');
      return;
    }
    if (startCheckout(selectedProducts.map((product) => product.id))) navigate('/checkout/info');
  };
  const handleRemove = (product) => {
    removeFromCart(product.id);
    notify(product.title + ' dihapus dari keranjang.');
  };

  return {
    cart,
    selectedIds,
    selectedProducts,
    totals,
    allSelected,
    toggleItem,
    toggleAllItems,
    handleCheckout,
    handleRemove,
    updateQuantity,
  };
}
