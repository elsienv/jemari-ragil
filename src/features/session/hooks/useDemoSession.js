import { useRequiredContext } from '../../../shared/hooks/useRequiredContext';
import { DemoSessionContext } from '../context/DemoSessionContext';

export function useDemoSession() {
  return useRequiredContext(DemoSessionContext, 'useDemoSession');
}
