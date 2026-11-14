import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);
export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const timer = useRef();
  const notify = (text) => {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(''), 4000);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return <ToastContext.Provider value={{ notify }}>
    {children}
    <div className={`toast-message${message ? ' is-visible' : ''}`} role="status" aria-live="polite">
      {message && <><FiCheckCircle aria-hidden="true" /><span>{message}</span><button aria-label="Tutup pemberitahuan" onClick={() => setMessage('')}><FiX /></button></>}
    </div>
  </ToastContext.Provider>;
}
