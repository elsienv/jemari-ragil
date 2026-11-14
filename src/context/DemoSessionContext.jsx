import { createContext, useContext, useState } from 'react';
import { readStorage, writeStorage } from '../lib/storage';
import { useToast } from './ToastContext';
const DemoSessionContext = createContext(null);
const KEY = 'jemari-ragil:profile:v1';
export const useDemoSession = () => useContext(DemoSessionContext);
export function DemoSessionProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = readStorage(KEY, null);
    return saved && typeof saved.id === 'string' && typeof saved.name === 'string' ? saved : null;
  });
  const { notify } = useToast();
  const enterDemo = (name) => {
    const normalized = String(name).trim().slice(0, 40);
    if (!normalized) return false;
    const next = { id: `demo-${normalized.toLocaleLowerCase('id')}`, name: normalized };
    setProfile(next);
    try { writeStorage(KEY, next); } catch { notify('Profil hanya tersedia selama sesi ini karena penyimpanan browser dibatasi.'); }
    return true;
  };
  const leaveDemo = () => {
    setProfile(null);
    try { globalThis.localStorage.removeItem(KEY); } catch { /* Memory-only demo still works. */ }
  };
  return <DemoSessionContext.Provider value={{ profile, enterDemo, leaveDemo }}>{children}</DemoSessionContext.Provider>;
}
