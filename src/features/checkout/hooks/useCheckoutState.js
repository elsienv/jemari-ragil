import { useRef, useState } from 'react';
import { useCart } from '../../cart/hooks/useCart';
import { readStorage, writeStorage } from '../../../shared/lib/storage';
import { calculateTotals } from '../lib/totals';
import {
  checkoutStorageKey,
  createEmptyDraft,
  createDemoOrder,
  sanitizeDraft,
  saveDemoOrder,
} from '../lib/checkout';

function readDraft(ownerId) {
  try {
    return sanitizeDraft(readStorage(checkoutStorageKey(ownerId), null, globalThis.sessionStorage));
  } catch {
    return createEmptyDraft();
  }
}

export function useCheckoutState(ownerId) {
  const { cart, removeItems } = useCart();
  const [draft, setDraft] = useState(() => readDraft(ownerId));
  const draftRef = useRef(draft);
  const submitLock = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [storageError, setStorageError] = useState('');
  const selectedProducts = cart.filter((product) => draft.selectedIds.includes(String(product.id)));
  const totals = calculateTotals(selectedProducts, draft.delivery.method);

  const persistDraft = (nextDraft) => {
    draftRef.current = nextDraft;
    setDraft(nextDraft);
    try {
      writeStorage(checkoutStorageKey(ownerId), nextDraft, globalThis.sessionStorage);
      setStorageError('');
    } catch {
      setStorageError(
        'Draft belum dapat disimpan di browser. Aktifkan penyimpanan browser agar checkout tetap ada setelah halaman dimuat ulang.',
      );
    }
  };

  const startCheckout = (ids) => {
    const selectedIds = [...new Set(ids.map(String))].filter((id) =>
      cart.some((item) => String(item.id) === id),
    );
    if (!selectedIds.length) return false;
    persistDraft({
      ...draftRef.current,
      id:
        'JR-DEMO-' +
        Date.now().toString(36).toUpperCase() +
        '-' +
        Math.random().toString(36).slice(2, 6).toUpperCase(),
      selectedIds,
    });
    return true;
  };
  const updateContact = (contact) =>
    persistDraft({ ...draftRef.current, contact: { ...draftRef.current.contact, ...contact } });
  const updateDelivery = (delivery) =>
    persistDraft({ ...draftRef.current, delivery: { ...draftRef.current.delivery, ...delivery } });

  const completeOrder = (paymentMethod) => {
    if (submitLock.current) return null;
    const candidate = createDemoOrder({ ownerId, draft: draftRef.current, cart, paymentMethod });
    submitLock.current = true;
    setSubmitting(true);
    try {
      // The storage write must succeed before purchased items leave the cart.
      const order = saveDemoOrder(candidate);
      removeItems(order.items.map((product) => product.id));
      persistDraft(createEmptyDraft());
      return order;
    } catch {
      throw new Error(
        'Pesanan belum tersimpan. Periksa izin atau ruang penyimpanan browser, lalu coba lagi. Keranjang Anda tetap tersedia.',
      );
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  };

  return {
    draft,
    selectedProducts,
    totals,
    startCheckout,
    updateContact,
    updateDelivery,
    completeOrder,
    submitting,
    storageError,
    clearStorageError: () => setStorageError(''),
  };
}
