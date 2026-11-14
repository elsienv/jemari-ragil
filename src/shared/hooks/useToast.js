import { ToastContext } from '../context/ToastContext';
import { useRequiredContext } from './useRequiredContext';

export function useToast() {
  return useRequiredContext(ToastContext, 'useToast');
}
