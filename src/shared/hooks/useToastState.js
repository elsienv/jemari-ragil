import { useCallback, useEffect, useRef, useState } from 'react';

export function useToastState() {
  const [message, setMessage] = useState('');
  const timer = useRef();

  const dismiss = useCallback(() => {
    clearTimeout(timer.current);
    setMessage('');
  }, []);

  const notify = useCallback((text) => {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(''), 4000);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, notify, dismiss };
}
