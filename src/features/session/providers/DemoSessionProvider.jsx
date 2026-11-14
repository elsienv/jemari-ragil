import { DemoSessionContext } from '../context/DemoSessionContext';
import { useDemoSessionState } from '../hooks/useDemoSessionState';

export function DemoSessionProvider({ children }) {
  const value = useDemoSessionState();
  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}
