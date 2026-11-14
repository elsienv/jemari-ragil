import { useMemo } from 'react';
import { ToastContext } from '../context/ToastContext';
import { useToastState } from '../hooks/useToastState';
import { ToastMessage } from '../components/ToastMessage';

export function ToastProvider({ children }) {
  const { message, notify, dismiss } = useToastState();
  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastMessage message={message} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
