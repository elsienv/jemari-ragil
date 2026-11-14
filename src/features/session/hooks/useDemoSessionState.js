import { useState } from 'react';
import { readStorage, writeStorage } from '../../../shared/lib/storage';
import { useToast } from '../../../shared/hooks/useToast';

const KEY = 'jemari-ragil:profile:v1';

export function useDemoSessionState() {
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
    try {
      writeStorage(KEY, next);
    } catch {
      notify('Profil hanya tersedia selama sesi ini karena penyimpanan browser dibatasi.');
    }
    return true;
  };
  const leaveDemo = () => {
    setProfile(null);
    try {
      globalThis.localStorage.removeItem(KEY);
    } catch {
      /* Memory-only demo still works. */
    }
  };

  return { profile, enterDemo, leaveDemo };
}
